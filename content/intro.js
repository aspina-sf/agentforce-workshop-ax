const Intro = (() => {
  function render() {
    const existing = Session.load();

    if (existing && existing.meta && existing.meta.participante) {
      const concluidas = (existing.progresso && existing.progresso.etapas_concluidas) || [];
      const etapa0Concluida = existing.progresso && existing.progresso.etapa0_concluida;
      document.getElementById('intro-content').innerHTML = `
        <div class="intro-card">
          <img src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/11/agentforce-demos.png?w=728" alt="Salesforce" style="margin-bottom:24px;display:block;width:100%;max-width:480px;border-radius:8px">
          <h1>Bem-vindo de volta, ${existing.meta.participante}!</h1>
          <p>Encontramos uma sessão salva — <strong>${existing.meta.empresa}</strong>, ${concluidas.length}/9 etapas concluídas.<br>Deseja continuar de onde parou?</p>
          <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
            <button class="btn-primary" onclick="${etapa0Concluida ? 'Journey.start()' : 'Journey.goToEtapa0()'}">Continuar de onde parei →</button>
            <button class="btn-secondary" onclick="Session.clear(); Intro.render()">Nova sessão</button>
          </div>
        </div>`;
      return;
    }

    document.getElementById('intro-content').innerHTML = `
      <div class="intro-card">
        <img src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2025/11/agentforce-demos.png?w=728" alt="Salesforce" style="margin-bottom:24px;display:block;width:100%;max-width:480px;border-radius:8px">
        <h1>Agentforce Workshop</h1>
        <p>Guia prático de construção e curadoria conversacional para Agentforce. Preencha seus dados para começar.</p>
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
            <label class="field-label" for="intro-senha">Código do treinamento</label>
            <input type="text" id="intro-senha" placeholder="Digite o código fornecido pelo instrutor">
          </div>
          <div class="practice-field">
            <label class="field-label" for="intro-caso-exemplo">Selecionar Caso de Uso Exemplo</label>
            <select id="intro-caso-exemplo">
              <option value="">Selecione...</option>
              <option value="cobranca">Agente de cobrança B2B — Force Recovery</option>
              <option value="marketing">Agente de criação de campanhas — Martechforce</option>
            </select>
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
            <label class="field-label" for="intro-email">
              Email *
              <span>Usado para que o facilitador possa acompanhar sua evolução no workshop.</span>
            </label>
            <input type="email" id="intro-email" placeholder="seu@email.com" required>
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
    const email = document.getElementById('intro-email').value.trim();
    const caso = document.getElementById('intro-caso').value.trim();
    const senha = document.getElementById('intro-senha').value;
    const casoExemplo = document.getElementById('intro-caso-exemplo').value;
    if (!nome || !empresa || !area || !email || !email.includes('@') || !caso) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    Session.setMeta({ participante: nome, empresa, area, email, caso_de_uso: caso, senha, caso_exemplo: casoExemplo });
    Journey.goToEtapa0();
  }

  return { render, submit };
})();
