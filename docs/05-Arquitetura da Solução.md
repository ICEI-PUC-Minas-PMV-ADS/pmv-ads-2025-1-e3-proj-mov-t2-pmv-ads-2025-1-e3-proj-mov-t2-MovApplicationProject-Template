# Arquitetura da Solução

## Diagrama de Classes

![wally-diagrama-de-classes](https://github.com/user-attachments/assets/1fa1fc4c-37c0-47b6-a367-aa2106713611)

<h4 align="center">FIGURA 26 - Diagrama de Classes do Wally</h4>

## Modelo ER

![wally-diagrama-er](https://github.com/user-attachments/assets/89748024-49b9-4ec0-9a31-7755a1d77b2a)

<h4 align="center">FIGURA 27 - Diagrama Entidade-Relacionamento do Wally</h4>

## Esquema Relacional

![wally-esquema-relacional](https://github.com/user-attachments/assets/df6e22bc-06a5-4170-aeee-da422e4e660d)

<h4 align="center">FIGURA 28 - Diagrama ER de Banco de Dados</h4>

## Modelo Físico

Para garantir a estruturação eficiente dos dados no Wally, foi desenvolvido o **modelo físico do banco de dados**. Esse modelo define a criação das **tabelas**, relacionamentos e restrições, assegurando a integridade e o bom desempenho das operações no sistema.

O arquivo `banco.sql` contém os scripts necessários para essa implementação e está localizado na pasta `src\bd`.

🔗 Acesse o arquivo pelo link: [banco.sql](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally/blob/main/src/bd/banco.sql).

## Tecnologias Utilizadas

Para o desenvolvimento do Wally, um aplicativo mobile de gestão financeira, utilizaremos um conjunto de tecnologias modernas que garantem eficiência, escalabilidade e uma experiência de usuário fluida. A seguir, apresentamos as **principais ferramentas** e **tecnologias** adotadas, abrangendo desde o design do aplicativo até a estrutura de banco de dados e o back-end da solução:

> **React Native:**  Framework utilizado para o desenvolvimento do aplicativo mobile, permitindo a criação de interfaces nativas para Android e iOS a partir de um único código, proporcionando uma experiência fluida e responsiva.

> **JavaScript/TypeScript:** Linguagens principais do desenvolvimento do Wally, garantindo tipagem segura e maior confiabilidade no código.

> **Node.js:** Ambiente de execução para o back-end do aplicativo, proporcionando alta performance e escalabilidade para as operações do sistema.

> **PostgreSQL:** Banco de dados relacional utilizado para armazenamento e gerenciamento de informações financeiras dos usuários, garantindo segurança, integridade e eficiência no tratamento dos dados.

> **Docker:** Utilizado para containerização da aplicação, garantindo que o ambiente de desenvolvimento e produção sejam consistentes e permitindo que o aplicativo seja executado em diferentes sistemas operacionais, incluindo Windows, macOS e Linux, sem conflitos de dependências.

> **Expo:** Ferramenta que facilita o desenvolvimento e a visualização do aplicativo durante a fase de prototipação e testes.

#### Ferramentas e IDEs

> **Figma:** Utilizado para o design da interface e criação dos protótipos interativos, permitindo uma melhor experiência na fase de planejamento visual.

> **Visual Studio Code (VSCode):** IDE principal utilizada no desenvolvimento do Wally, oferecendo suporte para JavaScript, TypeScript e ferramentas de controle de versão.

> **Git e GitHub:** Plataforma para versionamento de código e colaboração entre os desenvolvedores, garantindo um fluxo de trabalho organizado e seguro.

#### Interação e Fluxo de Dados

O fluxo de interação do usuário no Wally será conduzido da seguinte forma:

  **1. Interação do Usuário:** O usuário acessa o aplicativo mobile para realizar consultas financeiras, registrar transações e visualizar relatórios.

  **2. Front-End (React Native):** A interface processa as interações do usuário e envia solicitações ao back-end.

  **3. Back-End (Node.js):** As requisições são processadas pelo servidor, que executa a lógica de negócio e interage com o banco de dados.

  **4. Banco de Dados (PostgreSQL):** Gerencia e armazena os dados financeiros dos usuários, garantindo segurança, consistência e eficiência nas consultas.

  **5. Resposta ao Usuário:** O back-end retorna os dados processados ao front-end, que os apresenta ao usuário na interface do aplicativo, garantindo uma experiência fluida e intuitiva.

<!-- Além disso, a arquitetura e a implementação do Wally serão estruturadas com base na norma técnica de qualidade de software **ISO/IEC 25010:2011**, garantindo altos padrões de usabilidade, eficiência e confiabilidade. Isso reforça nosso compromisso em oferecer um aplicativo seguro, intuitivo e de alto desempenho para a gestão financeira dos usuários. -->

![React Native](https://github.com/user-attachments/assets/b79e5a70-9259-4bfd-ba69-af17519786ef)

<h4 align="center">FIGURA 29 - Fluxo de Interação do Usuário com o Sistema</h4>

 <!--  ## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html) -->

## Qualidade de Software

A qualidade de software pode ser definida como um conjunto de características que garantem que um produto atenda às expectativas dos usuários e stakeholders. Para assegurar um alto nível de qualidade no desenvolvimento do Wally, um aplicativo de gestão financeira, utilizamos como base a norma internacional **ISO/IEC 25010**, que define características e subcaracterísticas essenciais para um software confiável, eficiente e intuitivo. As subcaracterísticas selecionadas e suas respectivas justificativas são apresentadas a seguir:

**1. Funcionalidade**

- **Adequação Funcional:** O Wally deve atender plenamente às necessidades dos usuários, garantindo que todas as funcionalidades de gestão financeira sejam implementadas corretamente e de forma eficiente.

- **Precisão:** Os cálculos financeiros realizados pelo app devem ser exatos, evitando erros que possam comprometer a confiabilidade das informações.

- **Segurança:** Como o aplicativo lida com dados financeiros sensíveis, é essencial garantir proteção contra acessos não autorizados e vazamento de informações.

**2. Confiabilidade**

- **Maturidade:** O Wally deve ser testado rigorosamente para minimizar falhas e evitar interrupções no serviço.

- **Disponibilidade:** O aplicativo precisa garantir um tempo de atividade elevado para que os usuários possam acessá-lo sempre que necessário.

- **Tolerância a Falhas:** Em caso de falhas ou erros, o sistema deve ser capaz de se recuperar rapidamente, minimizando impactos para o usuário.

**3. Usabilidade**

- **Apreensibilidade:** A interface do Wally deve ser intuitiva, facilitando o aprendizado e a navegação para usuários com diferentes níveis de experiência.

- **Operacionalidade:** O aplicativo deve proporcionar uma experiência fluida, garantindo interações simples e eficientes.

- **Acessibilidade:** Deve-se garantir que o app seja utilizável por pessoas com diferentes necessidades, incluindo suporte para acessibilidade digital.

**4. Eficiência de Desempenho**

- **Tempo de Resposta:** O Wally deve apresentar respostas rápidas nas interações, evitando lentidões que possam prejudicar a experiência do usuário.

- **Utilização de Recursos:** A aplicação deve ser otimizada para consumir o mínimo de recursos do dispositivo, garantindo um funcionamento eficiente sem sobrecarga de processamento ou memória.

**5. Manutenibilidade**

- **Modularidade:** A estrutura do código deve ser organizada de forma modular, permitindo a implementação e atualização de funcionalidades sem comprometer o restante do sistema.

- **Reusabilidade:** O código deve ser escrito de maneira reutilizável, facilitando a expansão futura do aplicativo.

- **Analisabilidade:** O sistema deve permitir diagnósticos rápidos para identificar falhas e otimizar o processo de correção de erros.

**6. Portabilidade**

- **Adaptabilidade:** O Wally deve ser compatível com diferentes dispositivos móveis e sistemas operacionais, proporcionando uma experiência consistente.

- **Instalabilidade:** A instalação e atualização do aplicativo devem ser simples e diretas, minimizando dificuldades para os usuários.

**Métricas para Avaliação da Qualidade**

Para garantir que as subcaracterísticas selecionadas sejam atendidas, algumas métricas serão utilizadas:

- *Índice de satisfação do usuário:* Coletada por meio de feedbacks e avaliações na loja de aplicativos.
- *Taxa de erros funcionais e falhas:* Avalia a frequência de falhas críticas e erros reportados pelos usuários.
- *Tempo médio de resposta:* Mede o tempo necessário para carregar telas e processar ações dos usuários.
- *Tempo médio entre falhas (MTBF):* Verifica a estabilidade do sistema ao longo do tempo.
- *Índice de usabilidade (SUS - System Usability Scale):* Avaliação da experiência do usuário com base em testes práticos e feedbacks.
- *Número de incidentes de segurança:* Registra tentativas de acesso não autorizado e vulnerabilidades identificadas.
- *Tempo médio de recuperação:* Mede o tempo necessário para restaurar o sistema após uma falha.
- *Consumo de Recursos:* Monitoramento da utilização e memória do dispositivo.
- *Taxa de Acessibilidade:* Percentual de conformidade com diretrizes de acessibilidade.

Ao adotar essas práticas e a implementação e monitoramento contínuo dessas métricas, o Wally garantirá um alto padrão de qualidade, proporcionando aos usuários uma experiência confiável, segura e eficiente na gestão financeira.








