// node revisao/testar-copia.cjs [--diagnostico]
// Executa o JavaScript real da app com DOM/armazenamento mínimos, sem dependências.
// Não substitui inspeção visual nem testes de download em navegador.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const copy=ids=>JSON.stringify({formato:'agenda-do-campo/minhas-plantas',versao:1,plantas:ids});
async function app(ids=[],filter=false){
 const nodes=new Map(),listeners={},saved=new Map([['minhas-plantas',JSON.stringify(ids)],['so-minhas',filter?'1':'0']]);
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,value:'',innerHTML:'',textContent:'',hidden:false,disabled:false,dataset:{},events:{},classList:{toggle(){},contains(){return false}},setAttribute(){},addEventListener(k,f){this.events[k]=f},querySelector(){return node(id+'-cnt')},scrollIntoView(){},click(){this.events.click?.()},remove(){}});return nodes.get(id)};
 const cats=['podas','trat','plantar','sem','estacas','enx','alp','div','col'].map(k=>{const n=node(k);n.dataset.k=k;return n});
 let blob;
 const localStorage={getItem:k=>saved.get(k)??null,setItem(k,v){if(this.fail&&k==='minhas-plantas')throw new Error('QuotaExceededError');saved.set(k,v)}};
 const context=vm.createContext({console,Date,Blob,localStorage,URL:{createObjectURL(b){blob=b;return 'blob:teste'},revokeObjectURL(){}},setTimeout(){},matchMedia:()=>({matches:false}),document:{getElementById:node,querySelectorAll:q=>q==='.cat'?cats:[],addEventListener(k,f){(listeners[k]??=[]).push(f)},createElement:()=>node('download'),body:{appendChild(){}}},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
 const evaluate=code=>vm.runInContext(code,context);
 evaluate(script);await new Promise(resolve=>setImmediate(resolve));
 assert(evaluate('!!DB'),'Base de dados não carregada');
 return {node,saved,localStorage,evaluate,cats,blob:()=>blob,openFicha(id,cat){
  const notices=cat?Array.from(evaluate(`avisos(DB.plantas.find(p=>p.id===${JSON.stringify(id)}),${JSON.stringify(cat)})`)):[];
  let result='';const warnings=notices.map(textContent=>({textContent}));
  const li={querySelector:q=>q===':scope > .warn'?warnings[0]||null:null,querySelectorAll:()=>warnings,insertAdjacentHTML(_where,value){result=value}};
  const button={dataset:{id},closest:()=>li,setAttribute(){}};evaluate('mostrarFoto=()=>{}');
  for(const f of listeners.click||[])f({target:{closest:q=>q==='.ficha-btn'?button:null}});
  return result;
 },clickPlant(id,star=true){const button={dataset:{minha:id},classList:{contains:()=>star}};for(const f of listeners.click||[])f({target:{closest:q=>q==='[data-minha]'?button:null},preventDefault(){}})}};
}
(async()=>{
 const results=[];
 async function test(name,fn){try{await fn();results.push({name,pass:true})}catch(e){results.push({name,pass:false,error:e.message})}}
 await test('Exportação disponível com apenas ids desconhecidos',async()=>{const a=await app(['especie_futura']);assert.equal(a.node('exportar').disabled,false);a.node('exportar').click();assert.deepEqual(JSON.parse(await a.blob().text()).plantas,['especie_futura'])});
 await test('Importação não anuncia sucesso nem muda memória se não conseguir gravar',async()=>{const a=await app(['macieira']);a.localStorage.fail=true;a.evaluate(`importarCopia(${JSON.stringify(copy(['videira']))})`);assert.deepEqual(Array.from(a.evaluate('[...minhas]')),['macieira']);assert.match(a.node('copiaMsg').textContent,/não|Não/);assert.deepEqual(JSON.parse(a.saved.get('minhas-plantas')),['macieira'])});
 await test('Marcação não muda memória se não conseguir gravar',async()=>{const a=await app();a.localStorage.fail=true;a.clickPlant('videira');assert.equal(a.evaluate('minhas.size'),0);assert.match(a.node('copiaMsg').textContent,/não|Não/)});
 await test('Remover última planta atualiza painel ao desligar automaticamente filtro',async()=>{const a=await app(['macieira'],true);a.evaluate('day=new Date(2026,0,15,12);render()');a.clickPlant('macieira');assert.equal(a.evaluate('soMinhas'),false);assert(!a.node('panel').innerHTML.includes('filtro-aviso'));assert(a.node('panel').innerHTML.includes('Macieira'))});
 await test('Remover pela ficha atualiza a lista pessoal',async()=>{const a=await app(['macieira','videira']);a.node('verMinhas').click();a.clickPlant('macieira',false);assert(!a.node('resultados').innerHTML.includes('data-id="macieira"'))});
 await test('Ficha de pesquisa inclui toxicidade e aviso legal',async()=>{const a=await app();const ficha=a.openFicha('teixo');assert.match(ficha,/muito tóxicos/);assert.match(ficha,/9580/)});
 await test('Toxicidade na linha não suprime o aviso legal da ficha da mélia',async()=>{const a=await app();const ficha=a.openFicha('melia','podas');assert.match(ficha,/art\. 13/);assert(!ficha.includes('Tóxica por ingestão'))});
 await test('Lista explica plantas guardadas não reconhecidas',async()=>{const a=await app(['especie_futura']);a.node('verMinhas').click();assert(!a.node('resultados').innerHTML.includes('Ainda não marcou'));assert.match(a.node('resultados').innerHTML,/1 planta guardada/);assert.match(a.node('resultados').innerHTML,/não reconhece/)});
 await test('Exportação distingue plantas reconhecidas e não reconhecidas',async()=>{const a=await app(['macieira','futura']);a.node('exportar').click();assert.match(a.node('copiaMsg').textContent,/1 planta reconhecida/);assert.match(a.node('copiaMsg').textContent,/1 não reconhecida/)});
 await test('Rodapé de estacas só inclui plantas selecionadas quando filtrado',async()=>{const a=await app(['videira'],true);a.evaluate('cur="estacas";render()');assert(!a.node('panel').innerHTML.includes('Não pegam de estaca'))});
 await test('Cinco ficheiros inválidos não alteram memória nem armazenamento',async()=>{const a=await app(['macieira']);const before=a.saved.get('minhas-plantas');for(const text of ['{',JSON.stringify({formato:'outro',versao:1,plantas:[]}),JSON.stringify({formato:'agenda-do-campo/minhas-plantas',versao:2,plantas:[]}),JSON.stringify({formato:'agenda-do-campo/minhas-plantas',versao:1,plantas:'videira'}),'[]']){a.evaluate(`importarCopia(${JSON.stringify(text)})`);assert.equal(a.saved.get('minhas-plantas'),before);assert.deepEqual(Array.from(a.evaluate('[...minhas]')),['macieira'])}});
 await test('Junção deduplica e ignora ids desconhecidos importados',async()=>{const a=await app(['macieira']);a.evaluate(`importarCopia(${JSON.stringify(copy(['macieira','videira','videira','futura']))})`);assert.deepEqual(Array.from(a.evaluate('[...minhas]')).sort(),['macieira','videira']);assert.match(a.node('copiaMsg').textContent,/1 ignorada/)});
 await test('Ids desconhecidos locais sobrevivem a gravação e exportação',async()=>{const a=await app(['macieira','futura']);a.clickPlant('videira');assert(JSON.parse(a.saved.get('minhas-plantas')).includes('futura'));a.node('exportar').click();assert(JSON.parse(await a.blob().text()).plantas.includes('futura'))});
 await test('Pesquisa e lista pessoal mostram mais de 40 resultados',async()=>{const a=await app();a.evaluate('minhas=new Set(DB.plantas.map(p=>p.id));atualizarMinhasUI()');a.node('verMinhas').click();assert.equal((a.node('resultados').innerHTML.match(/data-id=/g)||[]).length,a.evaluate('DB.plantas.length'));a.node('procura').value='a';a.evaluate('mostrarResultados()');assert((a.node('resultados').innerHTML.match(/data-id=/g)||[]).length>40)});
 await test('216 combinações categoria/mês, sem filtro e com filtro',async()=>{const a=await app(['videira','macieira','figueira']);for(const filtered of [false,true]){a.evaluate(`soMinhas=${filtered}`);for(const cat of a.cats)for(let month=0;month<12;month++)a.evaluate(`cur=${JSON.stringify(cat.dataset.k)};day=new Date(2026,${month},15,12);render()`)}});
 console.log(JSON.stringify(results,null,2));
 if(!process.argv.includes('--diagnostico'))assert(results.every(r=>r.pass),'Falharam verificações');
})().catch(e=>{console.error(e);process.exit(1)});
