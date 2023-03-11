import { GameBoard } from "/lib/__GameBoard.js";
import { GamePieces } from "/lib/__GamePieces.js";
import { GameDebug } from '/lib/__GameDebug.js'

/**
 * @class GameLogic
 * @description Class for the logic/game flow for the running of the game's state.
 * @constructor (board: GameBoard, players: GamePlayers) {
 * @property board: Current GameBoard for the current instance of the game
 * @property pieces: Array (index: 2) of GamePieces for the current instance of the game
 * @property currentPlayer: Holder of for the current piece in play for the current instance of the game.
 * @property BLANK: Empty Cell. String representation.
 * @property winningCombinations: Retrieves the games winning moves. @readonly @static
 * @description Game logic of the game to evaluate  the possible combinations of moves
 * @function  isAWin() @return {boolean}
 * @description Game logic of the game to test for check for winning combinations.
 * @function isADraw @return  {boolean}
 * @description Game logic of the game to test for a draw when every cell is occupied
 * @param {GameBoard} _board - The game board to use for the game.
 * @param {GamePieces} _pieces - The game pieces to use for the game.
 * @throws {TypeError} If board or pieces are not of the correct type.
 * @throws {Error} If board or pieces are not passed in.
 * @author @iPoetDev
 * @date 2022/03/08
 */
export class GameLogic {
  constructor(_board,_pieces) {
    //Defensive checking
    if (!_board || !_pieces) {
      throw new Error(
        'board and pieces are required parameters.',
        {cause: (_board || _pieces)});
    }
    //Defensive checking
    // New Coding syntax: 2023-03-11: Type checking errors:
    //Why: Important in Classes,when Object / instances are used as parameters
    if (!(_board instanceof GameBoard) || !(_pieces instanceof GamePieces)) {
      throw new TypeError(
        'board and pieces must be of type GameBoard and GamePlayers, respectively.',
        {cause: (_board || _pieces)});
    }

    this.board = _board
    this.pieces = _pieces
    this.currentPlayer = this.pieces.currentSymbol
    this.BLANK = ''

    this.debug = new GameDebug()

    /**
     * @property {number array} winningCombinations
     * @memberof GameLogic
     * @readonly, @static
     * @description  this.winningCombinations is a double array {integers} representing the winning moves of tic tac toe
     */
    this.winningCombinations = [
      [0,1,2],[3,4,5],[6,7,8], //Rows
      [0,3,6],[1,4,7],[2,5,8], // Cols
      [0,4,8],[2,4,6]           // Diagonals
    ]
  }

  /**
   * @function isAWin
   * @memberof GameLogic
   * @description Function to check if the move is a Win, or not; and logs the winner in the console.
   * @returns {boolean}
   */
  isAWin() {
    /**
    * @function isWinningCombo
    * @memberof isAWin
    * @type {boolean} Boolean
    * @param {*} combination The winning combination parameter.
    * @description Inner function to checks if a cell is occupied and if all cells meet the winning combination.
    * @returns The winning combination state
    * @todo Add a messaging class messages to the UI and User or @todo hosit this as a move to a higher / calling Class
    **/
    const isWinningCombo = combination => {
      //  {array: integers} combination
      const [a,b,c] = combination
      return this.board[a] !== this.BLANK
        && this.board[a] === this.board[b]
        && this.board[b] === this.board[c];
    } //EndofInternalFunction
    // Evals if some of any combination are true when met from the winning combination array
    // Announces if the currentPlayer is the winner
    if (this.winningCombinations.some(isWinningCombo)) {
      this.debug._debug(this.winningCombinations,
        `Winning combination ${this.winningCombinations.some(isWinningCombo)}`,4)
      this.debug._debug(this.currentPlayer,`The winner is: ${this.currentPlayer}`,1)
      return true
    }
    // Return false by default.
    this.debug._debug(this.board,`Checks Win: This Game is in play and the current Player is ${this.currentPlayer}`,1)
    return false
  }

/**
 * @function isADraw
 * @memberof GameLogic
 * @description Checks every cell in the board array if all cells are all full, if true, and logs a draw in the console.
 * @description If check is not true, returns false and logs current game state and who the current player is.
 * @returns {boolean}
 **/
  isADraw() {
    if (this.board.every(cell => cell !== this.BLANK)) {
      this.debug._debug(this.board,`This Game is a Draw and the current Player is ${this.currentPlayer}`,1)
      return true
    }
    this.debug._debug(this.board,`Check Draw: This Game is in play and the current Player is ${this.currentPlayer}`,1)
    return false
  }

}
 export { GameLogic }