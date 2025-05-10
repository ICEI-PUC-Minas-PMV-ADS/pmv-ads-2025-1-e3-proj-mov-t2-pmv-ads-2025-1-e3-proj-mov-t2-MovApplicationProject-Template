# Metodologia

O método ágil adotado neste projeto é o **SCRUM**, um framework que proporciona maior organização, eficiência e adaptabilidade ao desenvolvimento de software. Sua abordagem é baseada na entrega incremental do produto, por meio de ciclos curtos e contínuos denominados sprints, garantindo uma evolução constante e alinhada às necessidades do projeto.

O **SCRUM** estrutura papéis bem definidos, promovendo um fluxo de trabalho disciplinado e colaborativo. Essa estruturação permite a divisão eficiente das tarefas, fortalecendo a equipe para enfrentar desafios e aprimorando a
comunicação entre os membros.

A metodologia incentiva a troca de conhecimento e o debate construtivo de ideias, resultando em soluções mais inovadoras e adaptáveis. Dessa forma, esse método ágil não apenas otimiza o processo de desenvolvimento, mas também melhora a qualidade do produto final e a satisfação dos envolvidos.

## Relação de Ambientes de Trabalho

Os artefatos do projeto serão desenvolvidos utilizando **React Native** como framework principal para a construção da aplicação móvel. Os testes e validações serão realizados em dispositivos móveis físicos e emuladores. A tabela abaixo apresenta os ambientes de trabalho e suas respectivas plataformas:

| Ambiente | Plataforma | Link de Acesso |
|---------------|----------------------------------------------|----------------|
| Design e Prototipação | Figma | https://www.figma.com/proto/MiuZNsY107HDiJqKnMdyIm/Projeto-Wally?page-id=0%3A1&node-id=1-14&viewport=215%2C293%2C0.81&t=uLjzv6SkBrleFN8Z-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A14 |
| Desenvolvimento | React Native, Expo e Node.js | |
| Testes | Emuladores (Android Studio, iOS Simulator) e dispositivos físicos|
| Produção | Google Play Store, Apple App Store | |
| Documentação do Projeto | Github | https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally |
| Repositório do Código Fonte | Github | https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally/tree/main/src |
| Gerenciamento de Tarefas do Projeto | GitHub Projects | https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/1894 |
| Hospedagem | a definir | |

Durante o desenvolvimento, utilizaremos **Expo** para facilitar a criação e teste da aplicação, permitindo a execução em dispositivos físicos por meio do aplicativo **Expo Go**. Além disso, os emuladores serão utilizados para validação do funcionamento da aplicação em diferentes cenários.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o **Git**, com o repositório hospedado no **GitHub**, devido à sua facilidade de uso e à experiência técnica dos membros da equipe. O GitHub oferece uma interface prática e uma excelente integração com outras ferramentas de desenvolvimento, tornando o gerenciamento do código mais eficiente. O projeto segue uma versão simplificada do modelo **Gitflow** para organização do versionamento. 

As principais **branches** adotadas são:

- `main`: Esta branch contém a versão estável do software, já testada e pronta para produção. 
- `dev`: A branch de desenvolvimento e homologação, onde todas as novas features e correções de bugs são mescladas. Funciona como o ambiente de testes e preparação para a versão de produção.
- `testing`: Esta branch pode ser utilizada para versões que estão sendo testadas antes de serem validadas para a **dev** ou **main**.

O fluxo de trabalho permite que a **dev** seja continuamente atualizada com novas funcionalidades e correções de bugs, sendo, então, mesclada à **main** quando uma versão estável e testada estiver pronta para lançamento. O gerenciamento de **issues** no GitHub é utilizado para organizar e priorizar o trabalho do projeto. O sistema de **labels** (etiquetas) foi adotado para categorizar e facilitar o acompanhamento das atividades. 

As etiquetas são as seguintes:

- `documentation`: Utilizada para melhorar ou adicionar informações à documentação do projeto.
- `bug`: Usada quando uma funcionalidade ou parte do sistema apresenta erros ou problemas que precisam ser corrigidos.
- `enhancement`: Utilizada quando há necessidade de melhorias ou ajustes em funcionalidades já existentes no software.
- `feature`: Usada quando uma nova funcionalidade está sendo adicionada ao sistema.

Cada issue é atribuída a um membro da equipe, e o progresso das tarefas é monitorado por meio do GitHub. As issues também são vinculadas a **pull requests** para garantir que o código esteja alinhado com as tarefas estabelecidas.

## Gerenciamento de Projeto

### Divisão de Papéis

Com base na organização de papéis do método ágil SCRUM, a equipe foi estruturada para garantir uma colaboração eficaz e o alcance dos objetivos do projeto de maneira eficiente e coordenada. A abordagem é baseada na distribuição de responsabilidades claras e bem definidas, o que facilita o processo de desenvolvimento e promove a entrega de valor contínuo ao cliente.

