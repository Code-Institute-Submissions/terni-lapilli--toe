/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __StartListener.js class as  module for the game of TicTacToe
 * @kind module
 * @exports StartListener
 * @type {StartListener}}
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08 @version 0.1.2
 * @date 2023/03/19 @version 0.3.0
 * @date 2023/03/31 @version 0.4.1
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 * @link https://github.com/iPoetDev/terni-lapilli--toe/issues/12
 */
// @ts-ignore
import { Game } from "/lib/__Game.js";
// @ts-ignore Location of libraries
import { GameDebug } from "/lib/__GameDebug.js";

/** [ ] TODO FREEZE JSDocs
 * @name StartListener
 * @kind class
 * @classdesc This class listener for the Start Button event when the user clicks on the Game start button.
 * @export StartListener
 * @prop {GameDebug} deBug @kind member @private
 * @prop {Element} startButton @kind member @private
 * @prop {Game} newGame @kind member @private
 * @prop {String} eventType @kind member @private
 * @prop {string} btnId @kind member @public
 * @prop {boolean} startClicked @kind member @public
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
 * @prop {string} fileName @kind member @private
 * @function constructor @kind function@public
 * @function onInit @kind function @public
 * @function isStartClicked @kind function @public
 * @function addListener  @kind function @private
 * @function onError @kind function @private
 * @function evaluateParameter @kind function @private
 * @function evaluateEventType @kind function @private
 * @date 2023/03/09
 * @date 2023/03/19 @version 0.3.0
 * @date 2023/03/24 @version 0.4.0 @note Issue#4 @link https://github.com/iPoetDev/terni-lapilli--toe/issues/4
 * @date 2023/03/31 @version 0.4.0 @note Issue#12 @link https://github.com/iPoetDev/terni-lapilli--toe/issues/12
 * @date 2023/04/02 @version 0.4.2 @note IDE adds @tsignore, not using TS, just its linting for errors.
 */
class StartListener {
    /** Class Props [ ] TODO: FREEZE
     * @prop {GameDebug} deBug Console logger
     * @prop {Element} startButton Start Button
     * @prop {Game} newGame Current game instance
     * @prop {String} eventType Click event @default click
     * @prop {string} btnId Start Button id @default #start
     * @prop {boolean} startClicked Initiale button state @default false
     * @prop {string} fileName Trace for File/Method @default StartListener.js
     * @prop {number} logLevel Console logging level @default 0
     * @prop {number} errorLevel Console error level @default 9
     */
    deBug = new GameDebug();
    startButton;
    newGame;
    eventType = "click";
    btnID = "#start";
    startClicked = false;
    fileName = "StartListener.js";
    logLevel = 8; // Logger Output cleared
    errorLevel = 8; // Logger Full Stack Inspector

    /** StartListener constructor 0.4.1. [x]
     * @function constructor
     * @kind function
     * @classdesc Creates an instance of StartListener, to listen for button  press
     * @constructs StartListener
     * @type {StartListener}
     * @param {Game} game New, Current game instance for each start state
     * @param {string} btnID Button Id @default #start
     * @param {string} evnt Toggle a default value for testing purposes
     * @param {number} [log] Log to console @default this.logLevel
     * @param {string} filename Trace method name @default this.fileName
     * @throws {Error} if the 1addListener method fails to attach the start button, to level 9 by default
     * @memberof StartListener
     * @version 0.3.0 @date 2023/03/22   . See Changelog on this date.
     *  @version 0.4.1 @date 2023/03/31
     *  @version 0.4.2 @date 2023/04/02 Removes this. as a reference for constructors, dehosit params to block vars, IDE adds @tsignores
     */
    constructor(game, btnID = "#start", evnt = "click", log = 0, filename = `StartListener.js`) {
        // 1: Assign Block vars
        const logs = log;
        const locname = filename;
        const check = this.errorLevel;
        // @ts-ignore
        this.startClicked = false;
        // 2: Santitise the @param game and THEN assign it to the member field.
        const aGame = this.evaluateParameter(game, 2, logs);
        this.newGame = aGame;
        // 3: Santitise the @param btnID ident before asssigment to the member field.
        this.startButton = document.querySelector(btnID);
        // 4: Santitise the @param evnt before assignment to the member field. 1 = click event
        this.eventType = this.evaluateEventType(evnt, 1, logs);
        try {
            // 5: Attatch Listener to Start Button
            // @ts-ignore
            this.addListener(this.startButton, this.newGame, logs, `${locname}: adds Listener, Game`);
            const infomessage = `${this}: addListener`;
            const infotrace = `${locname}: addListener, new Game`;
            this.deBug._debug(this.startButton, infomessage, logs, infotrace);
        } catch (error) {
            const errorflag = 1;
            const errortrace = `${locname}: AddListener Error`;
            this.onError(error, errorflag, check, errortrace);
        }
    }

