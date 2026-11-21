const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let fs=16;const root=document.documentElement,body=document.body;
const setFs=v=>{fs=Math.min(32,Math.max(14,v));root.style.setProperty('--fs',fs+'px')};
$('#fmas').onclick=()=>setFs(fs+4);$('#fmenos').onclick=()=>setFs(fs-2);
const tog=(id,cls)=>{const b=$(id);b.onclick=()=>{const on=body.classList.toggle(cls);b.setAttribute('aria-pressed',on);if(cls==='calm')alert1()}};
tog('#btnHc','hc');tog('#btnCalm','calm');
const links=$$('nav a');addEventListener('scroll',()=>{let cur='inicio';$$('main section').forEach(s=>{if(s.getBoundingClientRect().top<120)cur=s.id});links.forEach(a=>a.classList.toggle('on',a.hash==='#'+cur))});
$$('[role=tab]').forEach(t=>t.onclick=()=>{$$('[role=tab]').forEach(x=>{x.setAttribute('aria-selected',x===t);x.classList.toggle('sel',x===t)});$$('.panel').forEach(p=>p.hidden=p.id!==t.getAttribute('aria-controls'))});
const show=n=>[0,1,2,3].forEach(i=>$('#s'+i).hidden=i!==n);
const calm=()=>body.classList.contains('calm');
const speak=t=>{if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='es-PE';speechSynthesis.speak(u)}};
function alert1(){const c=calm();$('#alertBox').classList.toggle('strobe',!c);
$('#canales').textContent='Canales activos: texto'+(c?', voz (sin destellos)':', destello 1 Hz, vibración y voz')}
const steps=[['↑','De frente',20],['→','Gira a la derecha',15],['↑','Sigue hasta el refugio',45]];let k=0,lift=false;
function paso(){const[s,t,m]=steps[k];$('#arrow').textContent=s;$('#stepTxt').textContent=t+' · '+m+' m';
const rem=steps.slice(k).reduce((a,x)=>a+x[2],0),r=parseFloat($('#ritmo').value);
$('#eta').textContent='Tiempo estimado: '+Math.ceil(rem/r/1.2)+' s hasta la zona segura'+(lift?' (ruta sin escaleras)':'');speak(t+', '+m+' metros')}
$('#enterado').onclick=()=>{if(!calm()&&navigator.vibrate)navigator.vibrate(300);k=0;show(1);paso()};
$('#ritmo').onchange=paso;$('#repetir').onclick=paso;
$('#next').onclick=()=>{if(++k>=steps.length){show(3);speak('Estás a salvo');return}paso()};
$('#bloq').onclick=()=>{lift=true;$('#liftMsg').hidden=false;if(!$('#s1').hidden)paso()};
$('#sos').onclick=()=>{$('#sosMsg').textContent='Rescate solicitado con tu ubicación. Luis P. llega en 2 min.';if(!calm()&&navigator.vibrate)navigator.vibrate([200,100,200])};
$('#goCom').onclick=()=>show(2);$('#back1').onclick=()=>show(1);
$$('.cards3 button').forEach(b=>b.onclick=()=>{$$('.cards3 button').forEach(x=>x.classList.toggle('sel',x===b));$('#comMsg').textContent='Enviado a Luis P.: «'+b.textContent+'». Llega en 2 min.'});
$('#reset').onclick=()=>{k=0;lift=false;$('#liftMsg').hidden=true;$('#sosMsg').textContent='';$('#comMsg').textContent='';show(0)};
alert1();
const M=[{id:'R-014',n:'Usuario sordo',u:'Edif. B · Piso 2 · Aula 204',c:'Texto y gestos. No usa audio.',p:'Haz contacto visual antes de dar indicaciones.'},{id:'R-015',n:'Movilidad reducida',u:'Edif. A · Piso 1 · Pasillo',c:'Voz y señas simples.',p:'Confirma la necesidad antes de iniciar el traslado.'},{id:'R-016',n:'Usuario ciego',u:'Edif. C · Planta baja',c:'Voz, guía por contacto.',p:'Ofrece tu brazo y describe el camino.'}];let cur=null;
const bump=(id,d)=>{const e=$(id);e.textContent=+e.textContent+d};
function lista(){$('#misiones').innerHTML=M.map((m,i)=>`<li class="card"><b>${m.id} · ${m.n}</b> (${m.done?'Rescatado':'Pendiente'})<br>${m.u}<br><button data-i="${i}">Ver protocolo</button></li>`).join('');
$$('#misiones button').forEach(b=>b.onclick=()=>{cur=M[b.dataset.i];$('#mTit').textContent='Rescate '+cur.id;$('#mDet').textContent='Comunicación: '+cur.c+' Destino: Patio norte.';$('#mPauta').textContent='Pauta: '+cur.p;$('#rescatado').hidden=!!cur.done;$('#mMsg').textContent=''})}
$('#rescatado').onclick=()=>{cur.done=true;$('#rescatado').hidden=true;$('#mMsg').textContent=cur.id+' marcado como rescatado.';lista();bump('#nEva',1)};lista();
$('#emitir').onclick=()=>{const a=document.querySelector('[name=al]:checked').value;$('#aMsg').textContent='Alerta emitida a '+(a==='todo'?'todo el edificio (219 dispositivos)':'piso 3 (48 dispositivos)')+'.'};
['A','B'].forEach(x=>$('#t'+x).onclick=()=>{const e=$('#r'+x);e.textContent=e.textContent==='Despejado'?'Saturado':'Despejado'});
$('#piso').onclick=()=>{$('#nRiesgo').textContent=0;$('#pMsg').textContent='Piso 3 evacuado. Puedes generar el reporte final.'};