A estrutura organizacional da equipe foi definida da seguinte forma:

– **Scrum Master:** Danielle.
<br>
– **Product Owner:** Ariane.
<br>
– **Equipe de Desenvolvimento:** Alexsander, Ariane, Danielle, Estevão, Raphael e Vinicius.
<br>
– **Equipe de Design:** Ariane.

Cada membro desempenha um papel fundamental dentro do time, garantindo que todos os aspectos do desenvolvimento sejam abordados de maneira eficaz e alinhada com os objetivos do projeto. Essa estrutura de papéis bem definida assegura uma gestão eficiente do projeto, facilitando a comunicação entre os membros da equipe.


### Processo

Para a implementação do SCRUM, adotamos uma série de práticas ágeis que garantem a organização, eficiência e transparência ao longo do desenvolvimento do projeto. Essas práticas não só promovem a colaboração da equipe, mas também asseguram que as entregas sejam feitas de forma incremental e alinhada com os objetivos do cliente.

*Cerimônias do SCRUM:*

- **Sprint Planning:** Ao início de cada Sprint, a equipe realiza uma reunião de planejamento, onde os itens do **Backlog do Produto** são selecionados e detalhados. A principal tarefa dessa cerimônia é definir as metas para a Sprint, atribuindo tarefas específicas aos membros da equipe e garantindo que todos compreendam claramente as atividades a serem realizadas.
 
- **Daily Standup:** São reuniões diárias rápidas, com duração de aproximadamente 15 minutos, nas quais cada membro da equipe compartilha seu progresso, os desafios encontrados e as tarefas que serão executadas até o próximo encontro. Essas reuniões são essenciais para manter todos os membros alinhados e identificar rapidamente quaisquer impedimentos que possam surgir.
  
- **Sprint Review:** Ao final de cada Sprint, a equipe realiza uma reunião de revisão, onde o trabalho realizado é apresentado ao Product Owner e outros stakeholders. Essa cerimônia tem como objetivo obter feedback sobre as entregas da Sprint, verificar se as expectativas foram atendidas e ajustar o trabalho para a próxima iteração, se necessário.
  
- **Sprint Retrospective:** Após a Sprint Review, a equipe realiza uma reunião de retrospectiva. Neste encontro, a equipe reflete sobre o processo de trabalho da Sprint anterior, identificando pontos positivos, oportunidades de melhoria e ações concretas para otimizar a produtividade e a qualidade no próximo ciclo.

*Gestão do Projeto no GitHub:*

Para facilitar a organização e o acompanhamento das atividades, a equipe utiliza o **GitHub Project**. Através do **Quadro Kanban**, as tarefas são distribuídas de forma visual e clara, garantindo que todos os membros da equipe saibam o status de cada atividade. O quadro está organizado da seguinte forma:

- **Product Backlog:** Esta lista contém todas as tarefas, funcionalidades e melhorias a serem implementadas ao longo do projeto. Representa o Backlog do Produto, onde todas as atividades são inicialmente registradas e priorizadas conforme as necessidades do cliente.
  
- **To Do:** Aqui estão as tarefas que foram selecionadas para a Sprint atual, também conhecidas como *Sprint Backlog*. Essas atividades estão prontas para serem iniciadas e são a base para o trabalho da equipe durante o ciclo da Sprint.
  
- **In Progress:** Esta lista contém as tarefas que já foram iniciadas. À medida que os membros da equipe começam a trabalhar nas atividades, elas são movidas para essa coluna, garantindo visibilidade do progresso do trabalho em andamento.
  
- **Done:** As tarefas que foram concluídas, testadas e validadas entram nesta lista. Elas estão prontas para serem entregues ao cliente ou stakeholders e são consideradas entregas finalizadas. A movimentação para essa lista indica que as atividades passaram pelos controles de qualidade e estão de acordo com os requisitos definidos.

<h4 align="center">Etapa 1:</h4>

