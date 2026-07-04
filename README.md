# Clínica Geral da Advocacia

Landing page de **validação local** para a proposta de **acesso jurídico recorrente por assinatura**. A ideia central: assim como uma clínica geral oferece um primeiro atendimento e direcionamento na saúde, a **Clínica Geral da Advocacia** oferece acesso recorrente, organizado e humanizado a orientação e suporte jurídico para pessoas físicas e empresas.

> **Mensagem principal:** _“Cuidado jurídico recorrente para sua vida e para sua empresa.”_

Esta versão é apenas **front-end com dados mockados** — sem pagamento, login ou backend. A estrutura já foi pensada para receber essas integrações futuramente.

---

## ✨ Características

- Visual premium, moderno e institucional (azul petróleo + dourado discreto + verde sofisticado).
- Glassmorphism, gradientes, sombras suaves e **animações sutis de entrada** (reveal on scroll).
- **Totalmente responsivo**: layout ideal para mobile e para notebook/PC.
- Navegação com **scroll suave** e **menu hamburguer** no mobile.
- Seção de **planos** fácil de comparar, com destaques.
- Mockup visual do **painel do cliente** (HTML/CSS, sem imagem externa).
- Botão flutuante de **WhatsApp**.
- Código **modular, limpo e comentado**.

---

## 🧰 Tecnologias

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/) (servidor de desenvolvimento e build)
- [Tailwind CSS 3](https://tailwindcss.com/) (estilização)
- [lucide-react](https://lucide.dev/) (ícones)

---

## 🚀 Como rodar localmente

Pré-requisito: **Node.js 18+** instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o servidor de desenvolvimento
npm run dev
```

O Vite abre automaticamente em **http://localhost:5173**.

Outros comandos:

```bash
npm run build     # gera a versão de produção em /dist
npm run preview   # pré-visualiza o build de produção
```

---

## 📁 Estrutura de pastas

```
clinica-geral-da-advocacia/
├─ public/
│  ├─ favicon.svg
│  └─ assets/
│     ├─ LEIA-ME.txt              # instruções das imagens
│     └─ responsaveis-juridicos.jpg   (você adiciona — foto dos responsáveis)
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx               # navbar fixa + menu mobile
│  │  ├─ Hero.jsx                 # primeira dobra + mockup
│  │  ├─ ProblemSection.jsx       # o problema
│  │  ├─ SolutionSection.jsx      # a solução + jornada
│  │  ├─ Differentials.jsx        # diferenciais
│  │  ├─ PlansSection.jsx         # planos (lê src/data/plans.js)
│  │  ├─ AudienceSections.jsx     # pessoas físicas + empresas
│  │  ├─ LegalTeamSection.jsx     # responsáveis jurídicos (lê src/data/legalTeam.js)
│  │  ├─ HowItWorks.jsx           # passo a passo
│  │  ├─ DashboardMockup.jsx      # mockup do sistema
│  │  ├─ InnovationSection.jsx    # prova de conceito / inovação
│  │  ├─ FAQ.jsx                  # perguntas e respostas
│  │  ├─ FinalCTA.jsx             # chamada final
│  │  ├─ Footer.jsx               # rodapé + aviso de validação
│  │  ├─ WhatsappFloat.jsx        # botão flutuante de WhatsApp
│  │  ├─ Reveal.jsx               # wrapper de animação
│  │  └─ SectionHeading.jsx       # título de seção reutilizável
│  ├─ data/
│  │  ├─ plans.js                 # >>> PLANOS (preços e benefícios)
│  │  ├─ legalTeam.js             # >>> RESPONSÁVEIS JURÍDICOS
│  │  └─ siteConfig.js            # >>> WHATSAPP, marca e menu
│  ├─ hooks/
│  │  └─ useReveal.js             # hook de animação on scroll
│  ├─ App.jsx                     # monta todas as seções
│  ├─ main.jsx
│  └─ index.css                   # base Tailwind + utilitários
├─ index.html
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

---

## ✏️ Onde editar cada coisa

| O que você quer mudar | Arquivo |
| --- | --- |
| **Planos** (preço, nome, benefícios, destaques, texto do botão) | `src/data/plans.js` |
| **Responsáveis jurídicos** (nome, cargo, OAB, descrição, foto) | `src/data/legalTeam.js` |
| **Link do WhatsApp** e **nome da marca** | `src/data/siteConfig.js` |
| **Itens do menu** | `src/data/siteConfig.js` (`navItems`) |
| **Cores / fontes / sombras** | `tailwind.config.js` |
| **Textos das seções** | componente correspondente em `src/components/` |

### 📸 Trocar a foto dos responsáveis jurídicos

1. Salve a foto enviada como:
   ```
   public/assets/responsaveis-juridicos.jpg
   ```
   (a mesma foto é usada nos dois cards, enquadrando lado esquerdo e direito).
2. Para fotos **individuais**, salve cada imagem em `public/assets/` e edite o campo `photo` em `src/data/legalTeam.js`.
3. Enquanto a imagem não existir, o site mostra um **placeholder com as iniciais** — o layout não quebra.

### 📱 Link do WhatsApp

Por padrão é um placeholder: `https://wa.me/5500000000000`.
Edite `siteConfig.whatsapp` em `src/data/siteConfig.js` com o número real (formato `55` + DDD + número).

---

## 🧭 Próximos passos sugeridos

- [ ] Integrar **gateway de pagamento** (assinaturas) aos botões dos planos.
- [ ] Criar **cadastro/login** e a **área do cliente** (o mockup já mostra a referência visual).
- [ ] Conectar a um **backend** (solicitações, contratos, processos, relatórios).
- [ ] Substituir textos, fotos e registros (OAB) pelos dados reais.
- [ ] Revisão jurídica dos termos, condições e da Política de Privacidade.
- [ ] Configurar domínio, SEO e analytics para publicação.

---

## ⚠️ Aviso

Esta página é uma versão de validação local. Informações, condições e termos jurídicos deverão ser revisados pelos responsáveis jurídicos antes da publicação oficial. O conteúdo **não promete resultado jurídico** e os serviços são prestados conforme as condições do plano contratado, análise de viabilidade e termos aplicáveis.
