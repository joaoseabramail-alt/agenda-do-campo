// node revisao/testar-enxertia-figueira-romazeira-medronheiro.cjs
// Contrato da ronda de enxertia da figueira, da romãzeira e do medronheiro contra 28c1b14; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (c774b0f): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='28c1b14',ronda='c774b0f',ids=['figueira','romazeira','medronheiro'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const estado={figueira:'parcial',romazeira:'parcial',medronheiro:'suspenso'};
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia,eb=b.propagacao.enxertia;assert.equal(e.dificuldade,eb.dificuldade);
 if(a.id==='medronheiro'){assert.deepEqual(e.meses,[]);assert.equal(e.nota,null)}
 else{assert.deepEqual(e.meses,eb.meses);assert(e.nota&&e.nota.length<=110);assert.deepEqual(a.metodo_recomendado,['estacas'])}
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,estado[a.id]);assert(r.nota);
 delete a.revisao['propagacao.enxertia'];a.propagacao.enxertia=eb;
 assert.deepEqual(a,b,'Campo fora do âmbito');
}
const src=now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
const app=P=>{const ctx=vm.createContext({dados:{plantas:P.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas}});
 vm.runInContext(src+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const A=app(after),B=app(before),plain=x=>JSON.parse(JSON.stringify(x));
const nomes=ids.map(id=>after.plantas.find(p=>p.id===id).nome);
const nMeses=(P,m)=>ids.filter(id=>P.plantas.find(p=>p.id===id).propagacao.enxertia.meses.includes(m)).length;
// As três plantas tiram-se das linhas e das listas agrupadas por dificuldade; o resto tem de ficar igual.
const tira=x=>x.grupo?{...x,nota:x.nota.replace(/\.$/,'').split(/,\s*/).filter(s=>!nomes.includes(s)).join(', ')}:x;
let pares=0;
for(const cat of A.categorias)for(let m=1;m<=12;m++){
 const d=cat==='enx'?nMeses(after,m)-nMeses(before,m):0;
 assert.equal(A.contar(cat,m),B.contar(cat,m)+d,`contagem ${cat}/${m}`);
 const strip=l=>plain(l.filter(x=>!(cat==='enx'&&ids.includes(x.p?.id))).map(({p,...r})=>r).map(tira).filter(x=>!(x.grupo&&!x.nota)));
 assert.deepEqual(strip(A.lista(cat,m)),strip(B.lista(cat,m)),`${cat}/${m}`);pares++;
}
const linha=(id,m)=>A.lista('enx',m).find(x=>x.p?.id===id)?.nota||'';
const todas=(cat,m)=>JSON.stringify(plain(A.lista(cat,m).map(({p,...r})=>r)));
for(let m=1;m<=12;m++)assert(!/Medronheiro/.test(todas('enx',m)),'medronheiro fora da enxertia em '+m);
for(const m of [3,4]){assert.match(linha('figueira',m),/^Propague por estacas dormentes/);assert.match(linha('romazeira',m),/estacas lenhosas/);assert(!/Método recomendado/.test(linha('figueira',m)+linha('romazeira',m)))}
console.log(`Figueira, romãzeira e medronheiro conferidos; ${pares} combinações; contagens e restantes linhas iguais à base.`);
