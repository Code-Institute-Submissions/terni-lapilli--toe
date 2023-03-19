/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Start Listener class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/19
  *@version 0.2.0
 * @requires { Game } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */
import { Game } from "/lib/__Game.js"
import { GameDebug } from "/lib/__GameDebug.js"
// import {GameConfig} from "/lib/__GameConfig.js"

/**
 * @name StartListener
 * @kind class
 * @classdesc This class listener for the Start Button event when the user clicks on the Game start button.
 * @export StartListener
 * @prop {GameDebug} deBug - Game object from the App class's instance
 * @prop {Element} startButton - Button object from the App class's instance
 * @prop {Game} newGame - Game object from the App class's instance
 * @prop {String} eventType - Event: User Click events, onClick events
 * @function addListener Assigned the NodeList listener to the Start Button event when the user clicks on it. @usage @constructor
 * @function onStart Bings the start button to the StartListener class, and starts a new game.
 * @function onError Error messages according to flags and location
 * @function evaluateParameter Checks the parameter presence, and returns the parameter.
 * @function evaluateEventType Checks the event type is a string, and returns the event type.
 * @date 2023/03/09
 * @date 2023/03/19
 */
class StartListener {

/**
  * @prop {GameDebug} deBug - Game Debugger to console
  * @prop {Element} startButton - Button object from the App class's instance
  * @prop {Game} newGame - Game object from the App class's instance
  * @prop {string} eventType - Event: User Clicks events, onClick events
 */
  deBug = new GameDebug()
  startButton = document.querySelector('#start')
  newGame = new Game('X', 'Y')
  eventType =  ''
  /**
   * @function constructor
   * @kind function
   * @classdec Creates an instance of StartListener.
   * @param {Element} button
   * @param {Game} game
   * @param {string} evnt
   * @throws {Error} if the addListener method fails to attach the start button
   * @type {StartListener}
   * @constructs StartListener
   * @memberof StartListener

   */
  constructor(button,game,evnt) {

    this.startButton = this.evaluateParameter(button,1, 10)
    this.newGame = this.evaluateParameter(game, 2, 10)
    this.eventType = this.evaluateEventType(evnt, 1, 10)

    try {
      // Attatch Listener
      this.addListener(this.startbutton)
    } catch (e) {
      this.onError(e, 5, 9)
    }
  }

  /**
  * @function addListener
  * @kind function
  * @type {void}
  * @description Adds an event listener based on the event type to the button, and generally error handles the any unforeseen issues, and logs to console.
  * @usage Used on instantiaion of this the {StartListener} instance, in the @constructor
  * @throws {Error} if the html element type null | undefined & logs to console.
  * @memberof StartListener
  * @date 2023/03/09
  * @date 2023/03/19
   */
  addListener(element) {

    let message = `Button: ${element} attached`
    const locname = 'StartListener.js'
    const log = 1
    const check = 10

    try {
        if (element ?? false) {
          this.deBug._debug(element, message, log, `${locname}`)
          // Bind this StartListener to to NodeList Event  listener using onStart function
          return element.addEventListener(this.eventType,this.onStart.bind(this))
      }
    } catch (e) {
      let errmessage = `${e.name} : ${element} is not attached`
      this.deBug._debug(this.button, errmessage, check, `${locname}: AddListener()`)
      this.onError(e, 3, check, `${locname}: AddListener()`)
    }
 }

  /**
   * @name onStart
   * @kind function
   * @type {void}
   * @description Start function for starting/restarting the game
   * @usage Used for the initialisation of the Start Button in the App Class on init() of the web application
   * @memberof StartListener
   * @date 2023/03/09
   * @date 2023/03/19
   */
  onStart() {
    let message = `Starts a new game with ${this}`
    let flg = 1
    let check = 1
    const locname = `StartListener.js: onStart()`
    try {
        if (this.game instanceof Game) {
          this.game = new Game('X','Y')
          this.deBug._debug(this.game, message, log, `${locname}`)
        }
      } catch (e) {
          this.onError(e, flg, check, `${locname}`)
      }
  }

