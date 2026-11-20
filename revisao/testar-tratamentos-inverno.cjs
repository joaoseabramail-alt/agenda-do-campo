// node revisao/testar-tratamentos-inverno.cjs
// Executa a geração real das listas; não simula renderização num browser.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..');
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const tratamentos=read('tratamentos.json').tratamentos;
const dados={plantas:read('plantas.json').plantas,tratamentos,tarefas:read('calendario.json').tarefas};
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const source=html.split('<script>')[1].split('/* ---------- Estado e desenho ---------- */')[0];
assert(source.includes('function lista('),'Não foi encontrada a lógica real da app');
const ctx=vm.createContext({dados});
vm.runInContext(source+'\nDB=dados;globalThis.app={lista,contar,categorias:Object.keys(CAT)};',ctx);
const {lista,contar,categorias}=ctx.app;
assert.equal(categorias.length,9);
let pares=0;
for(const k of categorias)for(let m=1;m<=12;m++){
 const linhas=lista(k,m);
 assert(Array.isArray(linhas));
 assert(linhas.every(x=>typeof x.nome==='string'&&typeof x.nota==='string'));
 assert(Number.isFinite(contar(k,m))&&contar(k,m)>=0);
 pares++;
}
// Cada intervenção ativa deve produzir exatamente uma linha com o seu tipo;
// uma intervenção suspensa não pode surgir como recomendação química.
for(let m=1;m<=12;m++){
 const actual=lista('trat',m).filter(x=>!x.tarefa);
 for(const t of tratamentos)for(const iv of t.intervencoes){
  const rendered=actual.filter(x=>x.nome===t.grupo&&x.nota===iv.texto);
  assert.equal(rendered.length,iv.meses.includes(m)?1:0,`${t.grupo}: calendário/linha, mês ${m}`);
  if(rendered.length)assert.equal(rendered[0].hot,iv.tipo==='fitofarmaco');
  if(iv.revisao?.estado==='suspenso')assert.equal(iv.meses.length,0,'Suspensão sem remoção efetiva do calendário');
 }
 const expected=tratamentos.reduce((n,t)=>{
  const iv=t.intervencoes.filter(x=>x.meses.includes(m));
  return n+iv.length+(t.vigiar.includes(m)&&!iv.some(x=>x.tipo==='monitorizacao')?1:0);
 },0);
 assert.equal(actual.length,expected,`Tratamentos: contagem do mês ${m}`);
}
const grupo=nome=>tratamentos.find(t=>t.grupo===nome);
const fig=grupo('Figueira');
assert.equal(fig.intervencoes[0].revisao.estado,'suspenso');
for(let m=1;m<=12;m++)assert(!lista('trat',m).some(x=>x.nome==='Figueira'&&x.hot));
for(const m of [2,3])assert(lista('trat',m).some(x=>x.nome==='Figueira'&&x.nota===fig.intervencoes[1].texto&&x.tag==='Vigiar'));
const cit=grupo('Citrinos');
for(const m of [12,1,2,3]){
 const linhas=lista('trat',m).filter(x=>x.nome==='Citrinos');
 assert(linhas.some(x=>x.nota===cit.intervencoes[0].texto&&x.tag==='Vigiar'));
 assert(linhas.some(x=>x.nota===cit.intervencoes[3].texto&&x.hot));
}
const kiwi=grupo('Kiwi');
for(const m of [12,1,2])for(const i of [0,1])assert(lista('trat',m).some(x=>x.nome==='Kiwi'&&x.nota===kiwi.intervencoes[i].texto));
assert(lista('trat',3).some(x=>x.nome==='Pessegueiro e nectarina'&&x.hot));
assert(lista('trat',3).some(x=>x.nome==='Amendoeira'&&x.hot));
assert(lista('trat',4).some(x=>x.nome==='Ameixeira e damasqueiro'&&x.hot));
assert(!lista('trat',12).some(x=>x.nome==='Macieira e pereira'&&x.hot));
// Limitar as contagens e o contrato de revisão às 14 intervenções desta ronda.
const inverno=[[0,0],[0,1],[1,0],[2,0],[2,2],[4,0],[7,0],[7,3],[10,0],[10,1],[13,0],[13,1],[13,2],[24,0]];
const reg=inverno.map(([g,i])=>tratamentos[g].intervencoes[i]);
assert(reg.every(iv=>iv.revisao),'Revisão de inverno removida');
assert.equal(reg.length,14);
assert.equal(reg.filter(iv=>iv.revisao.estado==='suspenso').length,1);
assert.equal(reg.filter(iv=>iv.revisao.estado==='parcial').length,13);
for(const iv of reg){
 assert(iv.revisao.alcance.por_rever.includes('meses'));
 if(iv.tipo==='fitofarmaco'){
  assert(iv.revisao.alcance.por_rever.includes('produto'));
  assert(!iv.revisao.alcance.verificado.includes('produto'));
 }
}
const consulta=read('revisao/fontes/SIFITO-figueira-2026-11-20.json');
assert.equal(consulta.recebidos,consulta.total_declarado);
assert.equal(consulta.registos.length,consulta.recebidos);
assert(consulta.registos.every(r=>r.NomeCultura==='Figueira'));
assert(!consulta.registos.some(r=>/cochon/i.test(r.NomeInimigo)));
const oleos=consulta.registos.filter(r=>r.SaSin==='óleo parafínico');
assert.equal(oleos.length,4);
assert(oleos.every(r=>r.NomeInimigo==='Aranhiço-vermelho'));
console.log(`${pares} combinações sem exceções; 12 meses de Tratamentos conferidos; suspensão, observação, janelas de inverno e transcrição SIFITO verificadas.`);
