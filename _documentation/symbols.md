
# Symbol Intenvtory

## [App.js](#app) FIXME

- [x] : JSDoc: File Overview
  - [x] FIXME
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] deBug GameDebug
  - [ ] newGame Game(X, O)
  - [x] startButton {Element}
  - [x] userMoves {NodeList<Element>}
  - [x] fileName {string} App.js
  - [ ] startListener StartListener
  - [ ] moveListener MoveListeners
- [x] : JSDoc: constructor
- [ ] : constructor ([locname])
- [ ] : onInit ([locname])
- [x] : onError (e, [flag], [log], [locname])
- [x] : gameLogger ([log], [locname])
- [x] : appLogger ([log], [locname])

## [StartListener.js](#start) FIXME

- [x] : JSDoc: File Overview
  - [ ] FIXME
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] deBug - GameDebug(): ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] startButton - {Element}  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] userMoves - {NodeList<Element>}  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [ ] newGame - Game(X, O) TODO
  - [x] eventTYpes - {string} ''  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] fileName - {string} 'StartListener.js'  ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : JSDoc: constructor
- [ ] : Class: Functions
  - [ ] : **constructor** (button, game, evnt, [locname]) TODO
  - [ ] : **addListeners** (element, [log], [check], [listerr], [locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
  - [x] : **onError** (e, [flag], [log], [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] : **evaluateParamater** (param, [argIndex], [log], [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] : **evaluateEventType** (param, [argIndex], [log], [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0

## [MoveListeners.js](#move) FIXME/INSPECT

- [x] : JSDoc: File Overview
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] *deBug* - GameDebug(): ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [X] *userMoves* - {NodeList<Element>}  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [ ] *newGame* - Game(X, O) TODO
  - [X] *eventTypes* - {string} ''  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [X] *fileName* - {string} ''  ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : JSDoc: constructor

- [ ] : **constructor** (move, games, evnt, [locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **setListeners** (nodes, [log], [locaname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **onMove**(i) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **onError** (e, [flag], [log], [locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **evaluateParamater** ( param, [argIndex], [log], [locname] ) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] :**evaluateEventType** ( param, [argIndex], [log], [locname] ) ❓ TODO: UPDATE  2023/03/20 v0.3.0

## [Game.js](#game) FIXME

- [x] : JSDoc: File Overview
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [ ] deBug - GameDebug()
  - [ ] Player1 - {string} ''
  - [ ] Player2 - {string} ''
  - [ ] gamePieces - GamePieces(Player1, Player2)
  - [ ] gameLogic - GamePieces(gameBoard, gamePieces)
  - [ ] gameRunning - {boolean} false
  - [ ] fileName - {string} ''
- [ ] : JSDoc: constructor
- [ ] : **constructor** ( [X], [O], [locname] ) ❓ TODO: CHECK  2023/03/20 v0.3.0
- [ ] : **checkMove**(move, [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : **updateGrid**(move, [locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **makeMove**(move, [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : **nextTurn**([locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : **isGameOver**([locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **resetGame**(start, [locname]) ❓ TODO: UPDATE  2023/03/20 v0.3.0
- [ ] : **evaluateParameter**(param, argIndex, log, locname) ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : gameLogger( [log] , [locname] ) ❓ DONE REMOVE  2023/03/20 v0.3.0

## [GameLogic.js](#logic) FREEZE

- [x] : JSDoc: File Overview
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] deBug - GameDebug() ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *currentBoard* - GameBoard() ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *currentPieces* - GamePieces() ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *currentPlayer* - {string} '' ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *aBLANK* - {string} '' ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *winCombinations* - {array[][]} ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *fileName* - {string} '' ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : JSDoc: constructor
- [ ] : constructor (board, pieces)
- [x] : **isAWin** ([log], [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] : **isAWinningCombo**(combination)
- [x] : **isADraw** ( [log] , [locname] ) ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **evaluateParameter** (param, [argIndex], [log], [locname])
- [x] : **evaluateEventType** (param, [argIndex], [log], [locname])
- [x] : **gameLogger** ([log], [locname]) ✅ DONE FREEZE  2023/03/20 v0.3.0

## [GameBoard.js](#board) FREEZE

- [x] : JSDoc: File Overview
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] *deBug* GameDebug()  ✅ DONE FREEZE
  - [x] *grid* = {[array(9]} ✅ DONE FREEZE
  - [ ] ~~*isValid*~~ {boolean} true REMOVE?
  - [ ] ~~*isInValid*~~ {boolean} true REMOVE?
- [ ] : JSDoc: constructor
- [ ] : ***constructor*** () ✅ DONE FREEZE  2023/03/20 v0.3.0
- [ ] : ~~**isCellFree**~~ (unused)
- [ ] : ~~**isCellOccupied**~~ (unused)

## [GamePieces.js](#pieces) FREEZE

- [x] : JSDoc: File Overview
- [x] : Imports
- [x] : JSDoc: Class Overview
- [x] : Class Declaration
- [x] : JSDoc: Class Props
- [x] : Class Fields, Members, Properties
  - [x] *deBug* - GameDebug()  ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [ ] *pieces* - ISSUE: BUG:
  - [x] *Xpiece* - default: {string} X ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *Opiece* - default: {string} O ✅ DONE FREEZE 2023/03/20 v0.3.0
  - [x] *currentPiece* default: {string} ''   ✅ DONE FREEZE  2023/03/20 v0.3.0
  - [x] *fileName* - default: {string} ''   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : JSDoc: constructor
- [ ] : ***constructor***([firstPiece], [secondPiece])
- [x] : **getX** - not a gettter,   ✅ DONE FREEZE 2023/03/20 v0.3.0
- [x] : **getO** - not a getter,   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **setX**([piece]) - not a settter,   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **setO**([piece]) - not a settter,   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **switchPieces**([log], [check], [locname])   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **checkAPiece** (piece, symbol,[type])  ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **hasAPiece** (piece, symbol, slot)   ✅ DONE FREEZE  2023/03/20 v0.3.0
- [x] : **evaluatePieces** (symbol1, symbol2, [log], [check], [type], [locname])   ✅ DONE FREEZE  2023/03/20 v0.3.0
