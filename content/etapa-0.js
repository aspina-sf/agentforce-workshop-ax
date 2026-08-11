if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[0] = {
  titulo: 'Antes de Começarmos',
  renderContent() {
    return `
      <h1>Etapa 0 — Antes de Começarmos</h1>

      <p>Antes de entrar no workshop, você precisa ter um ambiente Salesforce funcional com o Agentforce habilitado. Siga os passos abaixo — leva cerca de 15 minutos.</p>

      <h2>1. Crie sua conta no Trailhead</h2>
      <p>O Trailhead é a plataforma de aprendizado gratuita da Salesforce. Você vai usá-la para criar um Playground — um org Salesforce gratuito para treinar.</p>
      <a href="https://trailhead.salesforce.com/pt-BR/signup" target="_blank" rel="noopener" class="trailhead-link">
        Criar conta no Trailhead →
      </a>

      <h2>2. Complete o módulo e configure seu Playground</h2>
      <p>Acesse o módulo abaixo e siga as instruções para criar e configurar seu Playground com o Agentforce Builder habilitado:</p>
      <a href="https://trailhead.salesforce.com/pt-BR/content/learn/modules/quick-start-assemble-a-service-agent-with-agentforce-builder/learn-about-agentforce-builder?trail_id=become-an-agentblazer-champion-2026" target="_blank" rel="noopener" class="trailhead-link">
        Módulo: Quick Start — Agentforce Builder →
      </a>

      <h2>3. Confirme os pré-requisitos</h2>
      <p>Marque cada item abaixo quando estiver concluído. O botão de avanço só será liberado quando todos estiverem marcados.</p>

      <ul class="checklist" id="checklist-prereq">
        <li>
          <input type="checkbox" id="prereq-0" onchange="Etapa0.updateButton()">
          <span>Tenho uma conta ativa no Trailhead</span>
        </li>
        <li>
          <input type="checkbox" id="prereq-1" onchange="Etapa0.updateButton()">
          <span>Completei o módulo e tenho um Playground Salesforce configurado</span>
        </li>
        <li>
          <input type="checkbox" id="prereq-2" onchange="Etapa0.updateButton()">
          <span>Consigo acessar o Agentforce Studio no Setup do meu org</span>
        </li>
      </ul>

      <h2>4. Seus dados</h2>
      <p>Preencha seu email para que o facilitador possa acompanhar sua evolução no workshop.</p>

      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="etapa0-email">
            Email *
            <span>Usado apenas para envio do seu relatório ao facilitador, se você autorizar.</span>
          </label>
          <input type="email" id="etapa0-email" placeholder="seu@email.com" oninput="Etapa0.updateButton()">
        </div>

        <div class="optin-field">
          <label class="optin-label">
            <input type="checkbox" id="etapa0-optin" onchange="Etapa0.updateButton()">
            <span>Autorizo o envio do meu relatório de workshop ao facilitador ao concluir todas as etapas.</span>
          </label>
        </div>
      </div>

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
    const email = document.getElementById('etapa0-email');
    if (!p0 || !p1 || !p2 || !email) return;
    const allChecked = p0.checked && p1.checked && p2.checked;
    const emailValid = email.value.trim().includes('@');
    btn.disabled = !(allChecked && emailValid);
  }

  function concluir() {
    const email = document.getElementById('etapa0-email').value.trim();
    const optin = document.getElementById('etapa0-optin').checked;
    Session.concluirEtapa0(email, optin);
    Journey.start();
  }

  return { updateButton, concluir };
})();
