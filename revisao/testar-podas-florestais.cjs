// node revisao/testar-podas-florestais.cjs
// Contrato da quinta ronda (21 florestais) sobre c9da49b; executa a lógica real das listas em Node.
// Dados fixados no commit em que esta ronda foi publicada (063c03d): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='c9da49b82c0b72747004505ad73eda66520b5c78';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'}),now=f=>(['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`063c03d075f4e6e17998e35eef6f8ba11b6db69d:${f}`],{cwd:root,encoding:'utf8'}));
const targets='amieiro azevinho carvalho_alvarinho carvalho_negral choupo freixo pilriteiro pinheiro_manso salgueiro_cinzento sanguinho choupo_negro choupo_branco choupo_tremedor carvalho_cerquinho azinheira tramazeira sorveira teixo ulmeiro pereira_brava pinheiro_bravo'.split(' ');
const meses={azevinho:[[3,4]],carvalho_alvarinho:[[7,8]],pilriteiro:[[1,2]],salgueiro_cinzento:[[2,3]],sanguinho:[[2,3]],tramazeira:[[2,3]],teixo:[[8,9]]};
const confirmados='azevinho carvalho_alvarinho pilriteiro sanguinho azinheira tramazeira ulmeiro'.split(' ');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json')),changes=[];
// Espécies acrescentadas depois desta ronda não fazem parte do contrato: ficam de fora da comparação.
const idsBase=new Set(before.plantas.map(p=>p.id));after.plantas=after.plantas.filter(p=>idsBase.has(p.id));
assert.equal(after.plantas.length,149);assert.equal(after.plantas.length,before.plantas.length);
assert.deepEqual(Object.keys(after),Object.keys(before));
for(const k of Object.keys(after))if(k!=='plantas')assert.deepEqual(after[k],before[k]);
const P=id=>after.plantas.find(p=>p.id===id),B=id=>before.plantas.find(p=>p.id===id);
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);
 if(JSON.stringify(a)!==JSON.stringify(b))changes.push(a.id);
 if(!targets.includes(a.id)){assert.deepEqual(a,b,'Ficha fora do âmbito: '+a.id);continue}
 assert.deepEqual(a.poda.map(x=>x.meses),meses[a.id]||b.poda.map(x=>x.meses),'Meses imprevistos: '+a.id);
 const rev=a.revisao.poda,conf=confirmados.includes(a.id);
 assert.equal(rev.estado,conf?'confirmado':'parcial',a.id);assert.equal(rev.data_revisao,'2026-11-20');
 if(conf){assert(rev.alcance.verificado.includes('meses'),a.id);assert.equal(rev.alcance.por_rever,undefined)}
 else{assert(!rev.alcance.verificado.includes('meses'),a.id);assert.deepEqual(rev.alcance.por_rever,['meses'])}
 assert.equal(rev.adaptacao_local.estado,'provisoria');assert(rev.fontes.length&&rev.nota);
 assert(rev.fontes.every(f=>f.consultado==='2026-11-20'&&f.url.startsWith('https://')));
 if(a.id==='pinheiro_manso'){assert.equal(a.notas.podas,undefined,'notas de poda do pinheiro-manso por retirar');assert(b.notas.podas);delete b.notas.podas}
 delete a.poda;delete b.poda;delete a.revisao.poda;if(!Object.keys(a.revisao).length)delete a.revisao;
 assert.deepEqual(a,b,'Campo fora do âmbito (incluindo toxicidade e notas): '+a.id);
}
assert.deepEqual(changes.sort(),[...targets].sort());
// Regras legais e de segurança: não enfraquecer.
assert.deepEqual(P('azinheira').poda,B('azinheira').poda,'azinheira alterada');
assert.deepEqual(P('pinheiro_bravo').poda,B('pinheiro_bravo').poda,'pinheiro-bravo alterado');
assert.match(P('pinheiro_manso').poda[0].tipo,/MADC/);assert.match(P('pinheiro_manso').poda[0].tipo,/nemátodo/);assert(!/rente ao tronco/.test(JSON.stringify([P('pinheiro_manso').poda,P('pinheiro_manso').notas])));
assert.match(P('teixo').poda[0].tipo,/tóxico/);assert.match(P('teixo').poda[0].tipo,/silvestres.*regime de proteção/);
assert.match(P('ulmeiro').poda[0].tipo,/desinfete/);assert.match(P('ulmeiro').poda[0].tipo,/grafiose/);
assert.match(P('azevinho').poda[0].tipo,/origem legal/);
for(const p of after.plantas)for(const m of Object.keys(p.notas?.podas||{}))assert(p.poda?.some(x=>x.meses.includes(+m)),`Nota escondida: ${p.id}/${m}`);
for(const f of ['calendario.json','verificar.js','ESQUEMA.md'])assert.equal(now(f),old(f),f+' alterado');
// As alterações de tratamentos são verificadas nos testes próprios de tratamentos.
// index.html e sw.js deixaram de ser comparados com a base: a interface pode evoluir; o comportamento das listas continua verificado abaixo.
const fontes=JSON.parse(now('revisao/fontes/PODAS-FLORESTAIS-c9da49b.json'));
for(const id of targets)for(const f of P(id).revisao.poda.fontes)assert(Object.values(fontes.fontes).some(x=>JSON.stringify(x)===JSON.stringify(f)),`Fonte ausente do catálogo: ${id}`);
function app(D){
 const dados={plantas:D.plantas,tratamentos:JSON.parse(now('tratamentos.json')).tratamentos,tarefas:JSON.parse(now('calendario.json')).tarefas};
 const ctx=vm.createContext({dados});
 vm.runInContext(now('index.html').split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0]+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
 return ctx.app;
}
const a=app(after),b=app(before),plain=x=>JSON.parse(JSON.stringify(x)),strip=l=>plain(l.map(({p,...row})=>row));
const delta={1:-4,2:-2,3:2,4:-1,7:1,8:1,12:-5};let pares=0;
for(const cat of a.categorias)for(let m=1;m<=12;m++){
 const la=a.lista(cat,m),lb=b.lista(cat,m);assert(la.every(x=>typeof x.nota==='string'));
 if(cat!=='podas'){assert.deepEqual(strip(la),strip(lb),`${cat}/${m}`);assert.equal(a.contar(cat,m),b.contar(cat,m))}
 else{
  assert.equal(a.contar(cat,m)-b.contar(cat,m),delta[m]||0,'Contagem de Podas: '+m);
  assert.deepEqual(strip(la.filter(x=>!targets.includes(x.p?.id))),strip(lb.filter(x=>!targets.includes(x.p?.id))));
  const expected=after.plantas.filter(p=>p.poda?.some(x=>x.meses.includes(m))).map(p=>p.id).sort();
  assert.deepEqual(plain(la.filter(x=>x.p).map(x=>x.p.id).sort()),expected);
  for(const p of after.plantas.filter(x=>targets.includes(x.id)))if(p.poda.some(x=>x.meses.includes(m)))assert.equal(la.find(x=>x.p?.id===p.id)?.nota,p.notas?.podas?.[m]||p.poda.filter(x=>x.meses.includes(m)).map(x=>x.tipo+'.').join(' '));
 }
 pares++;
}
const row=(id,m)=>a.lista('podas',m).find(x=>x.p?.id===id)?.nota;
assert.equal(row('carvalho_alvarinho',1),undefined);assert.match(row('carvalho_alvarinho',7),/copa natural/);
for(const m of [1,12])assert.match(row('pinheiro_manso',m),/MADC/);
assert.match(row('azinheira',11),/autorizada pelo ICNF/);assert.match(row('azinheira',3),/autorizada pelo ICNF/);
assert.equal(row('teixo',3),undefined);assert.match(row('teixo',8),/tóxico/);
assert.match(row('ulmeiro',1),/grafiose/);
console.log(`21 fichas, campos e fontes conferidos; ${pares} combinações; sete calendários alterados; regras legais mantidas; nenhuma nota de poda escondida; outras 128 fichas e restantes botões iguais à base.`);
console.log('Contagens de Podas:',JSON.stringify(Object.fromEntries(Array.from({length:12},(_,i)=>[i+1,a.contar('podas',i+1)]))));

