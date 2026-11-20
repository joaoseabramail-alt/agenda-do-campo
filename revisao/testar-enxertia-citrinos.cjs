// node revisao/testar-enxertia-citrinos.cjs
// Contrato da ronda de enxertia dos citrinos contra eb45468; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='eb45468';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const alvos=['laranjeira','limoeiro','tangerineira'];
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!alvos.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.propagacao.enxertia.meses,[4,5,6,7,8,9]);assert.equal(a.propagacao.enxertia.dificuldade,1);
 assert.deepEqual(Object.keys(a.notas.enx),['9']);assert.match(a.notas.enx['9'],/geada/);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.alcance.por_rever.includes('meses'));
 delete a.notas.enx;delete b.notas.enx;delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;
 a.propagacao.enxertia.nota=b.propagacao.enxertia.nota;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&alvos.includes(x.p?.id))).map(({p,...r})=>r));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
for(const id of alvos){for(const m of [4,5,6,7,8])assert.match(linha(id,m),/^Borbulha em T quando a casca/);assert.match(linha(id,9),/proteja o enxerto da geada/);assert.equal(linha(id,3),'')}
console.log(`3 citrinos conferidos (meses iguais); ${pares} combinações; contagens e restantes linhas iguais à base.`);
