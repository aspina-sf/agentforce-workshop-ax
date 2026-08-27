if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[6] = {
  titulo: 'Ciclo de Curadoria Conversacional',
  tempo: '30 min',
  topicos: ['Objetivos', 'Os 6 passos do ciclo', 'Quantos ciclos?', 'Prática', 'Recap'],
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
        <li>Aplicar o ciclo de 6 passos de Curadoria Conversacional</li>
        <li>Realizar pelo menos quatro ciclos completos no total (incluindo o da Etapa 5)</li>
        <li>Continuar até que o comportamento seja aprovado pela área de negócio</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Planeje pelo menos quatro ciclos de testes e ajustes no total</strong>, incluindo o primeiro ciclo da Etapa 5. Se o comportamento ainda não estiver maduro, continue até a aprovação da área de negócio.
        </div>
      </div>

      <h2>Os 6 passos do ciclo</h2>
      <ul class="checklist">
        <li><input type="checkbox"> <span><strong>1. Testar</strong> o agente no Preview.</span></li>
        <li><input type="checkbox"> <span><strong>2. Registrar</strong> os novos ajustes necessários na planilha de refinamento.</span></li>
        <li><input type="checkbox"> <span><strong>3. Enviar</strong> ou colar a planilha atualizada na mesma conversa com seu assistente de IA.</span></li>
        <li><input type="checkbox"> <span><strong>4. Reutilizar</strong> o Prompt Perfeito da Etapa 5.</span></li>
        <li><input type="checkbox"> <span><strong>5. Atualizar</strong> os campos indicados no Agentforce.</span></li>
        <li><input type="checkbox"> <span><strong>6. Salvar</strong> e realizar novos testes.</span></li>
      </ul>

      <h2>Quantos ciclos?</h2>
      <p>O número mínimo recomendado é <strong>quatro ciclos no total</strong> (incluindo o primeiro da Etapa 5). No entanto, o critério de saída não é o número de ciclos — é a <strong>aprovação da área de negócio</strong> sobre o comportamento conversacional do agente.</p>
      <p>Se após quatro ciclos o comportamento ainda não estiver maduro, continue. A qualidade do agente melhora a cada ciclo, e a aprovação formal da área de negócio é o requisito para avançar para a Etapa 7.</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ciclos_realizados">
            Quantos ciclos completos você realizou no total (incluindo o da Etapa 5)? *
          </label>
          <input type="text" id="campo-ciclos_realizados" placeholder="Ex: 4" value="${r.ciclos_realizados || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_ciclos">
            Resumo dos ciclos realizados *
            <span>Para cada ciclo: principais ajustes aplicados e resultado dos testes. O último ciclo deve indicar a aprovação da área de negócio.</span>
          </label>
          <textarea id="campo-observacoes_ciclos" rows="14" placeholder="Ciclo 2 (Etapa 6):&#10;Ajustes: melhorei o tratamento de recusas no Subagent Reasoning Instructions&#10;Resultado: agente passou a usar persuasão sem ser invasivo&#10;&#10;Ciclo 3:&#10;Ajustes: ...&#10;Resultado: ...&#10;&#10;Ciclo 4:&#10;Ajustes: ...&#10;Resultado: comportamento aprovado pela área de negócio">${r.observacoes_ciclos || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Com o comportamento conversacional aprovado, você está pronto para identificar os dados que o agente deve capturar durante os atendimentos. Essa marcação é o que viabiliza a implementação técnica na Etapa 8.
      </div>

      <button class="btn-concluir" id="btn-concluir-6" disabled>Concluir Etapa 6 →</button>`;
  }
};
