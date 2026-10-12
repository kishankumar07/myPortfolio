import { build } from 'esbuild';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const output = resolve('scripts/.prerender-app.mjs');
try {
  await build({entryPoints:['src/App.tsx'], outfile:output, bundle:true, platform:'node', format:'esm', packages:'external', jsx:'automatic', loader:{'.css':'empty'}, plugins:[{name:'ignore-styles', setup(b){b.onResolve({filter:/\.css$/}, args => ({path:args.path,namespace:'empty-style'}));b.onLoad({filter:/.*/,namespace:'empty-style'}, () => ({contents:'',loader:'js'}));}}], define:{'import.meta.env':'{}'}});
  const {default:App} = await import(pathToFileURL(output).href);
  const React = await import('react');
  const {renderToString} = await import('react-dom/server');
  const {Context} = await import('react-responsive');
  const markup = renderToString(React.createElement(Context.Provider,{value:{width:1280}},React.createElement(App)));
  if (!markup.includes('Hello, I') || !markup.includes('Professional Experience') || !markup.includes('contact-from_name')) throw new Error('Prerender omitted important page content');
  const html = await readFile('dist/index.html','utf8');
  await writeFile('dist/index.html',html.replace('<div id="root"></div>',`<div id="root">${markup}</div>`));
  console.log('Prerendered portfolio text, navigation, experience, education and contact form.');
} finally { await rm(output,{force:true}); }
