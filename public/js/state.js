/* Data & state aplikasi */
var S=[],loaded=false,cat='Semua',q='',app=document.getElementById('app'),ed=null,authed=false;

function cats(){var m={};S.forEach(function(s){m[s.c]=(m[s.c]||0)+1});return m}

var lang='Semua',LANGS={JavaScript:{e:'.js',s:'JS'},Python:{e:'.py',s:'PY'},PHP:{e:'.php',s:'PHP'},HTML:{e:'.html',s:'HT'},CSS:{e:'.css',s:'CSS'},JSON:{e:'.json',s:'{}'},TypeScript:{e:'.ts',s:'TS'},Lainnya:{e:'.txt',s:'TXT'}};

function L(s){var n=s.lang||'JavaScript',o=LANGS[n]||LANGS.Lainnya;return{n:n,e:o.e,s:o.s}}

function langs(){var o=[];S.forEach(function(x){var n=L(x).n;if(o.indexOf(n)<0)o.push(n)});return o}

function withList(fn){if(loaded){fn();return}app.innerHTML=SK;api('snippets').then(function(d){S=d.map(norm);loaded=true;fn()}).catch(function(){errView(0,function(){withList(fn)})})}

var SK='<div class="wrap" style="padding-top:20px"><div class="skl" style="height:150px"></div><div class="skl" style="height:46px;margin-top:16px"></div><div class="skl" style="height:220px;margin-top:16px"></div></div>';
