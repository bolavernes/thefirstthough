async function renderDoc(url){
  const el=document.getElementById("md"), toc=document.getElementById("toc");
  try{
    const res=await fetch(url,{cache:"no-cache"});
    if(!res.ok) throw new Error(res.status);
    const md=await res.text();
    el.innerHTML=marked.parse(md,{gfm:true});
  }catch(e){ el.innerHTML='<p class="loading">Dokument konnte nicht geladen werden.</p>'; return; }
  el.querySelectorAll("table").forEach(t=>{const w=document.createElement("div");w.className="tablewrap";t.parentNode.insertBefore(w,t);w.appendChild(t);});
  el.querySelectorAll('a[href^="http"]').forEach(a=>{a.target="_blank";a.rel="noopener";});
  const slug=s=>s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,60);
  const used={};
  el.querySelectorAll("h2,h3").forEach(h=>{
    let id=slug(h.textContent)||"abschnitt"; if(used[id]) id+="-"+(++used[id]); else used[id]=1; h.id=id;
    if(h.tagName==="H3" && el.querySelectorAll("h2").length>14) return;
    const a=document.createElement("a"); a.href="#"+id; a.textContent=h.textContent; a.className=h.tagName==="H3"?"l3":""; toc.appendChild(a);
  });
}
