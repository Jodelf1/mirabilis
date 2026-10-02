# MIRABILIS — Contexto do Protótipo

## 1. Visão geral

**Mirabilis** é um conceito de plataforma de faturação e gestão empresarial direcionada a empresas que operam em Angola.

O nome é inspirado na **Welwitschia mirabilis**, planta característica do deserto do Namibe, escolhida como referência conceptual para representar resistência, adaptação, longevidade e crescimento.

O produto deve transmitir a ideia de uma plataforma empresarial moderna, simples e confiável, construída tendo em conta a realidade das empresas angolanas.

Neste momento, o objetivo não é desenvolver o software completo nem implementar funcionalidades fiscais reais.

O objetivo é criar um **protótipo visual navegável** que permita apresentar ao cliente o conceito, a experiência de utilização e a direção do produto.

---

# 2. Objetivo do protótipo

O protótipo deve demonstrar como uma empresa poderia utilizar o Mirabilis para:

* acompanhar o desempenho do negócio;
* emitir e consultar documentos de faturação;
* gerir clientes;
* gerir produtos e serviços;
* acompanhar pagamentos;
* consultar informações financeiras;
* configurar os dados da empresa.

O protótipo deve parecer um produto funcional, mesmo que os dados e operações sejam simulados.

Não é necessário implementar:

* emissão fiscal real;
* integração com AGT;
* pagamentos reais;
* autenticação real;
* backend;
* banco de dados;
* envio real de documentos;
* cálculos fiscais oficiais;
* multiempresa funcional.

Todas as informações apresentadas podem ser dados fictícios criados especificamente para a demonstração.

---

# 3. Público-alvo

O produto é destinado principalmente a:

* pequenas e médias empresas;
* empreendedores;
* gestores;
* departamentos financeiros;
* contabilistas;
* equipas comerciais.

A interface deve ser suficientemente simples para um pequeno empresário, mas suficientemente profissional para transmitir confiança a empresas maiores.

---

# 4. Posicionamento

O Mirabilis não deve parecer apenas um gerador de faturas.

A percepção desejada é:

> **Uma plataforma empresarial que ajuda as empresas a compreender e gerir melhor o seu negócio.**

A faturação é o ponto de entrada principal do produto, mas a arquitetura visual deve permitir a futura expansão para:

* gestão financeira;
* inventário;
* vendas;
* compras;
* clientes;
* relatórios;
* analytics;
* integrações.

Não criar funcionalidades fictícias apenas para tornar o produto maior. A interface deve sugerir capacidade de expansão sem sobrecarregar o protótipo.

---

# 5. Identidade visual

## Conceito

A identidade é inspirada na Welwitschia mirabilis, mas a planta não deve ser representada literalmente na interface.

A referência deve aparecer através de conceitos como:

* resistência;
* continuidade;
* crescimento;
* estrutura;
* estabilidade;
* adaptação;
* longevidade.

A estética deve ser **corporativa, tecnológica e sofisticada**.

Evitar uma aparência excessivamente ecológica, agrícola ou turística.

---

# 6. Paleta de cores

### Primary — Mirabilis Green

`#174C3B`

Principal cor da marca.

Utilização:

* logo;
* botões primários;
* links importantes;
* estados selecionados;
* elementos de destaque.

### Secondary — Namibe Sand

`#C9A875`

Cor inspirada no ambiente do Namibe.

Utilização:

* pequenos detalhes;
* elementos decorativos;
* gráficos;
* destaques secundários.

Não deve dominar a interface.

### Botanical Green

`#6E9B76`

Utilização:

* elementos secundários;
* gráficos;
* estados positivos complementares;
* detalhes visuais.

### Root

`#17221E`

Utilização:

* títulos;
* textos de elevada importância;
* elementos escuros;
* possíveis áreas de destaque.

### Sand Surface

`#F3EFE6`

Utilização:

* backgrounds secundários;
* cards especiais;
* áreas de destaque.

### White

`#FFFFFF`

Background principal e áreas de conteúdo.

### Functional colors

Usar cores funcionais apenas quando necessário:

* Success: verde
* Warning: âmbar
* Error: vermelho
* Information: azul

As cores funcionais não devem substituir a identidade principal da marca.

---

# 7. Direção visual da interface

A interface deve seguir uma estética:

* minimalista;
* premium;
* corporativa;
* limpa;
* moderna;
* orientada a dados;
* com bastante espaço negativo.

Evitar:

* excesso de gradientes;
* glassmorphism exagerado;
* sombras pesadas;
* cards excessivos;
* elementos decorativos sem função;
* dashboards visualmente congestionados;
* aparência de template genérico de administração.

O produto deve parecer um SaaS B2B desenvolvido profissionalmente.

---

