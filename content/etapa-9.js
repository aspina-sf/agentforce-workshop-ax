if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[9] = {
  titulo: 'Teste funcional final',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Checklist de validação', 'Prática', 'Recap'],
  campos: [
    { key: 'checklist_validacao', obrigatorio: false },
    { key: 'observacoes_finais', obrigatorio: true }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    let checks = {};
    try { checks = r.checklist_validacao ? JSON.parse(r.checklist_validacao) : {}; } catch (e) { checks = {}; }

    const itens = [
      'O agente se apresenta corretamente e com o tom adequado ao público',
      'O agente lida com respostas inesperadas sem travar ou retornar erro',
      'Todos os dados marcados para captura estão sendo coletados corretamente',
      'O agente encerra a conversa de forma satisfatória e registra o resultado',
      'O Welcome Message está correto, acolhedor e específico para o contexto',
      'O Error Message está ativo e direciona o usuário para um canal alternativo'
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
        <li>Validar o agente contra o checklist de qualidade final</li>
        <li>Documentar o estado final para entrega ao time técnico</li>
        <li>Confirmar que o agente está pronto para implementação completa</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Só entregue o agente ao time técnico após todos os 6 itens estarem marcados.</strong> Uma entrega prematura gera retrabalho técnico custoso — o time técnico não pode corrigir problemas de negócio.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>O teste funcional final é a validação formal antes da implementação técnica. Ele garante que o agente atinge os requisitos mínimos de qualidade em todas as dimensões que importam para o usuário final.</p>
      <p>Diferente dos testes anteriores, este é um teste de aceitação: você não está procurando melhorias, está confirmando que o agente está pronto. Se encontrar algo que precise corrigir, volte à Etapa 6 para um ciclo adicional de Curadoria Conversacional.</p>

      <h2>Checklist de validação final</h2>
      <ul class="checklist">
        ${checklistHtml}
      </ul>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_finais">
            Observações finais e próximos passos *
            <span>Registre: estado final do agente, pontos de atenção para o time técnico, e qualquer contexto adicional que ajude na implementação.</span>
          </label>
          <textarea id="campo-observacoes_finais" rows="10" placeholder="Estado atual: o agente está pronto para implementação técnica.&#10;&#10;Pontos de atenção para o time técnico:&#10;- O campo Payment_Date_Promise__c é crítico e deve ser testado em produção&#10;- O agente foi validado para PT-BR; outros idiomas precisam de ciclos adicionais&#10;&#10;Próximos passos acordados:&#10;...">${r.observacoes_finais || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Parabéns! Você completou o workshop de construção e curadoria conversacional do Agentforce. Seu agente está documentado, testado e pronto para ser implementado pelo time técnico com total clareza de intenção de negócio.
      </div>

      <button class="btn-concluir" id="btn-concluir-9" disabled>Concluir Workshop →</button>`;
  }
};