    /** onInit() @version 0.4.1 @date 2023/03/31
     * @function onInit()
     * @kind function
     * @classdesc initialiseS an instance of StartListener as a custome Event Listener.
     * @param {Game} game
     * @param {number} log Class level log flagging @default this.logLevel Class log level
     * @param {string} locname Class level tracing and method tracing in logger @default this.fileName
     * @throws {Error} General error for when is unknown error
     * @memberof StartListener
     * @version 0.3.0 @date 2023/03/22.
     * @version 0.4.0 @date 2023/03/27. Screenshots and update arch docs
     * @version 0.4.1 @date 2023/03/31.
     * @version 0.4.2 @date 2023/04/02
     */
    onInit(game, log = this.logLevel, locname = `${this.fileName}: onInit()`) {
        // 1: Assign block vars
        const logs = log;
        const check = this.errorLevel;
        // 2: Error handling on Initialisation
        try {
            this.deBug._debug(game, `Param: game ${game}`, logs, `${locname}`);
            // 3: Eval a 2nd time, the game param, OVERKILL??
            const _game = this.evaluateParameter(game, 2, (log = 1), `${locname}: Game Eval: 2nd`);
            this.newGame = _game;
            // 4: Check if game is falsey, which is set when a game is instatiated,
            // @ts-ignore
            if (this.newGame.gameRunning === false) {
                const message = `${locname}: Gane Running`;
                this.deBug._debug(this.newGame, message, logs, `${locname}: Game is initialised`);
                // @ts-ignore
                const isInit = this.newGame.isGameStarted(false);
                // @ts-ignore
                this.newGame.onInit(isInit, null, logs);
            }
        } catch (error) {
            const errorflag = 1;
            const errortrace = `${locname}: Initialisation Error`;
            this.onError(error, errorflag, check, errortrace);
        }
    }

    /** isStartClicked @version 0.4.1 @date 2023/03/31
     * @function isStartClicked
     * @kind function
     * @description checks if a start button is clicked (initial is false), and parrellels the the game active state to true.
     * @usage TBC
     * @returns Whether the start button is pressed and the game has been started
     * @memberof Game
     * @date 2023/03/30 @sincce @version 0.4.1
     * @concern How do I reset a boolean state of button clickedness when is it dissociated from the game.
     */
    isStartClicked() {
        if (this.startClicked === false) {
            return (this.startClicked = true);
        }

        if (this.startClicked === true) {
            // @ts-ignore
            message = `The game's start button has been pressed`;
            // @ts-ignore
            window.alert(message);
        }
    }

    /** addListener @version 0.4.1 @date 2023/03/31
     * @function addListener
     * @kind function
     * @description Adds an event listener based on the event type to the button, and generally error handles the any unforeseen issues, and logs to console.
     * @param {Element} element The html element queired
     * @param {number} log Optional console output on success @default 1 Information @see module:GameDebug
     * @param {string} locname Console location of usage @default this.fileName
     * @usage Used on instantiaion of this the {StartListener} instance, in the @constructor
     * @throws {Error} if the html element type null | undefined & logs to console.
     * @memberof StartListener
     * @date 2023/03/09
     * @date 2023/03/19 @version 0.3.0 done
     * @date 2023/03/24.@version 0.4.0 and Snapshots
     * @date 2023/03/31.@version 0.4.1
     * @date 2023/04/02.@version 0.4.2
     */
    addListener(element, game, log = this.logLevel, locname = `${this.fileName}: addListener()`) {
        const logs = log;
        const check = this.errorLevel;
        // @ts-ignore
        const errlistener = 3;
        try {
            if ((element ?? false) || (game ?? false)) {
                //Message string
                const message = `Button: ${element} & game ${game} attached`;
                //Log to console
                this.deBug._debug(this, message, logs, `${locname}: Attatch Listener to element`);
                // Bind this StartListener to to Element Event  listener using onStart function name(params) {
                return element.addEventListener(this.eventType, this.onInit.bind(this, game));
            }
        } catch (error) {
            const errmessage = `${error.name} : ${element || game} is not attached`;
            this.deBug._debug(element || game, errmessage, check, `${locname}: AddListener Error`);
            this.onError(error, errlistener, check, `${locname}: AddListener Error`);
        }
    }

