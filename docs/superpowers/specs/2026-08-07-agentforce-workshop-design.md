# Design Spec: Agentforce Workshop Interativo
**Data:** 2026-08-07  
**Status:** Aprovado  
**Autor:** Daniel Bermudo (conteúdo) / Claude Code (spec técnico)

---

## Visão Geral

Aplicação web interativa hospedada no GitHub Pages que guia usuários de negócio Salesforce pelo processo completo de construção e curadoria conversacional de um agente Agentforce. Segue as 9 etapas do "Guia Prático de Construção e Curadoria Conversacional para Agentforce" (v1, 02/08/2026).

O participante avança progressivamente pelas etapas, preenchendo campos personalizados ao longo do caminho. Ao final, gera dois artefatos para download: um PDF formatado (guia + respostas) e um MD estruturado (pronto para importação por qualquer IA).

---

## Público-Alvo

Usuários de negócio Salesforce das áreas de Marketing, Vendas e Serviço que precisam transformar suas atividades em agentes Agentforce. Sem conhecimento técnico de programação ou metadata Salesforce.

---

## Stack Técnica

- **Hospedagem:** GitHub Pages (repositório `agentforce-workshop-ax`)
- **Frontend:** HTML + CSS + JavaScript vanilla (sem frameworks)
- **Bibliotecas (CDN):**
  - `jsPDF` — geração de PDF
  - `html2canvas` — captura de seções para PDF
  - `highlight.js` — syntax highlighting nos content boxes
- **Persistência:** `localStorage` (auto-save) + File System Access API (salvar em disco)
- **Sem backend** — tudo roda no browser

---

## Estrutura de Arquivos

```
agentforce-workshop-ax/
├── index.html                  ← entry point / journey shell
├── css/
│   └── workshop.css            ← layout, componentes, tema Salesforce
├── js/
│   ├── journey.js              ← controle de progresso e desbloqueio de etapas
│   ├── session.js              ← leitura/escrita localStorage e session.json
│   └── export.js               ← geração de PDF (jsPDF) e MD (template)
├── content/
│   ├── etapa-1.js              ← conteúdo: teoria + exemplo + prática
│   ├── etapa-2.js
│   ├── etapa-3.js
│   ├── etapa-4.js
│   ├── etapa-5.js
│   ├── etapa-6.js
│   ├── etapa-7.js
│   ├── etapa-8.js
│   ├── etapa-9.js
│   └── templates/
│       ├── report.md           ← template do artefato MD final
│       └── intro.js            ← tela de boas-vindas e coleta de dados do participante
└── assets/
    └── salesforce-logo.svg
```

---

## Layout — Estilo Trailhead

Layout de duas colunas, inspirado no Trailhead:

```
┌─────────────────────────────────────────────┬──────────────────────┐
│  Conteúdo principal (70%)                   │  Sidebar (30%)       │
│                                             │                      │
│  # Etapa N — Título                         │  ⏱ Estimativa        │
│  ## Objetivos de Aprendizado                │                      │
│  [callout box amarela — destaque principal] │  Tópicos             │
│  ## Teoria                                  │  ─────────────       │
│  ## Exemplo Real (Force Recovery)           │  ▶ Objetivos         │
│  [content box copiável]                     │    Teoria            │
│  ## Prática — Sua vez                       │    Exemplo           │
│  [formulário personalizado]                 │    Prática           │
│  ## Recap                                   │    Recap             │
│  [botão "Concluir Etapa"]                   │                      │
│                                             │  ████████░░ 4/9      │
└─────────────────────────────────────────────┴──────────────────────┘
```

**Barra de progresso global** no topo: 9 bolinhas (1–9), cada uma preenche ao concluir a etapa.

---

## Componentes de UI

