# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and adheres to [Semantic Versioning](http://semver.org/).

> - Modified, by incrementing and counting the index of commits on a daily basis
> - (Major.Minor.Patch.CommitIndex) (By CJ)
> - Header Formatting & Intents as below

---

> ## Changelog: v.major.minor.patch.commitindex 20yy.mm.dd
>
> ### `Added`  for new features
>
> ### `Changed` | Updated: for changes in existing functionality
>
> ### `Deprecated`: for soon-to-be removed features
>
> ### `Removed`:  for now removed features, files, folders
>
> ### `Fixed`: for any bug fixes
>
> ### `ToDo`: Project Outstanding items of note
>
> ### `Noted`: Project Logging, Journalling. Comments

---

# Changelog: Project Terni-Lapilli--Toe

> **Template**

---

## Changelog: 2023.03.31v.0.4.01.001 App.js

### Added

- Proposed: 004: onExit - Not yet implemented [001]

### Changed

- Updated: 001: Module JSDoc [001]
- Updated: 002: Class JSDoc [001]
- Updared: 003: Constructor JSDoc [001]
- Updated: 003: Tidied with Constructor body [001]
- Updated: 005: onError - Tidied up with const message = literal [001]

### Removed

- Removed: 004: onInit [001]
- Removed: 006: gameLogger method [001]
- Removed: 006: appLogger method [001]

### Fixed

### ToDo

---

## Changelog: 2023.03.2_v.0.4.00.001

### Added

- Added: updateOnMove, updateAtEnd, clearUI methods to handle utility activities
  - Designed outside of game controller, for UI control

### Changed

### Removed

### Fixed

### ToDo

---

## Changelog: 2023.03.29v.0.4.1.001

# Bumped

