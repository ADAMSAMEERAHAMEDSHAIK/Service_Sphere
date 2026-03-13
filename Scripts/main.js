/* ---- DATA ---- */
const SKEY = 'ss_v2_cities';
let db = JSON.parse(localStorage.getItem(SKEY)) || [];
let activeFilter = 'all';

const SVC_ICONS = {
  mechanic: 'fa-wrench', electrician: 'fa-bolt', plumber: 'fa-droplet',
  cleaner: 'fa-broom', carpenter: 'fa-hammer', tutor: 'fa-graduation-cap',
  nurse: 'fa-user-nurse', painter: 'fa-paint-roller', pest: 'fa-bug',
  ac: 'fa-snowflake', driver: 'fa-car', security: 'fa-shield-halved'
};
const SVC_LABELS = {
  mechanic: 'Mechanic', electrician: 'Electrician', plumber: 'Plumber',
  cleaner: 'Home Cleaner', carpenter: 'Carpenter', tutor: 'Tutor',
  nurse: 'Home Nurse', painter: 'Painter', pest: 'Pest Control',
  ac: 'AC Service', driver: 'Driver', security: 'Security'
};

/* ---- CURSOR ---- */
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.cssText = `left:${mx}px;top:${my}px;`; });
(function loop() { rx += (mx - rx) * .11; ry += (my - ry) * .11; ring.style.cssText = `left:${rx}px;top:${ry}px;`; requestAnimationFrame(loop); })();
document.querySelectorAll('a,button,input,select,.svc-card,.chip,.fdrop,.oi,.r-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('chov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('chov'));
});

/* ---- NAVBAR SCROLL ---- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

/* ---- COUNTER ANIMATION ---- */
function animCount(el) {
  const t = +el.dataset.t, dur = 1600;
  const step = t / (dur / 16); let c = 0;
  const ti = setInterval(() => { c += step; if (c >= t) { c = t; clearInterval(ti); } el.textContent = Math.floor(c); }, 16);
}

/* Hero center count */
(function () {
  let c = 0; const el = document.getElementById('heroCount');
  const ti = setInterval(() => { c += .4; if (c >= 12) { c = 12; clearInterval(ti); } el.textContent = Math.floor(c); }, 40);
})();

/* ---- INTERSECTION OBSERVER ---- */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      if (e.target.classList.contains('reveal')) e.target.classList.add('vis');
      // counters
      e.target.querySelectorAll && e.target.querySelectorAll('.cnt').forEach(animCount);
    }
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal,.step').forEach(el => obs.observe(el));
const stripObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.cnt').forEach(animCount); stripObs.disconnect(); } });
}, { threshold: .2 });
const strip = document.querySelector('.stats-strip');
if (strip) stripObs.observe(strip);

/* ---- FILTER ---- */
function setFilter(el, s) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  activeFilter = s;
  const v = document.getElementById('cityIn').value.trim();
  if (v) doSearch();
}

