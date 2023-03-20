/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Logic view class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/19
  *@version 0.2.0
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameBoard } from "/lib/__GameBoard.js"
import { GamePieces } from "/lib/__GamePieces.js";
import { GameDebug } from '/lib/__GameDebug.js'

/**
 * @name GameLogic
 * @kind class
 * @classdesc Instance of the current Game logic model
 * @export {GameLogic}
 * @usage Used to check Win or Draw conditions of the game.
 * @summary Class for the logic/game flow for the running of the game's state.
 * @prop {GameBoard} currentBoard  of GameBoard for the current instance of the game
 * @prop {GamePieces} currentPieces Array [string, string] of GamePieces for the current instance of the game
 * @prop {string} currentPlayer: Holder of for the current piece in play for the current instance of the game.
 * @prop {string} aBLANK: Empty Cell. Literal string representation.
 * @prop {number[][]} winningCombinations: Retrieves the games winning moves & logic of the game to evaluate  the possible combinations of moves
 * @prop {GameDebug} debug Debugger/Console
 * @function  isAWin @return {boolean}
 * @description Game logic of the game to test for check for winning combinations.
 * @function isADraw @return  {boolean}
 * @description Game logic of the game to test for a draw when every cell is occupied
 * @function evaluateParameter @throws {Error} if @param param is null or undefined or @return {*} param to the class @property assigned
 * @function evaluateType @throws {TypeError} on exit if @param param is not @type {GameBoard} || @type {GamePieces}
 * @author @iPoetDev
 * @date 2022/03/08
 */
