# Agentforce Workshop Interativo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma aplicação web estática de 9 etapas progressivas que guia usuários de negócio Salesforce pelo processo de criação e curadoria de um agente Agentforce, gerando artefatos `.md` e `.pdf` ao final.

**Architecture:** Single-page application sem framework, sem build step. Conteúdo de cada etapa em arquivos `content/etapa-N.js` separados. Estado gerenciado em `localStorage` via `session.js`. Progresso controlado por `journey.js`. Exportação em `export.js`.

**Tech Stack:** HTML5, CSS3, JavaScript ES6+ (vanilla), jsPDF (CDN), html2canvas (CDN), highlight.js (CDN)

## Global Constraints

- Sem frameworks JS (React, Vue, etc.) — vanilla JS puro
- Sem build step — abre direto no browser com duplo-clique
- Hospedagem: GitHub Pages (repositório `agentforce-workshop-ax`)
- Idioma: Português do Brasil em todo o conteúdo e UI
- Exemplo real único em todas as etapas: **Force Recovery** / XPTO Comercial Ltda.
- API version mínima: nenhuma — browser moderno (Chrome/Edge/Firefox/Safari)
- Persistência: `localStorage` (auto-save) + File System Access API (salvar em disco)
- Fallback de download via `<a download>` para Safari e ambientes corporativos

---

### Task 1: Estrutura de arquivos e scaffolding

**Files:**
- Create: `index.html`
- Create: `css/workshop.css`
- Create: `js/journey.js`
- Create: `js/session.js`
- Create: `js/export.js`
- Create: `content/intro.js`
- Create: `content/etapa-1.js` through `content/etapa-9.js`
- Create: `content/templates/report.md`
- Create: `assets/salesforce-logo.svg`

**Interfaces:**
- Produces: estrutura de diretórios completa com arquivos vazios prontos para implementação nas tasks seguintes

- [ ] **Step 1: Criar estrutura de diretórios**

```bash
mkdir -p css js content/templates assets
```

- [ ] **Step 2: Criar arquivos JS vazios**

```bash
touch js/journey.js js/session.js js/export.js
touch content/intro.js
for i in 1 2 3 4 5 6 7 8 9; do touch content/etapa-$i.js; done
touch content/templates/report.md
```

- [ ] **Step 3: Criar SVG do logo Salesforce**

Conteúdo de `assets/salesforce-logo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" width="120" height="84">
  <path fill="#00A1E0" d="M83.4 22.5c5.4-5.6 12.9-9.1 21.2-9.1 10.1 0 19 5.2 24.1 13.1 4.2-1.8 8.8-2.8 13.6-2.8 19.1 0 34.6 15.5 34.6 34.6 0 19.1-15.5 34.6-34.6 34.6H55.5C39.1 93 26 79.9 26 63.5c0-14.8 10.5-27.1 24.5-29.9-.5-1.8-.7-3.7-.7-5.6 0-12.6 10.2-22.8 22.8-22.8 5.5 0 10.5 1.9 14.4 5.1"/>
  <text x="55" y="120" font-family="Arial" font-size="13" fill="#00A1E0" font-weight="bold">Agentforce Workshop</text>
</svg>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold project structure"
```

---

### Task 2: session.js — Persistência em localStorage

**Files:**
- Modify: `js/session.js`

**Interfaces:**
- Produces:
  - `Session.load() → sessionData | null`
  - `Session.save(data) → void`
  - `Session.clear() → void`
  - `Session.getEtapa(n) → etapaData`
  - `Session.setEtapaResposta(n, key, value) → void`
  - `Session.concluirEtapa(n) → void`
  - `Session.exportJSON() → void` (dispara download do session.json)
  - `sessionData` shape: `{ meta, progresso, etapas }` conforme spec

- [ ] **Step 1: Implementar session.js**

```js
const SESSION_KEY = 'agentforce_workshop_session';

const Session = (() => {
  function _defaultData() {
    return {
      meta: { participante: '', empresa: '', area: '', caso_de_uso: '', data_inicio: new Date().toISOString(), versao_guia: '1.0' },
      progresso: { etapa_atual: 0, etapas_concluidas: [] },
      etapas: {}
    };
  }

  function load() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function save(data) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }

  function clear() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getOrInit() {
    return load() || _defaultData();
  }

  function getEtapa(n) {
    const data = getOrInit();
    return data.etapas[n] || { concluida: false, timestamp_conclusao: null, respostas: {} };
  }

  function setEtapaResposta(n, key, value) {
    const data = getOrInit();
    if (!data.etapas[n]) data.etapas[n] = { concluida: false, timestamp_conclusao: null, respostas: {} };
    data.etapas[n].respostas[key] = value;
    save(data);
  }

  function concluirEtapa(n) {
    const data = getOrInit();
    if (!data.etapas[n]) data.etapas[n] = { concluida: false, timestamp_conclusao: null, respostas: {} };
    data.etapas[n].concluida = true;
    data.etapas[n].timestamp_conclusao = new Date().toISOString();
    if (!data.progresso.etapas_concluidas.includes(n)) data.progresso.etapas_concluidas.push(n);
    data.progresso.etapa_atual = n + 1;
    save(data);
  }

  function setMeta(fields) {
    const data = getOrInit();
    Object.assign(data.meta, fields);
    save(data);
  }

  function exportJSON() {
    const data = getOrInit();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `session-${data.meta.participante.replace(/\s+/g, '-') || 'workshop'}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return { load, save, clear, getEtapa, setEtapaResposta, concluirEtapa, setMeta, exportJSON, getOrInit };
})();
```

- [ ] **Step 2: Testar manualmente no browser console**

Abrir `index.html` (será criado na Task 3). No console:
```js
Session.setMeta({ participante: 'Teste', empresa: 'Acme' });
console.log(Session.load()); // deve exibir objeto com meta preenchido
Session.setEtapaResposta(1, 'descricao_livre_agente', 'Teste de resposta');
Session.concluirEtapa(1);
console.log(Session.getEtapa(1)); // deve ter concluida: true
Session.clear();
console.log(Session.load()); // deve retornar null
```

- [ ] **Step 3: Commit**

```bash
git add js/session.js
git commit -m "feat: implement session persistence in localStorage"
```

---

### Task 3: index.html — Shell da aplicação

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `js/session.js`, `js/journey.js`, `js/export.js`, `css/workshop.css`
- Produces: DOM com `#intro-screen`, `#workshop-screen`, `#final-screen`, `#progress-bar`, `#step-content`, `#sidebar`

- [ ] **Step 1: Implementar index.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agentforce Workshop</title>
  <link rel="stylesheet" href="css/workshop.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
