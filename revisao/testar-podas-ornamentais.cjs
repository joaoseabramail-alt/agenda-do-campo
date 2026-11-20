// node revisao/testar-podas-ornamentais.cjs
// Contrato da quarta ronda sobre 65a6a8c; executa a lógica real das listas em Node.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='65a6a8c7864c5b22cbc56f30bb5e1f0fc1fdccb7';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'}),now=f=>fs.readFileSync(path.join(root,f),'utf8');
const targets='arvore_ferro carvalho_pantanos cornus_kousa extremosa ginkgo liquidambar platano stewartia tilia aucuba hamamelis quaresmeira jacaranda melia'.split(' ');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json')),changes=[];
assert.equal(after.plantas.length,149);assert.equal(after.plantas.length,before.plantas.length);
assert.deepEqual(Object.keys(after),Object.keys(before));
for(const k of Object.keys(after))if(k!=='plantas')assert.deepEqual(after[k],before[k]);
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);
 if(JSON.stringify(a)!==JSON.stringify(b))changes.push(a.id);
 if(!targets.includes(a.id)){assert.deepEqual(a,b,'Ficha fora do âmbito: '+a.id);continue}
 const expected={jacaranda:[[4,5]],tilia:[[12,1,2],[3,4]]}[a.id]||b.poda.map(x=>x.meses);
 assert.deepEqual(a.poda.map(x=>x.meses),expected,'Meses imprevistos: '+a.id);
 const rev=a.revisao.poda;
 assert.equal(rev.estado,'parcial');assert.deepEqual(rev.alcance.verificado,['texto','tecnica']);
 assert.deepEqual(rev.alcance.por_rever,['meses',...(['tilia','hamamelis'].includes(a.id)?['identificacao']:[])]);
 assert.equal(rev.adaptacao_local.estado,'provisoria');assert(rev.fontes.length);
 assert(rev.fontes.every(f=>f.consultado==='2026-11-20'&&f.url.startsWith('https://')));
 delete a.poda;delete b.poda;delete a.revisao.poda;if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito (incluindo notas): '+a.id);
}
assert.deepEqual(changes.sort(),[...targets].sort());
for(const p of after.plantas)for(const m of Object.keys(p.notas?.podas||{}))assert(p.poda?.some(x=>x.meses.includes(+m)),`Nota escondida: ${p.id}/${m}`);
for(const f of ['index.html','tratamentos.json','calendario.json','verificar.js','ESQUEMA.md'])assert.equal(now(f),old(f),f+' alterado');
assert.equal(now('sw.js'),old('sw.js').replace('agenda-v44','agenda-v45'));
const fontes=JSON.parse(now('revisao/fontes/PODAS-ORNAMENTAIS-65a6a8c.json'));
for(const p of after.plantas.filter(x=>targets.includes(x.id)))for(const f of p.revisao.poda.fontes)assert(Object.values(fontes.fontes).some(x=>JSON.stringify(x)===JSON.stringify(f)),`Fonte ausente do catálogo: ${p.id}`);
function app(P){
 const dados={plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas};
 const ctx=vm.createContext({dados});
 vm.runInContext(now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0]+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
 return ctx.app;
}
const a=app(after),b=app(before),plain=x=>JSON.parse(JSON.stringify(x)),strip=l=>plain(l.map(({p,...row})=>row));
const delta={2:-1,4:2,5:1};let pares=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const la=a.lista(cat,m),lb=b.lista(cat,m);assert(la.every(x=>typeof x.nota==='string'));
 if(cat!=='podas'){assert.deepEqual(strip(la),strip(lb),`${cat}/${m}`);assert.equal(a.contar(cat,m),b.contar(cat,m))}
 else{
  assert.equal(a.contar(cat,m)-b.contar(cat,m),delta[m]||0,'Contagem de Podas: '+m);
  assert.deepEqual(strip(la.filter(x=>!targets.includes(x.p?.id))),strip(lb.filter(x=>!targets.includes(x.p?.id))));
  const expected=after.plantas.filter(p=>p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(plain(la.filter(x=>x.p).map(x=>x.p.id).sort()),expected);
  for(const p of after.plantas.filter(x=>targets.includes(x.id)))if(p.poda.some(x=>x.meses.includes(m)))assert.equal(la.find(x=>x.p?.id===p.id)?.nota,p.notas?.podas?.[m]||p.poda.filter(x=>x.meses.includes(m)).map(x=>x.tipo+'.').join(' '));
 }
 pares++;
}
const row=(id,m)=>a.lista('podas',m).find(x=>x.p?.id===id)?.nota;
for(const m of [2,3])assert.equal(row('jacaranda',m),undefined);
for(const m of [4,5]){assert.match(row('jacaranda',m),/risco de geada/);assert.match(row('jacaranda',m),/arborista/)}
for(const m of [12,1,2]){assert.match(row('tilia',m),/formação/);assert(!/remoção no início da primavera/.test(row('tilia',m)))}
for(const m of [3,4])assert.match(row('tilia',m),/rebentos indesejados.*primavera/);
assert.match(row('hamamelis',3),/dispensa poda regular/);assert.match(row('hamamelis',3),/outono/);
assert.match(row('extremosa',2),/Não encurte sistematicamente/);
assert.match(row('platano',1),/já conduzida em cabeça/);
assert.match(row('cornus_kousa',2),/não o corte rente/);
assert.match(row('quaresmeira',3),/risco de geada/);
for(const id of targets.filter(x=>!['jacaranda','tilia'].includes(x)))for(let m=1;m<=12;m++)assert.equal(Boolean(row(id,m)),Boolean(b.lista('podas',m).find(x=>x.p?.id===id)),`Presença alterada: ${id}/${m}`);
console.log(`14 fichas, campos e fontes conferidos; ${pares} combinações; só dois calendários alterados; nenhuma nota de poda escondida; outras 135 fichas e restantes botões iguais à base.`);
console.log('Contagens de Podas:',JSON.stringify(Object.fromEntries(Array.from({length:12},(_,i)=>[i+1,a.contar('podas',i+1)]))));
