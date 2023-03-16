/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/16
  *@version 0.2.0
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GameLogic } from "GameLogic.js"; @see module:GameLogic
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameBoard } from "/lib/__GameBoard.js";
import { GamePieces } from "/lib/__GamePieces.js";
import { GameLogic } from "/lib/__GameLogic.js";
import { GameDebug } from "/lib/__GameDebug.js";

/**
 * @name Game
 * @kind class
 * @class,
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @property {String} Player1's symbol, nominally Ex, X., or a Cross
 * @property {String} Player2's symbol, nominally Zero, O, or a Nought
 * @property {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
 * @todo  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
 * @property {GamePieces} gamePieces Players' pieces for the game play.
 * @todo: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
 * @property {GameLogic} gameLogic  Checks for winning or draw moves against possible combinations.
 * @todo Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
 * @property {GameDebug}  debug Checks for draw moves against is all squares are filled
 * @function makeMove(move)
 * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
 * @function nextTurn
 * @description Assigns the next turn and changes the symbol according to the players turn.
 * @function resetBoard
 * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new game round. @since @date 2033/03/16  @version 0.2.0

 */
class Game {
    Player1 = new String(''); /*?+*/
    Player2 = new String(''); /*?+*/
    gamePiece = new GamePieces(Player1, Player2); /*?+*/
    gameBoard = new GameBoard(); /*?+*/
    gameLogic = new GameLogic(); /*?+*/
    isStart = true;
    gameRunning = false;
    debug = new GameDebug(); /*?+*/

    /**
    * @name Game
    * @summary Game controller class constructor for the game of TicTacToe
    * @description Instantiated the Game class with the players' pieces, and the game's board, pieces, and logic. Then enables the game's state.
    * @param _X
    * @param _O
    * @constructor
    * @constructs Game
    * @instance
    * @memberof Game
    */
    constructor(_X, _O) {
        debugger;
        this.Player1 = _X; /*?+*/
        this.Player2 = _O; /*?+*/

        this.gamePieces = new GamePieces(this.Player1, this.Player2); /*?+*/
        this.gameBoard = new GameBoard(); /*?+*/
        this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /*?+*/

        this.debug = new GameDebug() /*?+*/
        // Game Start is true
        this.gameStart = isStart

        debug._debug(gameBoard, `Class: Full Stack: ${this.gameBoard}`, 9, "Game.js"); /*?+*/
        debug._debug(gamePieces, `Class: Full Stack: ${gamePieces}`, 9, "Game.js"); /*?+*/
        debug._debug(gameLogic, `Class Full Stack: ${gameLogic}`, 9, "Game.js"); /*?+*/
        debug._debug(gameLogic, `Class: Players: 1: ${Player1}. 2: ${Player2}`, 9, "Game.js"); /*?+*/

        this.debug._debug(this.gameBoard, `InstanceOf: Full Stack: ${this.gameBoard}`, 9, "Game.js"); /*?+*/
        this.debug._debug(this.gamePieces, `InstanceOf: Full Stack: ${this.gamePieces}`, 9, "Game.js"); /*?+*/
        this.debug._debug(this.gameLogic, `InstanceOf: Full Stack: ${this.gameLogic}`, 9, "Game.js"); /*?+*/
        this.debug._debug(_X || _O, `InstanceOf: Players: 1: ${this.Player1}. 2: ${this.Player2}`, 9, "Game.js"); /*?+*/
    }

    /**
     * @todo For the terminal states of game (Win || Draw): Either reset the board or do more on the UI
     **/
    /**
     * @function makeMove
     * @memberof Game
     * @param {*} move
     * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
     */
  /**
  * @param move
  */
  makeMove(move) {
      let isRunning = this.gameStart
        // Check if gameLogic for win draw or win draw
        if (this.gameBoard.surface[move] === '' && !this.gameLogic.checkWin()) {
            // Assign current symbol  to the current move
            this.gameBoard.surface[move] = this.gamePieces.currentSymbol;
            // Check if gameLogic for win or draw, and if so, redraw the board
            // This method is called by the game logic.
            if (this.gameLogic.isAWin() || this.gameLogic.isADraw()) {
                // Expand the UI logic here.
                isRunning = false;
                this.resetGame(isRunning);
                this.gameStart = isRunning
                isStart = isRunning
            } else {
                // Expand the UI logic here.
                isRunning = true;
                this.nextTurn(isRunning);
                this.gameStart = isRunning
                isStart = isRunning
            }
        }
    }

    /**
     * @function nextTurn
     * @type {void}
     * @memberof Game
     * @description Assigns the next turn and changes the symbol according to the players turn.
     **/
    /**
    * / / object / string. This is a bit complex. We need to be able to pass a string to the object
    */
    nextTurn() {
        this.gamePieces.currentSymbol = this.gamePieces.currentSymbol === this.Player1 ? this.Player2 : this.Player1;
    }

    /**
     * @function resetGame
     * @public
     * @return {void}
     * @param {Boolean} start
     * @memberof Game
     * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new around.
     * @todo: @doing More fields, instances and objects to reset. @date 2023/03/16
     * @todo: Expand this logic for better user experience, MVP++, and improve the game flow/activity flow/ user journey
     * @todo Randomise the selection of the game symbol and remember the state of this first randon symbol.
     **/
    resetGame(start) {
        // This method is called when the game is re-started.
        if (!start) {
            // Reinistialises Players, GamePieces, GameBoard and re-sets the current symbol to Player 1.
            debugger;
            this.Player1 = new String(''); /*?+*/
            this.Player2 = new String(''); /*?+*/
            this.gamePieces = new GamePieces(Player1, Player2); /*?+*/
            this.gameBoard = new GameBoard() /*?+*/
            this.gamePieces.currentSymbol = Player1 /*?+*/
        }
    }
}

export { Game };
