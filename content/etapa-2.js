if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[2] = {
  titulo: 'Revisar e ajustar a conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Como revisar', 'Exemplo', 'Prompt Perfeito', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_identificados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 2 — Revisar e ajustar a conversa simulada</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Validar se o agente conduz o atendimento de forma lógica</li>
        <li>Verificar se o tom esperado e as regras de negócio estão sendo respeitados</li>
        <li>Identificar como o agente lida com dúvidas, recusas e exceções</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>A primeira conversa gerada raramente está pronta.</strong> O valor desta etapa está em você, que conhece o negócio, identificar o que a IA não sabia.
        </div>
      </div>

      <h2>Como revisar</h2>
      <p>Leia a conversa gerada e avalie se o agente conduz o atendimento de forma lógica, usa o tom esperado, respeita as regras de negócio e lida adequadamente com dúvidas, recusas e exceções.</p>
      <p>Para cada ajuste identificado, descreva livremente o que precisa mudar. Quando houver ajustes, ainda na mesma conversa com o assistente de IA, use o <strong>Prompt Perfeito</strong> abaixo. Repita até que a conversa simulada seja aprovada pela área de negócio.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Ajuste identificado na conversa de cobrança B2B:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Antes de perguntar o CNPJ, o agente precisa confirmar se Carlos é a pessoa responsável por tratar assuntos financeiros. Se for, solicite o CNPJ. Se não for, pergunte os dados de contato do responsável: nome, telefone ou e-mail. Quando o interlocutor informar esses dados, agradeça a informação e encerre o atendimento.</code></pre>
      </div>
      <p>Após aplicar o ajuste, avalie se o novo diálogo gerado atende às necessidades apontadas e continue refinando até a aprovação.</p>

      <h2>Prompt Perfeito</h2>
      <p>Use este prompt na mesma conversa com seu assistente de IA para incorporar os ajustes:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Revise a última versão da conversa simulada com base nos ajustes abaixo. Mantenha tudo o que já estiver adequado e altere somente o que for necessário.

Ajustes necessários:
[Descreva livremente os ajustes desejados.]

Gere uma nova versão completa da conversa entre o agente e o cliente.</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_identificados">
            Quais ajustes você identificou na conversa simulada? *
            <span>Descreva cada ponto que precisa mudar: tom, fluxo, informações coletadas, apresentação do agente, encerramento, tratamento de recusas, etc.</span>
          </label>
          <textarea id="campo-ajustes_identificados" rows="10" placeholder="Ex: 1) O agente não confirmou se o interlocutor é o responsável antes de pedir dados sensíveis&#10;2) Tom muito formal para o nosso público&#10;3) Não tratou a recusa do cliente com firmeza adequada...">${r.ajustes_identificados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Continue refinando com o Prompt Perfeito até que a conversa simulada seja aprovada pela área de negócio. Na próxima etapa, você usará essa conversa aprovada para gerar as configurações do agente no Agentforce.
      </div>

      <button class="btn-concluir" id="btn-concluir-2" disabled>Concluir Etapa 2 →</button>`;
  }
};