</head>
<body>

  <!-- Header global -->
  <header id="app-header">
    <div class="header-left">
      <img src="assets/salesforce-logo.svg" alt="Salesforce" class="header-logo">
    </div>
    <div class="header-center">
      <div id="progress-bar" class="progress-bar" aria-label="Progresso do workshop">
        <!-- 9 bolinhas geradas por journey.js -->
      </div>
    </div>
    <div class="header-right">
      <button id="btn-save-progress" class="btn-secondary" onclick="Session.exportJSON()" style="display:none">
        Salvar progresso
      </button>
    </div>
  </header>

  <!-- Tela de boas-vindas -->
  <main id="intro-screen" class="screen active">
    <div id="intro-content">
      <!-- Preenchido por content/intro.js -->
    </div>
  </main>

  <!-- Tela principal do workshop -->
  <main id="workshop-screen" class="screen" style="display:none">
    <div class="workshop-layout">
      <article id="step-content" class="step-main">
        <!-- Preenchido por journey.js conforme etapa atual -->
      </article>
      <aside id="sidebar" class="step-sidebar">
        <!-- Preenchido por journey.js -->
      </aside>
    </div>
  </main>

  <!-- Tela final -->
  <main id="final-screen" class="screen" style="display:none">
    <div id="final-content">
      <!-- Preenchido por export.js -->
    </div>
  </main>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  <script src="js/session.js"></script>
  <script src="content/intro.js"></script>
  <script src="content/etapa-1.js"></script>
  <script src="content/etapa-2.js"></script>
  <script src="content/etapa-3.js"></script>
  <script src="content/etapa-4.js"></script>
  <script src="content/etapa-5.js"></script>
  <script src="content/etapa-6.js"></script>
  <script src="content/etapa-7.js"></script>
  <script src="content/etapa-8.js"></script>
  <script src="content/etapa-9.js"></script>
  <script src="js/export.js"></script>
  <script src="js/journey.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar que abre sem erros no browser**

Abrir `index.html` diretamente no Chrome. Console deve mostrar apenas erros de scripts vazios (esperado nesta task).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add application shell HTML"
```

---

### Task 4: css/workshop.css — Layout e tema Salesforce

**Files:**
- Modify: `css/workshop.css`

**Interfaces:**
- Produces: classes `.screen`, `.workshop-layout`, `.step-main`, `.step-sidebar`, `.progress-bar`, `.progress-dot`, `.callout-box`, `.content-box`, `.btn-primary`, `.btn-secondary`, `.btn-concluir`, `.field-label`, `.practice-field`

- [ ] **Step 1: Implementar workshop.css**

```css
/* Variáveis de tema Salesforce */
:root {
  --sf-blue: #0070D2;
  --sf-blue-dark: #005FB2;
  --sf-yellow: #FFF3CD;
  --sf-amber: #F59B00;
  --sf-gray-bg: #F3F3F3;
  --sf-gray-border: #DDDBDA;
  --sf-text: #181818;
  --sf-text-light: #706E6B;
  --sf-success: #2E844A;
  --sf-white: #FFFFFF;
  --radius: 6px;
  --shadow: 0 2px 8px rgba(0,0,0,0.1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Salesforce Sans', Arial, sans-serif;
  font-size: 16px;
  color: var(--sf-text);
  background: var(--sf-gray-bg);
  min-height: 100vh;
}

#app-header {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--sf-white);
  border-bottom: 1px solid var(--sf-gray-border);
  padding: 0 24px; height: 56px;
  position: sticky; top: 0; z-index: 100;
  box-shadow: var(--shadow);
}
.header-logo { height: 36px; }

.progress-bar { display: flex; gap: 8px; align-items: center; }
.progress-dot {
  width: 32px; height: 32px; border-radius: 50%;
  border: 2px solid var(--sf-gray-border);
  background: var(--sf-white);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600; color: var(--sf-text-light);
  cursor: default; transition: all 0.3s;
}
.progress-dot.active { border-color: var(--sf-blue); color: var(--sf-blue); }
.progress-dot.completed { background: var(--sf-blue); border-color: var(--sf-blue); color: var(--sf-white); }
.progress-dot.locked { opacity: 0.4; }

.screen { min-height: calc(100vh - 56px); }

#intro-screen {
  display: flex; align-items: center; justify-content: center; padding: 40px 24px;
}
.intro-card {
  background: var(--sf-white); border-radius: var(--radius);
  box-shadow: var(--shadow); padding: 40px; max-width: 600px; width: 100%;
}
.intro-card h1 { font-size: 28px; margin-bottom: 8px; color: var(--sf-blue); }
.intro-card p { color: var(--sf-text-light); margin-bottom: 24px; }

.workshop-layout {
  display: grid; grid-template-columns: 1fr 300px;
  gap: 24px; max-width: 1200px; margin: 0 auto; padding: 24px;
}
@media (max-width: 860px) {
  .workshop-layout { grid-template-columns: 1fr; }
  .step-sidebar { order: -1; }
}

.step-main {
  background: var(--sf-white); border-radius: var(--radius);
  box-shadow: var(--shadow); padding: 32px;
}
.step-main h1 { font-size: 24px; color: var(--sf-blue); margin-bottom: 8px; }
.step-main h2 { font-size: 18px; margin: 24px 0 12px; border-top: 1px solid var(--sf-gray-border); padding-top: 20px; }
.step-main p { line-height: 1.7; margin-bottom: 12px; }
.step-main ul, .step-main ol { margin: 8px 0 12px 20px; line-height: 1.8; }

.step-sidebar { display: flex; flex-direction: column; gap: 16px; }
.sidebar-card {
  background: var(--sf-white); border-radius: var(--radius);
  box-shadow: var(--shadow); padding: 16px;
}
.sidebar-card h4 { font-size: 13px; text-transform: uppercase; color: var(--sf-text-light); letter-spacing: 0.5px; margin-bottom: 12px; }
.sidebar-time { font-size: 22px; font-weight: 700; color: var(--sf-blue); }
.sidebar-topics li {
  list-style: none; padding: 6px 0 6px 10px;
  font-size: 14px; color: var(--sf-text-light);
  border-left: 3px solid transparent; cursor: pointer; transition: all 0.2s;
}
.sidebar-topics li.active { border-left-color: var(--sf-blue); color: var(--sf-blue); font-weight: 600; }
.sidebar-progress { font-size: 14px; text-align: center; }
.sidebar-progress-bar-track { background: var(--sf-gray-border); border-radius: 4px; height: 8px; margin: 8px 0; }
.sidebar-progress-bar-fill { background: var(--sf-blue); border-radius: 4px; height: 8px; transition: width 0.4s; }

.callout-box {
  background: var(--sf-yellow); border-left: 4px solid var(--sf-amber);
  border-radius: var(--radius); padding: 16px 20px; margin: 16px 0;
  display: flex; gap: 12px; align-items: flex-start;
}
.callout-box-icon { font-size: 20px; flex-shrink: 0; }
.callout-box-body { line-height: 1.6; }

.content-box {
  position: relative; background: var(--sf-gray-bg);
  border: 1px solid var(--sf-gray-border); border-radius: var(--radius);
  margin: 12px 0; overflow: hidden;
}
.content-box-header {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 6px 10px; background: #EBEBEB; border-bottom: 1px solid var(--sf-gray-border);
}
.content-box pre { padding: 16px; overflow-x: auto; max-height: 130px; transition: max-height 0.3s ease; font-size: 14px; line-height: 1.5; }
.content-box.expanded pre { max-height: none; }
.btn-copy, .btn-expand {
  font-size: 12px; padding: 3px 10px;
  border: 1px solid var(--sf-gray-border); border-radius: 3px;
  background: var(--sf-white); cursor: pointer; color: var(--sf-text-light);
}
.btn-copy:hover, .btn-expand:hover { background: var(--sf-blue); color: var(--sf-white); }

