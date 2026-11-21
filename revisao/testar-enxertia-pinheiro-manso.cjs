// node revisao/testar-enxertia-pinheiro-manso.cjs
// Contrato da ronda de enxertia do pinheiro-manso contra e31c267; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='e31c267',id='pinheiro_manso';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(a.id!==id){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.propagacao.enxertia.meses,[4,5]);assert.equal(a.propagacao.enxertia.dificuldade,b.propagacao.enxertia.dificuldade);
 assert.match(a.propagacao.enxertia.nota,/^Fenda cheia terminal/);
 assert.deepEqual(Object.keys(a.notas.enx).sort(),['4','5']);for(const t of [...Object.values(a.notas.enx),a.propagacao.enxertia.nota])assert(t.length<=110);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.alcance.verificado.includes('meses'));assert.equal(r.adaptacao_local.estado,'documentada');
 delete a.notas.enx;if(!Object.keys(a.notas).length)delete a.notas;delete a.revisao['propagacao.enxertia'];
 a.propagacao.enxertia={...a.propagacao.enxertia,meses:b.propagacao.enxertia.meses,nota:b.propagacao.enxertia.nota};
 assert.deepEqual(a,b,'Campo fora do âmbito');
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 if(!(cat==='enx'&&m===3))assert.equal(A.contar(cat,m),B.contar(cat,m),`contagem ${cat}/${m}`);
 // Antes, sem notas, o pinheiro-manso aparecia na lista agrupada «Difícil»; tira-se das duas versões e compara-se o resto.
 const tira=x=>x.grupo?{...x,nota:x.nota.split(/,\s*/).map(s=>s.replace(/\.$/,'')).filter(s=>s!=='Pinheiro-manso').join(', ')}:x;
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&x.p?.id===id)).map(({p,...r})=>r).map(tira).filter(x=>!(x.grupo&&!x.nota)));
 const norm=l=>l.map(x=>x.grupo?{...x,nota:x.nota.replace(/\.$/,'')}:x);
 assert.deepEqual(norm(strip(A.lista(cat,m))),norm(strip(B.lista(cat,m))),`${cat}/${m}`);
 if(cat==='enx'&&m===3)assert(!/Pinheiro-manso/.test(JSON.stringify(plain(A.lista(cat,m).map(({p,...r})=>r)))),'março sem pinheiro-manso');
 pares++;
}
assert.equal(A.contar('enx',3),B.contar('enx',3)-1,'março perde uma planta');
const linha=m=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
assert.match(linha(4),/agulhas do garfo/);assert.match(linha(4),/Fenda cheia terminal/);assert.match(linha(5),/^Até meados do mês/);
console.log(`Pinheiro-manso conferido; ${pares} combinações; contagens e restantes linhas iguais à base (março perde o pinheiro-manso).`);
