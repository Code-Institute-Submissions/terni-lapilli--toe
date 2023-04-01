/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/16
  *@version 0.2.0
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GameLogic } from "GameLogic.js"; @see module:GameLogic
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameBoard } from "/lib/__GameBoard.js";
import { GamePieces } from "/lib/__GamePieces.js";
import { GameLogic } from "/lib/__GameLogic.js";
import { GameDebug } from "/lib/__GameDebug.js";

/** GAME CLASS [ ] TODO: FIXME: REBUILD / ISSUE 005, 2023-03-22
 * @name Game
 * @kind class
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
 * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
 * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
 * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
 * @prop {GamePieces} gamePieces Players' pieces for the game play.
 * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
 * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
 * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
 * @prop {GameDebug}  deBug checks for draw moves against is all squares are filled
 * @function makeMove(move)
 * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
 * @function nextTurn
 * @description Assigns the next turn and changes the symbol according to the players turn.
 * @function resetBoard
 * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new game round. @since @date 2033/03/16  @version 0.2.0
 * @version 0.3.0 REFACTOR @date 2023/03/22. See Changelog on this date.
 */
class Game {
    /** GAME [ ] TODO: REFACTOR ISSUES 00_ 2023/03/22
     * @prop {GameDebug} deBug Debugger/Console
     * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
     * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
     * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
     * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
     * @prop {GamePieces} gamePieces Players' pieces for the game play.
     * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
     * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
     * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
     * @prop {string} fileName - FileNams identifer for Error Handling
     */
    // Game Fields (Properties)
    deBug = new GameDebug(); /* ?+*/
    Player1 = "X"; /* ?+*/
    Player2 = "O"; /* ?+*/
    // gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
    gamePieces;
    playedPiece;
    // gameBoard = new GameBoard(); /* ?+*/
    gameBoard;
    // gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /* ?+*/
    gameLogic;
    gameRunning = false;
    fileName = "Game.js";
    logLevel = 8;
    errorLevel = 8;

    /** Game constructor [ ] TODO: FIXME: ISSUE #5
     * Game controller class (constructor) for the game of TicTacToe
     * @name constructor
     * @kind function
     * @classdesc Instantiated the Game class with the players' pieces, and the game's board, pieces, and logic. Then enables the game's state.
     * @param {String} _X, Player1's symbol, nominally Ex, X., or a Cross, Can be assigned new string type of piece/representation for the game. Optionally defaults to X. @default 'X'
     * @param {String} _O, Player2's symbol, nominally Zero, O, or a Nought. Can be assigned new string type of piece/representation for the game. Optionally defaults to O. @default 'O'
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @constructor
     * @constructs Game
     * @type {Game}
     * @memberof Game
     * @version 0.3.0 REFACTOR @date 2023/03/22. See Changelog on this date.
     */
    constructor(_X = "X", _O = "O", log = this.logLevel, locname = `${this.fileName}: constructor`) {
        this.deBug = new GameDebug(); /* ?+*/
        // const log = this.logLevel;
        // 1. check the params and assign to current Players, else rely on default game pieces of Tic Tac Toe
        //debugger;
        this.Player1 = this.evaluateParameter(_X, 1, log, `${locname}: sets Player1`); /* ?+*/
        this.Player2 = this.evaluateParameter(_O, 2, log, `${locname}: sets Player2`); /* ?+*/
        this.gameRunning = false;
    }

