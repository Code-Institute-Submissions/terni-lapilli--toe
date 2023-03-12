import { GameDebug } from '/lib/__GameDebug.js'

/**
 * ------------------------------------------------------------------------------------------------
 * @name GameConfig
 * ------------------------------------------------------------------------------------------------
 * @class GameConfig  @constructor @export {GameConfig}
 * @summary Game configuration strings for HTML, CSS idenitifers and Logic evaluaions
 * @usage Used for allowsing custom configurations when or if the HTML changes.
 * ------------------------------------------------------------------------------------------------
 * @prop {String} BLANK @description string for a blank textContemt | Game tile.
 * @prop {String} _START @description string HTML NodeList idenitifer, #id, for the game's start button.
 * @prop {String} _CELL @description string HTML NodeList idenitifers, `.className`, for the game's board's title/cell.
 * @prop {String} _EVNT @description string for the Event type idenitifer for addEventListeners.
 * ------------------------------------------------------------------------------------------------
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/12
 * @version 0.1.0
 * ------------------------------------------------------------------------------------------------
 */

class GameConfig {
  static BLANK = ''     /** @type {String}  */
  static _START = '#start'    /** @type {String}  */
  static _CELL = '.cell'        /** @type {String}  */
  static _EVNT = 'click'       /** @type {String}  */
  static _DEV = 'Contact the Developer at @iPoetDev.github.com'       /** @type {String}  */
  static _REPO = 'Log a bug: https://github.com/iPoetDev/terni-lapilli--toe/issues/new '       /** @type {String}  */


  constructor() {
    /** @type {GameDebug}  */
    this.debug = GameDebug()
  }
}
/**
 * @export {GameConfig}
 */
export { GameConfig }