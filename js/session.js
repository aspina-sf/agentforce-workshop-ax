const SESSION_KEY = 'agentforce_workshop_session';

const Session = (() => {
  function _defaultData() {
    return {
      meta: { participante: '', empresa: '', area: '', caso_de_uso: '', data_inicio: new Date().toISOString(), versao_guia: '1.0' },
      progresso: { etapa_atual: 1, etapas_concluidas: [] },
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

  return { load, save, clear, getEtapa, setEtapaResposta, concluirEtapa, setMeta, exportJSON, getOrInit };
})();
