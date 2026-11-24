// node revisao/testar-enxertia-ornamentais-1.cjs
// Contrato da 1.ª ronda de enxertia das ornamentais (bordo-japonês, cerejeira-do-Japão, glicínia e três magnólias) contra 6c5ff54; não testa Chromium.
// Dados fixados no commit em que esta ronda foi publicada (8ae131a): rondas seguintes não quebram o contrato. index.html e sw.js vêm da cópia de trabalho.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='6c5ff54',ronda='8ae131a';
const ids=['bordo_japones','cerejeira_japao','glicinia','magnolia_grandiflora','magnolia_stellata','magnolia_acuminata'];
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const now=f=>['index.html','sw.js'].includes(f)?fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n'):cp.execFileSync('git',['show',`${ronda}:${f}`],{cwd:root,encoding:'utf8'});
for(const f of ['tratamentos.json','calendario.json'])assert.equal(now(f),old(f),f+' fora do âmbito');
const before=JSON.parse(old('plantas.json')),after=JSON.parse(now('plantas.json'));
const meses={bordo_japones:[2,3],cerejeira_japao:[2,3,7,8],glicinia:[12,1,2],magnolia_grandiflora:[2,3],magnolia_stellata:[2,3,8],magnolia_acuminata:[2,3,8]};
for(let i=0;i<after.plantas.length;i++){
 const a=structuredClone(after.plantas[i]),b=structuredClone(before.plantas[i]);assert.equal(a.id,b.id);
 if(!ids.includes(a.id)){assert.deepEqual(a,b,'Fora do âmbito: '+a.id);continue}
 const e=a.propagacao.enxertia;assert.deepEqual(e.meses,meses[a.id],a.id);assert.equal(e.dificuldade,b.propagacao.enxertia.dificuldade);
 for(const t of [e.nota,...Object.values(a.notas?.enx||{})])assert(t&&t.length<=110,a.id);
 for(const m of Object.keys(a.notas?.enx||{}))assert(e.meses.includes(+m),a.id+' nota fora dos meses: '+m);
 const r=a.revisao['propagacao.enxertia'];assert.equal(r.estado,'parcial');assert(r.alcance.por_rever.includes('meses'));assert(r.fontes.length);
 delete a.notas?.enx;delete b.notas?.enx;for(const x of [a,b])if(x.notas&&!Object.keys(x.notas).length)delete x.notas;
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
assert.match(linha('bordo_japones',2),/^Garfo lateral sobre bordo-japonês de semente/);
assert.match(linha('cerejeira_japao',3),/^Enxerte de garfo antes de a seiva subir\. Porta-enxerto: cerejeira-brava/);
assert.match(linha('cerejeira_japao',8),/^Faça borbulha em lasca\./);
assert.match(linha('glicinia',1),/prefira a mergulhia no verão/);
assert.match(linha('magnolia_grandiflora',3),/^Garfo lateral sobre magnólia-de-flor-grande/);
for(const id of ['magnolia_stellata','magnolia_acuminata']){assert.match(linha(id,8),/^Garfo lateral, o mais habitual/);assert.match(linha(id,2),/^Enxertia de mesa\./)}
console.log(`Ornamentais (1.ª ronda) conferidas; ${pares} combinações; contagens e restantes linhas iguais à base.`);
