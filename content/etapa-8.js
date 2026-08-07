if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[8] = {
  titulo: 'Transição para Implementação Técnica',
  tempo: '25 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo Force Recovery', 'Prática', 'Recap'],
  campos: [{ key: 'yaml_agente', obrigatorio: true }],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    return `
      <h1>Etapa 8 — Transição para Implementação Técnica</h1>

      <h2>Objetivos de Aprendizado</h2>
      <ul>
        <li>Gerar o pacote YAML do agente a partir das Instructions enriquecidas</li>
        <li>Entender o que o time técnico receberá para implementação completa</li>
        <li>Validar se o YAML reflete corretamente as intenções de negócio</li>
      </ul>

      <div class="callout-box">
        <span class="callout-box-icon">⚠️</span>
        <div class="callout-box-body">
          <strong>O YAML gerado é um artefato técnico</strong> — não tente editar o YAML manualmente. Seu papel é validar se o <em>conteúdo</em> reflete suas intenções de negócio antes de entregar ao time técnico.
        </div>
      </div>

      <h2>Teoria</h2>
      <p>O pacote de transição técnica é o documento que o time de Salesforce developers receberá para implementar o agente de forma completa: Flows de automação, Apex actions para integrações, configurações de deploy e mapeamento de dados.</p>
      <p>Você gera esse pacote usando IA com base em tudo que foi construído nas etapas anteriores — especialmente as Instructions com marcações de dados da Etapa 7.</p>

      <h2>Exemplo Real — Force Recovery</h2>
      <p>Prompt usado para gerar o pacote técnico:</p>
      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">Com base nas Instructions e marcações de dados abaixo, gere um pacote YAML de implementação técnica para Agentforce Salesforce, incluindo:
- agent: name, description, instructions (resumidas), primary_language, timezone
- topics: lista de tópicos que o agente cobre
- actions: ações necessárias com tipo (Flow/Apex) e descrição
- data_capture: campos a capturar com objeto Salesforce, tipo e momento
- conversation_flow: fluxo simplificado em 5 passos

[Cole suas Instructions com marcações aqui]</code></pre>
      </div>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-yaml_agente">
            Cole aqui o YAML gerado para o seu agente *
            <span>Use o prompt acima com suas Instructions da Etapa 7 e cole o resultado aqui. Se preferir, pode adaptar o prompt para o formato que seu time técnico usa.</span>
          </label>
          <textarea id="campo-yaml_agente" rows="16" placeholder="# Agent Configuration&#10;agent:&#10;  name: Meu Agente&#10;  description: ...&#10;  primary_language: pt-BR&#10;&#10;topics:&#10;  - nome: ...&#10;&#10;actions:&#10;  - nome: ...&#10;    tipo: Flow&#10;    descricao: ...">${r.yaml_agente || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você criou o artefato de transição entre negócio e tecnologia. O YAML encapsula toda a sua curadoria em um formato que o time técnico pode implementar diretamente no Salesforce, sem precisar renegociar os requisitos de negócio.
      </div>

      <button class="btn-concluir" id="btn-concluir-8" disabled>Concluir Etapa 8 →</button>`;
  }
};
