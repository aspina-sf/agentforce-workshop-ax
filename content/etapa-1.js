if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[1] = {
  titulo: 'Escrever livremente e gerar conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'descricao_livre_agente', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 1 — Escrever livremente e gerar conversa simulada</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Transformar a sua visão do agente em texto livre</li>
        <li>Usar IA para gerar a primeira simulação de conversa</li>
        <li>Entender o ponto de partida do processo de curadoria</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Não se preocupe com perfeição agora.</strong> O objetivo é externalizar o que você quer que o agente faça — a qualidade vem nas etapas seguintes.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>O primeiro passo para construir um agente Agentforce é descrever, em linguagem natural, o que ele deve fazer. Não existe formato certo — escreva como se estivesse explicando para um colega de trabalho.</p>
      <p>Quanto mais contexto você der, melhor será a conversa simulada gerada pela IA: mencione o tom desejado, o público-alvo, as informações que o agente deve coletar ou oferecer, e os limites do que ele pode fazer.</p>
      <p>Com essa descrição, você pede a uma IA generativa (ChatGPT, Claude, Copilot) que simule uma conversa completa entre o agente e um usuário típico. Essa simulação é o seu primeiro protótipo.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>A <strong>Force Recovery</strong> é uma empresa de recuperação de crédito B2B que atende pequenas e médias empresas. Seu time de cobrança enviou para a IA a seguinte descrição:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Quero um agente que aborde clientes com faturas em atraso de forma amigável. Ele deve se apresentar como assistente da Force Recovery, perguntar sobre o pagamento, oferecer opções de parcelamento (até 3x sem juros) e registrar a intenção de pagamento. O tom deve ser profissional mas humano, sem ser agressivo. O agente não deve prometer descontos sem aprovação do gerente.</code></pre>
      </div>
      <p>Com esse texto, a IA gerou uma conversa simulada de 8 turnos que o time usou como base para todos os refinamentos seguintes.</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-descricao_livre_agente">
            Descreva livremente o agente que você quer construir *
            <span>Escreva como se estivesse explicando para um colega. Inclua: o que o agente faz, para quem, qual o tom, quais informações coleta ou oferece, e o que ele não deve fazer.</span>
          </label>
          <textarea id="campo-descricao_livre_agente" rows="10" placeholder="Ex: Quero um agente que...">${r.descricao_livre_agente || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você transformou sua ideia em texto estruturado. Essa descrição livre é a semente do seu agente — nas próximas etapas ela se tornará uma conversa simulada, configurações técnicas e, finalmente, um agente funcionando no Agentforce.
      </div>

      <button class="btn-concluir" id="btn-concluir-1" disabled>Concluir Etapa 1 →</button>`;
  }
};