    /** Game onInit : Initialiser @version 0.4.1 @date 2023/04/01
     * @name onInit
     * @kind function
     * @classdesc Initialises the Game's dependencies, and initialise the class active game state. 
     * @return {boolean} Updates the caller's state
     * @param {boolean} isRunning 
     * @param {PointerEvent} pointerEvent
     * @param {number} [log] Log to console. @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @prop {GamePieces} this.gamePieces A new set|instance of GamePieces per each new game
     * @prop {GameBoard} this.gameBoard A new board|instance of GameBoard per eacg new game
     * @prop {GameLogic} this.gameBoard A new logic engine|instance of GameLogic per each new game
     * @prop {boolean) this.gameRunning Update the new instance's game persistent|active state @value true
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/04/01 @version 0.4.1 Debugging, Validating
     * @note The game exits
     * @memberof Game
     */
    onInit(isRunning, pointerEvent = null, log = this.logLevel, locname = `${this.fileName}: onInit`) {
        // 1: Sets Block vars
        const logs = log;
        const check = this.errorLevel
        let pointer = pointerEvent // === null
        debugger; /** TODO REMOVE */
        try {
            // 2: Test if game is running 
            //if (isRunning) {
                // 3: Assign the game's pieces to a) the current game players and b)  up a new board
                this.gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
                this.gameBoard = new GameBoard(); /* ?+*/
                // 4: Link the current board and current pieces to the game logic
                this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /* ?+*/
                // 5: Set the game persistent active state to true, for duration of the game, from the game init.
                this.gameRunning = isRunning;
                //Console Logging /** TODO REMOVE */
                this.deBug._debug( this.gameBoard, `Game Board set`, logs, `${locname}: Board` ); /** TODO REMOVE */
                this.deBug._debug( this.gamePieces,`GamePieces set`, logs, `${locname}: Pieces` ); /** TODO REMOVE */
                this.deBug._debug( this.gameLogic, `Game Logic set`, logs, `${locname}: Logic` ); /** TODO REMOVE */
                //return this.gameRunning
            //}
            // 5: Game init error: do something, log to console.
            // if (!isRunning) {
            //     this.gameRunning = false;
            //     let initmessge = `Game not started. Not Initialsing without Click event` 
            //     let inittrace = `${locname}: OnInit(): Game not Started` 
            //     this.deBug._debug( isRunning, initmessage, logs, inittrace);
            //     //return isRunning;
            // }
        } catch (errorinit) {
            let errormessage = `${locname}: Game Initialiser ${errorinit.linenumber}:${errorinit.columnNumber}`
            this.deBug._debug(errorinit, `${errormessage}`, check, locname )
            throw new Error(errormessage, {name: `${errorinit.linenumber}: ${errormessage}:`, stack: errorinit})
        }
    }

    /** isGameStarted @version 0.4.1
     * @function isGameStarted
     * @kind function
     * @description checks if a game has started (initial is false), and updated the game active state to true.
     * @usage Used only to check game initialisation status by boolean from App or UI, after a new game is initialised or on App Load.
     * @date 2023/03/30 @sincce @version 0.4.1
     * @returns {boolean} Whether the move is valid and the game is not over
     * @memberof Game
     */
    isGameStarted(isGameRun = false) {
        if (isGameRun === false) {
            return (this.gameRunning = true);
        }
        if (this.gameRunning === true) {
            message = `The current game is already running`;
            window.alert(message);
            return undefined;
        }
    }

    /** checkMove [ ] TODO: remove console ISSUE 00_
     * @function checkMove
     * @kind function
     * @description checks if the move is valid and the game is not over.
     * @param {number} move The index of the move to make
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @returns {boolean} Whether the move is valid and the game is not over
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */

    /** TODO REMOVE gameState's default value, and just check for truthy */
    checkMove(move, gameState = true, log = this.logLevel, locname = `${this.fileName}: checkMove()`) {
        // this.deBug._debug(move, `${locname}: Cell Index ${move}, ${gameState}`, log, locname);
        if (typeof move === "number" && gameState === true) {
            const cellId = parseInt(move);
            return this.gameBoard.grid[cellId] === "" && this.gameRunning === gameState;
        }

        if (gameState === false) {
            badMove = gameState;
            const message = `Can not make a move at this time. Press the start button or check the console for more information, and contact the developer`;
            windows.alert(message);
            this.deBug._debug(
                move || gameState === false,
                `Illegal move type or game state`,
                9,
                `${locname}: Illegal type of Move or inactive game state`
            );
            return badMove;
        }
    }

