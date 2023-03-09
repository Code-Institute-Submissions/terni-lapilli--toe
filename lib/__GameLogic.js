

/**
 * @class GameLogic
 * @description Class for the logic/game flow for the running of the game's state.
 * @constructor (board: GameBoard, players: GamePlayers) {
 * @property GameLogic.winningCombinations: Retrieves the games winning moves. No setter.
 * @description Game logic of the game to evaluate  the possible combinations of moves
 * @function  checkWin() @return {boolean}
 * @description Game logic of the game to test for check for winning combinations.
 * @function checkDraw @return  {boolean}
 * @description Game logic of the game to test for a draw when every cell is occupied
 * @author @iPoetDev.githib.com
 * @date 2023/03/08
 */
export class GameLogic {
  constructor(board,pieces) {
    this.board = board
    this.pieces = pieces
    this.currentPlayer = pieces.currentSymbol
    this.BLANK = ''
  }

  /**
   * @property {number array} winningCombinations
   * @memberof GameLogic
   * @readonly, @static
   * @description  GameLogic.winningCombinations is a double array of integers representing the winning moves for the game of tic tac toe
   */
  static get winningCombinations() {
    const possibleCombinations = [
      [0,1,2],[3,4,5],[6,7,8], //Rows
      [0,3,6],[1,4,7],[2,5,8], // Cols
      [0,4,8],[2,4,6]           // Diagonals
    ];
      return possibleCombinations
  }

  /**
   * @function checkWindow
   * @memberof GameLogic
   * @description Function to check if the move is a Win, or not; and logs the winner
   * @returns {boolean}
   */
  isWin() {
    /**
    * @function isWinningCombination
    * @type {boolean} Boolean
    * @param {*} combination The winning combination parameter.
    * @description Inner function to checks if a cell is occupied and if all cells meet the winning combination.
    * @returns The winning combination state
    * @todo Add a messaging class messages to the UI and User
    **/
    const isWinningCombination = combination => {
      //  {array: integers} combination
      const [a,b,c] = combination
      return this.board[a] !== this.BLANK
        && this.board[a] === this.board[b]
        && this.board[b] === this.board[c];
    }

    // Evals if some of any combination are true when met from the winning combination array
    // Announces if the currentPlayer is the winner
    if (winningCombinations.some(isWinningCombination)) {
      console.log(`${this.currentPlayer} wins!`)
      return true
    }

    // Return false by default.
    return false
  }

/**
 * @function checkDraw
 * @type {boolean} Boolean
 * @param void
 * @description Checks every cell in the board array if all cells are all full.
 **/
  isDraw() {
    if (this.board.every(cell => cell !== '')) {
      console.log(`Game is a draw.`)
      return true
    }
    return false
  }

}