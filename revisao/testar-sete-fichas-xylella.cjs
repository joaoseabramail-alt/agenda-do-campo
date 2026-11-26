// node revisao/testar-sete-fichas-xylella.cjs
// Base cf11ab8. Dados atuais, filtrados pelos ids da base; não compara index.html nem sw.js com a base.
// Depois da publicação, pode fixar-se AGENDA_RONDA_SETE no commit aceite para voltar a testar esta ronda histórica.
const fs=require('fs'),path=require('path'),cp=require('child_process'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..'),base='cf11ab885475a56dfcc6ee7f03e18c570b9d9819';
const old=f=>cp.execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const data=f=>process.env.AGENDA_RONDA_SETE?cp.execFileSync('git',['show',`${process.env.AGENDA_RONDA_SETE}:${f}`],{cwd:root,encoding:'utf8'}):read(f);
const B=JSON.parse(old('plantas.json')),A=JSON.parse(data('plantas.json'));
const ids=['castanheiro_india','pimento_padron','poligala','pitosporo_tenuifolium','lima_dedo','tuia_gigante','cipreste_comum'];
const before=new Map(B.plantas.map(p=>[p.id,p])),after=new Map(A.plantas.map(p=>[p.id,p]));
const scope={
 castanheiro_india:['propagacao','nota_variedade','poda','toxicidade','invasora','notas','revisao'],
 pimento_padron:['sementeira','nota_variedade','rega','toxicidade','autoctone','notas','revisao'],
 poligala:['propagacao','poda','resistencia_geada','geada','notas','legal','legal_botoes','revisao'],
 pitosporo_tenuifolium:['propagacao','nota_variedade','legal','revisao'],
 lima_dedo:['propagacao','metodo_recomendado','nota_variedade','adubacao','resistencia_geada','revisao'],
 tuia_gigante:['propagacao','poda','toxicidade','revisao'],
 cipreste_comum:['propagacao','poda','revisao']
};
for(const [id,b] of before){
 const a=after.get(id);assert(a,`id removido: ${id}`);
 if(id==='tilia'){assert.equal(a.nome_cientifico,'Tilia platyphyllos');assert.deepEqual({...a,nome_cientifico:b.nome_cientifico},b);continue}
 if(!ids.includes(id)){assert.deepEqual(a,b,`fora do âmbito: ${id}`);continue}
 const x=structuredClone(a),y=structuredClone(b);
 for(const k of scope[id]){delete x[k];delete y[k]}
 assert.deepEqual(x,y,`campo fora do âmbito: ${id}`);
}
for(const [f,key,idKey] of [['tratamentos.json','tratamentos','grupo'],['calendario.json','tarefas','nome']]){
 const b=JSON.parse(old(f))[key],a=JSON.parse(data(f))[key];
 for(const p of b)assert.deepEqual(a.find(x=>x[idKey]===p[idKey]&&(key!=='tarefas'||x.categoria===p.categoria)),p,`${f}: ${p[idKey]}`);
}
const expected={castanheiro_india:{sem:[9,10,11],enx:[2,3,7,8],podas:[2,3]},pimento_padron:{plantar:[5,6]},poligala:{estacas:[6,7,8,9]},pitosporo_tenuifolium:{estacas:[7,8,9]},lima_dedo:{estacas:[6,7,8],enx:[4,5]},tuia_gigante:{estacas:[8,9],sem:[2,3]},cipreste_comum:{estacas:[8,9]}};
const method={sem:'sementeira',estacas:'estacas',enx:'enxertia',alp:'alporquia'};
function active(p,k,m){
 if(k==='podas')return (p.poda||[]).some(x=>x.meses.includes(m));
 if(k==='plantar')return p.plantacao?.meses.includes(m)||(p.categoria==='hortícola'&&p.sementeira?.meses.includes(m));
 if(k==='col')return p.colheita?.includes(m);
 return p.propagacao?.[method[k]]?.dificuldade!==4&&p.propagacao?.[method[k]]?.meses.includes(m);
}
for(const [id,ops] of Object.entries(expected))for(const [k,months] of Object.entries(ops)){
 const p=after.get(id),actual=k==='podas'?[...new Set(p.poda.flatMap(x=>x.meses))]:k==='plantar'?p.plantacao.meses:p.propagacao[method[k]].meses;
 assert.deepEqual(actual,months,`${id}/${k}`);
}
assert.equal(after.get('castanheiro_india').invasora,false);
assert.equal(after.get('pimento_padron').autoctone,false);
assert.equal(after.get('pitosporo_tenuifolium').propagacao.estacas.dificuldade,3);
assert.deepEqual(after.get('lima_dedo').metodo_recomendado,['enxertia']);
assert.deepEqual(after.get('poligala').legal_botoes,['plantar','estacas']);
for(const [id,p] of after)if(before.has(id)&&id!=='poligala')assert.equal(/xylella/i.test(p.legal||''),/xylella/i.test(before.get(id).legal||''),`aviso Xylella novo fora da polígala: ${id}`);
// Todas as notas mensais das sete fichas têm uma operação efetivamente visível.
for(const id of ids){const p=after.get(id);for(const [k,notes] of Object.entries(p.notas||{}))for(const m of Object.keys(notes))assert(active(p,k,+m),`nota escondida: ${id}/${k}/${m}`)}
// Executa as funções reais de listas, contagens, avisos e ficha da versão atual da interface.
const script=read('index.html').split('<script>')[1],logic=script.split('/* ---------- Estado e desenho ---------- */')[0];
const ficha=script.split('/* ---------- Ficha da planta (ao tocar no nome) ---------- */')[1].split('const fotoCache')[0];
const app=plants=>{const ctx=vm.createContext({dados:{plantas:plants,tratamentos:JSON.parse(old('tratamentos.json')).tratamentos,tarefas:JSON.parse(old('calendario.json')).tarefas}});
 vm.runInContext('const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"}[c]));\n'+logic+ficha+'\nDB=dados;globalThis.app={lista,contar,avisos,fichaHTML,categorias:Object.keys(CAT)};',ctx);return ctx.app};
const current=B.plantas.map(p=>after.get(p.id)),AA=app(current),BB=app(B.plantas),plain=x=>JSON.parse(JSON.stringify(x));
const norm=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const affectedNames=new Set(ids.map(id=>after.get(id).nome));
function stripped(list){return plain(list).flatMap(({p,...row})=>{
 if(p&&ids.includes(p.id))return [];
 if(row.grupo){row.nota=row.nota.replace(/\.$/,'').split(/,\s*/).filter(n=>!affectedNames.has(n)).join(', ');if(!row.nota)return []}
 return [row];
})}
const deltas={};let pairs=0;
for(const k of AA.categorias){deltas[k]=[];for(let m=1;m<=12;m++){
 const delta=ids.reduce((n,id)=>n+Number(!!active(after.get(id),k,m))-Number(!!active(before.get(id),k,m)),0);
 assert.equal(AA.contar(k,m)-BB.contar(k,m),delta,`contagem ${k}/${m}`);
 assert.deepEqual(stripped(AA.lista(k,m)),stripped(BB.lista(k,m)),`restantes linhas ${k}/${m}`);
 deltas[k].push(delta);pairs++;
}}
const poly=after.get('poligala');
for(const k of AA.categorias)assert.equal(AA.avisos(poly,k).some(t=>/xylella/i.test(t)),['plantar','estacas'].includes(k),`aviso/${k}`);
assert.match(AA.fichaHTML(poly),/Xylella/);
assert.match(AA.fichaHTML(after.get('pimento_padron')),/isole flores antes de abrirem/);
assert.match(AA.fichaHTML(after.get('castanheiro_india')),/flores e folhas são tóxicas/);
assert.match(AA.fichaHTML(after.get('tuia_gigante')),/alergia cutânea/);
assert.match(AA.fichaHTML(poly),/Sensível à geada/);
for(const id of ids)assert(!/undefined|NaN/.test(AA.fichaHTML(after.get(id))),id);
// A tabela distingue entradas de espécie, género e fichas demasiado abrangentes.
const map=JSON.parse(read('revisao/XYLELLA-correspondencias-cf11ab8.json')).correspondencias;
assert.equal(map.length,26);assert.equal(new Set(map.map(x=>x.id)).size,26);
for(const x of map){assert(before.has(x.id));assert(x.entrada>=1&&x.entrada<=82);assert.equal(x.taxon_base,before.get(x.id).nome_cientifico)}
for(const id of ['poligala','lima_dedo','amendoeira','cerejeira','nogueira','ameixeira','damasqueiro','amoreira'])assert(!map.some(x=>x.id===id),`não confundir hospedeiro geral com deteção AMP: ${id}`);
assert.equal(map.find(x=>x.id==='carvalho_alvarinho').taxon_lista,'Quercus robur');
assert(!map.some(x=>x.id==='carvalho_pantanos'));
for(const id of ['lavanda','sardinheira'])assert.match(map.find(x=>x.id===id).correspondencia,/parcial/);
console.log(`Sete fichas e tília; âmbito por id, notas visíveis, avisos, fichas e ${pairs} combinações conferidos.`);
console.log('Variações mensais (jan–dez): '+JSON.stringify(Object.fromEntries(Object.entries(deltas).filter(([,v])=>v.some(Boolean)))));
