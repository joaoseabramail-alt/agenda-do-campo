// node revisao/testar-plantacao-vinha.cjs
// Contrato da correção da plantação da videira e da uva de mesa (CVRVV) contra 07c10d3; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='07c10d3';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const alvos=['videira','uva_mesa'];
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!alvos.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.plantacao,{meses:[1,2,3],o_que:'bacelo enxertado'});
 assert.deepEqual(Object.keys(a.notas.plantar).sort(),['1','2','3']);
 const r=a.revisao.plantacao;assert.equal(r.estado,'parcial');assert(r.alcance.verificado.includes('meses'));
 assert(r.fontes.some(f=>f.url.includes('cvrvv.pt')&&f.sustenta.includes('meses')));assert.equal(r.adaptacao_local.estado,'documentada');
 delete a.plantacao;delete b.plantacao;delete a.notas.plantar;delete b.notas.plantar;delete a.revisao.plantacao;delete b.revisao.plantacao;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 if(cat!=='plantar'){assert.deepEqual(plain(A.lista(cat,m).map(({p,...r})=>r)),plain(B.lista(cat,m).map(({p,...r})=>r)),`${cat}/${m}`);assert.equal(A.contar(cat,m),B.contar(cat,m))}
 else{const s=l=>plain(l.filter(x=>!alvos.includes(x.p?.id)).map(({p,...r})=>r));assert.deepEqual(s(A.lista(cat,m)),s(B.lista(cat,m)),'plantar/'+m)}
 pares++;
}
const linha=(id,m)=>A.lista('plantar',m).find(x=>x.p?.id===id)?.nota||'';
for(const id of alvos){for(const m of [11,12])assert.equal(linha(id,m),'',id+' ainda em '+m);for(const m of [1,2,3])assert.match(linha(id,m),/Plantar bacelo enxertado/)}
assert.match(linha('videira',3),/terra fria e húmida/);
console.log(`Videira e uva de mesa em Plantar só de janeiro a março; ${pares} combinações; restantes linhas iguais à base.`);
