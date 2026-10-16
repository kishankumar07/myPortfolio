import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile('dist/index.html','utf8');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one primary heading');
assert.match(html,/<main\b/,'Main landmark');
assert.match(html,/<meta name="description" content=".{60,}"/,'Search description');
assert.match(html,/<link rel="canonical" href="https:\/\/www\.kishanta\.in\/"/,'Canonical URL');
for (const content of ['Hello, I','Professional Experience','Bachelor of Technology','Full Name','contact-message']) assert.ok(html.includes(content),`Prerendered content: ${content}`);
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(schema['@type'],'ProfilePage');
assert.equal(schema.mainEntity['@type'],'Person');
assert.match(await readFile('dist/robots.txt','utf8'),/Sitemap: https:\/\/www\.kishanta\.in\/sitemap.xml/);
assert.match(await readFile('dist/sitemap.xml','utf8'),/<loc>https:\/\/www\.kishanta\.in\/<\/loc>/);
assert.ok(html.includes('htmlFor') === false,'Valid HTML labels');
console.log('Production checks pass: prerendered content, headings, metadata, schema, robots and sitemap.');

// Guard the responsive assets and crawlable anchors before deployment.
const { stat } = await import('node:fs/promises');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'No duplicate HTML IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Working section anchor: ${match[1]}`);
assert.match(html, /<html[^>]*lang="en"/, 'Document language');
assert.match(html, /name="viewport"/, 'Responsive viewport');
for (const property of ['og:title', 'og:description', 'og:image', 'og:url']) assert.ok(html.includes(`property="${property}"`), `Social metadata: ${property}`);
assert.match(html, /name="twitter:card" content="summary_large_image"/, 'Social preview card');
const originalVideo = await stat('dist/media/hero-film.mp4');
const mobileVideo = await stat('dist/media/hero-film-mobile.mp4');
assert.ok(mobileVideo.size < originalVideo.size * .5, 'Mobile film stays less than half the original download size');
console.log('Additional checks pass: unique IDs, section links, social metadata and optimized mobile video.');
