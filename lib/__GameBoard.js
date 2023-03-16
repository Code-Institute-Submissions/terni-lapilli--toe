import { GameDebug } from '/lib/__GameDebug.js'

/**
 * @name GameBoard
 * @summary Instance of a individual game board and blank cells.
 * @class GameBoard
 * @module GameBoard
 * @exports GameBoard
 * @usage Usage: Provides the reset capability for new game's playing board/surface
 * @see Game
 * @see GameDebug @imports
 * @description A class for instance of a game board to be used for each game.
 * @todo: Use board class to manage the state of the game.
 * @todo: Use board class to maybe store the data and retrieve from the local storage
 * @todo: Use board class to to check the state of the game's tiles/cells (Maybe) against illegal moves.
 * @notes Is this class really needed?
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/12
 * @version 0.1.0
 */
class GameBoard {
  /**
   * @name constructor
   * @function constructor()
   * @constructor .
   * @summary Creates an instance of GameBoard.
   * @description Creates an instance of GameBoard.
   * @prop {Array} surface (@alias: board): Array x 9 using the array.fill of a BLANK string
   * @prop {Boolean} isValid
   * @prop {Boolean} isInValid
   * @prop {GameDebug} debug
   * @memberof GameBoard
   */
  constructor() {
    this.surface = new Array(9).fill('')
    this.isValid = true;
    this.isInValid = false;
    this.debug = new GameDebug();
  }

  isCellFree() { }

  isCellOccupied() { }

}

export { GameBoard }