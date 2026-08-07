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
        <li>Inserir as configurações geradas no Agentforce New Builder</li>
        <li>Publicar o agente e realizar primeiros testes reais</li>
        <li>Registrar oportunidades de melhoria identificadas nos testes</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Teste com pelo menos 5 conversas diferentes</strong> antes de registrar suas observações. Inclua casos de sucesso e casos onde o usuário faz perguntas inesperadas ou foge do fluxo esperado.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>Com as configurações em mãos, é hora de inserir no Agentforce New Builder. O processo leva cerca de 10 minutos e resulta em um agente funcional para testes iniciais.</p>
      <p>Os primeiros testes são sempre reveladores: o agente raramente se comporta exatamente como imaginado. Documente cada problema com precisão — isso acelera os ajustes nas etapas seguintes.</p>

      <h2>Passo a passo — Agentforce New Builder</h2>
      <ol class="numbered-steps">
        <li>Acesse o <strong>Setup</strong> do Salesforce e busque por <code>Agentforce</code></li>
        <li>Clique em <strong>Agentforce Studio</strong> → <strong>New Agent</strong></li>
        <li>Preencha os campos com os valores que você preparou na Etapa 3</li>
        <li>Clique em <strong>Save</strong> para salvar o rascunho</li>
        <li>Clique em <strong>Activate</strong> para publicar o agente</li>
        <li>Use o botão <strong>Preview</strong> para abrir o chat de teste</li>
        <li>Realize pelo menos 5 conversas com diferentes abordagens</li>
        <li>Anote os problemas e oportunidades de melhoria observados</li>
      </ol>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-oportunidades_melhoria">
            Oportunidades de melhoria identificadas nos testes *
            <span>Para cada problema encontrado, registre: o que aconteceu, em qual contexto, qual seria o comportamento ideal.</span>
          </label>
          <textarea id="campo-oportunidades_melhoria" rows="12" placeholder="Problema 1:&#10;O que aconteceu: o agente não reconheceu quando o cliente disse 'pode parcelar?'&#10;Contexto: pergunta informal sobre parcelamento&#10;Comportamento ideal: identificar a intenção e oferecer as 3 opções&#10;&#10;Problema 2:&#10;...">${r.oportunidades_melhoria || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você tem um agente funcionando e uma lista de melhorias documentada. Esse é o ciclo central do Agentforce: configurar → testar → melhorar. As próximas etapas aprofundam esse ciclo com métodos estruturados.
      </div>

      <button class="btn-concluir" id="btn-concluir-4" disabled>Concluir Etapa 4 →</button>`;
  }
};
