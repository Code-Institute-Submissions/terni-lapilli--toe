// vscode-fold=#
/* eslint-disable max-len */
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
 * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameDebug } from "/lib/__GameDebug.js";
import { Game } from "/lib/__Game.js";
import { StartListener } from "/lib/__StartListener.js";
import { MoveListener } from "/lib/__MoveListener.js";

/** App [ ] TODO check
 * @name App
 * @kind class
 * @classdesc WebApp interface/initialiser of a game of TicTacToe. Called when page loads, by script tag in index|home.html [ ] TODO Change html.
 * @prop {GameDebug} debug @default GameDebug
 * @prop {Game} newGame @default Game(X,O)
//  * @prop {Element} startButton @default Element #start
 * @prop {NodeListOf<Element>} userMoves @default NodeList #grid div.cell
 * @property {string} fileName @default App.js
 * @prop {StartListener} startListener
 * @prop {MoveListener} moveListeners
 * @function onInit()  Initializes the application when HTML loads
 * @function onError() @throws [ ] TODO Move to a separate Error Handler Class? Make private/static, switch public for testing?
 * @exports App
 */

/* eslint-disable-next-line require-jsdoc */
class App {
    /** Props/Members [ ] TODO FREEZE Issue ??: check
     * @prop {GameDebug} deBug @kind member
    //  * @prop {GameConfig} appConfig @kind member
     * @prop {Game} newGame @kind member
    //  * @prop {Element} startButton @kind member
    //  * @prop {NodeListOf<Element>} userMoves  @kind member
     * @property {string} fileName @default App.js
     * @prop {StartListener} startListener @kind member
     * @prop {MoveListener} moveListeners @kind member
     * @prop {btnId} moveListeners @kind member
     * @version 0.4.0 Enabled startListener custom event listener
     */
    // App Class Members
    deBug = new GameDebug();
    newGame;
    startListener;
    btnID = "#start";
    moveID = ".cell";
    moveListeners; /**@since 0.4.0 */
    eventTypeId = "click";
    fileName = "App.js";
    logLevel = 8; /**@since 0.4.0 */
    errorLevel = 9; /**@since 0.4.0 */

    /** App constructor [ ] TODO INSPECT ISSUE 3
     * @function constructor
     * @kind function
     * @classdec Create an instance of running App.
     * @param {string} [locname]
     * @constructs App
     * @type {App}
     * @memberof App
     * @date 2023/03/22 @version 0.3.0
     * @version 0.4.0 INSPECT @date 2023/03/24. @see GitHub.Issue#3 @link https://github.com/iPoetDev/terni-lapilli--toe/issues/3
     */
    constructor(locname = `${this.fileName}: Constructor`) {
        // Instance's global Debug and Console log
        this.deBug = new GameDebug();
        let logr = this.logLevel;
        try {
            this.newGame = new Game("X", "O", logr, `${locname}: new Game`);
        } catch (e) {
            // Throw a general error (errFlag1) on exceptions to new instance of a class, and log level 9 to console
            this.onError(e, 1, this.errorLevel, `${locname}: new Game`);
        }

        // debugger;
        try {
            this.startListener = new StartListener(
                this.newGame,
                this.btnID,
                this.eventTypeId,
                (logr = 0),
                `${locname}: new StartListener`
            );
        } catch (error) {
            // Throw a general error (errFlag1) on exceptions to new instance of a class, and log level 9 to console
            this.onError(
                error,
                1,
                this.errorLevel,
                `${locname}: new StartListener, id: ${this.btnID} button, on a ${this.eventTypeId}}`
            );
        }
        // debugger;
        try {
            this.moveListeners = new MoveListener(
                this.newGame,
                this.moveID,
                this.eventTypeId,
                logr,
                `${locname}: new MoveListener`
            );
            console.dirxml(`this.moveListeners: ${locname}`, this.moveListeners);
            //deBug();
            // this.deBug_debug(this.moveListeners, `moveListeners`, (logr = 8), `${locname}: Instance of moveListeners`);
        } catch (error) {
            console.dirxml(`this.moveListeners`, this.moveListeners);
            this.onError(
                error,
                1,
                this.errorLevel,
                `${locname}: new MoveListener, id: ${this.moveCLASS} button, on a ${this.eventTypeId}}`
            );
        }
    }

