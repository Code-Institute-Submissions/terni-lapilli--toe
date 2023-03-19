import {GameDebug} from '/lib/__GameDebug.js'

/**
 * @name GameConfig
 * @summary Game configuration strings for HTML, CSS idenitifers and Logic evaluaions
 * @class GameConfig
 * @module GameConfig
 * @export {GameConfig}
 * @usage Used for allowsing custom configurations when or if the HTML changes.
 * @decription Game strings for the view components and error strings for the App.
 * @see App
 * @see StartListener
 * @prop {String} BLANK
 * @description string for a blank textContemt | Game tile.
 * @prop {String} _START
 * @description string HTML NodeList idenitifer, #id, for the game's start button.
 * @prop {String} _CELL
  * @description string HTML NodeList idenitifers, `.className`, for the game's board's title/cell.
 * @prop {String} _EVNT @description string for the Event type idenitifer for addEventListeners.
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/12
 * @version 0.1.0
 */

class GameConfig {


  BLANK = ''     /** @type {String}  */
  _START = '#start'    /** @type {String}  */
  _CELL = '.cell'        /** @type {String}  */
  _EVNT = 'click'       /** @type {String}  */
  _DEV = 'Contact the Developer at @iPoetDev.github.com'       /** @type {String}  */
  _REPO = 'Log a bug: https://github.com/iPoetDev/terni-lapilli--toe/issues/new '       /** @type {String}  */
  constructor() {
    this.BLANK = ''     /** @type {String}  */
    this._START = 'start'    /** @type {String}  */
    this._CELL = '.cell'        /** @type {String}  */
    this._EVNT = 'click'       /** @type {String}  */
    this._DEV = 'Contact the Developer at @iPoetDev.github.com'       /** @type {String}  */
    this._REPO = 'Log a bug: https://github.com/iPoetDev/terni-lapilli--toe/issues/new '       /** @type {String}  */
    /** @type {GameDebug}  */
    this.debug = new GameDebug()
  }

  get START() {
    return this._START
  }
  get CELL() {
    return this._CELL
  }
}
/**
 * @export {GameConfig}
 */
export {GameConfig}