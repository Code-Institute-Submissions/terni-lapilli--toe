# Class: Game

> - File: /lib/__Game.js
> - Module: Game
> - Export: Game

## Design

- All class properties are first class members
- All class properties have an initial default value
- Constructor has parameters that are recommended values for X and O.
- Constructor has parameters that are default values
- Constructor has parameters that are optional values
- Constructor and functions have `log` and `locname` parameters for tracing and logging purpose, which are optional, with default values.
- Constructor and functions params without a optional value are mandatorty.
- All classes have a dependency on GameDebug, which abstracts & wraps the console logging methods to various levels of logging information.
  - Each method has an associated `log`or `check` params to toggle and inspect the function for debugging.
  - This is a feature of the app, for improved developer experience.
  - Same goes for `this.fileName` and associated `locname` paramer in each function as approprriate.
- Default values ae a defensive design against missing parameters, null conditions and undefined states, which were a debugging issue that led to this design decision.
  - Trade of is expensive initialisation of dependencies and member classes as objects that are never used.
  - Creates a potential ball of mud: which object is the current object in the call stack.
  - Reduced the complexity of the constructor function
- Hard coded values are minimised or moves to optiional parameters, when they repeat themselves more than once.
- Altrnatively they are extracted from inline referencing and placed in a `const`, a `let` or a `paramValueMap` object, if there is a bilateral choice and a default value.

## Description

Class Diagram without logging and tracing

```mermaid
classDiagram
    class Game {
        -GameDebug this.deBug
        -string Player1 = 'X'
        -string Player2 = 'O'
        -GamePieces gamePieces(this.Player1, this.Player2
        -GameBoard gameBoard
        -GameLogic gameLogic(this.gameBoard, this.gamePieces)
        -string filename = "Game,js'
        -boolean gameStart = false

        +Game constructor( _X = 'X', _O = 'O')
        +void init()
        +boolean checkMove(move)
        +boolean updateGrid(move)
        +void makeMove(move)
        +void nextTurn()
        +void isGameOver()
        +void resetBoard(start)
        +void evaluateParameter(param)
        +void gameLogger()
    }
```

Class Diagram with logging and tracing

```mermaid
classDiagram
    class Game {
        -GameDebug this.deBug
        -string Player1 = 'X'
        -string Player2 = 'O'
        -GamePieces gamePieces(this.Player1, this.Player2
        -GameBoard gameBoard
        -GameLogic gameLogic(this.gameBoard, this.gamePieces)
        -string filename = "Game,js'
        -boolean gameStart = false

        +Game constructor( _X, _O, locname = this.fileName)
        +void init()
        +boolean checkMove(move, log = 0, locname = this.fileName)
        +boolean updateGrid(move, log = 0, locname = this.fileName)
        +void makeMove(move, log = 0, locname = this.fileName)
        +void nextTurn(log = 0, locname = this.fileName)
        +void isGameOver(log = 0, locname = this.fileName)
        +void resetBoard(start, log = 0, locname = this.fileName)
        +void evaluateParameter(param, log = 0, locname = this.fileName)
        +void gameLogger(log = 0, locname = this.fileName)
    }
```

## Class Constructs and Instantiation

> Ignores the auxillary objects and properties used for tracing, logging and debugging for clarity.

```ruby
graph TD
  1.0[App] ----> 1.1[App Consctructor: app]
  1.1 --instantiates--> 2[new Game: game]
  2 --assigns X--> 2.0.1[Player1]
  2 --assigns Y--> 2.0.2[Player2]
  2.0.1 --"X"--> 2.0.3[new GamePieces: gamePieces]
  2.0.2 --"O"--> 2.0.3
  2 ----> 2.0.4[new GameBoard: gameBoard]
  2.0.3 ----> 2.0.5[new GameLogic: gameLogic]
  2.0.4 ----> 2.0.5
```

```mermaid
graph TD
 1.0[App] ----> 1.1[App Consctructor: app]
  1.1 --instantiates--> 2[new Game: game]
  2 --assigns X--> 2.0.1[Player1]
 2 --assigns Y--> 2.0.2[Player2]
  2.0.1 --"X"--> 2.0.3[new GamePieces: gamePieces]
 2.0.2 --"O"--> 2.0.3
 2 ----> 2.0.4[new GameBoard: gameBoard]
  2.0.3 --gamePieces--> 2.0.5[new GameLogic: gameLogic]
  2.0.4 --gameBoard--> 2.0.5
```
