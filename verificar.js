// Verifica a coerência dos três ficheiros de dados: node verificar.js
const fs=require('fs');const erros=[],avisos=[];
const P=JSON.parse(fs.readFileSync(__dirname+'/plantas.json')).plantas;
const T=JSON.parse(fs.readFileSync(__dirname+'/tratamentos.json')).tratamentos;
const C=JSON.parse(fs.readFileSync(__dirname+'/calendario.json')).tarefas;
const ids=new Set();const mesesOk=(a,o)=>{if(!Array.isArray(a)||a.some(m=>!Number.isInteger(m)||m<1||m>12))erros.push(o+': meses inválidos '+JSON.stringify(a))};
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
console.log(P.length+' espécies, '+T.length+' grupos de tratamentos, '+C.length+' tarefas');
console.log(erros.length?'ERROS:\n'+erros.join('\n'):'Sem erros.');
if(avisos.length)console.log('A rever (nota menciona outra espécie):\n'+avisos.join('\n'));
process.exit(erros.length?1:0);
