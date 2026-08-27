if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[3] = {
  titulo: 'Gerar as configurações do agente',
  tempo: '25 min',
  topicos: ['Objetivos', 'Os 10 campos', 'Prompt Perfeito', 'Prática', 'Recap'],
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
        <li>Usar a conversa simulada aprovada para gerar os campos de configuração do Agentforce</li>
        <li>Entender os 10 campos principais do agente</li>
        <li>Gerar as configurações prontas para copiar e colar no Agentforce New Builder</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          O campo <strong>Subagent Reasoning Instructions</strong> é o mais importante — ele controla o comportamento detalhado do agente. O prompt abaixo já inclui a instrução de versionamento para facilitar o controle de mudanças ao longo dos ciclos de ajuste.
        </div>
      </div>

      <h2>Os 10 campos do Agentforce New Builder</h2>
      <ol>
        <li><strong>Agent Name</strong> — Nome do agente visível para os usuários</li>
        <li><strong>Developer Name</strong> — Nome técnico sem caracteres especiais</li>
        <li><strong>Agent Details &gt; Description</strong> — Descrição interna para identificação no Setup</li>
        <li><strong>System &gt; Agent-Level Instructions</strong> — Instruções gerais de comportamento (máx. 900 caracteres)</li>
        <li><strong>Welcome Message</strong> — Primeira mensagem ao iniciar conversa</li>
        <li><strong>Error Message</strong> — Mensagem quando o agente não consegue ajudar</li>
        <li><strong>Language Settings</strong> — Idioma principal (Português — Brasil)</li>
        <li><strong>Subagent Name</strong> — Nome do subagente (sem acentos ou caracteres especiais)</li>
        <li><strong>Subagent Description</strong> — Descrição do subagente para o Agent Router</li>
        <li><strong>Subagent Reasoning Instructions</strong> — Instruções detalhadas de comportamento conversacional</li>
      </ol>

      <h2>Prompt Perfeito</h2>
      <p>Quando a conversa simulada estiver aprovada, ainda na mesma conversa com o seu assistente de IA, insira o seguinte prompt:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base em toda a construção realizada nesta conversa, incluindo a descrição inicial do agente e a última versão do diálogo, gere as configurações necessárias para criar este agente no Agentforce New Builder. Consulte a documentação Salesforce para preencher as configurações de acordo com as melhores práticas. Mantenha consistência entre todos os campos. Escreva em português do Brasil, pronta para copiar e colar. Não altere a sequência de itens abaixo:

1. Agent Name
2. Developer Name
3. Agent Details > Description
4. System > Agent-Level Instructions (Use no máximo 900 caracteres)
5. Welcome Message
6. Error Message
7. Language Settings > Português (Brasil)
8. Subagent Name (Não use caracteres especiais ou acentos. Pode usar espaço entre as palavras)
9. Subagent Description
10. Subagent Reasoning Instructions

No início de Subagent Reasoning Instructions, insira um texto com uma instrução para o agente ignorar que servirá exclusivamente para identificar a versão. Numere as versões sequencialmente com números inteiros — por exemplo: "Versão 1", "Versão 2" — respeitando a ordem estabelecida ao longo desta nossa conversa. Não insira nas instruções do Subagent Reasoning Instructions referências a ações. Elas serão tratadas num outro momento. Organize as instruções do Subagent Reasoning Instructions em etapas numeradas. Não numere as instruções dentro de cada etapa. Deixe no melhor formato para copiar e colar no editor do Agentforce New Builder.</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-agent_name">
            Agent Name *
            <span>Nome curto e amigável que aparecerá para os usuários (ex: "Assistente Acme", "Sofia")</span>
          </label>
          <input type="text" id="campo-agent_name" placeholder="Ex: Assistente Acme" value="${r.agent_name || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-instructions">
            Subagent Reasoning Instructions *
            <span>Cole aqui o texto gerado pela IA. Deve incluir a instrução de versão no início, seguida das etapas numeradas do comportamento conversacional.</span>
          </label>
          <textarea id="campo-instructions" rows="14" placeholder="Versão 1&#10;&#10;Etapa 1 — Apresentação&#10;...&#10;&#10;Etapa 2 — Identificação&#10;...">${r.instructions || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-welcome_message">
            Welcome Message *
            <span>Primeira mensagem que o agente envia ao iniciar uma conversa</span>
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
        Você tem agora os campos principais preenchidos. Na próxima etapa, você os inserirá no Agentforce Studio e realizará os primeiros testes reais com o agente funcionando.
      </div>

      <button class="btn-concluir" id="btn-concluir-3" disabled>Concluir Etapa 3 →</button>`;
  }
};
