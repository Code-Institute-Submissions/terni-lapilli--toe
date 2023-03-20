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

/** GamePieces
 * @name GamePieces
 * @kind class
 * @classdesc Instance of the game current pieces. Game pieces to be placed on the game board
 * @export GamePieces
 * @usage Use for storing default peiecs or alternate pieces if user has a choice
 * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
 * @prop {string} Xpiece Piece/symbol of the first piece. Traditionally an X and is first piece played.
 * @prop {string} Opiece Piece/symbol of the second piece. Traditionally an O and is second piece played.
 * @prop {string} currentPiece Default piece for the first mover / turn.
 * @prop {GameDebug} debug Debugger/Console
 * @function getX() Retrieves this.XPiece
 * @function getO() Retrieves this.XPiece
 * @function setX(piece) @returns {string}
 * @function setO(piece) @returns {string}
 * @function checkAPiece(piece) @return {boolean} Boolean truthy check conditional for setting a Piece; or returns a falsey.
 * @function hasAPiece(piece,symbols,slot) @return {boolean} Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
 * @function evaluatePieces @returns {Array(string, string)} Evaluates the pieces for the game for @type {string} literal.
 */
class GamePieces {
  /** Class Props @todo FREEZE
  * @prop {GameDebug} debug Debugger/Console
  * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
  * @prop {string} Xpiece Piece/symbol of the first piece. Traditionally an X and is first piece played. @default O
  * @prop {string} Opiece Piece/symbol of the second piece. Traditionally an O and is second piece played. @default O
  * @prop {string} currentPiece Default piece for the first mover / turn. @default ''
  * @prop {string} fileName - FileName identifer for Error Handling @default GamePieces.js:
   */

  deBug = new GameDebug()
  pieces = []
  Xpiece = 'X'
  Opiece = 'O'
  currentPiece = ''
  fileName = 'GamePieces.js'

  /** constructor @todo FREEZE
  * Game model class (constructor) for storage and retrieval of pieces for the game of Tic Tac Toe
  * @name constructor
  * @kind function
  * @classdesc Creates an instance of GamePieces.
  * @usage Instanitated by @see module:GameLogic
  * @param {*} firstPiece: type of string @default X
  * @param {*} secondPiece: typeof string @default X
  * @constructs GamePieces
  * @type {GamePieces}
  * @memberof GamePieces
  * @date 2023/03/08
  * @date 2023/03/19
  * @note Refactored to employ internal helper functions instead of inline conditional and defensive code to improve readability, reduce code duplication and improve maintainability.
  * @note: This function was originally a @getter, now nominally is.
  * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
  */
  constructor(firstPiece = 'X', secondPiece = 'O') {
    // Assign default values to params if not passed in. For testing and default game state.
    // debugger;
    this.pieces = this.evaluatePieces(firstPiece, secondPiece, 1, 9, 'string')
    // debugger;
    this.Xpiece = this.setX(this.pieces[0])
    // debugger;
    this.Opiece = this.setO(this.pieces[1])
    // debugger;
    this.currentPiece = this.setX(this.pieces[0])
  }

  /** getX @todo CHECK
  * @function getX  nominally a getter
  * @kind function
  * @description Gets the X piece that is currently set, if it exists and n of the array
  * @usage External accessor to class, is used?
  * @returns {string} firstPiece - The X piece
  * @throws {Error} Else throws an error and attatches this debugger.
  * @memberof GamePieces
 * @note: This function was originally a @getter, now nominally is.
 * @date 2023/03/12
 * @date 2023/03/19
 * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
  */
  getX() {
    let locname = `${this.fileName}: getX()`
    try {
       const firstPiece = this.pieces[0]
        if (this.hasAPiece(firstPiece, this.pieces, 0))
        {
          this.deBug._debug(firstPiece, `${locname}retrieves X from ${this.pieces.toString()}`, 1, locname)
          return firstPiece
        }
    } catch (err) {
      const errmessage = `X Piece is not available ${firstPiece}`
      // Else throws an error.
      this.deBug._debug(firstPiece, errmessage, 9, locname)
      throw new Error(errmessage, {name: `${locname} Get X Error:`, stack: err} )
    }
  }

