(() => {
    const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const T = ['07 88 980 111', '07 57 869 627', '01 03 505 896'], tel = n => 'tel:+225' + n.replace(/ /g, '');
    const P = [['index.html', 'Accueil'], ['chambres.html', 'Chambres & espaces'], ['carte.html', 'Carte'], ['piscine-soirees.html', 'Piscine & soirées']];
    const cur = location.pathname.split('/').pop() || 'index.html';
    const links = P.map(p => `<a href="${p[0]}"${p[0] == cur ? ' class="on"' : ''}>${p[1]}</a>`).join('');
    document.body.insertAdjacentHTML('afterbegin', `<header class="nav"><a href="index.html" class="logo"><img src="assets/img/logo.png" alt="Hôtel Pary's Residence HPR"></a><nav id="nv">${links}<button class="btn p" data-book>Réserver</button></nav><button class="btn burger" id="bg">Menu</button></header>`);
    document.body.insertAdjacentHTML('beforeend', `<footer><div class="w ft"><div><b>Hôtel Pary’s Residence</b><p>★★★ · Toumodi<br>Derrière la boulangerie du Grand Marché</p></div><div>${T.map(n => `<a href="${tel(n)}">+225 ${n}</a>`).join('<br>')}</div><div>${P.map(p => `<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</div></div></footer><div class="callbar"><a class="btn" href="${tel(T[0])}">Appeler</a><button class="btn p" data-book>Réserver</button></div>`);
    $$('[data-cc]').forEach(c => { c.className = 'cc'; c.innerHTML = T.map((n, i) => `<a class="card" href="${tel(n)}"><small>${i ? 'Réservation' : 'Réception & réservation'}</small><b>+225 ${n}</b><span>Appeler</span></a>`).join('') + `<div class="card"><small>Où nous trouver</small><b>Toumodi</b><span>Derrière la boulangerie du Grand Marché</span></div>` });
    $$('[data-tel]').forEach(c => c.innerHTML = T.map(n => `<a href="${tel(n)}">+225 ${n}</a>`).join(''));
    $('#bg').onclick = () => { const o = $('#nv').classList.toggle('open'); $('#bg').textContent = o ? 'Fermer' : 'Menu' };
    $$('[data-split]').forEach(h => { let d = 0; h.innerHTML = h.innerHTML.split(/(<em>.*?<\/em>|\s+)/).filter(x => x.trim()).map(w => `<span class="sw"><span style="animation-delay:${(d++) * .12 + .1}s">${w}</span></span>`).join(' ') });
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 }); $$('[data-r]').forEach(e => io.observe(e));
    $$('.bt,.dish').forEach(c => { c.classList.add('sp'); c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px') }) });
    const hero = $('.hero'); if (hero) hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; $$('[data-z]', hero).forEach(l => l.style.transform = `translate(${-x * l.dataset.z}px,${-y * l.dataset.z}px)`) });
    $$('.tilt').forEach(t => { const i = $('img', t); t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; i.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)` }); t.addEventListener('pointerleave', () => i.style.transform = '') });
    const M = $$('.mq').map(m => { const t = $('.t', m); t.innerHTML += t.innerHTML; return { t, x: 0, d: +m.dataset.dir || -1, b: +m.dataset.sp || .6 } }); let ly = scrollY, v = 0;
    (function f() { const y = scrollY; v = v * .9 + (y - ly) * .1; ly = y; M.forEach(m => { const w = m.t.scrollWidth / 2; if (!w) return; m.x += m.d * (m.b + Math.abs(v) * .5) * (v < -.5 ? -1 : 1); if (m.x <= -w) m.x += w; if (m.x > 0) m.x -= w; m.t.style.transform = `translateX(${m.x}px)` }); requestAnimationFrame(f) })();
    const st = $$('.stk article'); st.forEach((a, i) => a.style.top = (96 + i * 18) + 'px');
    const sn = $$('.sn a'), cats = $$('.cat');
    function onS() {
        st.forEach((a, i) => { const n = st[i + 1]; if (!n || innerWidth < 861) { a.style.transform = ''; return } const p = Math.min(1, Math.max(0, (innerHeight - n.getBoundingClientRect().top) / (innerHeight - 96 - (i + 1) * 18))); a.style.transform = `scale(${1 - .06 * p})` });
        if (sn.length) { let k = 0; cats.forEach((c, i) => { if (c.getBoundingClientRect().top < 180) k = i }); sn.forEach((a, i) => a.classList.toggle('on', i == k)) }
    }
    addEventListener('scroll', onS, { passive: true }); addEventListener('resize', onS); onS();
    const pl = $('.pool'), pt = $('.thumbs'); if (pl) pt.onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('button', pt).forEach(x => x.classList.toggle('on', x == b)); const i = new Image(); i.src = b.dataset.src; i.alt = b.dataset.alt; i.className = 'new'; pl.append(i); i.onanimationend = () => $$('img', pl).forEach(x => x !== i && x.remove()) };
    const S = { st: 1, a: null, b: null, ad: 2, ch: 0, room: 'Pas de préférence', nom: '', tel: '', m: new Date() }; S.m.setDate(1);
    const fmt = d => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }), t0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d };
    const nn = () => S.a && S.b ? Math.round((S.b - S.a) / 864e5) : 0, pl_ = n => n > 1 ? 's' : '';
    function draw() {
        const m = $('.mb'), n = nn(); let h = `<button class="x" data-act="close" aria-label="Fermer">×</button><p class="eyebrow">Réservation · étape ${S.st} sur 3</p>`;
        if (S.st == 1) {
            const y = S.m.getFullYear(), mo = S.m.getMonth(), f = (new Date(y, mo, 1).getDay() + 6) % 7, dn = new Date(y, mo + 1, 0).getDate(), t = t0();
            h += `<h3>Vos dates de séjour</h3><div class="chips">${[1, 2, 3, 7].map(k => `<button data-act="q" data-k="${k}">${k == 7 ? '1 semaine' : k + ' nuit' + pl_(k)}</button>`).join('')}</div><div class="calh"><button data-act="pm">‹</button><b>${S.m.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</b><button data-act="nm">›</button></div><div class="cal">${'LMMJVSD'.split('').map(x => `<small>${x}</small>`).join('')}${'<i></i>'.repeat(f)}${Array.from({ length: dn }, (_, i) => { const d = new Date(y, mo, i + 1), c = (S.a && +d == +S.a) || (S.b && +d == +S.b) ? 'sel' : S.a && S.b && d > S.a && d < S.b ? 'rg' : ''; return `<button class="${c}" data-act="d" data-t="${+d}"${d < t ? ' disabled' : ''}>${i + 1}</button>` }).join('')}</div><p class="sum">${S.a ? fmt(S.a) + (S.b ? ' → ' + fmt(S.b) + ' · ' + n + ' nuit' + pl_(n) : ' → choisissez le départ') : 'Choisissez votre arrivée'}</p><button class="btn p" data-act="go2"${n ? '' : ' disabled'}>Continuer</button>`
        }
        else if (S.st == 2) { h += `<h3>Voyageurs et chambre</h3>${[['Adultes', 'ad', 1], ['Enfants', 'ch', 0]].map(r => `<div class="fr"><div>${r[0]}</div><div><button data-act="m" data-k="${r[1]}">−</button><b>${S[r[1]]}</b><button data-act="p" data-k="${r[1]}">+</button></div></div>`).join('')}<select class="fld" id="rm">${['Pas de préférence', 'Chambre · coin salon bleu', 'Chambre · coin salon rouge'].map(o => `<option${o == S.room ? ' selected' : ''}>${o}</option>`).join('')}</select><input class="fld" id="nm" placeholder="Votre nom" value="${S.nom}"><input class="fld" id="tl" type="tel" placeholder="Votre téléphone" value="${S.tel}"><br><br><button class="btn p" data-act="go3">Voir le récapitulatif</button><button class="btn" data-act="b1">Retour</button>` }
        else { h += `<h3>Votre demande de séjour</h3><ul><li>Arrivée <span>${fmt(S.a)}</span></li><li>Départ <span>${fmt(S.b)}</span></li><li>Durée <span>${n} nuit${pl_(n)}</span></li><li>Voyageurs <span>${S.ad} adulte${pl_(S.ad)}${S.ch ? ' · ' + S.ch + ' enfant' + pl_(S.ch) : ''}</span></li><li>Chambre <span>${S.room}</span></li>${S.nom ? `<li>Au nom de <span>${S.nom}</span></li>` : ''}</ul><p class="sum">La réception confirme la disponibilité et le tarif par téléphone.</p><a class="btn p" href="${tel(T[0])}">Appeler la réception</a><button class="btn" data-act="b2">Modifier</button>` }
        m.innerHTML = h
    }
    function open(room) { if (!$('.md')) document.body.insertAdjacentHTML('beforeend', '<div class="md"><div class="mb"></div></div>'); if (room) S.room = room; S.st = 1; draw(); $('.md').classList.add('on') }
    document.addEventListener('click', e => {
        const bk = e.target.closest('[data-book]'); if (bk) { open(bk.dataset.room); return } const a = e.target.closest('[data-act]'); if (!a) { if (e.target.classList.contains('md')) e.target.classList.remove('on'); return }
        if ($('#nm')) { S.nom = $('#nm').value; S.tel = $('#tl').value; S.room = $('#rm').value } const k = a.dataset.act; if (k == 'close') return $('.md').classList.remove('on');
        if (k == 'd') { const d = new Date(+a.dataset.t); if (!S.a || S.b || d <= S.a) { S.a = d; S.b = null } else S.b = d }
        else if (k == 'q') { S.a = S.a || t0(); S.b = new Date(+S.a + a.dataset.k * 864e5) }
        else if (k == 'pm') S.m.setMonth(S.m.getMonth() - 1); else if (k == 'nm') S.m.setMonth(S.m.getMonth() + 1);
        else if (k == 'm') S[a.dataset.k] = Math.max(a.dataset.k == 'ad' ? 1 : 0, S[a.dataset.k] - 1); else if (k == 'p') S[a.dataset.k] = Math.min(9, S[a.dataset.k] + 1);
        else if (k == 'go2') S.st = 2; else if (k == 'b1') S.st = 1; else if (k == 'b2') S.st = 2;
        else if (k == 'go3') { S.room = $('#rm').value; S.nom = $('#nm').value.trim(); S.tel = $('#tl').value.trim(); S.st = 3 }
        draw()
    });
})();