    /** onError @version 0.4.1 @date 2023/03/31
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {Error} error object for Try/Catch exceptions and/general objects.
     * @param {number} [errflag] Switches which error is to be thrown. @default 0
     * @param {number} [log] Debug level for the error. @default 9
     * @param {string} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {Listener Error} ListenerError, used for Binding errors
     * @memberof StartListener
     * @date 2023/03/17
     * @date 2023/03/19
     * @version 0.3.0 @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0 @date 2023/03/24. See Changelog on this date.
     * @version 0.4.1 @date 2023/03/31. See Changelog on this date.

     * @version 0.4.2 @date 2023/04/02. Message+Trace pattern.
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
        const check = log;
        // IIFE Immediately invoked Function: Alternate is to use an ObjectLiteralMap pattern
        const errorMessage = (() => {
            switch (errflag) {
                case 1: // General Error:  Null | Not Defined
                    return `${locname} General Error: Instance of ${error.name} is not defined ${error.toString()}.`;
                case 2: // Type Error: Instance of
                    return `${locname} Type Error: Instance of: ${
                        error.name
                    }: ${error.toString()} is not correct type.`;
                case 3: // EventListener Binding Errors
                    return `${locname} Error: addListener() ${
                        error.name
                    }: ${error.toString()} did not get attached to ${this.startButton}.`;
                default: // Uncatched Errors. Nothing Throwable yet
                    // @ts-ignore
                    return `Uncaught Exception: ${e.name}: ${e.toString()}.`;
            }
        })();

        switch (errflag) {
            case 1: // General Error:  Null | Not Defined
                const generaltrace = `${locname} General Error:`;
                this.deBug._debug(error, errorMessage[errflag], check, generaltrace);
                //
                throw new Error(`${generaltrace} :${errorMessage}`);
            case 2: // Type Error: Instance of
                const typetrace = `${locname} TypeError:`;
                this.deBug._debug(error, errorMessage[errflag], check, typetrace);
                // @ts-ignore
                throw new TypeError(`${typetrace} :${errorMessage}`);
            case 3: // EventListener Binding Errors
                const listenertrace = `${locname}: addListener Binding Error`;
                this.deBug._debug(error, errorMessage[errflag], check, listenertrace);
                // @ts-ignore
                throw new Error(`${listenertrace} :${errorMessage}`);
            default: // Uncatched Errors
                const uncaughttrace = `${locname}: Uncaught error`;
                // @ts-ignore
                this.deBug._debug(error, `${uncaughttrace}: ${errorMessage.default}`, check, uncaughttrace);
                break;
        }
    }

    /** evaluateParameter @version 0.4.1 @date 2023/03/31
     * @function evaluateParameter
     * @kind function
     * @returns {object} Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*} param Parameter under evaluation
     * @param {number} [argIndex] Optional, switches between type of parameters. @default 0
     * @param {number} [log] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof StartListener
     * @date 2023/03/19
     * @version 0.3.0 @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0 @date 2023/03/27. See Changelog on this date.
     * @version 0.4.1 @date 2023/03/31.
     * @version 0.4.2 @date 2023/04/02.
     */
    evaluateParameter(param, argIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter()`) {
        const check = log;
        // Object: Key: Value map for parameter switching
        const paramNameMap = {
            1: "Game Button ID",
            2: "Game",
            default: `${locname}'s Arguements`,
        };
        // Object: Key: Value map for error strings
        const errOutMap = {
            1: "not set",
            2: "required",
            default: "Null | Undefined",
        };
        // checks if param is not null or undefined, and returns the parameter, else throws an Error.
        if (param ?? false) {
            return param;
        }

        // checks if param is null or undefined, and throws an Error.
        if (param ?? true) {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is ${
                param ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(param, errmessage, check, `${locname}: evaluateParameter()`);
            throw new Error(errmessage);
        }
    }

    /** evaluateEventType @version 0,4,1 @date 2023/03/31
     * @function evaluateEventType
     * @kind function
     * @returns {object} Returns the event type, of string literal
     * @description checks for presnce of event and returns its
     * @usage Stanitise the constructor (evnt) (eventType) before assignment to the  event listener.
     * @param {string} event Event, as a string literal, under evaluation
     * @param {number} [eventIndex] Optional, switches between type of events. @default 0
     * @param {number} [log] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof StartListener
     * @date 2023/03/19.
     * @version 0.3.0  @date 2023/03/20. See Changelog on this date.
     * @version 0.4.1  @date 2023/03/31.
     * @version 0.4.2  @date 2023/04/02
     */
    evaluateEventType(event, eventIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateEventType()`) {
        const check = log;
        // Object: Key: Value map for click and other event handlers types
        const eventNameMap = {
            1: "click",
            default: `${locname}'s Unknown Event Type`,
        };
        // Object: Key: Value map for error strings
        const errOutMap = {
            1: "not set",
            2: "not typeof: string literal",
            default: "Null | Undefined",
        };
        // checks if param is not null or undefined, and returns the parameter, else throws an Error.
        if ((event ?? false) && typeof event === "string") {
            return event;
        }
        // checks if param is null or undefined, and throws an Error.
        if ((event ?? true) || typeof event !== "string") {
            const eventName = eventNameMap[eventIndex] || eventNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is ${
                event ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(
                event,
                errmessage,
                check,
                `${locname}: Wrong Event provided: ${eventNameMap[1]} is needed`
            );
            throw new Error(errmessage);
        }
    }
}

export { StartListener };
