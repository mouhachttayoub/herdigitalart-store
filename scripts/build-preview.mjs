// Build the self-contained preview. Run from any directory with Node 20+.
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
let js=await readFile(new URL('script.js',root),'utf8');
let css=await readFile(new URL('styles.css',root),'utf8');
css+='\n'+await readFile(new URL('design-v2.css',root),'utf8');
css+='\n'+await readFile(new URL('premium.css',root),'utf8');
css+='\n'+await readFile(new URL('homepage.css',root),'utf8');
const data=JSON.parse(await readFile(new URL('preview-products.json',root),'utf8'));
for(const p of data.products){const bytes=await readFile(new URL(p.image,root));p.image='data:image/jpeg;base64,'+bytes.toString('base64');}
const hero=data.products.find(p=>p.id==='labels').image;
for(const p of data.products) js=js.replaceAll(`src="images/${p.id==='labels'?'labels':p.id==='learning'?'learning':'wedding'}.jpg"`,`src="${p.image}"`);
js=js.replace("const preview = params.get('preview') === '1';","const preview = true;")
 .replace("const route = location.pathname.endsWith('product.html') ? 'product' : location.pathname.endsWith('shop.html') ? 'shop' : 'home';","const route = params.get('page') || 'home';")
 .replace("return page + (q.size ? '?' + q : '');","q.set('page',page==='product.html'?'product':page==='shop.html'?'shop':'home'); return '?' + q;")
 .replace("try { const u=new URL(value,location.href);","try { if(image && /^data:image\\/jpeg;base64,/.test(value)) return value; const u=new URL(value,location.href);")
 .replace('src="images/labels.jpg"',`src="${hero}"`)
 .replace('<a href="index.html">View live catalog mode</a>','')
 .replace("fetch(preview?'preview-products.json':'products.json',{cache:'no-store'})",`Promise.resolve({ok:true,json:async()=>(${JSON.stringify(data)})})`);
await writeFile(new URL('preview.html',root),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>HerDigitalArt — Design Preview</title><style>${css}</style></head><body><a class="skip" href="#main">Skip to content</a><div id="app"></div><script>${js.replace(/<\/script/gi,'<\\/script')}</script></body></html>`);
console.log('Built self-contained preview.html — opens directly without a local server.');
