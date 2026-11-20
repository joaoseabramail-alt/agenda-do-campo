// node revisao/testar-tratamentos-primavera-A.cjs
// Contrato desta ronda contra e2e9c8e: dados e execução real das listas.
// Não compara index.html nem sw.js com a base e não simula Chromium/offline.
// Dados fixados no commit em que esta ronda foi publicada (b5dc26f): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),base='e2e9c8eaf3ab5c9744ce36fc52f82c5c9cb3ba79';
const raw=f=>(['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`b5dc26f23150e06aae55e5b968c5010cb9c1a518:${f}`],{cwd:root,encoding:'utf8'}));
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const read=f=>JSON.parse(raw(f));
const before=JSON.parse(old('tratamentos.json')),after=read('tratamentos.json');
// Espécies acrescentadas depois da base (cf31ca5: castanheiro_india, pimento_padron) ficam fora do contrato desta ronda.
const idsBase=new Set(JSON.parse(old('plantas.json')).plantas.map(p=>p.id));
for(const g of after.tratamentos)g.especies=g.especies.filter(e=>idsBase.has(e));
const targets=[[0,2],[1,1],[2,1],[3,0],[3,1],[5,0],[5,1],[6,0],[6,1],[7,1],[7,2],[8,1],[9,0],[9,1],[9,2],[17,0],[17,1],[18,0],[18,1],[22,0],[22,1],[27,1],[28,1],[37,0]];
const keys=new Set(targets.map(([g,i])=>`${g}/${i}`));
assert.equal(targets.length,24);
assert.deepEqual(Object.keys(after),Object.keys(before));
for(const k of Object.keys(after))if(k!=='tratamentos')assert.deepEqual(after[k],before[k]);
assert.equal(after.tratamentos.length,before.tratamentos.length);
const reviewed=[];
for(let g=0;g<after.tratamentos.length;g++){
 const a=structuredClone(after.tratamentos[g]),b=structuredClone(before.tratamentos[g]);
 const ai=a.intervencoes,bi=b.intervencoes;delete a.intervencoes;delete b.intervencoes;
 assert.deepEqual(a,b,'Campo do grupo fora do âmbito: '+g);
 assert.equal(ai.length,bi.length+(g===6?3:0));
 for(let i=0;i<bi.length;i++){
  if(!keys.has(`${g}/${i}`)){assert.deepEqual(ai[i],bi[i],`Intervenção fora do âmbito: ${g}/${i}`);continue;}
  assert(!bi[i].revisao);assert.notDeepEqual(ai[i],bi[i]);
  assert.deepEqual(Object.keys(ai[i]).sort(),['meses','revisao','texto','tipo']);
  assert.equal(ai[i].tipo,bi[i].tipo);reviewed.push(ai[i]);
 }
 if(g===6)for(const iv of ai.slice(bi.length)){assert.equal(iv.tipo,'monitorizacao');reviewed.push(iv);}
}
for(const f of ['calendario.json','ESQUEMA.md','verificar.js'])assert.equal(raw(f),old(f),f+' fora do âmbito');
{const pa=read('plantas.json').plantas.filter(p=>idsBase.has(p.id)),pb=JSON.parse(old('plantas.json')).plantas;assert.deepEqual(pa,pb,'plantas.json fora do âmbito (espécies da base)');}
assert.equal(reviewed.length,27);
assert.equal(reviewed.filter(x=>x.tipo==='fitofarmaco').length,10);
for(const iv of reviewed){
 const r=iv.revisao;
 assert.equal(r.estado,'parcial');assert.equal(r.data_revisao,'2026-11-20');
 assert(r.alcance.verificado.includes('texto'));assert(r.alcance.verificado.includes('tecnica'));
 assert(r.alcance.por_rever.includes('meses'));assert(!r.alcance.verificado.includes('meses'));
 assert.equal(r.adaptacao_local.estado,'provisoria');
 for(const f of r.fontes){assert(/^https:\/\//.test(f.url));assert(f.seccao);assert.equal(f.consultado,'2026-11-20');if(f.ficheiro)assert(fs.statSync(path.join(root,f.ficheiro)).isFile());}
 if(iv.tipo==='fitofarmaco'){
  assert(r.alcance.por_rever.includes('produto'));assert(!r.alcance.verificado.includes('produto'));
  assert.match(iv.texto,/SIFITO/);assert.match(iv.texto,/rótulo/);assert.match(iv.texto,/utilizador/);
  assert(!/por exemplo|30 °C|Bacillus thuringiensis/.test(iv.texto),'Receita genérica reintroduzida');
 }
}
// Calendários alterados e novas vigilâncias: expectativas explícitas da revisão.
const months={
 '0/2':[4,5,6,7],'1/1':[3,4,5,6],'2/1':[3,4,5,6],'3/0':[4,5,6],'3/1':[4,5,6,7],
 '5/0':[5,6],'6/1':[4,5,6,7],'7/1':[4,5,6],'9/0':[3,4],'9/1':[5,6],'9/2':[5,6,7,8],
 '17/1':[4,5,6,7,8,9,10],'18/1':[3,4,5,6,7],'22/1':[2,3,4,5,6,7,8,9,10],
 '27/1':[3,4,5,6,7,8,9],'6/3':[3,4,5,6,7,8,9],'6/4':[4,5,6,7,8,9],'6/5':[4,5,6,7,8,9]
};
for(const [g,i] of [...targets,[6,3],[6,4],[6,5]])assert.deepEqual(after.tratamentos[g].intervencoes[i].meses,months[`${g}/${i}`]||before.tratamentos[g].intervencoes[i].meses,`Meses ${g}/${i}`);
const pending=d=>d.tratamentos.flatMap((t,g)=>t.intervencoes.map((iv,i)=>({g,i,iv}))).filter(x=>!x.iv.revisao&&x.iv.meses.some(m=>m>=3&&m<=6));
assert.equal(pending(before).length,67);assert.equal(pending(after).length,43);
// Usar a lógica presente da app para ambas as bases; a interface não fica congelada.
const source=raw('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
assert(source.includes('function lista('));
function app(t){
 const dados={plantas:read('plantas.json').plantas,tratamentos:t.tratamentos,tarefas:read('calendario.json').tarefas};
 const ctx=vm.createContext({dados});vm.runInContext(source+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app;
}
const a=app(after),b=app(before),plain=x=>JSON.parse(JSON.stringify(x));
const totalsBefore=[22,33,50,64,78,76,71,66,60,49,32,22],totalsAfter=[22,33,54,68,81,82,74,68,62,49,32,22];
let pairs=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const rows=a.lista(cat,m);assert(Array.isArray(rows));assert(rows.every(x=>typeof x.nome==='string'&&typeof x.nota==='string'));
 assert(Number.isFinite(a.contar(cat,m)));
 if(cat!=='trat')assert.deepEqual(plain(rows),plain(b.lista(cat,m)),`${cat}/${m} alterado`);
 else{
  assert.equal(b.contar(cat,m),totalsBefore[m-1]);assert.equal(a.contar(cat,m),totalsAfter[m-1]);
  const active=rows.filter(x=>!x.tarefa);
  // Cada intervenção aparece só nos seus meses; suspensas continuam ausentes.
  for(const t of after.tratamentos)for(const iv of t.intervencoes){
   const found=active.filter(x=>x.nome===t.grupo&&x.nota===iv.texto);
   assert.equal(found.length,iv.meses.includes(m)?1:0,`${t.grupo}/${m}: linha ou nota escondida`);
   if(found.length)assert.equal(found[0].hot,iv.tipo==='fitofarmaco');
   if(iv.revisao?.estado==='suspenso')assert.equal(iv.meses.length,0);
  }
 }
 pairs++;
}
assert.equal(pairs,108);
const iv=(g,i)=>after.tratamentos[g].intervencoes[i];
for(const [g,i,m] of [[6,1,4],[9,0,3],[18,1,3],[27,1,3],[17,1,9],[3,1,7],[9,2,8]])assert(a.lista('trat',m).some(x=>x.nota===iv(g,i).texto));
assert.match(iv(9,0).texto,/flores femininas abertas/);assert.match(iv(9,1).texto,/doenças diferentes/);
assert.match(iv(8,1).texto,/Não corte nem destrua galhas verdes ou secas/);
assert.match(iv(3,1).texto,/não se aplica automaticamente à cerejeira-do-Japão/);
assert.match(iv(6,3).texto,/podridão cinzenta/);assert.match(iv(6,4).texto,/ninfas/);assert.match(iv(6,5).texto,/medidas obrigatórias/);
assert(iv(6,5).revisao.alcance.verificado.includes('estatuto'));
// Evidência SIFITO identifica alvos, ambientes e grupos; não usa zero nominal como ausência.
const ev=read('revisao/fontes/SIFITO-primavera-A-2026-11-20.json');
assert.equal(ev.consultas.length,10);assert.equal(ev.matriz.length,10);
for(const q of ev.consultas){assert.equal(q.recebidos,q.total_declarado);assert(/^[a-f0-9]{64}$/.test(q.sha256_resposta));assert(q.filtro);assert(q.url.includes('filter='));}
assert.equal(ev.consultas.find(q=>q.id==='extremosa').recebidos,0);
for(const row of ev.matriz){
 const t=after.tratamentos.find(t=>t.grupo===row.grupo);assert.equal(t.intervencoes[row.intervencao].tipo,'fitofarmaco');
 assert(row.testemunhos.length);
 for(const w of row.testemunhos){assert(w.NumAutProd);assert(w.ArLivreProtInt.split(' + ').includes('A'));assert(w.DataValidF1.slice(0,10)>='2026-11-20');}
}
const cabbage=ev.matriz.find(x=>x.grupo==='Couves e brócolos');assert.equal(cabbage.testemunhos.length,6);assert(cabbage.testemunhos.every(w=>w.NomeCientInim==='Pieris brassicae'));
const vine=ev.matriz.filter(x=>x.grupo==='Videira e uva de mesa');assert(vine.every(x=>x.testemunhos.some(w=>/mesa/.test(w.SitPartic)&&/vinificação/.test(w.SitPartic))));
const extreme=ev.matriz.find(x=>x.grupo==='Extremosa').testemunhos;assert(extreme.some(w=>w.NomeCultura==='Ornamentais (coníferas, árvores e arbustos)'&&w.NomeCientInim==='Oidium sp.'));
console.log('24 intervenções existentes + 3 novas; âmbito, fontes, 10 indicações SIFITO e calendários conferidos.');
console.log('108 combinações sem exceções; 12 contagens de Tratamentos conferidas; restantes listas iguais à base.');
console.log('Tratamentos:',totalsAfter.join(', '));
