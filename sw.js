const C="agenda-v45";const F=["./","./index.html","./manifest.webmanifest","./plantas.json","./tratamentos.json","./calendario.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  // Página e base de dados: rede primeiro (versão mais recente); sem internet usa a cópia guardada.
  if(e.request.mode==="navigate"||u.pathname.endsWith(".json")){
    const chave=e.request.mode==="navigate"?"./index.html":e.request;
    e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(chave,cp));return r}).catch(()=>caches.match(chave)));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res})));
});
