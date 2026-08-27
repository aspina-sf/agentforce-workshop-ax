if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[5] = {
  titulo: 'Primeiro ciclo de ajustes',
  tempo: '25 min',
  topicos: ['Objetivos', 'Como funciona', 'Prompt Perfeito', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_aplicados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 5 — Primeiro ciclo de ajustes</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Transformar as oportunidades de melhoria em ajustes concretos nas configurações do agente</li>
        <li>Usar a IA para atualizar somente os campos necessários</li>
        <li>Validar que cada ajuste resolveu o problema identificado</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Ajustes gerais</strong> vão para System &gt; Agent-Level Instructions. <strong>Ajustes específicos do subagente</strong> vão para Subagent Description ou Subagent Reasoning Instructions. O prompt abaixo organiza isso automaticamente.
        </div>
      </div>

      <h2>Como funciona</h2>
      <p>Após realizar os primeiros testes, registre os pontos de melhoria na planilha de refinamento. Envie ou cole a planilha atualizada na mesma conversa com seu assistente de IA e insira o Prompt Perfeito abaixo.</p>
      <p>Use a dica do YAML (da Etapa 4) ou atualize diretamente no Agentforce os campos retornados com seus respectivos ajustes. Salve o agente, reinicie o Preview e realize novos testes.</p>

      <h2>Prompt Perfeito</h2>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base nas últimas configurações do agente geradas nesta conversa e na planilha de ajustes que acabei de enviar, analise os resultados dos testes e atualize somente os campos necessários. Organize cada ajuste no campo mais adequado, consulte a documentação Salesforce.

Ajustes gerais devem ser tratados em System > Agent-Level Instructions.
Ajustes específicos do subagente devem ser tratados em Subagent Description ou Subagent Reasoning Instructions.

Apresente somente os campos modificados, nesta ordem:
1. Agent Details > Description;
2. System > Agent-Level Instructions; (Aqui mantenha, no máximo, 900 caracteres)
3. Welcome Message;
4. Subagent Description;
5. Subagent Reasoning Instructions.

Para cada campo, apresente o texto completo revisado e pronto para copiar e colar. Não use quebra de linhas nos parágrafos. Ao final, inclua uma seção descrevendo os ajustes realizados comparados à versão anterior.</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_aplicados">
            Quais ajustes você aplicou e qual foi o resultado? *
            <span>Para cada ajuste: o problema original, em qual campo foi feita a mudança, e se o problema foi resolvido nos testes seguintes.</span>
          </label>
          <textarea id="campo-ajustes_aplicados" rows="12" placeholder="Ajuste 1:&#10;Problema: agente não reconhecia variações informais de parcelamento&#10;Campo modificado: Subagent Reasoning Instructions&#10;Resultado: agente passou a reconhecer corretamente&#10;&#10;Ajuste 2:&#10;...">${r.ajustes_aplicados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você completou o primeiro ciclo de ajuste. A próxima etapa formaliza esse processo em ciclos repetidos de Curadoria Conversacional, com pelo menos quatro ciclos no total incluindo este.
      </div>

      <button class="btn-concluir" id="btn-concluir-5" disabled>Concluir Etapa 5 →</button>`;
  }
};
