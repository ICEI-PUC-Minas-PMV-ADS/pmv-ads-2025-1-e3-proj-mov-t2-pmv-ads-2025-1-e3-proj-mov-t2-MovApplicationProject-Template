# Plano de Testes de Usabilidade - Wally

## Objetivos dos Testes de Usabilidade

Os testes de usabilidade visam:

- **Avaliar a navegação e a utilização das funcionalidades principais**: Observar como os usuários interagem com funcionalidades críticas, como login, cadastro, adição de ganhos e despesas, e a criação e gestão de grupos de despesas.
- **Analisar a clareza das informações**: Verificar se as transações, categorias e relatórios gráficos são apresentados de maneira clara, acessível e compreensível para o usuário.
- **Medir a eficiência no cadastro, login e recuperação de senha**: Avaliar o tempo e a facilidade com que os usuários podem realizar o login, cadastro e recuperação de senha no aplicativo.
- **Testar a eficácia na criação e gestão de grupos de despesas**: Avaliar como os usuários criam, gerenciam e dividem despesas em grupos, e se o saldo de cada participante é atualizado corretamente.
- **Confirmar a facilidade de geração e interpretação de relatórios gráficos**: Garantir que os usuários consigam gerar relatórios de gastos, visualizando gráficos simples de gastos por categoria e evolução mensal de maneira clara.

## Critérios de Seleção dos Participantes

- **Faixa Etária**: Selecionar usuários de diversas idades, garantindo uma ampla representação de perspectivas.
- **Experiência com Finanças Pessoais**: Incluir participantes com diferentes níveis de conhecimento em finanças pessoais, desde iniciantes até usuários mais experientes, permitindo uma avaliação completa das funcionalidades.
- **Diversidade de Dispositivos**: Incluir usuários que utilizam dispositivos Android e iOS, para garantir uma avaliação abrangente em ambas as plataformas, considerando também a usabilidade em dispositivos de baixo e alto desempenho.

## Procedimentos e Método

- **Método**: Utilizar uma abordagem que combine gravação de tela e áudio para avaliações à distância, além de realizar testes presenciais sempre que necessário.
- **Local**: Realizar as sessões em um ambiente seguro que favoreça um acompanhamento eficaz, oferecendo também a opção de testes remotos para maior conveniência dos participantes.
- **Instruções**: Fornecer orientações claras e detalhadas aos participantes antes do início dos testes, garantindo que eles compreendam completamente as atividades a serem executadas.

## Tarefas a Serem Executadas

- **Login e Cadastro**:
  - Realizar o processo de login com uma conta existente.
  - Criar uma nova conta fornecendo nome, e-mail e senha.
  - Realizar a recuperação de senha (se necessário).
- **Cadastro de Despesas Pessoais**:
  - Adicionar uma transação (entrada ou saída) com valor, categoria e descrição.
  - Editar uma transação existente e verificar a alteração no extrato financeiro.
- **Criação e Edição de Categorias**:
  - Criar uma nova categoria de transação (ex: Alimentação).
  - Editar uma categoria existente.
- **Criação de Grupos de Despesas Compartilhadas**:
  - Criar um grupo de despesas e adicionar participantes.
  - Adicionar despesas ao grupo, informando valor, descrição e divisão entre os participantes.
- **Gestão de Saldos do Grupo**:
  - Verificar se o aplicativo gera automaticamente o saldo de cada participante após a adição de despesas.
  - Marcar uma despesa como "pagamento" e verificar o ajuste do saldo.
- **Geração de Relatórios Gráficos**:
  - Gerar um gráfico de gastos por categoria.
  - Gerar um gráfico de evolução mensal das receitas e despesas.

## Dados a Serem Coletados

- **Satisfação do Usuário**: 
  - Coletar feedback sobre a experiência geral após cada tarefa por meio de questionários ou entrevistas curtas.
- **Tempo de Execução**:
  - Registrar o tempo que os participantes levam para completar cada atividade, como login, cadastro de transações e criação de grupos.
- **Número de Cliques**:
  - Contar quantos cliques são necessários para concluir cada tarefa, como registrar uma transação ou dividir uma despesa em um grupo.
- **Erros e Desvios**:
  - Observar se os participantes cometem erros, como dificuldades ao recuperar a senha, ao editar transações, ou ao dividir as despesas entre os membros de um grupo.

## Ordem de Execução

As tarefas serão realizadas na seguinte ordem:

1. Login e cadastro de conta.
2. Cadastro de despesas pessoais.
3. Criação e edição de categorias.
4. Criação de grupos de despesas compartilhadas.
5. Gestão de saldos do grupo.
6. Geração de relatórios gráficos.

## Métricas Coletadas

- **Feedback do Usuário**: 
  - Coleta de respostas dos participantes através de questionários de satisfação, focando na facilidade de uso, clareza das informações e eficiência das funcionalidades.
- **Eficácia do Uso**:
  - Análise da quantidade de erros cometidos, o tempo necessário para completar as tarefas e o número de cliques para concluir cada atividade.
- **Interação com o Sistema**:
  - Medir com que frequência os usuários utilizam as funcionalidades principais, como registrar despesas, dividir despesas em grupo, gerar relatórios e criar categorias, além de identificar áreas que causam dificuldades.

## Observações Finais

