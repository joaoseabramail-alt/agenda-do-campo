// node revisao/testar-enxertia-vinha.cjs
// Contrato da ronda de enxertia da videira e da uva de mesa contra c774b0f; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (f8e5de6): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='c774b0f',ronda='f8e5de6',ids=['videira','uva_mesa'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const notasDe=id=>JSON.stringify(after.plantas.find(p=>p.id===id).notas.enx);
assert.equal(notasDe('videira'),notasDe('uva_mesa'),'mesmas notas nas duas fichas');
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,[3,4,5,8,9]);assert.equal(e.nota,null);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 assert.deepEqual(Object.keys(a.notas.enx).sort((x,y)=>x-y),['3','4','5','8','9']);for(const t of Object.values(a.notas.enx))assert(t.length<=110);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.alcance.verificado.includes('meses'));assert.equal(r.fontes.length,2);
 delete a.notas.enx;delete b.notas?.enx;for(const x of [a,b])if(x.notas&&!Object.keys(x.notas).length)delete x.notas;
 delete a.revisao['propagacao.enxertia'];a.propagacao.enxertia=b.propagacao.enxertia;
 assert.deepEqual(a,b,'Campo fora do âmbito');
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
const nomes=ids.map(id=>after.plantas.find(p=>p.id===id).nome);
const nMeses=(P,m)=>ids.filter(id=>P.plantas.find(p=>p.id===id).propagacao.enxertia.meses.includes(m)).length;
const tira=x=>x.grupo?{...x,nota:x.nota.replace(/\.$/,'').split(/,\s*/).filter(s=>!nomes.includes(s)).join(', ')}:x;
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 const d=cat==='enx'?nMeses(after,m)-nMeses(before,m):0;
 assert.equal(A.contar(cat,m),B.contar(cat,m)+d,`contagem ${cat}/${m}`);
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&ids.includes(x.p?.id))).map(({p,...r})=>r).map(tira).filter(x=>!(x.grupo&&!x.nota)));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
// A tarefa «Videira: enxertia de mesa» (calendário, fevereiro) continua; aqui só contam as linhas das fichas.
const todas=m=>JSON.stringify(plain(A.lista('enx',m).filter(x=>!x.tarefa).map(({p,...r})=>r)));
for(const id of ids){assert.match(linha(id,3),/pouco antes do abrolhamento/);assert.match(linha(id,5),/casca descolar/);assert.match(linha(id,8),/^Borbulha em lasca/);assert(!/enxertia de mesa/i.test(linha(id,3)))}
assert(!/Videira|Uva de mesa/i.test(todas(2)),'fevereiro sem vinha');
console.log(`Videira e uva de mesa conferidas; ${pares} combinações; contagens e restantes linhas iguais à base.`);
