// Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
import {GameBoard} from "/lib/__GameBoard.js";
import {GamePieces} from "/lib/__GamePieces.js";
import {GameLogic} from "/lib/__GameLogic.js";
/**
 * @name Game
 * @summary Game Controller class for the game of TicTacToe
 * @class, @export
 * @property {GameBoard} this.board Game's board and conditions of play for a starting game board or for reseting the board.
 * @property {GamePieces} this.pieces Players' pieces for the game play.
 * @todo: Optionally use this interface to assign symbols to the players, by user input for customisation
 * @property {GameLogic} this.gameLogic  Checks for winning or draw moves against possible combinations.
 * @property {string} Player1's symbol, nominally Ex, X., or a Cross
 * @property {string} Player2's symbol, nominally Zero, O, or a Nought
 * @function makeMove(move)
 * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
 * @function nextTurn
 * @description Assigns the next turn and changes the symbol according to the players turn.
 * @function resetBoard
 * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new game round.
 * @author @iPoetDev.github.com
 * @date 2023/03/08
 */
export class Game {
  constructor() {
    this.gameBoards = new GameBoard()
    this.gamePieces = new GamePieces()
    this.gameLogic = new GameLogic(this.gameBoard.board,this.gamePieces)
    this.Player1 = this.gamePieces.X
    this.Player2 = this.gamePieces.O
    this.gameStart = true
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
  makeMove(move) {
    if (this.gameBoard.board[move] === ''
      && !this.gameLogic.checkWin()) {
      // Assign current symbol  to the current move
      this.gameBoard.board[move] = this.gamePieces.currentSymbol
      // Check if gameLogic for win or draw, and if so, redraw the board
      if (this.gameLogic.isWin() || this.gameLogic.isDraw()) {
        // Expand the UI logic here.
        this.gameStart = false
        this.resetBoard()
      } else {
        // Expand the UI logic here.
        this.gameStart === true
        this.nextTurn()
      }
    }
  }

  /**
  * @function nextTurn
  * @type {void}
  * @memberof Game
  * @description Assigns the next turn and changes the symbol according to the players turn.
  **/
  nextTurn() {
    this.gamePieces.currentSymbol = this.gamePieces.currentSymbol === this.Player1 ? this.Player2 : this.Player1
  }


  /**
  * @function resetBoard
  * @type {void}
  * @memberof Game
  * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new around.
  * @todo: Expand this logic for better user experience, MVP++, and improve the game flow/activity flow/ user journey
  * @todo Randomise the selection of the game symbol and remember the state of this first randon symbol.
  **/
  resetBoard() {

    if (!this.gameStart) {
      // New GameBoard: Clears the current board, and returns the board to intial blank state.
      this.gameBoard = new GameBoard()
      // Resets the board to this leading initial symbol, nominally the Cross, X as traditionally is the first player..
      this.gamePieces.currentSymbol = this.gamePieces.pieces[0]
    }
  }
}
