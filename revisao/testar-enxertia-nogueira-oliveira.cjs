// node revisao/testar-enxertia-nogueira-oliveira.cjs
// Contrato da ronda de enxertia da nogueira e da oliveira contra 3f3780c; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='3f3780c';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const meses={nogueira:[4,5,6,8,9],oliveira:[3,4,5]},estados={nogueira:'parcial',oliveira:'provisorio'};
const alvos=Object.keys(meses);
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!alvos.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,meses[a.id]);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 for(const [m,t] of Object.entries(a.notas.enx)){assert(e.meses.includes(+m),'nota escondida '+a.id+'/'+m);assert(t.length<=110);assert(!/15 °C/.test(t))}
 assert.equal(a.revisao['propagacao.enxertia'].estado,estados[a.id]);
 delete a.notas.enx;delete b.notas.enx;delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;
 a.propagacao.enxertia=b.propagacao.enxertia;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 if(cat!=='enx'){assert.equal(A.contar(cat,m),B.contar(cat,m));assert.deepEqual(plain(A.lista(cat,m).map(({p,...r})=>r)),plain(B.lista(cat,m).map(({p,...r})=>r)),`${cat}/${m}`)}
 else{const ids=l=>plain(l.filter(x=>x.p&&!alvos.includes(x.p.id)).map(x=>x.p.id));assert.deepEqual(ids(A.lista(cat,m)),ids(B.lista(cat,m)),'enx/'+m)}
 pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
assert.equal(linha('nogueira',3),'');assert.match(linha('nogueira',4),/escorrer a seiva/);assert.match(linha('nogueira',8),/placa ou em T/);assert(!/15 °C/.test(linha('nogueira',4)));
assert.match(linha('oliveira',4),/quando a casca descola/);assert(!/borbulha/i.test(linha('oliveira',5)));
console.log(`Nogueira e oliveira conferidas; ${pares} combinações; outros botões e restantes plantas iguais à base.`);
