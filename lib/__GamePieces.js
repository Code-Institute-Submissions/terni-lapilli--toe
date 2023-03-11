import {GameDebug} from '/lib/__GameDebug.js'

/**
 * @class @name GamePieces
 * @export @type {GamePieces}
 * @module exports
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/08
 */
export default class GamePieces {

  /**
   * @function @constructor @param _X, @param _Y
   * @summary Creates an instance of GamePieces.
   * @param {*} _X
   * @param {*} _Y
   * @memberof GamePieces
   */
  constructor( _X, _Y) {
    this.pieces= [ _X, _Y ]
    this.currentSymbol = this.pieces[0]
    this.X = this.pieces[0]
    this.Y = this.pieces[1]
    this.debug = new GameDebug()
  }
  /**
   * @name X
   * @function @get
   * @summary Getter for X symbol.
   * @memberof GamePieces
   */
  get X() {
    if (this.pieces.indexOf(this.pieces[0]) === 0) {
      return this.pieces[0]
    } else {
      this.debug._debug(this.pieces[0],`X Piece is not available ${this.pieces[0]}`,6)
      throw new Error(`X Piece is not available ${this.pieces[0]}`,{cause: this.pieces[0]})
    }
  }
  /**
 * @name Y
 * @function @get
 * @summary Getter for Y symbol.
 * @memberof GamePieces
 */
  get O() {
    if (this.pieces.indexOf(this.pieces[1]) === 1){
      return this.pieces[1]
    } else {
      this.debug._debug(this.pieces[1],`O Piece is not available ${this.pieces[1]}`,6)
      throw new Error(`O Piece is not available ${this.pieces[1]}`, {cause: this.pieces[1]} )
    }
  }
  /**
* @name X
* @function @set @param symbol
* @summary Setter for X symbol.
* @memberof GamePieces
*/
  set X(symbol) {
    if (symbol !== null && symbol !== undefined && symbol !== this.currentSymbol) {
      this.pieces[0] = symbol
      this.currentSymbol = symbol
    } else {
      this.debug._debug(symbol,`Setting a new symbol to ${this.X} as failed`, 6)
      throw new Error(`Setting a new symbol to ${this.X} as failed`, {cause: symbol} )
    }
  }
  /**
* @name Y
* @function @set @param symbol
* @summary Setter for Y symbol.
* @memberof GamePieces
*/
  set O(symbol) {
    if (symbol !== null && symbol !== undefined && symbol !== this.currentSymbol) {
      this.pieces[1] = symbol
      this.currentSymbol = symbol
    } else {
      this.debug._debug(symbol,`Setting a new symbol to ${this.O} as failed`,6)
      throw new Error(`Setting a new symbol to ${this.O} as failed`, {cause: symbol})
    }
  }
  /**
   * @name switchSymbols
   * @function switchSymbols
   * @summary Switches the symbols of the current symbol/game piece
   * @memberof GamePieces
   */
  switchSymbols() {
    switch (this.currentSymbol) {
      case this.X:
        this.currentSymbol = this.Y
        this.debug._debug(this.currentSymbol,`CurrentSymbol is ${this.currentSymbol}`,2)
        break;
      case this.Y:
        this.currentSymbol = this.X
        this.debug._debug(this.currentSymbol,`CurrentSymbol is ${this.currentSymbol}`,2)
        break
      default:
        this.debug._debug(this.currentSymbol,`CurrentSymbol is ${this.currentSymbol}`,9)
        throw new Error(`Symbol is not defined ${this.currentSymbol}. Switching symbol as failed`,{cause: this.currentSymbol})
    }
  }

}

export { GamePieces }