# 8. Estrutura geral da aplicação

A aplicação terá uma sidebar lateral persistente.

```text
MIRABILIS

Dashboard

Faturação
  Documentos
  Faturas
  Notas de crédito
  Recibos

Clientes

Produtos e Serviços

Relatórios

────────────────

Definições

Empresa
Utilizadores
Preferências
```

No topo da aplicação:

```text
Pesquisa

Notificações

Empresa selecionada
Perfil do utilizador
```

A sidebar deve poder ser recolhida para aumentar a área útil da aplicação.

---

# 9. Telas do protótipo

## 9.1 Login

Tela simples de autenticação.

Elementos:

* Logo Mirabilis;
* título;
* email;
* palavra-passe;
* botão "Entrar";
* opção "Esqueci a palavra-passe";
* identificação discreta do produto.

O login é apenas visual.

---

# 9.2 Dashboard

Tela principal após o login.

Objetivo:

Permitir ao utilizador compreender rapidamente a situação da empresa.

### Header

```text
Bom dia, João.

Aqui está o resumo da sua empresa.
02 Outubro 2026
```

### Indicadores principais

Mostrar quatro indicadores:

```text
Faturação
4.285.400 Kz

Recebido
3.721.800 Kz

Por receber
563.600 Kz

Documentos emitidos
128
```

Cada indicador pode apresentar comparação com o período anterior.

### Gráfico

Gráfico de evolução da faturação.

Permitir visualização mensal.

### Documentos recentes

Tabela:

```text
Documento
Cliente
Data
Valor
Estado
```

Exemplo:

```text
FT 2026/00482
Kwanza Comercial, Lda.
02 Out 2026
485.000 Kz
Pago
```

### Atividade recente

Exemplos:

```text
Fatura FT 2026/00482 emitida
há 12 minutos

Pagamento recebido de NovaTech, Lda.
há 1 hora

Cliente Muxima Services adicionado
há 3 horas
```

---

# 9.3 Documentos / Faturação

Tela para consultar documentos emitidos.

### Header

```text
Faturação

Consulte e acompanhe os documentos da sua empresa.
```

Botão principal:

```text
+ Nova fatura
```

### Filtros

* Pesquisa;
* tipo de documento;
* estado;
* período.

### Tabela

Colunas:

```text
Documento
Cliente
Data
Valor
Estado
Ações
```

Estados visuais:

* Pago;
* Pendente;
* Anulado;
* Emitido.

Os dados devem parecer realistas e usar Kz.

---

# 9.4 Criar fatura

Esta é uma das telas mais importantes da apresentação.

A interface deve ser dividida em duas áreas.

### Área esquerda

Formulário:

```text
Nova fatura

Cliente
[ Selecionar cliente ]

Data de emissão
[ 02/10/2026 ]

Produtos e serviços

Produto/Serviço
Quantidade
Preço unitário
IVA
Total

[ + Adicionar item ]
```

### Área inferior

Totais:

```text
Subtotal
500.000 Kz

Impostos
90.000 Kz

Total
590.000 Kz
```

Botões:

```text
Guardar rascunho
Emitir fatura
```

### Área direita

Preview da fatura.

Mostrar uma representação visual do documento final.

O objetivo é permitir que o utilizador perceba imediatamente que o documento que está a preencher será transformado numa fatura profissional.

---

# 9.5 Clientes

Tela de gestão de clientes.

### Header

```text
Clientes

Gerencie os clientes e consulte o histórico de faturação.
```

Botão:

```text
+ Novo cliente
```

### Tabela

```text
Cliente
NIF
Contacto
Documentos
Total faturado
Estado
```

Exemplos:

```text
Kwanza Comercial, Lda.
5000123456
+244 923 000 000
24 documentos
4.820.000 Kz
Ativo
```

Ao clicar num cliente, abrir uma página de detalhe.

### Detalhe do cliente

Mostrar:

* informações básicas;
* total faturado;
* valor pendente;
* número de documentos;
* histórico de faturas.

---

# 9.6 Produtos e Serviços

Catálogo da empresa.

### Tabela

```text
Produto / Serviço
Código
Categoria
Preço
IVA
Estado
```

Exemplos:

```text
Consultoria de Gestão
SRV-001
Consultoria
150.000 Kz
14%
Ativo
```

Botão:

```text
+ Novo produto
```

Não implementar inventário neste protótipo.

A tela deve apenas demonstrar que o Mirabilis possui um catálogo estruturado de produtos e serviços.

---

# 9.7 Relatórios

Tela de análise.

Mostrar:

* faturação por período;
* evolução de vendas;
* valores recebidos;
* valores pendentes;
* distribuição por cliente;
* distribuição por produto/serviço.

Utilizar gráficos simples e legíveis.

