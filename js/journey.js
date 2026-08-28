const Journey = (() => {
  const TOTAL = 9;
  let _currentStep = null;

  function goToIntro() {
    document.getElementById('workshop-screen').style.display = 'none';
    document.getElementById('intro-screen').style.display = '';
    document.getElementById('btn-save-progress').style.display = 'none';
    Intro.render();
  }

  function goToEtapa0() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('workshop-screen').style.display = '';
    document.getElementById('btn-save-progress').style.display = '';

    const data = Session.getOrInit();
    const el = document.getElementById('header-participant');
    if (el && data.meta && data.meta.participante) {
      el.textContent = data.meta.participante;
      el.style.display = '';
    }

    _currentStep = 0;
    const etapa = ETAPAS[0];
    document.getElementById('step-content').innerHTML = _wrapWithEtapa0BackButton(_injectTempo(etapa.tempo, etapa.renderContent()));
    _renderSidebar(0, etapa);
    _restoreEtapa0State();
    Etapa0.updateButton();
    renderProgressBar();
    _initScrollSpy();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function _wrapWithEtapa0BackButton(html) {
    return `<button class="btn-back-etapa0" onclick="Journey.goToIntro()">← Voltar ao cadastro</button>${html}`;
  }

  function _restoreEtapa0State() {
    const data = Session.load();
    if (!data) return;
    const email = document.getElementById('etapa0-email');
    const optin = document.getElementById('etapa0-optin');
    if (email && data.meta.email) email.value = data.meta.email;
    if (optin && data.meta.optin_relatorio) optin.checked = true;
  }

  function start() {
    const data = Session.getOrInit();
    const etapaAtual = data.progresso.etapa_atual || 1;

    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('workshop-screen').style.display = '';
    document.getElementById('btn-save-progress').style.display = '';

    const el = document.getElementById('header-participant');
    if (el && data.meta && data.meta.participante) {
      el.textContent = data.meta.participante;
      el.style.display = '';
    }

    renderProgressBar();
    goTo(etapaAtual);
  }

  function renderProgressBar() {
    const data = Session.getOrInit();
    const concluidas = data.progresso.etapas_concluidas || [];
    const atual = data.progresso.etapa_atual || 1;
    const bar = document.getElementById('progress-bar');
    bar.innerHTML = '';

    const dot0 = document.createElement('div');
    dot0.className = 'progress-dot completed';
    dot0.textContent = '0';
    dot0.title = 'Etapa 0';
    dot0.style.cursor = 'pointer';
    dot0.addEventListener('click', () => goToEtapa0());
    if (_currentStep === 0) dot0.classList.add('selected');
    bar.appendChild(dot0);

    for (let i = 1; i <= TOTAL; i++) {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      dot.textContent = i;
      dot.title = `Etapa ${i}`;
      if (concluidas.includes(i)) {
        dot.classList.add('completed');
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', () => goTo(i));
      } else if (i === atual) {
        dot.classList.add('active');
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', () => goTo(i));
      } else {
        dot.classList.add('locked');
      }
      if (i === _currentStep) dot.classList.add('selected');
      bar.appendChild(dot);
    }
  }

  function goTo(n) {
    const data = Session.getOrInit();
    const concluidas = data.progresso.etapas_concluidas || [];
    const etapaAtual = data.progresso.etapa_atual || 1;
    if (n > etapaAtual) return;

    if (typeof ETAPAS === 'undefined' || !ETAPAS[n]) {
      document.getElementById('step-content').innerHTML = `<p style="padding:20px">Etapa ${n} em construção.</p>`;
      _renderSidebar(n, { titulo: `Etapa ${n}`, tempo: '—', topicos: [] });
      return;
    }

    _currentStep = n;
    renderProgressBar();
    const etapa = ETAPAS[n];
    const etapaData = Session.getEtapa(n);
    document.getElementById('step-content').innerHTML = _wrapWithBackButton(_injectTempo(etapa.tempo, etapa.renderContent(etapaData)));
    _renderSidebar(n, etapa);
    _bindPracticeFields(n, etapa);
    _bindConcluirButton(n, etapa);
    _initSyntaxHighlight();
    _initContentBoxes();
    _initScrollSpy();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function _wrapWithBackButton(html) {
    return `<button class="btn-back-etapa0" onclick="Journey.goToEtapa0()">← Voltar à Etapa 0</button>${html}`;
  }

  function _injectTempo(tempo, html) {
    if (!tempo) return html;
    const chip = `<div class="inline-tempo"><span class="inline-tempo-label">Tempo estimado</span><span class="inline-tempo-value">⏱ ${tempo}</span></div>`;
    return html.replace(/(<\/h1>)/, `$1${chip}`);
  }

  function _renderSidebar(n, etapa) {
    const data = Session.getOrInit();
    const concluidas = data.progresso.etapas_concluidas || [];
    const pct = Math.round((concluidas.length / TOTAL) * 100);
    document.getElementById('sidebar') && (document.getElementById('sidebar').innerHTML = '');
  }

  function _bindPracticeFields(n, etapa) {
    if (!etapa.campos) return;
    etapa.campos.forEach(campo => {
      const el = document.getElementById(`campo-${campo.key}`);
      if (!el) return;
      const saved = Session.getEtapa(n).respostas[campo.key];
      if (saved !== undefined) el.value = saved;
      el.addEventListener('input', () => {
        Session.setEtapaResposta(n, campo.key, el.value);
        _updateConcluirState(n, etapa);
      });
    });
    _updateConcluirState(n, etapa);
  }

  function _updateConcluirState(n, etapa) {
    const btn = document.getElementById(`btn-concluir-${n}`);
    if (!btn) return;
    const etapaData = Session.getEtapa(n);
    const obrigatorios = (etapa.campos || []).filter(c => c.obrigatorio);
    btn.disabled = !obrigatorios.every(c => (etapaData.respostas[c.key] || '').trim() !== '');
  }

  function _bindConcluirButton(n, etapa) {
    const btn = document.getElementById(`btn-concluir-${n}`);
    if (!btn) return;
    _updateConcluirState(n, etapa);
    btn.addEventListener('click', () => concluir(n));
  }

  function concluir(n) {
    Session.concluirEtapa(n);
    renderProgressBar();
    if (n >= TOTAL) {
      document.getElementById('workshop-screen').style.display = 'none';
      document.getElementById('final-screen').style.display = '';
      Export.renderFinalScreen();
    } else {
      goTo(n + 1);
    }
  }

  function _initSyntaxHighlight() {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
    }
  }

  function _initContentBoxes() {
    document.querySelectorAll('.content-box').forEach(box => {
      const btnCopy = box.querySelector('.btn-copy');
      const btnExpand = box.querySelector('.btn-expand');
      const pre = box.querySelector('pre');
      if (btnCopy && pre) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(pre.textContent).then(() => {
            btnCopy.textContent = 'Copiado!';
            setTimeout(() => { btnCopy.textContent = 'Copiar'; }, 1500);
          });
        });
      }
      if (btnExpand) {
        btnExpand.addEventListener('click', () => {
          box.classList.toggle('expanded');
          btnExpand.textContent = box.classList.contains('expanded') ? 'Recolher' : 'Expandir';
        });
      }
    });
  }

  function _initScrollSpy() {
    const headings = Array.from(document.querySelectorAll('#step-content h2'));
    const topics = Array.from(document.querySelectorAll('#sidebar-topics li'));
    if (!headings.length || !topics.length) return;

    // Assign stable IDs to headings so topics can link to them
    headings.forEach((h, i) => {
      if (!h.id) h.id = `heading-${i}`;
    });

    // Click on topic → scroll heading into view with offset for sticky header
    topics.forEach((t, i) => {
      if (headings[i]) {
        t.style.cursor = 'pointer';
        t.addEventListener('click', () => {
          const top = headings[i].getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      }
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = headings.indexOf(entry.target);
          topics.forEach(t => t.classList.remove('active'));
          if (topics[idx]) topics[idx].classList.add('active');
        }
      });
    }, { rootMargin: '-56px 0px -60% 0px', threshold: 0 });
    headings.forEach(h => observer.observe(h));
  }

  document.addEventListener('DOMContentLoaded', () => Intro.render());

  return { start, goTo, goToEtapa0, goToIntro, concluir, renderProgressBar };
})();
