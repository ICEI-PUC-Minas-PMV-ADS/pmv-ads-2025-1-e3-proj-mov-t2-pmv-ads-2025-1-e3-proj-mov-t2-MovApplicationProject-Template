# Especificações do Projeto

A definição do problema foi dada pela antropologia, uma técnica de observação que nos permitiu criar as personas e usuários abaixo.

## Personas

<div align="center">

|Matilde Ribeiro|![Design sem nome](https://github.com/user-attachments/assets/986c6b9c-682d-4808-bc7f-b3d66f846824)|
|-----------------------|-|
|Idade:|59|
|Ocupação:| Servidora pública aposentada|
|Motivações| Quer uma forma mais rápida, simples e segura de organizar suas finanças e calcular seus gastos sem precisar utilizar papel e caneta|
|Frustrações| Sistemas de finanças são muito complicados de utilizar |
|Hobbies| Hidroginástica, brincar com os netos|

|Thiago Costa|![Design sem nome (1)](https://github.com/user-attachments/assets/bb09a82e-66c8-4134-8778-542d5c37bbbb)|
|-----------------------|-|
|Idade:|24|
|Ocupação:| Estagiário de agronomia|
|Motivações| Melhorar seus gastos excessivos e receber de seus amigos sem cobrar;|
|Frustrações| Não consegue desenvolver o hábito de atualizar seu planejamento financeiro no excel e constantemente toma calote de seus colegas quando dividem a conta|
|Hobbies| Ir para bares, comprar roupas on-line|

|Luiza Pereira|![Design sem nome (2)](https://github.com/user-attachments/assets/23f76acc-8397-4d71-93fe-a3778879bcd5)|
|-----------------------|-|
|Idade:|15|
|Ocupação:|Menor Aprendiz|
|Motivações| Iniciar a sua vida financeira com bons hábitos|
|Frustrações| A falta de experiência e falta de organização ao lidar com dinheiro combinado com seus objetivos ambiciosos, muitas vezes irreais|
|Hobbies| Comer fast-food no seu bairro, dançar ballet|

| Marcos Vinícius |![Design sem nome](https://github.com/user-attachments/assets/75ccb695-9e6e-4ee7-b2d1-07954d51d15f)|
|-----------------|---------------|
| **Idade**       | 28            |
| **Ocupação**    | Freelancer (Designer Gráfico) |
| **Motivações**  | Melhorar a gestão financeira para poder investir em equipamentos e cursos para seu trabalho, além de criar uma reserva de emergência. |
| **Frustrações** | Dificuldade em organizar seus rendimentos irregulares e pagar impostos sobre os seus serviços. |
| **Hobbies**     | Criar designs para redes sociais, aprender novas técnicas de design, e curtir eventos de arte. |

| Natasha Munhoz |![Design sem nome(1)](https://github.com/user-attachments/assets/ff29087c-abcb-43be-aaea-10a8889ed31b)|
|-----------------|---------------|
| **Idade**       | 35            |
| **Ocupação**    | Microempreendedora (Proprietária de uma pequena loja de roupas) |
| **Motivações**  | Controlar melhor o fluxo de caixa da sua loja, separar finanças pessoais das da empresa e aumentar a lucratividade. |
| **Frustrações** | Falta de tempo para estudar sobre finanças empresariais e a dificuldade em fazer planejamento financeiro de longo prazo. |
| **Hobbies**     | Organizar eventos de moda, viajar para feiras de moda e criar coleções exclusivas para sua loja. |

</div>

## Histórias de Usuários

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE`                                             |PARA ... `MOTIVO/VALOR`                 |
|--------------------|--------------------------------------------------------------------------------|----------------------------------------|
|Matilde Ribeiro| Registrar entradas e saídas usando o celular|Armazenar seus gastos em um lugar que não se deteriore|
|Matilde Ribeiro| Criar uma conta que possua minhas informações pessoais| Acessar meus dados a qualquer hora|
|Thiago Costa|Dividir a conta com mais pessoas de forma justa|Diminuir os casos em que sai lesado ao não ser pago novamente pelos seus colegas|
|Marcos Vinícius| Consultar meu histórico de entradas e gastos| Controlar e mapear meus gastos|
|Natasha Munhoz|Criar metas financeiras|Visualizar o progresso da meta até sua materialização|
|Luiza Pereira| Mostrar gráficos financeiros | Facilitar o entendimento do balancete geral.|

## Modelagem do Processo de Negócio - Wally

### Análise da Situação Atual

O gerenciamento financeiro pessoal e de grupos é uma necessidade cotidiana. Muitas pessoas utilizam planilhas, anotações ou aplicativos fragmentados para controlar receitas, despesas e dividir custos em grupo.
Os principais problemas são:
* Falta de centralização das informações financeiras.
* Dificuldade na divisão de despesas em grupos.
* Baixa automação para categorização de despesas.
* Ausência de relatórios e análises financeiras intuitivas.

### Descrição Geral da Proposta

O Wally é um aplicativo mobile que permite aos usuários realizarem o controle de despesas individuais e compartilhadas. Ele busca facilitar a gestão financeira por meio de:
* Interface intuitiva para registro e visualização de despesas.
* Automatização na divisão de gastos em grupo.
* Relatórios personalizados para tomada de decisão financeira.

### Processo 1 – Registro de Despesas

Oportunidades de melhoria:
* Registro simplificado de gastos individuais ou compartilhados.
* Classificação automática das despesas.
* Possibilidade controle de gastos

Fluxograma 1:

![image](https://github.com/user-attachments/assets/8edd71e6-2c87-47d0-81da-f71c67b87d6a)

<h4 align="center">FIGURA 01</h4>

<br>

### Processo 2 – Divisão de Despesas em Grupo

Oportunidades de melhoria:
* Automatização no cálculo de divisão de despesas.
* Notificações para pagamento.
* Organização de despesas compartilhadas.

Fluxograma 2:

![image](https://github.com/user-attachments/assets/366dac5d-b72e-417c-a98d-5e21b0c354a3)

<h4 align="center">FIGURA 02</h4>

<br>

Esses processos otimizam o gerenciamento financeiro pessoal e coletivo, tornando o Wally uma solução eficiente para organização financeira.

## Indicadores de Desempenho

| Indicador                              | Descrição | Objetivo | Cálculo | Fonte de Dados | Perspectiva |
|----------------------------------------|-----------|----------|---------|-----------------|-------------|
| **Número de Usuários Ativos**          | Quantidade de usuários que acessam o aplicativo diariamente. | Avaliar o engajamento e a relevância do aplicativo. | Contagem de usuários ativos. | Base de dados do app | Processos Internos |
| **Taxa de Retenção de Usuários**       | Percentual de usuários que continuam utilizando o aplicativo após um período. | Avaliar a satisfação e fidelidade dos usuários. | (Usuários retidos / Usuários totais) * 100. | Base de dados do app | Processos Internos |
| **Número de Despesas em Grupo Criadas** | Quantidade de despesas compartilhadas registradas no aplicativo. | Medir a utilização da funcionalidade de gestão de despesas em grupo. | Contagem de despesas em grupo criadas. | Base de dados do app | Clientes |
| **Percentual de Metas Financeiras Atingidas** | Proporção de metas financeiras definidas pelos usuários que foram alcançadas. | Avaliar se o app ajuda os usuários a atingirem seus objetivos financeiros. | (Metas alcançadas / Metas definidas) * 100. | Base de dados do app | Clientes |
| **Taxa de Erros ou Falhas no Aplicativo** | Número de erros ou falhas que ocorrem durante o uso. | Monitorar a estabilidade e confiabilidade do sistema. | Contagem de erros ou falhas. | Servidor do app | Aprendizado e Crescimento |
| **Percentual de Satisfação dos Usuários** | Percentual de usuários que avaliaram o aplicativo positivamente com base em feedbacks ou pesquisas de satisfação. | Medir a aceitação do aplicativo e identificar oportunidades de melhoria. | (Avaliações positivas / Total de avaliações) * 100. | Sistema de pesquisa ou feedback do app | Aprendizado e Crescimento |

## Requisitos

As tabelas a seguir apresentam uma descrição detalhada dos **requisitos funcionais** e **não funcionais** que definem o escopo do projeto:

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O aplicativo deve permitir que os usuários realizem login com e-mail e senha. | ALTA |
|RF-002| O aplicativo deve possibilitar a recuperação de senha. | ALTA |
|RF-003| O aplicativo deve permitir que os usuários se cadastrem fornecendo nome, e-mail e senha. | ALTA |
|RF-004| O aplicativo deve permitir que os usuários editem seu perfil (nome, foto, senha). | MÉDIA |
|RF-005| O aplicativo deve permitir que os usuários adicionem ganhos e despesas, informando valor, data, categoria e descrição. | ALTA |
|RF-006| O aplicativo deve permitir a criação e edição de categorias para transações (ex: alimentação, transporte). | ALTA |
|RF-007| O aplicativo deve exibir um extrato financeiro com todas as transações do usuário. | ALTA |
|RF-008| O aplicativo deve permitir filtrar transações por categoria, data ou valor. | MÉDIA |
|RF-009| O aplicativo deve gerar gráficos simples de gastos por categoria e evolução mensal. | ALTA |
|RF-010| O aplicativo deve permitir que os usuários definam metas financeiras e acompanhem o progresso. | BAIXA |
|RF-011| O aplicativo deve permitir a criação de grupos para divisão de despesas. | ALTA |
|RF-012| O aplicativo deve permitir que os usuários adicionem despesas ao grupo, informando valor, descrição e divisão entre participantes. | ALTA |
|RF-013| O aplicativo deve calcular automaticamente o saldo de cada participante do grupo. | ALTA |
|RF-014| O aplicativo deve permitir que os usuários marquem despesas como "pagas". | ALTA |
|RF-015| O aplicativo deve exibir um histórico de despesas do grupo. | MÉDIA |
|RF-016| O aplicativo deve permitir que os usuários escolham a moeda. | BAIXA |

### Requisitos não Funcionais

| ID      | Descrição do Requisito | Prioridade |  
|---------|------------------------------------------------------------|----------|  
| RNF-001 | O aplicativo deve ser compatível com dispositivos Android e iOS. | ALTA |  
| RNF-002 | O aplicativo deve ter uma interface simples e intuitiva, seguindo boas práticas de UX/UI. | ALTA |  
| RNF-003 | O sistema deverá ter um ótimo desempenho para lidar com vários usuários de uma única vez. | ALTA |  
| RNF-004 | A aplicação deve seguir protocolos de segurança, garantindo a proteção dos dados coletados. | ALTA |  
| RNF-005 | O aplicativo deve ser desenvolvido usando React Native para o front-end e Node.js para o back-end. | ALTA |  
| RNF-006 | O aplicativo deve ser testado em dispositivos móveis de baixo e alto desempenho. | MÉDIA |  

## Restrições

O projeto está **restrito** pelos itens apresentados na tabela a seguir:

<div align="center">

| ID  | Restrição |  
|----|---------------------------------------------------------------|  
| 01 | O projeto deve ser entregue até o final do semestre. |  
| 02 | O front-end deve ser desenvolvido em React Native. |  
| 03 | O back-end deve ser implementado utilizando Node.js. |  
| 04 | O desenvolvimento deve ser feito com ferramentas gratuitas ou de licença acadêmica. |  
| 05 | O código deve seguir boas práticas de programação e ser bem documentado. |  
| 06 | A equipe deve colaborar ativamente em todas as etapas do projeto. |  
| 07 | O aplicativo deve estar em conformidade com a LGPD. |  
| 08 | Todo o código deve ser disponibilizado em um repositório no GitHub. |  
| 09 | O aplicativo deve funcionar offline para visualização de dados, mas requer conexão à internet para sincronização. |  

</div>

## Diagrama de Casos de Uso

![image](https://github.com/user-attachments/assets/e5648d31-bdaf-470c-b64a-18f4d9e97e5a)



<h4 align="center">FIGURA 03 - Diagrama de Casos de Uso</h4>

<br>

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura apresentada a seguir.

# Matriz de Rastreabilidade

| Relacionamento REQ. | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | RF-006 | RF-007 | RF-008 | RF-009 | RF-010 | RF-011 | RF-012 | RF-013 | RF-014 | RF-015 | RF-016 |
|---------------------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| **RF-001**          |   X    |   X    |   X    |        |        |        |        |        |        |        |        |        |        |        |        |        |
| **RF-002**          |   X    |   X    |        |        |        |        |        |        |        |        |        |        |        |        |        |        |
| **RF-003**          |   X    |   X    |   X    |        |        |        |        |        |        |        |        |        |        |        |        |        |
| **RF-004**          |        |        |        |   X    |        |        |        |        |        |        |        |        |        |        |        |        |
| **RF-005**          |        |        |        |        |   X    |   X    |        |        |        |        |        |        |        |        |        |        |
| **RF-006**          |        |        |        |        |   X    |   X    |        |        |        |        |        |        |        |        |        |        |
| **RF-007**          |        |        |        |        |        |        |   X    |        |        |        |        |        |        |        |        |        |
| **RF-008**          |        |        |        |        |        |        |   X    |   X    |        |        |        |        |        |        |        |        |
| **RF-009**          |        |        |        |        |        |        |        |        |   X    |        |        |        |        |        |        |        |
| **RF-010**          |        |        |        |        |        |        |        |        |   X    |   X    |        |        |        |        |        |        |
| **RF-011**          |        |        |        |        |        |        |        |        |        |        |   X    |   X    |   X    |        |        |        |
| **RF-012**          |        |        |        |        |        |        |        |        |        |        |   X    |   X    |   X    |        |        |        |
| **RF-013**          |        |        |        |        |        |        |        |        |        |        |   X    |   X    |   X    |        |        |        |
| **RF-014**          |        |        |        |        |        |        |        |        |        |        |        |        |        |   X    |    X   |        |
| **RF-015**          |        |        |        |        |        |        |        |        |        |        |        |        |        |   X    |   X    |        |
| **RF-016**          |        |        |        |        |        |        |        |        |        |        |        |        |        |        |        |    X   |


# Gerenciamento de Projeto

Para a realização do projeto Wally, utilizamos como base as diretrizes do **PMBoK v6** (Project Management Body of Knowledge), garantindo uma abordagem estruturada e eficiente no desenvolvimento do aplicativo. O gerenciamento do projeto foi dividido em áreas essenciais, como **tempo**, **equipe** e **orçamento**, visando o sucesso na entrega do produto dentro do prazo, com qualidade e alinhado aos objetivos do time.

## Gerenciamento de Tempo

O gerenciamento do tempo foi realizado por meio do Diagrama de Gantt, que permite o acompanhamento das tarefas do projeto de forma visual. Com essa ferramenta, o gerente de projetos pode:
- Agendar e coordenar tarefas de forma eficiente, evitando sobrecarga de trabalho.
- Definir prazos e marcos do projeto, garantindo que cada fase seja concluída dentro do tempo estipulado.
- Monitorar a evolução das atividades, permitindo ajustes caso ocorram atrasos ou imprevistos.

Dessa forma, conseguimos garantir que o desenvolvimento do Wally ocorra de maneira organizada e dentro dos prazos estabelecidos.

![image](https://github.com/user-attachments/assets/7f408747-b771-4336-9b73-7a31eddc6fd1)
<h4 align="center">FIGURA 04 - Diagrama de Gantt</h4>

## Gerenciamento de Equipe

A gestão da equipe foi realizada através da criação de um Cronograma do Projeto, onde organizamos as funções e responsabilidades dos membros do time. 

![gestaoequipe](https://github.com/user-attachments/assets/75c1f1aa-f586-443b-a4e0-05fb7cfb1ba6)
<h4 align="center">FIGURA 05 - Cronograma do Projeto</h4>

## Gestão de Orçamento

O orçamento do projeto Wally foi elaborado considerando os principais recursos necessários para o desenvolvimento e implantação do aplicativo. Os custos foram divididos em recursos humanos, hardware, rede, software e serviços.
Os principais pontos do orçamento incluem:
- Recursos Humanos: Salários dos 6 desenvolvedores durante o período de desenvolvimento (6 meses).
- Infraestrutura: Servidores em nuvem para hospedagem do sistema e equipamentos para a equipe.
- Software e Licenças: Ferramentas de desenvolvimento, banco de dados e hospedagem.
- Serviços: Consultoria em UX/UI, testes de segurança e publicação do aplicativo.
  
O total estimado do orçamento para o desenvolvimento do Wally é de aproximadamente R$ 354.900,00, garantindo que o projeto seja executado com qualidade e dentro dos padrões esperados.

<p align="center">
<img  src="https://github.com/user-attachments/assets/02e84641-ad08-45ad-bc68-5c37badb0634" width="500">
</p>
  
<h4 align="center">FIGURA 06 - Quadro de Gestão de Custos</h4>
