/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/18
 * @version 0.2.0
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 */
import {GameDebug} from '/lib/__GameDebug.js'

/**
 * @name GamePieces
 * @summary Instance if the game current pieces.
 * @class GamePieces
 * @module GamePieces
 * @export {GamePieces}
 * @usage Use for storing default peiecs or alternate pieces if user has a choice
 * @description Game pieces to be placed on the game board
 * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
 * @prop {string} X Piece/symbol of the first piece. Traditionally an X and is first piece played.
 * @prop {string} O Piece/symbol of the second piece. Traditionally an O and is second piece played.
 * @prop {string} currentPiece Default piece for the first mover / turn.
 * @prop {GameDebug} debug Debugger/Console
 * @function checkAPiece(piece) @return {boolean}
 * @description Boolean truthy check conditional for setting a Piece; or returns a falsey.
 * @function hasAPiece(piece,symbols,slot) @return {boolean}
 * @description Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
 *  @function evaluatePieces @returns {Array(string, string)}
 * @description Evaluates the pieces for the game for @type {string} when params are passed into the constructr or throws an error. Logs in console if truthy if @type {string}
 */
class GamePieces {
  /**
  * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
  * @prop {string} X Piece/symbol of the first piece. Traditionally an X and is first piece played.
  * @prop {string} O Piece/symbol of the second piece. Traditionally an O and is second piece played.
  * @prop {string} currentPiece Default piece for the first mover / turn.
  * @prop {GameDebug} debug Debugger/Console
   */

  pieces = []
  Xpiece = 'X'
  Opiece = 'O'
  currentPiece = ''
  static debug = new GameDebug()

  /**
  * @name constructor
  * @summary Creates an instance of GamePieces.
  * @param {*} firstPiece: type of string
  * @param {*} secondPiece: typeof string
  * @constructor
  * @constructs GamePieces
  * @instance
  * @memberof GamePieces
  */


  constructor(firstPiece = 'X', secondPiece = 'O') {
    // Assign default values to params if not passed in. For testing and default game state.
    debugger;
    this.pieces = this.evaluatePieces(firstPiece, secondPiece)
    debugger;
    this.Xpiece = this.X(this.pieces[0])
    debugger;
    this.Opiece = this.O(this.pieces[1])
    debugger;
    this.currentPiece = this.pieces[0]
  }

  /**
  * @function X getter @get
  * @description Gets the X piece that is currently set, if it exists and is 1st element of pieces array
  * @function
  * @returns {string} The X piece as the first piece
  * @error Else throws an error and attatches this debugger.
  * @memberof GamePieces
  */
  get X() {
    /**
    *  Checks if firstPiece is truthy, and is included as the first element of the pieces array, to return the first piece
     * @returns {string) firstPiece
     */
    const firstPiece = this.pieces[0]
    const errmessage = `X Piece is not available ${firstPiece}`
    if (this.hasAPiece(firstPiece, this.pieces, 0)) {
        return firstPiece
    } else {
      // Else throws an error.
      this.debug._debug(firstPiece, errmessage, 6, `GamePieces.js`)
      throw new Error(message,
        {name: `Get X Error: ${errmessage}`, stack: firstPiece, cause: firstPiece})
    }
  }

  /**
 * @function O getter @get
 * @description Gets the O piece that is currently set.
 * @returns {string} pieces[1] - The O piece
 * @error Else throws an error and the attatches debugger.
 * @memberof GamePieces
 */
  get O() {
    /**Checks if secondPiece is truthy, and is included as the second element of the pieces array.
    * @returns {string) secondPiece
     */
    const secondPiece = this.pieces[1]
    const errmessage = `O Piece is not available ${secondPiece}`
    if (this.hasAPiece(secondPiece, this.pieces, 1)) {
        return secondPiece
    } else {
      // Else throws an error.
      this.debug._debug(secondPiece, message, 6)
      throw new Error(errmessage,
        {name: `Get O Error: ${errmessage}`, stack: secondPiece, cause: secondPiece})
    }
  }

  /**
* @function X(_piece) setter @set
* @description Sets the X piece to the specified value. Else throws an error and attatches debugger.
* @param {*} piece
* @prop {string} this.pieces[0] X piece for first piece
* @prop {string} this.currentPiece Updates the current piece
* @throws {Error} Throws if piece is not set or not the current Piece.
* @memberof GamePieces
*/
  set X(piece) {
    const firstPiece = piece
    const errmessage = `Setting a new piece to the first piece: ${this.X} as failed`
    /** Uses null coalescing, only proceeds if firstPiece is truthy, and is not the currentPiece  */
    if (this.checkAPiece(firstPiece, this.currentPiece)) {
      this.pieces[0] = firstPiece
      this.currentPiece = firstPiece
    } else {
      this.debug._debug(firstPiece, errmessage, 6)
      throw new Error(message,
        {name: `Set X Error: ${errmessage}`, stack: firstPiece, cause: firstPiece})
    }
  }

