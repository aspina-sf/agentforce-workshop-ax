if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[7] = {
  titulo: 'Marcação de dados a capturar',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'dados_marcados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 7 — Marcação de dados a capturar</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Identificar quais dados o agente deve capturar durante as conversas</li>
        <li>Marcar esses dados nas Instructions usando o formato padrão</li>
        <li>Preparar as Instructions para entrega ao time técnico</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Dados não marcados nas Instructions raramente são implementados corretamente.</strong> Seja específico: nome do campo no Salesforce, tipo de dado, e em qual momento da conversa deve ser capturado.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>Para que o agente grave informações no Salesforce (contatos, oportunidades, casos), o time técnico precisa saber exatamente quais dados capturar, em qual objeto Salesforce e em qual momento da conversa.</p>
      <p>A marcação nas Instructions é a ponte entre a curadoria de negócio e a implementação técnica. Use o formato <code>[CAPTURAR: Objeto.Campo = valor | Tipo | Quando]</code> diretamente no texto das Instructions.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Trecho das Instructions da Force Recovery com marcações de dados:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Quando o cliente confirmar intenção de pagamento:
[CAPTURAR: Contact.Payment_Intent__c = "confirmed" | Tipo: Picklist | Quando: cliente diz "vou pagar" ou equivalente]
[CAPTURAR: Contact.Payment_Date_Promise__c = data mencionada | Tipo: Date | Quando: cliente menciona data específica]
[CAPTURAR: Case.Resolution_Notes__c = resumo da conversa | Tipo: Text Area | Quando: encerrar sessão]

Quando o cliente recusar o pagamento:
[CAPTURAR: Contact.Payment_Intent__c = "refused" | Tipo: Picklist | Quando: cliente nega explicitamente]
[CAPTURAR: Case.Refusal_Reason__c = motivo informado | Tipo: Text Area | Quando: cliente explica o motivo]</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-dados_marcados">
            Cole aqui suas Instructions com as marcações de dados *
            <span>Use o formato [CAPTURAR: Objeto.Campo = valor | Tipo | Quando] para cada dado que o agente deve registrar no Salesforce. Se não souber o nome do campo, use uma descrição: [CAPTURAR: "data de pagamento prometida" | Tipo: Date | Quando: cliente menciona data]</span>
          </label>
          <textarea id="campo-dados_marcados" rows="14" placeholder="[Cole suas Instructions aqui e adicione as marcações de dados nas posições corretas]">${r.dados_marcados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        As marcações de dados transformam as Instructions em um documento técnico completo. Na próxima etapa, você vai usar essas instruções enriquecidas para gerar o pacote técnico de implementação que o time de desenvolvimento receberá.
      </div>

      <button class="btn-concluir" id="btn-concluir-7" disabled>Concluir Etapa 7 →</button>`;
  }
};