    /** updateGrid  [ ] TODO: remove console ISSUE 00_
     * @function updateGrid
     * @kind function
     * @description Assigns the current piece to the move.
     * @param {number} move The index of the move to make
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    updateGrid(move, cell, locname = `${this.fileName}: updateGrid()`) {
        // console.log(`${locname} : current Piece to current Move/grid cell`); /* ?+*/
        debugger;
        console.log(`${locname} Current Piece ${this.gamePieces.currentPiece}`);
        this.gameBoard.grid[move] = this.gamePieces.currentPiece;
        window.alert(this.gameBoard.grid[move]);
        // this.gameBoard.currentCellMove(cell);
    }

    /** makeMove  [ ] TODO: FREEZE ISSUE 00_
     * @function makeMove
     * @kind function
     * @return {boolean} Returns game state to UI.
     * @description Assigns the current piece to the move if it is valid and the game is not over.
     * If the game is over (i.e., there is a winner or a draw), it resets the game. and returns boolean state to UI Handlers onClick
     * @param {number} move The index of the move (cell index) to make
     * @param {number} log Logging flag @default this.logLevel: Class level logging
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @memberof Game
     * @date 2023/03/22. @version 0.3.0 DONE  See Changelog
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/03/28 @version 0.4.1 FREEZE . See #.
     */
    makeMove(move, current, gameState, log = this.logLevel, locname = `${this.fileName}: makeMove()`) {
        const logs = 8;
        debugger; /** TODO REMOVE */
        console.log(`Game Active State: Param ${gameState}. Expect Truthy`);
        console.log(
            `Game Running Persistent State: Class ${this.gameRunning}. Expect Truthy until end of Game, the Falsy`
        );
        try {
            
        
            if (this.checkMove(move, gameState, `${locname} => checkMove(): ${move}`)) {
                // debugger; /** TODO REMOVE */
                // Assign the current piece to the move
                this.updateGrid(move, current);
                console.log(`Game Running Persistent State: Class ${this.gameRunning}. Set to true`);
                this.gameRunning = true;
                console.log(`Game Running Persistent State: Class ${this.gameRunning}. is True`);
                const playingPiece = this.gamePieces.currentPiece;
                this.deBug._debug(
                    current,
                    `${current} . ${current.dataset.index}`,
                    log,
                    `${locname}: call Cell Index: ${playingPiece}`
                );
    
                debugger; /** TODO REMOVE */
                // 1st: Assume game is always true, while in play and Logic is not met
                if (!this.isGameOver(this.gameRunning, logs, `${locname}: GameActive`)) {
                    this.deBug._debug(this, `Game is Active: Init a New Turn ${this}`, logs, `${locname}: Next Turn`);
                    debugger; /** TODO REMOVE */
                    // Switch to the next turn
                    this.gameRunning = true;
                    this.playedPiece = this.nextTurn(this.gameRunning, playingPiece, logs, `${locname}: nextTurn`);
                    this.deBug._debug(this, `Game Active: Init a New Turn ${this}`, logs, `${locname}: Turn is done`);
                    return this.gameRunning;
                }
    
                debugger; /** TODO REMOVE */
                // 2nd Game is not running, i.e. Logic updates this.gameRunning === false
                if (this.isGameOver(this.gameRunning, logs, `${locname}: GameOver`)) {
                    this.deBug._debug(this, `Game Ended: ${this}`, logs, `${locname}: Start Ending Game`);
                    debugger; /** TODO REMOVE */
                    // Reset the game
                    playingPiece = "";
                    this.gameRunning = false;
                    this.clearCurrentGame(this.gameRunning);
                    this.deBug._debug(this, `Game Ended: ${this}`, logs, `${locname}: End of Game`);
                    return this.gameRunning;
                }
             }
        }  catch (error) {
            const errormessage = `${locname}: ${error.linenumber}: ${error.columnNumber} ` 
            const errortrace = `${locname} : ${error.name}: makeMove Error`
            this.deBug._debug(( this, errormessage, logs, errortrace ));
            throw new Error( errormessage, {name: `${error.name}: ${errortrace}`, stack: error})
        }
    }

    /** nextTurn  [ ] TODO: FREEZE ISSUE 00_
     * @function nextTurn
     * @kind function
     * @description Assigns the next turn and changes the symbol according to the players turn.
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     **/
    nextTurn(turn, nextPiece, log = this.logLevel, locname = `${this.filename}: nextTurn()`) {
        this.deBug._debug(turn, `@param: ${turn}: ${locname}`, log, `${locname}`);
        console.log(nextPiece, this.gamePieces.currentPiece);
        if (turn) {
            console.log(nextPiece, this.gamePieces.currentPiece);
            return (this.gamePieces.currentPiece = this.gamePieces.switchPieces(nextPiece));
        }
    }

    /** isGameOver [ ] TODO: remove console ISSUE #6
     * @function isGameOver
     * @kind function
     * @description Truth for if the game is Over (i.e. isAWin or isADraw).
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/03/24 @version 0.3.2 Changed method body to track game state
     * @return {boolean}
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     **/
    isGameOver(isrunning, log = this.logLevel, locname = `${this.fileName}: isGameOver()`) {
        if (isrunning) {
            //debugger; /** TODO REMOVE */
            if (this.gameLogic.isAWin()) {
                this.deBug._debug(this.gameLogic.isAWin(), `${locname}: is in a Win state`, log, `${locname}: isAWin`);
                /** TODO REMOVE */
                this.gameRunning = false; // Update the game state to non active
                return true;
            }
            //debugger; /** TODO REMOVE */
            if (this.gameLogic.isADraw()) {
                this.deBug._debug(
                    this.gameLogic.isADraw(),
                    `${locname}: is in a Draw state`,
                    log,
                    `${locname} isADraw`
                );
                /** TODO REMOVE */
                this.gameRunning = false; // Switch the game state as non active
                return true;
            }
        }
        this.gameRunning = true; // Keep the game state as active, turn
        return false; // Keep the game over/terminal state as false,
    }

    /** clearCurrenGame: Clears the curent Game at terminal state. @version 0.4.1 [X] FREEZE
     * @function clearCurrentGame
     * @kind function
     * @param {boolean} start
     * @param {number} log Log level @default 1
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @memberof Game
     * @description Clears/reinitialised the game's objects/artefactes. JS does good GC/Memory.
     * @date 2023/03/22 @version 0.3.0 REFACTOR . See Changelog on this date.
     * @date 2023/03/22 @version 0.3.0 Updated Docstrings
     * @version 0.4.1 ENCHANCE @date 2023/03/28. #
     **/
    clearCurrentGame(start, log = this.logLevel, locname = `${this.filename}: clearCurrentGame()`) {
        const logs = log;
        const message = `End of Game: All Game items are cleared or reset.`;
        const endState = false;
        // This method is called when the current game has reached it endState, terminal state.
        if (start === endState) {
            debugger; /** TODO REMOVE */
            this.Player1 = "X";
            this.Player2 = "O";
            this.gamePieces = new GamePieces(Player1, Player2);
            this.gameBoard.resetCellMove();
            this.gameBoard = undefined;
            this.gameLogic = undefined;
            this.gamePieces.currentSymbol = Player1;
            this.gameRunning = endState;
            this.deBug._debug(start, message, logs, `${locname}: Cleared/Initalised current Game Items`);
            this.logLevel = 0;
            this.deBug = undefined;
            return;
        }
    }

    /** evaluateParameter: [ ] TODO: FREEZE
     * @function evaluateParameter
     * @description checks for presnce of parameter value and returns it, else exits on null or undefined.
     * @param {*} param Parmeter under evaluation
     * @param {number} [argIndex] Optional, switches between number of parameters @default 0
     * @param {number} [log] Optional, log @default 0
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @return {*} The parameter
     * @throws {Error} If param is null or undefined.
     * @memberof GameLogic
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @version 0.3.0 FREEZE  @date 2023/03/22. See Changelog on this date.
     */
    evaluateParameter(param, argIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter()`) {
        // Object: Key: Value map like Object
        const paramNameMap = {
            1: "Player 1's Piece",
            2: "Player 2's Piece",
            default: "Current Player has no current piece",
        };
        // Object: Key: Value map for error strings
        const errOutMap = {
            1: "not set",
            2: "required",
            default: "Null | Undefined",
        };
        // checks if param is not null or undefined, using Nullish coalesing operator, and returns the parameter, else throws an Error.
        if ((param ?? false) && typeof param === "string") {
            return param;
        }

        if (param ?? true) {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is ${
                param ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(param, errmessage, log, `${locname}`);
            throw new Error(errmessage);
        }
    }
}

export { Game };