Evitar excesso de visualizações.

O objetivo é comunicar:

> O Mirabilis transforma os dados de faturação em informação útil para decisão.

---

# 9.8 Definições da empresa

Tela para configuração da empresa.

Secções:

### Informações da empresa

* Nome;
* NIF;
* endereço;
* telefone;
* email;
* website;
* logotipo.

### Faturação

* série;
* numeração;
* moeda;
* configurações fiscais.

### Utilizadores

Lista simplificada dos utilizadores.

Exemplo:

```text
João Manuel
Administrador

Ana Costa
Financeiro

Pedro Silva
Vendas
```

As permissões podem ser apenas demonstrativas.

---

# 10. Dados demonstrativos

Todos os dados são fictícios.

Utilizar nomes e valores plausíveis para empresas angolanas.

Moeda:

**Kwanza (Kz)**

Datas:

**2026**

Exemplos de valores:

```text
125.000 Kz
350.000 Kz
485.000 Kz
1.250.000 Kz
4.285.400 Kz
```

Os dados devem manter consistência entre as telas.

Se uma fatura aparece no dashboard, ela também deve aparecer na lista de documentos.

Se um cliente aparece numa fatura, ele deve existir na lista de clientes.

---

# 11. UX

A experiência deve privilegiar:

* clareza;
* velocidade;
* baixa carga cognitiva;
* hierarquia visual;
* consistência;
* acessibilidade.

O utilizador deve conseguir identificar rapidamente:

1. Onde está;
2. O que está a acontecer;
3. Qual é a informação importante;
4. Qual é a próxima ação.

Botões primários devem utilizar a cor Mirabilis Green.

Ações destrutivas devem ser visualmente distintas.

Tabelas devem ser limpas e fáceis de analisar.

---

# 12. Responsividade

O protótipo deve ser prioritariamente desenvolvido para desktop, porque o produto é direcionado a empresas e departamentos administrativos.

Ainda assim, a estrutura deve ser responsiva.

Breakpoints mínimos:

* Desktop;
* Tablet;
* Mobile.

No mobile, a sidebar deve transformar-se em navegação recolhida.

---

# 13. Componentes principais

Criar componentes reutilizáveis para:

* Sidebar;
* Topbar;
* Cards;
* Buttons;
* Inputs;
* Selects;
* Tables;
* Badges;
* Dropdowns;
* Modal;
* Date picker;
* Charts;
* Empty states;
* Toasts;
* Invoice preview.

Manter consistência de espaçamento, tipografia, bordas e estados.

---

# 14. Navegação do protótipo

Os seguintes fluxos devem funcionar visualmente:

```text
Login
 ↓
Dashboard
 ↓
Faturação
 ↓
Documento
 ↓
Detalhes da fatura
```

E:

```text
Dashboard
 ↓
Faturação
 ↓
Nova fatura
 ↓
Selecionar cliente
 ↓
Adicionar produto
 ↓
Preview
 ↓
Emitir
```

Também:

```text
Dashboard
 ↓
Clientes
 ↓
Cliente
 ↓
Histórico de faturação
 ↓
Fatura
```

Os fluxos não precisam de backend.

Pode-se utilizar estado local ou dados mockados para simular interações.

---

# 15. Stack sugerida

Frontend:

* Next.js;
* TypeScript;
* Tailwind CSS.

UI:

* componentes próprios;
* Lucide Icons ou equivalente;
* biblioteca de gráficos apenas se necessário.

O projeto deve priorizar componentes reutilizáveis e uma estrutura limpa.

Não adicionar dependências desnecessárias.

---

# 16. Princípio central do protótipo

O protótipo não deve tentar provar que o Mirabilis já possui todas as funcionalidades de um ERP.

Deve provar três coisas:

**1. O produto é compreensível.**

O utilizador entende rapidamente para que serve.

**2. O produto parece confiável.**

A interface transmite organização, segurança e profissionalismo.

**3. Existe espaço para crescimento.**

A arquitetura visual permite que a faturação seja posteriormente expandida para uma plataforma empresarial completa.

---

# 17. Resultado esperado

O resultado final deve ser um protótipo navegável de alta fidelidade que possa ser apresentado a um cliente como uma primeira visão do produto Mirabilis.

A experiência deve parecer suficientemente real para permitir uma demonstração:

```text
Entrar
→ Dashboard
→ Ver faturação
→ Criar fatura
→ Selecionar cliente
→ Adicionar serviço
→ Ver documento
→ Emitir
→ Consultar relatório
```

O protótipo deve utilizar exclusivamente a identidade visual Mirabilis e manter consistência entre todas as telas.

**Prioridade:** qualidade visual, coerência do produto e clareza da experiência, não quantidade de funcionalidades.
