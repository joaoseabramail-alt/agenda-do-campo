// node revisao/testar-enxertia-cerejeira-amendoeira.cjs
// Contrato da ronda de enxertia da cerejeira e da amendoeira contra 3ca136f; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='3ca136f',ids=['cerejeira','amendoeira'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const meses={cerejeira:[2,3,8],amendoeira:[2,3,7,8]};
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.propagacao.enxertia,b.propagacao.enxertia,'meses, dificuldade e nota geral iguais');
 assert.deepEqual(a.propagacao.enxertia.meses,meses[a.id]);
 for(const t of Object.values(a.notas.enx))assert(t.length<=110);
 assert(!Object.values(a.notas.enx).some(t=>/olho dormente/.test(t)),'sem «olho dormente» sem fonte');
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.alcance.por_rever.includes('meses'));
 delete a.notas.enx;delete b.notas.enx;delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito');
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&ids.includes(x.p?.id))).map(({p,...r})=>r));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
assert.match(linha('cerejeira',2),/^Colha garfos dormentes/);assert.match(linha('cerejeira',3),/fenda a partir de 5 cm/);assert.match(linha('cerejeira',8),/^Borbulha em T/);
for(const m of [7,8])assert.match(linha('amendoeira',m),/casca do porta-enxerto descolar/);
assert.equal(linha('cerejeira',5),'');assert.equal(linha('amendoeira',5),'');
console.log(`Cerejeira e amendoeira conferidas; ${pares} combinações; contagens e restantes linhas iguais à base.`);
