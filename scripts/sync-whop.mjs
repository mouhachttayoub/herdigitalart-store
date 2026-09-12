// Run only in a trusted server/CI environment. Never ship the API key to a browser.
import {readFile,writeFile,rename} from 'node:fs/promises';
const key=process.env.WHOP_API_KEY,account=process.env.WHOP_ACCOUNT_ID;
if(!key||!account)throw Error('Set WHOP_API_KEY and WHOP_ACCOUNT_ID as repository secrets.');
const overrides=JSON.parse(await readFile(new URL('../product-overrides.json',import.meta.url),'utf8'));
let after='',products=[];const cursors=new Set();
do{
 const url=new URL('https://api.whop.com/api/v1/products');
 url.searchParams.set('account_id',account);url.searchParams.set('first','50');url.searchParams.append('visibilities[]','visible');if(after)url.searchParams.set('after',after);
 const response=await fetch(url,{headers:{Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error(`Whop catalog request failed (${response.status}). Existing catalog was preserved.`);
 const body=await response.json();if(!Array.isArray(body.data)||!body.page_info)throw Error('Unexpected Whop response; existing catalog preserved.');
 for(const p of body.data){if(p.visibility!=='visible')continue;const o=overrides[p.id]||{};
 // Only explicitly public fields are copied. Do not serialize the API response wholesale.
 const checkout=typeof o.checkoutUrl==='string'?o.checkoutUrl:'';
 if(checkout){const u=new URL(checkout);if(u.protocol!=='https:'||!(u.hostname==='whop.com'||u.hostname.endsWith('.whop.com')))throw Error('Checkout overrides must be HTTPS Whop URLs.');}
 products.push({id:p.id,title:p.title,description:p.headline||'',image:p.gallery_images?.[0]?.url||'',category:o.category||'Digital Resources',format:o.format||'Digital download',createdAt:p.created_at,checkoutUrl:checkout,price:null,currency:'USD',featured:o.featured===true,bestsellerRank:Number.isFinite(o.bestsellerRank)&&o.bestsellerRank>0?o.bestsellerRank:null});
 }
 if(!body.page_info.has_next_page)break;
 after=body.page_info.end_cursor;if(!after||cursors.has(after))throw Error('Invalid pagination; existing catalog preserved.');cursors.add(after);
}while(true);
const output=new URL('../products.json',import.meta.url),temp=new URL('../products.json.tmp',import.meta.url);
await writeFile(temp,JSON.stringify({updatedAt:new Date().toISOString(),products},null,2)+'\n');await rename(temp,output);
console.log(`Synced ${products.length} public products. Checkout URLs require verified overrides; prices are confirmed on Whop.`);
