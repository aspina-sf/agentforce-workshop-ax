if (typeof ETAPAS === 'undefined') window.ETAPAS = {};

ETAPAS[1] = {
  titulo: 'Escrever livremente e gerar conversa simulada',
  tempo: '20 min',
  topicos: ['Objetivos', 'Teoria', 'Exemplo', 'Prática', 'Recap'],
  campos: [
    { key: 'ia_utilizada', obrigatorio: false },
    { key: 'descricao_livre_agente', obrigatorio: true },
    { key: 'resposta_ia', obrigatorio: false }
  ],
  renderContent(etapaData) {
    const r = etapaData.respostas || {};
    const isMkt = ((Session.load() || {}).meta || {}).caso_exemplo === 'marketing';

    const variant = isMkt ? {
      exTitle: 'Exemplo Real — Martechforce',
      exIntro: `A <strong>Martechforce</strong> é uma empresa fictícia especializada em marketing digital. O time da <strong>Dafiti</strong> contratou a plataforma para automatizar a criação de campanhas. O analista de marketing enviou para a IA o seguinte prompt para gerar uma conversa simulada:`,
      exPrompt: `Crie um exemplo realista de diálogo entre um analista de marketing da Dafiti e um agente especializado na criação de campanhas de marketing.

O agente deve conduzir todo o trabalho de forma colaborativa, desde o recebimento da demanda até a campanha ficar pronta para publicação. O diálogo deve mostrar como ele transforma uma solicitação inicial, mesmo que incompleta, em um briefing estruturado e em um plano de campanha.

Durante a conversa, o agente deve ajudar o analista a definir objetivo, público, oferta, produtos ou categorias, canais, período, orçamento, frequência de contato, indicadores de sucesso e restrições da campanha. Quando faltar informação, deve fazer perguntas claras e apresentar sugestões práticas para facilitar as decisões.

A campanha pode combinar email, SMS, push, WhatsApp, mídia paga e comunicação no site ou aplicativo. Quando fizer sentido, inclua uma jornada com diferentes etapas, esperas e caminhos de retargeting baseados no comportamento do cliente, como abertura, clique, visita ao produto, abandono de carrinho e compra.

O agente também deve:
- sugerir a audiência e as exclusões necessárias;
- estimar o tamanho do público quando possível;
- definir a sequência e o calendário das comunicações;
- criar sugestões de assunto, texto, chamada para ação e conceito visual;
- produzir um briefing para os criativos;
- apresentar os criativos ao analista para revisão;
- receber comentários e gerar uma nova versão;
- solicitar aprovação explícita do conteúdo, da audiência, da jornada e do calendário;
- apresentar uma prévia final da campanha;
- realizar uma checagem de qualidade antes da publicação;
- nunca publicar ou iniciar disparos sem a confirmação final do analista;
- explicar como a campanha será acompanhada e otimizada após o lançamento.

Mostre claramente os momentos de decisão e aprovação. O agente deve informar o que já foi definido, o que ainda está pendente e quais serão os próximos passos.

Escreva a conversa em português do Brasil, usando linguagem natural e termos comuns de times de marketing, sem termos técnicos de tecnologia. Evite respostas excessivamente longas e faça o diálogo parecer uma interação real de trabalho.

Use como cenário uma campanha da Dafiti relacionada a um evento real e próximo do universo de uma prova de corrida, a Corrida e Troféu da Independência. Considere que o objetivo comercial é aumentar a venda de tênis, roupas e acessórios esportivos. Crie uma jornada que contemple descoberta, consideração, abandono e conversão.

Ao final, apresente um resumo contendo: briefing aprovado, audiência, canais, jornada, calendário, criativos aprovados, indicadores de sucesso, responsáveis e status da campanha. Termine com o agente solicitando a aprovação final para programar a campanha.

Estruture o diálogo em etapas curtas. Depois de cada etapa importante, faça uma pausa para que o analista possa validar a decisão antes de continuar. Não presuma aprovações.`,
      exOutro: `Com esse prompt, a IA gerou uma conversa simulada completa que o time da Dafiti usou como base para todos os refinamentos seguintes.`
    } : {
      exTitle: 'Exemplo Real — Force Recovery',
      exIntro: `A <strong>Force Recovery</strong> é uma empresa de recuperação de crédito B2B que atua em nome de credores, negociando dívidas com representantes de empresas devedoras. O time de cobrança enviou para a IA o seguinte prompt para gerar uma conversa simulada:`,
      exPrompt: `Gere uma conversa entre um agente de cobrança da Force Recovery que atua em nome da XPTO Comercial Ltda. e um representante de um CNPJ responsável por negociar a pendência. Este agente de cobrança, construído no New Builder do Agentforce, deve usar de persuasão para ter sucesso da negociação.

Ele deve iniciar da seguinte forma: Olá! Sou o agente de IA da Force Recovery. Com quem eu falo, por favor? Caso a pessoa não queira informar o nome, não há problemas, ele deve apenas informar que gostaria de saber o nome para realizar um atendimento mais humanizado. Então deve solicitar o CNPJ e informar que precisa da confirmação do CNPJ por motivos de segurança da informação. O nome do representante é Carlos e ele fornece o CNPJ. Invente um CNPJ.

Então o Agentforce carrega um conjunto de informações sobre esta dívida:

Credor: XPTO Comercial Ltda.
Documento: Nota Fiscal 83772
Data da emissão: 20/06/2026
Valor original: R$ 774,78

Opções de pagamento:
À vista: R$ 1.000,01
2 parcelas semanais de R$ 500,01
3 parcelas semanais de R$ 333,34
4 parcelas semanais de R$ 250,01
5 parcelas semanais de R$ 200,01
6 parcelas semanais de R$ 166,67
7 parcelas semanais de R$ 142,86
8 parcelas semanais de R$ 125,01
2 parcelas quinzenais de R$ 500,01
3 parcelas quinzenais de R$ 333,34
4 parcelas quinzenais de R$ 250,01
2 parcelas mensais de R$ 500,01
3 parcelas mensais de R$ 333,34

Porém, o agente não deve exibir todas estas opções de uma vez, isso pode confundir o representante. Ele deve iniciar oferecendo o valor à vista como sendo a opção de maior benefício, mas o representante pergunta se não há opções de parcelamento. Então o Agentforce pergunta que formato de parcelamento ele prefere: semanal, quinzenal ou mensal. O representante informa que seria melhor mensal.

Então o agente oferece, no máximo, três opções de pagamento dentre os critérios que o representante solicitar e abre mais opções caso o representante não considere as opções já apresentadas até aquele momento.

O representante diz que não vai pagar isso, que tem outras prioridades. O agente tem que usar persuasão, sendo firme sem ser invasivo, e explicar a importância de liquidar a pendência e os impactos comerciais aplicáveis.

Enfim, o representante aceita alguma das opções de parcelamento. O agente comemora, agradece e pede os dados para efetivação do acordo: e-mail, telefone, nome completo e cargo do representante.

Então informa que o boleto será emitido para vencimento na data de hoje. Isso gera um impasse porque o representante precisa de alguns dias para programar o processo. O agente diz que tem permissão apenas para emissão no dia ou, no máximo, dia seguinte por conta do cálculo de juros. Pergunta se o boleto poderia ser liquidado amanhã.

O representante diz que vai tentar e pede para emitir o acordo. O agente agradece o esforço e enfim emite o acordo (Crie um link de contrato digital fictício). O agente informa que o boleto será enviado por e-mail assim que o contrato digital for assinado.`,
      exOutro: `Com esse prompt, a IA gerou uma conversa simulada completa que o time da Force Recovery usou como base para todos os refinamentos seguintes.`
    };

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

      <h2>${variant.exTitle}</h2>
      <p>${variant.exIntro}</p>

      <div class="content-box">
        <div class="content-box-header">
          <button class="btn-copy">Copiar</button>
          <button class="btn-expand">Expandir</button>
        </div>
        <pre><code class="language-text">${variant.exPrompt}</code></pre>
      </div>

      <p>${variant.exOutro}</p>

      <h2>Prática — Sua vez</h2>
      <div class="practice-section">
        <div class="practice-field">
          <label class="field-label" for="campo-ia_utilizada">
            Qual IA você vai usar para desenvolver o diálogo?
            <span>Ex: ChatGPT, Claude, Microsoft Copilot, Gemini…</span>
          </label>
          <input type="text" id="campo-ia_utilizada" placeholder="Ex: ChatGPT" value="${r.ia_utilizada || ''}">
        </div>

        <div class="practice-field">
          <label class="field-label" for="campo-descricao_livre_agente">
            Descreva livremente o agente que você quer construir *
            <span>Escreva como se estivesse explicando para um colega. Inclua: o que o agente faz, para quem, qual o tom, quais informações coleta ou oferece, e o que ele não deve fazer.</span>
          </label>
          <textarea id="campo-descricao_livre_agente" rows="10" placeholder="Ex: Quero um agente que...">${r.descricao_livre_agente || ''}</textarea>
        </div>

        <div class="practice-field">
          <label class="field-label" for="campo-resposta_ia">
            Resposta da IA
            <span>Cole aqui a conversa simulada gerada pela IA com base no seu prompt acima.</span>
          </label>
          <textarea id="campo-resposta_ia" rows="12" placeholder="Cole aqui a resposta da IA…">${r.resposta_ia || ''}</textarea>
        </div>
      </div>

      <h2>Recap</h2>
      <div class="recap-box">
        Você transformou sua ideia em texto estruturado e gerou a primeira conversa simulada. Essa simulação é o seu primeiro protótipo — nas próximas etapas você vai revisá-la, ajustá-la e transformá-la nas configurações reais do Agentforce.
      </div>

      <button class="btn-concluir" id="btn-concluir-1" disabled>Concluir Etapa 1 →</button>`;
  }
};
