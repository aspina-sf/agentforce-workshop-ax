if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[9] = {
  titulo: 'Teste funcional final',
  tempo: '20 min',
  topicos: ['Objetivos', 'Como preparar', 'Checklist de validação', 'Prática', 'Recap'],
  campos: [
    { key: 'checklist_validacao', obrigatorio: false },
    { key: 'observacoes_finais', obrigatorio: true }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    let checks = {};
    try { checks = r.checklist_validacao ? JSON.parse(r.checklist_validacao) : {}; } catch (e) { checks = {}; }

    const itens = [
      'O roteamento para o subagente correto está funcionando.',
      'O comportamento conversacional aprovado pela área de negócio está preservado.',
      'A execução de ações, automações e integrações está correta.',
      'A gravação dos dados identificados na Etapa 7 está sendo realizada corretamente.',
      'O tratamento de erros, exceções e mensagens fora de contexto está adequado.',
      'A experiência real do cliente no canal escolhido está satisfatória.'
    ];

    const checklistHtml = itens.map((item, i) => `
      <li>
        <input type="checkbox" id="check-val-${i}" ${checks[i] ? 'checked' : ''}
          onchange="(function(){
            var data = Session.getEtapa(9);
            var c = {};
            try { c = data.respostas.checklist_validacao ? JSON.parse(data.respostas.checklist_validacao) : {}; } catch(e) {}
            c[${i}] = document.getElementById('check-val-${i}').checked;
            Session.setEtapaResposta(9, 'checklist_validacao', JSON.stringify(c));
          })()">
        <span>${item}</span>
      </li>`).join('');

    return `
      <h1>Etapa 9 — Teste funcional final</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Realizar o teste funcional completo do agente no canal de produção</li>
        <li>Validar de ponta a ponta os 6 pontos do checklist de qualidade final</li>
        <li>Obter a aprovação conjunta das áreas de negócio e técnica</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>O agente estará pronto para publicação após a aprovação funcional conjunta das áreas de negócio e técnica.</strong> Realize o teste preferencialmente no canal em que ele será disponibilizado ao cliente.
        </div>
      </div>

      <h2>Como preparar os cenários de teste</h2>
      <p>Recomenda-se manter toda a construção do agente na mesma conversa com seu assistente de IA. Como ele terá o histórico da definição, dos ajustes conversacionais, das marcações de dados e dos requisitos técnicos, poderá gerar cenários de teste mais completos e aderentes ao projeto.</p>
      <p>Antes do teste funcional final, solicite ao assistente de IA uma lista de cenários de teste com base em toda a construção realizada na conversa. Inclua fluxos principais, exceções, roteamento entre subagentes, ações, integrações, gravação de dados e tratamento de erros.</p>

      <h2>Checklist de validação final</h2>
      <ul class="checklist">
        ${checklistHtml}
      </ul>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_finais">
            Observações do teste funcional final e aprovação *
            <span>Registre: resultado do teste em cada ponto do checklist, pontos de atenção remanescentes e confirmação da aprovação conjunta das áreas de negócio e técnica.</span>
          </label>
          <textarea id="campo-observacoes_finais" rows="10" placeholder="Resultado do teste funcional:&#10;- Roteamento: ✅ correto em todos os cenários testados&#10;- Comportamento conversacional: ✅ aprovado pela área de negócio&#10;- Ações e integrações: ✅ / ⚠️ [descreva se houver pendência]&#10;- Gravação de dados: ✅ campos identificados na Etapa 7 gravando corretamente&#10;- Tratamento de erros: ✅&#10;- Experiência no canal: ✅&#10;&#10;Aprovação:&#10;Área de negócio: [nome / data]&#10;Área técnica: [nome / data]">${r.observacoes_finais || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Parabéns! Você completou o guia prático de construção e curadoria conversacional para Agentforce. Seu agente foi definido, refinado, documentado e validado — pronto para publicação com clareza de intenção de negócio e aprovação técnica.
      </div>

      <button class="btn-concluir" id="btn-concluir-9" disabled>Concluir Workshop →</button>`;
  }
};