    /** Init() [ ] TODO INSPECT SSUES 3


    onExit() {
        // Clean up and remove all listeners
        // A good coding practice?
        this.startListener.removeListener();
        // this.moveListeners.removeListeners();
    }

    /** onError @todo [ ] TODO FREEZE
     * @function onError
     * @kind function
     * @description This function handles the error state of the application class, Runtime error function for the Application level error handling
     * @usage Call when the app is initaitaied and when is initially run.
     * @param {*} e
     * @param {number} flag
     * @param {number} log Debugging error level: Full Stack Inspect
     * @param {string} locname Filename locator for onError/Console @default App.js
     * @throws {Error} Application error, logs to console.
     * @throws {UncaughtError} Uncaught Errors
     * @todo TODO Add more error handling for the application level and type level with a Flag: 1: General Error, 2: Type Error,
     * @memberof App
     * @date 2023/03/15 @version 0.1.0
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/24 @version 0.4.0
     * @version 0.3.0  ADAPT @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0  FREEZE @date 2023/03/25. GitHub #8
     */
    //  Make this more robust, covering more edge cases and handling errors:
    onError(e, errflag = 1, log = this.errorLevel, locname = `${this.fileName}: onError`) {
        try {
            switch (errflag) {
                case 1:
                    if (e) {
                        // General Error & Debugging debug message.
                        this.deBug._debug(
                            e,
                            `${locname}: General Error ${errflag}: App Init Error: ${e.name}`,
                            log,
                            `${locname}: General Error`
                        );
                        /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                        throw new Error(
                            `${locname}: General Error ${e.prototype.name}: Application failed to initailised @ ${e.fileName} : ${e.linenums} : ${e.columnNumber}. ${e.name}: ${e.message} => ${e.cause}`,
                            {
                                name: `${locname}: General Error ${e.prototype.name}: New Instance`,
                                cause: `${e.cause} - ${e.toString}`,
                                stack: e,
                            }
                        );
                    }
                    break;
                default: //  Unknown/Uncaught Exceptions:
                    this.deBug._debug(
                        e,
                        `${locname}: Unknown Error ${errflag}: Application Error: ${e.name} - ${e.stack}`,
                        log,
                        `${locname}: Unknown Error`
                    );
                    break;
            }
        } catch (e) {
            this.deBug._debug(
                e,
                `${locname}: Unknown Error ${errflag}: Application Error: ${e.name} - ${e.stack}`,
                log,
                `${locname}: Uncaught Issue witb onError()`
            );
        }
    }

    /* eslint-disable-next-line valid-jsdoc */
    /** gameLogger @todo [ ] TODO INSPECT REMOVE THIS B4 SUBMISSION
      * @name gameLogger
      * @kind function
      * @description This function handles the error state of the application class
      * @function error(e) Private by using the Symbol [] operator
      * @param {number} [log] @default 1
      * @param {number} [locname] @default this.fileName
      * @description Runtime error function for the Application level error handling
      * @memberof App
      * [ ] TODO Add more error handling for the application level and type level with a Flag: 1: General Error, 2: Type Error,
         @note Additional error types: 3: Syntax Error, 4: Reference Error, 5: Range Error, 7: Eval Error, 8: Internal Error, 9: Debug Error
     *
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
      */
    gameLogger(log = this.logLevel, locname = `${this.fileName}: gameLogger`) {
        // Log a newGame instance
        this.deBug._debug(this.newGame, `${locname} InstanceOf: A Game ${this.newGame}`, log, `${locname}: a new Game`);
        // Log Start Button ID attr
        this.deBug._debug(
            this.btnId,
            `${locname} Start buttonId must be ${this.butId}`,
            log,
            `${locname}: confirm start button ID`
        );
        // this.deBug._debug(this.userMoves, `${locname} InstanceOf: User Moves ${this.userMoves}`, log, locname);
        this.deBug._debug(
            this.startListener,
            `${locname} InstanceOf: StartListener ${this.startListener}, ${this.startListener.toString()}`,
            log,
            `${locname}: new Custom StartListener`
        );
        // this.deBug._debug(
        //     this.moveListeners,
        //     `${locname} InstanceOf: Move Listeners ${this.moveListeners}`,
        //     log,
        //     locname
        // );
    }

    /* eslint-disable-next-line valid-jsdoc */
    /** gameLogger @todo [ ] TODO INSPECT REMOVE THIS B4 SUBMISSION
     * @function appLogger
     * @kind function
     * @description This function handles the console logging of the app
     * @param {number} [log] @default 1
     * @param {number} [locname] @default this.fileName
     * @memberof App
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    appLogger(log = this.logLevel, locname = `${this.fileName}: Self | This`) {
        this.deBug._debug(self, `${locname}: globalThis is refereneced: ${self}`, log, locname);
        this.deBug._debug(this, `${locname}: this Class is initiated: ${this}`, log, locname);
    }
}

export { App };
