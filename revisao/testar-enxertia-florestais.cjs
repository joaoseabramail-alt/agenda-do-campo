// node revisao/testar-enxertia-florestais.cjs
// Contrato da ronda de enxertia das florestais (carvalhos, sobreiro, cerejeira-brava, vidoeiro e azevinho) contra 7413595; não testa Chromium.
// Numa ronda seguinte, fixar os dados no commit desta ronda (como nos outros testes).
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='7413595';
const ids=['carvalho_alvarinho','carvalho_negral','carvalho_pantanos','sobreiro','cerejeira_brava','vidoeiro','azevinho'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const meses=id=>id==='vidoeiro'?[1,2]:[2,3];
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,meses(a.id),a.id);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 assert(e.nota&&e.nota.length<=110,a.id);assert(!a.notas?.enx,'sem notas por mês: '+a.id);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.fontes.length);
 delete a.revisao['propagacao.enxertia'];if(!Object.keys(a.revisao).length)delete a.revisao;a.propagacao.enxertia=b.propagacao.enxertia;
 assert.deepEqual(a,b,'Campo fora do âmbito: '+a.id);
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
for(const id of ['carvalho_alvarinho','carvalho_negral','carvalho_pantanos'])assert.match(linha(id,2),/^Prefira a bolota: .*encurtar a vida/);
assert.match(linha('sobreiro',3),/^Prefira a bolota; .*cortiça/);
assert.match(linha('cerejeira_brava',2),/^Garfo dormente de cerca de 15 cm/);
assert.match(linha('vidoeiro',1),/garfo lateral ou inglês/);assert.equal(linha('vidoeiro',3),'');
assert.match(linha('azevinho',3),/azevinho de semente/);
console.log(`Florestais conferidas; ${pares} combinações; contagens e restantes linhas iguais à base.`);