  /**
  * @function onError
  * @kind function
  * @description Error messages according to flags and location
  * @param {*} e error object for Try/Catch exceptions and/general objects.
  * @param {*} [flag=0]: Switches which error is to be thrown. @default 0
  * @param {*} [level=9]: Debug level for the error. @default 9
  * @param {*} [locname]: Location of the error. @default StartListener.js
  * @memberof StartListener
  * @throws {Error} Error, used for catching null or undefined errors.
  * @throws {TypeError} TypeError, used when checking for instanceof Errors
  * @throws {[Listener]Error} ListenerError, used for Binding errors
  * @todo @description: Move to it's own class {GameError} for project level error handling. Needs more use cases/scenarios.
  * @todo @description Todo => Avoids overloading function using a switch statement & flags
   * @date 2023/03/17
   * @date 2023/03/19
   */
  onError(e, flag = 0, level = 9, locname = 'StartListener.js') {

  const errorMessage = (() => {
    switch (flag) {
      case 1: // General Error:  Null | Not Defined
        return `General Error: Instance of ${e.name} is not defined ${e.toString()}.`;
      case 2: // Type Error: Instance of
        return `Type Error: Instance of: ${e.name}: ${e.toString()} is not correct type.`;
      case 3: // EventListener Binding Errors
        return `${locname} Error: addListener() ${e.name}: ${e.toString()} did not get attached to ${this.startButton}.`;
      default: // Uncatched Errors. Nothing Throwable yet
        return `Uncaught Exception: ${e.name}: ${e.toString()}.`;
    }
  })();

  switch (flag) {
    case 1: // General Error:  Null | Not Defined
		  this.deBug._debug(e, errorMessage, level, `${locname}`);
      throw new Error(errorMessage, { name: `General Error:`, stack: e });
    case 2: // Type Error: Instance of
      this.deBug._debug(e, errorMessage, level, `${locname}`);
      throw new TypeError(errorMessage, {name: `TypeError:`, stack: e});
    case 3: // EventListener Binding Errors
      this.deBug._debug(e, errorMessage, level, `${locname}: addListener Binding`)
      throw new Error(errorMessage, {name: `Listener Error:`, stack: e, cause: e});
    default: // Uncatched Errors
      this.deBug._debug(e, errorMessage, level, `${locname}`);
      break
  }
}

  /**
 * @function evaluateParameter
 * @kind function
 * @returns {string} Returns the parameter value
 * @description Checks for presnce of parameter value and returns it
 * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
 * @param {*} param Parameter under evaluation
 * @param {number} [argIndex=0] Optional, switches between type of parameters.
 * @param {number} [level=1] Optional, determine debugging level
 * @param {string} [locname=`StartListener.js`] Optional, determines the location of the error
 * @throws {Error} If param is null or undefined.
 * @memberof StartListener
 * @date 2023/03/19
 * @note This has the capcity to check other parameters, but is not implemented.
 */
  evaluateParameter(param, argIndex = 0, level = 1, locname = `StartListener.js`) {
      // Object: Key: Value map for parameter switching
      const paramNameMap = {
        1: "Game Button",
        2: "Game",
        default: "Start Listener Arguements"
      }
      // Object: Key: Value map for error strings
      const errOutMap = {
        1: "not set",
        2: "required",
        default: "Null | Undefined"
      }
      // Checks if param is not null or undefined, and returns the parameter, else throws an Error.
      if (param ?? false) {
        return param
      } else {
        const paramName = paramNameMap[argIndex] || paramNameMap.default
        let errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is ${param ? errOutMap[1] : errOutMap[2]}`
        this.deBug._debug(param, errmessage, level, `${locname}`)
        throw new Error(errmessage)
      }
  }
  /**
* @function evaluateEventType
* @kind function
* @returns {string} Returns the event type
* @description Checks for presnce of event and returns its
* @usage Stanitise the constructor (evnt) (eventType) before assignment to the  event listener.
* @param {*} event Event under evaluation
* @param {number} [argIndex=0] Optional, switches between type of events.
* @param {number} [level=1] Optional, determine debugging level
* @param {string} [locname=`StartListener.js`] Optional, determines the location of the error
* @throws {Error} If param is null or undefined.
* @memberof GameLogic
* @date 2023/03/19
* @note This has the capcity to check other future event types, but is not implemented.
*/
  evaluateEventType(event, argIndex = 0, level = 1, locname = `StartListener.js`) {
    // Object: Key: Value map for click and other event handlers types
    const eventNameMap = {
      1: "click",
      default: "Unknown Event Type"
    }
    // Object: Key: Value map for error strings
    const errOutMap = {
      1: "not set",
      2: "not typeof: string literal",
      default: "Null | Undefined"
    }
      // Checks if param is not null or undefined, and returns the parameter, else throws an Error.
      if ((event ?? false) && typeof event === "string") {
        return event
      } else {
        const eventName = eventNameMap[argIndex] || eventNameMap.default
        let errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is ${event ? errOutMap[1] : errOutMap[2]}`
        this.deBug._debug(event, errmessage , level, `${locname}`)
        throw new Error( errmessage)
      }
  }
}


export { StartListener }
