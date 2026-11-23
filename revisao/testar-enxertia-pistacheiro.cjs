// node revisao/testar-enxertia-pistacheiro.cjs
// Contrato da ronda de enxertia do pistacheiro contra 9da13d7; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (76f5133): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='9da13d7',ronda='76f5133',id='pistacheiro';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(a.id!==id){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,b.propagacao.enxertia.meses);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 assert.match(e.nota,/borbulha em T/);assert(e.nota.length<=110);assert(!a.notas?.enx,'sem notas por mês');
 assert.equal(a.revisao['propagacao.enxertia'].estado,'parcial');
 delete b.notas?.enx;if(b.notas&&!Object.keys(b.notas).length)delete b.notas;
 delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;a.propagacao.enxertia=b.propagacao.enxertia;
 assert.deepEqual(a,b,'Campo fora do âmbito');
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&x.p?.id===id)).map(({p,...r})=>r));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=m=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
for(const m of [5,6,7,8]){assert.match(linha(m),/casca do porta-enxerto descolar/);assert(!/placa/i.test(linha(m)))}
console.log(`Pistacheiro conferido; ${pares} combinações; contagens e restantes linhas iguais à base.`);