![FIGURA 01 - Quadro de Kanban](https://github.com/user-attachments/assets/87d80c3f-aad3-46e3-a1d6-1102ead0d8c9)

<h4 align="center">FIGURA 07 - Quadro Kanban</h4>

**Planejamento:**

A primeira etapa do projeto Wally envolveu a concepção, definição da proposta de solução e a estruturação inicial do projeto. O foco foi estabelecer a base documental e arquitetural, garantindo um direcionamento claro para o desenvolvimento da aplicação. Foram definidas as seguintes atividades:
- Levantamento do problema e definição do escopo do projeto;
- Identificação dos objetivos gerais e específicos;
- Definição do público-alvo e justificativa do projeto;
- Elaboração das especificações do projeto, incluindo personas e histórias de usuário;
- Modelagem do processo de negócio utilizando BPMN para análise da situação atual e proposta de solução;
- Definição dos requisitos funcionais e não funcionais;
- Estabelecimento de restrições e regras de negócio;
- Criação do diagrama de casos de uso e matriz de rastreabilidade de requisitos;
- Planejamento do gerenciamento do projeto (cronograma, equipe e orçamento).

**Execução:**

Durante essa fase, a equipe estruturou toda a documentação de contexto e especificação do projeto. Foram realizadas reuniões para alinhamento das definições, validação das necessidades do usuário e organização das tarefas no quadro Kanban.
- Produção da documentação inicial e modelagem de processos de negócio (BPMN);
- Estruturação dos requisitos e restrições do projeto;
- Desenvolvimento dos primeiros diagramas UML para representar casos de uso;
- Definição da estratégia de rastreabilidade de requisitos para acompanhar o progresso do projeto.

**Evidências:**

- Documento de contexto consolidado, com definição clara do problema edos objetivos do projeto;
- Modelagem de processos de negócio finalizada (BPMN);
- Primeiras versões dos diagramas UML e matriz de rastreabilidade concluídas;
- Planejamento detalhado do gerenciamento do projeto, incluindo cronograma e divisão de papéis.
  
<h4 align="center">Etapa 2:</h4>

![FIGURA 02 - Quadro de Kanban](https://github.com/user-attachments/assets/3a463d7d-f2e8-4e12-82ba-42b4af877485)

<h4 align="center">FIGURA 08 - Quadro Kanban</h4>

**Planejamento:**

Na segunda etapa, o foco esteve na continuidade da elaboração do projeto e no início do desenvolvimento da solução, garantindo uma base sólida para a implementação das funcionalidades essenciais. As atividades planejadas incluíram:
- Definição da metodologia de desenvolvimento (SCRUM) e configuração do ambiente de trabalho;
- Implementação do gerenciamento ágil do projeto, priorizando organização e eficiência;
- Criação do projeto de interface, incluindo wireframes e diagrama de fluxo para representar a experiência do usuário;
- Modelagem da arquitetura da solução, abrangendo diagrama de classes, modelo entidade-relacionamento (ER) e esquema relacional do banco de dados;
- Desenvolvimento do template padrão da aplicação, definindo identidade visual (logo, cores, tipografia e iconografia);
- Planejamento e estruturação dos testes de software e usabilidade para garantir a qualidade da solução.
  
**Execução:**

Com a estrutura do projeto bem definida, a equipe iniciou as implementações essenciais, focando na organização e consistência da aplicação. As principais ações realizadas foram:
- Desenvolvimento do projeto de interface, garantindo uma navegação intuitiva e alinhada às necessidades dos usuários;
- Definição e construção do template padrão da aplicação, consolidando a identidade visual;
- Elaboração e formalização dos planos de teste, estabelecendo critérios para a validação das funcionalidades.

**Evidências:**

- Wireframes e diagramas de fluxo concluídos, representando a jornada do usuário na aplicação;
- Arquitetura da aplicação documentada e validada, garantindo alinhamento com os requisitos do projeto;
- Registros dos planos de teste estruturados, assegurando a cobertura necessária para futuras avaliações de qualidade.

<h4 align="center">Etapa 3:</h4>

![FIGURA 03 - Quadro de Kanban](https://github.com/user-attachments/assets/27bb8328-6c1a-4d1a-ba99-742b3ec66d48)


<h4 align="center">FIGURA 09 - Quadro Kanban</h4>

**Planejamento:**

Na terceira etapa, a equipe concentrou-se na ampliação do desenvolvimento da solução e na implementação de funcionalidades prioritárias. Esta fase teve como objetivo consolidar os avanços obtidos nas etapas anteriores e avançar na construção da aplicação móvel, com foco na qualidade e alinhamento dos requisitos. As atividades planejadas incluiram:

- Desenvolvimento do modelo físico parcial do banco de dados, com geração dos scripts SQL (DML);
- Implementação de funcionalidades de alta prioridade e de maior valor de negócio;
- Integração de mecanismos de autenticação para controle de acesso à aplicação;
- Atualização e detalhamento dos planos de teste de funcionalidade e usabilidade;
- Estabelecimeto de padrões de codificação e verificação de aderências às normas de qualidade de software;

**Execução**

Com base no planejamento estabelecido, a equipe iniciou o desenvolvimento de funcionalidades essenciais, priorizando os aspectos estruturais de segurança. As principais ações realizadas foram:
- Geração e aplicação dos scripts SQL de criação e manipulação de dados no banco de dados;
- Codificação das funcionalidades críticas da aplicação. seguindo os requisitos funcionais definidos;
Implementação do sistema de autenticação dos usuários, garantindo segurança no acesso;
- Atualização dos casos de teste e início dos registros de testes aplicados à aplicação;
- Revisão e padronização do código-fonte, assegurando a clareza, organização e manutenção futura;

**Evidências**
- Scripts SQL e DML gerados e aplicados, representando um modelo físico e parcial do banco;
- Funcionalidade de autenticação e módulos principais da aplicação implementados;
- Casos de teste atualizados e primeiros testes executados, com registros documentados;
- Quando Kanban atualizado no GitHub, evidenciando o gerenciamento contínuo do projeto;

### Ferramentas

Para garantir um desenvolvimento eficiente e colaborativo, adotamos diversas ferramentas que auxiliam na comunicação, organização, versionamento de código, design e implementação do projeto. Cada ferramenta foi selecionada com base em suas funcionalidades e na sua capacidade de atender às necessidades da equipe.

*1. Ferramentas de Desenvolvimento*

> **GitHub**: Plataforma essencial para o versionamento do código e colaboração entre os membros da equipe. No GitHub, utilizamos     repositórios privados para armazenar o código-fonte, garantindo organização e controle das versões. Além disso, realizamos commits frequentes e trabalhamos com branches para desenvolver novas funcionalidades ou corrigir bugs de forma isolada antes da integração ao código principal. O GitHub também é usado para gerenciamento ágil por meio do Quadro Kanban, facilitando a distribuição e acompanhamento das tarefas.
 
> **Node.js**: Uma plataforma JavaScript que permite a execução do código no lado do servidor. Ele foi escolhido por sua eficiência no desenvolvimento backend, escalabilidade e suporte a operações assíncronas, facilitando a comunicação entre a aplicação e o banco de dados.

> **React Native**: Biblioteca baseada no React, utilizada para o desenvolvimento do aplicativo móvel. Foi escolhida por permitir a criação de aplicativos nativos para iOS e Android com uma única base de código, otimizando tempo e recursos da equipe.

> **Expo & Expo Go**: Ferramentas que simplificam o desenvolvimento com React Native, permitindo testes rápidos no dispositivo sem necessidade de configuração complexa. O Expo fornece um ambiente de desenvolvimento integrado, enquanto o Expo Go permite visualizar e testar a aplicação diretamente no smartphone, facilitando o fluxo de desenvolvimento e testes.

> **Visual Studio Code (VS Code)**: Editor de código adotado pela equipe devido à sua interface intuitiva, suporte a múltiplas linguagens e integração com GitHub. Além disso, conta com extensões úteis para o desenvolvimento com JavaScript, Node.js e React Native, proporcionando uma experiência de codificação eficiente.

*2. Ferramentas de Comunicação e Gestão de Projetos*
    
> **Microsoft Teams**: Escolhido como a principal ferramenta de comunicação, pois oferece chamadas de vídeo, chats em grupo e compartilhamento de arquivos. Sua integração com outras ferramentas da Microsoft facilita a colaboração e mantém um histórico organizado das discussões do projeto.
  
> **WhatsApp**: Utilizado como canal complementar para comunicação rápida e informal. É útil para mensagens instantâneas, atualizações urgentes e alinhamentos rápidos, garantindo que a equipe permaneça conectada fora dos horários formais de reunião.
  
> **GitHub Project (Quadro Kanban)**: Usado para o gerenciamento ágil do projeto, organizando as tarefas em colunas como Backlog, To Do, In Progress e Done. Essa estrutura permite um acompanhamento visual claro do progresso do desenvolvimento.

*3. Ferramentas de Design e Prototipagem*
     
> **Figma**: Ferramenta essencial para design de interfaces e prototipagem. Com ela, a equipe pode criar wireframes, mockups e fluxogramas, garantindo uma visão clara do layout e funcionalidades do aplicativo antes do desenvolvimento. Sua capacidade de colaboração em tempo real permite que os designers compartilhem e revisem interfaces facilmente.
  
> **Canva**: Utilizado para a criação de slides de apresentação, logotipo e identidade visual do projeto. O Canva simplifica o design de materiais gráficos, proporcionando um visual profissional sem necessidade de ferramentas avançadas.
  
> **Lucid**: Ferramenta escolhida para criação de diagramas e visualização de fluxos de trabalho. Ele auxilia no planejamento da arquitetura do sistema, facilitando a comunicação dos processos e estrutura da aplicação para toda a equipe.

*4. Ambiente de Desenvolvimento*
   
Cada membro da equipe utiliza seu próprio computador ou notebook como ambiente de desenvolvimento configurado para suportar as tecnologias adotadas. O sistema operacional varia de acordo com a preferência individual, desde que compatível com as ferramentas utilizadas.

## Estratégia de Organização de Codificação
Todos os artefatos relacionados à implementação e visualização dos conteúdos do projeto da aplicação serão inseridos no [Código Fonte](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally/blob/main/src/README.md).
