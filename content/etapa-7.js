if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[7] = {
  titulo: 'Marcação de dados a capturar',
  tempo: '20 min',
  topicos: ['Objetivos', 'Como marcar', 'Exemplo', 'Prática', 'Recap'],
  campos: [{ key: 'dados_marcados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 7 — Marcação de dados a capturar</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Identificar quais informações relevantes devem ser registradas durante o atendimento</li>
        <li>Marcar essas informações diretamente nas instruções do subagente</li>
        <li>Preparar as instruções para entrega à equipe técnica</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>A área de negócio não precisa criar variáveis nem ações no Agentforce.</strong> Ela deve indicar claramente o que precisa ser gravado e em qual situação. A equipe técnica usará essas marcações para configurar as variáveis e ações necessárias.
        </div>
      </div>

      <h2>Como marcar</h2>
      <p>Depois que o comportamento conversacional for aprovado, revise as instruções do subagente (Subagent Reasoning Instructions) para identificar quais informações relevantes devem ser registradas durante o atendimento.</p>
      <p>A marcação deve ser feita diretamente nas instruções: após a instrução que descreve a situação, adicione um bloco indicando o que precisa ser gravado e em qual momento. Seja específico — indique o dado, o contexto em que ele aparece e se é um dado informado pelo cliente ou uma decisão do agente.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Marcação dentro das instruções do subagente:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Se o cliente informar que não é o responsável pela tratativa financeira, solicite o nome, telefone e e-mail da pessoa responsável.

Gravar as seguintes informações:
1. O contato atual não é o responsável pela tratativa financeira
2. Nome da pessoa responsável
3. Telefone da pessoa responsável
4. E-mail da pessoa responsável</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-dados_marcados">
            Cole aqui o trecho das suas instruções com as marcações de dados *
            <span>Copie a seção do Subagent Reasoning Instructions onde você identificou dados a capturar e adicione os blocos "Gravar as seguintes informações:" após cada instrução relevante.</span>
          </label>
          <textarea id="campo-dados_marcados" rows="14" placeholder="[Trecho das instruções do subagente]&#10;...quando o cliente confirmar a intenção de pagamento...&#10;&#10;Gravar as seguintes informações:&#10;1. Intenção de pagamento confirmada&#10;2. Opção de parcelamento escolhida&#10;3. Data prometida pelo cliente&#10;&#10;[Próximo trecho das instruções]&#10;...">${r.dados_marcados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        As marcações de dados transformam as instruções em um documento que a equipe técnica pode usar para configurar variáveis e ações. Na próxima etapa, você preparará o pacote completo de transição técnica.
      </div>

      <button class="btn-concluir" id="btn-concluir-7" disabled>Concluir Etapa 7 →</button>`;
  }
};
