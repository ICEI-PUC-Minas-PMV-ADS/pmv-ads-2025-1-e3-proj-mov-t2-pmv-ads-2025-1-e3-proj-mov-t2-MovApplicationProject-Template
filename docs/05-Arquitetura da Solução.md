# Arquitetura da Solução

O software é estruturado em dois componentes principais que trabalham em conjunto para oferecer a solução: o Front-end e o Back-end. O Front-end é responsável pela interface do usuário e pela interação, enquanto o Back-end gerencia a lógica de negócios, o armazenamento de dados e a comunicação com o Front-end.

![image](https://github.com/user-attachments/assets/7188a29c-eae4-4407-b1d2-d84c8c9007a7)


## Diagrama de Classes

O Diagrama de Classes representa as classes do sistema, seus atributos e métodos, além dos relacionamentos entre elas. Aqui está a descrição textual do diagrama:

![MER](https://github.com/user-attachments/assets/2e7dc326-40c5-449c-a590-4a9caaa9795b)

# Diagrama de Classes

O **Diagrama de Classes** representa as classes do sistema, seus atributos e métodos, além dos relacionamentos entre elas. Aqui está a descrição textual do diagrama:

## Classes e Relacionamentos

### Usuário
- **Atributos**:
  - `ID_Usuário: string`
  - `Nome: string`
  - `Email: string`
  - `Senha: string`
  - `Foto_Perfil: imagem`
  - `Biografia: string`
- **Métodos**:
  - `criarAvaliacao()`
  - `criarComentario()`
  - `criarListaPersonalizada()`
  - `seguirUsuario()`
  - `curtirReview()`
- **Relacionamentos**:
  - 1:N com **Avaliação**
  - 1:N com **Comentário**
  - 1:N com **ListaPersonalizada**
  - N:M com **Usuário** (seguir)

### Filme/Série
- **Atributos**:
  - `ID_Título: string`
  - `Nome: string`
  - `Gênero: string`
  - `Sinopse: string`
  - `Duração: string`
  - `Classificação_Indicativa: string`
  - `Elenco: string`
  - `Data_Lançamento: date`
- **Métodos**:
  - `receberAvaliacao()`
  - `receberComentario()`
- **Relacionamentos**:
  - 1:N com **Avaliação**
  - 1:N com **Comentário**
  - N:M com **ListaPersonalizada**

### Avaliação
- **Atributos**:
  - `ID_Avaliação: string`
  - `ID_Usuário: string`
  - `ID_Título: string`
  - `Nota: int`
  - `Comentário: string`
  - `Data_Avaliação: date`
- **Métodos**:
  - `criarAvaliacao()`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:1 com **Filme/Série**

### Comentário
- **Atributos**:
  - `ID_Comentário: string`
  - `ID_Usuário: string`
  - `ID_Título: string`
  - `Texto: string`
  - `Data_Comentário: date`
- **Métodos**:
  - `criarComentario()`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:1 com **Filme/Série**

### ListaPersonalizada
- **Atributos**:
  - `ID_Lista: string`
  - `ID_Usuário: string`
  - `Nome_Lista: string`
- **Métodos**:
  - `adicionarFilme()`
  - `removerFilme()`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:M com **Filme/Série**

### Seguir
- **Atributos**:
  - `ID_Seguir: string`
  - `ID_Usuário_Seguindo: string`
  - `ID_Usuário_Seguido: string`
- **Relacionamentos**:
  - N:M com **Usuário**

### Administrador
- **Atributos**:
  - `ID_Admin: string`
  - `Nome: string`
  - `Email: string`
  - `Senha: string`
- **Métodos**:
  - `moderarAvaliacao()`
  - `moderarComentario()`
- **Relacionamentos**:
  - Modera **Avaliação** e **Comentário**

---

# Modelo Entidade-Relacionamento (MER)

O **Modelo Entidade-Relacionamento (MER)** descreve as entidades, seus atributos e os relacionamentos entre elas. Aqui está a descrição textual do MER:

## Entidades e Relacionamentos

### Usuário
- **Atributos**:
  - `ID_Usuário (PK)`
  - `Nome`
  - `Email`
  - `Senha`
  - `Foto_Perfil`
  - `Biografia`
- **Relacionamentos**:
  - 1:N com **Avaliação**
  - 1:N com **Comentário**
  - 1:N com **ListaPersonalizada**
  - N:M com **Usuário** (seguir)
  - N:M com **Review**

### Filme/Série
- **Atributos**:
  - `ID_Título (PK)`
  - `Nome`
  - `Gênero`
  - `Sinopse`
  - `Duração`
  - `Classificação_Indicativa`
  - `Elenco`
  - `Data_Lançamento`
- **Relacionamentos**:
  - 1:N com **Avaliação**
  - 1:N com **Comentário**
  - N:M com **ListaPersonalizada**

### Avaliação
- **Atributos**:
  - `ID_Avaliação (PK)`
  - `ID_Usuário (FK)`
  - `ID_Título (FK)`
  - `Nota`
  - `Comentário`
  - `Data_Avaliação`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:1 com **Filme/Série**

### Comentário
- **Atributos**:
  - `ID_Comentário (PK)`
  - `ID_Usuário (FK)`
  - `ID_Título (FK)`
  - `Texto`
  - `Data_Comentário`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:1 com **Filme/Série**

### ListaPersonalizada
- **Atributos**:
  - `ID_Lista (PK)`
  - `ID_Usuário (FK)`
  - `Nome_Lista`
- **Relacionamentos**:
  - N:1 com **Usuário**
  - N:M com **Filme/Série**

### Seguir
- **Atributos**:
  - `ID_Seguir (PK)`
  - `ID_Usuário_Seguindo (FK)`
  - `ID_Usuário_Seguido (FK)`
- **Relacionamentos**:
  - N:M com **Usuário**

### Administrador
- **Atributos**:
  - `ID_Admin (PK)`
  - `Nome`
  - `Email`
  - `Senha`
- **Relacionamentos**:
  - Modera **Avaliação** e **Comentário**
As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)


## Modelo Físico

O modelo físico pode ser encontrado no arquivo [`nextflix.sql`](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-nextflix/blob/main/src/nextflix.sql), localizado no diretório [`/src`](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-nextflix/tree/main/src) do projeto.

## Tecnologias Utilizadas

As tecnologias utilizadas estão descritas na  ['Relação de Ambientes de Trabalho'](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-nextflix/blob/main/docs/03-Metodologia.md) dentro da Metodologia do projeto.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

**Introdução**

A qualidade de software é um conjunto de características que garantem que um sistema atenda às necessidades do usuário, funcione corretamente, seja seguro e tenha bom desempenho. Um software de qualidade deve ser funcional, confiável, usável e manutenível, além de apresentar um alto nível de segurança e eficiência.

O NextFlix é um aplicativo de streaming que visa proporcionar uma experiência fluida e agradável para os usuários, permitindo que assistam a conteúdos diversos de forma organizada e intuitiva. Para garantir a qualidade do software, avaliamos os principais aspectos que influenciam na experiência do usuário e na eficiência do sistema.

-------------------------------------------------------------------------------------------------------------

**Características de Qualidade**

`Funcionalidade`

- O NextFlix deve fornecer todas as funcionalidades essenciais, como busca de filmes e séries, recomendações personalizadas e criação de listas.

- Precisa garantir a exibição correta dos conteúdos, sem falhas de carregamento ou exibição.

- Deve seguir padrões e regulamentações de direitos autorais e acessibilidade.

`Usabilidade`

- O aplicativo deve ser intuitivo e fácil de navegar, com menus organizados e opções claras.

- Deve permitir que novos usuários aprendam a utilizá-lo rapidamente, sem necessidade de treinamento prévio.

- A interface deve ser responsiva e acessível para diferentes perfis de usuários.

`Desempenho e Eficiência`

- O NextFlix precisa ser rápido no carregamento dos vídeos e na navegação.

- Deve usar os recursos do sistema de forma eficiente, garantindo que o consumo de internet e processamento seja otimizado.

`Segurança`

- Os dados dos usuários devem ser protegidos, garantindo confidencialidade e evitando acessos não autorizados.

- Os pagamentos e assinaturas devem ser seguros, com protocolos de criptografia.

`Manutenibilidade`

- O código deve ser bem estruturado e modular, permitindo correções e atualizações frequentes.

- A plataforma deve permitir a implementação rápida de novas funcionalidades e melhorias.

-------------------------------------------------------------------------------------------------------------

**Tabela de Avaliação Técnica**

| Subcaracterística | Métrica | Escala | Peso    |
|--------------------|------------------------------------|----------------------------------------|--------------------|
|Adequação  | O sistema cumpre suas funções corretamente?  | 1) Atende completamente 2) Atende parcialmente 3) Não atende | ALTO |
|Acurácia  | O sistema entrega resultados corretos e consistentes?  | 1) Atende completamente 2) Atende parcialmente 3) Não atende | ALTO |
|Conformidade  | O NextFlix segue padrões de acessibilidade e regulamentações?  | 1) Atende completamente 2) Atende parcialmente 3) Não atende | ALTO |
|Usabilidade  | É fácil de aprender e usar?  | 1) Sim 2) Parcialmente 3) Não | ALTO |
|Desempenho  | O tempo de carregamento dos vídeos é satisfatório?  | 1) Sim 2) Parcialmente 3) Não | ALTO |
|Segurança  | O sistema protege os dados do usuário?  | 1) Sim 2) Não | ALTO |
|Manutenibilidade  | O sistema permite atualizações sem grandes impactos?  | 1) Sim 2) Parcialmente 3) Não | ALTO |

-------------------------------------------------------------------------------------------------------------

**Conclusão**

A avaliação da qualidade do NextFlix mostra que o software deve atender a critérios rigorosos de funcionalidade, usabilidade, desempenho, segurança e manutenção. A combinação desses fatores garante uma experiência positiva para os usuários e uma plataforma confiável para consumo de conteúdos digitais.

Com uma estrutura modular, segurança robusta e foco na experiência do usuário, o NextFlix se posiciona como um serviço de alta qualidade no mercado de streaming.

