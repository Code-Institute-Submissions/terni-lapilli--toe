// Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
import {Game} from "/lib/__Game.js"

/**
 * @class ButtonListener
 * @summary This class
 * @constructor @param {HTMLElement} button @param {Game} game @param {String} event
 * @constructor Null checks if button exists and assigns the eventlistener to the button
 * @property {HTMLElement} button - Button object from the App script
 * @property {Game} game - Game object from the App script
 * @function onStart
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/09
 */
export default class ButtonListener {

  /* Pass the @params, {HTMLElement} button, @params {Game} game and a {String} Event Type to the ButtonListener*/
  constructor(button,game,evt) {
    this.button = button
    this.game = game
    // Check if {NODEList} button is not null, and addEventListener to it
    if (this.button) {
      this.button.addEventListener(evt,this.onStart.bind(this))
      console.log(button)
      console.dir(button)
      console.dirxml(button)
    } else {
      console.error(button)
      console.dir(button)
      console.dirxml(button)
    }
  }

  onStart() {
    this.game = new Game()
  }
}

export {ButtonListener}
