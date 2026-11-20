// node revisao/testar-tarefa-plantacao.cjs
// Contrato da tarefa geral "Fruteiras · cuidados na plantação" contra a9060b4; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (8f516f3): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='a9060b4',ronda='8f516f3';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['plantas.json','tratamentos.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const antes=JSON.parse(old('calendario.json')),depois=JSON.parse(now('calendario.json'));
assert.deepEqual(depois.tarefas.slice(0,antes.tarefas.length),antes.tarefas,'tarefas existentes alteradas');
assert.equal(depois.tarefas.length,antes.tarefas.length+1);
const t=depois.tarefas.at(-1);
assert.deepEqual(Object.keys(t),['categoria','meses','nome','texto']);
assert.equal(t.categoria,'plantar');assert.deepEqual(t.meses,[11,12,1,2]);
assert(t.nome.length<=45&&t.texto.length<=350,'texto demasiado longo para o telemóvel');
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=C=>{const ctx=vm.createContext({dados:{plantas:JSON.parse(now('plantas.json')).plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:C.tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(depois),B=app(antes),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 const la=plain(A.lista(cat,m).map(({p,...r})=>r)),lb=plain(B.lista(cat,m).map(({p,...r})=>r));
 assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
 if(cat==='plantar'&&t.meses.includes(m)){
  const i=la.findIndex(x=>x.nome===t.nome);assert(i>=0,'tarefa ausente em '+m);assert.equal(la[i].nota,t.texto);
  la.splice(i,1);
 }
 assert.deepEqual(la,lb,`${cat}/${m}`);pares++;
}
console.log(`Tarefa nova visível em Plantar nos meses ${t.meses.join(', ')}; ${pares} combinações; contagens e restantes linhas iguais.`);
