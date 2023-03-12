
import { Game } from "/lib/__Game.js"
import { GameDebug } from '/lib/__GameDebug.js'
import { GameConfig } from "/lib/__GameConfig.js"
import { StartListener } from "/lib/__StartListener.js"
import { MoveListener } from "/lib/__MoveListener.js"


/**
  * @name App
  * ------------------------------------------------------------------------------------------------
  * @class App
  * @description Game of TicTacToe.
  * @summary:  OOP is a optimal state machine approach for programming as objects can store a state of a class instance at any point of the programs inception.
  * - Additionally, OOP is an approach to modeling and abstracting real life things, that have physical equivalents into sofware variants
  *  - Can avoid a logic bomb of modeling a traditional pen and paper game (slate and chalk) into computer code if done in procedural/declarative approach
  * - Objects are useful for asisgning the single reponsibility principle and limiting the scope of their capabilites.
  * - Note: As a developer, I was initially trainned, Master of Technology @RMIT(Aus, 2003-2004), in 2000-2010 when OOP was in its accendency.
  * ------------------------------------------------------------------------------------------------
  * @author Charles Fowler iPoetDev.github.com
  * @date 2023-12-03:
  * @copyright 2023-2025,
  * @version 0.1.0
  * ------------------------------------------------------------------------------------------------
  * @link  https://github.com/iPoetDev
  * @link  https://github.com/iPoetDev/terni-lapilli--toe/issues/new
  * @linkcode  https://github.com/iPoetDev/terni-lapilli--toe/issues/new
  * ------------------------------------------------------------------------------------------------
*/


class App {
  /**
   * ------------------------------------------------------------------------------------------------
   * @name constructor
   * ------------------------------------------------------------------------------------------------
   * @summary Create an instance of App.
   * ------------------------------------------------------------------------------------------------
   * @constructor @function constructor()
   * @memberof App
   * ------------------------------------------------------------------------------------------------
   */
  constructor() {
    try {
      /** @type {GameConfig} Load Game Config strings */
      this.config = new GameConfig()
      // Load Game Debugger for the App
      /** @type {GameDebug} Load Game Debugger */
      this.debug = new GameDebug()
      /** @type {Game} Load Game controller */
      this.game = new Game('X','Y')
      /** @type {NodeList} Retrieve start button */
      this.button = document.querySelectorAll(this.config.START)
      /** @type {NodeList} Retrieve all the game board's target cells */
      this.move = document.querySelectorAll(this.config.CELL)
      /** @type {StartListener} Assign the UI event lister for the start button of the game. */
      this.startListener = new StartListener(this.button,this.game,this.config.EVNT)
      /** @type {MoveListener} Assign the UI event lister for the users's game moves. */
      this.moveListener = new MoveListener(this.move,this.game,this.config.EVNT)
    } catch (e) {
        error(e)
    }
  }
  /**
   * ------------------------------------------------------------------------------------------------
   * @name init()
   * ------------------------------------------------------------------------------------------------
   * @summary Initializes the application
   * ------------------------------------------------------------------------------------------------
   * @memberof App @function
   * ------------------------------------------------------------------------------------------------
   */
  init() {
    //Defensive Error handling for init()
    try {
      // Attach debugger to the console and inform the start of the game: Level 1
      this.debug._debug(this.game,`New Game is initiated: ${this.game}`,1)
      // Attach debugger to the console and trace the NodeList object for checking: Level 7. => Remove before submission
      this.debug._debug(this.button,`Button is instaniated: ${this.button}`,7)
      // Attach debugger to the console and trace the NodeList object for checking: Level 7 => Remove before submission
      this.debug._debug(this.move,`Move targets are instaniated: ${this.move}`,7)

      /** @type {StartListener} Test if StartListener is valid: Exit App if not and throw an application error(obj) [Overloaded] */
      if (!this.startListener instanceof StartListener)  {
        this.error(this.startListener)
      }
      /** @type {MoveListener} Test if MoveListener is valid: Exit App if not and throw an application error(obj) [Overloaded] */
      if (!this.moveListener instanceof MoveListener) {
        this.error(this.moveListener)
      }
      // Start the game on Click of start button
      this.startListener.onStart()
      // Listen for user moves on Click of the Game board's tiles.
      this.moveListener.initialize()

    } catch (e) {
      this.error(e)
    }
  }

  /**
   * @name error(e)
   * ------------------------------------------------------------------------------------------------
   * @summary [Overloaded] This function handles the error state of the application class.
   * ------------------------------------------------------------------------------------------------
   * @memberof App @function error(e) Private by using the Symbol [] operator
   * ------------------------------------------------------------------------------------------------
   * @param {*} e
   * @description Runtime error object for the Application level error handling
   * ------------------------------------------------------------------------------------------------
   */
  [error](e) {
    /** @type {GameDebug} Load Game Debugger for Error handling*/
    let _debug = new GameDebug()
    if (_debug) {
      _debug._debug(e,`Application Error: ${e.toString()})`,9)
      _debug._debug(e,`Take Action: ${this.config._DEV}. ${this.config._REPO}`,1)
    }
    alert(`Application Error: ${e.toString()}. ${this.config._DEV}. ${this.config._REPO}. `)
    throw new Error(`Application failed initailise. ${e.name}: ${e.message} => ${e.stack}`,{cause: e})
  }

  /**
   * @name error(obj)
   * ------------------------------------------------------------------------------------------------
   * @memberof App @function error(obj) Private by using the Symbol [] operator
   * ------------------------------------------------------------------------------------------------
   * @summary [Overloaded] This function handles the error state of the application class.
   * ------------------------------------------------------------------------------------------------
   * @param {*} obj: The instanceof the causing object.
   * @description Runtime error object for the Application dependecu for errro  handling
   * ------------------------------------------------------------------------------------------------
   */
  [error](obj) {
    /** @type {GameDebug} Load Game Debugger for Error handling*/
    let _debug = new GameDebug()
    if (_debug) {
      _debug._debug(obj,`Application Error: ${obj.toString()})`,9)
      _debug._debug(obj,`Take Action: ${this.config._DEV}. ${this.config._REPO}`,1)
    }
    alert(`Init() Error: ${obj.toString()}. ${this.config._DEV}. ${this.config._REPO}. `)
    throw new Error(`Init() Error.`,{name: obj, stack: obj, cause: obj, })
  }
}

const app = new App()
app.init();