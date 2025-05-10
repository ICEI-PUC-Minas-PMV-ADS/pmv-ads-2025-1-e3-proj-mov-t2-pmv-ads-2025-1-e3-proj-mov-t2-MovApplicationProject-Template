# Plano de Testes de Software

| **Caso de Teste** | **CT-01 – Login** |
|:---:	|:---:	|
| **Requisito Associado** | RF-001 - O aplicativo deve permitir que os usuários realizem login com e-mail e senha. |
| **Objetivo do Teste** | Verificar se o usuário consegue logar na aplicação. |
| **Passos** | 01-Acessar a Página de Login.  02-Preencher os campos E-mail e Senha.  03-Clicar no botão Login. |
| **Critério de Êxito** | - Logar. |
|  	|  	|
| **Caso de Teste** | **CT-02 – Recuperação de Senha** |
| **Requisito Associado** | RF-002 - O aplicativo deve possibilitar a recuperação de senha. |
| **Objetivo do Teste** | Verificar se o usuário consegue recuperar a senha. |
| **Passos** | 01-Acessar a Página de Login.  02-Clicar no botão "Esqueceu sua Senha?".  03-Inserir o e-mail cadastrado.  04-Clicar no botão "Enviar Link de Recuperação". |
| **Critério de Êxito** | - Mensagem _Link de recuperação enviado para email_. |
|  	|  	|
| **Caso de Teste** | **CT-03 – Cadastro de Usuário** |
| **Requisito Associado** | RF-003 - O aplicativo deve permitir que os usuários se cadastrem fornecendo nome, e-mail e senha. |
| **Objetivo do Teste** | Verificar se o usuário consegue se cadastrar no aplicativo. |
| **Passos** | 01-Acessar a página de Cadastro.  02-Preencher os campos Nome, E-mail e Senha.  03-Clicar no botão Cadastrar. |
| **Critério de Êxito** | - Usuário cadastrado. |
|  	|  	|
| **Caso de Teste** | **CT-04 – Edição de Perfil** |
| **Requisito Associado** | RF-004 - O aplicativo deve permitir que os usuários editem seu perfil (nome, foto, senha). |
| **Objetivo do Teste** | Verificar se o usuário consegue editar o perfil. |
| **Passos** | 01-Acessar a página de Perfil.  02-Modificar os campos desejados (Nome, Foto, Senha).  03-Clicar no botão Salvar. |
| **Critério de Êxito** | - Perfil atualizado. |
|  	|  	|
| **Caso de Teste** | **CT-05 – Adicionar Transação** |
| **Requisito Associado** | RF-005 - O aplicativo deve permitir que os usuários adicionem ganhos e despesas, informando valor, data, categoria e descrição. |
| **Objetivo do Teste** | Verificar se o usuário consegue adicionar uma transação financeira. |
| **Passos** | 01-Acessar a página de Transações.  02-Preencher os campos Valor, Data, Categoria e Descrição.  03-Clicar no botão Adicionar. |
| **Critério de Êxito** | - Transação adicionada. |
|  	|  	|
| **Caso de Teste** | **CT-06 – Criar Categoria** |
| **Requisito Associado** | RF-006 - 	O aplicativo deve permitir a criação e edição de categorias para transações (ex: alimentação, transporte). |
| **Objetivo do Teste** | Verificar se o usuário consegue criar e editar categorias. |
| **Passos** | 01-Acessar a página de Categorias.  02-Clicar em Criar Nova Categoria.  03-Definir um nome para a categoria.  04-Clicar no botão Salvar. |
| **Critério de Êxito** | - Categoria criada. |
|  	|  	|
| **Caso de Teste** | **CT-07 – Exibir Extrato** |
| **Requisito Associado** | RF-007 - O aplicativo deve exibir um extrato financeiro. |
| **Objetivo do Teste** | Verificar se o usuário consegue visualizar o extrato de transações. |
| **Passos** | 01-Acessar a página de Extrato. 02-Clicar em gerar extrato. |
| **Critério de Êxito** | - Lista de transações exibida corretamente. |
|  	|  	|
| **Caso de Teste** | **CT-08 – Filtrar Transações** |
| **Requisito Associado** | RF-008 - O aplicativo deve permitir filtrar transações por categoria, data ou valor. |
| **Objetivo do Teste** | Verificar se o usuário consegue filtrar transações por categoria, data ou valor. |
| **Passos** | 01-Acessar a página de Extrato.  02-Selecionar filtros desejados.  03-Clicar em Aplicar Filtro. |
| **Critério de Êxito** | - Apenas as transações filtradas são exibidas. |
|  	|  	|
| **Caso de Teste** | **CT-09 – Gráficos Financeiros** |
| **Requisito Associado** | RF-009 - O aplicativo deve gerar gráficos simples de gastos por categoria e evolução mensal. |
| **Objetivo do Teste** | Verificar se os gráficos são gerados corretamente. |
| **Passos** | 01-Acessar a página de Gráficos. 02-Clicar em gerar gráfico. |
| **Critério de Êxito** | - Gráficos exibidos corretamente. |
|  	|  	|
| **Caso de Teste** | **CT-10 – Definir Metas Financeiras** |
| **Requisito Associado** | RF-010 - O aplicativo deve permitir que os usuários definam metas financeiras e acompanhem o progresso. |
| **Objetivo do Teste** | Verificar se o usuário consegue definir e acompanhar metas financeiras. |
| **Passos** | 01-Acessar a página de Metas.  02-Definir uma meta com valor e prazo.  03-Clicar no botão Salvar. |
| **Critério de Êxito** | - Meta cadastrada e progresso atualizado. |
|  	|  	|
| **Caso de Teste** | **CT-11 – Criar Grupo de Despesas** |
| **Requisito Associado** | RF-011 - O aplicativo deve permitir a criação de grupos para divisão de despesas. |
| **Objetivo do Teste** | Verificar se o usuário consegue criar um grupo de despesas. |
| **Passos** | 01-Acessar a página de Grupos.  02-Clicar em Criar Grupo.  03-Definir nome e participantes.  04-Clicar em Salvar. |
| **Critério de Êxito** | - Grupo criado. |
|  	|  	|
| **Caso de Teste** | **CT-12 – Adicionar Despesa ao Grupo** |
| **Requisito Associado** | RF-012 - O aplicativo deve permitir que os usuários adicionem despesas ao grupo, informando valor, descrição e divisão entre participantes. |
| **Objetivo do Teste** | Verificar se o usuário consegue adicionar uma despesa ao grupo. |
| **Passos** | 01-Acessar a página do Grupo.  02-Preencher os dados da despesa.  03-Clicar em Salvar. |
| **Critério de Êxito** | - Despesa adicionada ao grupo. |
|  	|  	|
| **Caso de Teste** | **CT-13 – Calcular Saldo do Grupo** |
| **Requisito Associado** | RF-013 - O aplicativo deve calcular automaticamente o saldo de cada participante do grupo. |
| **Objetivo do Teste** | Verificar se o saldo do grupo é atualizado corretamente. |
| **Passos** | 01-Acessar a página do Grupo.  02-Adicionar uma despesa.  03-Verificar saldo atualizado. |
| **Critério de Êxito** | - Saldo atualizado. |
|  	|  	|
| **Caso de Teste** | **CT-14 – Dar baixa nas Despesas** |
| **Requisito Associado** | RF-014 - O aplicativo deve permitir que os usuários marquem despesas como "pagas". |
| **Objetivo do Teste** | Marcar as despesas como pagas. |
| **Passos** | 01-Acessar página de Despesas. 02-Selecionar despesas. 03-Marcar como "pago". |
| **Critério de Êxito** | - Despesa aparece como paga. |
|  	|  	|
| **Caso de Teste** | **CT-15 – Histórico de Despesas** |
| **Requisito Associado** | RF-015 - O aplicativo deve exibir um histórico de despesas do grupo. |
| **Objetivo do Teste** | Visualizar histórico das despesas. |
| **Passos** | 01-Acessar página de Despesas. 02-Clicar em "Histórico". |
| **Critério de Êxito** | - Lista de despesas gerada. |
|  	|  	|
| **Caso de Teste** | **CT-16 – Escolher Moeda** |
| **Requisito Associado** | RF-016 - O aplicativo deve permitir que os usuários escolham a moeda. |
| **Objetivo do Teste** | Visualizar e escolher as moedas. |
| **Passos** | 01-Acessar página Edição de Perfil. 02-Clicar em "Selecionar Moeda". 03-Escolher a moeda." |
| **Critério de Êxito** | - Tipo de moeda alterado. |
|  	|  	|

<!-- Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7) -->
