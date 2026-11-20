// node revisao/testar-enxertia-prunus.cjs
// Contrato da ronda de enxertia dos Prunus (pessegueiro, nectarina, ameixeira, damasqueiro) contra a98da65; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='a98da65';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const estados={pessegueiro:'parcial',nectarina:'parcial',ameixeira:'parcial',damasqueiro:'provisorio'};
const alvos=Object.keys(estados);
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
assert.equal(after.plantas.length,before.plantas.length);
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!alvos.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.propagacao.enxertia.meses,[2,3,8],'meses: '+a.id);
 assert.equal(a.propagacao.enxertia.dificuldade,b.propagacao.enxertia.dificuldade);
 assert.deepEqual(Object.keys(a.notas.enx).sort(),['2','3','8']);
 for(const t of Object.values(a.notas.enx))assert(t.length<=110);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,estados[a.id]);assert(r.alcance.por_rever.includes('meses'));
 if(r.estado==='parcial')assert.deepEqual(r.alcance.verificado,['tecnica']);
 delete a.notas.enx;delete b.notas?.enx;delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;
 a.propagacao.enxertia.meses=b.propagacao.enxertia.meses;
 if(b.notas&&!Object.keys(b.notas).length)delete b.notas;if(a.notas&&!Object.keys(a.notas).length)delete a.notas;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
const nomes=new Set(after.plantas.filter(p=>alvos.includes(p.id)).map(p=>p.nome));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 if(cat==='enx'){
  const ids=l=>l.filter(x=>x.p&&!alvos.includes(x.p.id)).map(x=>x.p.id);
  assert.deepEqual(plain(ids(A.lista(cat,m))),plain(ids(B.lista(cat,m))),'enx/'+m);
  const esperado=after.plantas.filter(p=>alvos.includes(p.id)&&p.propagacao.enxertia.meses.includes(m)).length;
  const vistos=A.lista(cat,m).filter(x=>x.p&&alvos.includes(x.p.id)).length;assert.equal(vistos,esperado,'Prunus em enx/'+m);
 }else{
  assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
  assert.deepEqual(plain(A.lista(cat,m).map(({p,...r})=>r)),plain(B.lista(cat,m).map(({p,...r})=>r)),`${cat}/${m}`);
 }
 pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
for(const id of alvos){assert.equal(linha(id,7),'',id+' ainda em julho');assert.match(linha(id,8),/olho dormente/);assert.match(linha(id,2),/planta dormente/)}
console.log(`4 Prunus com meses [2,3,8] e notas novas; ${pares} combinações; outros botões e restantes plantas iguais à base.`);
