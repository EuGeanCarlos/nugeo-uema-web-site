import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const root=new URL('../../../',import.meta.url);
const access=JSON.parse(await readFile(new URL('wordpress/.local-access.json',root),'utf8'));
const tree=JSON.parse((await readFile(new URL('wordpress/nugeo/inc/site-tree.json',root),'utf8')).replace(/^\uFEFF/,''));
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const context=await browser.newContext({baseURL:'http://127.0.0.1:9400'});
 const page=await context.newPage();
 await page.goto('/wp-login.php');
 await page.locator('#user_login').fill(access.username);
 await page.locator('#user_pass').fill(access.password);
 await Promise.all([page.waitForURL('**/wp-admin/**'),page.locator('#wp-submit').click()]);
 const nonce=await (await context.request.get('/wp-admin/admin-ajax.php?action=rest-nonce')).text();
 async function api(route,data) {
  const r=await context.request.fetch(`/index.php?rest_route=/wp/v2/${route}`,{method:data?'POST':'GET',headers:{'X-WP-Nonce':nonce},...(data?{data}:{})});
  if(!r.ok()) throw new Error(`${route}: ${r.status()} ${(await r.text()).slice(0,300)}`);
  return r.json();
 }
 const menus=await api('menus');
 console.log(menus.map(m=>({id:m.id,name:m.name,locations:m.locations})));
 const menu=menus.find(m=>m.name==='NUGEO — árvore do portal oficial') || await api('menus',{name:'NUGEO — árvore do portal oficial'});
 await api(`menus/${menu.id}`,{locations:['primary']});
 const existing=await api(`menu-items&menus=${menu.id}&per_page=100`);
 tree[0].url='http://127.0.0.1:9400/';
 for(const [i,[slug,title,id]] of [['labmet','Meteorologia',54],['labhidro','Recursos Hídricos',230],['labgeo','Geoprocessamento',776]].entries()) {
  const [lab]=await api(`pages&slug=${slug}&context=edit`);
  if(!lab) throw new Error(`Página ausente: ${slug}`);
  tree[i+2].url=lab.link;
  const data={template:'page-laboratory.php'};
  if(lab.content.raw.includes('Espaço reservado para a equipe')) {
   data.title=`Laboratório de ${title}`;
   data.content=`<p>Consulte as áreas, serviços e publicações do laboratório nos acessos abaixo.</p><p><a href="https://www.nugeo.uema.br/?page_id=${id}">Apresentação completa no portal oficial NUGEO/UEMA</a></p>`;
   if(i===2) data.content+='<p>Projetos e Atividades de Campo aparecem no portal original sem uma página de destino. Permanecem registrados para revisão editorial.</p>';
   if(i===0) data.content+='<h2>Laudos Técnicos</h2><p>O portal apresenta este serviço sem um link de atendimento. Consulte o laboratório pelo canal institucional.</p>';
  }
  await api(`pages/${lab.id}`,data);
 }
 tree[2].children.push({label:'Informativos Climáticos',url:'https://bit.ly/2YqsztP',children:[]});
 tree[4].children.push({label:'Equipe Técnica',url:'https://www.nugeo.uema.br/?page_id=9221',children:[]},{label:'Agende sua visita',url:'https://www.nugeo.uema.br/?page_id=8553',children:[]});
 async function add(items,parent=0) {
  for(const item of items) {
   const found=existing.find(e=>e.title.rendered===item.label && e.parent===parent);
   const added=await api(found?`menu-items/${found.id}`:'menu-items',{title:item.label,url:item.url,type:'custom',status:'publish',menus:menu.id,parent});
   await add(item.children,added.id);
  }
 }
 await add(tree);
 console.log('PASS: páginas e menu local atualizados pela API autenticada.');
} finally {await browser.close();}
