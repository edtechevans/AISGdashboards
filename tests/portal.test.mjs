import {readFileSync, existsSync} from 'node:fs';
import {strict as assert} from 'node:assert';
import test from 'node:test';
import vm from 'node:vm';

const source=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

function renderApp(hash='#/'){
  const app={innerHTML:''};
  const switcher={value:'', addEventListener(name,fn){if(name==='change')this.change=fn;}};
  const elements={app,switch:switcher};
  const document={title:'',getElementById(id){return elements[id]}};
  const location={hash};
  let onChange;
  vm.runInNewContext(source,{document,location,addEventListener(name,fn){if(name==='hashchange')onChange=fn;}},{timeout:1500});
  return {app,document,location,switcher,navigate(to){location.hash=to;onChange();}};
}
test('six distinct workspaces render on the landing page',()=>{
  const {app}=renderApp();
  assert.equal((app.innerHTML.match(/class="tile"/g)||[]).length,6);
  for(const heading of ['My Learners','Growth & Reflection','Climate & Wellbeing','Learning Leaders','Student Support','Board'])
    assert.ok(app.innerHTML.includes(heading),heading);
});
test('workspace routes stay inside the shell and dashboard switcher works',()=>{
  const p=renderApp();
  p.navigate('#/workspace/sss');
  assert.ok(p.app.innerHTML.includes('Student Support'));
  assert.ok(p.app.innerHTML.includes('Integration in progress'));
  p.switcher.change({target:{value:'climate'}});
  assert.equal(p.location.hash,'#/workspace/climate');
  p.navigate(p.location.hash);
  assert.ok(p.app.innerHTML.includes('Secure migration'));
  p.navigate('#/');
  assert.ok(p.app.innerHTML.includes('Your dashboards'));
});
test('public shell does not embed live apps or confidential datasets',()=>{
  assert.doesNotMatch(source,/<iframe|observations-full[.]csv|faculty-goals[.]json|data\/student-/i);
  assert.ok(html.includes('noindex,nofollow'));
  for(const folder of ['data','secrets','private'])assert.equal(existsSync(new URL('../'+folder+'/',import.meta.url)),false);
});
test('brand asset and relative links exist',()=>{
  assert.ok(existsSync(new URL('../assets/aisg-logo.webp',import.meta.url)));
  assert.ok(html.includes('href="styles.css"'));
  assert.ok(html.includes('src="app.js"'));
  assert.ok(source.includes('assets/aisg-logo.webp'));
});

test('reference design uses prominent white AISG welcome tile, not a dark hero or side rail',()=>{
  const {app}=renderApp();
  const css=readFileSync(new URL('../styles.css',import.meta.url),'utf8');
  assert.ok(app.innerHTML.includes('class="welcome-brand"'));
  assert.ok(app.innerHTML.includes('AISG — American International School of Guangzhou'));
  assert.ok(app.innerHTML.includes('class="tile-grid"'));
  assert.ok(app.innerHTML.includes('class="lower-grid"'));
  assert.ok(app.innerHTML.includes('class="tile-head"'));
  assert.doesNotMatch(app.innerHTML,/class="rail"|class="hero"/);
  assert.match(css,/\.welcome\s*\{[^}]*background:var\(--surface\)/);
  assert.match(css,/\.tile-grid\s*\{[^}]*repeat\(3/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
test('all six cards contain an SVG icon, a truthfully labeled status and a real route',()=>{
  const {app}=renderApp();
  assert.equal((app.innerHTML.match(/class="tile-icon"/g)||[]).length,6);
  assert.equal((app.innerHTML.match(/class="tile-status /g)||[]).length,6);
  assert.equal((app.innerHTML.match(/class="tile-bottom"/g)||[]).length,6);
  for (const w of ['my-learners','growth','climate','leaders','sss','board'])
    assert.ok(app.innerHTML.includes('href="#/workspace/'+w+'"'));
});
