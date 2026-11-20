// Verifica a coerência dos três ficheiros de dados: node verificar.js
const fs=require('fs');const erros=[],avisos=[];
const P=JSON.parse(fs.readFileSync(__dirname+'/plantas.json')).plantas;
const T=JSON.parse(fs.readFileSync(__dirname+'/tratamentos.json')).tratamentos;
const C=JSON.parse(fs.readFileSync(__dirname+'/calendario.json')).tarefas;
const ids=new Set();const mesesOk=(a,o)=>{if(!Array.isArray(a)||a.some(m=>!Number.isInteger(m)||m<1||m>12))erros.push(o+': meses inválidos '+JSON.stringify(a));else if(new Set(a).size!==a.length)erros.push(o+': meses repetidos '+JSON.stringify(a))};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
for(const p of P){
  if(ids.has(p.id))erros.push('id repetido: '+p.id);ids.add(p.id);
  for(const k of ['nome','nome_cientifico','categoria'])if(!p[k])erros.push(p.id+': falta '+k);
  for(const [k,e] of Object.entries(p.propagacao||{})){mesesOk(e.meses,p.id+'.'+k);if(![1,2,3,4,null].includes(e.dificuldade))erros.push(p.id+'.'+k+': dificuldade inválida')}
  for(const e of p.poda||[])mesesOk(e.meses,p.id+'.poda');
  for(const k of ['plantacao','sementeira'])if(p[k]&&p[k].meses)mesesOk(p[k].meses,p.id+'.'+k);
  if(p.colheita)mesesOk(p.colheita,p.id+'.colheita');
  for(const k in p.notas||{}){if(!['podas','plantar','sem','estacas','enx','alp'].includes(k))erros.push(p.id+': botão de nota desconhecido '+k);
    for(const m in p.notas[k]){const t=norm(p.notas[k][m]);
      for(const o of P)if(o.id!==p.id){const n=norm(o.nome.split(' (')[0]);if(n.length>4&&new RegExp('\\b'+n+'\\b').test(t)&&!norm(p.nome).includes(n))avisos.push(p.id+' ['+k+' '+m+'] menciona '+o.nome+': '+p.notas[k][m])}}}
}
for(const t of T){for(const e of t.especies)if(!ids.has(e))erros.push('tratamento '+t.grupo+': espécie desconhecida '+e);mesesOk(t.vigiar,t.grupo+'.vigiar');
  for(const i of t.intervencoes){mesesOk(i.meses,t.grupo);if(!['fitofarmaco','cultural','monitorizacao'].includes(i.tipo))erros.push(t.grupo+': tipo de intervenção inválido')}}
for(const c of C)mesesOk(c.meses,'tarefa '+c.nome);
const propagationKeys={sem:'sementeira',estacas:'estacas',enx:'enxertia',alp:'alporquia'};
const cultivadaNaHorta=p=>p.categoria==='hortícola'||(p.categoria==='aromática'&&p.folha==='anual');
function notaVisivel(p, button, month){
  if(button==='podas')return (p.poda||[]).some(e=>e.meses?.includes(month));
  if(p.invasora)return false;
  if(button==='plantar'){
    if(p.plantacao?.meses?.includes(month))return true;
    if(!cultivadaNaHorta(p))return false;
    const sow=p.categoria==='hortícola'?p.sementeira:p.propagacao?.sementeira;
    return sow?.meses?.includes(month);
  }
  if(button==='sem'&&cultivadaNaHorta(p))return false;
  const operation=p.propagacao?.[propagationKeys[button]];
  return operation?.dificuldade!==4&&operation?.meses?.includes(month);
}
const escondidas=[];
for(const p of P){
  for(const d of p.divisao||[])mesesOk(d.meses,p.id+'.divisao');
  if(p.recolha_sementes!==undefined)mesesOk(p.recolha_sementes,p.id+'.recolha_sementes');
  if(p.legal_botoes!==undefined){if(!Array.isArray(p.legal_botoes)||p.legal_botoes.some(b=>!['podas','plantar','sem','estacas','enx','alp','div'].includes(b)))erros.push(p.id+': legal_botoes inválido');if(!p.legal)avisos.push(p.id+': legal_botoes sem aviso legal');}
  for(const method of p.metodo_recomendado||[]){
    const operation=p.propagacao?.[method];
    const available=method==='divisao'
      ?(p.divisao||[]).some(d=>d.meses?.length)
      :['estacas','enxertia','alporquia'].includes(method)&&operation?.dificuldade!==4&&operation?.meses?.length;
    if(p.invasora||!available)avisos.push(p.id+': método recomendado "'+method+'" sem operação visível');
  }
  for(const [button,notes] of Object.entries(p.notas||{})){
    for(const [month,note] of Object.entries(notes)){
      if(!/^(?:[1-9]|1[0-2])$/.test(month)){
        erros.push(p.id+' ['+button+']: mês de nota inválido '+month);
      }else if(!notaVisivel(p,button,Number(month))){
        escondidas.push(p.id+' ['+button+' '+month+'] '+note);
      }
    }
  }
}