  /** getO @todo CHECK
 * @function getO getter, nominally
 * @kind function
 * @description Gets the O piece that is currently set, if set, and n+1 of array
 * @usage External accessor to class, is used?
 * @returns {string} secondPiece - The O piece
 * @throws {Error} Else throws an error and the logs to console, default: trace.
 * @memberof GamePieces
* @note: This function was originally a @getter, now nominally is.
 * @date 2023/03/12
 * @date 2023/03/19
 * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
 */
   getO() {
     let locname = `${this.fileName}: getO()`
     const log = 1
     const check = 5
    try {
      const secondPiece = this.pieces[1]
      if (this.hasAPiece(secondPiece, this.pieces, 1)) {
        this.deBug._debug(firstPiece, `${locname} retrieves O from ${this.pieces.toString()}`, log, locname)
        return secondPiece
      }
    } catch (err) {
      const errmessage = `O Piece is not available ${secondPiece}`
      // Else throws an error.
      this.deBug._debug(secondPiece, message, check, locname)
      throw new Error(errmessage, {name: `${locname} Get O Error:`, stack: err})
    }
  }

  /** setX @todo CHECK
  * @function setX nominally a setter
  * @kind function
  * @description Sets the X piece to the specified value. Else throws an error and attatches logs to console
  * @usage sets the X piece to the specified given value @constructor
  * @param {*} [piece] Must be provided @default X
  * Sets @prop {string} this.pieces[0] X piece for first piece
  * Sets @prop {string} this.currentPiece Updates the current piece
  * @throws {Error} Throws if piece is not set or not the current Piece.
  * @memberof GamePieces
  * @note: This function was originally a @setter, now nominally is.
  * @date 2023/03/12
  * @date 2023/03/19
  **@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
*/
  setX(piece = 'X') {
    const firstPiece = piece
    const log = 1
    const check = 9
    const locname = `${this.fileName}: setX()`
    /** Uses null coalescing, only proceeds if firstPiece is truthy, and is not the currentPiece  */
    try {
      if (this.checkAPiece(firstPiece, this.currentPiece)) {
        this.pieces[0] = firstPiece
        this.currentPiece = firstPiece
        this.deBug._debug(firstPiece, `${locname} sets X currently to ${currentPiece}`, log, locname)
      }
    } catch (err) {
      const errmessage = `Setting a new piece to the first piece: ${this.Xpiece} as failed, @param: ${piece}`
      this.deBug._debug(firstPiece, errmessage, check, `${locname}: firstPiece`)
      this.deBug._debug(currentPiece, errmessage, check, `${locname}: currentPiece`)
      throw new Error(errmessage,
        {name: `${locname}: Set X Error:`, stack: err})
    }
  }

  /** setO @todo CHECK
  * @function setO nominally a setter
  * @kind function
  * @description Sets the O piece to the specified value. Else throws an error and attatches debugger.
  * @param {*} piece
  * Set @prop {string} pieces[1] O piece for second piece
  * Set @prop {string} currentPiece Updates the current piece
  * @throws {Error} Throws if piece is not set or not the current Piece.
  * @memberof GamePieces
  * @note: This function was originally a @setter, now nominally is.
  * @date 2023/03/12
  * @date 2023/03/19
  * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
  */
  setO(piece = 'O') {
    let secondPiece = piece
    const log = 1
    const check = 9
    const locname = `${this.fileName}: setO()`
    if (this.checkAPiece(secondPiece, this.currentPiece)) {
      this.pieces[1] = secondPiece
      this.currentPiece = secondPiece
      this.deBug._debug(secondPiece, `${locname} sets O currently to ${currentPiece}`, log, locname)
    } else {
      const errmessage = `Setting a new piece to the second piece: ${this.Opiece} as failed. @param: ${piece}`
      this.deBug._debug(secondPiece, errmessage, check, `${locname}: secondPiece`)
      this.deBug._debug(currentPiece, errmessage, check, `${locname}: currentPiece`)
      throw new Error(errmessage,
        {name: `${locname}: Set O Error:`, stack: err})
    }
  }