/* ---- SEARCH ---- */
function doSearch() {
  const city = document.getElementById('cityIn').value.trim();
  if (!city) { toast('Please enter a city name', true); return; }
  const wrap = document.getElementById('results-wrap');
  const cd = db.find(c => c.city.toLowerCase() === city.toLowerCase());
  let list = cd ? [...cd.rentals] : [];
  if (activeFilter !== 'all') list = list.filter(r => r.cat === activeFilter);
  wrap.innerHTML = '';
  if (!list.length) {
    wrap.innerHTML = `<div class="empty"><div class="ei">◎</div><p>No professionals found in "${city}"</p><span>${activeFilter !== 'all' ? `No ${SVC_LABELS[activeFilter] || activeFilter} listed here yet` : 'Try a different city or filter'}</span></div>`;
    return;
  }
  const hdr = document.createElement('div');
  hdr.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;margin-bottom:24px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.06);';
  hdr.innerHTML = `<span style="font-family:var(--ff-head);font-size:26px;letter-spacing:-1px">Results in <em style="color:var(--amber)">${cd ? cd.city : city}</em></span><span style="font-family:var(--ff-mono);font-size:11px;letter-spacing:2px;color:var(--violet2)">${list.length} Professional${list.length !== 1 ? 's' : ''}</span>`;
  wrap.appendChild(hdr);
  const grid = document.createElement('div');
  grid.className = 'r-grid';
  list.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'r-card';
    card.style.animationDelay = (i * .07) + 's';
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}" loading="lazy"/>
      <div class="r-card-body">
        <div class="r-badge"><i class="fa-solid ${SVC_ICONS[r.cat] || 'fa-briefcase'}"></i> ${SVC_LABELS[r.cat] || r.cat}</div>
        <div class="r-name">${r.name}</div>
        <div class="r-loc"><i class="fa-solid fa-location-dot"></i><span>${r.loc}</span></div>
        <div class="r-foot">
          <div class="r-rate">₹${r.rate}<small>per hour</small></div>
          <a class="r-contact" href="mailto:${r.email}"><i class="fa-solid fa-envelope"></i> Contact</a>
          <a class="r-contact" href="tel:${r.mobile}"><i class="fa-solid fa-phone"></i> Call</a>
        </div>
      </div>`;
    card.addEventListener('mouseenter', () => document.body.classList.add('chov'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('chov'));
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

/* ---- JUMP FROM SERVICE CARD ---- */
function jumpFind(svc) {
  document.getElementById('find').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const ch = document.querySelector(`.chip[data-s="${svc}"]`);
    if (ch) { document.querySelectorAll('.chip').forEach(c => c.classList.remove('on')); ch.classList.add('on'); activeFilter = svc; }
  }, 400);
}

/* ---- FILE ---- */
function onFile(inp) {
  if (inp.files[0]) {
    document.getElementById('fdropLbl').textContent = inp.files[0].name;
    document.getElementById('fdrop').style.cssText = 'border-color:var(--violet2);color:var(--violet2);background:rgba(124,58,237,.07)';
  }
}

/* ---- ADD ---- */
function doAdd(ev) {
  ev.preventDefault();
  const name = document.getElementById('pName').value.trim();
  const cat = document.getElementById('pCat').value;
  const rate = +document.getElementById('pRate').value;
  const city = document.getElementById('pCity').value.trim();
  const email = document.getElementById('pEmail').value.trim().toLowerCase();
  const loc = document.getElementById('pLoc').value.trim();
  const mobile = document.getElementById('pMobile').value.trim();
  const imgFile = document.getElementById('pImg').files[0];
  if (!imgFile) { toast('Please upload a profile photo', true); return; }
  const rd = new FileReader();
  rd.onload = e => {
    let cd = db.find(c => c.city.toLowerCase() === city.toLowerCase());
    if (!cd) { cd = { city, rentals: [] }; db.push(cd); }
    if (cd.rentals.find(r => r.email === email)) { toast('Email already registered in this city', true); return; }
    cd.rentals.push({ name, cat, rate, email, mobile, loc, img: e.target.result, ts: Date.now() });
    localStorage.setItem(SKEY, JSON.stringify(db));
    document.getElementById('addForm').reset();
    document.getElementById('fdropLbl').textContent = 'Click to upload your photo';
    document.getElementById('fdrop').removeAttribute('style');
    toast('✓ Listing registered successfully!');
  };
  rd.readAsDataURL(imgFile);
}

/* ---- REMOVE ---- */
function doRemove(ev) {
  ev.preventDefault();
  const city = document.getElementById('rCity').value.trim().toLowerCase();
  const email = document.getElementById('rEmail').value.trim().toLowerCase();
  const cd = db.find(c => c.city.toLowerCase() === city);
  if (!cd) { toast('City not found in database', true); return; }
  const idx = cd.rentals.findIndex(r => r.email === email);
  if (idx === -1) { toast('No listing found with that email', true); return; }
  cd.rentals.splice(idx, 1);
  if (!cd.rentals.length) db = db.filter(c => c.city.toLowerCase() !== city);
  localStorage.setItem(SKEY, JSON.stringify(db));
  document.getElementById('remForm').reset();
  toast('✓ Listing removed successfully!');
}

/* ---- PROVIDER TABS ---- */
function pTab(t) {
  ['add', 'rem'].forEach(x => {
    document.getElementById(x + 'Form').classList.toggle('hidden', x !== t);
    document.getElementById(x + 'Tab').classList.toggle('on', x === t);
  });
}

/* ---- TOAST ---- */
function toast(msg, err = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.color = err ? '#f87171' : 'var(--violet2)';
  t.style.borderColor = err ? 'rgba(248,113,113,.3)' : 'rgba(124,58,237,.3)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ════════════════════════════════════════
   AUTH SYSTEM
════════════════════════════════════════ */
const UKEY = 'ss_users';
const SKEY2 = 'ss_session';

function getUsers() { return JSON.parse(localStorage.getItem(UKEY) || '[]'); }
function saveUsers(u) { localStorage.setItem(UKEY, JSON.stringify(u)); }
function getSession() { return JSON.parse(localStorage.getItem(SKEY2) || 'null'); }
function saveSession(u) { localStorage.setItem(SKEY2, JSON.stringify(u)); }
function clearSession() { localStorage.removeItem(SKEY2); }

/* Render nav based on auth state */
function renderNav() {
  const sess = getSession();
  const loginBtn = document.getElementById('navLoginBtn');
  const pill = document.getElementById('navUserPill');
  const uname = document.getElementById('navUserName');
  const uavatar = document.getElementById('navUserAvatar');
  if (sess) {
    loginBtn.classList.add('hidden');
    pill.classList.remove('hidden');
    uname.textContent = sess.firstName;
    uavatar.textContent = sess.firstName[0].toUpperCase();
  } else {
    loginBtn.classList.remove('hidden');
    pill.classList.add('hidden');
  }
}

/* Open / Close auth modal */
function openAuth(tab = 'signin') {
  switchAuthTab(tab);
  document.getElementById('authModal').classList.add('open');
  document.getElementById('authBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAuth() {
  document.getElementById('authModal').classList.remove('open');
  document.getElementById('authBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

/* Switch signin / register tab */
function switchAuthTab(t) {
  document.getElementById('formSignin').classList.toggle('hidden', t !== 'signin');
  document.getElementById('formRegister').classList.toggle('hidden', t !== 'register');
  document.getElementById('tabSignin').classList.toggle('on', t === 'signin');
  document.getElementById('tabRegister').classList.toggle('on', t === 'register');
}

/* Open / Close gate popup */
function openGate() {
  document.getElementById('gatePopup').classList.add('open');
  document.getElementById('gateBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGate() {
  document.getElementById('gatePopup').classList.remove('open');
  document.getElementById('gateBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

/* Sign In */
function doSignIn(ev) {
  ev.preventDefault();
  const email = document.getElementById('siEmail').value.trim().toLowerCase();
  const pass = document.getElementById('siPass').value;
  const role = document.getElementById('regRole').value;
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) { toast('Incorrect email or password', true); return; }
  if (!role) { toast('Please select account type', true); return; }
  saveSession(user);
  closeAuth();
  renderNav();
  toast('✓ Welcome back, ' + user.firstName + '!');
  if (role === "user") {
    window.location.href = "find.html";
  }
  else if (role === "professional") {
    window.location.href = "pros.html";
  }
}


/* Register */
function doRegister(ev) {
  ev.preventDefault();
  const first = document.getElementById('regFirst').value.trim();
  const last = document.getElementById('regLast').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const role = document.getElementById('regRole').value;
  if (pass !== pass2) { toast('Passwords do not match', true); return; }
  const users = getUsers();
  if (users.find(u => u.email === email)) { toast('Email already registered', true); return; }
  const newUser = { firstName: first, lastName: last, email: email, password: pass, role: role };
  users.push(newUser);
  saveUsers(users);
  saveSession(newUser);
  switchAuthTab('signin');
  toast('✓ Account created! Welcome, ' + first + '!');
}


/* Sign Out */
function doSignOut() {
  clearSession();
  renderNav();
  /* remove logged-in session */
  localStorage.removeItem("ss_session");

  /* redirect to home page */
  window.location.href = "index.html";
  toast('Signed out successfully');
}

/* Password eye toggle */
function toggleEye(id, btn) {
  const inp = document.getElementById(id);
  const isText = inp.type === 'text';
  inp.type = isText ? 'password' : 'text';
  btn.querySelector('i').className = isText ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
}

/* Override doSearch to gate it */
const _origSearch = doSearch;
window.doSearch = function () {
  if (!getSession()) { openGate(); return; }
  _origSearch();
};

/* Init */
renderNav();

/* ── Cursor hover targets ── */
document.querySelectorAll('a,button,input,textarea,.social-btn,.pinfo-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('chov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('chov'));
});

/* ── Navbar shrink on scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

/* ── Scroll / load reveal ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .08 });
['profileCard', 'contactHd', 'mapWrap', 'contactCard'].forEach(id => {
  const el = document.getElementById(id);
  if (el) revObs.observe(el);
});

/* ── Contact form submit ── */
function sendMessage(ev) {
  ev.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();
  if (!name || !email || !msg) { toast('Please fill in all fields', true); return; }
  const subject = encodeURIComponent('Message from ' + name + ' — ServiceSphere');
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + msg);
  window.location.href = `mailto:support@servicesphere.in?subject=${subject}&body=${body}`;
  document.getElementById('contactForm').reset();
  toast('✓ Opening your mail client…');
}