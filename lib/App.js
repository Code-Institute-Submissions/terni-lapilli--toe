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
 * @prop {Element} startButton @default Element #start
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
     * @prop {GameConfig} appConfig @kind member
     * @prop {Game} newGame @kind member
     * @prop {Element} startButton @kind member
     * @prop {NodeListOf<Element>} userMoves  @kind member
     * @property {string} fileName @default App.js
     * @prop {StartListener} startListener @kind member
     * @prop {MoveListener} moveListeners @kind member
     */
    // App Class Members
    deBug = new GameDebug();
    newGame = new Game("X", "O");

    startButton = document.querySelector("#start");
    userMoves = document.querySelectorAll(".cell");
    fileName = "App.js";
    startListener = new StartListener(
        this.startButton,
        this.newGame,
        "click",
        `${this.fileName}: StartListener: Class Prop`
    );
    moveListeners = new MoveListener(
        this.userMoves,
        this.newGame,
        "click",
        `${this.fileName}: MoveListeners@ Class Prop`
    );

    /** App constructor [ ] TODO INSPECT ISSUE 3
     * @function constructor
     * @kind function
     * @classdec Create an instance of running App.
     * @param {string} [locname]
     * @constructs App
     * @type {App}
     * @memberof App
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    constructor(locname = `App: Constructor`) {
        // Instance's global Debug and Console log
        this.deBug = new GameDebug();
        this.newGame = new Game("X", "O", `${this.fileName}: Constructor: New Game Instance`);

        debugger;
        this.startListener = new StartListener(
            this.startButton,
            this.newGame,
            "click",
            `${this.fileName}: StartListener@constructor`
        );
        // debugger;

        this.moveListeners = new MoveListener(
            this.userMoves,
            this.newGame,
            "click",
            `${this.fileName}: MoveListeners@constructor`
        );
        this.gameLogger(1, `${locname}: Log Properties`);
    }
    /** Init() [ ] TODO INSPECT SSUES 3
     * @function init
     * @kind function
     * @description Initialisation of App. js This is called by init. js and should not be called directly by user
     * @param {string} [locname]
     * @useage Initializes the application from HTML script tag, type=module
     * @throws {Error} If the startListener is not an instance of StartListener
     * @memberof App
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    onInit(locname = `App:`) {
        // check truthy for a StartListener and start the Game, else throw an error
        try {
            if (this.startListener instanceof StartListener) {
                debugger;
                this.startListener.onStart(3, 1, 9, `${locname} onInit() StartListener onStart()`);
            }
        } catch (e) {
            this.onError(e, 2, 9, `${locname} onInit() StartListener: onError`);
        }

        // check truthy for a MoveListener and assign the possible moves, else throw an error
        try {
            // Called when the move listener is not an instance of MoveListener.
            if (this.moveListeners instanceof MoveListener) {
                this.moveListeners.setListeners(this.userMoves, `${locname}: SetMove Listeners`);
            }
        } catch (e) {
            this.onError(e, 2, 10, `${locname} onInit() MoveListener`);
        }

        this.appLogger(5);
    }

    /** onError [ ] TODO FREEZE
     * @function onError
     * @kind function
     * @description This function handles the error state of the application class, Runtime error function for the Application level error handling
     * @usage Call when the app is initaitaied and when is initially run.
     * @param {*} e
     * @param {number} flag
     * @param {number} log Debugging level: Full Stack Inspect
     * @param {string} locname Filename locator for onError/Console @default App.js
     * @throws {Error} Application error, logs to console.
     * @throws {TypeError} Undefined Listeners error, logs to console.
     * @throws {[Uncaught]Error} Uncaught Errors
     * [ ] TODO Add more error handling for the application level and type level with a Flag: 1: General Error, 2: Type Error,
     * @memberof App
     * @date 2023/03/15
     * @date 2023/03/20
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    onError(e, flag = 1, log = 9, locname = "App.js") {
        switch (flag) {
            case 1:
                if (e) {
                    // General Error & Debugging debug message.
                    this.deBug._debug(
                        e,
                        `${locname}: General Error ${flag}: App Init Error: ${e.name}`,
                        log,
                        `${locname}`
                    );
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    // throw new Error(`General Error: Application failed to initailised. ${e.name}: ${e.message} => ${e.stack}`, { name: `${locname}: General Error`, stack: e})
                }
                break;
            case 2:
                if (e) {
                    // Type Error & Debugging debug message.
                    this.deBug._debug(e, `${locname}: Type Instance Error ${flag}: ${e.name}`, log, `${locname}`);
                    /** @throws General Appllcation Error: Name, Message, Stack and Cause **/
                    // throw new TypeError(`Type Error: Listeners are undefined. ${e.name}: ${e.message} => ${e.stack}`, { name: `${locname}: Type Error`, stack: e})
                }
                break;
            default: //  Unknown/Uncaught Exceptions:
                this.deBug._debug(
                    e,
                    `${locname}: Unknown Error ${flag}: Application Error: ${e.name} - ${e.stack}`,
                    log,
                    `${locname}`
                );
                break;
        }
    }

    /* eslint-disable-next-line valid-jsdoc */
    /** gameLogger [ ] TODO INSPECT REMOVE THIS B4 SUBMISSION
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
    gameLogger(log = 0, locname = `${this.fileName}`) {
        this.deBug._debug(this.newGame, `${locname} InstanceOf: A Game ${this.newGame}`, log, locname);
        this.deBug._debug(this.startButton, `${locname} InstanceOf: A start button ${this.startButtton}`, log, locname);
        this.deBug._debug(this.userMoves, `${locname} InstanceOf: User Moves ${this.userMoves}`, log, locname);
        this.deBug._debug(
            this.startListener,
            `${locname} InstanceOf: StartListener ${this.startListener}`,
            log,
            locname
        );
        this.deBug._debug(
            this.moveListeners,
            `${locname} InstanceOf: Move Listeners ${this.moveListeners}`,
            log,
            locname
        );
    }

    /* eslint-disable-next-line valid-jsdoc */
    /** gameLogger [ ] TODO INSPECT REMOVE THIS B4 SUBMISSION
     * @function appLogger
     * @kind function
     * @description This function handles the console logging of the app
     * @param {number} [log] @default 1
     * @param {number} [locname] @default this.fileName
     * @memberof App
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    appLogger(log = 0, locname = `${this.fileName}: Self | This`) {
        this.deBug._debug(self, `${locname}: globalThis is refereneced: ${self}`, log, locname);
        this.deBug._debug(this, `${locname}: this Class is initiated: ${this}`, log, locname);
    }
}

export { App };
