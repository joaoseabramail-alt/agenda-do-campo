// node revisao/testar-ficha-propagacao.cjs
// A ficha da planta (pesquisa e listas) mostra quando se faz, ou que não se faz, sementeira, estaquia, enxertia, alporquia e poda.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.join(__dirname,'..');
const s=fs.readFileSync(path.join(root,'index.html'),'utf8').split('<script>')[1];
const src=s.split('/* ---------- Estado e desenho ---------- */')[0]+s.split('/* ---------- Ficha da planta (ao tocar no nome) ---------- */')[1].split('const fotoCache')[0];
const P=JSON.parse(fs.readFileSync(path.join(root,'plantas.json'),'utf8')).plantas;
const ctx=vm.createContext({});
vm.runInContext('const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"}[c]));\n'+src+'\nglobalThis.f={mesesTxt,fichaHTML};',ctx);
const {mesesTxt,fichaHTML}=ctx.f;
for(const [m,e] of [[[12,1,2],'de dezembro a fevereiro'],[[3,4,5,8,9],'de março a maio e de agosto a setembro'],[[5,6,7,4],'de abril a julho'],[[3],'março'],[[1,3,5],'janeiro, março e maio'],[[1,2,3,4,5,6,7,8,9,10,11,12],'todo o ano'],[[],'']])assert.equal(mesesTxt(m),e,JSON.stringify(m));
const txt=id=>fichaHTML(P.find(p=>p.id===id)).replace(/<[^>]+>/g,'|');
for(const p of P){const h=fichaHTML(p);assert(!/undefined|null|NaN/.test(h),p.id);for(const t of ['Sementeira','Estaquia','Enxertia','Alporquia','Poda'])assert(new RegExp(`<dt>${t}</dt>|<dt>Não se faz</dt><dd>[^<]*${t.toLowerCase()}`,'i').test(h),p.id+' sem '+t)}
assert.match(txt('videira'),/Enxertia\|\|De março a maio e de agosto a setembro · fácil\. Recomendado para manter a variedade\./);
assert.match(txt('videira'),/Não se faz\|\|Sementeira\./);
assert.match(txt('alface'),/Sementeira\|\|De fevereiro a outubro\. Semear em alfobre\./);
assert.match(txt('alface'),/Estaquia, enxertia, alporquia nem poda\./);
assert.match(txt('sobreiro'),/Estaquia\|\|Não se faz: não pega\./);
assert.match(txt('medronheiro'),/Enxertia\|\|Época em revisão\./);
assert.match(txt('roseira'),/Sementeira\|\|[^|]*Não mantém a variedade\./);
console.log(`Ficha conferida em ${P.length} plantas.`);
