import { readFileSync, writeFileSync } from 'node:fs';
import zlib from 'node:zlib';

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePNG(buffer) {
  let pos = 8;
  const idat = [];
  let width = 0, height = 0;
  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(pos + 8);
      height = buffer.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idat.push(buffer.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4;
  const stride = width * bpp;
  const rgba = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(stride);
  let srcPos = 0;

  for (let y = 0; y < height; y++) {
    const filter = decompressed[srcPos++];
    const currentRow = Buffer.alloc(stride);
    for (let x = 0; x < stride; x++) {
      const raw = decompressed[srcPos++];
      const a = (x >= bpp) ? currentRow[x - bpp] : 0;
      const b = prevRow[x];
      const c = (x >= bpp) ? prevRow[x - bpp] : 0;
      let val = raw;
      if (filter === 1) val = (raw + a) & 0xff;
      else if (filter === 2) val = (raw + b) & 0xff;
      else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) val = (raw + paeth(a, b, c)) & 0xff;
      currentRow[x] = val;
    }
    currentRow.copy(rgba, y * stride);
    prevRow = currentRow;
  }
  return { width, height, rgba };
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function encodePNG(w, h, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    scanlines[y * (1 + w * 4)] = 0;
    rgba.copy(scanlines, y * (1 + w * 4) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(scanlines));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function resizeBilinear(srcRgba, srcW, srcH, destW, destH) {
  const destRgba = Buffer.alloc(destW * destH * 4);
  for (let dy = 0; dy < destH; dy++) {
    const sy = (dy + 0.5) * (srcH / destH) - 0.5;
    const y0 = Math.max(0, Math.min(srcH - 1, Math.floor(sy)));
    const y1 = Math.max(0, Math.min(srcH - 1, y0 + 1));
    const fy = sy - y0;

    for (let dx = 0; dx < destW; dx++) {
      const sx = (dx + 0.5) * (srcW / destW) - 0.5;
      const x0 = Math.max(0, Math.min(srcW - 1, Math.floor(sx)));
      const x1 = Math.max(0, Math.min(srcW - 1, x0 + 1));
      const fx = sx - x0;

      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;

      const p00 = (y0 * srcW + x0) * 4;
      const p10 = (y0 * srcW + x1) * 4;
      const p01 = (y1 * srcW + x0) * 4;
      const p11 = (y1 * srcW + x1) * 4;

      const dIdx = (dy * destW + dx) * 4;
      for (let c = 0; c < 4; c++) {
        destRgba[dIdx + c] = Math.round(
          srcRgba[p00 + c] * w00 +
          srcRgba[p10 + c] * w10 +
          srcRgba[p01 + c] * w01 +
          srcRgba[p11 + c] * w11
        );
      }
    }
  }
  return destRgba;
}

function makeICO(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const entries = [];
  const images = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    images.push(item.buffer);
    offset += item.buffer.length;
  }
  return Buffer.concat([header, ...entries, ...images]);
}

// 1. Decode source image
const sourceBuffer = readFileSync('scripts/source-logo.png');
const { width: srcW, height: srcH, rgba: srcRgba } = decodePNG(sourceBuffer);

// 2. Locate eagle icon bounds (y <= 290)
let eagleMinX = srcW, eagleMaxX = 0, eagleMinY = srcH, eagleMaxY = 0;
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const alpha = srcRgba[(y * srcW + x) * 4 + 3];
    if (alpha > 15 && y <= 290) {
      if (x < eagleMinX) eagleMinX = x;
      if (x > eagleMaxX) eagleMaxX = x;
      if (y < eagleMinY) eagleMinY = y;
      if (y > eagleMaxY) eagleMaxY = y;
    }
  }
}

const eW = eagleMaxX - eagleMinX + 1;
const eH = eagleMaxY - eagleMinY + 1;
console.log('Detected Eagle Icon:', { eagleMinX, eagleMaxX, eagleMinY, eagleMaxY, eW, eH });

// 3. Create a high-res square master (512x512) with subtle 7% breathing margin
const masterSize = 512;
const margin = Math.round(masterSize * 0.07);
const targetDim = masterSize - margin * 2;
const scale = targetDim / Math.max(eW, eH);
const scaledW = Math.round(eW * scale);
const scaledH = Math.round(eH * scale);

// Extract cropped eagle RGBA at native resolution
const nativeEagle = Buffer.alloc(eW * eH * 4);
for (let y = 0; y < eH; y++) {
  for (let x = 0; x < eW; x++) {
    const srcIdx = ((eagleMinY + y) * srcW + (eagleMinX + x)) * 4;
    const destIdx = (y * eW + x) * 4;
    nativeEagle[destIdx] = srcRgba[srcIdx];
    nativeEagle[destIdx + 1] = srcRgba[srcIdx + 1];
    nativeEagle[destIdx + 2] = srcRgba[srcIdx + 2];
    nativeEagle[destIdx + 3] = srcRgba[srcIdx + 3];
  }
}

// Scale native eagle up to target scaled dimensions
const scaledEagle = resizeBilinear(nativeEagle, eW, eH, scaledW, scaledH);

// Place scaled eagle into master 512x512 square centered
const masterRgba = Buffer.alloc(masterSize * masterSize * 4, 0);
const startX = Math.floor((masterSize - scaledW) / 2);
const startY = Math.floor((masterSize - scaledH) / 2);

for (let y = 0; y < scaledH; y++) {
  for (let x = 0; x < scaledW; x++) {
    const srcIdx = (y * scaledW + x) * 4;
    const destIdx = ((startY + y) * masterSize + (startX + x)) * 4;
    masterRgba[destIdx] = scaledEagle[srcIdx];
    masterRgba[destIdx + 1] = scaledEagle[srcIdx + 1];
    masterRgba[destIdx + 2] = scaledEagle[srcIdx + 2];
    masterRgba[destIdx + 3] = scaledEagle[srcIdx + 3];
  }
}

// Generate multiple sizes
const png512 = encodePNG(512, 512, masterRgba);
const rgba192 = resizeBilinear(masterRgba, 512, 512, 192, 192);
const png192 = encodePNG(192, 192, rgba192);
const rgba64 = resizeBilinear(masterRgba, 512, 512, 64, 64);
const png64 = encodePNG(64, 64, rgba64);
const rgba32 = resizeBilinear(masterRgba, 512, 512, 32, 32);
const png32 = encodePNG(32, 32, rgba32);
const rgba16 = resizeBilinear(masterRgba, 512, 512, 16, 16);
const png16 = encodePNG(16, 16, rgba16);

// Write favicon files
writeFileSync('public/favicon.png', png192);
writeFileSync('public/favicon-32x32.png', png32);
writeFileSync('public/favicon-16x16.png', png16);
writeFileSync('public/apple-touch-icon.png', png192);

const icoBuffer = makeICO([
  { width: 16, height: 16, buffer: png16 },
  { width: 32, height: 32, buffer: png32 },
  { width: 64, height: 64, buffer: png64 }
]);
writeFileSync('public/favicon.ico', icoBuffer);

console.log('Successfully generated public/favicon.png, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png, and favicon.ico!');
