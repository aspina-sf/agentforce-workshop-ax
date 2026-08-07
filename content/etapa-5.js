if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[5] = {
  titulo: 'Primeiro ciclo de ajustes',
  tempo: '25 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_aplicados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 5 — Primeiro ciclo de ajustes</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Transformar as oportunidades de melhoria em ajustes concretos nas Instructions</li>
        <li>Usar IA para reescrever seções específicas das Instructions</li>
        <li>Validar que cada ajuste resolveu o problema identificado</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Faça um ajuste de cada vez</strong> e teste após cada mudança. Ajustes em lote dificultam identificar o que funcionou e o que não funcionou.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>O primeiro ciclo de ajustes transforma observações brutas em melhorias precisas nas Instructions. A chave é ser específico: ao invés de "melhorar o tom", indique exatamente em qual parte das Instructions o tom deve mudar e como.</p>
      <p>Use a IA como co-autora: mostre a ela a seção problemática das Instructions, explique o problema observado no teste, e peça uma reescrita cirúrgica — sem alterar o resto.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para o primeiro ajuste:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Nas Instructions abaixo, ajuste apenas o trecho que trata de parcelamento. O agente deve reconhecer variações informais da pergunta ("pode parcelar?", "tem como dividir?", "parcel", "parcela") e responder com as três opções disponíveis: 1x à vista, 2x ou 3x sem juros. Mantenha o restante das Instructions inalterado.

[Instruções atuais da Force Recovery]</code></pre>
      </div>
      <p>Resultado: após o ajuste e um novo teste, o agente passou a reconhecer corretamente 8 de 10 variações informais da pergunta sobre parcelamento.</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_aplicados">
            Quais ajustes você aplicou e qual foi o resultado? *
            <span>Para cada ajuste: o problema original, a mudança feita nas Instructions, e se o problema foi resolvido nos testes seguintes.</span>
          </label>
          <textarea id="campo-ajustes_aplicados" rows="12" placeholder="Ajuste 1:&#10;Problema: agente não reconhecia variações informais de parcelamento&#10;Mudança: adicionei exemplos de variações nas Instructions&#10;Resultado: agente passou a reconhecer corretamente&#10;&#10;Ajuste 2:&#10;...">${r.ajustes_aplicados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você completou o primeiro ciclo de ajuste. A qualidade do agente melhora exponencialmente com ciclos repetidos — a próxima etapa formaliza esse processo em um método estruturado chamado Curadoria Conversacional.
      </div>

      <button class="btn-concluir" id="btn-concluir-5" disabled>Concluir Etapa 5 →</button>`;
  }
};