class GameLogic {
  /**
  * @prop {GameDebug} debug Debugger/Console
  * @prop {GameBoard} currentBoard  of GameBoard for the current instance of the game
  * @prop {GamePieces} currentPieces Array (strings, string) of GamePieces for the current instance of the game
  * @prop {string} currentPlayer: Holder of for the current piece in play for the current instance of the game.
  * @prop {string} aBLANK: Empty Cell. Literal string representation.
  * @prop {number[][]} winningCombinations: Retrieves the games winning moves & logic of the game to evaluate  the possible combinations of moves.
  */
  debug = new GameDebug();
  currentBoard = new GameBoard();
  currentPieces = new GamePieces('X','O');
  currentPlayer = ''
  aBLANK = '';
  winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ]

  /**
   * Game model class (constructor) for the logic conditions of the game of TicTacToe.
   * @name constructor
   * @description Creates an instance of GameLogic.
   * @param {*} board
   * @param {*} pieces
   * @constructor
   * @constructs GameLogic
   * @type {GameLogic}
   * @memberof GameLogic
   * @date 2023/03/19
   * @note Refactored to employ internal helper functions instead of inline conditional and defensive code to improve readability, reduce code duplication and improve maintainability.
   */
  constructor(board, pieces) {
    this.debug = new GameDebug()
    //Defensive checking with helper functions:
    // 1: Null | Undefined checking, else assign params
    this.currentBoard = this.evaluateParameter(board, 1)
    // debugger;
    // let xitem = pieces[0]
    // xitem.toString()
    this.currentPieces = this.evaluateParameter(pieces, 2)
    // 2: Type checking, and log to console.
    this.evaluateType(this.currentBoard,1)
    this.evaluateType(this.currentPieces,2)
    // 3: Null | Undefined checking, else assign current player's piece
    this.currentPlayer = this.evaluateParameter(this.currentPieces.currentPiece)
    /** @todo @note 4: Moved Blank and Comination class members to field properties, as (I think) these class members are not needed in every instance as they are internal use only, else move back to constructor */
    this.gameLogger(4, `GameLogic.js: Constructor`)
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
    * @inner
    * @description Inner function to checks if a cell is occupied and if all cells meet the winning combination.
    * @param {*} combination The winning combination parameter.
    * @returns {Boolean}
    * @memberof isAWin
    * @note Add a messaging class messages to the UI and User or @todo hosit this as a move to a higher / calling Class
    **/
    const isWinningCombo = combination => {
      /** @param {array} combination */
      const [a,b,c] = combination
      return this.board.grid[a] !== this.aBLANK
        && this.board.grid[a] === this.board.grid[b]
        && this.board.grid[b] === this.board.grid[c];
    }
    // Announces if the currentPlayer is the winner
    if (this.winningCombinations.some(isWinningCombo)) {
      this.debug._debug(this.winningCombinations,
        `Winning combination ${this.winningCombinations.some(isWinningCombo)}`,4, `GameLogic.js`)
      this.debug._debug(this.currentPlayer,`The winner is: ${this.currentPlayer}`,1)
      return true
    }
    // Return false by default.
    this.debug._debug(this.board,`Checks Win: This Game is in play and the current Player is ${this.currentPlayer}`,1 ,`GameLogic.js`)
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
    if (this.board.every(cell => cell !== this.aBLANK)) {
      this.debug._debug(this.board,`This Game is a Draw and the current Player is ${this.currentPlayer}`,1, `GameLogic.js`)
      return true
    }
    this.debug._debug(this.board,`Check Draw: This Game is in play and the current Player is ${this.currentPlayer}`,1,`GameLogic.js`)
    return false
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
      1: "GameBoard",
      2: "GamePieces",
      default: "GamePiece's Current Symbol"
    }
    // Checks if param is not null or undefined, and returns the parameter, else throws an Error.
    if (param ?? false) {
      return param
    } else {
      const paramName = paramNameMap[argIndex] || paramNameMap.default
      this.debug._debug(param, `GameLogic.js: Null | Undefined: ${paramName} ${param} is ${param ? "not set" : "required"}.`, 10, `GameLogic.js`)
      throw new Error(`GameLogic.js: ${paramName} ${param} is ${param ? "not set" : "required"}.`)
    }
  }
  /**
   * @function evaluateType
   * @description Checks for the correct parameter types, else exits on TypeError
   * @param {*} param Parmeter under evaluation
   * @param {number} [argIndex=0] Optional, switches between number of parameters
   * @throws {TypeError} If param is not of type GameBoard or GamePieces
   * @memberof GameLogic
   * @date 2023/03/19
   */
  evaluateType(param, argIndex = 0) {
    // Object: Key: Value map like Object
    const paramNameMap = {
      1: "GameBoard",
      2: "GamePieces",
      default: "Unkown Type Exception"
    }
    // Checks if param is not of type GameBoard and GamePieces, and throws a TypeError.
    if (!(param instanceof GameBoard) && !(param instanceof GamePieces)) {
      const paramName = paramNameMap[argIndex] || paramNameMap.default
      this.debug._debug(param, `GameLogic.js: Both Types: ${paramName} ${param} is not of type GameBoard and GamePieces.`, 10, `GameLogic.js`)
      throw new TypeError(`BOTH: GameLogic.js: Both Types: ${paramName} ${param} is not of type GameBoard and GamePieces.`);
    }
    // Checks if param is not of type GameBoard or GamePieces, and throws a TypeError.
    // if (!(param instanceof GameBoard) || !(param instanceof GamePieces)) {
    //   const paramName = paramNameMap[argIndex] || paramNameMap.default
    //   this.debug._debug(param, `GameLogic.js: Types: ${paramName} ${param} is not of type GameBoard or GamePieces.`, 10, `GameLogic.js`)
    //   throw new TypeError(`OR: GameLogic.js: Either one of Type: ${paramName} ${param} is not of type GameBoard or GamePieces.`);
    // }
  }
  /**
   * @function gameLogger
   * @description Used to log or debug the current class instance and method.
   * @usage Only to be used in class constructors currently for the nominal flow of the game/app.
   * @author @iPoetDev.githib.com
   * @param {number} Level [level=1] Default level is 1, the lowest level of logging, just informational, but developer can toggle these as needed. @default "1" @see module:GameDebug for more information on levels.
   * @param {string} Locname [locname="GameLogic.js"]: Default is the filename. Location name of when the logger is called. Filename and method name in a template literal. @default "GameLogic.js"
   * @date 2023/03/19
   * @memberof GameLogic
   * @note Adjust the message strings per class instance.
   */
  gameLogger(level = 1, locname = `GameLogic.js`) {
    this.debug._debug(this.currentBoard, `InstanceOf: Game's Current Board ${this.currentBoard}`, level, locname) /*?+*/
    this.debug._debug(this.currentPieces, `InstanceOf: Game's Current Pieces ${this.currentPieces}`, level, locname) /*?+*/
    this.debug._debug(this.currentPlayer, `InstanceOf: Game's Current Player's piecce ${this.currentPlayer}`, level, locname) /*?+*/
  }

}

export {GameLogic}