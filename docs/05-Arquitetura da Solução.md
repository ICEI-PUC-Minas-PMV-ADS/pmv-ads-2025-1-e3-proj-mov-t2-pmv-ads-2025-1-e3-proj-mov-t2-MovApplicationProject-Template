# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

![Diagrama de Classes](img/diagrama-de-classe.svg)

## Modelo ER
Diagrama ER classe
![image](https://github.com/user-attachments/assets/c99e2d9f-7eb2-42c2-a8b5-3a732da2dad3)


## Esquema Relacional

Link para visualização do Esquema Relacional : https://dbdocs.io/mauricio.neto.azevedo/PlanIt-Database?view=relationships

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

**Linguagens e Ambiente de Execução**

JavaScript (ES6+): A linguagem principal para desenvolvimento do front-end.

React: Biblioteca para a construção da interface de usuário.

**Frameworks e Plataformas**

React Native: Framework para desenvolvimento de aplicativos móveis nativos usando JavaScript.

Expo: Ferramenta e plataforma que agiliza o desenvolvimento, teste e publicação de aplicativos React Native.

**Bibliotecas e Pacotes**

@react-navigation/native, @react-navigation/native-stack e @react-navigation/stack: Bibliotecas para gerenciamento de rotas e navegação entre telas no aplicativo.

expo-auth-session: Biblioteca para autenticação e gerenciamento de sessões.

@react-native-google-signin/google-signin: Integração para permitir o login utilizando a conta Google.

expo-crypto: Utilizada para operações de criptografia dentro do app.

expo-status-bar: Componente para gerenciar a status bar dos dispositivos de forma padronizada.

react-native-safe-area-context e react-native-screens: Auxiliam na criação de layouts que respeitam as áreas seguras dos dispositivos e otimizam a transição entre telas.

react-native-vector-icons: Permite a utilização de ícones vetoriais customizáveis, muito comuns em interfaces modernas.

@expo/metro-runtime: Parte do ecossistema Expo para gerenciamento do bundle via Metro bundler.

**Ferramentas e IDEs de Desenvolvimento**

Visual Studio Code: Uma das IDEs mais populares para desenvolvimento JavaScript/React Native, que pode ser utilizada para editar e depurar o código.

Node.js: Ambiente de execução para JavaScript no back-end e gerenciamento de pacotes via npm ou yarn.

Git e GitHub: Controle de versão e hospedagem do repositório, facilitando a colaboração e o versionamento do projeto.

Figma: Criação do design da interface das paginas, permitindo melhor experiência durante o planejamento visual

**Serviços Web e de Build**

Expo CLI: Utilizada para iniciar, desenvolver e testar o aplicativo em diversos dispositivos e ambientes (Android, iOS e Web).

Metro Bundler: Bundler padrão utilizado pelo React Native para empacotar os módulos JavaScript do aplicativo.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

No desenvolvimento do projeto **PlanIt**, adotamos alguns aspectos de qualidade baseados na norma ISO/IEC 25010. A ideia é que, mesmo sendo um projeto acadêmico, possamos garantir que o software atenda às necessidades dos usuários e dos stakeholders. A seguir, descrevemos as principais sub-características de qualidade escolhidas, suas justificativas e as métricas que utilizaremos para avaliá-las.

---

## 1. Funcionalidade
- **Sub-características:**
  - *Completude Funcional*: Garantir que todas as funções definidas nos requisitos sejam implementadas.
  - *Exatidão Funcional*: As funções devem executar corretamente as tarefas para as quais foram projetadas.
- **Justificativa:**
  A funcionalidade é a base do sistema. Se as funções principais não estiverem implementadas ou funcionarem errado, o software não cumprirá seu objetivo.
- **Métricas Sugeridas:**
  - Percentual de requisitos implementados conforme o que foi planejado.
  - Número de defeitos encontrados durante os testes.
  - Taxa de sucesso na execução dos casos de uso.

---

## 2. Usabilidade
- **Sub-características:**
  - *Capacidade de Aprendizagem*: Facilidade com que novos usuários aprendem a usar o sistema.
  - *Operabilidade*: Simplicidade e facilidade de uso, diminuindo erros durante a utilização.
- **Justificativa:**
  Uma interface amigável é importante para que os usuários consigam usar o **PlanIt** sem dificuldades, o que é fundamental em um aplicativo de organização.
- **Métricas Sugeridas:**
  - Tempo médio para a realização das tarefas mais importantes.
  - Índice de satisfação dos usuários.
  - Quantidade de erros cometidos pelos usuários ao usar o sistema.

---

## 3. Desempenho
- **Sub-características:**
  - *Tempo de Resposta*: Velocidade com que o sistema responde às ações dos usuários.
  - *Utilização de Recursos*: Eficiência no uso de memória e processamento.
- **Justificativa:**
  Um bom desempenho evita que o aplicativo fique lento ou trave, proporcionando uma melhor experiência de uso, principalmente em dispositivos móveis.
- **Métricas Sugeridas:**
  - Tempo médio de resposta.
  - Número de operações realizadas por unidade de tempo.
  - Monitoramento do uso de recursos, como CPU e memória.

---

## 4. Confiabilidade
- **Sub-características:**
  - *Disponibilidade*: O sistema deve estar sempre disponível para os usuários.
  - *Maturidade*: O sistema deve apresentar poucos erros durante o uso.
  - *Capacidade de Recuperação*: Rapidez e eficiência na recuperação após eventuais falhas.
- **Justificativa:**
  Para que os usuários confiem no **PlanIt**, é necessário que o sistema funcione de forma contínua e consiga se recuperar rapidamente em caso de problemas.
- **Métricas Sugeridas:**
  - Número de falhas ou incidentes por período.
  - MTBF.
  - MTTR.

---

## 5. Segurança
- **Sub-características:**
  - *Confidencialidade*: Proteção dos dados contra acessos não autorizados.
  - *Integridade*: Garantir que os dados não sejam alterados indevidamente.
  - *Autenticidade*: Verificação da identidade dos usuários.
- **Justificativa:**
  A segurança é fundamental, pois o **PlanIt** pode conter dados pessoais e informações importantes dos usuários. Assim, é preciso protegê-los para manter a confiança no sistema.
- **Métricas Sugeridas:**
  - Número de vulnerabilidades encontradas e corrigidas.
  - Tempo para aplicar correções de segurança.
  - Conformidade com boas práticas e normativas de segurança.

---

## 6. Manutenibilidade
- **Sub-características:**
  - *Modularidade*: Estruturação do código em partes independentes para facilitar alterações e expansões.
  - *Testabilidade*: Facilidade para criar e executar testes que garantam o funcionamento do sistema.
- **Justificativa:**
  Um código bem organizado e testado torna o sistema mais fácil de manter e atualizar, o que é importante tanto para a evolução do projeto quanto para correção de eventuais erros.
- **Métricas Sugeridas:**
  - Complexidade do código.
  - Percentual de cobertura dos testes automatizados.
  - Tempo médio para corrigir defeitos reportados.
