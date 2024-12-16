# Sistema Jogos de Tabuleiro
O sistema Jogos de Tabuleiro é uma aplicação desenvolvida para facilitar e enriquecer a experiência de jogadores em partidas de jogos de tabuleiro. Ele permite a criação, gestão e participação de partidas, além de oferecer funcionalidades específicas como a rolagem de dados em um ambiente interativo e dinâmico.
Estruturado em torno de quatro entidades principais — Partidas (Matches), Rodadas (Rounds), Jogadas (Plays) e Usuários (Users) — o sistema foi projetado com tecnologias modernas para oferecer uma interface intuitiva e funcionalidades práticas que atendem às necessidades dos jogadores.

## Entidades do Sistema e Funcionalidades
Entidades:

**Partida**: Representa o ambiente global do jogo, incluindo informações sobre o cenário, configurações e a coleção de rodadas realizadas pelos jogadores.

**Rodadas**: São subdivisões da Partida, dividindo a experiência do jogo em sessões individuais. Cada rodada pode conter uma ou mais "Plays" que consistem nas rolagens de dados e ações executadas pelos usuários.

**Plays (Jogadas)**: Correspondem às ações executadas durante as rodadas. Isso inclui as rolagens de dados e quaisquer interações dos jogadores durante a jogada.

**Usuários**: Representam os jogadores que acessam o sistema. Eles têm a capacidade de interagir com as rodadas, realizar jogadas e participar das partidas.

### Funcionalidades:
O principal objetivo do sistema é fornecer uma plataforma interativa para jogadores de RPG realizarem suas ações durante as partidas, mantendo registros das rodadas, jogadas e interações dos usuários. Tudo isso é implementado com a ideia de um CRUD.

As funcionalidades principais incluem:

  - Registro de informações sobre partidas.
  - Divisão de partidas em rodadas para manter a progressão do jogo.
  - Registro das ações dos jogadores durante as rodadas, incluindo rolagens de dados.
  - Controle de usuários e gerenciamento de suas interações no sistema.
  - O sistema foi projetado e implementado para oferecer uma experiência agradável e dinâmica para os usuários durante suas sessões de jogo.
    
## Tecnologias

- **JavaScript**: Linguagem de programação principal usada para a lógica e interações no lado do cliente e do servidor.
- **Node.js**: Plataforma que permite a execução de JavaScript no servidor.
- **Sequelize**: ORM (Object-Relational Mapping) para interagir com o banco de dados, fornecendo uma abstração para trabalhar com a base de dados.
- **Express**: Framework web para Node.js utilizado para configurar rotas, middlewares, e manipular requisições HTTP.
- **SQLite**: Banco de dados escolhido para armazenar os dados da aplicação. É um banco de dados leve e altamente eficiente para sistemas de menor escala.

## Grupo
- **Janderson Santos**
- **Thiago Pádua**
- **Gabriel Fialho**
