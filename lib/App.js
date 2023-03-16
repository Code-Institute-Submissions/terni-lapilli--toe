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
 * @requires { Game } from "Game.js"; @see module:Game
 * @requires { StartListener } from "StartListener.js"; @see module:StartListener
 * @requires { MoveListener } from "MoveListener.js"; @see module:MoveListener
 * @requires {  GameConfig } from "GameConfig.js"; @see module:GameConfig
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @fixme Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { Game } from "/lib/__Game.js";
import { GameDebug } from "/lib/__GameDebug.js";
import { GameConfig } from "/lib/__GameConfig.js";
import { StartListener } from "/lib/__StartListener.js";
import { MoveListener } from "/lib/__MoveListener.js";

/**
 * @name App
 * @kind class
 * @class
 * @constructor
 * @classdesc WebApp interface/initialiser of a game of TicTacToe. Called when page loads, by script tag in index|home.html @todo Change html.
 * @field @property {GameDebug} debug @public
 * @field @property {GameConfig} config @public
 * @field @property {Game} game @public
 * @field @property {Element} button @public
 * @field @property {NodeList} move @public
 * @function init() @public Initializes the application when HTML loads
 * @function _error() @static @todo Move to a separate Error Handler Class? Make private/static, switch public for testing?
  * @exports App
 */

class App {
    /**
     * @field @property {GameDebug} debug
     * @kind member
     * @type Load Game Debugger, so not undefined */
    debug = new GameDebug(); /*?+*/
    /**
     * @field @property {GameConfig} config
     * @kind member
     * @type Instance of Game Config, so not undefined */
    config = new GameConfig(); /*?+*/
    /**
     * @field @property {Game} game
     * @kind member
     * @type Load Game, so not undefined
     * @param {String} _X,
     * @param {String} _O  */
    game = new Game("X", "O"); /*?+*/
    /**
     * @field @property {Element} button
     * @kind member
     * @type Stores the button element. as undefiened */
    button; /*?+*/
    /**
     * @field @property {NodeList} move
     * @kind member
     * @type Stores the collection of Nodes, for the move. as undefiened */
    move; /*?+*/

    /**
     * @name constructor
     * @kind function
     * @summary Create an instance of App.
     * @constructor
     * @constructs App
     * @memberof App
     * @instance
     */

    /**
     * / / object. This is a bit complex. We need to be able to pass the object
     */
    constructor() {
        /**
         * @property {GameDebug} this.debug
         * @type Load Game Debugger @instance */
        this.debug = new GameDebug(); /*?+*/
        /**
         * @property {GameConfig} this.config
         * @type Load Game Config @instance  */
        this.config = new GameConfig(); /*?+*/
        /**
         * @property {Game} game
         * @type Load Game controller @instance */
        this.game = new Game("X", "Y"); /*?+*/

        // this.button = document.querySelector(this.config._START()) /*?+*/
        this.button = document.querySelector("#start"); /*?+*/
        // button = document.querySelector("#start") /*?+*/
        // button = this.button  /*?+*/

        /** @type Retrieve all the game board's target cells */
        this.move = document.querySelectorAll(".cell"); /*?+*/

        try {
            /**
            *  @property {StartListener} startListener the UI event lister for the start button of the game.
            *  @listens {Event} click on start button  */
            // this.startListener = new StartListener(this.button,this.game,this.config._EVNT)
            // this.startListener = new StartListener(this.button, this.game, "click"); /*?+*/
            debugger;
            this.startListener = new StartListener(button /*?+*/, game, "click"); /*?+*/
        } catch (e) {
            this._error(e, 1);
        }

        try {
            /**
            * @property {MoveListener} moveListeners the UI event lister for the users's game moves.
              @listens {Event} click on div with style .cell => moves
             */
            // this.moveListener = new MoveListener(this.move, this.game, "click"); /*?+*/
            debugger;
            this.moveListeners = new MoveListener(move, game, "click"); /*?+*/
        } catch (e) {
            this._error(e, 1);
        }
    }
    /**
     * @name init()
     * @kind function
     * @function
     * @summary Initializes the application
     * @memberof App
     */
    /**
     * Initialisation of App. js This is called by init. js and should not be called directly by user
     */
    init() {
        //Defensive Error handling for init()
        try {

            // Attach debugger to the console and inform the start of the game: Level 1
            this.debug._debug(this.game, `Init(): New Game is initiated: ${this.game}`, 1, "App.js");
                console.log("%d", this.debug);
                console.trace("%d", this.debug);
            console.dir(this.debug);

            // Attach debugger to the console and trace the (Node | Elememt) object for checking: Level 7. => Remove before submission or Level 1 logging to the console for assessment. Is a developer/code reviewer feature.
            // this.debug._debug(this.button, `Init(): Button is instaniated: ${this.button}`, 7, "App.js");

            // Attach debugger to the console and trace the NodeList object for checking: Level 7 => Remove before submission or Level 1 logging to the console for assessment. Is a developer/code reviewer feature.
            // this.debug._debug(this.move, `Init(): Move targets are instaniated: ${this.move}`, 7, "App.js");

            /** @type {StartListener} Test if StartListener is valid type: Exit App if not and throw an application error */
            // Called when the listener is not a StartListener.
            if (!(this.startListener instanceof StartListener)) {
                this._error(this.startListener, 2);
            }

            /** @type {MoveListener} Test if MoveListener is a valid type: Exit App if not and throw an application error */
            // Called when the move listener is not an instance of MoveListener.
            if (!(this.moveListeners instanceof MoveListener)) {
                this._error(this.moveListeners, 2);
            }
            debugger;
            // Start the game on Click of start button
            this.startListener.onStart(); /*?+*/
            // Listen for user moves on Click of the Game board's tiles.
            this.moveListeners.setListeners(); /*?+*/
        } catch (e) {
            this._error(e, 1); /*?+*/
        }
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
    static _error(e, flag = 0) {
        /** @type Load Game Debugger for Error handling*/
        let debg = new GameDebug() /*?+*/
        /** @description Switches between error types for identifing when a specific type of error is throw in the init()/class() */
        switch (flag) {
            case 1:
                // General Error & Debugging debug message.
                if (e) {
                    debg._debug(e, `App.js: General Error (Flag 1): Application Error: ${e.name}`, 9, "App.js")
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    throw new Error(`General Error: Application failed to initailised. ${e.name}: ${e.message} => ${e.stack}`, {name: e, message: e, cause: e})
                }
            case 2:
                // Type Error & Debugging debug message.
                if (e) {
                    debg._debug(e, `App.js: Type Instance Error (Flag 2): ${e.name}`, 9, "App.js")
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    throw new TypeError(`Type Error: Listeners are undefined. ${e.name}: ${e.message} => ${e.stack}`, {cause: e})
                }
            default:
                 //  Unknown/Uncaught Exceptions: Flag default is 0, case < 1, and is unknown/not forseen.
                debg._debug(e, `App.js: Unknown Error (Flag 0): Application Error: ${e.name} - ${e.stack} - ${e.cause}`, 9, "App.js")
                break
        }
    }

}

export { App };
