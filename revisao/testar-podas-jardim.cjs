// node revisao/testar-podas-jardim.cjs
// Regressão das 17 fichas contra 9a3cb51; não certifica renderização.
// O contrato global de cada ronda pertence ao respetivo teste.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='9a3cb5148f9cca7752818245e22cb5681f14d825';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'}),now=f=>fs.readFileSync(path.join(root,f),'utf8');
const targets=['alecrim','lavanda','loureiro','salva','lucia_lima','roseira','hortensia','hortensia_carvalho','glicinia','buganvilia','budleia','fotinia','hibisco','fucsia','sardinheira','tamargueira','pitosporo'];
const expectedChangedMonths={hortensia:[[3,4]],hortensia_carvalho:[[6,7]],budleia:[[3,4]],tamargueira:[[3,4],[5,6]],roseira:[[1,2,3],[11],[10],[7,8]]};
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
assert.equal(after.plantas.length,before.plantas.length);
const changes=[];
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);
 if(!targets.includes(a.id))continue;
 if(JSON.stringify(a)!==JSON.stringify(b))changes.push(a.id);
 assert.equal(a.id,b.id);
 assert.deepEqual(a.poda.map(x=>x.meses),expectedChangedMonths[a.id]||b.poda.map(x=>x.meses),'Meses imprevistos: '+a.id);
 const rev=a.revisao.poda;
 assert.equal(rev.estado,'parcial');assert.deepEqual(rev.alcance.verificado,['texto','tecnica']);
 assert.deepEqual(rev.alcance.por_rever,['meses']);assert.equal(rev.adaptacao_local.estado,'provisoria');
 assert(rev.fontes.length&&rev.fontes.every(f=>f.consultado==='2026-11-20'));
 delete a.poda;delete b.poda;delete a.notas?.podas;delete b.notas?.podas;
 delete a.revisao.poda;if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
assert.deepEqual(changes.sort(),[...targets].sort());
for(const p of after.plantas)for(const m of Object.keys(p.notas?.podas||{}))assert(p.poda?.some(x=>x.meses.includes(Number(m))),'Nota de poda escondida: '+p.id+'/'+m);
for(const f of ['calendario.json','tratamentos.json'])assert.equal(now(f),old(f),f+' alterado');
// index.html e sw.js deixaram de ser comparados com a base: a interface pode evoluir; o comportamento das listas continua verificado abaixo.
function app(P){
 const dados={plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas};
 const ctx=vm.createContext({dados});
 vm.runInContext(now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0]+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
 return ctx.app;
}
const a=app(after),b=app(before),plain=x=>JSON.parse(JSON.stringify(x)),strip=l=>plain(l.map(({p,...row})=>row));
let pares=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const la=a.lista(cat,m),lb=b.lista(cat,m);
 if(cat!=='podas'){
  assert.deepEqual(strip(la),strip(lb),`${cat}/${m}`);assert.equal(a.contar(cat,m),b.contar(cat,m));
 }else{
  const inScope=l=>plain(l.filter(x=>targets.includes(x.p?.id)).map(x=>x.p.id).sort());
  const expectedInScope=after.plantas.filter(p=>targets.includes(p.id)&&p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(inScope(la),expectedInScope);
  const expected=after.plantas.filter(p=>p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(plain(la.filter(x=>x.p).map(x=>x.p.id).sort()),expected);
  for(const p of after.plantas.filter(x=>targets.includes(x.id)))if(p.poda.some(x=>x.meses.includes(m))){
   const row=la.find(x=>x.p?.id===p.id);
   assert(row);assert.equal(row.nota,p.notas?.podas?.[m]||p.poda.filter(x=>x.meses.includes(m)).map(x=>x.tipo+'.').join(' '));
  }
 }
 pares++;
}
const row=(id,m)=>a.lista('podas',m).find(x=>x.p?.id===id)?.nota;
assert.equal(row('hortensia',2),undefined);assert.match(row('hortensia',3),/preserve os ramos vivos/i);
assert.match(row('hortensia',4),/primeiro par de gomos sãos/);
assert.equal(row('hortensia_carvalho',8),undefined);assert.match(row('hortensia_carvalho',6),/logo depois da floração/);
assert.equal(row('budleia',2),undefined);assert.match(row('budleia',4),/Buddleja davidii/);
for(const m of [1,2,3]){assert.match(row('roseira',m),/Identifique o tipo/);assert(!/3 a 5 ramos|2–3 gomos/.test(row('roseira',m)))}
assert.match(row('roseira',7),/floração única/);
assert.match(row('glicinia',2),/laterais.*verão/);assert.match(row('glicinia',7),/5–6 folhas/);assert.match(row('glicinia',8),/5–6 folhas/);
assert.equal(row('tamargueira',2),undefined);assert.match(row('tamargueira',3),/floração de verão/);assert.match(row('tamargueira',5),/floração de primavera/);
assert.match(row('lavanda',3),/madeira velha/);assert.match(row('fotinia',4),/só se necessário/);
const idsInitial=before.plantas.filter(p=>p.poda?.some(x=>x.meses.some(m=>[12,1,2,3].includes(m))));
assert.equal(idsInitial.filter(p=>targets.includes(p.id)).length,16,'São 16 fichas do levantamento de inverno e uma adicional');
console.log(`Regressão das 17 fichas: ${pares} combinações; cinco calendários e textos preservados; nenhuma nota de poda escondida. Contrato das rondas seguintes no respetivo teste.`);
