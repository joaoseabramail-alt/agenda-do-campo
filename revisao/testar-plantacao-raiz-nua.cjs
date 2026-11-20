// node revisao/testar-plantacao-raiz-nua.cjs
// Contrato da ronda de plantação (4 espécies) contra b5dc26f; não testa Chromium.
// Quando houver uma ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='b5dc26f23150e06aae55e5b968c5010cb9c1a518';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const targets={diospireiro:'em torrão ou vaso',mirtilo:'em vaso ou torrão',uva_mesa:'bacelo enxertado',videira:'bacelo enxertado'};
const estados={diospireiro:'provisorio',mirtilo:'parcial',uva_mesa:'provisorio',videira:'parcial'};
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
assert.equal(after.plantas.length,before.plantas.length);
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);
 assert.equal(a.id,b.id);
 if(!(a.id in targets)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.plantacao,{meses:[11,12,1,2,3],o_que:targets[a.id]});
 for(const m of Object.keys(a.notas.plantar))assert(a.plantacao.meses.includes(Number(m)),'Nota escondida '+a.id+'/'+m);
 const r=a.revisao.plantacao;assert.equal(r.estado,estados[a.id]);assert(r.alcance.por_rever.includes('meses'));
 if(r.estado==='parcial')assert(r.fontes.every(f=>/^https:\/\//.test(f.url)&&f.consultado==='2026-11-20'));
 delete a.plantacao;delete b.plantacao;delete a.notas.plantar;delete b.notas?.plantar;delete a.revisao.plantacao;
 if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
}
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' alterado');
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 const la=A.lista(cat,m);assert(la.every(x=>typeof x.nome==='string'&&typeof x.nota==='string'));
 if(cat!=='plantar')assert.deepEqual(plain(la.map(({p,...r})=>r)),plain(B.lista(cat,m).map(({p,...r})=>r)),`${cat}/${m}`);
 pares++;
}
const linha=(id,m)=>A.lista('plantar',m).find(x=>x.p?.id===id)?.nota||'';
for(const id of Object.keys(targets)){assert.match(linha(id,3),new RegExp('Plantar '+targets[id]));assert.equal(linha(id,4),'')}
assert.match(linha('videira',1),/raízes húmidas/);assert.match(linha('mirtilo',12),/terra ácida/);assert.match(linha('diospireiro',2),/torrão/);
console.log(`4 fichas e âmbito conferidos; ${pares} combinações sem exceções; restantes botões iguais à base; março visível em Plantar.`);
