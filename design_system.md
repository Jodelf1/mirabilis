# MIRABILIS — Design System

## 1. Princípios de design

O design system do Mirabilis deve transmitir:

* confiança;
* precisão;
* clareza;
* estabilidade;
* modernidade;
* eficiência;
* sofisticação;
* identidade africana subtil.

A interface deve parecer um produto B2B profissional, não um dashboard SaaS genérico.

A linguagem visual combina **formas orgânicas e estruturadas**.

A regra principal de forma é:

> **Interação suave. Estrutura sólida.**

Elementos que convidam à interação podem utilizar cantos arredondados.

Elementos que representam estrutura, informação ou organização devem utilizar cantos mais retos.

Isso cria contraste visual sem tornar a interface inconsistente.

---

# 2. Tipografia

## Família

Utilizar exclusivamente **Lexend** como família tipográfica principal.

A Lexend deve ser carregada em diferentes pesos.

Pesos recomendados:

```text
Lexend 400 — Regular
Lexend 500 — Medium
Lexend 600 — SemiBold
Lexend 700 — Bold
```

Não utilizar pesos excessivamente pesados de forma generalizada.

A hierarquia deve ser criada principalmente através de:

* tamanho;
* peso;
* espaçamento;
* contraste;
* posição.

---

# 3. Uso de itálico

O itálico deve ser utilizado de forma intencional e limitada.

Pode ser utilizado para:

* pequenas frases de destaque;
* mensagens institucionais;
* subtítulos editoriais;
* palavras-chave em apresentações;
* microcopy contextual.

Não utilizar itálico em:

* tabelas;
* valores financeiros;
* botões;
* títulos principais;
* labels;
* navegação.

O itálico deve funcionar como um elemento de personalidade, não como parte da hierarquia padrão.

---

# 4. Escala tipográfica

Utilizar uma escala consistente.

```text
Display
48px / 56px
Weight 600

H1
36px / 44px
Weight 600

H2
28px / 36px
Weight 600

H3
22px / 30px
Weight 600

H4
18px / 26px
Weight 600

Body Large
16px / 24px
Weight 400

Body
14px / 22px
Weight 400

Body Small
13px / 20px
Weight 400

Caption
12px / 18px
Weight 500
```

Em dashboards, priorizar `14px` e `16px` para conteúdo operacional.

Valores financeiros importantes podem utilizar `20px`–`28px`, dependendo do contexto.

---

# 5. Cores

## Brand Colors

### Jungle Teal

```text
#32866D
```

Cor principal da marca.

Utilização:

* primary buttons;
* links;
* elementos selecionados;
* indicadores positivos;
* elementos de navegação ativos;
* gráficos principais;
* branding.

---

### Cinnamon Wood

```text
#B85C3A
```

Cor secundária.

Utilização:

* acentos;
* highlights;
* gráficos secundários;
* elementos de destaque;
* pequenas chamadas visuais.

Não utilizar como cor principal de grandes áreas.

Evitar utilizar Cinnamon Wood simultaneamente com Jungle Teal em excesso.

---

### Evergreen

```text
#0D2923
```

Cor estrutural profunda.

Utilização:

* sidebar;
* cabeçalhos especiais;
* texto de elevada importância;
* fundos escuros;
* elementos institucionais;
* logo em determinadas aplicações.

---

## Neutral Colors

### Soft Linen

```text
#F5F0E6
```

Background quente.

Utilização:

* backgrounds secundários;
* áreas de destaque;
* páginas especiais;
* empty states;
* áreas editoriais.

---

### White

```text
#FFFFFF
```

Utilização:

* cards;
* conteúdo principal;
* formulários;
* tabelas;
* superfícies.

---

### Carbon Black

```text
#202421
```

Cor principal de texto.

Utilização:

* títulos;
* corpo de texto;
* valores;
* informações importantes.

---

# 6. Hierarquia de cores

A interface deve seguir aproximadamente:

```text
White
        ↓
Jungle Teal
        ↓
Evergreen
        ↓
Soft Linen
        ↓
Cinnamon Wood
```

A cor deve ser utilizada para estabelecer hierarquia, não apenas decoração.

A maior parte da interface deve permanecer neutra.

Jungle Teal deve chamar atenção para ações.

Cinnamon Wood deve chamar atenção para informações específicas.

Evergreen deve criar profundidade e estrutura.

---

# 7. Backgrounds

### Principal

```text
#FFFFFF
```

Utilizado na maior parte da aplicação.

### Secundário

```text
#F5F0E6
```

Utilizado para criar separação entre áreas.

### Dark

```text
#0D2923
```

Utilizado principalmente para:

* sidebar;
* áreas institucionais;
* componentes de destaque.

Não utilizar dark background em toda a aplicação.

---

# 8. Border

A interface deve utilizar bordas de forma intencional.

Cor padrão:

```text
rgba(32, 36, 33, 0.10)
```

Border forte:

```text
rgba(32, 36, 33, 0.18)
```

Bordas devem ser discretas.

