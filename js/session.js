const SESSION_KEY = 'agentforce_workshop_session';

const WORKSHOP_CONFIG = {
  // Preencha com a URL do Google Apps Script antes de distribuir o workshop.
  // Deixe vazio ('') para desabilitar o envio automático.
  gasEndpoint: ''
};

const Session = (() => {
  function _defaultData() {
    return {
      meta: {
        participante: '',
        empresa: '',
        area: '',
        caso_de_uso: '',
        email: '',
        optin_relatorio: false,
        data_inicio: new Date().toISOString(),
        versao_guia: '1.0'
      },
      progresso: {
        etapa0_concluida: false,
        etapa_atual: 1,
        etapas_concluidas: []
      },
      etapas: {}
    };
  }

  function load() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function save(data) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }

  function clear() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getOrInit() {
    return load() || _defaultData();
  }

  function getEtapa(n) {
    const data = getOrInit();
    return data.etapas[n] || { concluida: false, timestamp_conclusao: null, respostas: {} };
  }

  function setEtapaResposta(n, key, value) {
    const data = getOrInit();
    if (!data.etapas[n]) data.etapas[n] = { concluida: false, timestamp_conclusao: null, respostas: {} };
    data.etapas[n].respostas[key] = value;
    save(data);
  }

  function concluirEtapa(n) {
    const data = getOrInit();
    if (!data.etapas[n]) data.etapas[n] = { concluida: false, timestamp_conclusao: null, respostas: {} };
    data.etapas[n].concluida = true;
    data.etapas[n].timestamp_conclusao = new Date().toISOString();
    if (!data.progresso.etapas_concluidas.includes(n)) data.progresso.etapas_concluidas.push(n);
    data.progresso.etapa_atual = n + 1;
    save(data);
  }

  function concluirEtapa0(email, optin) {
    const data = getOrInit();
    data.meta.email = email;
    data.meta.optin_relatorio = optin;
    data.progresso.etapa0_concluida = true;
    if (!data.etapas[0]) data.etapas[0] = { concluida: false, timestamp_conclusao: null, respostas: {} };
    data.etapas[0].concluida = true;
    data.etapas[0].timestamp_conclusao = new Date().toISOString();
    save(data);
  }

  function setMeta(fields) {
    const data = getOrInit();
    Object.assign(data.meta, fields);
    save(data);
  }

  function exportJSON() {
    const data = getOrInit();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `session-${(data.meta.participante || 'workshop').replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function sendToGAS() {
    const data = getOrInit();
    if (!data.meta.optin_relatorio) return;
    if (!WORKSHOP_CONFIG.gasEndpoint) return;

    const payload = {
      participante: data.meta.participante,
      empresa: data.meta.empresa,
      area: data.meta.area,
      email: data.meta.email,
      caso_de_uso: data.meta.caso_de_uso,
      data_inicio: data.meta.data_inicio,
      etapas_concluidas: data.progresso.etapas_concluidas.length,
      resumo: _buildResumoPayload(data)
    };

    fetch(WORKSHOP_CONFIG.gasEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  function _buildResumoPayload(data) {
    const campos = {
      descricao_livre_agente: 'Descrição do agente',
      ajustes_identificados: 'Ajustes identificados',
      agent_name: 'Agent Name',
      instructions: 'Instructions',
      welcome_message: 'Welcome Message',
      oportunidades_melhoria: 'Oportunidades de melhoria',
      ajustes_aplicados: 'Ajustes aplicados',
      ciclos_realizados: 'Ciclos realizados',
      observacoes_ciclos: 'Observações por ciclo',
      dados_marcados: 'Instructions com dados',
      yaml_agente: 'YAML do agente',
      observacoes_finais: 'Observações finais'
    };
    let resumo = '';
    for (let i = 1; i <= 9; i++) {
      const etapa = data.etapas && data.etapas[i];
      if (!etapa || !etapa.respostas) continue;
      Object.entries(etapa.respostas).forEach(([key, value]) => {
        if (value && String(value).trim() && campos[key]) {
          resumo += `[Etapa ${i}] ${campos[key]}: ${String(value).slice(0, 300)}\n`;
        }
      });
    }
    return resumo;
  }

  return { load, save, clear, getEtapa, setEtapaResposta, concluirEtapa, concluirEtapa0, setMeta, exportJSON, sendToGAS, getOrInit };
})();
