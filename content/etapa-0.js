if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[0] = {
  titulo: 'Antes de Começarmos',
  tempo: '5–7 min',
  topicos: ['Trailhead', 'Playground', 'Pré-requisitos', 'Seus dados'],
  renderContent() {
    return `
        <h1>Etapa 0 — Antes de Começarmos</h1>

        <p>Antes de entrar no workshop, você precisa ter um ambiente Salesforce funcional com o Agentforce habilitado:</p>

        <h2 id="etapa0-passo1">1. Crie sua conta no Trailhead</h2>
        <p>O Trailhead é a plataforma de aprendizado gratuita da Salesforce. Você vai usá-la para criar um Playground — um org Salesforce gratuito para treinar.</p>
        <a href="https://trailhead.salesforce.com/" target="_blank" rel="noopener" class="trailhead-link">
          Criar conta no Trailhead →
        </a>

        <h2 id="etapa0-passo2">2. Crie e configure seu Playground</h2>

        <div class="callout-box" style="margin-bottom:16px">
          <span class="callout-box-icon">⚠️</span>
          <div class="callout-box-body">
            <strong>Esse workshop usará um Agentforce Builder Playground personalizado(a).</strong><br>
            O playground ficará ativo por 7 dias após sua criação. Use-o como ambiente de aprendizado e exporte as configuração feitas em uma org Salesforce.
          </div>
        </div>

        <a href="https://trailhead.salesforce.com/pt-BR/content/learn/modules/quick-start-assemble-a-service-agent-with-agentforce-builder/learn-about-agentforce-builder?trail_id=become-an-agentblazer-champion-2026" target="_blank" rel="noopener" class="trailhead-link">
          Módulo Trailhead: Quick Start — Agentforce Builder →
        </a>

        <h3>Inscrever-se em uma organização Developer Edition com Agentforce Studio</h3>
        <p>Para concluir este projeto, você precisa de um Playground personalizado que contenha o Agentforce Studio e nossos dados de amostra.</p>
        <ul class="checklist">
          <li>
            <input type="checkbox" id="step-pg-1">
            <span>Clique em <strong>Create Playground (Criar Playground)</strong> e clique em <strong>Yes, Create Playground (Sim, Criar Playground)</strong>.</span>
          </li>
          <li>
            <input type="checkbox" id="step-pg-2">
            <span>Sua nova organização é automaticamente associada à sua conta do Trailhead.</span>
          </li>
          <li>
            <input type="checkbox" id="step-pg-3">
            <span>Anote a data de expiração de sua organização e conclua este emblema antes dessa data.</span>
          </li>
          <li>
            <input type="checkbox" id="step-pg-4">
            <span>Clique em <strong>Launch (Iniciar)</strong> para abrir o Playground.</span>
          </li>
        </ul>

        <h3>Habilitar o Agentforce e publicar o site do Experience Cloud</h3>
        <p>A primeira etapa da criação de um agente é ativar o recurso exigido da organização.</p>
        <ul class="checklist">
          <li>
            <input type="checkbox" id="step-af-1">
            <span>Clique em <strong>⚙ (ícone de configuração)</strong> e em <strong>Setup (Configuração)</strong>. A página Configuração abre em uma nova guia.</span>
          </li>
          <li>
            <input type="checkbox" id="step-af-2">
            <span>Em Setup, na caixa <strong>Quick Find (Busca rápida)</strong>, procure e selecione <strong>Salesforce Go</strong>.</span>
          </li>
          <li>
            <input type="checkbox" id="step-af-3">
            <span>Na caixa <strong>Search features...</strong>, insira e selecione <strong>Agentforce Studio</strong>.</span>
          </li>
          <li>
            <input type="checkbox" id="step-af-4">
            <span>Clique em <strong>Get Started (Começar a usar)</strong>.</span>
          </li>
          <li>
            <input type="checkbox" id="step-af-5">
            <span>Clique em <strong>Turn On (Habilitar)</strong>.</span>
          </li>
          <li>
            <input type="checkbox" id="step-af-6">
            <span>Clique em <strong>Turn On (Habilitar)</strong> na janela de confirmação.</span>
          </li>
        </ul>

        <h2 id="etapa0-passo3">3. Confirme os pré-requisitos</h2>
        <p>Marque cada item abaixo quando estiver concluído. O botão de avanço só será liberado quando todos estiverem marcados.</p>

        <ul class="checklist" id="checklist-prereq">
          <li>
            <input type="checkbox" id="prereq-0" onchange="Etapa0.updateButton()">
            <span>Tenho uma conta ativa no Trailhead</span>
          </li>
          <li>
            <input type="checkbox" id="prereq-1" onchange="Etapa0.updateButton()">
            <span>Criei meu Playground e consigo acessá-lo pelo Trailhead</span>
          </li>
          <li>
            <input type="checkbox" id="prereq-2" onchange="Etapa0.updateButton()">
            <span>O Agentforce Studio está habilitado no meu Playground</span>
          </li>
        </ul>

        <button class="btn-concluir" id="btn-concluir-0" disabled onclick="Etapa0.concluir()">
          Estou pronto, vamos começar →
        </button>`;
  }
};

const Etapa0 = (() => {
  function updateButton() {
    const btn = document.getElementById('btn-concluir-0');
    if (!btn) return;
    const p0 = document.getElementById('prereq-0');
    const p1 = document.getElementById('prereq-1');
    const p2 = document.getElementById('prereq-2');
    if (!p0 || !p1 || !p2) return;
    btn.disabled = !(p0.checked && p1.checked && p2.checked);
  }

  function concluir() {
    Session.concluirEtapa0();
    Journey.start();
  }

  return { updateButton, concluir };
})();