.practice-field { margin-bottom: 20px; }
.field-label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 15px; }
.field-label span { display: block; font-weight: 400; font-size: 13px; color: var(--sf-text-light); margin-top: 2px; }
.practice-field input[type="text"],
.practice-field textarea,
.practice-field select {
  width: 100%; padding: 10px 12px;
  border: 1px solid var(--sf-gray-border); border-radius: var(--radius);
  font-size: 15px; font-family: inherit; transition: border-color 0.2s; background: var(--sf-white);
}
.practice-field input:focus, .practice-field textarea:focus, .practice-field select:focus {
  outline: none; border-color: var(--sf-blue); box-shadow: 0 0 0 3px rgba(0,112,210,0.15);
}
.practice-field textarea { resize: vertical; min-height: 100px; }

.recap-box {
  background: #EEF4FF; border-radius: var(--radius);
  padding: 16px 20px; margin: 24px 0 12px;
  font-style: italic; line-height: 1.7; color: var(--sf-blue-dark);
}

.btn-primary, .btn-concluir {
  background: var(--sf-blue); color: var(--sf-white);
  border: none; border-radius: var(--radius);
  padding: 12px 28px; font-size: 16px; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
}
.btn-primary:hover, .btn-concluir:hover { background: var(--sf-blue-dark); }
.btn-concluir:disabled { background: var(--sf-gray-border); color: var(--sf-text-light); cursor: not-allowed; }
.btn-secondary {
  background: var(--sf-white); color: var(--sf-blue);
  border: 1px solid var(--sf-blue); border-radius: var(--radius);
  padding: 8px 20px; font-size: 14px; cursor: pointer; transition: all 0.2s;
}
.btn-secondary:hover { background: var(--sf-blue); color: var(--sf-white); }

#final-screen { display: flex; align-items: center; justify-content: center; padding: 40px 24px; }
.final-card {
  background: var(--sf-white); border-radius: var(--radius);
  box-shadow: var(--shadow); padding: 40px; max-width: 600px; width: 100%; text-align: center;
}
.final-card h1 { color: var(--sf-success); font-size: 28px; margin-bottom: 8px; }
.final-card .final-summary { text-align: left; background: var(--sf-gray-bg); border-radius: var(--radius); padding: 16px; margin: 24px 0; }
.final-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px; }

.numbered-steps { counter-reset: step-counter; list-style: none; margin: 12px 0 16px; }
.numbered-steps > li { counter-increment: step-counter; padding: 8px 0 8px 40px; position: relative; line-height: 1.6; }
.numbered-steps > li::before {
  content: counter(step-counter);
  position: absolute; left: 0; top: 8px;
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--sf-blue); color: var(--sf-white);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
}