  /** switchPieces @todo FREEZE Is in Use?
  * @function switchPieces
  * @kind function
  * @description Swaps the current piece for the next player's piece based on the current turn's game piece.
  * @usage Is this in use?
  * @property {string} this.X Class member & X piece
  * @property {string} O Class member & O piece
  * @property {string} currentPiece Updates the current piece
  * @throws {Error} Throws if piece is not set or not the current Piece.
  * @memberof GamePieces
  * @date 2023/03/19
  * @version 0.3.0  @freeze @date 2023/03/20. See Changelog on this date.
   */
  switchPieces(log = 1, check = 5, locname = `${this.fileName}: switchPieces()`) {
    // Function message strings.
    const message = `${locname}: Current Piece is ${this.currentPiece}. Old peice is`
    const errmessage = `${locname}: Piece is not defined ${this.currentPiece}. Swapping game piece failed`
    // Swap pieces
    switch (this.currentPiece) {
      case this.Xpiece:
        this.currentPiece = this.Opiece // Switch to O Piece
        // Log to console
        this.deBug._debug( this.currentPiece, `${message} : ${this.Xpiece}`, log, locname )
        break
      case this.Opiece:
        this.currentPiece = this.Xpiece // Switch to X Piece
        // Log to console
        this.deBug._debug( this.currentPiece, `${message} : ${this.Opiece}`, log, locname )
        break
      default:
        this.deBug._debug( this.currentPiece, errmessage, check, locname )
        throw new Error(errmessage, { name: `${locname}: Switch Symbol Error:` })
    }
  }

  /** checkAPiece @todo FREEZE
   * @function checkAPiece
   * @summary Boolean truthy check conditional for setting a Piece; or returns a falsey.
   * @param {*} piece
   * @param {*} current
   * @returns {Boolean} true or false
   * @useage this.checkAPiece(piece, current) is used to evaluate a piece for setting a game piece's content, on an @accessor with a @setter
   * @memberof GamePieces
  * @date 2023/03/19
  * @version 0.3.0  @freeze @date 2023/03/20. See Changelog on this date.
   */
  checkAPiece(piece, current, literaltype = 'string') {
    return (piece ?? false) && piece !== current && typeof piece === literaltype
  }

  /** hasAPiece @todo FREEZE
 * @function hasAPiece
 * @kind function
 * @returns {Boolean} true or false
 * @description Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
 * @param {*,string} piece - piece to check from the slot/index of the array/
 * @param {*,array} symbols - two member array of pieces in a two player/piece game
 * @param {*,number} slot - slot / index of the array
 * @usage this.hasAPiece(piece, symbol, element) is used to evaluate a piece for getting/retrieving  a game piece's content, on an @accessor with a @getter
 * @memberof GamePieces
 * @date 2023/03/19
 * @version 0.3.0  @freeze @date 2023/03/20. See Changelog on this date.
 */
  hasAPiece(piece, symbols, slot) {
    return (piece ?? false) && symbols[slot].includes(piece,slot)
  }

  /** evaluatePieces  @todo FREEZE
   * @function evaluatePieces
   * @kind function
   * @returns {Array} [symbol1, symbol2]
   * @description Evaluates the pieces for the game for @type {string} when params are passed into the constructr or throws an error. Logs in console if truthy if @type {string}
   * @param {*,string} symbol1
   * @param {*,string} symbol2
   * @param {number} [log] Switches which error is to be thrown. @default 0
   * @param {number} [checkl] Debug level for the error. @default 5 Trace level. @see module:GameDebug
   * @param {number} [type] Litteral typeof for Symbol type. @default string
   * @param {*} [locname] Location of the error. @default this.fileName
   * @throws {TypeError} Throws if piece not of type string literal
   * @memberof GamePieces
   * @date 2023/03/9
   * @date 2023/03/19
   * @version 0.3.0  @freeze @date 2023/03/20. See Changelog on this date.
   */
  evaluatePieces(symbol1, symbol2, log = 1, check = 5, type = 'string', locname = `${this.fileName}: evaluatePieces()`) {
    let literaltype = type
    let literalpart = `Litteral needed.Is not typeof: ${literaltype}`
    try {
      const message = `Evaluate Pieces: Returned Strings`
      if ( (symbol1 ?? false ) && ( symbol2 ?? false ) ) {
          if ( ( typeof symbol1 === literaltype ) && ( typeof symbol2 === literaltype )) {
            // Log to console if truthy if a type: string
            this.deBug._debug( [symbol1, symbol2], message, log, `${locname}` )
            return [symbol1, symbol2] // return Array of strings
          }
      }
    }  catch (err) {
      const errmessage = `${literalpart}. X: ${symbol1}, O: ${symbol2}`
      // Log to console if falsey
      this.deBug._debug((symbol1 || symbol2), errmessage, check, locname)
      // Throw a TypeError
      throw new TypeError(errmessage, {name: `${locname}: ${literalpart}`, stack: err })
    }
  }
}
export { GamePieces }