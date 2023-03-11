# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and adheres to [Semantic Versioning](http://semver.org/).

> - Modified, by incrementing and counting the index of commits on a daily basis
> - (Major.Minor.Patch.CommitIndex) (By CJ)
> - Header Formatting & Intents as below

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

## Changelog: 2023.03.01 v.0.0.04.001

### Added

### Changed

### Removed

### Fixed

### ToDo

### Decided

---

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