### 1. Callout Box Amarela
- Uma por etapa, posicionada logo após os objetivos
- Contém o principal destaque/alerta da etapa
- Fundo amarelo claro (#FFF3CD), borda esquerda âmbar, ícone de aviso

### 2. Content Box Copiável
Suporta quatro tipos de conteúdo com syntax highlighting:
- `text` — narrativa/prompts longos (fundo cinza claro)
- `js` — código JavaScript
- `json` — estruturas de dados
- `yaml` — configurações de agente

Dois botões no canto superior direito:
- **Copiar** — copia o conteúdo para a área de transferência
- **Expandir/Recolher** — alterna entre altura fixa (5 linhas) e altura total

### 3. Instruções Numeradas
Passos de 1 a N com elementos de UI em **negrito**, sub-itens aninhados e valores a copiar em destaque `inline code`.

### 4. Campos de Prática
Inputs e textareas onde o participante registra informações da sua empresa/caso de uso. Cada campo tem label descritivo e placeholder orientador. Alimentam o `session.json` a cada keystroke.

### 5. Sidebar de Tópicos
- Lista os sub-títulos da etapa
- Scroll-spy: marca o tópico ativo conforme o participante rola a página
- Estimativa de tempo no topo
- Barra de progresso global no rodapé

### 6. Botão "Concluir Etapa"
- Aparece no final de cada etapa
- Estado desabilitado (cinza) enquanto campos obrigatórios da Prática não estão preenchidos
- Estado ativo (azul Salesforce) quando todos os campos estão preenchidos
- Ao clicar: marca etapa como concluída, anima a bolinha do progresso, rola para o topo da próxima etapa

---

## Tela de Boas-Vindas (Introdução)

Antes da Etapa 1, o participante preenche:
- Nome completo
- Empresa
- Área (Marketing / Vendas / Serviço / Outra)
- Caso de uso que quer construir (textarea livre)

Esses dados alimentam o `session.json` e personalizam os artefatos finais.

---

## Estrutura das 9 Etapas

Cada etapa tem exatamente estas seções:

1. **Objetivos de Aprendizado** — lista com bullets
2. **Callout Box Amarela** — destaque principal
3. **Teoria** — conceito da etapa
4. **Exemplo Real** — caso Force Recovery / XPTO Comercial Ltda. (fio condutor único em todas as etapas)
5. **Prática — Sua vez** — campos personalizados do participante
6. **Recap** — síntese em 2-3 linhas
7. **Botão "Concluir Etapa"**

### Mapeamento de conteúdo por etapa

| Etapa | Título | Content Boxes | Campos de Prática |
|---|---|---|---|
| 1 | Escrever livremente e gerar conversa simulada | Exemplo Force Recovery (text) | Textarea: descrição livre do agente |
| 2 | Revisar e ajustar a conversa simulada | Prompt perfeito de revisão (text) | Textarea: ajustes identificados |
| 3 | Gerar as configurações do agente | Prompt perfeito de geração (text) + lista dos 10 campos | Campos: Agent Name, Instructions, Welcome/Error Message |
| 4 | Configurar, salvar e realizar os primeiros testes | Passo a passo Agentforce New Builder | Textarea: registro de oportunidades de melhoria (6 colunas) |
| 5 | Primeiro ciclo de ajustes | Prompt perfeito de ajuste (text) | Textarea: planilha de ajustes preenchida |
| 6 | Ciclo de Curadoria Conversacional | Checklist dos 6 passos | Contador de ciclos realizados + textarea por ciclo |
| 7 | Marcação de dados a capturar | Exemplo de marcação (text) | Textarea: dados a capturar marcados nas instruções |
| 8 | Transição para Implementação Técnica | Prompt perfeito de transição (text) | Textarea: YAML do agente para gerar pacote técnico |
| 9 | Teste funcional final | Checklist de validação final (6 itens) | Checkboxes + textarea: observações do teste |

---

## Desbloqueio Progressivo

- Etapas 2–9 ficam bloqueadas (cadeado visível na sidebar) até a conclusão da anterior
- A Etapa 1 é desbloqueada após o preenchimento da tela de boas-vindas
- O estado de bloqueio é salvo no `session.json`
- O participante pode **rever** etapas já concluídas a qualquer momento, mas não pode editar após concluir sem desbloquear explicitamente

---

## Persistência — session.json

```json
{
  "meta": {
    "participante": "Nome Completo",
    "empresa": "Acme Corp",
    "area": "Vendas",
    "caso_de_uso": "Agente de cobrança B2B",
    "data_inicio": "2026-08-07T09:00:00",
    "versao_guia": "1.0"
  },
  "progresso": {
    "etapa_atual": 3,
    "etapas_concluidas": [1, 2]
  },
  "etapas": {
    "1": {
      "concluida": true,
      "timestamp_conclusao": "2026-08-07T09:25:00",
      "respostas": {
        "descricao_livre_agente": "..."
      }
    },
    "2": {
      "concluida": true,
      "timestamp_conclusao": "2026-08-07T09:45:00",
      "respostas": {
        "ajustes_identificados": "..."
      }
    }
  }
}
```

**Auto-save:** a cada keystroke via `localStorage`. O participante pode exportar o `session.json` para disco a qualquer momento via botão "Salvar progresso" no header.

**Retomada:** ao abrir a URL, se houver sessão no `localStorage`, oferecer "Continuar de onde parei" ou "Nova sessão".

---

## Artefatos de Saída

### 1. `workshop-[nome]-[data].md`
Estruturado para consumo por qualquer IA. Seção por etapa com respostas do participante inseridas.

```markdown
# Agentforce Workshop — Acme Corp — 2026-08-07

## Participante
- **Nome:** Fulano de Tal
- **Empresa:** Acme Corp
- **Área:** Vendas
- **Caso de uso:** Agente de cobrança B2B

## Etapa 1 — Escrever livremente e gerar conversa simulada
### Descrição livre do agente
[conteúdo preenchido pelo participante]

## Etapa 2 — Revisar e ajustar a conversa simulada
### Ajustes identificados
[conteúdo preenchido pelo participante]

...
```

### 2. `workshop-[nome]-[data].pdf`
Mesmo conteúdo do MD, formatado visualmente:
- Cabeçalho com logo Salesforce/Agentforce
- Numeração de etapas
- Caixas de destaque para respostas do participante
- Gerado via `jsPDF` + `html2canvas`

**Ambos os artefatos** são gerados na tela final (após Etapa 9) e salvos via File System Access API (Chrome/Edge) ou download (Safari/Firefox).

---

## Tela Final (após Etapa 9)

- Mensagem de parabéns
- Resumo: nome, empresa, data, etapas concluídas
- Dois botões:
  - **Baixar PDF** — `workshop-[nome]-[data].pdf`
  - **Baixar MD** — `workshop-[nome]-[data].md`
- Botão secundário: **Exportar session.json**

---

## Decisões de Design

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Vanilla JS | Zero dependências de build, abre com duplo-clique se necessário |
| Hospedagem | GitHub Pages | Distribuição por URL, atualizações automáticas, sem servidor |
| Exemplo real | Force Recovery (único) | Consistência narrativa ao longo das 9 etapas |
| Bloqueio de edição | Após conclusão, readonly | Preserva integridade dos artefatos finais |
| Fallback de download | Sempre disponível | Compatibilidade com Safari e ambientes corporativos |
| Idioma | Português do Brasil | Público-alvo e conteúdo do guia |

---

## Fora de Escopo

- Etapa F (Observabilidade) — não está no guia v1
- Backend de qualquer tipo
- Autenticação ou contas de usuário
- Colaboração em tempo real entre participantes
- Integração direta com Salesforce/Agentforce API
