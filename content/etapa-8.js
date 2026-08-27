if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[8] = {
  titulo: 'Transição para Implementação Técnica',
  tempo: '25 min',
  topicos: ['Objetivos', 'O que entregar', 'Prompt Perfeito', 'Prática', 'Recap'],
  campos: [
    { key: 'yaml_agente', obrigatorio: true },
    { key: 'estimativa_conversas', obrigatorio: true }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 8 — Transição para Implementação Técnica</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Preparar o pacote de transição para a equipe técnica, parceiro ou administrador Salesforce</li>
        <li>Gerar os documentos funcionais usando o assistente de IA</li>
        <li>Estimar o consumo de Flex Credits para o dimensionamento da implantação</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>A equipe técnica avaliará a melhor forma de implementar os requisitos.</strong> Isso pode envolver criar variáveis, ações internas ou externas, automações, integrações e regras de roteamento. Também poderá ser necessário dividir o subagente em outros subagentes especializados.
        </div>
      </div>

      <h2>O que entregar</h2>
      <p>A entrega deve reunir:</p>
      <ol>
        <li><strong>Cópia do YAML do Agente</strong> — Abra o Script do Agente e use o botão Copiar no canto inferior direito do script.</li>
        <li><strong>Estimativa de conversas por mês por voz</strong> — Número mensal estimado de conversas via canal de voz.</li>
        <li><strong>Estimativa de conversas por mês por texto</strong> — Número mensal estimado de conversas via canal de texto.</li>
      </ol>

      <h2>Prompt Perfeito</h2>
      <p>Usando a mesma conversa com seu assistente de IA, insira o seguinte prompt com a cópia do YAML do agente para gerar os documentos de transição para a área técnica:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base em toda a construção realizada nesta conversa, gere um pacote de documentos para envio à área técnica. Consulte a documentação Salesforce para usar as melhores práticas. O pacote deve consolidar:

1. Descritivo funcional do Fluxo Conversacional do agente. Além de descrever, gere uma imagem do Fluxo Conversacional.

2. Conjunto de Ações: Descreve as ações que devem ser criadas a partir das marcações descritas no Reasoning Instructions contidas no YAML. Separe entre Ações Internas (Utilitárias) e Ações Externas. Deve-se executar o mínimo possível de Ações Externas para otimizar ao máximo o consumo de Flex Credits. Portanto, armazene o maior número de informações em variáveis usando Ações Internas para consolidar pequenas tarefas em poucas Ações Externas.

3. Conjunto de Dados: Descreve os dados que estão mockados dentro do Reasoning Instructions contidas no YAML descrevendo o momento do fluxo conversacional em que são necessários. Use os exemplos de valores mockados para enriquecer a explicação indicando se é um input ou output tanto do agente quanto do interlocutor.

4. Estimativa de consumo de Pacotes de Flex Credits necessários considerando a quantidade de ações por conversa multiplicado pela quantidade de conversas mensais informada multiplicado por 12 meses. Os pacotes de Flex Credits são comercializados em pacotes de 100 mil créditos. Cada Ação Externa numa conversa de texto consome 20 créditos e cada Ação Externa numa conversa de voz consome 30 créditos. Adicione 10% de créditos além do calculado para suportar o consumo de Data360. Leve em consideração os possíveis abandonos de jornada da audiência em cada estágio do processo.

[Cole aqui o YAML do agente]
Conversas mensais por voz: [informe o número]
Conversas mensais por texto: [informe o número]</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-yaml_agente">
            YAML do agente *
            <span>Abra o Script do Agente no Agentforce Studio, use o botão Copiar no canto inferior direito e cole o conteúdo aqui.</span>
          </label>
          <textarea id="campo-yaml_agente" rows="14" placeholder="# Cole aqui o YAML copiado do Script do Agente no Agentforce Studio">${r.yaml_agente || ''}</textarea>
        </div>
        <div class="practice-field">
          <label class="field-label" for="campo-estimativa_conversas">
            Estimativa de conversas mensais *
            <span>Informe a estimativa de conversas por mês para o dimensionamento de Flex Credits.</span>
          </label>
          <textarea id="campo-estimativa_conversas" rows="4" placeholder="Conversas por mês por voz: [número]&#10;Conversas por mês por texto: [número]">${r.estimativa_conversas || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você criou o pacote de transição entre negócio e tecnologia. O YAML com os documentos funcionais encapsulam toda a sua curadoria em um formato que a equipe técnica pode implementar diretamente no Salesforce.
      </div>

      <button class="btn-concluir" id="btn-concluir-8" disabled>Concluir Etapa 8 →</button>`;
  }
};
