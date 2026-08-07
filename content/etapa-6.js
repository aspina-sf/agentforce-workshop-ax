if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[6] = {
  titulo: 'Ciclo de Curadoria Conversacional',
  tempo: '30 min',
  topicos: ['Objetivos', 'Teoria', 'Os 6 passos', 'Prática', 'Recap'],
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
        <li>Entender e aplicar o método de 6 passos de Curadoria Conversacional</li>
        <li>Realizar pelo menos 2 ciclos completos</li>
        <li>Medir a melhoria entre ciclos</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Curadoria Conversacional não é sobre perfeição</strong> — é sobre evolução contínua. Um agente com 3 ciclos completos é significativamente melhor que um com configuração inicial, mesmo sem código.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>A Curadoria Conversacional é o processo sistemático de melhorar um agente através de ciclos estruturados de observação, análise e ajuste. Cada ciclo leva de 20 a 40 minutos e produz uma versão mensurável melhor do agente.</p>
      <p>O diferencial do método é a disciplina: um ajuste por ciclo, medido antes e depois. Isso evita o problema comum de fazer muitas mudanças ao mesmo tempo e não saber o que funcionou.</p>

      <h2>Os 6 passos do ciclo</h2>
      <ul class="checklist">
        <li><input type="checkbox"> <span><strong>1. Coleta:</strong> Realize 10 conversas de teste com perfis de usuário diferentes (usuário cooperativo, usuário resistente, usuário confuso)</span></li>
        <li><input type="checkbox"> <span><strong>2. Análise:</strong> Classifique cada conversa como ✅ sucesso, ⚠️ parcial ou ❌ falha</span></li>
        <li><input type="checkbox"> <span><strong>3. Padrão:</strong> Identifique o padrão mais frequente de falha entre as conversas ❌ e ⚠️</span></li>
        <li><input type="checkbox"> <span><strong>4. Hipótese:</strong> Formule uma hipótese de causa: "O agente falha porque as Instructions não cobrem o cenário X"</span></li>
        <li><input type="checkbox"> <span><strong>5. Ajuste:</strong> Faça apenas um ajuste nas Instructions para testar a hipótese</span></li>
        <li><input type="checkbox"> <span><strong>6. Validação:</strong> Repita exatamente as conversas que falharam e verifique se o ajuste resolveu o padrão identificado</span></li>
      </ul>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ciclos_realizados">
            Quantos ciclos completos você realizou? *
          </label>
          <input type="text" id="campo-ciclos_realizados" placeholder="Ex: 2" value="${r.ciclos_realizados || ''}">
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-observacoes_ciclos">
            Observações por ciclo *
            <span>Para cada ciclo: padrão identificado, hipótese, ajuste feito e resultado da validação.</span>
          </label>
          <textarea id="campo-observacoes_ciclos" rows="14" placeholder="Ciclo 1:&#10;Padrão: agente não lidava bem com clientes que negavam a dívida&#10;Hipótese: Instructions não cobriam o cenário de negação&#10;Ajuste: adicionei instrução sobre como responder à negação sem ser confrontador&#10;Resultado: 8/10 conversas passaram a terminar com registro de intenção&#10;&#10;Ciclo 2:&#10;...">${r.observacoes_ciclos || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você dominou o método de Curadoria Conversacional. Com ele, qualquer pessoa de negócio pode evoluir um agente de forma estruturada e mensurável, sem depender de suporte técnico para cada pequena melhoria.
      </div>

      <button class="btn-concluir" id="btn-concluir-6" disabled>Concluir Etapa 6 →</button>`;
  }
};