Evitar colocar borders em todos os elementos simultaneamente.

---

# 9. Border Radius

O sistema deve combinar cantos arredondados e retos.

Não utilizar um único `border-radius` global.

### Sharp

```text
0px
```

Utilização:

* tabelas;
* divisores;
* elementos estruturais;
* alguns containers;
* sidebar;
* áreas institucionais.

### Subtle

```text
4px
```

Utilização:

* inputs;
* tabelas;
* pequenos componentes;
* elementos utilitários.

### Standard

```text
8px
```

Utilização:

* cards;
* dropdowns;
* modais;
* campos de formulário;
* componentes gerais.

### Soft

```text
12px
```

Utilização:

* botões;
* cards destacados;
* componentes interativos;
* filtros.

### Organic

```text
20px
```

Utilização:

* elementos especiais;
* hero sections;
* destaques;
* elementos de branding.

### Full

```text
9999px
```

Utilização exclusiva para:

* avatars;
* badges;
* status pills;
* elementos circulares.

---

# 10. Regra de combinação de formas

O Mirabilis deve utilizar uma combinação deliberada:

```text
ESTRUTURA
└── mais reta

CONTEÚDO
└── moderadamente arredondado

INTERAÇÃO
└── mais arredondada

BRANDING
└── formas orgânicas
```

Exemplo:

```text
Sidebar
→ cantos retos

Tabela
→ cantos 0–4px

Card
→ 8px

Input
→ 8px

Button
→ 10–12px

Badge
→ totalmente arredondado

Elemento especial de branding
→ 20px+
```

Evitar colocar `rounded-xl` ou `rounded-2xl` em absolutamente todos os componentes.

---

# 11. Sombras

As sombras devem ser extremamente discretas.

Evitar:

* sombras fortes;
* sombras coloridas;
* múltiplas camadas de shadow;
* efeito "floating card" exagerado.

Utilizar sombras principalmente para:

* dropdowns;
* modais;
* menus;
* elementos sobrepostos.

Cards normais podem depender apenas de background + border.

---

# 12. Spacing

Utilizar sistema baseado em múltiplos de 4.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
```

Valores mais utilizados:

```text
8px  → micro spacing
12px → componentes pequenos
16px → padrão
24px → separação de componentes
32px → seções
48px → grandes seções
64px → áreas principais
```

Evitar espaçamentos arbitrários.

---

# 13. Grid

Desktop:

```text
Sidebar: 240px
Main content: flex
Horizontal padding: 32px
```

Em telas grandes, o conteúdo pode utilizar um `max-width` apropriado para evitar linhas excessivamente longas.

Layout geral:

```text
┌──────────────┬──────────────────────────────┐
│              │                              │
│   SIDEBAR    │        MAIN CONTENT          │
│              │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

---

# 14. Sidebar

A sidebar é um elemento importante da identidade do produto.

Background:

```text
#0D2923
```

Logo:

Branco ou aplicação apropriada da identidade.

Navegação:

* texto branco com baixa opacidade;
* estado ativo utilizando Jungle Teal;
* ícones simples;
* labels claros.

O item ativo deve possuir uma forma visual distinta.

Exemplo:

```text
┌────────────────────┐
│  ◉  Dashboard      │
├────────────────────┤
│  □  Faturação      │
│  □  Clientes       │
│  □  Produtos       │
└────────────────────┘
```

O item selecionado pode utilizar:

```text
background: #32866D
border-radius: 10px
```

A estrutura da sidebar permanece relativamente reta, enquanto o item interativo é arredondado.

---

# 15. Topbar

A topbar deve ser limpa.

Elementos:

* pesquisa;
* notificações;
* empresa atual;
* avatar;
* menu do utilizador.

Evitar excesso de informação.

Height sugerida:

```text
64px
```

---

# 16. Buttons

## Primary

Background:

```text
#32866D
```

Texto:

```text
#FFFFFF
```

Radius:

```text
10px
```

Height:

```text
40–44px
```

Hover:

Escurecer ligeiramente a cor.

---

## Secondary

Background:

```text
#FFFFFF
```

Border:

```text
rgba(32,36,33,0.15)
```

Texto:

```text
#202421
```

Radius:

```text
10px
```

---

## Destructive

Utilizar vermelho funcional.

Nunca utilizar Cinnamon Wood para representar ações destrutivas.

---

# 17. Inputs

Background:

```text
#FFFFFF
```

Border:

```text
rgba(32,36,33,0.15)
```

Radius:

```text
8px
```

Height:

```text
40–44px
```

Focus:

```text
border: #32866D
```

O focus deve ser claramente perceptível.

Labels devem permanecer fora do campo.

Placeholder deve possuir contraste inferior ao conteúdo real.

---

# 18. Cards

Cards padrão:

```text
background: #FFFFFF
border: 1px solid rgba(32,36,33,0.08)
border-radius: 8px
```

Padding:

```text
20px–24px
```

Cards não devem ter todos o mesmo peso visual.

Um dashboard deve possuir:

