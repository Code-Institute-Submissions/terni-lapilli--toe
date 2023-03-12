// Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
import {Game} from "/lib/__Game.js"
import {GameDebug} from "/lib/__GameDebug.js"
// import {GameConfig} from "/lib/__GameConfig.js"

/**
 * @class @name StartListener
 * @summary This class listene for the Start Button event when the user clicks on the Game start button.
 * @constructor @param {HTMLElement} button @param {Game} game @param {String} event
 * @constructor Null checks if button exists and assigns the eventlistener to the button
 * @property {HTMLElement} button - Button object from the App script
 * @property {Game} game - Game object from the App script
 * @function onStart
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/09
 */
class StartListener {

  /* Pass the @params, {HTMLElement} button, @params {Game} game and a {String} Event Type to the ButtonListener*/
  constructor(_button,_game,_evt) {
    // Assign @params to the instance's props at runtime/intantiation of.
    this.button = _button
    this.game = _game
    this.eventType = _evt
    // Try attatching a new instance of the debugger
    // Catch any unforseen errors at Runtime:
    try {
      // Assig debugger to StartListener instances
      this.debug = new GameDebug()
    } catch (err) {
      // General Error with cause.
      throw new Error(
        `GameDebug: Runtime Error: ${err}..`,
        {cause: err})
    }

    // Test for presence || absence of parameters at instantion time.
    // Attach debugger to the console for each parameter
    if (!_button || !_game || !_evt) {
      //Debugger
      this.debug._debug((_button || _game || _evt),`Button, Game or Event ${(_button || _game || _evt)} is not defined at runtime.`, 6)
      // Common Error, with cause
      throw new Error(
        `General Error: Button: ${_button}. Game: ${_game}, Event string: ${_evt} are required parameters.`,
        {cause: (_button || _game || _evt)})
    }

    // Defensive check for Constructor param types: Game type, String type at runtime.
    // TypeError thrown with a cause if none of these pass..
    if (!(_button instanceof NodeList || _game instanceof Game || _evt instanceof String)) {
      this.debug._debug((_button || _game || _evt),`Following obj instances/types: ${(_button || _game || _evt)}: are not defined`, 9)
      throw new TypeError(
        `Button, Game or Event of String types ${(_button || _game || _evt)} are not defined at runtime.`,
        {cause: (_button || _game || _evt)})
    }

    // Important: Check if {NODEList} button is not null, and attatche addEventListener to it.
    if (this.button) {
      this.button.addEventListener(this.eventType,this.onStart.bind(this))
      // Sends to Console information and full stack traceing and obj inspectors
      this.debug._debug(this.button, `Button: ${this.button} is present`, 1)
      this.debug._debug(this, `Instance of StartListener is operating`, 9)
    } else {
      // Sends to Console  full stack traceing and obj inspectors for debugging
      this.debug._debug(this.button, `Button:: ${this.button} is not defined`, 9)
      this.debug._debug(this, `Instance of StartListener is not defined`, 9)
    }
  }

  onStart() {
    if (this.game) {
      // Try starting a new Game
      // Attach debugger to console, info tracing level 3. Just for debugging / confirmation purposes.
      // Catch any unknown/general runtime exception, throwing a general error with a cause.
      // Attach debugger to console, full stack traceing level 6.
      try {
        this.game = new Game()
        this.debug._debug(this.game,`Starts a new game!`,3)
      } catch (err) {
        this.debug._debug(this.game,`New game is not started!`,6)
        throw new Error(
          `Game Start() Error: ${err}. Game does not exist at runtime.`,
          {cause: err})
      }
    }
    else {
      this.debug._debug(this.game,`Instance of a Game: ${this.game} is not instantiated`,9)
      throw new Error(
        `Game Start() Error: Game: ${this.game} is not defined to start a new Game.`,
        {cause: this.game})
    }
  }
}

export { StartListener }
