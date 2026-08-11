const Export = (() => {
  const TITULOS = {
    1: 'Escrever livremente e gerar conversa simulada',
    2: 'Revisar e ajustar a conversa simulada',
    3: 'Gerar as configurações do agente',
    4: 'Configurar, salvar e realizar os primeiros testes',
    5: 'Primeiro ciclo de ajustes',
    6: 'Ciclo de Curadoria Conversacional',
    7: 'Marcação de dados a capturar',
    8: 'Transição para Implementação Técnica',
    9: 'Teste funcional final'
  };

  function renderFinalScreen() {
    const data = Session.getOrInit();
    const { participante, empresa, area, caso_de_uso, data_inicio, optin_relatorio } = data.meta;
    const concluidas = (data.progresso && data.progresso.etapas_concluidas) || [];
    const dataFormatada = data_inicio ? data_inicio.split('T')[0] : '—';
    const email = WORKSHOP_CONFIG.instructorEmail;
    const nome = (participante || 'workshop').replace(/\s+/g, '-').toLowerCase();
    const dataStr = data_inicio ? data_inicio.split('T')[0] : 'sem-data';

    const mailtoSubject = encodeURIComponent(`Agentforce Workshop — ${participante} — ${empresa}`);
    const mailtoBody = encodeURIComponent(
      `Olá,\n\nSegue em anexo os artefatos do meu workshop Agentforce:\n\n` +
      `- workshop-${nome}-${dataStr}.pdf\n` +
      `- workshop-${nome}-${dataStr}.md\n` +
      `- session-${nome}.json\n\n` +
      `Participante: ${participante}\nEmpresa: ${empresa}\nÁrea: ${area}\nCaso de uso: ${caso_de_uso}\n\nAtenciosamente,\n${participante}`
    );

    const envioHtml = optin_relatorio ? `
      <div class="email-instructions">
        <h3>Enviar artefatos ao instrutor</h3>
        <p>Baixe os três arquivos acima e envie por email ao instrutor:</p>
        <ol>
          <li>Clique nos três botões acima para baixar <strong>PDF</strong>, <strong>MD</strong> e <strong>JSON</strong></li>
          <li>Abra seu cliente de email${email ? ` ou clique no botão abaixo` : ''}</li>
          <li>Anexe os três arquivos baixados</li>
          <li>Envie para <strong>${email || 'o email do instrutor'}</strong></li>
        </ol>
        ${email ? `<a href="mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}" class="btn-secondary" style="display:inline-block;margin-top:8px;text-decoration:none">✉ Abrir email para o instrutor</a>` : ''}
      </div>` : '';

    document.getElementById('final-content').innerHTML = `
      <div class="final-card">
        <img src="https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg" alt="Salesforce" style="display:block;margin:0 auto 20px;height:40px">
        <h1>🎉 Parabéns, ${participante}!</h1>
        <p>Você concluiu o Agentforce Workshop com sucesso.</p>
        <div class="final-summary">
          <p><strong>Participante:</strong> ${participante}</p>
          <p><strong>Empresa:</strong> ${empresa}</p>
          <p><strong>Área:</strong> ${area}</p>
          <p><strong>Caso de uso:</strong> ${caso_de_uso}</p>
          <p><strong>Data de início:</strong> ${dataFormatada}</p>
          <p><strong>Etapas concluídas:</strong> ${concluidas.length}/9</p>
        </div>
        <p style="margin-bottom:12px">Baixe os artefatos do seu workshop:</p>
        <div class="final-actions">
          <button class="btn-primary" onclick="Export.downloadPDF()">⬇ Baixar PDF</button>
          <button class="btn-primary" onclick="Export.downloadMD()">⬇ Baixar MD</button>
          <button class="btn-secondary" onclick="Session.exportJSON()">⬇ Exportar JSON</button>
        </div>
        ${envioHtml}
      </div>`;
  }

  function _buildMDContent() {
    const data = Session.getOrInit();
    const { participante, empresa, area, caso_de_uso, data_inicio } = data.meta;
    const dataFormatada = data_inicio ? data_inicio.split('T')[0] : '—';

    const LABELS = {
      descricao_livre_agente: 'Descrição livre do agente',
      ajustes_identificados: 'Ajustes identificados',
      agent_name: 'Agent Name',
      instructions: 'Instructions',
      welcome_message: 'Welcome Message',
      error_message: 'Error Message',
      oportunidades_melhoria: 'Oportunidades de melhoria',
      ajustes_aplicados: 'Ajustes aplicados',
      ciclos_realizados: 'Ciclos realizados',
      observacoes_ciclos: 'Observações por ciclo',
      dados_marcados: 'Instructions com marcações de dados',
      yaml_agente: 'YAML do agente',
      checklist_validacao: 'Checklist de validação',
      observacoes_finais: 'Observações finais'
    };

    let md = `# Agentforce Workshop — ${empresa} — ${dataFormatada}\n\n`;
    md += `## Participante\n`;
    md += `- **Nome:** ${participante}\n`;
    md += `- **Empresa:** ${empresa}\n`;
    md += `- **Área:** ${area}\n`;
    md += `- **Caso de uso:** ${caso_de_uso}\n\n`;

    for (let i = 1; i <= 9; i++) {
      md += `## Etapa ${i} — ${TITULOS[i]}\n\n`;
      const etapa = data.etapas && data.etapas[i];
      if (!etapa || !etapa.respostas) {
        md += `_Não concluída_\n\n`;
        continue;
      }
      let temConteudo = false;
      Object.entries(etapa.respostas).forEach(([key, value]) => {
        if (key === 'checklist_validacao') return;
        if (value && String(value).trim()) {
          const label = LABELS[key] || key.replace(/_/g, ' ');
          md += `### ${label}\n${value}\n\n`;
          temConteudo = true;
        }
      });
      if (!temConteudo) md += `_Sem respostas registradas_\n\n`;
    }

    return md;
  }

  function downloadMD() {
    const data = Session.getOrInit();
    const nome = (data.meta.participante || 'workshop').replace(/\s+/g, '-').toLowerCase();
    const dataStr = (data.meta.data_inicio || '').split('T')[0] || 'sem-data';
    const md = _buildMDContent();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `workshop-${nome}-${dataStr}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  function _buildPDFDoc(md) {
    if (typeof window.jspdf === 'undefined') return null;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 22;

    function addHeader() {
      doc.setFillColor(0, 112, 210);
      doc.rect(0, 0, pageWidth, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Agentforce Workshop', margin, 9);
    }

    addHeader();
    doc.setTextColor(0, 0, 0);

    const lines = md.split('\n');
    lines.forEach(line => {
      if (y > pageHeight - 20) {
        doc.addPage();
        addHeader();
        y = 22;
        doc.setTextColor(0, 0, 0);
      }
      if (line.startsWith('# ')) {
        doc.setFontSize(16); doc.setFont(undefined, 'bold');
        const split = doc.splitTextToSize(line.replace(/^# /, ''), maxWidth);
        doc.text(split, margin, y); y += split.length * 8 + 5;
      } else if (line.startsWith('## ')) {
        doc.setFontSize(13); doc.setFont(undefined, 'bold');
        doc.setFillColor(240, 247, 255);
        const split = doc.splitTextToSize(line.replace(/^## /, ''), maxWidth);
        doc.rect(margin - 2, y - 5, maxWidth + 4, split.length * 7 + 4, 'F');
        doc.text(split, margin, y); y += split.length * 7 + 6;
        doc.setFont(undefined, 'normal');
      } else if (line.startsWith('### ')) {
        doc.setFontSize(11); doc.setFont(undefined, 'bold');
        const split = doc.splitTextToSize(line.replace(/^### /, ''), maxWidth);
        doc.text(split, margin, y); y += split.length * 6 + 3;
        doc.setFont(undefined, 'normal');
      } else if (line.startsWith('- **')) {
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        const split = doc.splitTextToSize(line.replace(/^- /, '• ').replace(/\*\*/g, ''), maxWidth - 4);
        doc.text(split, margin + 4, y); y += split.length * 5.5 + 1;
      } else if (line.startsWith('- ')) {
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        const split = doc.splitTextToSize('• ' + line.replace(/^- /, ''), maxWidth - 4);
        doc.text(split, margin + 4, y); y += split.length * 5.5 + 1;
      } else if (line.startsWith('_') && line.endsWith('_')) {
        doc.setFontSize(10); doc.setFont(undefined, 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text(line.replace(/^_|_$/g, ''), margin, y); y += 7;
        doc.setTextColor(0, 0, 0); doc.setFont(undefined, 'normal');
      } else if (line.trim()) {
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        const split = doc.splitTextToSize(line, maxWidth);
        doc.text(split, margin, y); y += split.length * 5.5 + 1;
      } else {
        y += 3;
      }
    });

    return doc;
  }

  function downloadPDF() {
    if (typeof window.jspdf === 'undefined') {
      alert('Biblioteca jsPDF não carregada. Verifique sua conexão e recarregue a página.');
      return;
    }
    const data = Session.getOrInit();
    const nome = (data.meta.participante || 'workshop').replace(/\s+/g, '-').toLowerCase();
    const dataStr = (data.meta.data_inicio || '').split('T')[0] || 'sem-data';
    const doc = _buildPDFDoc(_buildMDContent());
    if (doc) doc.save(`workshop-${nome}-${dataStr}.pdf`);
  }

  return { renderFinalScreen, downloadMD, downloadPDF };
})();
