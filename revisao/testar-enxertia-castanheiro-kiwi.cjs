// node revisao/testar-enxertia-castanheiro-kiwi.cjs
// Contrato da ronda de enxertia do castanheiro e do kiwi contra f8e5de6; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (9da13d7): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='f8e5de6',ronda='9da13d7',ids=['castanheiro','kiwi'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const meses={castanheiro:[3,4,5,6,8,9],kiwi:[2,3,4,5,8,9]};
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,meses[a.id]);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 for(const t of [e.nota,...Object.values(a.notas.enx)])if(t)assert(t.length<=110);
 assert.equal(a.revisao['propagacao.enxertia'].estado,'parcial');assert(a.revisao['propagacao.enxertia'].alcance.por_rever.includes('meses'));
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
assert.match(linha('castanheiro',4),/^Fenda ou inglês/);assert(!/Coroa em abril/.test(linha('castanheiro',4)));assert.match(linha('castanheiro',8),/escudo/);assert.match(linha('castanheiro',3),/talhadia/);
assert.match(linha('kiwi',3),/^Garfo lateral/);assert.match(linha('kiwi',5),/coroa/);assert.match(linha('kiwi',9),/primavera seguinte/);
for(const m of [8])assert(!/adiantado/.test(linha('castanheiro',m)+linha('kiwi',m)),'critério de primavera fora do verão');
console.log(`Castanheiro e kiwi conferidos; ${pares} combinações; contagens e restantes linhas iguais à base.`);
