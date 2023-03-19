// Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
import { Game } from "/lib/__Game.js"
import { GameDebug } from "/lib/__GameDebug.js"
// import {GameConfig} from "/lib/__GameConfig.js"

/**
 * @name StartListener
 * @class @constructor
 * @summary This class listene for the Start Button event when the user clicks on the Game start button.
 * @constructor @param {NodeList} _button @param {Game} _game @param {String} _event
 * @constructor Null checks if button exists and assigns the eventlistener to the button
 * @prop {NodeList} button - Button object from the App class's instance
 * @prop {Game} game - Game object from the App class's instance
 * @prop {String} eventType - Event: User Clicks events
 * @prop {GameConfig} config - GameConfig fpr the current games configuration strings
 * @prop {GameDebug} debug - Game object from the App class's instance
 * @function addListener @description Assigned the NodeList listener to the Start Button event when the user clicks on it. @usage @constructor
 * @function onStart @description
 * @function error @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/09
 */
class StartListener {

  /* Pass the @params, {HTMLElement} button, @params {Game} game and a {String} Event Type to the ButtonListener*/
  /**
   * @name constructor
   * @summary Creates an instance of StartListener.
   * @param {*} _button
   * @param {*} _game
   * @param {*} _evt
   * @memberof StartListener
   */
  constructor(_button,_game,_evt) {
    try {
      // Assign @params to the instance's props at runtime/intantiation of.
      /**  - Button object from the App class's instance */
      this.button = _button
      /** @prop {Game} - Game object from the App class's instance */
      this.game = _game
      /** @prop {String}  - Event: User Clicks events */
      this.eventType = _evt
      /** @prop {GameDebug} - Game object from the App class's instance */
      this.debug = new GameDebug()
      // Test for presence || absence of parameters at instantion time.
      // Attach debugger to the console for each parameter
      if (!_button || !_game || !_evt) {
        //Debugger
        this.debug._debug((_button || _game || _evt),`Button, Game or Event ${(_button || _game || _evt)} is not defined at runtime.`,6, 'StartListener.js')
        this.error((_button || _game || _evt),4)
      }

      this.debug._debug(_button, `StartListener: params ${Object.getPrototypeOf(_button).constructor.name}`,1,`StartListener.js`)

      // TypeError thrown with a cause if none of these pass.
      // Defensive check for Constructor param types
      if (!(_button instanceof (Node || Element))) {
        //Debugger
        this.debug._debug(_button,`Button: ${_button} is not defined at runtime.`,6, 'StartListener.js')
        this.error(_button,3)
      }

      // Defensive check for Constructor param types
      if (!(_game instanceof Game)) {
        //Debugger
        this.debug._debug(_game,`Game: ${_game} is not defined at runtime.`,6, 'StartListener.js')
        this.error(_game,3)
      }
      /** @type {String} Defensive check for Constructor param types */

      if (typeof _evt !== "string") {
        //Debugger
        this.debug._debug(_evt,`Event: ${_evt} is not defined at runtime.`,6, 'StartListener.js')
        this.error(_evt,3)
      }

      // Attatch Listener
      this.addListener(_button)

    } catch (e) {
      this.error(e, 5)
    }
  }
  /**
   * @name addListener
   * @summary Adds an event listener based on the event type to the button, and generally error handles the any unforeseen issues
   * @function @memberof StartListener
   * @usage Used on instantiaion of this the {StartListener} instance, in the @constructors
   */
  addListener(element) {
    // Important: Check if {NODEList} button is not null, and attatche addEventListener to it.
    try {
        if (element) {
            // Sends to Console information and full stack traceing and obj inspectors
            this.debug._debug(element,`Button: ${element} is present`,9, 'StartListener.js')
            // Bind this StartListener to to NodeList Event  listener using this onStartMethod
            return element.addEventListener(this.eventType,this.onStart.bind(this))
      }
    } catch (e) {
      this.debug._debug(this.button,`${e.name} : ${this.button} is not defined`,9, 'StartListener.js')
      this.error(e,1)
    }
 }

  /**
   * @name onStart
   * @summary onStart function for starting/restarting the game
   * @function @memberof StartListener
   * @usage Used for the initialisation of the Start Button in the App Class on init() of the web application
   */
  onStart() {

      // Try starting a new Game (with a new GameConfig object) => Increases coupleing and object dependency
      // Attach debugger to console, info tracing level 3. Just for debugging / confirmation purposes.
      // Catch any unknown/general runtime exception, throwing a general error with a cause.
      // Attach debugger to console, full stack traceing level 6.
    try {
        this.game = new Game('X','Y')
        this.debug._debug(this.game,`Starts a new game!`,1)

        if (!(this.game instanceof Game)) {
          this.error(this.game, 3)
        }
      } catch (e) {
          this.error(e, 1)
      }
  }

  /**
   * @name error
   * @summary Error message
   * @function @memberof StartListener
   * @param {*} e error object for Try/Catch exceptions and/general objects.
   * @param {*} flag: Switches which error is to be thrown.
   * @todo @description: Move to it's own class {GameError} for project level error handling. Needs more use cases/scenarios.
   * @todo @description Todo => Avoids overloading function using a switch statement & flags
   */
  error(e,flag) {
    switch (flag) {
      case 1:
        this.debug._debug(e,`Error: ${e.name} is not defined!`,6, 'StartListener.js')
        throw new Error(
          `Error: Instance of ${e.name} is not defined ${e.toString()}.`,
          {
            name: e,
            stack: e,
            cause: e
          })
      case 2:
        this.debug._debug(e,`Error: Instance of: ${e.name}: ${e.toString()} is not instantiated`,9, 'StartListener.js')
        throw new Error(
          `Error: General: ${e.name}: ${e.toString()} is not instantiated.`,
          {
            name: e,
            stack: e,
            cause: e
          })
      case 3:
        this.debug._debug(e,`Type: Instance of: ${e.name}: ${e.toString()} is not correct`,9, 'StartListener.js')
        throw new TypeError(
          `Type: Instance of: ${e.name}: ${e.toString()} is not correct.`,
          {
            name: e,
            stack: e,
            cause: e
          })
      case 4:
        this.debug._debug(e,`Error: One of Button | Game | Event: ${e.name}: ${e.toString()} is not provided | at runtime`,9, 'StartListener.js')
        throw new Error(
          `Error: One of Button | Game | Event: ${e.name}: ${e.toString()} is not provided | at runtime.`,
          {
            name: e,
            stack: e,
            cause: e
          })
      case 5:
        this.debug._debug(e,`Error: One of Button | Game | Event: ${e.name}: ${e.toString()} is not provided | at runtime`,9, 'StartListener.js')
        throw new Error(
          `addListener: StartListener: ${e.name}: ${e.toString()} did not get attatched to ${this.button}.`,
          {
            name: e,
            stack: e,
            cause: e
          })
      default:
        this.debug._debug(e,`Error: ${e.name} Default: ${e.toString()} is not being handled`,3, 'StartListener.js')
        break;
    }
  }
}

export { StartListener }