.checklist { list-style: none; margin: 12px 0; }
.checklist li { padding: 8px 0; display: flex; align-items: flex-start; gap: 10px; line-height: 1.5; }
.checklist input[type="checkbox"] { width: 18px; height: 18px; flex-shrink: 0; cursor: pointer; accent-color: var(--sf-blue); }
```

- [ ] **Step 2: Verificar layout no browser**

Abrir `index.html`. Header fixo no topo com fundo branco. Fundo cinza claro na página. Sem erros de console.

- [ ] **Step 3: Commit**

```bash
git add css/workshop.css
git commit -m "feat: add Salesforce-themed CSS layout"
```

---

### Task 5: content/intro.js — Tela de boas-vindas

**Files:**
- Modify: `content/intro.js`

**Interfaces:**
- Consumes: `Session.setMeta()`, `Session.load()`, `Session.clear()`, `Journey.start()`
- Produces: `Intro.render()`, `Intro.submit(event)`

- [ ] **Step 1: Implementar intro.js**

```js
const Intro = (() => {
  function render() {
    const existing = Session.load();

    if (existing && existing.meta && existing.meta.participante) {
      document.getElementById('intro-content').innerHTML = `
        <div class="intro-card">
          <img src="assets/salesforce-logo.svg" alt="Salesforce" style="margin-bottom:24px">
          <h1>Bem-vindo de volta, ${existing.meta.participante}!</h1>
          <p>Encontramos uma sessão salva. Deseja continuar de onde parou?</p>
          <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
            <button class="btn-primary" onclick="Journey.start()">Continuar de onde parei</button>
            <button class="btn-secondary" onclick="Session.clear(); Intro.render()">Nova sessão</button>
          </div>
        </div>`;
      return;
    }

    document.getElementById('intro-content').innerHTML = `
      <div class="intro-card">
        <img src="assets/salesforce-logo.svg" alt="Salesforce" style="margin-bottom:24px">
        <h1>Agentforce Workshop</h1>
        <p>Guia prático de construção e curadoria conversacional para Agentforce.<br>
           Preencha seus dados para começar.</p>
        <form id="intro-form" onsubmit="Intro.submit(event)" novalidate>
          <div class="practice-field">
            <label class="field-label" for="intro-nome">Nome completo *</label>
            <input type="text" id="intro-nome" placeholder="Ex: Ana Costa" required>
          </div>
          <div class="practice-field">
            <label class="field-label" for="intro-empresa">Empresa *</label>
            <input type="text" id="intro-empresa" placeholder="Ex: Acme Corp" required>
          </div>
          <div class="practice-field">
            <label class="field-label" for="intro-area">Área *</label>
            <select id="intro-area" required>
              <option value="">Selecione...</option>
              <option value="Marketing">Marketing</option>
              <option value="Vendas">Vendas</option>
              <option value="Serviço">Serviço</option>
              <option value="Outra">Outra</option>
            </select>
          </div>
          <div class="practice-field">
            <label class="field-label" for="intro-caso">
              Caso de uso que você quer construir *
              <span>Descreva brevemente o agente que você tem em mente</span>
            </label>
            <textarea id="intro-caso" rows="4" placeholder="Ex: Agente de cobrança B2B para lembrar clientes sobre faturas em atraso" required></textarea>
          </div>
          <button type="submit" class="btn-primary">Começar workshop →</button>
        </form>
      </div>`;
  }

  function submit(e) {
    e.preventDefault();
    const nome = document.getElementById('intro-nome').value.trim();
    const empresa = document.getElementById('intro-empresa').value.trim();
    const area = document.getElementById('intro-area').value;
    const caso = document.getElementById('intro-caso').value.trim();
    if (!nome || !empresa || !area || !caso) { alert('Por favor, preencha todos os campos.'); return; }
    Session.setMeta({ participante: nome, empresa, area, caso_de_uso: caso });
    Journey.start();
  }

  return { render, submit };
})();
```

- [ ] **Step 2: Verificar no browser**

Preencher formulário → "Começar" → não vai avançar ainda (Journey vazio), sem erro de console.

- [ ] **Step 3: Commit**

```bash
git add content/intro.js
git commit -m "feat: add welcome screen with participant form"
```

---

### Task 6: journey.js — Controle de progresso e navegação

**Files:**
- Modify: `js/journey.js`

**Interfaces:**
- Consumes: `Session.*`, `ETAPAS` (objeto global `{ 1: etapaObj, ..., 9: etapaObj }` definido nas Tasks 7+), `Export.renderFinalScreen()`
- Produces: `Journey.start()`, `Journey.goTo(n)`, `Journey.concluir(n)`, `Journey.renderProgressBar()`
- `etapaObj` shape: `{ titulo, tempo, topicos: string[], campos: [{key, obrigatorio}], renderContent(etapaData) → htmlString }`

- [ ] **Step 1: Implementar journey.js**

```js
const Journey = (() => {
  const TOTAL = 9;

  function start() {
    const data = Session.getOrInit();
    const etapaAtual = data.progresso.etapa_atual || 1;
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('workshop-screen').style.display = '';
    document.getElementById('btn-save-progress').style.display = '';
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
        dot.onclick = () => goTo(i);
        dot.style.cursor = 'pointer';
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
      document.getElementById('step-content').innerHTML = `<p>Etapa ${n} em construção.</p>`;
      _renderSidebar(n, { titulo: `Etapa ${n}`, tempo: '—', topicos: [] });
      return;
    }

    const etapa = ETAPAS[n];
    const etapaData = Session.getEtapa(n);
    document.getElementById('step-content').innerHTML = etapa.renderContent(etapaData);
    _renderSidebar(n, etapa);
    _bindPracticeFields(n, etapa);
    _bindConcluirButton(n, etapa);
    _initSyntaxHighlight();
    _initContentBoxes();
    _initScrollSpy();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      el.addEventListener('input', () => {
        Session.setEtapaResposta(n, campo.key, el.value);
        _updateConcluirState(n, etapa);
      });
      const saved = Session.getEtapa(n).respostas[campo.key];
      if (saved) el.value = saved;
    });
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
    if (typeof hljs !== 'undefined') document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
  }

  function _initContentBoxes() {
    document.querySelectorAll('.content-box').forEach(box => {
      const btnCopy = box.querySelector('.btn-copy');
      const btnExpand = box.querySelector('.btn-expand');
      const pre = box.querySelector('pre');
      if (btnCopy) btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.textContent).then(() => {
          btnCopy.textContent = 'Copiado!';
          setTimeout(() => { btnCopy.textContent = 'Copiar'; }, 1500);
        });
      });
      if (btnExpand) btnExpand.addEventListener('click', () => {
        box.classList.toggle('expanded');
        btnExpand.textContent = box.classList.contains('expanded') ? 'Recolher' : 'Expandir';
      });
    });
  }

  function _initScrollSpy() {
    const headings = document.querySelectorAll('#step-content h2');
    const topics = document.querySelectorAll('#sidebar-topics li');
    if (!headings.length || !topics.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(headings).indexOf(entry.target);
          topics.forEach(t => t.classList.remove('active'));
          if (topics[idx]) topics[idx].classList.add('active');
        }
      });
    }, { threshold: 0.5 });
    headings.forEach(h => observer.observe(h));
  }

  document.addEventListener('DOMContentLoaded', () => Intro.render());

  return { start, goTo, concluir, renderProgressBar };
})();
```

- [ ] **Step 2: Verificar navegação no browser**

Preencher intro → "Começar" → tela do workshop deve aparecer com sidebar e 9 dots no header (dot 1 azul/ativo).

- [ ] **Step 3: Commit**

```bash
git add js/journey.js
git commit -m "feat: implement journey controller with progress tracking"
```

---

### Task 7: content/etapa-1.js até etapa-9.js — Conteúdo das etapas

**Files:**
- Modify: `content/etapa-1.js` through `content/etapa-9.js`

**Interfaces:**
- Produces: objeto global `ETAPAS` com chaves `1` a `9`, cada uma com shape `{ titulo, tempo, topicos, campos, renderContent(etapaData) → htmlString }`
- `campos` array: `[{ key: string, obrigatorio: boolean }]`
- `renderContent` deve retornar HTML com IDs `campo-<key>` para cada campo de prática e `btn-concluir-<n>` para o botão de conclusão

Padrão de cada arquivo (exemplo: etapa-1.js):
```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[1] = {
  titulo: 'Escrever livremente e gerar conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'descricao_livre_agente', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 1 — Escrever livremente e gerar conversa simulada</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Transformar a sua visão do agente em texto livre</li>
        <li>Usar IA para gerar a primeira simulação de conversa</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Não se preocupe com perfeição agora. O objetivo é externalizar o que você quer que o agente faça — a qualidade vem nas etapas seguintes.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>O primeiro passo para construir um agente Agentforce é descrever, em linguagem natural, o que ele deve fazer. Não existe formato certo — escreva como se estivesse explicando para um colega de trabalho. Quanto mais contexto você der, melhor será a conversa simulada gerada pela IA.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>A <strong>Force Recovery</strong> é uma empresa de recuperação de crédito B2B que atende pequenas e médias empresas. Seu time de cobrança enviou para a IA a seguinte descrição:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Quero um agente que aborde clientes com faturas em atraso de forma amigável. Ele deve se apresentar como assistente da Force Recovery, perguntar sobre o pagamento, oferecer opções de parcelamento (até 3x sem juros) e registrar a intenção de pagamento. O tom deve ser profissional mas humano, sem ser agressivo.</code></pre>
      </div>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-descricao_livre_agente">
            Descreva livremente o agente que você quer construir *
            <span>Escreva como se estivesse explicando para um colega. Inclua: o que o agente faz, para quem, qual o tom, quais informações coleta ou oferece.</span>
          </label>
          <textarea id="campo-descricao_livre_agente" rows="8" placeholder="Ex: Quero um agente que...">${r.descricao_livre_agente || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você transformou sua ideia em texto estruturado. Essa descrição livre é a semente do seu agente — nas próximas etapas ela se tornará uma conversa simulada, configurações técnicas e, finalmente, um agente funcionando no Agentforce.
      </div>
      <button class="btn-concluir" id="btn-concluir-1" disabled>Concluir Etapa 1 →</button>`;
  }
};
```

- [ ] **Step 1: Implementar etapa-1.js** conforme template acima (completo, com conteúdo real)

- [ ] **Step 2: Implementar etapa-2.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[2] = {
  titulo: 'Revisar e ajustar a conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_identificados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 2 — Revisar e ajustar a conversa simulada</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Analisar criticamente a conversa gerada pela IA</li>
        <li>Identificar lacunas, erros de tom e oportunidades de melhoria</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          A primeira conversa gerada raramente está pronta. O valor desta etapa está em você, que conhece o negócio, identificar o que a IA não sabia.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>Após gerar a conversa simulada, você precisa revisar com olhar crítico: o agente se apresentou corretamente? O tom estava adequado? Ele coletou as informações certas? Perguntou o que não deveria? Cada ajuste identificado agora evita dezenas de correções depois.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>O time da Force Recovery usou o seguinte prompt para revisão:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Revise a conversa acima e me diga: 1) O agente se apresentou de forma adequada? 2) O tom estava profissional e humano? 3) Ele ofereceu as opções de parcelamento corretamente? 4) Há alguma pergunta que não deveria ter sido feita? 5) O que mudaria para melhorar a experiência do cliente?</code></pre>
      </div>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_identificados">
            Quais ajustes você identificou na conversa simulada? *
            <span>Liste os pontos que precisam melhorar: tom, fluxo, informações, apresentação do agente, etc.</span>
          </label>
          <textarea id="campo-ajustes_identificados" rows="8" placeholder="Ex: 1) O agente não se apresentou pelo nome da empresa...">${r.ajustes_identificados || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você revisou a conversa com olhar de negócio. Os ajustes que identificou agora serão incorporados nas configurações do agente na próxima etapa, garantindo que ele reflita exatamente como sua empresa quer se comunicar.
      </div>
      <button class="btn-concluir" id="btn-concluir-2" disabled>Concluir Etapa 2 →</button>`;
  }
};
```

- [ ] **Step 3: Implementar etapa-3.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[3] = {
  titulo: 'Gerar as configurações do agente',
  tempo: '25 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Os 10 campos', 'Prática', 'Recap'],
  campos: [
    { key: 'agent_name', obrigatorio: true },
    { key: 'instructions', obrigatorio: true },
    { key: 'welcome_message', obrigatorio: true },
    { key: 'error_message', obrigatorio: false }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 3 — Gerar as configurações do agente</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Usar a conversa revisada para gerar os campos de configuração do Agentforce</li>
        <li>Entender os 10 campos principais do agente</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          As <strong>Instructions</strong> são o campo mais importante. É onde você define a personalidade, o escopo e as regras do agente. Invista tempo aqui.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>O Agentforce New Builder solicita 10 campos para configurar um agente. Você vai usar a IA para transformar sua descrição revisada em valores prontos para colar em cada campo.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para gerar as configurações:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base na conversa simulada e nos ajustes identificados, gere os valores para os 10 campos de configuração do Agentforce: Agent Name, Description, Instructions, Welcome Message, Error Message, Primary Language, Timezone, Max Session Duration, Topics, Actions. Use o contexto da Force Recovery.</code></pre>
      </div>
      <h2>Os 10 campos do Agentforce</h2>
      <ol>
        <li><strong>Agent Name</strong> — Nome do agente (ex: "Assistente Force Recovery")</li>
        <li><strong>Description</strong> — Descrição interna para identificação</li>
        <li><strong>Instructions</strong> — Personalidade, escopo e regras de comportamento</li>
        <li><strong>Welcome Message</strong> — Primeira mensagem ao iniciar conversa</li>
        <li><strong>Error Message</strong> — Mensagem quando o agente não consegue ajudar</li>
        <li><strong>Primary Language</strong> — Idioma principal</li>
        <li><strong>Timezone</strong> — Fuso horário</li>
        <li><strong>Max Session Duration</strong> — Tempo máximo de sessão</li>
        <li><strong>Topics</strong> — Tópicos que o agente pode abordar</li>
        <li><strong>Actions</strong> — Ações que o agente pode executar</li>
      </ol>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-agent_name">
            Agent Name *
            <span>Nome que aparecerá para os usuários</span>
          </label>
          <input type="text" id="campo-agent_name" placeholder="Ex: Assistente Acme" value="${r.agent_name || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-instructions">
            Instructions *
            <span>Cole aqui o texto de instruções gerado pela IA</span>
          </label>
          <textarea id="campo-instructions" rows="10" placeholder="Ex: Você é o assistente virtual da Acme Corp...">${r.instructions || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-welcome_message">
            Welcome Message *
            <span>Primeira mensagem que o agente envia ao iniciar uma conversa</span>
          </label>
          <textarea id="campo-welcome_message" rows="3" placeholder="Ex: Olá! Sou o assistente da Acme Corp...">${r.welcome_message || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-error_message">
            Error Message
            <span>Mensagem quando o agente não consegue ajudar (opcional)</span>
          </label>
          <textarea id="campo-error_message" rows="3" placeholder="Ex: Desculpe, não consegui ajudar com isso...">${r.error_message || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você tem agora os campos principais preenchidos. Na próxima etapa, você os inserirá no Agentforce New Builder e realizará os primeiros testes reais.
      </div>
      <button class="btn-concluir" id="btn-concluir-3" disabled>Concluir Etapa 3 →</button>`;
  }
};
```

- [ ] **Step 4: Implementar etapa-4.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[4] = {
  titulo: 'Configurar, salvar e realizar os primeiros testes',
  tempo: '30 min',
  topicos: ['Objetivos', 'Teoria', 'Passo a passo', 'Prática', 'Recap'],
  campos: [{ key: 'oportunidades_melhoria', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 4 — Configurar, salvar e realizar os primeiros testes</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Inserir as configurações no Agentforce New Builder</li>
        <li>Publicar o agente e realizar primeiros testes reais</li>
        <li>Registrar oportunidades de melhoria identificadas nos testes</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Teste com pelo menos 5 conversas diferentes antes de registrar suas observações. Inclua casos de sucesso e casos onde o usuário faz perguntas inesperadas.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>Com as configurações em mãos, é hora de inserir no Agentforce New Builder. O processo leva cerca de 10 minutos e resulta em um agente funcional para testes iniciais.</p>
      <h2>Passo a passo — Agentforce New Builder</h2>
      <ol class="numbered-steps">
        <li>Acesse o <strong>Agentforce New Builder</strong> no Setup do Salesforce</li>
        <li>Clique em <strong>New Agent</strong></li>
        <li>Cole os valores dos campos que você preparou na Etapa 3</li>
        <li>Clique em <strong>Save</strong></li>
        <li>Clique em <strong>Activate</strong> para publicar o agente</li>
        <li>Use o <strong>Preview</strong> para iniciar conversas de teste</li>
        <li>Anote as oportunidades de melhoria observadas</li>
      </ol>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-oportunidades_melhoria">
            Oportunidades de melhoria identificadas nos testes *
            <span>Para cada problema encontrado, registre: o que aconteceu, em qual contexto, qual seria o comportamento ideal. Use pelo menos 3 linhas.</span>
          </label>
          <textarea id="campo-oportunidades_melhoria" rows="10" placeholder="Problema 1: O agente não reconheceu quando o cliente disse 'pode parcelar?'&#10;Contexto: Pergunta informal sobre parcelamento&#10;Ideal: Agente deveria identificar a intenção e oferecer as opções&#10;&#10;Problema 2:...">${r.oportunidades_melhoria || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você tem um agente funcionando e uma lista de melhorias. Esse é o ciclo central do Agentforce: configurar, testar, melhorar. As próximas etapas aprofundam esse ciclo com métodos estruturados.
      </div>
      <button class="btn-concluir" id="btn-concluir-4" disabled>Concluir Etapa 4 →</button>`;
  }
};
```

- [ ] **Step 5: Implementar etapa-5.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[5] = {
  titulo: 'Primeiro ciclo de ajustes',
  tempo: '25 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_aplicados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 5 — Primeiro ciclo de ajustes</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Transformar as oportunidades de melhoria em ajustes concretos nas Instructions</li>
        <li>Usar IA para reescrever seções específicas das Instructions</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Faça um ajuste de cada vez e teste após cada mudança. Ajustes em lote dificultam identificar o que funcionou.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>O primeiro ciclo de ajustes transforma observações brutas em melhorias precisas nas Instructions. A chave é ser específico: ao invés de "melhorar o tom", indique exatamente em qual parte da Instructions o tom deve mudar e como.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para o primeiro ajuste:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Nas Instructions abaixo, ajuste apenas o trecho que trata de parcelamento. O agente deve reconhecer variações informais da pergunta ("pode parcelar?", "tem como dividir?", "parcel") e responder com as três opções disponíveis. Mantenha o restante das Instructions inalterado.

[Cole suas Instructions aqui]</code></pre>
      </div>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_aplicados">
            Quais ajustes você aplicou e qual foi o resultado? *
            <span>Para cada ajuste: o problema original, a mudança feita nas Instructions, e se o problema foi resolvido nos testes seguintes.</span>
          </label>
          <textarea id="campo-ajustes_aplicados" rows="10" placeholder="Ajuste 1:&#10;Problema: Agente não reconhecia variações informais de parcelamento&#10;Mudança: Adicionei exemplos de variações nas Instructions&#10;Resultado: Agente passou a reconhecer corretamente&#10;&#10;Ajuste 2:...">${r.ajustes_aplicados || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você completou o primeiro ciclo de ajuste. A qualidade do agente melhora exponencialmente com ciclos repetidos — a próxima etapa formaliza esse processo em um método estruturado chamado Curadoria Conversacional.
      </div>
      <button class="btn-concluir" id="btn-concluir-5" disabled>Concluir Etapa 5 →</button>`;
  }
};
```

- [ ] **Step 6: Implementar etapa-6.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[6] = {
  titulo: 'Ciclo de Curadoria Conversacional',
  tempo: '30 min',
  topicos: ['Objetivos', 'Teoria', 'Os 6 passos', 'Prática', 'Recap'],
  campos: [
    { key: 'ciclos_realizados', obrigatorio: true },
    { key: 'observacoes_ciclos', obrigatorio: true }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 6 — Ciclo de Curadoria Conversacional</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Aplicar o método de 6 passos de Curadoria Conversacional</li>
        <li>Realizar pelo menos 2 ciclos completos</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Curadoria Conversacional não é sobre perfeição — é sobre evolução contínua. Um agente com 3 ciclos completos é significativamente melhor que um com configuração inicial.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>A Curadoria Conversacional é o processo sistemático de melhorar um agente através de ciclos estruturados de observação, análise e ajuste. Cada ciclo leva de 20 a 40 minutos e produz uma versão mensurável melhor do agente.</p>
      <h2>Os 6 passos do ciclo</h2>
      <ul class="checklist">
        <li><input type="checkbox"> <span><strong>1. Coleta:</strong> Realize 10 conversas de teste com perfis de usuário diferentes</span></li>
        <li><input type="checkbox"> <span><strong>2. Análise:</strong> Classifique cada conversa como ✅ sucesso, ⚠️ parcial ou ❌ falha</span></li>
        <li><input type="checkbox"> <span><strong>3. Padrão:</strong> Identifique o padrão mais frequente de falha</span></li>
        <li><input type="checkbox"> <span><strong>4. Hipótese:</strong> Formule uma hipótese de causa: "O agente falha porque..."</span></li>
        <li><input type="checkbox"> <span><strong>5. Ajuste:</strong> Faça apenas um ajuste nas Instructions para testar a hipótese</span></li>
        <li><input type="checkbox"> <span><strong>6. Validação:</strong> Repita as conversas que falharam e verifique se o ajuste resolveu</span></li>
      </ul>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ciclos_realizados">
            Quantos ciclos completos você realizou? *
          </label>
          <input type="text" id="campo-ciclos_realizados" placeholder="Ex: 2" value="${r.ciclos_realizados || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_ciclos">
            Observações por ciclo *
            <span>Para cada ciclo: padrão identificado, hipótese, ajuste feito, resultado.</span>
          </label>
          <textarea id="campo-observacoes_ciclos" rows="12" placeholder="Ciclo 1:&#10;Padrão: Agente não lidava bem com clientes que negavam a dívida&#10;Hipótese: Instructions não cobriam o cenário de negação&#10;Ajuste: Adicionei instrução sobre como responder à negação&#10;Resultado: 8/10 conversas passaram a terminar com registro de intenção&#10;&#10;Ciclo 2:...">${r.observacoes_ciclos || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você dominou o método de Curadoria Conversacional. Com ele, qualquer pessoa de negócio pode evoluir um agente de forma estruturada e mensurável, sem depender de suporte técnico.
      </div>
      <button class="btn-concluir" id="btn-concluir-6" disabled>Concluir Etapa 6 →</button>`;
  }
};
```

- [ ] **Step 7: Implementar etapa-7.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[7] = {
  titulo: 'Marcação de dados a capturar',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'dados_marcados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 7 — Marcação de dados a capturar</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Identificar quais dados o agente deve capturar durante as conversas</li>
        <li>Marcar esses dados nas Instructions para guiar o time técnico</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Dados não marcados nas Instructions raramente são implementados corretamente na fase técnica. Seja específico: nome do campo, tipo de dado, quando capturar.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>Para que o agente grave informações no Salesforce (contatos, oportunidades, casos), o time técnico precisa saber exatamente quais dados capturar, em qual objeto e em qual momento da conversa. A marcação nas Instructions é a ponte entre a curadoria de negócio e a implementação técnica.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>Trecho de Instructions com marcação de dados:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Quando o cliente confirmar intenção de pagamento:
[CAPTURAR: Contact.Payment_Intent__c = "confirmed" | Tipo: Picklist | Quando: ao dizer "vou pagar" ou equivalente]
[CAPTURAR: Contact.Payment_Date_Promise__c = data mencionada | Tipo: Date | Quando: cliente mencionar data]
[CAPTURAR: Case.Resolution_Notes__c = resumo da conversa | Tipo: Text Area | Quando: encerrar sessão]</code></pre>
      </div>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-dados_marcados">
            Cole aqui suas Instructions com as marcações de dados *
            <span>Use o formato [CAPTURAR: Objeto.Campo = valor | Tipo | Quando] para cada dado que o agente deve registrar no Salesforce.</span>
          </label>
          <textarea id="campo-dados_marcados" rows="12" placeholder="[Cole suas Instructions e adicione as marcações de dados]">${r.dados_marcados || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        As marcações de dados transformam as Instructions em um documento técnico completo. Na próxima etapa, você vai usar essas instruções enriquecidas para gerar o pacote técnico de implementação.
      </div>
      <button class="btn-concluir" id="btn-concluir-7" disabled>Concluir Etapa 7 →</button>`;
  }
};
```

- [ ] **Step 8: Implementar etapa-8.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[8] = {
  titulo: 'Transição para Implementação Técnica',
  tempo: '25 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'yaml_agente', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 8 — Transição para Implementação Técnica</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Gerar o pacote YAML do agente a partir das Instructions enriquecidas</li>
        <li>Entender o que o time técnico receberá para implementação</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          O YAML gerado aqui é um artefato técnico — não tente editar manualmente. Seu papel é validar se o conteúdo reflete suas intenções de negócio antes de entregar ao time técnico.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>O pacote de transição técnica é o documento que o time de Salesforce developers receberá para implementar o agente de forma completa: Flows, Apex actions, integrações de dados e configurações de deploy. Você gera esse pacote usando IA com base em tudo que foi construído nas etapas anteriores.</p>
      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para gerar o pacote técnico:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base nas Instructions e marcações de dados abaixo, gere um pacote YAML de implementação técnica para Agentforce, incluindo: agent configuration, topics, actions necessárias, campos a capturar com objeto e tipo Salesforce, e fluxo de conversa simplificado.

[Cole suas Instructions com marcações aqui]</code></pre>
      </div>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-yaml_agente">
            Cole aqui o YAML gerado para o seu agente *
            <span>Use o prompt acima com suas Instructions e cole o resultado aqui.</span>
          </label>
          <textarea id="campo-yaml_agente" rows="15" placeholder="# Agent Configuration&#10;agent:&#10;  name: Meu Agente&#10;  ...">${r.yaml_agente || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Você criou o artefato de transição entre negócio e tecnologia. O YAML encapsula toda a sua curadoria em um formato que o time técnico pode implementar diretamente no Salesforce.
      </div>
      <button class="btn-concluir" id="btn-concluir-8" disabled>Concluir Etapa 8 →</button>`;
  }
};
```

- [ ] **Step 9: Implementar etapa-9.js**

```js
if (typeof ETAPAS === 'undefined') window.ETAPAS = {};
ETAPAS[9] = {
  titulo: 'Teste funcional final',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Checklist de validação', 'Prática', 'Recap'],
  campos: [
    { key: 'checklist_validacao', obrigatorio: false },
    { key: 'observacoes_finais', obrigatorio: true }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    const checks = r.checklist_validacao ? JSON.parse(r.checklist_validacao) : {};
    return `
      <h1>Etapa 9 — Teste funcional final</h1>
      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Validar o agente contra o checklist de qualidade final</li>
        <li>Documentar o estado final para entrega ao time técnico</li>
      </ul>
      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          Só entregue o agente ao time técnico após todos os 6 itens do checklist estarem marcados. Uma entrega prematura gera retrabalho técnico custoso.
        </div>
      </div>
      <h2>Teoria</h2>
      <p>O teste funcional final é a validação formal antes da implementação técnica. Ele garante que o agente atinge os requisitos mínimos de qualidade em todas as dimensões que importam para o usuário final.</p>
      <h2>Checklist de validação final</h2>
      <ul class="checklist" id="checklist-validacao">
        ${[
          'O agente se apresenta corretamente e com o tom adequado',
          'O agente lida com respostas inesperadas sem travar ou dar erro',
          'Todos os dados a capturar estão sendo coletados corretamente',
          'O agente encerra a conversa de forma satisfatória',
          'O Welcome Message está correto e acolhedor',
          'O Error Message está ativo e direciona o usuário adequadamente'
        ].map((item, i) => `
          <li>
            <input type="checkbox" id="check-${i}" ${checks[i] ? 'checked' : ''}
              onchange="(() => {
                const data = Session.getEtapa(9);
                const c = data.respostas.checklist_validacao ? JSON.parse(data.respostas.checklist_validacao) : {};
                c[${i}] = document.getElementById('check-${i}').checked;
                Session.setEtapaResposta(9, 'checklist_validacao', JSON.stringify(c));
              })()">
            <span>${item}</span>
          </li>`).join('')}
      </ul>
      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_finais">
            Observações finais e próximos passos *
            <span>Registre o estado final do agente, pontos de atenção para o time técnico e qualquer contexto adicional.</span>
          </label>
          <textarea id="campo-observacoes_finais" rows="8" placeholder="Estado atual: O agente está pronto para implementação técnica.&#10;&#10;Pontos de atenção:&#10;- O campo Payment_Date_Promise__c é crítico e deve ser testado primeiro&#10;...">${r.observacoes_finais || ''}</textarea>
        </div>
      </div>
      <h2>Recap</h2>
      <div class="recap-box">
        Parabéns! Você completou o workshop de construção e curadoria conversacional do Agentforce. Seu agente está documentado, testado e pronto para ser implementado pelo time técnico com total clareza de intenção de negócio.
      </div>
      <button class="btn-concluir" id="btn-concluir-9" disabled>Concluir Workshop →</button>`;
  }
};
```

- [ ] **Step 10: Verificar todas as etapas no browser**

Navegar pelas 9 etapas preenchendo os campos obrigatórios. Verificar: botão "Concluir" desabilitado até preencher campos, bolinhas do header preenchem ao concluir, navegação entre etapas sem erros de console.

- [ ] **Step 11: Commit**

```bash
git add content/etapa-1.js content/etapa-2.js content/etapa-3.js content/etapa-4.js content/etapa-5.js content/etapa-6.js content/etapa-7.js content/etapa-8.js content/etapa-9.js
git commit -m "feat: add all 9 step content modules"
```

---

### Task 8: js/export.js — Geração de PDF e MD

**Files:**
- Modify: `js/export.js`

**Interfaces:**
- Consumes: `Session.getOrInit()`, `jsPDF` (global CDN), `html2canvas` (global CDN)
- Produces: `Export.renderFinalScreen()`, `Export.downloadMD()`, `Export.downloadPDF()`

- [ ] **Step 1: Implementar export.js**

```js
const Export = (() => {
  function renderFinalScreen() {
    const data = Session.getOrInit();
    const { participante, empresa, area, caso_de_uso, data_inicio } = data.meta;
    const concluidas = data.progresso.etapas_concluidas || [];
    const dataFormatada = data_inicio ? data_inicio.split('T')[0] : '—';

    document.getElementById('final-content').innerHTML = `
      <div class="final-card">
        <h1>🎉 Parabéns, ${participante}!</h1>
        <p>Você concluiu o Agentforce Workshop com sucesso.</p>
        <div class="final-summary">
          <p><strong>Participante:</strong> ${participante}</p>
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Área:</strong> ${area}</p>
          <p><strong>Caso de uso:</strong> ${caso_de_uso}</p>
          <p><strong>Data de início:</strong> ${dataFormatada}</p>
          <p><strong>Etapas concluídas:</strong> ${concluidas.length}/9</p>
        </div>
        <div class="final-actions">
          <button class="btn-primary" onclick="Export.downloadPDF()">⬇ Baixar PDF</button>
          <button class="btn-primary" onclick="Export.downloadMD()">⬇ Baixar MD</button>
          <button class="btn-secondary" onclick="Session.exportJSON()">Exportar session.json</button>
        </div>
      </div>`;
  }

  function _buildMDContent() {
    const data = Session.getOrInit();
    const { participante, empresa, area, caso_de_uso, data_inicio } = data.meta;
    const dataFormatada = data_inicio ? data_inicio.split('T')[0] : '—';

    const titulos = {
      1: 'Escrever livremente e gerar conversa simulada',
      2: 'Revisar e ajustar a conversa simulada',
      3: 'Gerar as configurações do agente',
      4: 'Configurar, salvar e realizar os primeiros testes',
      5: 'Primeiro ciclo de ajustes',
      6: 'Ciclo de Curadoria Conversacional',
      7: 'Marcação de dados a capturar',
      8: 'Transição para Implementação Técnica',
      9: 'Teste funcional final'
    };

    let md = `# Agentforce Workshop — ${empresa} — ${dataFormatada}\n\n`;
    md += `## Participante\n`;
    md += `- **Nome:** ${participante}\n`;
    md += `- **Empresa:** ${empresa}\n`;
    md += `- **Área:** ${area}\n`;
    md += `- **Caso de uso:** ${caso_de_uso}\n\n`;

    for (let i = 1; i <= 9; i++) {
      md += `## Etapa ${i} — ${titulos[i]}\n`;
      const etapa = data.etapas[i];
      if (!etapa || !etapa.respostas) { md += `_Não concluída_\n\n`; continue; }
      Object.entries(etapa.respostas).forEach(([key, value]) => {
        if (value && value.trim()) {
          md += `### ${key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n`;
          md += `${value}\n\n`;
        }
      });
    }
    return md;
  }

  function downloadMD() {
    const data = Session.getOrInit();
    const nome = (data.meta.participante || 'workshop').replace(/\s+/g, '-');
    const dataStr = (data.meta.data_inicio || '').split('T')[0] || 'sem-data';
    const md = _buildMDContent();
    const blob = new Blob([md], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `workshop-${nome}-${dataStr}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function downloadPDF() {
    const data = Session.getOrInit();
    const nome = (data.meta.participante || 'workshop').replace(/\s+/g, '-');
    const dataStr = (data.meta.data_inicio || '').split('T')[0] || 'sem-data';
    const md = _buildMDContent();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    doc.setFillColor(0, 112, 210);
    doc.rect(0, 0, pageWidth, 14, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text('Agentforce Workshop', margin, 9);

    y = 22;
    doc.setTextColor(0, 0, 0);

    const lines = md.split('\n');
    lines.forEach(line => {
      if (y > 275) { doc.addPage(); y = 20; }
      if (line.startsWith('# ')) {
        doc.setFontSize(16); doc.setFont(undefined, 'bold');
        const split = doc.splitTextToSize(line.replace('# ', ''), maxWidth);
        doc.text(split, margin, y); y += split.length * 8 + 4;
      } else if (line.startsWith('## ')) {
        doc.setFontSize(13); doc.setFont(undefined, 'bold');
        const split = doc.splitTextToSize(line.replace('## ', ''), maxWidth);
        doc.text(split, margin, y); y += split.length * 7 + 3;
      } else if (line.startsWith('### ')) {
        doc.setFontSize(11); doc.setFont(undefined, 'bold');
        const split = doc.splitTextToSize(line.replace('### ', ''), maxWidth);
        doc.text(split, margin, y); y += split.length * 6 + 2;
      } else if (line.startsWith('- ')) {
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        const split = doc.splitTextToSize(line, maxWidth - 4);
        doc.text(split, margin + 4, y); y += split.length * 5.5 + 1;
      } else if (line.trim()) {
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        const split = doc.splitTextToSize(line, maxWidth);
        doc.text(split, margin, y); y += split.length * 5.5 + 1;
      } else {
        y += 3;
      }
    });

    doc.save(`workshop-${nome}-${dataStr}.pdf`);
  }

  return { renderFinalScreen, downloadMD, downloadPDF };
})();
```

- [ ] **Step 2: Testar geração de artefatos**

Completar todas as 9 etapas (ou simular via console: `Session.concluirEtapa(1)` ... `Session.concluirEtapa(9); Journey.concluir(9)`). Na tela final: clicar "Baixar MD" → arquivo `.md` deve baixar com conteúdo das respostas. Clicar "Baixar PDF" → arquivo `.pdf` deve abrir/baixar.

- [ ] **Step 3: Commit**

```bash
git add js/export.js
git commit -m "feat: implement MD and PDF export"
```

---

### Task 9: content/templates/report.md e git/GitHub Pages

**Files:**
- Modify: `content/templates/report.md`
- Create: `.github/workflows/pages.yml` (opcional — GitHub Pages pode ser configurado via Settings sem workflow)
- Create: `README.md` (apenas para o repositório, não exibido na app)

**Interfaces:**
- Produces: repositório publicado em `https://<usuario>.github.io/agentforce-workshop-ax/`

- [ ] **Step 1: Escrever content/templates/report.md**

```markdown
# Agentforce Workshop — {{empresa}} — {{data}}

## Participante
- **Nome:** {{participante}}
- **Empresa:** {{empresa}}
- **Área:** {{area}}
- **Caso de uso:** {{caso_de_uso}}

## Etapa 1 — Escrever livremente e gerar conversa simulada
### Descrição livre do agente
{{etapa_1_descricao_livre_agente}}

## Etapa 2 — Revisar e ajustar a conversa simulada
### Ajustes identificados
{{etapa_2_ajustes_identificados}}

## Etapa 3 — Gerar as configurações do agente
### Agent Name
{{etapa_3_agent_name}}
### Instructions
{{etapa_3_instructions}}
### Welcome Message
{{etapa_3_welcome_message}}

## Etapa 4 — Configurar e realizar primeiros testes
### Oportunidades de melhoria
{{etapa_4_oportunidades_melhoria}}

## Etapa 5 — Primeiro ciclo de ajustes
### Ajustes aplicados
{{etapa_5_ajustes_aplicados}}

## Etapa 6 — Ciclo de Curadoria Conversacional
### Ciclos realizados
{{etapa_6_ciclos_realizados}}
### Observações por ciclo
{{etapa_6_observacoes_ciclos}}

## Etapa 7 — Marcação de dados a capturar
### Instructions com marcações
{{etapa_7_dados_marcados}}

## Etapa 8 — Transição para Implementação Técnica
### YAML do agente
{{etapa_8_yaml_agente}}

## Etapa 9 — Teste funcional final
### Observações finais
{{etapa_9_observacoes_finais}}
```

- [ ] **Step 2: Inicializar repositório git**

```bash
git init
git add -A
git commit -m "chore: initial commit — Agentforce Workshop"
```

- [ ] **Step 3: Criar repositório no GitHub e publicar**

```bash
gh repo create agentforce-workshop-ax --public --source=. --remote=origin --push
```

- [ ] **Step 4: Habilitar GitHub Pages**

```bash
gh api repos/:owner/agentforce-workshop-ax/pages \
  --method POST \
  -f source.branch=main \
  -f source.path=/
```

Ou via interface: Settings → Pages → Source: `main` branch, `/ (root)`.

- [ ] **Step 5: Verificar URL publicada**

Aguardar ~2 minutos. Abrir `https://<usuario>.github.io/agentforce-workshop-ax/`. Workshop deve carregar com formulário de boas-vindas.

- [ ] **Step 6: Commit final**

```bash
git add content/templates/report.md
git commit -m "chore: add report template and finalize project"
git push
```

---

## Checklist de Spec Coverage

- [x] 9 etapas progressivas com desbloqueio sequencial → Tasks 6 e 7
- [x] Layout duas colunas estilo Trailhead → Task 4
- [x] Callout box amarela por etapa → Task 7 (cada etapa)
- [x] Content box copiável com Expandir/Recolher → Task 6 (`_initContentBoxes`)
- [x] Campos de prática com auto-save → Tasks 6 (`_bindPracticeFields`) e 2 (`session.js`)
- [x] Sidebar com scroll-spy → Task 6 (`_initScrollSpy`)
- [x] Barra de progresso global no header → Task 6 (`renderProgressBar`)
- [x] Tela de boas-vindas com coleta de dados → Task 5
- [x] Retomada de sessão → Task 5 (Intro verifica session existente)
- [x] Artefato MD → Task 8
- [x] Artefato PDF → Task 8
- [x] Exportar session.json → Tasks 2 e 8
- [x] GitHub Pages → Task 9
- [x] Exemplo Force Recovery em todas as etapas → Task 7
- [x] Idioma PT-BR → global constraints + Task 7