  /**
* @function O setter @set
* @description Sets the O piece to the specified value. Else throws an error and attatches debugger.
* @param {*} piece
* @property {string} pieces[1] O piece for second piece
* @property {string} currentPiece Updates the current piece
* @throws {Error} Throws if piece is not set or not the current Piece.
* @memberof GamePieces
*/
  set O(piece) {
    const secondPiece = piece
    const errmessage = `Setting a new piece to the second piece: ${this.O} as failed`
    if (this.checkAPiece(secondPiece, this.currentPiece)) {
      this.pieces[1] = secondPiece
      this.currentPiece = secondPiece
    } else {
      this.debug._debug(secondPiece, errmessage, 6)
      throw new Error(errmessage,
        {name: `Set O Error: ${errmessage}`,  stack: secondPiece, cause: secondPiece})
    }
  }

  /**
  * @name switchPieces
  * @function switchPieces
  * @summary Switches the pieces of the current symbol/game piece for the current turn/player
  * @description Swaps the current piece for the next player's piece based on the current turn's game piece.
  * @property {string} this.X Class member & X piece
  * @property {string} O Class member & O piece
  * @property {string} currentPiece Updates the current piece
  * @throws {Error} Throws if piece is not set or not the current Piece.
  * @memberof GamePieces
   */
  switchPieces() {
    // Function message strings.
    const message = `GamePieces: Current Piece is ${this.currentPiece}`
    const errmessage = `GamePieces: Piece is not defined ${this.currentPiece}. Swapping game piece failed`
    // Swap pieces
    switch (this.currentPiece) {
      case this.Xpiece:
        this.currentPiece = this.Opiece
        this.debug._debug(this.currentPiece, `${message}: Old peice is ${this.Xpiece}`, 2)
        break
      case this.Opiece:
        this.currentPiece = this.Xpiece
        this.debug._debug(this.currentPiece, `${message}: Old peice is ${this.Opiece}`, 2, `GamePieces.js`)
        break
      default:
        this.debug._debug(this.currentPiece, message, 1, `GamePieces.js`)
        this.debug._debug(this.currentPiece, errmessage, 9, `GamePieces.js`)
        throw new Error(errmessage,
          {
            name: `Switch Symbol Error: ${message}`,
            stack: this.currentPiece,
            cause: this.currentPiece
          })
    }
  }

  /**
   * @function checkAPiece
   * @summary Boolean truthy check conditional for setting a Piece; or returns a falsey.
   * @param {*} piece
   * @param {*} current
   * @returns {Boolean} true or false
   * @useage this.checkAPiece(piece, current) is used to evaluate a piece for setting a game piece's content, on an @accessor with a @setter
   * @memberof GamePieces
   */
  checkAPiece(piece, current) {
    return (piece ?? false) && piece !== current && typeof piece === 'string'
  }

  /**
 * @function hasAPiece
 * @summary Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
 * @param {*} piece - piece to check from the slot/index of the array/
 * @param {*} symbols - two member array of pieces in a two player/piece game
 * @param {*} slot - slot / index of the array
 * @returns {Boolean} true or false
 * @usage this.hasAPiece(piece, symbol, element) is used to evaluate a piece for getting/retrieving  a game piece's content, on an @accessor with a @getter
 * @memberof GamePieces
 */
  hasAPiece(piece, symbols, slot) {
    return piece && symbols[slot].includes(piece,slot)
  }

  /**
   * @function evaluatePieces
   * @summary Evaluates the pieces for the game for @type {string} when params are passed into the constructr or throws an error. Logs in console if truthy if @type {string}
   * @param {*} symbol1
   * @param {*} symbol2
   * @returns {Array} [symbol1, symbol2]
   * @throw Throws if piece is not set or not the current Piece.
   * @memberof GamePieces

   */
  evaluatePieces(symbol1, symbol2) {
    /** @type {string}  symbol1, symbol2 */
    if (typeof symbol1 === 'string' && typeof symbol2 === 'string') {
      // Log to console if truthy if a type: string and return string array
      this.debug._debug([symbol1, symbol2], `Evaluate Pieces: Returned Strings`, 1, `GamePieces.js`)
      return [symbol1, symbol2]
    } else {
      //Error and Log issue to console if falsey otherwise
      const errmessage = `Evaluate Pieces: X or O Piece is not a string. X: ${symbol1}, O: ${symbol2}`
      this.debug._debug((symbol1 || symbol2), errmessage, 9, `GamePieces.js`)
      throw new TypeError((symbol1 || symbol2), {
        name: `${errmessage}`,
        stack: (symbol1 || symbol2),
        cause: (symbol1 || symbol2),
      })
    }
  }
}
export { GamePieces }