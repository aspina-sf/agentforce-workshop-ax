if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[4] = {
  titulo: 'Configurar, salvar e realizar os primeiros testes',
  tempo: '30 min',
  topicos: ['Objetivos', 'Configurar no Agentforce Studio', 'Planilha de Refinamento', 'Observação importante', 'Prática', 'Recap'],
  campos: [{ key: 'oportunidades_melhoria', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 4 — Configurar, salvar e realizar os primeiros testes</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Inserir as configurações geradas no Agentforce New Builder</li>
        <li>Publicar o agente e realizar os primeiros testes reais</li>
        <li>Registrar oportunidades de melhoria na Planilha de Refinamento</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>Teste o fluxo principal e também exceções:</strong> recusas, dúvidas e pedidos que possam alterar a condução da conversa. A Planilha de Refinamento preserva o contexto de cada teste e ajuda a identificar se o problema está nas instruções ou no roteamento.
        </div>
      </div>

      <h2>Configurar no Agentforce Studio</h2>
      <ol class="numbered-steps">
        <li>No Agentforce Studio, clique em <strong>New Agent</strong>.</li>
        <li>Digite <strong>"Um agente do zero"</strong> para criar um agente sem pré-configurações.</li>
        <li>Copie as configurações geradas na Etapa 3 para o Agentforce New Builder, seguindo a sequência apresentada.</li>
        <li>Selecione <strong>"Select User"</strong> e escolha o usuário já existente. Ele já tem acesso aos objetos e campos necessários.</li>
        <li>Clique no botão <strong>Skip Ahead</strong> e então copie e cole todas as configurações geradas no assistente de IA.</li>
        <li>Salve o agente e execute os primeiros testes no <strong>Preview</strong>, incluindo fluxo principal, exceções, recusas, dúvidas e pedidos que possam alterar a condução da conversa.</li>
        <li>Durante os testes, registre as oportunidades de melhoria na <strong>Planilha de Refinamento</strong>.</li>
      </ol>

      <div class="callout-box">
        <span class="callout-box-icon">💡</span>
        <div class="callout-box-body">
          <strong>Dica:</strong> Se tiver qualquer dificuldade em colar as instruções do subagente, copie o YAML do agente acionando o modelo Script e use o botão copiar. Cole na conversa do seu assistente de IA e peça para ele aplicar as configurações no YAML e gerar um arquivo atualizado. Abra o arquivo atualizado, copie e cole o YAML sobre o YAML antigo do Agentforce.
        </div>
      </div>

      <h2>Planilha de Refinamento</h2>
      <p>Para cada ponto identificado nos testes, preencha os seguintes campos:</p>
      <ol>
        <li><strong>Mensagem do cliente:</strong> copie e cole a mensagem exata enviada pelo cliente ao agente no Preview.</li>
        <li><strong>Resposta do agente:</strong> copie e cole a resposta exata apresentada pelo agente.</li>
        <li><strong>Subagente responsável pelo Reasoning:</strong> informe o subagente que processou a interação no Preview.</li>
        <li><strong>Texto do Reasoning do Subagente:</strong> texto gerado pelo agente em Agent Preview Details.</li>
        <li><strong>Ajuste necessário:</strong> descreva como o agente deveria responder ou se comportar.</li>
        <li><strong>Solicitante:</strong> informe o nome da pessoa que realizou o teste e registrou o ajuste.</li>
      </ol>

      <h2>Observação importante</h2>
      <p>Se os usuários responsáveis pelos testes não tiverem acesso ao Agentforce Builder para identificar qual subagente executou o Reasoning, <strong>limite temporariamente o Agent Router ao subagente que está sendo validado</strong>. Para isso, no Agent Router, limite ou desative temporariamente as ações de direcionamento para os demais subagentes configurados.</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-oportunidades_melhoria">
            Oportunidades de melhoria identificadas nos testes *
            <span>Para cada problema encontrado, registre: a mensagem do cliente, a resposta do agente, e o ajuste necessário.</span>
          </label>
          <textarea id="campo-oportunidades_melhoria" rows="14" placeholder="Problema 1:&#10;Mensagem do cliente: pode parcelar?&#10;Resposta do agente: [resposta exata colada do Preview]&#10;Ajuste necessário: o agente deve reconhecer variações informais da pergunta e oferecer as opções disponíveis&#10;&#10;Problema 2:&#10;...">${r.oportunidades_melhoria || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você tem um agente funcionando e uma lista de melhorias documentada na Planilha de Refinamento. Na próxima etapa, você usará essa planilha para fazer o primeiro ciclo de ajustes com o assistente de IA.
      </div>

      <button class="btn-concluir" id="btn-concluir-4" disabled>Concluir Etapa 4 →</button>`;
  }
};
