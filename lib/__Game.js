// Import Class Modules
import GameBoard from "__GameBoard.js";
import GamePieces from "__GamePieces.js";
import GameLogic from "__GameLogic.js";
/**
 * @name Game
 * @description Game Controller class for the game of TicTacToe
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
    this.board = new GameBoard()
    this.pieces = new GamePieces()
    this.gameLogic = new GameLogic(this.board.gameState,this.pieces)
    this.Player1 = this.pieces.X
    this.Player2 = this.pieces.O
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
    if (this.board.gameState[move] === ''
      && !this.gameLogic.checkWin()) {
      // Assign current symbol  to the current move
      this.board.gameState[move] = this.pieces.currentSymbol
      // Check if gameLogic for win or draw, and if so, redraw the board
      if (this.gameLogic.checkWin() || this.gameLogic.checkDraw()) {
        // Expand the UI logic here.
        this.resetBoard()
      } else {
        // Expand the UI logic here.
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
    this.pieces.currentSymbol = this.pieces.currentSymbol === this.Player1 ? this.Player2 : this.Player1
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
    // New GameBoard: Clears the current board, and returns the board to intial blank state.
    this.board = new GameBoard()
    // Resets the board to this leading initial symbol, nominally the Cross, X as traditionally is the first player..
    this.pieces.currentSymbol = this.pieces.pieces[0]
  }
}
