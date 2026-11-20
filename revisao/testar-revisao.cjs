// node revisao/testar-revisao.cjs [--diagnostico]
// Cada caso corre numa pasta temporária; nunca modifica os dados do repositório.
const fs=require('fs'),os=require('os'),path=require('path'),assert=require('assert'),{spawnSync}=require('child_process');
const root=path.join(__dirname,'..');
const raw=Object.fromEntries(['plantas.json','tratamentos.json','calendario.json'].map(f=>[f,fs.readFileSync(path.join(root,f),'utf8')]));
const date=new Date().toISOString().slice(0,10);
const record=()=>({estado:'confirmado',data_revisao:date,alcance:{verificado:['texto']},fontes:[{titulo:'Documento de teste, sem validação agronómica',url:'https://example.org/fonte',seccao:'Teste',consultado:date,sustenta:['texto']}]});
const results=[];
function run(name,change,expected){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'agenda-revisao-'));
 try{
  fs.copyFileSync(path.join(root,'verificar.js'),path.join(dir,'verificar.js'));
  fs.mkdirSync(path.join(dir,'revisao'));fs.copyFileSync(path.join(root,'revisao/FLORESTAIS-e729811.md'),path.join(dir,'revisao/FLORESTAIS-e729811.md'));
  // Reproduzir as fontes locais já referenciadas nos dados, para que os casos
  // positivos não falhem apenas por a pasta temporária omitir documentos reais.
  function copiarFontes(o){
   if(!o||typeof o!=='object')return;
   if(typeof o.ficheiro==='string'){
    const origem=path.resolve(root,o.ficheiro),destino=path.resolve(dir,o.ficheiro);
    if(origem.startsWith(root+path.sep)&&destino.startsWith(dir+path.sep)&&fs.existsSync(origem)&&fs.statSync(origem).isFile()){
     fs.mkdirSync(path.dirname(destino),{recursive:true});fs.copyFileSync(origem,destino);
    }
   }
   for(const v of Object.values(o))copiarFontes(v);
  }
  for(const texto of Object.values(raw))copiarFontes(JSON.parse(texto));
  fs.writeFileSync(path.join(dir,'fonte.md'),'Fonte fictícia apenas para testes estruturais.');
  const p=JSON.parse(raw['plantas.json']),t=JSON.parse(raw['tratamentos.json']);
  change(p.plantas,t.tratamentos);
  fs.writeFileSync(path.join(dir,'plantas.json'),JSON.stringify(p));fs.writeFileSync(path.join(dir,'tratamentos.json'),JSON.stringify(t));fs.writeFileSync(path.join(dir,'calendario.json'),raw['calendario.json']);
  const r=spawnSync(process.execPath,['verificar.js','--revisao'],{cwd:dir,encoding:'utf8'});
  const crashed=/TypeError|RangeError|ReferenceError|SyntaxError/.test(r.stderr);
  const pass=!crashed&&r.status===expected&&(name!=='Ausentes contam explicitamente no resumo'||/não revistos implícitos: [1-9]/.test(r.stdout));
  results.push({name,pass,status:r.status,crashed,...(!pass?{output:r.stdout,stderr:r.stderr}:{})});
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
}
const review=(p,r)=>{p[0].revisao={rega:r}};
run('Base sem alterações',()=>{},0);
run('Fonte URL identificável e cobertura completa',p=>review(p,record()),0);
run('Fonte local identificável e cobertura completa',p=>{const r=record();delete r.fontes[0].url;r.fontes[0].ficheiro='fonte.md';review(p,r)},0);
run('Aspeto verificado sem qualquer fonte que o sustente',p=>{const r=record();r.fontes[0].url='https://example.org/fonte';delete r.fontes[0].ficheiro;r.alcance.verificado=['texto','meses'];review(p,r)},1);
run('Fonte sem sustenta',p=>{const r=record();r.fontes[0].url='https://example.org/fonte';delete r.fontes[0].ficheiro;delete r.fontes[0].sustenta;review(p,r)},1);
run('Fonte sem URL nem ficheiro',p=>{const r=record();delete r.fontes[0].url;review(p,r)},1);
run('Revisão com chave desconhecida dentro de alcance',p=>review(p,{estado:'nao_revisto',alcance:{verificdao:['texto']}}),1);
run('Estado nao_revisto com data inválida',p=>review(p,{estado:'nao_revisto',data_revisao:'ontem'}),1);
run('alcance.verificado malformado não interrompe o verificador',p=>{const r=record();r.alcance.verificado={};review(p,r)},1);
run('Histórico não é lista',p=>{p[0].revisoes_anteriores={}},1);
run('Histórico contém null',p=>{p[0].revisoes_anteriores=[null]},1);
run('Histórico contém chave desconhecida',p=>{p[0].revisoes_anteriores=[{commit:'aef27b6',ambito:'Teste',documentacao:'nao_recuperada',fonte_inventada:true}]},1);
run('Diretório não é documento do histórico',p=>{p[0].revisoes_anteriores=[{commit:'aef27b6',ambito:'Teste',documentacao:'no_repositorio',ficheiro:'revisao'}]},1);
run('Fonte local em falta',p=>{const r=record();r.fontes[0].ficheiro='nao-existe.md';review(p,r)},1);
run('Fonte com título de tipo errado',p=>{const r=record();r.fontes[0].titulo=42;review(p,r)},1);
run('Revisão por campo de vigilância do grupo',(_p,t)=>{const r=record();r.alcance.verificado=['meses'];r.fontes[0].sustenta=['meses'];t[0].revisao={vigiar:r}},0);
run('Grupo não pode rever campos das intervenções',(_p,t)=>{t[0].revisao={texto:record()}},1);
run('Revisão individual de intervenção',(_p,t)=>{t[0].intervencoes[0].revisao=record()},0);
run('Adaptacao local com chave desconhecida',p=>review(p,{estado:'provisorio',data_revisao:date,nota:'Teste',adaptacao_local:{estado:'provisoria',nota:'Teste',validdao:true}}),1);
run('Ausentes contam explicitamente no resumo',()=>{},0);
console.log(JSON.stringify(results,null,2));
if(!process.argv.includes('--diagnostico'))assert(results.every(x=>x.pass),'Falhou a validação da revisão');