Todos os dados coletados serão tratados de forma anônima, em conformidade com a LGPD (Lei Geral de Proteção de Dados). O feedback será fundamental para aprimorar o design e as funcionalidades do Wally, garantindo que ele seja intuitivo, eficiente e eficaz para diferentes perfis de usuários.

Além disso, montamos um guia prático para o plano de usabilidade. Cada tarefa, relacionada às funcionalidades principais, é descrita junto com seu critério de sucesso e os aspectos a serem avaliados. O intuito é oferecer uma visão clara da experiência do usuário, focando em usabilidade, eficiência e satisfação.



| **Tarefa**                                          | **Critério de Êxito**                                                                                          | **O que será avaliado**                                                                                                                                       |
|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Realizar login na aplicação**                     | O usuário consegue fazer login em até 2 tentativas, levando menos de 30 segundos.                               | - Facilidade de localização do campo de login. <br> - Clareza das instruções de login. <br> - Tempo total para realizar o login. <br> - Necessidade de recuperação de senha. |
| **Recuperar senha**                                 | O usuário consegue recuperar sua senha com sucesso em até 5 minutos.                                             | - Facilidade em encontrar a opção de recuperação. <br> - Clareza das instruções no processo. <br> - Tempo até receber o e-mail ou SMS de recuperação. <br> - Sucesso na alteração da senha. |
| **Cadastrar nova transação (ganho ou despesa)**     | O usuário consegue adicionar uma transação (ganho ou despesa) em até 2 minutos, incluindo categoria e descrição. | - Facilidade em localizar a tela de transações. <br> - Clareza nas opções de categoria e descrição. <br> - Tempo para adicionar a transação. <br> - Verificação da relevância das categorias predefinidas. |
| **Gerar gráficos de despesas e receitas**            | O usuário gera um gráfico de despesas e receitas por categoria ou mês em até 5 minutos.                         | - Facilidade de acesso à funcionalidade de gráficos. <br> - Clareza nas informações e dados apresentados. <br> - Tempo necessário para gerar e visualizar o gráfico. |
| **Visualizar extrato financeiro**                   | O usuário consegue visualizar o extrato completo de suas transações de forma clara e sem erros, em até 3 minutos. | - Facilidade para acessar o extrato. <br> - Clareza das transações no extrato. <br> - Facilidade de filtragem por categoria ou valor. <br> - Exibição correta do saldo atual. |
| **Criar e gerenciar grupo de despesas compartilhadas** | O usuário consegue criar um grupo e adicionar participantes em até 5 minutos.                                    | - Clareza ao criar o grupo e adicionar participantes. <br> - Facilidade de divisão de despesas entre os participantes. <br> - Clareza das responsabilidades financeiras de cada integrante. |
| **Adicionar despesas ao grupo e dividir os custos** | O usuário consegue adicionar uma despesa e dividir os custos entre os membros do grupo com sucesso em até 3 minutos. | - Facilidade em adicionar a despesa ao grupo. <br> - Clareza na divisão dos valores entre os participantes. <br> - Feedback visual sobre o status da despesa (pendente/paga). |
| **Visualizar saldo de cada participante**          | O usuário consegue visualizar o saldo individual de cada membro do grupo, em até 2 minutos.                      | - Clareza e precisão na exibição do saldo de cada participante. <br> - Facilidade em acompanhar as pendências financeiras. <br> - Atualização em tempo real das dívidas/pagamentos do grupo. |
| **Marcar despesas como pagas**                      | O usuário consegue marcar uma despesa como paga em até 2 minutos, com atualização do status.                    | - Facilidade de marcar como paga. <br> - Clareza do status de "despesa paga". <br> - Atualização imediata do saldo dos participantes após a marcação. |


## Descrição dos Critérios de Êxito

Cada tarefa tem um critério de sucesso que define o desempenho esperado do usuário ao completar a ação. O objetivo desses critérios é garantir que o sistema seja intuitivo, eficiente e ofereça uma boa experiência ao usuário.

1. **Facilidade de Localização**: O usuário deve ser capaz de encontrar rapidamente o local onde realizar a ação (campo de login, tela de cadastro de transações, etc.).
2. **Tempo de Execução**: A ação deve ser realizada rapidamente, sem etapas complexas que possam confundir o usuário ou consumir tempo excessivo.
3. **Clareza das Instruções**: As mensagens e instruções fornecidas ao usuário devem ser simples e compreensíveis, sem gerar dúvidas.
4. **Feedback Visual**: O sistema deve fornecer feedback visual claro sobre as ações realizadas (como a confirmação de que uma despesa foi marcada como paga ou que um relatório foi gerado).
5. **Atualização em Tempo Real**: Em funções como a divisão de despesas ou visualização de saldo de grupo, os dados devem ser atualizados em tempo real para garantir que o usuário tenha sempre as informações mais precisas.

## Conclusão

Esse guia de usabilidade é uma parte fundamental do processo de desenvolvimento do **Aplicativo Wally**. Ele garante que as funcionalidades sejam intuitivas e eficientes para o usuário, contribuindo para uma experiência de uso satisfatória e acessível. A coleta de feedback durante os testes de usabilidade ajudará a identificar pontos de melhoria, garantindo que o aplicativo atenda às expectativas e necessidades dos seus usuários.
