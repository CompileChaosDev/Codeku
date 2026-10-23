/* Fungsi bantu: escape HTML, salin, ikon, panggilan API */
function qa(s){return esc(s).replace(/"/g,'&quot;')}

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}

function hl(src,lg){return src.split('\n').map(function(l){
 var x=esc(l);
 if(/^\s*(\/\*|\*|\/\/|#)/.test(l)&&!(lg=='CSS'&&/^\s*#/.test(l)))return '<span class="c2">'+x+'</span>';
 x=x.replace(/('[^']*')/g,'<span class="s">$1</span>').replace(/\b(const|let|var|function|return|new|require|import|from|export|def|if|else|elif|for|while|echo|use|async|await|try|catch)\b/g,'<span class="k">$1</span>').replace(/\b(\d+)\b/g,'<span class="n">$1</span>');
 return x}).join('\n')}

function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1600)}

function copy(txt,msg){
 try{navigator.clipboard.writeText(txt).then(function(){toast(msg)},fb)}catch(e){fb()}
 function fb(){try{var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();toast(msg)}catch(e){toast('Gagal menyalin')}}}

var IC={home:"<path d='M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z'/>",shield:"<path d='M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'/><path d='M9 12l2 2 4-4'/>",user:"<circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 4-6 8-6s8 2 8 6'/>",lock:"<rect x='5' y='11' width='14' height='10' rx='2'/><path d='M8 11V8a4 4 0 0 1 8 0v3'/>",eye:"<path d='M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z'/><circle cx='12' cy='12' r='3'/>",eyeoff:"<path d='M3 3l18 18M10.6 6.1A10 10 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.9C3.8 8.7 2 12 2 12s4 7 10 7c1.8 0 3.4-.5 4.8-1.2'/>",chat:"<path d='M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.2A8 8 0 1 1 21 12z'/>",search:"<circle cx='11' cy='11' r='7'/><path d='M21 21l-5-5'/>",menu:"<path d='M4 7h16M4 12h16M4 17h16'/>",close:"<path d='M6 6l12 12M18 6L6 18'/>",tools:"<path d='M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z'/>",bolt:"<path d='M13 2L4 14h7l-1 8 9-12h-7z'/>",link:"<path d='M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'/>",copy:"<rect x='9' y='9' width='11' height='11' rx='2'/><path d='M5 15V6a2 2 0 0 1 2-2h8'/>",cal:"<rect x='4' y='5' width='16' height='16' rx='2'/><path d='M4 10h16M9 3v4M15 3v4'/>",trash:"<path d='M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3'/>",edit:"<path d='M4 20h4L19 9l-4-4L4 16zM13 7l4 4'/>",save:"<path d='M5 3h11l3 3v15H5zM8 3v6h7V3M8 21v-7h8v7'/>",reset:"<path d='M4 12a8 8 0 1 1 3 6.2M4 20v-6h6'/>"};

function paint(){document.querySelectorAll('u[data-ic]:empty').forEach(function(e){e.innerHTML='<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(IC[e.dataset.ic]||'')+'</svg>'})}

new MutationObserver(paint).observe(document.body,{childList:true,subtree:true});paint();

var MN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

function api(path,opt){opt=opt||{};var o={method:opt.method||'GET',headers:{'Content-Type':'application/json'},credentials:'same-origin'};if(opt.body)o.body=JSON.stringify(opt.body);
 return fetch('/api/'+path,o).then(function(r){return r.json().catch(function(){return {}}).then(function(d){if(!r.ok){var e=new Error(d.error||('Error '+r.status));e.status=r.status;throw e}return d})})}

function norm(r){var d=new Date(r.created_at);return{id:r.id,t:r.title,d:r.description||'',c:r.category,tags:r.tags||[],lang:r.lang,pv:r.preview||'',code:r.code,date:d.getDate()+' '+MN[d.getMonth()]+' '+d.getFullYear(),isNew:Date.now()-d.getTime()<6048e5}}
