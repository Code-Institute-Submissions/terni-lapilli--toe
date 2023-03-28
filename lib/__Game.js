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
    gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
    gameBoard = new GameBoard(); /* ?+*/
    gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /* ?+*/
    gameRunning = false;
    fileName = "Game.js";
    logLevel = 8;

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
        // debugger
        this.Player1 = this.evaluateParameter(_X, 1, log, `${locname}: sets Player1`); /* ?+*/
        this.Player2 = this.evaluateParameter(_O, 2, log, `${locname}: sets Player2`); /* ?+*/
    }

    /** Game Initialsie [x] TOOD: FIXME: ISSUE #5
     * @name onInit
     * @kind function
     * @classdesc
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/03/24
     * @memberof Game
     */
    onInit(log = this.logLevel, locname = `${this.fileName}: onInit`) {
        if (!this.gameRunning) {
            this.gameRunning = true;
            if (this.gameRunning) {
                // 2: Assign the game's pieces to the current game players and set up a new board
                // debugger
                this.gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
                this.gameBoard = new GameBoard(); /* ?+*/
                // 3: Link the current board and current pieces to the game logic
                this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /* ?+*/
            }
        }
        // 4: Game is logging to the console at error level 9
        this.gameLogger(log, `${locname}: onInit`);
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
    checkMove(move, log = this.logLevel, locname = `${this.fileName}: checkMove()`) {
        this.deBug._debug(move, `${locname}: Cell Index`, log, locname);
        if (typeof move === "number") {
            return this.gameBoard.grid[move] === "" && this.gameRunning === true;
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
    updateGrid(move, locname = `${this.fileName}: updateGrid()`) {
        console.log(`${locname} : current Piece to current Move/grid cell`); /* ?+*/
        this.gameBoard.grid[move] = this.gamePieces.currentPiece;
        // this.gameBoard.currentCellMove(cell);
    }

    /** makeMove  [ ] TODO: FREEZE ISSUE 00_
     * @function makeMove
     * @kind function
     * @param {number} move The index of the move to make
     * @description Assigns the current piece to the move if it is valid and the game is not over.
     * If the game is over (i.e., there is a winner or a draw), it resets the game.
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 FREEZE @date 2023/03/22. See Changelog on this date.
     */
    makeMove(move, current, locname = `${this.fileName}: makeMove()`) {
        if (this.checkMove(move, `${locname} => checkMove()`)) {
            if (typeof move === "number") {
                // Assign the current piece to the move
                this.updateGrid(move, current);
                this.gameRunning = true;
                // check if the game is over (i.e., there is a winner or a draw)
                if (this.isGameOver(this.gameRunning, 1, locname)) {
                    // Reset the game
                    this.gameRunning = false;
                    this.resetGame(this.gameRunning);
                } else {
                    // Switch to the next turn
                    this.gameRunning = true;
                    this.nextTurn(this.gameRunning);
                }
            }
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
    nextTurn(turn, locname = `${this.filename}: nextTurn()`) {
        this.deBug._debug(this, `${locname}`, log, `${locname}`);
        if (turn) {
            this.gamePieces.currentSymbol =
                this.gamePieces.currentSymbol === this.Player1 ? this.Player2 : this.Player1;
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
            if (this.gameLogic.isAWin()) {
                this.deBug._debug(this.gameLogic.isAWin(), `${locname}: is in a Win state`, log, `${locname}: isAWin`);
            }
            if (this.gameLogic.isADraw()) {
                this.deBug._debug(
                    this.gameLogic.isADraw(),
                    `${locname}: is in a Draw state`,
                    log,
                    `${locname} isADraw`
                );
            }
            return this.gameLogic.isAWin() || this.gameLogic.isADraw();
        }
        return false;
    }
    /** resetGame: [ ] TODO: REFACTOR AND IMPROVE ISSUE 00_
     * @function resetGame
     * @kind function
     * @param {boolean} start
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @memberof Game
     * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new around.
     * [ ] TODO: @doing More fields, instances and objects to reset. @date 2023/03/16
     * [ ] TODO: Expand this logic for better user experience, MVP++, and improve the game flow/activity flow/ user journey
     * [ ] TODO Randomise the selection of the game symbol and remember the state of this first randon symbol.
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @version 0.3.0 REFACTOR @date 2023/03/22. See Changelog on this date.
     **/
    resetGame(start, locname = `${this.filename}: resetGame()`) {
        // This method is called when the game is re-started.
        if (!start) {
            // Reinistialises Players, GamePieces, GameBoard and re-sets the current piece to Player 1.
            debugger;
            console.log(`${locname}: Start is False: Reset Game members an properties`);
            this.Player1 = "."; /* ?+*/
            this.Player2 = "."; /* ?+*/
            this.gamePieces = new GamePieces(Player1, Player2); /* ?+*/
            this.gameBoard.resetCellMove();
            this.gameBoard = new GameBoard(); /* ?+*/
            this.gamePieces.currentSymbol = Player1; /* ?+*/
            this.gameRunning = true;
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

    /** gameLogger: [ ] TODO: TEMPORARY
     * @function gameLogger
     * @description Used to log or deBug the current class instance and method.
     * @usage Only to be used in class constructors currently for the nominal flow of the game/app.
     * @author @iPoetDev.githib.com
     * @param {number} log [level=] Default level is 0, the lowest level of logging,clears the console, but developer can toggle these as needed. @default 0 @see module:GameDebug for more information on levels.
     * @param {string} locname [locname="Game.js"]: Default is the filename. Location name of when the logger is called. Filename and method name in a template literal. @default this.fileName
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 TEMPORARY @date 2023/03/22. See Changelog on this date.
     */
    gameLogger(log = this.logLevel, locname = `${this.fileName}: gameLogger()`) {
        this.deBug._debug(this.gameBoard, `InstanceOf: A new Game Board ${this.gameBoard}`, log, locname); /*?+*/
        this.deBug._debug(
            this.gamePieces,
            `InstanceOf: A new set of Game Pieces ${this.gamePieces}`,
            log,
            locname
        ); /*?+*/
        this.deBug._debug(this.gameLogic, `InstanceOf: A new Game Logic ${this.gameLogic}`, log, locname); /*?+*/
        this.deBug._debug(
            this.Player1 && this.Player2,
            `InstanceOf: Players: 1: ${this.Player1}. Player 2: ${this.Player2}`,
            log,
            locname
        ); /*?+*/
    }
}

export { Game };
