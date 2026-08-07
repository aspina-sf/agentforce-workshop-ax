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
        <li>Preencher os campos mais importantes: Instructions, Welcome e Error Message</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          As <strong>Instructions</strong> são o campo mais importante. É onde você define a personalidade, o escopo e as regras do agente. Invista tempo aqui — é ela que determina 80% do comportamento do agente.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>O Agentforce New Builder solicita informações para configurar um agente. Você vai usar a IA para transformar sua descrição revisada em valores prontos para colar em cada campo.</p>
      <p>O campo <strong>Instructions</strong> é o mais extenso e crítico: ele instrui o modelo sobre como se comportar, qual tom usar, o que pode e o que não pode fazer. Pense nele como o "manual de conduta" do agente.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para gerar as configurações:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base na conversa simulada revisada e nos ajustes identificados, gere os valores para os campos de configuração do Agentforce:
- Agent Name: nome curto e amigável
- Instructions: parágrafo completo com personalidade, escopo, tom, regras e limitações
- Welcome Message: primeira mensagem ao iniciar conversa (max 2 linhas)
- Error Message: mensagem quando não conseguir ajudar

Use o contexto da Force Recovery: empresa de recuperação de crédito B2B, tom profissional e humano, parcelamento em até 3x sem juros, não prometer descontos.</code></pre>
      </div>

      <h2>Os 10 campos do Agentforce</h2>
      <ol>
        <li><strong>Agent Name</strong> — Nome do agente visível para os usuários</li>
        <li><strong>Description</strong> — Descrição interna para identificação no Setup</li>
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
            <span>Nome curto que aparecerá para os usuários (ex: "Assistente Acme", "Sofia")</span>
          </label>
          <input type="text" id="campo-agent_name" placeholder="Ex: Assistente Acme" value="${r.agent_name || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-instructions">
            Instructions *
            <span>Cole aqui o texto de instruções gerado pela IA. Inclua personalidade, tom, escopo e limitações.</span>
          </label>
          <textarea id="campo-instructions" rows="12" placeholder="Ex: Você é o assistente virtual da Acme Corp, especializado em...">${r.instructions || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-welcome_message">
            Welcome Message *
            <span>Primeira mensagem que o agente envia ao iniciar uma conversa (máximo 2 linhas)</span>
          </label>
          <textarea id="campo-welcome_message" rows="3" placeholder="Ex: Olá! Sou o assistente da Acme Corp. Como posso ajudar você hoje?">${r.welcome_message || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-error_message">
            Error Message
            <span>Mensagem quando o agente não consegue ajudar (opcional)</span>
          </label>
          <textarea id="campo-error_message" rows="3" placeholder="Ex: Desculpe, não consigo ajudar com isso. Por favor, entre em contato com nossa equipe.">${r.error_message || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você tem agora os campos principais preenchidos. Na próxima etapa, você os inserirá no Agentforce New Builder e realizará os primeiros testes reais com o agente funcionando.
      </div>

      <button class="btn-concluir" id="btn-concluir-3" disabled>Concluir Etapa 3 →</button>`;
  }
};
