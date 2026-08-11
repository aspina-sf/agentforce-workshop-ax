const Journey = (() => {
  const TOTAL = 9;

  function goToEtapa0() {
    document.getElementById('workshop-screen').style.display = 'none';
    document.getElementById('intro-screen').style.display = '';
    document.getElementById('btn-save-progress').style.display = 'none';

    const etapa = ETAPAS[0];
    document.getElementById('intro-content').innerHTML = etapa.renderContent();
    _restoreEtapa0State();
    Etapa0.updateButton();
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
      } else {
        dot.classList.add('locked');
      }
      bar.appendChild(dot);
    }
  }

  function goTo(n) {
    const data = Session.getOrInit();
    const concluidas = data.progresso.etapas_concluidas || [];
    const etapaAtual = data.progresso.etapa_atual || 1;
    if (n !== etapaAtual && !concluidas.includes(n)) return;

    if (typeof ETAPAS === 'undefined' || !ETAPAS[n]) {
      document.getElementById('step-content').innerHTML = `<p style="padding:20px">Etapa ${n} em construção.</p>`;
      _renderSidebar(n, { titulo: `Etapa ${n}`, tempo: '—', topicos: [] });
      return;
    }

    const etapa = ETAPAS[n];
    const etapaData = Session.getEtapa(n);
    document.getElementById('step-content').innerHTML = _wrapWithBackButton(etapa.renderContent(etapaData));
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

  function _renderSidebar(n, etapa) {
    const data = Session.getOrInit();
    const concluidas = data.progresso.etapas_concluidas || [];
    const pct = Math.round((concluidas.length / TOTAL) * 100);
    document.getElementById('sidebar').innerHTML = `
      <div class="sidebar-card">
        <h4>Tempo estimado</h4>
        <div class="sidebar-time">⏱ ${etapa.tempo || '15 min'}</div>
      </div>
      <div class="sidebar-card">
        <h4>Tópicos</h4>
        <ul class="sidebar-topics" id="sidebar-topics">
          ${(etapa.topicos || []).map((t, i) => `<li data-idx="${i}">${t}</li>`).join('')}
        </ul>
      </div>
      <div class="sidebar-card sidebar-progress">
        <h4>Progresso geral</h4>
        <div class="sidebar-progress-bar-track">
          <div class="sidebar-progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <div>${concluidas.length}/${TOTAL} etapas</div>
      </div>`;
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
      Session.sendToGAS();
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = headings.indexOf(entry.target);
          topics.forEach(t => t.classList.remove('active'));
          if (topics[idx]) topics[idx].classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    headings.forEach(h => observer.observe(h));
  }

  document.addEventListener('DOMContentLoaded', () => Intro.render());

  return { start, goTo, goToEtapa0, concluir, renderProgressBar };
})();
