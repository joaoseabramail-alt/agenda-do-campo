// node revisao/testar-enxertia-aveleira-nespereira-feijoa.cjs
// Contrato da ronda de enxertia da aveleira, da nespereira e da feijoa contra c13ba53; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='c13ba53',ids=['aveleira','nespereira','feijoa'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const esperado={aveleira:{meses:[4,5],dificuldade:3},nespereira:{meses:[4,5],dificuldade:2},feijoa:{meses:[3,4],dificuldade:3}};
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,esperado[a.id].meses);assert.equal(e.dificuldade,esperado[a.id].dificuldade);
 assert(e.nota&&e.nota.length<=110);for(const t of Object.values(a.notas?.enx||{}))assert(t.length<=110);
 assert.equal(a.revisao['propagacao.enxertia'].estado,'parcial');
 delete a.notas?.enx;delete b.notas?.enx;for(const x of [a,b])if(x.notas&&!Object.keys(x.notas).length)delete x.notas;
 delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;
 a.propagacao.enxertia=b.propagacao.enxertia;
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
const todas=m=>JSON.stringify(plain(A.lista('enx',m).map(({p,...r})=>r)));
for(const m of [2,3])assert(!/Aveleira/.test(todas(m)),'aveleira fora de '+m);
assert.match(linha('aveleira',4),/folhas abertas/);assert.match(linha('aveleira',4),/0 °C/);assert.match(linha('aveleira',5),/^Até meados do mês/);
for(const m of [4,5])assert.match(linha('nespereira',m),/marmeleiro/);
for(const m of [3,4])assert.match(linha('feijoa',m),/racha facilmente/);
console.log(`Aveleira, nespereira e feijoa conferidas; ${pares} combinações; contagens e restantes linhas iguais à base.`);
