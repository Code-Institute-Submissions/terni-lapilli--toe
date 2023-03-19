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
  * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameBoard } from "/lib/__GameBoard.js"
import { GamePieces } from "/lib/__GamePieces.js"
import { GameLogic } from "/lib/__GameLogic.js"
import { GameDebug } from "/lib/__GameDebug.js"

/**
 * @name Game
 * @kind class
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
 * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
 * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
 * @todo  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
 * @prop {GamePieces} gamePieces Players' pieces for the game play.
 * @todo: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
 * @prop {GameLogic} gameLogic  Checks for winning or draw moves against possible combinations.
 * @todo Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
 * @prop {GameDebug}  debug Checks for draw moves against is all squares are filled
 * @function makeMove(move)
 * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
 * @function nextTurn
 * @description Assigns the next turn and changes the symbol according to the players turn.
 * @function resetBoard
 * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new game round. @since @date 2033/03/16  @version 0.2.0

 */
class Game {
    /**
    * @prop {GameDebug} debug Debugger/Console
    * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
    * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
    * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
    * @todo  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
    * @prop {GamePieces} gamePieces Players' pieces for the game play.
    * @todo: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
    * @prop {GameLogic} gameLogic  Checks for winning or draw moves against possible combinations.
    * @todo Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
     */
    Player1 = ''; /*?+*/
    Player2 = ''; /*?+*/
    gamePieces = new GamePieces(this.Player1, this.Player2); /*?+*/
    gameBoard = new GameBoard(); /*?+*/
    gameLogic = new GameLogic(); /*?+*/
    gameRunning = false;
    debug = new GameDebug(); /*?+*/

