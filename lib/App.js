/* eslint-disable max-len */
/** App: 001 Module Summary @version 0.4.2 2023/04/04
 *   (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file App class for initailising the game conrtoler and input events of TicTacToe
 * @summary: App is the main class of the game, and is responsible for instantiating the game, and the game's listeners.
 * @kind module
 * @export App
 * @type {App}
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/10 @version 0.1.1
 * @since 2023/03/28 @version 0.4.1 @note Issue#21 https://github.com/iPoetDev/terni-lapilli--toe/issues/21
 * @since 2023/03/28 @version 0.4.2 Bump
 * @link  https://github.com/iPoetDev - Profile
 * @link  https://github.com/iPoetDev/terni-lapilli--toe/ - Repository
 * @link  https://github.com/iPoetDev/terni-lapilli--toe/issues/new - Log an Iew Issue
 * @requires { GameDebug } from '__GameDebug.js' @see module:GameDebug
 * @requires { Game } from '__Game.js' @see module:Game
 * @requires { StartListener } from '__StartListener.js' @see module:StartListener
 * @requires { MoveListener } from '__MoveListener.js' @see module:MoveListener
 */
import { GameDebug } from "../lib/__GameDebug.js";
import { Game } from "../lib/__Game.js";
import { StartListener } from "../lib/__StartListener.js";
import { MoveListener } from "../lib/__MoveListener.js";

/** App: 002 Class Definition @version 0.4.2 2023/04/04
 * @name App
 * @kind class
 * @classdesc WebApp interface/initialiser of a game of TicTacToe. Called when page loads, by script tag in index|home.html [ ] TODO Change html.
 * @exports App
 * @type {App}
 * @prop {GameDebug} deBug @member @private
 * @prop {Game} newGame @member @private
 * @prop {StartListener} startListener @member @private
 * @prop {string} butID @member @public
 * @prop {string} moveID @member @public
 * @prop {MoveListener} moveListeners @member @private
 * @prop {string} eventTypeID @member @public
 * @prop {string} fileName @member @private
 * @prop {number} logLevel @member @private
 * @prop {number} errorLevel @member @private
 * @function constructor  Instantiate App  @public @since 0.1.0
//* @function onExit()  Disposed of the event listeners on exit @public  @since 0.4.1
 * @function onError() @throws General or Unknown error @private @since 0.1.5+
 */

/* eslint-disable-next-line require-jsdoc */
/** App: 003 Class Declaration version 0.4.2 @2023/04/04*/
class App {
    /** App: 003 Props/Members @version 0.4.2 @2023/04/04
     * @prop {GameDebug} deBug Class logger @kind member
     * @prop {Game} newGame Current Game instance @kind member
     * @prop {StartListener} startListener Start Game interface @kind member
     * @prop {string} butID Button ID name @kind member @default #start
     * @prop {string} moveID Grid Class name @kind member @default .cell
     * @prop {MoveListener} moveListeners UI Event=Action Interface @kind member
     * @prop {string} eventTypeID Click event type @kind member @default click
     * @prop {string} fileName File's name for tracing @kind member @default App.js
     * @prop {number} logLevel Class logging level for info console @kind member @default 0
     * @prop {number} errorLevel Class logging level for error console @kind member @default 0
     * @version 0.4.0 @date 2023/03/28  Enabled customListeners, updated Class props
     * @version 0.4.1 @date 2023/04/01.  @note GitHub.Issue#21/#18/#11 Updated constructor's logging and tracing, removed logging methods
     * @version 0.4.2 @date 2023/04/03 Bumped, JSDoc tidy
     * @link https://github.com/iPoetDev/terni-lapilli--toe/issues/21
     */
    // App Class Members
    deBug = new GameDebug();
    newGame = new Game();
    startListener;
    startID = "#start"; /**@since 0.4.0 */
    moveID = ".cell"; /**@since 0.4.0 */
    moveListeners; /**@since 0.4.0 */
    eventTypeId = "click";
    fileName = "App.js";
    logLevel = 1; /**@since 0.4.0 */
    errorLevel = 9; /**@since 0.4.0 */

