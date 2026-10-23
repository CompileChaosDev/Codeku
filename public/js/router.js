/* Navigasi & routing */
function menu(o){document.body.classList.toggle('open',!!o)}

function go(p){menu(0);var u=p=='home'?'/':p=='login'?'/login':p=='admin'?'/admin':p.indexOf('code-')==0?'/code/'+p.slice(5):p;if(u!=location.pathname)history.pushState(null,'',u);route()}

document.addEventListener('keydown',function(e){if(e.key=='Escape')menu(0)});

function route(){var al=document.getElementById('adl');if(al)al.textContent=authed?'Panel Admin':'Login Admin';
 var P=location.pathname.replace(/\/+$/,'')||'/',h=P=='/'?'home':P=='/login'?'login':P=='/admin'?'admin':/^\/code\/[^\/]+$/.test(P)?'code-'+decodeURIComponent(P.slice(6)):'nf';
 window.scrollTo(0,0);document.title=CFG.name+' — '+CFG.tagline;
 document.querySelectorAll('[data-nav]').forEach(function(b){b.classList.toggle('on',b.dataset.nav==((h=='login'||h=='admin')?'login':'home'))});
 if(h=='login')login();else if(h=='admin'){if(authed)withList(adminView);else go('login')}else if(h.indexOf('code-')==0)detail(h.slice(5));else if(h=='nf')errView(404);else withList(home)}

window.addEventListener('popstate',route);

// Mulai: muat config -> cek login -> tampilkan halaman
loadConfig().then(function () { return api('me'); }).then(function (d) { authed = !!d.authed; }).catch(function () {}).then(route);