- Bumped : `MoveListener.js` to 0.4.1 See [#14](https://github.com/iPoetDev/terni-lapilli--toe/issues/14)
- Bumped: 001/002 Code Freeze: Module, Class,
- Bumped: 003 Code Freeze: Declarations,  Constructor,
- Bumped: 004: Code Freeze: setListeners,
- Bumped: 006: Code Freeze: onError,
- Bumped: 007: Code Freeze: evaluateParameters, evaluateEventType
- Bumped: 005: WIP: onClick and UI/User action interface methods
-

### Added

- Added: updateOnMove, updateAtEnd, clearUI methods to handle utility activities
  - Designed outside of game controller, for UI control
- Added: RayCast screenshots for documentation of 0.4.1 MoveListener.js

### Changed

- Changed: Updated extensively the Class definition JSDocs
- Changed: Updated extensively the Class props JSDocs
- Changed: Updated onClick to use destructuring
- Changed: Minor edits to symbols, literals in onError
- Changed: Introduced literal symbol for type checking string literals
- Updated: .gitignored files not for remote repo
- Updated: index.html

### Removed

- Removed: Old Files

### Fixed

### ToDo

---

## Changelog: 2023.03.28v.0.4.00-04.001

### Bumped to 0.4.0 Function & Class versions

- Bumped: see [App.js #11] [001]
- Bumped: see [StartListener.js #12](https://github.com/iPoetDev/terni-lapilli--toe/issues/12) [001]
- Bumped: [Game.js #13](https://github.com/iPoetDev/terni-lapilli--toe/issues/13) [001]
- Bumped: [MoveListeners.js #14](https://github.com/iPoetDev/terni-lapilli--toe/issues/14) [001]
- Bumped: [GameLogic.js #15](https://github.com/iPoetDev/terni-lapilli--toe/issues/15) [001]
- Bumped: [GameBoard.js #16](https://github.com/iPoetDev/terni-lapilli--toe/issues/16) [001]
  - and even with protoype for version 0.5.0: update/reset/set/fetch grid, cell, json and board data
- Bumped: [GamePieces.js #17](https://github.com/iPoetDev/terni-lapilli--toe/issues/14)

### Changed

- Updated: `MoveListener.js`: on each listener event, bind the event, target and the game in onClick() **=> Testable?** [001]
- Updated: `MoveListener.js`: `onClick()` JSDocs [001]
- Updated: `MoveListener.js`: `onClick()` updated makeMove method signature [001]
- Updated: `MoveListener.js`: `onClick()` Added early returns, not else statements [001]
- Updated: `MoveListener.js`: `onClick()` Added early returns, not else statements [001]
- Updated: `Game.js`: Minor template literal edits [001]
- Updated: `Game.js`: `checkMove(),makeMove()` Added Param literal typeof check,[001]
  - else do nothing (error flow for critical flow?)
- Updated: `Game.js`: `nextTurn(), isGameOver()` Added boolean for game running as a param, [001]
- Updated: `Game.js` `evaluateParameter()` with early returns [001]
- Updated: `Game.js`: `updateGrid()` Prototype enchancement interface to update Board data [001]
- Updated: `GameLogic.js` Reafactored else statements with standalone early return if statements [001]
- Updated: `GameDebug.js` - linter added semi-colons [001]

### Removed

- Removed: `MoveListener.js`: `onEachMove()` method as this was being called twice. [001]
- Removed: `GamePieces.js` - `evaluatePieces` > Move functionality to getX/getO [001]

## Changelog: 2023.03.27v.0.4.03.001

### Added

- Added: `App.js` - v0.4.0 [#11](https://github.com/iPoetDev/terni-lapilli--toe/issues/11)
  - For Validation
  - For Inventory for v0.4.0: Using CodeSteam code block capture to track diffs in IDE for in issues.
  - For CODE FREEZE: prior to submission.
- Added: app.md screenshots of code in ./_documentation/code/0.4.0
- Added: `StartListener.js` - v0.4.0 [#12](https://github.com/iPoetDev/terni-lapilli--toe/issues/12)
  - For Validation
  - For Inventory for v0.4.0: Using CodeSteam code block capture to track diffs in IDE for in issues.
  - For CODE FREEZE: prior to submission.
- Added: startListener.md screenshots of code in ./_documentation/code/0.4.0

### Changed

- Updated: `app.md` in documentation
- Updated: `startlistener.md` in documentation

### Removed

### Fixed

### ToDo

---

## Changelog: 2023.03.26v.0.4.01.001

- Bumped: `MoveListener.js` to v.0.4.0, [001]
  - Skips docstrings update for time prioritisation. [001]

### Added

- Added: moveTypeID, as class prop. [001]
  - See issue [#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)

- Added: onClick to `MoveListener.js` [001]
- Added: the addEventListner with the onClick bind callback func [001]
- Added: console log to output funcitonality of each move [001]
- Added: `App.js`: newMoveListener in a try catch block [001],
- Added: passed the instance of game to it. [001]

### Changed

- See issue [#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)

- Updated: `MoveListener.js` class props [001]
- Changed: `MoveListener.js` `constructor`'s call of SetListener to pass event and bind to onClick
- Updated: `App.js` Minor refactor/edits to error Template literals for readability and consistency.

### Removed

- [#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)

- Removed: `App.js` onInit and it's call in `index.html`

### Fixed

[#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)

- Fixed: User clicks on cells and updated game object.

### ToDo

[#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)

- TODO: Replace this with UI ouput for each made move, what move and any illegal move (not just how many clicks)

### Decided

---

## Changelog: 2023.03.25v.0.4.0.002

### Bumped

- Bumped: `StartListener.js` to v.0.4.0, [001]
  - Skips docstrings update for time prioritisation. [001]

- Bumped: `App.js` to v.0.4.0 [001]
  - Skips docstrings update for time prioritisation. [001]]

- Bumped: `Game.js` to v.0.4.0 [001]
  - Skips docstrings update for time prioritisation. [001]

### Changed

- Updated: `App.s` onError [001]
  - see [#8](https://github.com/iPoetDev/terni-lapilli--toe/issues/8) [001]
- Updated: `Game.js` isGameOver [001]
  - see [#6](https://github.com/iPoetDev/terni-lapilli--toe/issues/6) [001]
- Adjusted: `StartListener` addListener signature with default locname var [002]

### Fixed

- Tested: `StartListener.js` customEventListener on start button clicked [001]

  - See more at [#7](https://github.com/iPoetDev/terni-lapilli--toe/issues/7)
  - Related are
    - [#3](https://github.com/iPoetDev/terni-lapilli--toe/issues/3)
    - [#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4)
    - [#5](https://github.com/iPoetDev/terni-lapilli--toe/issues/5)

### ToDo

- ToDo: Repeat design pattern for `MoveListener.js` [001]

  - See [#9](https://github.com/iPoetDev/terni-lapilli--toe/issues/9)
- ToDo: Test new design pattern for `MoveListener.js` [001]

### Decided/Noted

- Noted: Using issues, via CodeStream, removed/reduced the verbosity of this changelog [001]

- Decided: Used GitHub Issues to track changes and bugs, and notes and tersely summarise in Changelog [001]

---

## Changelog: 2023.03.24v.0.3.03.003

### New Issue

- New Issue [#7](https://github.com/iPoetDev/terni-lapilli--toe/issues/5) and linked this to parent RFC [#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4)

### Added

- Added: `Game.js` `onInit()` method See [#5](https://github.com/iPoetDev/terni-lapilli--toe/issues/5) [001]
- Added: `StartListener.js` `onInit()` method See [[#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4)] and latest v0.4.0 [#7](https://github.com/iPoetDev/terni-lap--toe/issues/7)
- Added: `App.js` class props: eventType default value, new memeber, btnId =#start
- Added: ToBe: Not yet implemented App onExit method to detatch removeListeners methods.

### Changed

- Changed: `Game.js` `constructor` by moving game state code to onInit() method See [#5](https://github.com/iPoetDev/terni-lapilli--toe/issues/5) [001]
- Refactored: `Game.js` `isGameOver` to track the win or draw state and log these to console. See [#6](https://github.com/iPoetDev/terni-lapilli--toe/issues/6) [001]
- Changed: `StartListener.js` `constructor` by changing @button object to {string} btnId = '#start' [002]
- Updated: `StartListener.js` constructor Redorder and remodels constructor internals, and Class props, and the addListner params, with a try catch[002]
- Updated: `StartListener.js` addListener method signature, params and conditionals [002]
- Changed: `App.js` class props: newGame, startListener to undefined [003]
- Changed: `App.js`constructor with try catch blocks and onError() methods [003]
- Changed: `App.js` implemenetd the new StartListener call, using only the btnID string, not Element object [003]

### Removed

- Removed: `StartListener.js` `onStart()` method See [[#4], & [[#7]] [002]
- Removing: `App.js` class props: appConfg. startButton, userMoves [003]
- Removed: Type checking and TypeError handing fron onError[003]
- Removed: `App.js` onInit() as much initialisation for the app is on instantiation. [003]
  - Also moved the game initialiseation to the StartListener.onInit() method. [003]

### Fixed

### ToDo

- ToDo: Expand isGameOver to feedback to User/Ui the game scores, and win or draw state. See [#6](https://github.com/iPoetDev/terni-lapilli--toe/issues/6) [001]
- ToBe: Maybe used this onInit() as a interface for changing difficulties, in between games.
  - Enabled by separation of concerns from costructore to initialiser methods.
  - One is called once, one to one, per object/class and another is many to one.
- ToDo/ToBe: Create removeListener and detatch Custom Event Listens when the page/app is unloaded. [003]

### Decided

---

## Changelog: 2023.03.23 v.0.3.02.004

### Added

- Added: `architecture/` folder with .md files to track the Classs: `Game` [001]
  - Design, description, and class constructs and instantiation dependency diagrams.
- Added:  Classs to `architecture`: `App` [002]
  - Design, description, and class constructs and instantiation dependency diagrams.
- Added: Classs to `architecture`: `StartListener` [003]
  - Design, description, and class constructs and instantiation dependency diagrams.
  - Spotted the issue with the design of this class, the game object is never bound and instead the code binds to it owself. [003]
- Added: `Issues.md` in [Documentation](_documentation/issues.md) [004]
- Purpose: to log and journal about significant issues. Maybe overkill, as there are GitHub issues rto be used.
- Added: `Decision.md` and updated with important decisions and choices.  [004]

### Updated

- Updated Issue with diagrams and classes
- [[Refactor] App.js & Custom EventListener #3]
- [[Refactor] StartListener.js : Remodel Custom EventListener #4]
- [[Refactor] Game.js's constructor,  #5]

### Noted

- Noted - These activities are fine for now, but no code change, as been ill (Monday to Thursday). Tomorrow code change and testing.

---

## Changelog: 2023.03.22v.0.3.01.001

### Bumped to 0.3.0 Function & Class versions

- Bumped: see [App.js](/_documentation/symbols.md#app) for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: see [StartListener.js](/_documentation/symbols.md#start) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: [MoveListeners.js](/_documentation/symbols.md#move) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: [Game.js](/_documentation/symbols.md#game) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: [GameLogic.js](/_documentation/symbols.md#logic) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: [GameBoard.js](/_documentation/symbols.md#board) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,
- Bumped: [GamePieces.js](/_documentation/symbols.md#pieces) for symbols changes for symbols changes & versioning, FREEZE states and TODOs,

### Noted

- Noted: Why Bump: Post second mentor session, the code was refactored, and the class field values were updated to default values.
- Noted: Intent to Tag the code to v.0.3.0
- Noted: Intent to Use GiThub Issues to track further bugs and efforts of work.
- Noted: Code is sifficient complexity that it needs more management.

### Changed

- Updated: `GameLogic.js`, `GameBoard.js` `GamePieces.js` `MoveListeners.js` signatures with log, and locaname parameters, froze helper functions and tagging those areas of concern.

### Fixed

- Fixed: GamePieces, GameLogic, Game, App GamePieces types or logic issues during Mentor Session 2023/03/21 10:30pm-11:30pm. Did not track fixes.

---

## Changelog: 2023.03.20 v.0.1.06.005

### Added

- Added: `Readme.md` Comment Style section. [001]
- Added: MoveListeners Class props, including a new one for ErrorHandling: fileName property [001]
- Added evaluateParameter, evaluateEventType funcctions for constructor parameters santity checks [001]
- Added@ JSDoc annoations of two types [001]
  - @todo CHECKS: Code subject to change
  - @todo FREEZE: Freeze changes to v0.3.0 on 2023/03/20
- Added: fileName @prop for File and Method location names [002]
- Added: fileName @prop for File and Method location names [004]

### Changed

- Updated: Code Formatting for `App`, `StartListener` and `MoveListener` [001]
- Updated: `MoveListener` JSDoc DocStrings as per StartListener etc [001]
- Updated: `evaluateParameter`, `evaluateEventType` locname default to template literal, this.fileName,  [001]
  - Updated: `MoveListener`, `StartListener`, `Game`
  - Updated for more abstraction
  - Updated to remove repeating hardcoded string.
- Updated: Reactored `constructor`  [001]
  - uses the new evaluation functions, and JSDoc DocStrings.
- Updated: all functions with a default value template literal with filename and function name appended to template. [001]
  - StartListener, and MoveListener impacted [001]
    - Purpose, to Assist with debugging and console logging when functions get called.
  - Optional parameter, edit/remove before submission.
  - Use only when using with interface/UI classes on event handling.
- Updated: `GamePieces.js` deBug prop name [002]
- Updated: `GamePieces.js` JSDoc DocStrings [002]
- Updated: `evaluatedPieces` in constructor for optional parameters[002]
- Updated: Refactored: `getX`, `getO`, `setX`, `setO` [002]
  - removed get/set statement, refactored with try .. catch
  - Browser was complaining that orginal function signatures were not a function.
- Updated: Refactored `switchPieces` with optional parameters/default values [002]
- Updated: Refactored `checkAPiece` with optional parameters/default [002]
  - Used to check literal type for symbol.
  - Option to switch types in the future
- Updated: Refactored `evaluatedPieces` with optional parameters/default values [002]
- Updated: `GameLogic.js`: Added hard coded symbols into the GamePieces object [004]
- Updated: `StartListener.js` Minor JSDoc DocStrings changes [005]

### Removed

- Removed: `GameDebug` debugger statement

### Refactored

- Refactored all classes since 2023/03/14 to 2023/03/03 [001]
  - *Default class field values* by defining a default, and mitigating undefined behavior
  - *Refactored all constructore* to have less conditionals and more call internal hlper functions. => Improve readbility, abstraction, code separation and sanity checking
  - *Added Error Handlers*to below, to handle try catch errors and error types. Could be moved into a separate Error Class, not now.
  - *Refactored all JSDoc strings*
  - *Default optional function values* for internal function lets, into the function signature for customing console output and error handling
- *Consquence: as of 2023/03/23*
  - Code is not running or tested.
  - UI for reest of the game is to be developed
  - Additioanl functionality is parked.
  - Focus on code, testing and documentation quality is has been the bottleneck/priority for the core functionality.

### ToDo

- ToDo: Test the following code: [001]
  - TEST: App entry point on page load
  - TEST: App UI listeners
  - TEST: Game controller
  - TEST: Game Logic
  - TEST: Game Pieces and Game Board data storage
- ToDo: Update following with same optional function signatures for console and error handling.
  - `App`, `Game`, `GameLogic`, `GamePieces`, `GameBoard`
  - DONE: `StartListener`, `MoveListener`

### Decided

- Decided: To add optional default to most functions where console logging [001]
- Decided: To use default values in class  functions [001]
  - to improve readability and internal variable assignment for hard coded values. #DesignPattern

---

## Changelog: 2023.03.19v.0.1.05.007

### Added

- Added: `GamePieces,js`: New functions: `checkAPiece`, `hasAPiece`  [001]
    - - to improve readbility and santisation (truthy || falsey) for getters/setters
- Added: `GamePieces.js`: New Param checking `evaulatePieces` [001]
  - to santise check for {type} strings in the constructor, @returns array for game pieces storage
- Added: `GamePieces,js`: New Doctsrings for each function. [001]
- Added: `GamePieces.js` debugger statements to the constructor.[001]
- Added: `GameBoard.js` Class level props. [002]
- Added: `gameLogger` function to Game & GameLogic. [003]
  - ToDo: Add to App and GamePieces [003]
- Added: `Game.js` evaluateParameters to improve input checking for game Players [003]
- Added: `GameLogic,js` evaluateParameters and evaluateTypes for error handling and sanity checking.
- Added `GameLogic.js` props to the class level, especially the Blank cell and winning combinations that does need to be renewed each run. [003]
- Added: `App.js` Class level props. [004]
  - Initialised and defined: newGame
  - Initialised and defined: startButton
  - Initialised and defined: userMoves
  - Initialised and defined: startListener and moveListeners
    - Intent to not to have undefined behaviours for the whole app.
- Added: `Game.js` New Functions for inline conditionals [005]
- Added: `StartListener,js` Class props, and default values [007]
- Added: `StartListener,js` evaluateParameters and evaluateEventTypes for error handling and sanity checking. [007]

### Changed

- Updated: `GamePieces.js` DocStrings as per `Game.js`, `App.js` [001]
- Updated: `GamePieces.js` functions with local string message consts for errros and output [001]
- Updated: Inline comments for functions as needed. [001]
- Updated: GameDebug functions with File name as 4th parameter [001]
- Updated: `GameDebug.js`'s debug function with default values. [001]
- Updated: `GameBoard.js` updated this.grid, project wide. [002]
- Updated: `GameBoard.js` updated JS DocStrings [002]
- Updated: `GameLogic.js` updated JS DocStrings [003]
- Updated: `Game.js` updated JS DocStrings [003]
- Updated: `GameLogic.js` minor modifications not tracked [004]
- Updated: `App.js` Reactoring the constructor to be more streamlined [004]
- Updared: `Game.js` Refactored makeMove into 4 functions [005]
  - `checkMove` to see if the move is valid and game not over. [005]
  - `updateGrid` to update the board's grid with the current Piece
  - `isGameOver` to check the terminal state of the game. [005]
  - `makeMove` modified to employ these new methods. [005]
- Updated: `GameLogic.js` on the tyep checking of the parameters [006]
- Updated: `StartListener.js` constructor [007]
- Updated: `StartListener.js` `error` signature and parameters, now onError [007]
- Updated: `StartListener.js` `onError` now refactored for better readability.. [007]
- Updated: `StartListener.js` `addListener` refactored [007]
- Updated: `StartListener.js` `addListener` refactored [007]
- Updated: `StartListener.js` `onStart` refactored [007]
- Updated: `StartListener.js` JSDoc DocStrings for file, class, functions, props [007]
- Updated: `Game.js` whitespace [007]

### Removed

### Fixed

- Fixed: Improved readability, extensibility and maintainability. [005]

### ToDo

- ToDo: Remove is*Cell() functions if no use case is found. [002]
- ToPlan: Employ GameBoard as a future solution to local storage and writing to the UI state of data-state and data-value attributes. [002]
- ToDo: Remove debugger statement & Quokka LiveValue statement [002]

### Noted

- Noted: `GameBoard.js` No input/params santisation, no getters/setter [002]
- Noted: `GameBoard.js` This class is an initialisation state machine /class [002]
  - to determin the initial state of the game (as of 2023/03/19) [003]
  - New refactorings allow for new functionality to be added in the future for Game.js [005]

### Decided

- Decided: Use new helper boolean functions to instead of long multiple conditional statements [001]
- Decided: Use default values for function params were appropriate. [001]
- Decided: To tidy up all constructors as applicable. [002,003]

---

## Changelog: 2023.03.16 v.0.1.01.001-004

### Added

- Added: `App.js`: new member: {GameDebug} debug
- Added: `App.js`: new member: {GameConfig} config
- Added: `App.js`: new member: {Game} game
- Added: `App.js`: new member: {Element} button
- Added: `App.js`: new member: {NodeList} move
- Added: Quokka /*?+*/ for checking and testing live values.
- Added: deugger statement for inspection. Liberally applied. @ToDo: remove once not needed.
- Added: `Game.js`: new member: Player 1 {String} to store X piece, and assigns it to GamePieces
- Added: `Game.js`: new member: Player 2 {String} to store O piece, and assigns it to GamePieces
- Added: `Game.js`: new member: gamePieces {GamePieces} to store both  X & Y from P1, P2 on instance of.
- Added: `Game.js`: new member: gameBoard {GameBoard} for the start state of the board/game.
- Added: `Game.js`: new member: gameLogic {GameLogic} for the engine of the game, win or draw state, and winning combinations.
- Added: `Game.js`: new member: debug {GameDebug}
- Added: `Game.js`: new member: isStart {Boolean}
- Added: `Game.js`: new member: gameRunning {Boolean} @todo: Is this used/what is use case for?

### Added: 004

- Added: GitHub Action: Super Linter for Code Quality. See [.github/linters/linters.md](.github/linters/linters.md)

### Changed

- Updated: `App.js`: _error() with a flag parameter and default in a switch case
- Updated: `App.js` Try & Catch error handing for constructor.
- Updated: `App.js` JSDoc Docstrings for File, Class, Functions, Members => Documenation
- Updated: Home.html - minor.
- Readme.md updates
- Updated: `Game.js` - Updated debugger statements, as undefined objects are causing errors in runtime.
  - Is hoped that defineding the class members will fix the undefined behavior.
    > `Fields without initializers are initialized to undefined. Like properties, field names may be computed.` [MDN: Public Class Fields: Descripion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#description)
    - Maybe overkill, or precautionary
- Updated: `Game.js` JSDoc Docstrings for File, Class, Functions, Members => Documenation
- Updated: `Game.js` makeMove with game state logic and local boolean flag for `resetGame()` or `next Turn()`.
  - New @argument: start {boolean}
- Updated: `Game.js` `resetGame` function signature
- Updated: `Game.js` `resetGame`'s tasks for reseting/ reinstalising class members/props.
- Updated: `GameDebug.js` Addtiton output ASCII and Temporal literals for clarity in console output, like file name
- Changed: `GameDebug.js` Level 8: DirXML Warn Tracing: for Interactive descendants.
- Updated: `GameDebug.js` Improved JSDoc as per Game.js and App.js documentation/

### Removed

- Commented: Debugger for button, move. @Todo: Remove later.

### Fixed

### ToDo

- ToDo: `App.js`: new member: StartListener when research allows
- ToDo: `App.js`: new member: MoveListener when research allows
- Fixme: Module file names, if advisable, for all files and import statements
- FixMe: Game.js is bottleneck: errors. Tested needed

### Decided

- Decided: Alter Classes to have props/public members by default.

---

## Changelog: 2023.03.14 v.0.1.04.003

### Added

- Added: `Check.md` Checklist for `Readme.md` [002]
- Added: Media elements from Mermaid and Draw.io [003]

### Changed

- Updated: `Readme.md` - Improved formating  [002]
- Updated: `Readme.md` - Developer Goals  [002]
- Updated: `Readme.md` - Audience Goals  [002]
- Updated: `Readme.md` - User Experience  [002]
- Updated: `Readme.md` - Audience  [002]
- Updated: `Readme.md` - Design  [002]
- Updated: `Readme.md` - App Design [002]
- Updated: `Readme.md` - State of the Game  [002]
- Updated: `Readme.md` - Transition States of the Game  [002]
- Updated: `Readme.md` - State Diagram  [002]
- Updated: `Readme.md` - User Journey  [002]
- Updated: `Readme.md` - Activity Diagram  [002]
- Updated: `Readme.md` - Class Diagram  [002]
- Updated: `Readme.md` - App & UI Logic  [002]
- Updated: `Readme.md` - Game Logic  [002]
- Updated: `Readme.md` - Utility Logic  [002]
- Updated: `Readme.md` - IDE  [002]
- Updated: `Readme.md` - Features  [002]
- Updated: `Readme.md` - Testing & Verification  [002]
- Updated: `Readme.md` - Static Analysis  [002]
- Updated: `Readme.md` - Dynamic Analysis  [002]
- Updated: `Readme.md` - Deploy - Features: App.js Features  [002]
- Updated: `Readme.md` - Deploy - Features: Game.js Features  [002]
- Updated: `Readme.md` - Deploy - Features: GameLogic.js  [002]Features
- Updated: `Readme.md` - Future Enchancements: FE001  [002]
- Updated: `Readme.md` - Future Enchancements: FE002  [002]
- Updated: `Readme.md` - Future Enchancements: FE003  [002]
- Updated: `Readme.md` - Future Enchancements: FE004  [002]

### Fixed

- Fixed: `Game.js` this.gameBoard*s* => this.gameBoard typo. [001]
- Fixed: `Game.js` is*A*Win(), is*A*Draw() function name/update typo. [001]

---

## Changelog: 2023.03.13 v.0.1.03.001

- Big Commit: Prior to Mentor Meeting. Rational and changelog

### Added

- Added: Class Diagrams (mermaid) to Readme
- Added: Links to Draw.io Class Diagrams [PDF | PNG] - Directly from Draw.io (additional commits)

### Changed

- Updated: `Readme.md`
- Changed: `GamePieces.board` => `GamePieces.grid`
- Updated: JSDoc for `GamePieces`, `GameConfig`,`GameBoard`,`MoveListener`,`StartListener`,
-

### Fix

- App.js has an uncaught synatx error.
- Other paramers are being TypeError caught as undefined.

### ToDo

- Debugging:
- Add a GameError class like the Debugger, or embedded in the debugger: Target: `StartListener`,`App`,`MoveListener`,`Game` only as this is where user inputs and params are passed/tightly coupled between classes for a) App init(), b) Events, i) new game buttons, ii) user moves

### Done

- Done: Web App Architecture/Classes is done for MVP
- Done: UI
- Not Done: Removing Application bugs.
- Note Done: Proving design works, or not, with event listeners and signal down to GameLogic in a MVC-ish like pattern.

### Decided Meeting Mentor: 1st Meeting

- Defensive programming is catching errors not expected. Help needed.
- Noted: Tried to have a running app for the 1st Mentor Meeting
- Deciced: as Bugs were happening, decided to JSDoc and Class Diagram to describe the app.
- Noted: Was heavily influenced in my design choices by my Java / C# background/training
- Noted: Less familar with functional programming, am more impertiative, state based, like the DOM is.

---

## Changelog: 2023.03.12 v.0.1.002.001-003

### Added: `StartListener.js`, `GameConfig.js`, `App.js`

- Added: `StartListener.js`: Assigned @_evt to this.eventType [001]
- Added: `StartListener.js`: Try .. Catch for assigning Debbugger class for instance [001]
- Added: `StartListener.js`: Defensive programming for checking instance @params, throwing an error [001]
- Added: `StartListener.js`: Defensive programming for checking instanceOf for types of @params, throwing an error [001]
- Added: `StartListener.js`: Assign an event listener, as a private function (using Symbol as key to the function) with defensive programming. [001]
- Added: `StartListener.js`: Defensive programming for onStart function. [001]
- Added: `GameConfig.js`: Created a configuration object to abstract the HTML strings into static strings
  - Usage: To be used as `typeof === "string"` for DOM Nodelist queries and getHTMLElement methods. [002]
  - Usage: Centralises the use of strings through out the application
  - ToDo: Pass the configuration object into the Game controller and other object.
  - Risk: Increase of coupling (dependencies) and and cohession of the app design and architecture
  - Why: Improves code maintainability, expansion, at expense of some additonal complexity for certain tiers of developer.
- Added: `GameConfig.js`: `GameDebug.js` and a constructor to the GameConfig class. [002]
- Added: `App.js` Added a class of App to this module. [003]
- Added: `App.js` `Init()` Added tests for instanceof check for Startlistners and MoveListners [003]
- Added: `App.js` `errror(e), error(obj)` Overloaded error functions for application and object level errors. [003]
- Added: `App.js` JSDoc comments added. [003]
  Added `GameConfig.js` _DEV and_REPO strings for User actions when error are encountered [003]

### Changed

- Updated: `onStart()` with error handling [001]
- Updated: `onStart()` with debugger [001]
- Updated: `GameConfig.js`: Moved the export statement to end of file. [002]
- Updated: `GameConfig.js`: JSDoc comment, documentation, of GameConfig class. [002]
- Updated: `App.js`: Changed the init() function, adding try .. catch defensive programming [003]
-

### Removed

- Removed: `App.js` function of init for a functional style of initialising/running the application. [003]

### ToDo

- ToDo: The defensive program is too complex and [001]
- ToDo: Is just a little hard to read. It is overly cautious. [001]
- ToDo: Refactor the code, and make it more readable. [001]
- ToDo: Move export statement to end of all modules, and not in class declaration. [002]
- ToDo: Format all the JSDoc blocks with same as `GameConfig.js. App.js`. [002,003]

### Decided

- Decided: To add GameDebug support to all class modules. [002]

## Changelog: 2023.03.11 v.0.1.002.001-004

### Added

- Added: GameDebug class for debug the OOP model and instances. Version 0.1.0 [001]
  - Efficieny for not having to write consol.log ... etc and uses more of the console api for logging, tracing, error and other diagnostic, by setting a message and a debug flag (1-9)
    - 1: `console.lnfo`: Just a message to the console
    - 2: `console.log`: Send message and any object to the console.
    - 3: `console.trace`: Sends a message, a log and trace of the object to the console.
    - 4: `console.debug` As for 3, but now includes sends the debug for the object to the console.
    - 5: `console.warn` As dfor 3, now includes the warning for the object to the console
    - 6: `console.error` As dfor 3, now includes the error for the object to the console, with an error string.
    - 7: `console.dir & console.dirxml`: Sends the object to the console and any literanl content (dirxml) to the console. Useful for knowing which HTML/DOM object it is.
    - 8: `console.trace`: Like, 3, just a simple trace output for the console.
    - 9: Full Stack Traceing, Dir/DIRXML and Error to console.
    - none: `console.clear`: Clears the console. Default if no flag or nothing between 1-9 is used.
- Added: `GamePieces`: Debugging to the class. [002]
- Added: `GamePieces`: Defensive conditional to Getters/Setters, with debug and error statements added to if/when error happens. [002]
- Added: `GamePieces`: `switchSymbol` function to the class. Maybe useful or maybe not. Potentiall refactor [002]
- Added: `GameLogic`: Defensive error checking, type checking in the class constructor [003]
- Added: `GameLogic`: Debugging to the class. [003]
- Added: `GameLogic`: Logging to the console for game state and current player. [003]
- Added: JSDoc comments to all classes, using VSCode extension DocumentThis .[003]
- Added: `GameLogic`: export statement at end of class module [003]
- Added: ADLog.md, (Alias:  DecisionLog), for tracking key developer choices, architectural and design decisions [004]

### Changed

- Changed: Updated setter functions to assign the pieces array and current symbol. [002]
- Updated: JSDoc for Class, all methods, and static/readonly props in the class. [003]
- Updated: isWin(), isDraw() for better method naming. [003]
- Adjusted: Class internal params with an underscore before the parameter name to increase use of maintenance. [003]

### Removed

### Fixed

- Fixed: Bugs in GamePieces where X was not defined. Was setting the this.X property to the wrong value/setter function. [002]
- Fixed: Setter functions that was causeing a potential infinite loop. [002]

### ToDo

- ToDo: Add a messaging class messages to the UI and User or  [003]
- ToDo: Hoist above ToDo this as a move to a higher / calling Class [003]

### Decided

- Decided: To add Debugging functionalities to take the FUD out of coding classes. Used liberally and will be refactored out before submission. #DeveloperUilitity. [001]
- Decided: To add defensive coding strategies to all functions, testing. validating for if a @param in a function is not null or not undefined, else throwing and error and logging a debug message. [002]

---

## Changelog: 2023.03.09 v.0.1.01.001-003 - OOO_Version

- Bump to Minor version 0.1.01:

### Added

- Added: @__Game.js: Added {boolean} gameState  for controling the terminal state of the game by a boolean flag. [001]
- Added: __ButtonListener.js for handling User interaction on the start button. [003]
  - Added: Null / Undefined handling for NodeLists from DOM as  Object could be null
  - Added: console.log for the button object
  - Has single responsibility to manage the start state of the game when a user click on the button.
- Added: __MoveListener.js for when the user clicks on the cell of the grid (class: .cell) [003]
- Added: App.js: for initialisation of the JavaScript application [003]
  - Called the Game Controller
  - Calls the Two user interaction methods: Move/Click the cell, Game Start/Button click.
- Added: App.js: String constants for the strings values to be passed to the class construtors for ease of future maintenance. [003]

### Updated

- Changed: player symbols to pieces symbols in Logic & Game constructor a closer binging to conceptual logic of the parameters. e.g Players move pieces on a board, players do not move on a board themselves [002]
- Updated: home.html: changed the .box => .cell for consistency [003]
- Updated: home.html: hanged script.js to App.js [003]

### ToDo/ToFix

- ToDo: Game object, by Quokka static/dyanmic analysis, states that X is undefined. [003]
  - Tried to add the symbol strings of X and Y to the game object constructor to be passed down to the GamePieces constructor for assigning the X property.

## Changelog: 2023.03.08 v.0.0.06.001-002 - OOO_Version

### Added

- Added: New Branch: OOO_Version (Experimental)
- Added: Experimental Variation based on Object Orientated Clases
- Added: __GameLogic.js [001]
- Added: __Game.js for the Game Controller [002]
- Added: __GamePieces.js for the Game Pieces / Symbols [002]
- Added: __GameBoard.js for the Game Board [002]
- Added: JSDoc comments for all clases and functions mostly complete.[002]

Note this code is not tested, just write and not aserted a running, it is a model implementation. Fear and hestitation stops me at the momemnt. F.U.D.[002]
Althought, classes code is more interdependent that is requires for a complete model implementation before testing as it is not hooked into the UI yet.[002]

### ToDo

- ToDo: Implement Getter/Setters for GamePieces.js for Players to choose, or randomise their game pieces at the staty of a match or a game. [002]
- ToDo: Implement Randomiseation for the turn or the pieces, so to add varitey in who goes first. in Game.js or for GameLogic or  another SRO class. [002]
- ToDo: Optionally use this interface to assign symbols to the players, by user input for customisation (as above, duplicate) GamePieces.js[002]
- ToDo: For the terminal states of game (Win || Draw): Either reset the board or do more on the UI Game.js (ResetBoard) [002]
- ToDo: Expand this logic for better user experience, MVP++, and improve the game flow/activity flow/ user journey in Game.js (ResetBoard) [002]
- ToDo: Maybe Add: Optional Checking for Game Cell state changes for UI [002]
-

### Noted #

- Noted: This version is being concurrently developed with a basic function only imperative, classic version on a separate branch. I am more familiar with OO than most on the course and will continue to develop both versions for this purpose of assignments.

### Added

## Changelog: 2023.03.08 v.0.0.05.001-004

### Added

- Added: Outline of game design and logic [001]
- Added: State diagram & transitions flows for Game Flow [001]
- Added: Mermaid text to diagram (hereto mention as just `Mermaid`) Code [001]
- Added: User Journey for Game & `Mermaid` [002]
- Added: Activity Diagram for Game interactions, methods and `Mermaid` [003]

### Notes

- Noted: Pushed everything by accident in [003] instead of changelog and readme. WIP code commited. for Init.js, .gitignore, index.html, core.css and done.md. No reversion, but unplanned change in commit history. [004]

## Changelog: 2023.03.01 v.0.0.04.001

### Added

- Author's credit to HTML for Gameboard UI: [https://codepen.io/shammadahmed](https://codepen.io/shammadahmed) @ [CodePen: CodePen Home
Tic-Tac-Toe game layout with CSS Grid Layout](https://codepen.io/shammadahmed/pen/JOWEGW) [001]

### Changed

- Changed: Adapted the source gameboard UI with enhancements (i.e. data-* attributes) for ease of state change and interactivity coding. [001]
- Updated: Class names and used a class delimiter syntax from CUBE.fyi ( `[` ... `] | [` ... `]` ) [001]

---

## Changelog: 2023.03.03 v.0.0.02.001-003

### Added: [001-002]

- Added: Outline and categorised linting rules as employed by [StandardJS.com](https://standardjs.com/), [Github: https://github.com/standard/standard](https://github.com/standard/standard) using opinionated though standard [Eslint rules](https://eslint.org/docs/latest/rules/) [001]
- Added Core.css for Styling
  - Applied [CUBE.fyi](https://cube.fyi/) via CSS Layers (currently non valid CSS by Jigsaw, but modern browser supported, though is Recommended Candidate in 2022). [002]
- Added Index.html for Game Pad 'canvas' for Tic Tac Toe [002]
  - Source: Hammad Ahmed (CodePen) "Tic Tac Toe game layout" with CSS Grid Layout. Last Accessed: 2023-03-03: [https://codepen.io/shammadahmed/pen/JOWEGW](https://codepen.io/shammadahmed/pen/JOWEGW) and modified by author.
  - Applied CUBE delimiters `[`, `]`, `|`, inside class="", which are ignored by Web Engine parser, but act as delimiters for improved readablity
    - 1st `[  ]` = Compose | Block
    - 2nd+  `[  ]` = Utilities
    - Last  `[  ]` = Exceptions | State change
- Added data-* attributes for anticipated Javascript reference, manipulation of state, value and coordinates of data/content.
- Added Core.css and adapted above source css:
      - Added Custom Properties for Javascript manipulation or variables and media/container queries. [002]
      - Updated to logical properties [002]
      - Applied Andy Bell's Relative Rounded Corners and created Util Classes [002]
      - Added Minmax for Grid items dimensions for control over Grid sizing on small screens [002]

### Updated

- Updated: Readme - Reliability > Testing & Vertification > Validation > JS [Donelog Item: 2.1](_documentation/done.md#2.1)

### Noted

- Decided on using StandardJS.com as JS Linter, over JSLint and ESLint, though ESLint is employed by Standard.[002]
- Validated HTML and have 0 Errors. [003] [2.2](_documentation/done.md#2.2)
- Validated CSS and have 7 Errors for @layers. This is CSS is supported by all modern browsers, and is a Recommended Candidate for Cascade. [003] [2.3](_documentation/done.md#2.3)

---

## Changelog: v.0.0.01.001 2023.03.01

### Added: 001

- Added: New Changelog.md template: For tracking human parsing of project changes [001]
- Added: New Donelog.md template: For tracking MVP and DoD of Assessment Criteria. [001]
- Added: GitHub Pages for Project: URI: <https://ipoetdev.github.io/terni-lapilli--toe/>

### Changed: 001

- Updated: Donelog content: Initial Focus on Pass Criteria DoD checklist.[001]
