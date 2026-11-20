// node revisao/testar-podas-fruto.cjs
// Regressão das 14 fichas de fruto contra 89e4f31; exige o commit local.
// O contrato global de cada ronda pertence ao respetivo teste.
// Dados fixados no commit em que esta ronda foi publicada (9a3cb51): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='89e4f31959349261ced6e2ae56aa6b00bf9dc55c';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'}),now=f=>(['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`9a3cb5148f9cca7752818245e22cb5681f14d825:${f}`],{cwd:root,encoding:'utf8'}));
const targets=['amendoeira','amoreira','aveleira','castanheiro','diospireiro','feijoa','marmeleiro','medronheiro','pistacheiro','romazeira','framboeseira','groselheira','mirtilo','uva_mesa'];
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
// Espécies acrescentadas depois desta ronda não fazem parte do contrato: ficam de fora da comparação.
const idsBase=new Set(before.plantas.map(p=>p.id));after.plantas=after.plantas.filter(p=>idsBase.has(p.id));
assert.equal(after.plantas.length,before.plantas.length);
const changes=[];
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);
 if(!targets.includes(a.id))continue;
 if(JSON.stringify(a)!==JSON.stringify(b))changes.push(a.id);
 assert.equal(a.id,b.id);
 const expectedMonths={castanheiro:[[2,3]],feijoa:[[4,5]]}[a.id]||b.poda.map(x=>x.meses);
 assert.deepEqual(a.poda.map(x=>x.meses),expectedMonths,'Meses não previstos: '+a.id);
 const rev=a.revisao.poda;
 assert.equal(rev.estado,'parcial');assert.deepEqual(rev.alcance.verificado,['texto','tecnica']);
 assert.deepEqual(rev.alcance.por_rever,['meses']);assert.equal(rev.adaptacao_local.estado,'provisoria');
 assert(rev.fontes.length);assert(rev.fontes.every(f=>f.consultado==='2026-11-20'));
 delete a.poda;delete b.poda;delete a.notas?.podas;delete b.notas?.podas;
 delete a.revisao.poda;if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
assert.deepEqual(changes.sort(),[...targets].sort());
for(const file of ['calendario.json'])assert.equal(now(file),old(file),file+' alterado');
// As alterações de tratamentos são verificadas nos testes próprios de tratamentos.
// index.html e sw.js deixaram de ser comparados com a base: a interface pode evoluir; o comportamento das listas continua verificado abaixo.
function app(P){
 const dados={plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas};
 const ctx=vm.createContext({dados});
 vm.runInContext(now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0]+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
 return ctx.app;
}
const a=app(after),b=app(before),plain=x=>JSON.parse(JSON.stringify(x));
const strip=l=>plain(l.map(({p,...row})=>row));
let pares=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const la=a.lista(cat,m),lb=b.lista(cat,m);
 assert(la.every(row=>typeof row.nota==='string'));
 if(cat!=='podas'){
  assert.deepEqual(strip(la),strip(lb),`${cat}/${m}`);
  assert.equal(a.contar(cat,m),b.contar(cat,m));
 }else{
  const inScope=l=>plain(l.filter(x=>targets.includes(x.p?.id)).map(x=>x.p.id).sort());
  const expectedInScope=after.plantas.filter(p=>targets.includes(p.id)&&p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(inScope(la),expectedInScope);
  const expected=after.plantas.filter(p=>p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(plain(la.filter(x=>x.p).map(x=>x.p.id).sort()),expected);
 }
 pares++;
}
const row=(id,m)=>a.lista('podas',m).find(x=>x.p?.id===id)?.nota;
for(const m of [12,1,2]){
 assert.match(row('uva_mesa',m),/depende da casta/);
 assert.match(row('uva_mesa',m),/abrolhamento/);
 assert(!/Poda mais longa/.test(row('uva_mesa',m)));
}
assert.match(row('uva_mesa',5),/vingamento/);assert(!/1 a 2 cachos/.test(row('uva_mesa',5)));
assert.equal(row('castanheiro',12),undefined);assert.equal(row('castanheiro',1),undefined);
assert.match(row('castanheiro',3),/cancro/);
assert.equal(row('feijoa',2),undefined);assert.equal(row('feijoa',3),undefined);
assert.match(row('feijoa',4),/depois do frio/);assert.match(row('feijoa',5),/Não necessita de poda anual/);
assert.match(row('framboeseira',2),/única colheita de outono/);
assert.match(row('framboeseira',2),/Nas variedades de verão, conserve/);
assert.match(row('groselheira',1),/groselheira vermelha/);
assert.match(row('mirtilo',2),/primeiros dois anos/);
assert.match(row('amendoeira',2),/doença do chumbo/);
console.log(`Regressão das 14 fichas de fruto: ${pares} combinações sem exceções; meses e textos verificados. Contrato das rondas seguintes no respetivo teste.`);

