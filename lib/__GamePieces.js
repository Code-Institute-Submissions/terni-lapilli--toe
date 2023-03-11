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
  constructor( _X, _Y) {
    this.pieces= [ _X, _Y ]
    this.currentSymbol = this.pieces[0]
    this.X = this.pieces[0]
    this.Y = this.pieces[1]
    this.debug = new GameDebug()
  }

  get X() {
    if (this.pieces.indexOf(this.pieces[0]) === 0) {
      return this.pieces[0]
    } else {
      this.debug._debug(this.pieces[0],`X Piece is not available ${this.pieces[0]}`,6)
      throw new Error(`X Piece is not available ${this.pieces[0]}`,{cause: this.pieces[0]})
    }
  }
  get O() {
    if (this.pieces.indexOf(this.pieces[1]) === 1){
      return this.pieces[1]
    } else {
      this.debug._debug(this.pieces[1],`O Piece is not available ${this.pieces[1]}`,6)
      throw new Error(`O Piece is not available ${this.pieces[1]}`, {cause: this.pieces[1]} )
    }
  }
  set X(symbol) {
    if (symbol !== null && symbol !== undefined && symbol !== this.currentSymbol) {
      this.pieces[0] = symbol
      this.currentSymbol = symbol
    } else {
      this.debug._debug(symbol,`Setting a new symbol to ${this.X} as failed`, 6)
      throw new Error(`Setting a new symbol to ${this.X} as failed`, {cause: symbol} )
    }
  }
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
   * @description
   * @author @iPoetDev.githib.com
   * @date 2023/03/11
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