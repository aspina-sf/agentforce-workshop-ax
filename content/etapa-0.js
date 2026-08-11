if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[0] = {
  titulo: 'Antes de Começarmos',
  renderContent() {
    return `
      <div class="etapa0-card">
        <h1>Etapa 0 — Antes de Começarmos</h1>

        <p>Antes de entrar no workshop, você precisa ter um ambiente Salesforce funcional com o Agentforce habilitado. Siga os passos abaixo — leva cerca de 15 a 30 minutos.</p>

        <h2 id="etapa0-passo1">1. Crie sua conta no Trailhead</h2>
        <p>O Trailhead é a plataforma de aprendizado gratuita da Salesforce. Você vai usá-la para criar um Playground — um org Salesforce gratuito para treinar.</p>
        <a href="https://tbid.digital.salesforce.com/oauth2/aus5v9466wdqLdY0O697/v1/authorize?response_type=code&response_mode=query&nonce=d6e31292-b770-40fc-aae2-cb4c273c357d&client_id=0oa5v93ebgAGqkFSn697&redirect_uri=https%3A%2F%2Fiis.digital.salesforce.com%2Fservices%2Foauth2%2Fcallback&state=eyJpaXNTdGF0ZSI6IjQwOTEzZWEwOTFmZDExZWMyN2U4MTgyZTpSOGxXYUJuLzZOUEh0MWR1SmhVTG1xeStUQ0dnNGVuTDFOL3BheGtWZTlnWFlTM2M4Ulg5VFJIREQ1a2VzSGNUdG1DdVhNQThiMmxRQWpVMmFZd3V1ZVRYampIdndmeGNXUEhFZFg1dG11bFhFNkhQeERxbnk0ZDNsV3ErcVE2aS9CenRJVW1WM1JSZzl0NFVnU1lOMUhUQ0Y3eFR6TU9NMjNVN1ZkQ2RIYVVFTVRBU0NlT0V2czRYQUVLQVFZbFdpVzFEUmR1bU91bGwvS3BPS0VQbTB3YnZQYldpSnRsTFh1NStDbm82dE1ZVWcyeTE3bE1hd1FlNnU2RlhiVlgxZkJ0R2dDcThZUWJLeGFRb2NMSnd0czY3Ok9rR0JCeUgycmdjc2RkNy8rcFpWaWc9PSIsInJlZmVycmVyIjoiaHR0cHM6Ly90cmFpbGhlYWQuc2FsZXNmb3JjZS5jb20vIiwiY2xpZW50SWQiOiIzTVZHOWc5cmJzVGtLbkFYUlVfaE9MdkhSWWo3SFMxY3NOMExsaE9TZUJSdjVOcDJteFB1cmNJZmZBNVYwem44LnVJRHRibVh5U1dteHFfWGRBOHd4IiwiY29ycmVsYXRpb25JZCI6IjY1ODllMjhlLWU1MGUtNGExZi05NWE2LTVkN2NlYzVlZGMwMiIsInN0YXJ0VGltZSI6MTc4NjQ4MTA5NzI3NCwiaWRwcyI6WyJJZFAgLSBHb29nbGUiLCJJZFAgLSBTYWxlc2ZvcmNlIiwiSWRQIC0gTXVsZXNvZnQtVVMiLCJJZFAgLSBNdWxlc29mdC1FVSIsIklkUCAtIE11bGVzb2Z0LUNBTI...iLCJJZFAgLSBNdWxlc29mdC1KUCIsIklkUCAtIE11bGVzb2Z0LUlOIiwiSWRQIC0gTXVsZXNvZnQtQVUiLCJJZFAgLSBTcGlmZi1VUyIsIklkUCAtIFNwaWZmLUVVIiwiSWRQIC0gT3duIiwiSWRQIC0gVGFibGVhdSIsIklkUCAtIFRhYmxlYXUtQ2xvdWQiLCJJZFAgLSBNYXJrZXRpbmdDbG91ZCIsIklkUCAtIExpbmtlZGluIiwiSWRQIC0gQXBwbGUiLCJvdHAiXSwidGJpZENvbmZpZ0lkIjoic3RhbmRhcmQifQ&scope=openid+email+profile&intent=login" target="_blank" rel="noopener" class="trailhead-link">
          Criar conta no Trailhead →
        </a>

        <h2 id="etapa0-passo2">2. Crie e configure seu Playground</h2>

        <div class="callout-box" style="margin-bottom:16px">
          <span class="callout-box-icon">⚠️</span>
          <div class="callout-box-body">
            <strong>Esse emblema requer um(a) novo(a) Agentforce Builder Playground personalizado(a).</strong><br>
            Você tem tempo limitado para concluir esse emblema. <strong>Se você não concluir todas as unidades deste emblema antes que sua organização expire, perderá o acesso e terá de recomeçar.</strong> Recomendamos que você comece e conclua este emblema em 1 a 2 sessões, enquanto sua organização estiver ativa.
          </div>
        </div>

        <a href="https://trailhead.salesforce.com/pt-BR/content/learn/modules/quick-start-assemble-a-service-agent-with-agentforce-builder/learn-about-agentforce-builder?trail_id=become-an-agentblazer-champion-2026" target="_blank" rel="noopener" class="trailhead-link">
          Módulo Trailhead: Quick Start — Agentforce Builder →
        </a>

        <h3>Inscrever-se em uma organização Developer Edition com Agentforce Studio</h3>
        <p>Para concluir este projeto, você precisa de um Playground personalizado que contenha o Agentforce Studio e nossos dados de amostra.</p>
        <ol class="numbered-steps">
          <li>Clique em <strong>Create Playground (Criar Playground)</strong> e clique em <strong>Yes, Create Playground (Sim, Criar Playground)</strong>.</li>
          <li>Sua nova organização é automaticamente associada à sua conta do Trailhead.</li>
          <li>Anote a data de expiração de sua organização e conclua este emblema antes dessa data.</li>
          <li>Clique em <strong>Launch (Iniciar)</strong> para abrir o Playground.</li>
        </ol>

        <h3>Habilitar o Agentforce e publicar o site do Experience Cloud</h3>
        <p>A primeira etapa da criação de um agente é ativar o recurso exigido da organização.</p>
        <ol class="numbered-steps">
          <li>Clique em <strong>⚙ (ícone de configuração)</strong> e em <strong>Setup (Configuração)</strong>. A página Configuração abre em uma nova guia.</li>
          <li>Em Setup, na caixa <strong>Quick Find (Busca rápida)</strong>, procure e selecione <strong>Salesforce Go</strong>.</li>
          <li>Na caixa <strong>Search features...</strong>, insira e selecione <strong>Agentforce Studio</strong>.</li>
          <li>Clique em <strong>Get Started (Começar a usar)</strong>.</li>
          <li>Clique em <strong>Turn On (Habilitar)</strong>.</li>
          <li>Clique em <strong>Turn On (Habilitar)</strong> na janela de confirmação.</li>
        </ol>

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

        <h2 id="etapa0-passo4">4. Seus dados</h2>
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
              <span>Entendo que a Salesforce e a minha empresa possui um acordo de confidencialidade que protege o conteúdo gerado que será compartilhado com a equipe Salesforce.</span>
            </label>
          </div>
        </div>

        <button class="btn-concluir" id="btn-concluir-0" disabled onclick="Etapa0.concluir()">
          Estou pronto, vamos começar →
        </button>
      </div>`;
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
