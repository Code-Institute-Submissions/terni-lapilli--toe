import { GameDebug } from '/lib/__GameDebug.js'

class GameConfig {
  static BLANK = ''     /** @type {String}  */
  static _START = '#start'    /** @type {String}  */
  static _CELL = '.cell'        /** @type {String}  */
  static _EVNT = 'click'       /** @type {String}  */

  constructor() {
    /** @type {GameDebug}  */
    this.debug = GameDebug()
  }
}

export { GameConfig }