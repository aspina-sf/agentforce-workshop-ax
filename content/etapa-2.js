if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[2] = {
  titulo: 'Revisar e ajustar a conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'ajustes_identificados', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 2 — Revisar e ajustar a conversa simulada</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Analisar criticamente a conversa gerada pela IA</li>
        <li>Identificar lacunas, erros de tom e oportunidades de melhoria</li>
        <li>Documentar os ajustes antes de implementá-los</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>A primeira conversa gerada raramente está pronta.</strong> O valor desta etapa está em você, que conhece o negócio, identificar o que a IA não sabia.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>Após gerar a conversa simulada, você precisa revisá-la com olhar crítico. Pergunte-se: o agente se apresentou corretamente? O tom estava adequado para o nosso público? Ele coletou as informações certas? Perguntou o que não deveria?</p>
      <p>Cada ajuste identificado agora evita dezenas de correções depois. Use um prompt de revisão estruturado para não deixar nada passar.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>O time da Force Recovery usou o seguinte prompt para revisar a conversa gerada:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Revise a conversa acima como se você fosse o gerente de atendimento da Force Recovery. Avalie:
1) O agente se apresentou de forma adequada e completa?
2) O tom estava profissional e humano, sem ser agressivo?
3) Ele ofereceu as opções de parcelamento corretamente (até 3x sem juros)?
4) Há alguma pergunta que não deveria ter sido feita?
5) O agente prometeu algo que não deveria (ex: descontos)?
6) O encerramento da conversa foi satisfatório?
Para cada ponto, diga o que está bom e o que deve mudar.</code></pre>
      </div>
      <p>Os ajustes identificados: o agente não mencionou o CNPJ do cliente para confirmar identidade, e o encerramento não registrou explicitamente a intenção de pagamento.</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ajustes_identificados">
            Quais ajustes você identificou na conversa simulada? *
            <span>Liste os pontos que precisam melhorar: tom, fluxo, informações coletadas, apresentação do agente, encerramento, etc.</span>
          </label>
          <textarea id="campo-ajustes_identificados" rows="10" placeholder="Ex: 1) O agente não se apresentou com o nome da empresa&#10;2) Tom muito formal para o nosso público&#10;3) Não perguntou sobre...">${r.ajustes_identificados || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você revisou a conversa com olhar de negócio. Os ajustes que identificou agora serão incorporados nas configurações do agente na próxima etapa, garantindo que ele reflita exatamente como sua empresa quer se comunicar.
      </div>

      <button class="btn-concluir" id="btn-concluir-2" disabled>Concluir Etapa 2 →</button>`;
  }
};