* cards de métricas;
* áreas de gráficos;
* tabelas;
* atividade.

Não transformar cada informação em um card.

---

# 19. Metric Cards

Estrutura:

```text
Label

Valor principal

Variação / contexto
```

Exemplo:

```text
Faturação

4.285.400 Kz

↑ 12,4% vs. mês anterior
```

Valor:

Lexend 600.

O número deve ser visualmente dominante.

---

# 20. Tables

As tabelas devem ter aparência mais estruturada e menos arredondada.

Header:

```text
background: #F5F0E6
```

Rows:

```text
background: #FFFFFF
```

Divisores:

```text
rgba(32,36,33,0.08)
```

Radius externo:

```text
8px
```

Evitar cards individuais dentro das células.

---

# 21. Status Badges

Formato:

```text
border-radius: 9999px
```

Padding:

```text
4px 10px
```

Exemplos:

### Pago

Fundo verde claro + texto verde escuro.

### Pendente

Fundo âmbar claro + texto âmbar escuro.

### Anulado

Fundo vermelho claro + texto vermelho escuro.

### Rascunho

Fundo neutro + texto neutro.

Badges devem ser pequenos e discretos.

---

# 22. Icons

Utilizar uma biblioteca consistente como **Lucide Icons**.

Ícones devem ser:

* line-based;
* simples;
* consistentes;
* sem excesso de detalhes.

Stroke recomendado:

```text
1.75–2px
```

Evitar misturar bibliotecas de ícones.

---

# 23. Charts

Gráficos devem utilizar a identidade Mirabilis.

Paleta recomendada:

```text
#32866D
#B85C3A
#6E9B76
#0D2923
```

Não utilizar todas as cores em todos os gráficos.

Preferir uma cor principal e uma ou duas cores secundárias.

Gráficos devem priorizar legibilidade.

Evitar:

* 3D;
* sombras;
* gradientes excessivos;
* gráficos decorativos.

---

# 24. Invoice Preview

A pré-visualização da fatura deve possuir aparência documental.

A área de preview pode utilizar:

```text
background: #F5F0E6
```

e o documento:

```text
background: #FFFFFF
```

O documento deve possuir cantos discretamente arredondados:

```text
8px
```

A estrutura interna da fatura deve permanecer predominantemente reta.

Isso cria contraste entre o produto e o documento.

---

# 25. Empty States

Empty states devem ser simples.

Não utilizar ilustrações complexas.

Estrutura:

```text
Ícone

Título

Descrição curta

Ação principal
```

Exemplo:

```text
Ainda não existem clientes

Adicione o primeiro cliente para começar
a gerir a sua faturação.

[ + Novo cliente ]
```

Pode utilizar Soft Linen como background.

---

# 26. Feedback

## Success

Utilizar verde.

## Warning

Utilizar âmbar.

## Error

Utilizar vermelho.

## Info

Utilizar azul.

Estados funcionais devem ser semanticamente consistentes em toda a aplicação.

---

# 27. Motion

Motion deve ser subtil.

Utilizar transições para:

* hover;
* focus;
* abertura de menus;
* modais;
* navegação;
* alterações de estado.

Duração recomendada:

```text
150–200ms
```

Para transições maiores:

```text
200–300ms
```

Evitar animações constantes ou decorativas.

O Mirabilis deve parecer rápido.

---

# 28. Responsividade

Desktop é a prioridade.

Breakpoints:

```text
Mobile
< 640px

Tablet
640–1024px

Desktop
> 1024px
```

No mobile:

* sidebar transforma-se em drawer;
* tabelas podem utilizar scroll horizontal;
* cards passam para uma coluna;
* grids adaptam-se;
* ações principais permanecem acessíveis.

---

# 29. Acessibilidade

Garantir:

* contraste adequado;
* estados de focus visíveis;
* labels explícitos;
* áreas clicáveis suficientemente grandes;
* navegação por teclado;
* não depender apenas da cor para comunicar estados.

A cor deve complementar a informação, não ser a única forma de comunicá-la.

---

# 30. Personalidade visual

O Mirabilis deve encontrar o equilíbrio entre:

```text
ORGANIC
     +
STRUCTURED
     +
CORPORATE
     +
AFRICAN
     +
TECHNOLOGY
```

A identidade não deve ser literalmente "verde porque é uma planta".

O verde representa a marca.

A geometria representa estrutura.

Os pequenos detalhes em Cinnamon Wood remetem subtilmente ao ambiente do Namibe.

O uso de formas arredondadas representa interação e acessibilidade.

As formas mais retas representam organização, precisão e infraestrutura.

---

# 31. Regra de ouro

> **Mirabilis deve parecer uma ferramenta séria para empresas, mas não uma ferramenta fria.**

A interface deve ter personalidade suficiente para ser reconhecida sem sacrificar clareza, eficiência ou confiança.

A combinação entre **Jungle Teal + Evergreen + Soft Linen + Cinnamon Wood**, Lexend e a mistura controlada entre formas retas e arredondadas deve constituir a assinatura visual do produto.
