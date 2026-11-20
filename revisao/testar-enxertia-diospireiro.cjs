// node revisao/testar-enxertia-diospireiro.cjs
// Contrato da ronda de enxertia do diospireiro contra dc82cc9; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='dc82cc9';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(a.id!=='diospireiro'){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.propagacao.enxertia,{...b.propagacao.enxertia,nota:null});
 assert.deepEqual(Object.keys(a.notas.enx).sort(),['3','4']);for(const t of Object.values(a.notas.enx))assert(t.length<=110);
 assert.equal(a.revisao['propagacao.enxertia'].estado,'parcial');
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
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&x.p?.id==='diospireiro')).map(({p,...r})=>r));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=m=>A.lista('enx',m).find(x=>x.p?.id==='diospireiro')?.nota||'';
assert.match(linha(3),/^Inglesa em repouso/);assert.match(linha(4),/^Borbulha em lasca/);assert(!/fenda/i.test(linha(3)));
console.log(`Diospireiro conferido; ${pares} combinações; contagens e restantes linhas iguais à base.`);