// ---------- Registo de revisão (ver ESQUEMA.md) ----------
const ESTADOS=['nao_revisto','parcial','confirmado','provisorio','suspenso'];
const ASPETOS=['meses','tecnica','dificuldade','texto','estatuto','identificacao','produto'];
const ALVOS=['poda','plantacao','sementeira','colheita','divisao','recolha_sementes','legal','toxicidade','autoctone','invasora','exposicao','solo','rega','adubacao','floracao','resistencia_geada','nota_sardoura','propagacao.estacas','propagacao.enxertia','propagacao.sementeira','propagacao.alporquia'];
const hoje=new Date().toISOString().slice(0,10);
const dataOk=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
const contagem={};
const objeto=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const texto=x=>typeof x==='string'&&x.trim().length>0;
const path=require('path');
function chaves(x,permitidas,o){for(const k of Object.keys(x))if(!permitidas.includes(k))erros.push(o+': chave desconhecida "'+k+'"')}
function ficheiroOk(f){
  if(!texto(f)||path.isAbsolute(f))return false;
  const destino=path.resolve(__dirname,f);
  if(!destino.startsWith(__dirname+path.sep))return false;
  try{return fs.statSync(destino).isFile()}catch{return false}
}
function urlOk(u){if(!texto(u)||/\s/.test(u))return false;try{const a=new URL(u);return ['http:','https:'].includes(a.protocol)&&!!a.hostname}catch{return false}}
function aspetos(l,o){
  if(l===undefined)return [];
  if(!Array.isArray(l)){erros.push(o+': deve ser uma lista de aspetos');return []}
  if(l.some(x=>!ASPETOS.includes(x)))erros.push(o+': aspeto desconhecido '+JSON.stringify(l));
  if(new Set(l).size!==l.length)erros.push(o+': aspetos repetidos');
  return l;
}
function verRevisao(r,o){
  if(!objeto(r))return erros.push(o+': registo de revisão inválido');
  chaves(r,['estado','data_revisao','alcance','fontes','adaptacao_local','nota'],o);
  if(!ESTADOS.includes(r.estado))return erros.push(o+': estado inválido '+JSON.stringify(r.estado));
  contagem[r.estado]=(contagem[r.estado]||0)+1;
  if((r.estado!=='nao_revisto'||r.data_revisao!==undefined)&&!dataOk(r.data_revisao))erros.push(o+': data_revisao em falta ou inválida');
  if(r.data_revisao!==undefined&&dataOk(r.data_revisao)&&r.data_revisao>hoje)erros.push(o+': data_revisao no futuro');
  if(r.alcance!==undefined&&!objeto(r.alcance))erros.push(o+': alcance deve ser um objeto');
  const al=objeto(r.alcance)?r.alcance:{};
  chaves(al,['verificado','por_rever'],o+'.alcance');
  const ver=aspetos(al.verificado,o+'.alcance.verificado'),por=aspetos(al.por_rever,o+'.alcance.por_rever');
  if(ver.some(x=>por.includes(x)))erros.push(o+': o mesmo aspeto está verificado e por rever');
  if(r.fontes!==undefined&&!Array.isArray(r.fontes))erros.push(o+': fontes deve ser uma lista');
  const F=Array.isArray(r.fontes)?r.fontes:[],sustentados=new Set();
  for(const [i,f] of F.entries()){const of=o+' fonte '+(i+1);
    if(!objeto(f)){erros.push(of+': fonte deve ser um objeto');continue}
    chaves(f,['titulo','url','ficheiro','seccao','consultado','sustenta'],of);
    if(!texto(f.titulo))erros.push(of+': titulo em falta ou inválido');
    if(f.url!==undefined&&!urlOk(f.url))erros.push(of+': url inválido');
    if(f.ficheiro!==undefined&&!ficheiroOk(f.ficheiro))erros.push(of+': ficheiro local inválido ou em falta');
    if(f.url===undefined&&f.ficheiro===undefined)erros.push(of+': falta url ou ficheiro que permita localizar a fonte');
    if(f.seccao!==undefined&&!texto(f.seccao))erros.push(of+': seccao inválida');
    if(!dataOk(f.consultado))erros.push(of+': consultado em falta ou inválido');
    else{if(f.consultado>hoje)erros.push(of+': consultado no futuro');if(dataOk(r.data_revisao)&&f.consultado>r.data_revisao)erros.push(of+': consultado depois da data_revisao')}
    const sustenta=aspetos(f.sustenta,of+'.sustenta');
    if(!sustenta.length)erros.push(of+': falta sustenta não vazio');
    if(sustenta.some(x=>!ver.includes(x)))erros.push(of+': sustenta aspetos que não estão em alcance.verificado');
    for(const aspeto of sustenta)sustentados.add(aspeto);
  }
  if(['parcial','confirmado'].includes(r.estado)){
    if(!F.length)erros.push(o+': '+r.estado+' sem fontes');if(!ver.length)erros.push(o+': '+r.estado+' sem alcance.verificado');
    for(const aspeto of ver)if(!sustentados.has(aspeto))erros.push(o+': aspeto verificado sem fonte que o sustente: '+JSON.stringify(aspeto));
  }
  if(r.estado==='parcial'&&!por.length)erros.push(o+': parcial sem alcance.por_rever');
  if(r.estado==='confirmado'&&por.length)erros.push(o+': confirmado mas com aspetos por rever');
  if(r.nota!==undefined&&!texto(r.nota))erros.push(o+': nota inválida');
  if(['provisorio','suspenso'].includes(r.estado)&&!texto(r.nota))erros.push(o+': '+r.estado+' sem nota');
  if(r.adaptacao_local!==undefined){const a=r.adaptacao_local;
    if(!objeto(a))erros.push(o+': adaptacao_local deve ser um objeto');
    else{chaves(a,['estado','nota'],o+'.adaptacao_local');if(!['documentada','provisoria'].includes(a.estado)||!texto(a.nota))erros.push(o+': adaptacao_local precisa de estado (documentada/provisoria) e nota')}
  }
}
const obter=(p,c)=>c.split('.').reduce((x,k)=>x==null?undefined:x[k],p);
for(const p of P){
  if(p.revisao!==undefined){
    if(!p.revisao||typeof p.revisao!=='object'||Array.isArray(p.revisao))erros.push(p.id+': revisao deve ser um objeto');
    else for(const [c,r] of Object.entries(p.revisao)){
      if(!ALVOS.includes(c))erros.push(p.id+': revisao de campo desconhecido "'+c+'"');
      else if(obter(p,c)===undefined)erros.push(p.id+': revisao de "'+c+'", que não existe nesta ficha');
      verRevisao(r,p.id+'.revisao.'+c);
    }
  }
  if(p.revisoes_anteriores!==undefined&&!Array.isArray(p.revisoes_anteriores))erros.push(p.id+': revisoes_anteriores deve ser uma lista');
  for(const [i,h] of (Array.isArray(p.revisoes_anteriores)?p.revisoes_anteriores:[]).entries()){const o=p.id+'.revisoes_anteriores['+i+']';
    if(!objeto(h)){erros.push(o+': registo histórico deve ser um objeto');continue}
    chaves(h,['commit','ambito','documentacao','ficheiro'],o);
    if(typeof h.commit!=='string'||!/^[0-9a-f]{7,40}$/.test(h.commit))erros.push(o+': commit inválido');
    if(!texto(h.ambito))erros.push(o+': ambito em falta ou inválido');
    if(!['no_repositorio','nao_recuperada'].includes(h.documentacao))erros.push(o+': documentacao inválida');
    if((h.documentacao==='no_repositorio'||h.ficheiro!==undefined)&&!ficheiroOk(h.ficheiro))erros.push(o+': ficheiro em falta ou inválido '+JSON.stringify(h.ficheiro));
  }
}
for(const t of T){
  if(t.revisao!==undefined){
    if(!objeto(t.revisao))erros.push('tratamento '+t.grupo+': revisao deve ser um objeto por campo');
    else for(const [c,r] of Object.entries(t.revisao)){
      if(!['vigiar','problemas'].includes(c)||t[c]===undefined)erros.push('tratamento '+t.grupo+': campo de revisão desconhecido '+c);
      verRevisao(r,'tratamento '+t.grupo+'.revisao.'+c);
    }
  }
  for(const [i,iv] of t.intervencoes.entries())if(iv.revisao!==undefined)verRevisao(iv.revisao,'tratamento '+t.grupo+' intervenção '+(i+1));
}
if(process.argv.includes('--revisao')){
  const nP=P.length;
  const ausentes=P.reduce((n,p)=>n+ALVOS.filter(c=>obter(p,c)!==undefined&&(!objeto(p.revisao)||!Object.hasOwn(p.revisao,c))).length,0)
    +T.reduce((n,t)=>n+['vigiar','problemas'].filter(c=>t[c]!==undefined&&(!objeto(t.revisao)||!Object.hasOwn(t.revisao,c))).length+t.intervencoes.filter(i=>i.revisao===undefined).length,0);
  console.log('Registos explícitos de revisão por estado:',JSON.stringify(contagem),'| não revistos implícitos:',ausentes,'(campos presentes sem registo e intervenções sem registo)');
  console.log('Espécies com algum registo:',P.filter(p=>objeto(p.revisao)&&Object.keys(p.revisao).length).length+'/'+nP,'| com revisões anteriores:',P.filter(p=>Array.isArray(p.revisoes_anteriores)&&p.revisoes_anteriores.length).length+'/'+nP,
    '| intervenções com registo:',T.reduce((n,t)=>n+t.intervencoes.filter(i=>i.revisao).length,0)+'/'+T.reduce((n,t)=>n+t.intervencoes.length,0));
  const hist={};for(const p of P)for(const h of Array.isArray(p.revisoes_anteriores)?p.revisoes_anteriores:[])if(objeto(h)&&typeof h.commit==='string'&&typeof h.documentacao==='string')(hist[h.commit+' ('+h.documentacao+')']??=[]).push(p.id);
  for(const [k,v] of Object.entries(hist))console.log('  '+k+': '+v.length+' espécies');
}
if(escondidas.length)avisos.push(escondidas.length+' notas não aparecem na app (ver lista com: node verificar.js --escondidas)');
if(process.argv.includes('--escondidas'))for(const note of escondidas)console.log(note);
console.log(P.length+' espécies, '+T.length+' grupos de tratamentos, '+C.length+' tarefas');
console.log(erros.length?'ERROS:\n'+erros.join('\n'):'Sem erros.');
if(avisos.length)console.log('A rever:\n'+avisos.join('\n'));
process.exit(erros.length?1:0);
