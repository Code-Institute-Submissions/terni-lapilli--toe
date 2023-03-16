# **\_\*\***Tic Tac & Toe**\*\*\_**

[![](\_documentation/Screenshots/\_\_\_"AmiResponsive: <https://ui.dev/amiresponsive?url=>")](https://ui.dev/amiresponsive?url=/ "Visit the Proof of Responsiveness: 3 Grains & Toe")

> Visit: [3 Grains & Toe](https://ipoetdev.github.io/terni-lapilli--toe/ "3 Grains & Toe: <https://ipoetdev.github.io/terni-lapilli--toe/> by Charles J Fowler (@ipoetdev)") | [https://ipoetdev.github.io/terni-lapilli--toe/](https://ipoetdev.github.io/terni-lapilli--toe/)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

---

## **1. Project Goals**

### _<ins>Game Rules</ins>_

Here are the basic rules of Tic Tac Toe:

- The game is played on a `3x3` grid.
- There are two players, `X` and `O`.
- Players take turns placing their symbol (`X` or `O`) on an empty cell.
- The first player to get three of their symbols (`x3`) in a row (horizontally, vertically, or diagonally) wins the game.
- If all cells on the board are occupied and no player has won, the game is a tie.

### _<ins>Developer Goals</ins>_

<!--
 Note: This developer learnt UML and software design by diagrams 20 years ago, under his Masters of Technology at RMIT (CS). This project is a showcase for some of these techniques under the Design section below.
-->

- Develop a working MVP version for a game of TicTacToe
- Develop a pattern/model of a codebase that is:
  - Modular and extensibile.
  - Configurable
  - Well documented.
  - Ease of:
    - Readability and analysability.
    - Implementation.
    - Deployment.
  - Changable: Modular, uses OOP.
  - Stable, and reasonable error control flow.
  - Testible: OOP, Error Handling, Debug
- To showcase via this README, not for brevity and concisness, but showcase of my prior art and knowledge of software development (OOP, Technical Documentation, Tooling); given a Masters of Technology [2002-04] qualification.

### _<ins>User | Audience Goals</ins>_

- [DF001](#df001) Play the board game, Tic Tac Toe: Two Player, Two Pieces: (X & O)
  - As a user wants to play a TicTacToe game, so that users can have fun and pass the time.
- [DF002](#df002) Via a simple game of Tic Tac Toe, on a single HTML, via a simple screen, i.e. a Simple Click game logic.
- [FE001](#fe001) User(s) choose game pieces, and customise the type of pieces in the process.
- [FE002](#fe002) Game Statistics to keep count of wins, looses, draws for players, keeping track of scores.
- [FE003](#fe003) User can save the game, at any time, and reload the game from the same saved state.
- [FE004](#fe004) User can change the playing difficulty:
  - [DF002](#df002) Level 1) Simple: Human Click (MVP)
  - [FE005](#fe005) Level 2) Medium: Computer (Random)
  - [FE006](#fe006) Level 3) Hard:Computer AI (Minimax)

---

---

## **2. Plan**

### _<ins>User Experience</ins>_

1. _Game Objective_: Explains the objective of the game, which is to place three marks in a row, either horizontally, vertically or diagonally.
2. _Game Play_: Instructuions Describe how the game is played. Each player takes turns placing their mark on an empty cell on the game board. The first player to get three marks in a row wins the game.
3. _Game Board_: Inform that a board which is a 3x3 grid surface. Each cell is empty at the start of the game, and players take turns placing their marks on the board.
4. _User Interaction_: Inform how the user interacts with the game, which is by tapping or clicking on an empty cell to place their mark.
5. _Feedback_: Provide feedback to the user after each move, such as highlighting the winning row or reporting that the game has ended in a draw. Additionally, for invalid moves.
6. _Error Feedback_: Provide feedback to the user when the app or the game logic throw an error from user input or from a runtime exception.
    - Provide graceful degradation in error handling and/or ...
    - Provide graceful degradation when logging console errors and/or ...
    - Give the user an option to either i) choose or ii) contact the developer and log a bug.
7. _Restarting the Game_: Allow the user to easily restart the game, either by clicking a button. <!-- or shaking the device. -->

#### _<ins>Audience(s)</ins>_

- _Users_:
  - who love board games.
  - who like strategic games.
  - who like tatical games.
  - who like similar games to TicTacToe, a 3,3,3-game, an an [m,n,k-game](https://en.wikipedia.org/wiki/M,n,k-game)
- _Junior developers_
  - who are looking to learn javascript.
  - who are looking to learn object orientated programming.
  - who are looking to learn JDDoc commenting for documentation.
  - who are looking to use text to diagram technologies, like mermaid and techniques like UML etc.

#### _<ins>Requirements</ins>_

1. User Stories

#### _<ins>Roadmap</ins>_

---

---

## **3. Design (UXD)**

### _<ins>App Design</ins>_

#### _UI: HTML &amp; CSS_

The game board is created using HTML div elements styled with CSS.

- Each cell on the board is represented by a div element with a data attributes that stores its state, ident, and row, colium and coordinate position on the board.
- The board is styled using CSS Grid to create a 3x3 grid of cells with inner and outer borders, that creates a faux padding around each cell.
- Each cell as relative border radii.

#### _App: JavaScript_

> This is all rought draft version of the text, labels and names are likely to change.

- The game logic is implemented using JavaScript classes, and files using JS modules, that represent:
  - Class: the _App_, i.e. `__App.js`. Initailises the app on page load, and event listeners.
    - UI Helper Class: the _StartListener_, i.e. `__StartListener.js`.
    - UI Helper Class: the _MoveListener_, i.e. `__MoveListener.js`.
  - Class: the _Game_, i.e. `__Game.js`. Game controller
    - Class: the _GamePieces_, i.e. `__GamePieces.js`. Game symbol statemachine, and customised pieces storage.
    - Class: the _GameLogic_, i.e. `__GameLogic.js`: Logic machine, randomisation and possibly difficulty levels.
    - Class: the _GameBoard_, i.e. `__GameBoard.js`: Statemachine for the game play, and or local storage.
  - Utility Classes:
    - Class: the _GameDebug_, a debugger, i.e `__GameDebug.js`: Centralised console debugging statements.
    - Class: the _GameConfig_, configuration string, i.e. `__GameConfig.js`: Reduce hard coded strings.

### _<ins>Diagrams</ins>_

#### _States of the Game_

The state diagram for a game of Tic Tac Toe can be represented with the following states:

- _Start_: The game has not yet started.
<!-- - _Player 1 Choose_: Player 1's choose a symbol.
-   _Player 2 Choose_: Player 2's choose a symbol. -->
- _Player 1 Turn_: Player 1's has a current turn.
- _Player 2 Turn_: Player 2's has a current turn.
- _Player 1 Wins_: Player 1 has won the game.
- _Player 2 Wins_: Player 2 has won the game.
- _Tie Game_: The game has ended in a tie.
<!-- - _Save_: can be activated by any Player to save a game state. -->
- _Start_ can be activated by any Player, and is an alias for _Start_ to start a new game,
  - and can be used a a following state from a terminal state

#### _Transition States of the Game_

Each state can transition to other states based on certain conditions. The possible transitions are:

- _Start_ can transition to _Player 1 Turn_.
- _Player 1 Turn_ can transition to _Player 2 Turn_ or _Player 1 Wins_ or _Tie Game_.
- _Player 2 Turn_ can transition to _Player 1 Turn_ or _Player 2 Wins_ or _Tie Game_.
- _Player 1 Wins_ and _Player 2 Wins_ and _Tie Game_ are terminal states and cannot transition to any other state in the current game.

#### _State Diagram_

```mermaid
stateDiagram-v2
    Start --> Player1Turn
    Player1Turn --> Player2Turn
      Player1Turn --> Player1Wins
      Player1Turn --> TieGame
    Player2Turn --> Player1Turn
      Player2Turn --> Player2Wins
      Player2Turn --> TieGame
    Player1Wins --> End
    Player2Wins --> End
    TieGame --> End
    End --> Restart
    Restart --> NewGame
    NewGame --> Start
    Start: The game has not yet started.
      Player1Turn: It's Player 1's current turn.
      Player2Turn: It's Player 2's current turn.
      Player1Wins: Player 1 has won the game.
      Player2Wins: Player 2 has won the game.
      TieGame: The game has ended in a tie.
    End: Current game terminal state.
    Restart: Resets current game state,
    NewGame: Initialises the next/new game state.
```

#### _User Journey_

> While the state machine of the game, as respresented by the state diagram. i.e. the game flow logic, above represents the phases of the game logic, the user journey focuses on the user experience during the game flow.
> They appear identical, just phrased in different ways and contextes.

In this user journey:

- The game starts with both players choosing their symbols.
- Then, the turns alternate between players
  - The turns alternate until one of them wins or the game ends in a tie.
- At each turn, the player chooses a cell to place their symbol in ...
  - and the game checks for a win or a tie.
- If there is a win, and there is a winner:
  - The game ends and
  - The winning player is declared.
- If the board is full and there is no winner:
  - The game ends in a tie.

```mermaid

graph TD
    A[Start Game] --> B[Player 1 Chooses Symbol]
    B --> C[Player 2 Chooses Symbol]
    C --> D[Player 1 Turn]
    D --> E[Player 1 Chooses Cell]
    E --> F[Check for Win or Tie]
    F --> G[Player 2 Turn]
    G --> H[Player 2 Chooses Cell]
    H --> I[Check for Win or Tie]
    I --> D
    F --> J[End Game: Player 1 Wins]
    I --> K[End Game: Player 2 Wins]
    F --> L[End Game: Tie]
    J ---> M[Display Winning Message]
    K ---> N[Display Winning Message]
    L --> O[Display Tie Message]

```

#### _Activity Diagrams_

> Activity Diagrams are similar to both State and User journies, except they focus on the interations between the user and the game logic, i.e. the game methods/functions.
> Commented Out activities are not yet implemented.

- _Start App_: The app is initialized and the sets ip, for readiness/validity, of UI event listeners (on page load)
- _Start Game_: The game is initialized and the game checks for playing readiness (on app initialisation), by i) setting up the game board, game logic, and game pieces:
  - _Initialise Game Board_: The game board is initialsed by clearing the board/setting up the board with empty cells.
        <!-- - _Sets Game Storage_ : On init, the game board checks for a current game and/or stores the new game board state to a) local storage, and b) updates the board UI (HTML attributes) -->
  - _Initialise Game Logic_: The game logic is checked and initialised .
          <!-- - Set Game Difficulty: Game logic sets the game difficulty. -->
        <!-- - _Initialise Game Pieces_: The game board is initialsed by reseting the game with new pieces. -->
- _Set Current Player's Piece_: The game sets the current player to Player 1, and assigns the default piece, likely the X piece.
  - _Current Player (is assigned | ~~chooses~~) Symbol_: The game sets the current player to Player 1 and the current piece to X.
          <!-- - _Wait for Move_: _The game waits for the current player to make a move._ -->
          <!-- - _Valid Move?_: _The game checks if the move made by the current player is valid._ -->
            <!-- - _No_: _If the move made by the current player is not valid, the game returns to waiting for a move from the current player._ -->
        <!-- - _Makes a Move_: If the move is valid, the game updates the game board with the current player's symbol and redraws the game board. -->
- _Makes a Move_: Current player make a move, the game updates the game board with the current player's symbol, and calls nextTurn. In doing so:.
- _Check for Win or Tie_: The game checks if there is a win or tie on the game board. If true, then ...
  - _End Game?_: The game checks if the game has ended due to a win or tie.
    - _Display Result_: If the game has ended, the game displays the result to the user (either a win or tie) and prompts the user to either restart or exit the game.
        <!-- - _Prompt to Restart_: User is offered to start a new game, or end game.  -->
  - _Restart Game_: If the user chooses to start a new game, then
    - _Reset Game Board_ game resets the game board and starts a new game.
- _Exit Game_: _If the user chooses to exit the game, the game ends._

_Italics_: Optional Functionality: Methods for the game activities. _MVP++_

> # Review this \*Remove when done

```mermaid

graph LR
    A[App Runs] --> b[Starts New Game]
    b[Start New Game] --> B[Initialise Game Board]
    B --> C[Set Current Piece \n to Current Player ]
    C --> D[Wait for Move]
    D --> E{Valid Move?}
    E -- Yes --> F[Handle Move]
    F --> G[Check for Win or Tie]
    G --> H{End Game?}
    H -- Yes --> I[Display Result Message]
    I --> J[Restart Game]
    I --> K[Exit Game]
    H -- No --> C
    E -- No --> D

```

#### _Class Diagram_

- [PDF Version](_documentation/TicTacToe-Class-Model.drawio.pdf)
- [Image](_documentation/TicTacToe-Class-Model.drawio.png)

##### _App & UI Classes/Logic_

```mermaid
classDiagram
    class App{
        -GameDebug this.debug
        -GameConfig this.config
        -Game this.game
        -NodeList.Node this.button
        -NodeList this.move
        -StartListener this.startListener
        -MoveListener this.moveListener
        +App constructor()
        +void init()
        +Error error(e)
    }
    class StartListener{
        -NodeList.Node this.button
        -Game this.game
        -String this.eventType
        -GameConfig this.config
        -GameDebug this.debug
        +StartListener constructor(_move, _game, _evt)
        +void addListener()
        +void onStart()
        +void error(e, flag)
    }
    class MoveListener{
        -NodeList this.move
        -Game this.game
        -String this.eventType
        -onMove() this.onMove().bind(this)
        -GameDebug this.debug
        +MoveListener constructor(_move, _game, _evt)
        +void setListener()
        +void onMove(i)
    }
```

##### _Game Classes/Logic_

```mermaid
classDiagram
    class Game {
        -GameBoard this.gameBoard
        -GamePieces this.gamePieces(_X, _Y)
        -GameLogic this.gameLogic(GameBoard this.gameBoard, GamePieces this.gamePieces)
        -GameConfig this.gameConfig
        -String this.Player1
        -Player this.Player2
        -Boolean this.gameStart
        +Game constructor( _X, _Y, _config)
        +void makeMove()
        +void nextTurn()
        +void resetBoard()
    }
    class GameLogic {
        -GameBoard this.gameBoard
        -GamePieces this.gamePieces(_X, _Y)
        -GameLogic this.gameLogic(this.gameBoard, this.gamePieces)
        -GameDebug this.debug
        -String this.currentPlayer-Symbol
        -Array[][] this.winningCombinations
        -String this.BLANK
        +GameLogic constructor(GameBoard _board_, GamePieces _pieces)
        +Boolean isAWin()
        +Boolean isAWinCombo()
        +Boolean isADraw()
    }
    class GameBoard {
        -String[] this.surface
        -Boolean this.isValid
        -Boolean this.isInValid
        -GameDebug this.debug
        +GameBoard constructor()
        +Boolean isCellFree()
        +Boolean isCellOccupied()
    }
    class GamePieces {
        -String[] symbol
        -String this.X
        -String this.Y
        -GameDebug this.debug
        +GamePieces constructor(_X, _Y)
        +String get X()
        +String get X(piece)
        +String get Y()
        +String set X(piece)
        +String switchPiece(piece)
    }
```

##### _Ultility Classes_

```mermaid
classDiagram
    class GameDebug {
        -String this.ERR_HTML
        -String this.ERR_NODE
        +GameDebug constructor()
        +StdErr _debug(obk, mgs, level)
    }
    class GameConfig {
        -String this.BLANK
        -String this._START
        -String this._CELL
        -String this._EVNT
        -String this._DEV
        -String this._REPO
        +GameConfig constructor()
    }

```

#### _Code Flow_

- [Mermaid Live Editor: Tic Tac Toe](https://mermaid.live/edit#pako:eNqFVGFv2jAQ_SsnV51AChmEUog1TaJkLZVAnUqqSVO-mMRQr8GObKctLf3vc-wAa6EafEh8fvfu3vPFrygVGUUYtVqthGumc4ohZmlM0lhQuCIrCsOigJFBwWUunhJukUtJinuIo4SD-Z2eAsNwp1nO9BpGOVEK29yR4Au2xOCepSSaCQ5KS8aX4HJZYw9s7uguMAznBkdSbYgVlV-jmymQOlSRLIR0G-N4Oqm5LhpV5IuBNqHV-r65KLU20BaczDSR2nTG0ocNjBp2OWFKU05lE_6jIqLz0olQIqf-LI5u7uLNLL79cXvbaMJ8bZwhS-i02rUkp8mm7SWNMLwri8G9KStF2QbnruETu_Igrfp1BAc9V_rurqGWmBgUfaR8B9jAsGEOzv-j9h0McXWWPuNMN5oYrs2TEU0ze8KGRN9TKMiSQi5IdtzRX4xn4kn5N7zCfF4EO_-A2Ro5e6HK0i-rgSI8A0W1grJwTUNed618x3NIawZiKh7pcfNWZgf8lOa5emfax-4rBjMN_sggt8MQNf7lrQt-CG7NjtjjodPqwIWjZyW4DW7gyg7HO3FXbs52pimQVBVm3Ng8p1ZhKriWIs-r72bno1jsP9UPvsE3U_Og1DFZglexw7bc2hFtxkRBAAWjKTVyL-3WT7uq0Zeu4ORIrhkZDyJJnjyIS8k3MLG7E7FkaZ09_jzb3kDmc9DUA1XKBUlNr2OLmAsiM8Ow_QMgD62oXBGWmRvttYokyLi1ognC5jUj8iFBCX8zOFJqMVvzFGEtS-qhsshMjYgRc7OtEF6QXJloQfhvIVZbEM2YFnLqbkx7cVoIwq_oGeHOWej3g2AQ9HqDbjfshR5aI3zu98Og2wnOBkH7POyd93pvHnqxpG0_HHT6QbsbGHw7DLv9t7_TH78u)
- [PNG | Live](https://mermaid.ink/img/pako:eNqFVGFv2jAQ_SsnV51AChmEUog1TaJkLZVAnUqqSVO-mMRQr8GObKctLf3vc-wAa6EafEh8fvfu3vPFrygVGUUYtVqthGumc4ohZmlM0lhQuCIrCsOigJFBwWUunhJukUtJinuIo4SD-Z2eAsNwp1nO9BpGOVEK29yR4Au2xOCepSSaCQ5KS8aX4HJZYw9s7uguMAznBkdSbYgVlV-jmymQOlSRLIR0G-N4Oqm5LhpV5IuBNqHV-r65KLU20BaczDSR2nTG0ocNjBp2OWFKU05lE_6jIqLz0olQIqf-LI5u7uLNLL79cXvbaMJ8bZwhS-i02rUkp8mm7SWNMLwri8G9KStF2QbnruETu_Igrfp1BAc9V_rurqGWmBgUfaR8B9jAsGEOzv-j9h0McXWWPuNMN5oYrs2TEU0ze8KGRN9TKMiSQi5IdtzRX4xn4kn5N7zCfF4EO_-A2Ro5e6HK0i-rgSI8A0W1grJwTUNed618x3NIawZiKh7pcfNWZgf8lOa5emfax-4rBjMN_sggt8MQNf7lrQt-CG7NjtjjodPqwIWjZyW4DW7gyg7HO3FXbs52pimQVBVm3Ng8p1ZhKriWIs-r72bno1jsP9UPvsE3U_Og1DFZglexw7bc2hFtxkRBAAWjKTVyL-3WT7uq0Zeu4ORIrhkZDyJJnjyIS8k3MLG7E7FkaZ09_jzb3kDmc9DUA1XKBUlNr2OLmAsiM8Ow_QMgD62oXBGWmRvttYokyLi1ognC5jUj8iFBCX8zOFJqMVvzFGEtS-qhsshMjYgRc7OtEF6QXJloQfhvIVZbEM2YFnLqbkx7cVoIwq_oGeHOWej3g2AQ9HqDbjfshR5aI3zu98Og2wnOBkH7POyd93pvHnqxpG0_HHT6QbsbGHw7DLv9t7_TH78u?type=png)
- ![](https://mermaid.ink/img/pako:eNqFVGFv2jAQ_SsnV51AChmEUog1TaJkLZVAnUqqSVO-mMRQr8GObKctLf3vc-wAa6EafEh8fvfu3vPFrygVGUUYtVqthGumc4ohZmlM0lhQuCIrCsOigJFBwWUunhJukUtJinuIo4SD-Z2eAsNwp1nO9BpGOVEK29yR4Au2xOCepSSaCQ5KS8aX4HJZYw9s7uguMAznBkdSbYgVlV-jmymQOlSRLIR0G-N4Oqm5LhpV5IuBNqHV-r65KLU20BaczDSR2nTG0ocNjBp2OWFKU05lE_6jIqLz0olQIqf-LI5u7uLNLL79cXvbaMJ8bZwhS-i02rUkp8mm7SWNMLwri8G9KStF2QbnruETu_Igrfp1BAc9V_rurqGWmBgUfaR8B9jAsGEOzv-j9h0McXWWPuNMN5oYrs2TEU0ze8KGRN9TKMiSQi5IdtzRX4xn4kn5N7zCfF4EO_-A2Ro5e6HK0i-rgSI8A0W1grJwTUNed618x3NIawZiKh7pcfNWZgf8lOa5emfax-4rBjMN_sggt8MQNf7lrQt-CG7NjtjjodPqwIWjZyW4DW7gyg7HO3FXbs52pimQVBVm3Ng8p1ZhKriWIs-r72bno1jsP9UPvsE3U_Og1DFZglexw7bc2hFtxkRBAAWjKTVyL-3WT7uq0Zeu4ORIrhkZDyJJnjyIS8k3MLG7E7FkaZ09_jzb3kDmc9DUA1XKBUlNr2OLmAsiM8Ow_QMgD62oXBGWmRvttYokyLi1ognC5jUj8iFBCX8zOFJqMVvzFGEtS-qhsshMjYgRc7OtEF6QXJloQfhvIVZbEM2YFnLqbkx7cVoIwq_oGeHOWej3g2AQ9HqDbjfshR5aI3zu98Og2wnOBkH7POyd93pvHnqxpG0_HHT6QbsbGHw7DLv9t7_TH78u?type=png)

### _<ins>Accessibility</ins>_

### _<ins>Graphics</ins>_

## **4. BUILD**

### _<ins>Environment</ins>_

<!-- > Did not use Gitpod, too high a friction and high context switching costs. -->

1. _**Local**_

- VSCode Insiders - Local
- LivePreview
- LiveServer: <http://127.0.0.1>

2. _**Remote**_

- Gitpod
- Github Pages from Github.com

### _<ins>Browsers</ins>_

- Google Chrome (Dev) versions 112
- Google Chrome versions 110
- Firefox Developer Edition versions 111.0 beta
- Polypane 13.0.3

### _<ins>Browser Extensions</ins>_

> <sub>[*] DevTools extensions</sub>

- Webhint

### _<ins>Languages<ins>_

- HTML5
- CSS3
- Javascript (ES6, Core)
  - No backward compatibility accounted for.

### _<ins>IDE</ins>_

> Extensions: A brief summary of a few key ones.

- HTML Language Server (VSCode)
- CSS Language Server (VSCode)
- HTML Validate (html-validate.vscode-html-validate, 2020-2023), version 7.13.2
- ESLint
- Standard
- SonarLint
- Quokka.js
- Wallaby.js
- Mermaid

### _<ins>Repository<ins>_

<!-- Packages used for developer quality of life and delivery purposes -->

- Javascript (Node, pnpm and npmregistry packages).
- YAML (configuration files for NPM packages)
- C/make for .gitignore and similar ignore files

#### _NPM Plugins_

<!-- These were used during the build but removed prior to submission -->

- Prettier
- HTML-validate
- ESLint
- Sonarlint
- Standard -
- Webhint
- JSDoc

### _<ins>Frameworks Used</ins>_

> Programs, Packages and Libraries used in different workflows, and where code was generated and then adapted for use in the html or the CSS as a component.

#### _Readme Tooling_

- [Mermaid Live Editor](https://mermaid.live/) for Sitemap and Page hierarchy.
- [Draw.io](https://draw.io/) for Class Diagrams and documentation.

#### _Design Workflows_

- [Balsmiq Desktop](https://balsamiq.com/)

---

## CODE

### _<ins>Features</ins>_

- ES6 Javascript with Class statement
- ES6 Import/Export Module statements
  - https://www.infoworld.com/article/3619560/7-tools-transforming-javascript-development.html 
- Single constructor classes
- Single responsibility clases, with a few short functions
- UI Helper Classes, for wrapping error handling of DOM events.
- Utility classes for auxillary classes for debugging and configuration (strings) tasks.
- `Try ... Catch` blocks for error handling.
- Attempted low coupling, and high cohession, but there are a few high coupling dependencys due to state of the game and passing objects inside objects from app/UI to game logic tier.

## RELIABILITY

### _<ins>Testing & Verification</ins>_

- Static Analysis like linting, code formaters, autocomplete/correction
- IDE Run & Debugging: VSCode `F5` configured with the following tasks
  - `Debugger for Firefox`
  - `Microsoft Edge Tools for VS Code`
- Dyanmic Analysis
  - `Quokka.js`, with `Wallaby.js`
    - Runtime values are updated and displayed in your IDE next to your code,
    - Runs your JavaScript and TypeScript tests immediately as you type, highlighting results in your IDE

### _<ins>Validation</ins>_

#### _HTML_

|     Page     |  Checked   | Issues . | Resolved | Passed |
| :----------: | :--------: | :------: | :------: | :----: |
|  Home.html   | March 28th |    -     |    -     |   -    |
|  Folio.html  | March 28th |    -     |    -     |   -    |
| Profile.html | March 28th |   - -    |    -     |        |

#### _CSS_

| Page  | Checked | Issues . | Resolved | Passed | Impact | CanIUse |
| :---: | :-----: | :------: | :------: | :----: | ------ | ------- |
| Page  | Checked | Issues . | Resolved | Passed | Impact | CanIUse |

### _<ins>Static Analysis</ins>_

#### _JavaScript Linters, Formaters_

- EsLint
  - EsLint-config-standard
  - EsLint Plugin \* dependencies
- StandardJS, using EsLint rules, as packaged.
- SonarLint
- VSCode's Javascript Langauge Server
- VSCode's Typescript Langauge Server

#### _Dynamic Analysis_

- `Quokka.js` [Pro]: Runtime values are updated and displayed in your IDE next to your code, as you type. This allows for dynamic errors, senior partner to checking the browser's console.
  - This enaable faster prototyping, learning and testing by being able to display and explore runtime values without having to modify the code.
  - Can breakpoint, limited and step into code with TimeMachine feature.
- `Wallaby.js` is a developer tool that runs your JavaScript and TypeScript tests immediately as you type, highlighting results in your IDE right next to your code.
  - From same developer as Quokka.js, some overlap in functionality.

#### _Lighthouse_

**Conditions**

|   Page    |   Mode   | Device  | Performance | Accessibility | Best Practices |  SEO  |
| :-------: | :------: | :-----: | :---------: | :-----------: | :------------: | :---: |
| Home.html | Snapshot | Desktop |     / 4     |     / 13      |      / 4       |  / 7  |

---

---

# DEPLOY

> Uss Gherkin syntax for code based Feature definitions

## Features

> Gherkin / Cumcumber syntax

### **<ins>App.js: App</ins>**

#### _[DF001](#df001)_

```gherkin
DF001:
Feature: TicTacToe Game -
  A Board Game: Two Player, Two Pieces: (X & O)
  As a user, I want to play a TicTacToe game ...
  So that I can have fun and pass the time.
```

```gherkin
DF001.A:
Scenario: Start a new game
  Given I am on the game page
  When I click on the start button
  Then the game board is displayed
   And the first player is prompted to make a move
```

```gherkin
DF001.B:
Scenario: Make a move
  Given I am on the game board
  When it is my turn to make a move
    And I click on an empty cell on the board
  Then the cell is filled with my pieces (X or O)
    And the turn is passed to the other player
```

```gherkin
DF001.C:
Scenario: Win the game
  Given I am playing TicTacToe
    And it is my turn to make a move
    And I have two of my pieces in a row or column
  When I make a move that creates a row or column of three of my pieces
  Then I win the game
    And the game ends
```

```gherkin
DF001.D:
Scenario: Tie the game
  Given I am playing TicTacToe
    And it is my turn to make a move
    And there are no more empty cells on the board
  When I make a move
  Then the game ends in a tie
```

### **<ins>Game.js: Game</ins>**

#### _[DF002](#df002)_

```gherkin
DF002:
Feature: Game Controller class for the game of TicTacToe
```

```gherkin
DF002.A:
Scenario: Making a move
  Given a game board and a set of game pieces
    When a move is made by a player
  Then the move is assigned to the board ...
    And the next player's turn is initiated
```

```gherkin
DF002.B:
Scenario: Checking for a win or draw
  Given a game board and a set of game pieces
    When a player makes a move
  Then the game logic checks for a win or draw
    And if there is a win or draw, the game is reset for a new round
```

```gherkin
DF002.C:
Scenario: Resetting the board
  Given a game board and a set of game pieces
    When the game is reset
  Then the board is cleared ...
    And the game is returned to its initial state for a new round
```

### **<ins>GameLogic.js: GameLogic</ins>**

```gherkin
DF002:
Feature: Game Logic: Simple Level (MVP)
```

```gherkin
DF002.D:
Scenario: Game is won
  Given a tic tac toe game is in progress
    And the current player completes a winning combination
  When the winning move is evaluated
  Then the game is to be won
    And the winner is announced
    # And the game state could be logged
```

```gherkin
DF002.E:
Scenario: Game is a draw
  Given a tic tac toe game is in progress
    And all cells on the board are occupied
  When the board is evaluated
  Then the game is to be a draw
    And the draw is announced
    # And the game state could be logged
```

- **_Helper Classes_**: `StartListener`, `MoveListener` not documented here, see [here]() for full schema, as these are auxiliary to the core intent of the app.
- **_Utility Classes_**: `GameDebug`, `GameConfig` not documented here, see [here]() for full schema, as these are utilities to aid the running of the app.

### _<ins>Future Enhancements</ins>_

#### _[FE001](#fe001)_

```gherkin
  FE001. Feature: User(s) choose game pieces, and customise the type of pieces in the process
```

#### _[FE002](#fe002)_

```gherkin
  FE002. Feature: Game Statistics to keep count of wins, looses, draws for players, keeping track of scores.
```

#### _[FE003](#fe003)_

```gherkin
  FE003. Feature: User can save the game, at any time, and reload the game from the same saved state.
```

#### _[FE004](#fe004)_

```gherkin
  FE004. Feature: Change the playing difficulty: Simple (Click), Medium (Random), & AI (Minimax)
```

#### _Definition of Done Requirements to be Delivered_

See the [Definition of Done-log](_documentation/done.md)

---

## **Deployment**

- Github & GitHub User Account.
- VSCode with Gitlens.
- Github Pages with a domain of Github.io.

### _<ins>Repository Service</ins>_

- Github.com is the remote code repository service being used.
- User account and profile is
    >
    > - `@iPoetDev`
    >
- The repository name is
    >
    > - `terni-lapiil--toei`
    >
- The repository domain URI is
    >
    > - `https://github.com/iPoetDev/terni-lapilli--toe`

### _<ins>Local Git Service / IDE</ins>_

- VSCode configured with Github account for Local development environment.
- VSCode extension: Gitlens installed and enabled for local development and deployment.
- Utilized a Changelog format to document the changes, a la, [Keep a Changelog](http://keepachangelog.com/).
  - Intent here was to catalogue in longer more human readable format a more contextual change history. Greater than the 50 chars of a commit 1st line.
  - Additionally, utilized the changelog as a summation effort to shorted and be precise on the commit description.
- Most adhered to [Semantic Versioning](http://semver.org/) approach.
  - Minor adjustment was to put a double digit index for each separate commit if several occurred on one day.

### _<ins>Deployment Environment</ins>_

- Github Pages via the inbuilt Github Actions workflows of:
    1. Deploy a static web page off every commit.
    2. Once the commit is built, then deploy the new website and pushes to hosted domain URI.
- Github.io is the hosted domain URI and service.
- The final URI is
    > `https://github.com/iPoetDev/the-folio`

---

## **LAUNCH**

### _<ins>Author Note</ins>_

### _<ins>Live Site</ins>_

In deploying to Github;s website hosting service, GitHub pages, the website was created. The steps to deploy are as follows:

- Login to Github and search for the Github repository 'the-folio' by `@iPoetDev`
- Click on the `Settings` cog icon at the top of the repository.
- Click on `Pages` on the left hand side navigation menu.
- Select `Deploy` from a branch' under `Source` if this is not already selected.
- Under the `Branch` drop down menus, select 'main' and 'root'
- Click `Save`
- Once the page refreshes, the live link should appear underneath the 'Github Pages' title.

The latest version, and prior versions, of the site can be found under the `Actions` tab and in the latest version of the workflow `pages build and deployment` as well as above.

Live link is: [https://ipoetdev.github.io/the-folio/](https://ipoetdev.github.io/the-folio/)

---

## **ASSESSMENT**

### _<ins>Credits</ins>_

#### _Design_

#### _Color_

#### _Fonts_

#### _Frameworks/Tooling_

---

## **ACKNOWLEDGEMENT**

### _<ins>Guides</ins>_

### _<ins>Video</ins>_

- Feross Aboukhadijeh (2018 Feb, 09): "Write Perfect Code With Standard And ESLint - JSConf.Asia 2018". Last Accessed: [https://www.youtube.com/watch?v=kuHfMw8j4xk](https://www.youtube.com/watch?v=kuHfMw8j4xk)
