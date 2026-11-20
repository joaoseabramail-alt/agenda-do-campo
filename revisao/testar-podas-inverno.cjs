// node revisao/testar-podas-inverno.cjs
// Contrato do patch e comparação da lógica real contra a base; não testa Chromium.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='0d9de9b774db89a92473d87198da725a20b554d8';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8');
const targets=['videira','macieira','pereira','figueira','oliveira','kiwi','laranjeira','limoeiro','tangerineira'];
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
assert.equal(after.plantas.length,before.plantas.length);
const changes=[];
for(let n=0;n<after.plantas.length;n++){
 const a=structuredClone(after.plantas[n]),b=structuredClone(before.plantas[n]);
 if(JSON.stringify(a)!==JSON.stringify(b))changes.push(a.id);
 if(!targets.includes(a.id)){assert.deepEqual(a,b,a.id);continue}
 assert.equal(a.id,b.id);
 assert.deepEqual(a.poda.map(x=>x.meses),b.poda.map(x=>x.meses),'Meses alterados: '+a.id);
 const rev=a.revisao.poda;
 assert.equal(rev.estado,'parcial');assert.deepEqual(rev.alcance.por_rever,['meses']);
 assert(rev.fontes.length);assert.equal(rev.adaptacao_local.estado,'provisoria');
 // Só poda, notas.podas e revisao.poda podem mudar nestas nove fichas.
 delete a.poda;delete b.poda;delete a.notas?.podas;delete b.notas?.podas;
 delete a.revisao.poda;if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
assert.deepEqual(changes.sort(),[...targets].sort());
const ta=JSON.parse(now('tratamentos.json')),tb=JSON.parse(old('tratamentos.json'));
const fig=ta.tratamentos.find(x=>x.grupo==='Figueira').intervencoes[0];
assert.equal(fig.revisao.estado,'suspenso');assert.deepEqual(fig.meses,[]);
assert(!Object.hasOwn(fig.revisao,'adaptacao_local'));
delete tb.tratamentos.find(x=>x.grupo==='Figueira').intervencoes[0].revisao.adaptacao_local;
assert.deepEqual(ta,tb);
for(const f of ['index.html','calendario.json'])assert.equal(now(f),old(f),f+' alterado');
assert.equal(now('sw.js'),old('sw.js').replace('agenda-v41','agenda-v42'));
function app(P,T,html){
 const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:T.tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(html.split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0]+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
 return ctx.app;
}
const a=app(after,ta,now('index.html')),b=app(before,JSON.parse(old('tratamentos.json')),old('index.html'));
const json=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const la=a.lista(cat,m),lb=b.lista(cat,m);
 assert.equal(a.contar(cat,m),b.contar(cat,m));
 assert.deepEqual(json(la.map(x=>x.nome)),json(lb.map(x=>x.nome)));
 const strip=l=>json(l.map(({p,...row})=>row));
 if(cat!=='podas')assert.deepEqual(strip(la),strip(lb),`${cat}/${m}`);
 else{
  assert.deepEqual(strip(la.filter(x=>!targets.includes(x.p?.id))),strip(lb.filter(x=>!targets.includes(x.p?.id))));
  for(const row of la.filter(x=>targets.includes(x.p?.id))){
   const p=row.p;
   const expected=p.notas?.podas?.[m]||p.poda.filter(x=>x.meses.includes(m)).map(x=>x.tipo+'.').join(' ');
   assert.equal(row.nota,expected,`Nota mensal incoerente: ${p.id}/${m}`);
  }
 }
 pares++;
}
const row=(id,m)=>a.lista('podas',m).find(x=>x.p?.id===id)?.nota||'';
for(const m of [12,1,2]){
 assert.match(row('videira',m),/abrolhamento/);
 assert.match(row('kiwi',m),/machos.*depois da floração/);
 assert.match(row('kiwi',m),/PSA/);
}
assert.match(row('videira',3),/ainda não abrolharam/);
assert.match(row('videira',5),/a partir da floração/);
for(const id of ['laranjeira','limoeiro','tangerineira'])for(const m of [3,4,5])assert.match(row(id,m),/fora do risco de geada/);
for(const m of [2,3,4])assert.match(row('oliveira',m),/adie a poda/);
console.log(`9 fichas e âmbito conferidos; ${pares} combinações com contagens e presenças idênticas à base; textos mensais e suspensão da figueira verificados.`);