    /** App: 003 Class Constructor @version 0.4.2 @date 2023/04/04
     * @function constructor
     * @kind function
     * @classdec Create an instance of running App.
     * @constructs App
     * @param {string} [locname] @default `App,js`
     * @type {App}
     * @memberof App
     * @date 2023/03/22 @version 0.3.0
     * @date 2023/03/24. @version 0.4.0 @note GitHub.Issue#3 @link https://github.com/iPoetDev/terni-lapilli--toe/issues/3
     * @date 2023/03/31. @version 0.4.1
     * @date 2023/04/03. @version 0.4.2 Message+Trace pattern, Improved readability, added @ts-ignore for code hotspots
     * @note GitHub.Issue#21 @linkhttps://github.com/iPoetDev/terni-lapilli--toe/issues/21
     */
    constructor(locname = `App.js`) {
        // 1: Instance's global Debug and Console log
        this.deBug = new GameDebug();
        const logs = this.logLevel;
        const check = this.errorLevel;
        const gametrace = `${locname}: new Game`;
        const starttrace = `${locname}: new StartListener`;
        const movetrace = `${locname}: new MoveListener`;
        // Added 04/06
        const start = this.startID
        const eventID = this.eventTypeId
        // 2: Set new Game instance, else throw new Game Error
        try {
            this.newGame = new Game("X", "O", logs, gametrace);
        } catch (constructorerror) {
            this.onError(constructorerror, 1, check, gametrace);
        }
        // 3: Set new StartListener instance, else throw new StartListener Error
        try {
            this.startListener = new StartListener(
                // @ts-ignore
                this.newGame,
                //this.startID,
                this.startID,
                this.eventTypeId,
                logs,
                starttrace
            );
        } catch (starterror) {
            const debugtrace0 = `startListeners ${starterror.linenums}`;
            const debugtrace1 = `${locname}: Instance of startListener`;
            const errortrace = `${starttrace}, id: ${this.btnID} button, on a ${this.eventTypeId}`;
            this.deBug._debug(starterror, debugtrace0, check, debugtrace1);
            this.onError(starterror, 1, check, errortrace);
        }
        //4: Set new MoveListener instanxe, else throw new StartListener Error
        try {
            this.moveListeners = new MoveListener(
                // @ts-ignore
                this.newGame,
                this.moveID,
                this.eventTypeId,
                logs,
                movetrace
            );
        } catch (moveerror) {
            const debugtrace2 = `moveListeners ${moveerror.linenums}`;
            const debugtrace3 = `${locname}: Instance of moveListeners`;
            const errortrace = `${movetrace}, id: ${this.moveID} cell, on a ${this.eventTypeId}}`;
            this.deBug._debug(moveerror, debugtrace2, check, debugtrace3);
            this.onError(moveerror, 1, check, errortrace);
        }
    }

    /** onExit @todo [ ] TODO ENHANCEMENT
     * @function onExit
     * @kind function
     * @description This function handles the exit state of the application class, Runtime exit function for the Application level
     * @date 2023/03/31 @version 0.4.1 @note Issue#21 @link [#21]https://github.com/iPoetDev/terni-lapilli--toe/issues/21
    onExit() {
        // Clean up and remove all listeners
        // A good coding practice?
        this.startListener.removeListener();
        // this.moveListeners.removeListeners();
    }

    /** onError @version 0.4.2. @date 2023/04/04
     * @function onError
     * @kind function
     * @description This function handles the error state of the application class, Runtime error function for the Application level error handling
     * @usage Call when the app is initaitaied and when is initially run.
     * @param {Error} error General, {*} error object
     * @param {number} errflag 1: General Error, Default: Unknown Error. @default 0 : Unknown
     * @param {number} log Debugging error level: Full Stack Inspect @default this.errorLevel
     * @param {string} locname Filename locator for onError/Console @default App.js
     * @throws {Error} Application error, logs to console.
     * @throws {UncaughtError} Uncaught Errors
     * @memberof App
     * @version 0.1.0 @date 2023/03/15
     * @version 0.3.0 @date 2023/03/20
     * @version 0.4.0 @date 2023/03/24  .GitHub [#8](https://github.com/iPoetDev/terni-lapilli--toe/issues/8)
     * @version 0.4.1 @date 2023/03/28 Adjusted logging and tracing to console on errors
     * @version 0.4.2 @date 2023/04/04 Bump. JSDoc tidy, ts-ignore for code hotspots/TS issues, add block Constant, Message&Trace
     * @note Issue#21 [#21](https://github.com/iPoetDev/terni-lapilli--toe/issues/21)
     */
    //  Make this more robust, covering more edge cases and handling errors:
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError`) {
        const check = log;
        const GENERAL = 1;
        try {
            switch (errflag) {
                case GENERAL:
                    if (error) {
                        const generalmessage = `${locname}: General Error ${errflag}: App Init Error: ${error.name} - ${error.stack}`;
                        const generaltrace = `${locname}: General Error ${error.name}`;
                        // General Error & Debugging debug message.
                        this.deBug._debug(error, generalmessage, check, generaltrace);
                        throw new Error(generalmessage);
                    }
                    break;
                default: //  Unknown/Uncaught Exceptions:
                    const unknownmessage = `${locname}: Unknown Error ${errflag}: Application Error: ${error.name} - ${error.stack}`;
                    const unknowntrace = `${locname}: Unknown Issue: onError()`;
                    this.deBug._debug(error, unknownmessage, check, unknowntrace);
                    break;
            }
        } catch (uncaughterror) {
            const uncaughtmessage = `${locname}: Unknown Error ${errflag}: Application Error: ${uncaughterror.name} - ${uncaughterror.stack}`;
            const uncaughttrace = `${locname}: Uncaught Issue: onError()`;
            this.deBug._debug(uncaughterror, uncaughtmessage, check, uncaughttrace);
        }
    }
}

export { App };