    /**
    * Game controller class (constructor) for the game of TicTacToe
    * @name constructor
    * @kind function
    * @classdesc Instantiated the Game class with the players' pieces, and the game's board, pieces, and logic. Then enables the game's state.
    * @param {String} _X, Player1's symbol, nominally Ex, X., or a Cross, Can be assigned new string type of piece/representation for the game. Optionally defaults to X. @default 'X'
    * @param {String} _O, Player2's symbol, nominally Zero, O, or a Nought. Can be assigned new string type of piece/representation for the game. Optionally defaults to O. @default 'O'
    * @constructor
    * @constructs Game
    * @type {Game}
    * @memberof Game
    * @note Refactored to employ internal helper function instead of inline conditional and defensive code to improve readability, reduce code duplication and improve maintainability.
    */
    constructor(_X = 'X', _O = 'O') {
        this.debug = new GameDebug() /*?+*/
        debugger
        // 1. Check the params and assign to current Players, else rely on default game pieces of Tic Tac Toe
        this.Player1 = this.evaluateParameter(_X,1) /*?+*/
        this.Player2 = this.evaluateParameter(_O,2) /*?+*/
        // 2: Assign the game's pieces to the current game pieces ans set up the new board
        this.gamePieces = new GamePieces(this.Player1, this.Player2) /*?+*/
        this.gameBoard = new GameBoard() /*?+*/
        // 3: Link the current board and current pieces to the game logic
        this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces) /*?+*/
        this.gameRunning = true
        // 4: Game is logging to the console at error level 9
        this.gameLogger(9, `Game.js: Constructor`)
    }

    /**
    * @function checkMove
    * @kind function
    * @description Checks if the move is valid and the game is not over.
    * @param {number} move The index of the move to make
    * @returns {boolean} Whether the move is valid and the game is not over
    * @memberof Game
    */
    checkMove(move) {
        return this.gameBoard.grid[move] === '' && this.gameRunning === true
    }

    /**
    * @function updateGrid
    * @kind function
    * @description Assigns the current piece to the move.
    * @param {number} move The index of the move to make
    * @memberof Game
    */
    updateGrid(move) {
        this.gameBoard.grid[move] = this.gamePieces.currentPiece
    }

    /**
     * @function isGameOver
     * @kind function
     * @description Truth for if the game is Over (i.e. isAWin or isADraw).
     * @return {boolean}
     * @memberof Game
     **/
    isGameOver() {
        return this.gameLogic.isAWin() || this.gameLogic.isADraw()
    }

    /**
    * @function makeMove
    * @kind function
    * @param {number} move The index of the move to make
    * @description Assigns the current piece to the move if it is valid and the game is not over.
    * If the game is over (i.e., there is a winner or a draw), it resets the game.
    * @memberof Game
    */
    makeMove(move) {
        // Check if the move is valid and the game is not over
        if (this.checkMove(move)) {
            // Assign the current piece to the move
            this.updateGrid(move);
            this.gameRunning = true
            // Check if the game is over (i.e., there is a winner or a draw)
            if (this.isGameOver()) {
                // Reset the game
                this.gameRunning = false
                this.resetGame(this.gameRunning);
            } else {
                // Switch to the next turn
                this.nextTurn();
                this.gameRunning = true
            }
        }
    }

    /**
     * @function nextTurn
     * @kind function
     * @description Assigns the next turn and changes the symbol according to the players turn.
     * @memberof Game
     **/
    nextTurn() {
        this.gamePieces.currentSymbol = this.gamePieces.currentSymbol === this.Player1 ? this.Player2 : this.Player1
    }

    /**
     * @function resetGame
     * @kind function
     * @param {boolean} start
     * @memberof Game
     * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new around.
     * @todo: @doing More fields, instances and objects to reset. @date 2023/03/16
     * @todo: Expand this logic for better user experience, MVP++, and improve the game flow/activity flow/ user journey
     * @todo Randomise the selection of the game symbol and remember the state of this first randon symbol.
     **/
    resetGame(start) {
        // This method is called when the game is re-started.
        if (!start) {
            // Reinistialises Players, GamePieces, GameBoard and re-sets the current piece to Player 1.
            debugger
            this.Player1 = 'X' /*?+*/
            this.Player2 = 'O' /*?+*/
            this.gamePieces = new GamePieces(Player1, Player2) /*?+*/
            this.gameBoard = new GameBoard() /*?+*/
            this.gamePieces.currentSymbol = Player1 /*?+*/
            this.gameRunning = true
        }
    }

    /**
     * @function evaluateParameter
     * @description Checks for presnce of parameter value and returns it, else exits on null or undefined.
     * @param {*} param Parmeter under evaluation
     * @param {number} [argIndex=0] Optional, switches between number of parameters
     * @returns {*} The parameter
     * @throws {Error} If param is null or undefined.
     * @memberof GameLogic
     * @date 2023/03/19
     */
    evaluateParameter(param, argIndex = 0) {
        // Object: Key: Value map like Object
        const paramNameMap = {
            1: "Player 1's Piece",
            2: "Player 2's Piece",
            default: "Current Player have no current piece"
        }
        // Checks if param is not null or undefined, using Nullish coalesing operator, and returns the parameter, else throws an Error.
        if (param ?? false) {
            if (typeof param === "string") {
                return param
            }
        } else {
            const paramName = paramNameMap[argIndex] || paramNameMap.default
            this.debug._debug(param, `Game.js: Null | Undefined: ${paramName} ${param} is ${param ? "not set" : "is a required typeof: string"}.`, 10, `Game.js`)
            throw new Error(`Game.js: ${paramName} ${param} is ${param ? "not set" : "is a required typeof: string"}.`)
        }
    }

    /**
    * @function gameLogger
    * @description Used to log or debug the current class instance and method.
    * @usage Only to be used in class constructors currently for the nominal flow of the game/app.
    * @author @iPoetDev.githib.com
    * @param {number} level [level=1] Default level is 1, the lowest level of logging, just informational, but developer can toggle these as needed. @default "1" @see module:GameDebug for more information on levels.
    * @param {string} locname [locname="Game.js"]: Default is the filename. Location name of when the logger is called. Filename and method name in a template literal. @default "Game.js"
    * @date 2023/03/19
    * @memberof Game
    * @note Adjust the message strings per class instance.
    */
    gameLogger(level = 1, locname = `Game.js`) {
        this.debug._debug(this.gameBoard, `InstanceOf: A ew Game Board ${this.gameBoard}`, level, locname) /*?+*/
        this.debug._debug(this.gamePieces, `InstanceOf: A new set of Game Pieces ${this.gamePieces}`, level, locname) /*?+*/
        this.debug._debug(this.gameLogic, `InstanceOf: A new Game Logic ${this.gameLogic}`, level, locname) /*?+*/
        this.debug._debug((this.Player1 && this.Player2), `InstanceOf: Players: 1: ${this.Player1}. Player 2: ${this.Player2}`, level, locname) /*?+*/
     }

}

export {Game}
