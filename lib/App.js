/**
*   (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file App class for initailising the game conrtoler and input events of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/10
 * @since 2023/03/16
 * @version 0.2.0
 * @summary: App is the main class of the game, and is responsible for instantiating the game, and the game's listeners.
 * - Objects/Classes are useful for asisgning the single reponsibility principle and limiting the scope of their capabilites.
 * - Note: As a developer, I was initially trainned, Master of Technology @RMIT(Aus, 2003-2004), in 2000-2010 when OOP was in its accendency, so am more accustomed to OOP than functional programming as a mental/contextual model..
 * @link  https://github.com/iPoetDev - Profile
 * @link  https://github.com/iPoetDev/terni-lapilli--toe/ - Repository
 * @link  https://github.com/iPoetDev/terni-lapilli--toe/issues/new - Log an Iew Issue
 * @requires { GameDebug } from 'GameDebug.js' @see module:GameDebug
 * @requires {  GameConfig } from 'GameConfig.js' @see module:GameConfig
 * @requires { Game } from 'Game.js' @see module:Game
 * @requires { StartListener } from 'StartListener.js' @see module:StartListener
 * @requires { MoveListener } from 'MoveListener.js' @see module:MoveListener
 * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameDebug } from '/lib/__GameDebug.js'
import { GameConfig } from '/lib/__GameConfig.js'
import { Game } from '/lib/__Game.js'
import { StartListener } from '/lib/__StartListener.js'
import { MoveListener } from '/lib/__MoveListener.js'

/**
 * @name App
 * @kind class
 * @class
 * @constructor
 * @classdesc WebApp interface/initialiser of a game of TicTacToe. Called when page loads, by script tag in index|home.html @todo Change html.
 * @prop {GameDebug} debug @public
 * @prop {GameConfig} config @public
 * @prop {Game} game @public
 * @prop {Element} button @public
 * @prop {NodeList} move @public
 * @function init() @public Initializes the application when HTML loads
 * @function _error() @static @todo Move to a separate Error Handler Class? Make private/static, switch public for testing?
  * @exports App
 */

class App {
    /**
     * @prop {GameDebug} deBug @kind member
     * @prop {GameConfig} appConfig @kind member
     * @prop {Game} newGame @kind member
     * @prop {Element} startButton @kind member
     * @prop {NodeList} userMoves  @kind member
     * @prop {StartListener} startListener @kind member
     * @prop {MoveListener} moveListeners @kind member
      */
    debug = new GameDebug()
    config = new GameConfig()
    newGame = new Game('X', 'Y')
    startButton = document.querySelector('#start')
    userMoves = document.querySelectorAll('.cell')
    startListener = new StartListener(this.startButton, this.newGame, 'click')
    moveListeners = new MoveListener(this.userMoves, this.newGame, 'click')

    /**
     * @name constructor
     * @kind function
     * @classdec Create an instance of running App.
     * @constructor
     * @constructs App
     * @memberof App
     */
    constructor() {
        // Instance's global Debug and Console log
        this.deBug = new GameDebug()
        // try {
        //     this.init()
        // } catch (error) {
        //     this._error(error, 1, 10, 'App: Constructor: Init()')
        // }
        //Try to log the App at Level 10 for class properties
        this.gameLogger(10,'App: Properties')
    }
    /**
     * @function init
     * @kind function
     * @summary Initializes the application
     * @description Initialisation of App. js This is called by init. js and should not be called directly by user
     * @throws {Error} If the startListener is not an instance of StartListener
     * @memberof App
     */
        //Defensive Error Init and UI Inputs, Uncopuple the error handling for more concise error messages per task
    init() {
        // Check truthy for a StartListener and start the Game, else throw an error
        debugger
        try {
            if ((this.startListener instanceof StartListener)) {
                this.startListener.onStart()
            }
        } catch (e) {
            this._error(this.startListener, 2, 10, 'Init: StartListener')
            // this._error(e, 1, 10, 'Init: Try-Catch')
        }

        // Check truthy for a MoveListener and assign the possible moves, else throw an error
        debugger
        try {
            // Called when the move listener is not an instance of MoveListener.
            if ((this.moveListeners instanceof MoveListener)) {
                 this.moveListeners.setListeners()
            }
            // Listen for user moves on Click of the Game board's tiles.
        } catch (e) {
            this._error(this.moveListeners, 2, 9, 'Init: MoveListener')
            // this._error(e, 1, 10, 'Init: Try-Catch')
        }
        this.appLogger(1)
    }

    /**
     * @name _error()
     * @kind function
     * @summary This function handles the error state of the application class
     * @memberof App
     * @function error(e) Private by using the Symbol [] operator
     * @param {*} e
     * @description Runtime error function for the Application level error handling
     * @todo Add more error handling for the application level and type level with a Flag: 1: General Error, 2: Type Error,
        @note Additional error types: 3: Syntax Error, 4: Reference Error, 5: Range Error, 7: Eval Error, 8: Internal Error, 9: Debug Error
    * @done Commenting and documentation of the code.
     */
    _error(e, flag = 0, level = 10, locname = 'App.js') {
        /** @type Load Game Debugger for Error handling*/
        let errorBug = new GameDebug()
        switch (flag) {
            case 1:
                // General Error & Debugging debug message.
                if (e) {
                    errorBug._debug(e, `${locname}: General Error ${flag}: App Init Error: ${e.name}`, level, `${locname}`)
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    // throw new Error(`General Error: Application failed to initailised. ${e.name}: ${e.message} => ${e.stack}`, {name: `${e}`, stack: e, cause: e})
                }
            case 2:
                // Type Error & Debugging debug message.
                if (e) {
                    errorBug._debug(e, `${locname}: Type Instance Error ${flag}: ${e.name}`, level, `${locname}`)
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    // throw new TypeError(`Type Error: Listeners are undefined. ${e.name}: ${e.message} => ${e.stack}`, {name: `${e}`, stack: e, cause: e})
                }
            default:
                 //  Unknown/Uncaught Exceptions: Flag default is 0, case < 1, and is unknown/not forseen.
                errorBug._debug(e, `${locname}: Unknown Error ${flag}: Application Error: ${e.name} - ${e.stack} - ${e.cause}`, level, `${locname}`)
                break
        }
    }

    gameLogger(level = 1, locname = `App.js`) {
        this.deBug._debug(this.appConfig, `InstanceOf: App|Game's Config ${this.appConfig}`, level, locname)
        this.deBug._debug(this.newGame, `InstanceOf: A Game ${this.newGame}`, level, locname)
        this.deBug._debug(this.startButton, `InstanceOf: A start button ${this.startButtton}`, level, locname)
        this.debug._debug(this.userMoves, `InstanceOf: User Moves ${this.userMoves}`, level, locname)
        this.debug._debug(this.startListener, `InstanceOf: StartListener ${this.startListener}`, level, locname)
        this.debug._debug(this.moveListeners, `InstanceOf: Move Listeners ${this.startListener}`, level, locname)
    }

    appLogger(level = 9, locname = `App.js`, funcname = 'This | Self') {
        this.deBug._debug(self, `${funcname}: globalThis is initiated: ${self}`, level, locname)
        this.deBug._debug(this, `${funcname}: this Class is initiated: ${this}`, level, locname)
    }
}

export { App }
