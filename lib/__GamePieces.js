import {GameDebug} from '/lib/__GameDebug.js'

/**
 * @name GamePieces
 * @summary Instance if the game current pieces.
 * @class GamePieces
 * @module GamePieces
 * @export {GamePieces}
 * @usage Use for storing default peiecs or alternate pieces if user has a choice
 * @description Game pieces to be placed on the game board.
 * @see GameLogic
 * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
 * @prop {string} X Piece/symbol of the first piece. Traditionally an X and is first piece played.
 * @prop {string} Y Piece/symbol of the second piece. Traditionally an Y and is second piece played.
 * @prop {string} currentPiece Default piece for the first mover / turn.
 * @prop {GameDebug} debug Debugger
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/08
 * @version 1.0.X
 */
class GamePieces {

  /**
  * @name constructor
  * @summary Creates an instance of GamePieces.
  * @constructor
  * @param {*} _X
  * @param {*} _Y
  * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
  * @prop {string} X Piece/symbol of the first piece. Traditionally an X and is first piece played.
  * @prop {string} Y Piece/symbol of the second piece. Traditionally an Y and is second piece played.
  * @prop {string} currentPiece Default piece for the first mover / turn.
  * @prop {GameDebug} debug Debugger
  * @memberof GamePieces
   */
  constructor(_X,_Y) {

    if (!((typeof _X || typeof _Y) === 'string')) {
      throw new Error(`X or Y Piece are not string types. ${e.message}: ${(_X | _Y)}`,
        {
          name: (_X | _Y),
          stack: (_X | _Y),
          cause: (_X | _Y)
        })
    }
    this.pieces= [ _X, _Y ]
    this.X = this.pieces[0]
    this.Y = this.pieces[1]
    this.currentPiece = this.pieces[0] /*?+*/
    this.debug = new GameDebug() /*?+*/
  }
  /**
  * @name X getter
  * @summary Getter for X piece.
  * @description Gets the X piece that is currently set.
  * @function @get
  * @property {string} pieces[1] - The Y piece
  * @error Else throws an error and attatches this debugger.
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
 * @name Y getter
 * @summary Getter for Y piece.
 * @description Gets the Y piece that is currently set.
 * @function @get
 * @property {string} pieces[1] - The Y piece
 * @error Else throws an error and the attatches debugger.
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
* @name X setter
* @summary Setter for X piece.
* @description Sets the X piece to the specified value. Else throws an error and attatches debugger.
* @function @set
* @param {*} piece
* @property {string} this.pieces[0] X piece for first piece
* @property {string} this.currentPiece Updates the current piece
* @error Throws if piece is not set or not the current Piece.
* @memberof GamePieces
*/
  set X(_piece) {
    if (_piece !== null && _piece !== undefined && _piece !== this.currentPiece) {
      this.pieces[0] = _piece
      this.currentPiece = _piece
    } else {
      this.debug._debug(_piece,`Setting a new piece to ${this.X} as failed`, 6)
      throw new Error(`Setting a new piece to ${this.X} as failed`, {cause: _piece} )
    }
  }
  /**
* @name O setter
* @summary Setter for Y piece.
* @description Sets the Y piece to the specified value. Else throws an error and attatches debugger.
* @function @set
* @param {*} _piece
* @property {string} pieces[1] Y piece for second piece
* @property {string} currentPiece Updates the current piece
* @error Throws if piece is not set or not the current Piece.
* @memberof GamePieces
*/
  set O(_piece) {
    if (_piece !== null && _piece !== undefined && _piece !== this.currentPiece) {
      this.pieces[1] = _piece
      this.currentPiece = _piece
    } else {
      this.debug._debug(_piece,`Setting a new piece to ${this.O} as failed`,6)
      throw new Error(`Setting a new piece to ${this.O} as failed`, {cause: _piece})
    }
  }
  /**
  * @name switchPieces
  * @function switchPieces
  * @summary Switches the pieces of the current symbol/game piece for the current turn/player
  * @description Swaps the current piece for the next player's piece based on the current turn's game piece.
  * @property {string} X X piece
  * @property {string} Y Y piece
  * @property {string} currentPiece Updates the current piece
  * @error Throws if piece is not set or not the current Piece.
  * @memberof GamePieces
   */
  switchPieces() {
    switch (this.currentPiece) {
      case this.X:
        this.currentPiece = this.Y
        this.debug._debug(this.currentPiece,`GamePieces: Current Piece is ${this.currentPiece}`,2)
        break;
      case this.Y:
        this.currentPiece = this.X
        this.debug._debug(this.currentPiece,`Current Piece is ${this.currentPiece}`,2)
        break
      default:
        this.debug._debug(this.currentPiece,`GamePieces is ${this.currentPiece}`,9)
        throw new Error(`GamePieces: Piece is not defined ${this.currentPiece}. Swapping symbol as failed`,{cause: this.currentPiece})
    }
  }

}

export { GamePieces }