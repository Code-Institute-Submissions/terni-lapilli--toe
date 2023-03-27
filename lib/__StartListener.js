/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __StartListener.js class as  module for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/19
  *@version 0.2.0
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */
import { Game } from "/lib/__Game.js";
import { GameDebug } from "/lib/__GameDebug.js";
// import {GameConfig} from '/lib/__GameConfig.js'

/** [ ] TODO FREEZE JSDocs
 * @name StartListener
 * @kind class
 * @classdesc This class listener for the Start Button event when the user clicks on the Game start button.
 * @export StartListener
 * @prop {GameDebug} deBug - Game object from the App class's instance
 * @prop {Element} startButton - Button object from the App class's instance
 * @prop {Game} newGame - Game object from the App class's instance
 * @prop {String} eventType - Event: User Click events, onClick events
 * @function addListener Assigned the NodeList listener to the Start Button event when the user clicks on it.
 * @function onStart Bings the start button to the StartListener class, and starts a new game.
 * @function onError Error messages according to flags and location
 * @function evaluateParameter checks the parameter presence, and returns the parameter.
 * @function evaluateEventType checks the event type is a string, and returns the event type.
 * @date 2023/03/09
 * @date 2023/03/19 @version 0.3.0
 * @version 0.4.0 TODO @date 2023/03/24. See Changelog on this date. #4 @link https://github.com/iPoetDev/terni-lapilli--toe/issues/4
 */
class StartListener {
    /** Class Props [ ] TODO: FREEZE
     * @prop {GameDebug} deBug - Game Debugger to console
     * @prop {Element} startButton - Button object from the App class's instance
     * @prop {Game} newGame - Game object from the App class's instance
     * @prop {string} eventType - Event: User Clicks events, onClick events
     * @prop {string} fileName - FileName identifer for Error Handling
     */
    deBug = new GameDebug();
    // startButton = document.querySelector("#start");
    startButton;
    newGame;
    eventType = "click";
    btnID = "#start";
    fileName = "StartListener.js";
    logLevel = 0; // Logger Output cleared
    errorLevel = 9; // Logger Full Stack Inspector

    /** StartListener constructor [ ] TODO INSPECT ISSUE 4 checkS
     * @function constructor
     * @kind function
     * @classdesc Creates an instance of StartListener.
     * @param {Element} button
     * @param {Game} game
     * @param {string} evnt Toggle a default value for testing purposes
     * @throws {Error} if the addListener method fails to attach the start button, to level 9 by default
     * @type {StartListener}
     * @constructs StartListener
     * @memberof StartListener
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    constructor(game, btnID = "#start", evnt = "click", log = this.logLevel, locname = `${this.fileName} Constructor`) {
        //Santitise the @param game and THEN assign it to the member field.
        const aGame = this.evaluateParameter(game, 2, 0);
        this.newGame = aGame;
        //Santitise the @param button ident before asssigment to the member field.
        this.startButton = document.querySelector(btnID);
        //Santitise the @param evnt before assignment to the member field. 1 = click event
        this.eventType = this.evaluateEventType(evnt, 1, 10);
        try {
            // Attatch Listener to Start Button
            this.addListener(this.startButton, this.newGame, log, `${locname}: addListener, new Game`);
            this.deBug._debug(this.startButton, `${this}: addListener`, log, `${locname}: addListener, new Game`);
        } catch (e) {
            this.onError(e, 5, 9, `${locname}`);
        }
    }

    /** onInit() initialises the game from EventLister firing. [x] 0.4.0 FREEZE
     * @function onInit()
     * @kind function
     * @classdesc initialiseS an instance of StartListener as a custome Event Listener.
     * @param {Game} game
     * @param {string} log Class level log flagging @default this.logLevel Class log level
     * @param {string} locname Class level tracing and method tracing in logger @default this.fileName
     * @throws {Error} General error for when is unknown error
     * @memberof StartListener
     * @version 0.3.0 DONE @date 2023/03/22.
     * @version 0.4.0 FREEZE @date 2023/03/27. Screenshots and update arch docs
     */
    onInit(game, log = this.logLevel, locname = `${this.fileName}: onInit()`) {
        try {
            this.deBug._debug(game, `param: game ${game}`, log, `${locname}`);
            // Eval a 2nd time, the game param, OVERKILL??
            const _game = this.evaluateParameter(game, 2, (log = 1), `${locname}: game Eval`);
            // Check if game is falsey, which is set when a game is constructed
            if (!_game.gameRunning) {
                let message = `const: game ${_game} && truthy is ${_game.gameRunning}`;
                // Initialise the game and log to Trace (8) level
                this.deBug._debug(_game, message, (log = 8), `${locname}: Game is initialised`);
                // Initialise the game and log to Trace (5) level
                _game.onInit(5);
            }
        } catch (e) {
            this.onError(e, 1, this.errorLevel, `${locname}: Initialisation Error `);
        }
    }

    /** addListener [ ] 0.4.0
     * @function addListener
     * @kind function
     * @type {void}
     * @description Adds an event listener based on the event type to the button, and generally error handles the any unforeseen issues, and logs to console.
     * @param {Element} element The html element queired
     * @param {number} log Optional console output on success @default 1 Information @see module:GameDebug
     * @param {number} check Optional console output on error @default 5 Trace @see module:GameDebug
     * @param {number} listener Error type flag @default 3 @see function:StartListener.onError
     * @param {string} locname Console location of usage @default this.fileName
     * @usage Used on instantiaion of this the {StartListener} instance, in the @constructor
     * @throws {Error} if the html element type null | undefined & logs to console.
     * @memberof StartListener
     * @date 2023/03/09
     * @date 2023/03/19 @version 0.3.0 done
     * @date 2023/03/24.@version 0.4.0 @see #4,#7 and Snapshots
     */
    addListener(
        element,
        game,
        log = this.logLevel,
        check = this.errorLevel,
        errlistener = 3,
        locname = `${this.fileName}: addListener()`
    ) {
        try {
            if ((element ?? false) || (game ?? false)) {
                //Message string
                const message = `Button: ${element} & game ${game} attached`;
                //Log to console
                this.deBug._debug(this, message, log, `${locname}: Attatch Listener to element`);
                // Bind this StartListener to to Element Event  listener using onStart function name(params) {
                return element.addEventListener(this.eventType, this.onInit.bind(this, game));
            }
        } catch (e) {
            const errmessage = `${e.name} : ${element || game} is not attached`;
            this.deBug._debug(element || game, errmessage, check, `${locname}: AddListener Error`);
            this.onError(e, errlistener, check, `${locname}: AddListener Error`);
        }
    }

    /** onError [ ] 0.4.0  TODO: FREEZE
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {*} error error object for Try/Catch exceptions and/general objects.
     * @param {number} [flag] Switches which error is to be thrown. @default 0
     * @param {number} [log] Debug level for the error. @default 9
     * @param {*} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {[Listener]Error} ListenerError, used for Binding errors
     * @memberof StartListener
     * @date 2023/03/17
     * @date 2023/03/19
     * @version 0.3.0  DONE @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0  FREEZE @date 2023/03/24. See Changelog on this date.
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
        const errorMessage = (() => {
            switch (errflag) {
                case 1: // General Error:  Null | Not Defined
                    return `${locname} General Error: Instance of ${e.name} is not defined ${e.toString()}.`;
                case 2: // Type Error: Instance of
                    return `${locname} Type Error: Instance of: ${e.name}: ${e.toString()} is not correct type.`;
                case 3: // EventListener Binding Errors
                    return `${locname} Error: addListener() ${e.name}: ${e.toString()} did not get attached to ${
                        this.startButton
                    }.`;
                default: // Uncatched Errors. Nothing Throwable yet
                    return `Uncaught Exception: ${e.name}: ${e.toString()}.`;
            }
        })();

        switch (errflag) {
            case 1: // General Error:  Null | Not Defined
                this.deBug._debug(error, errorMessage[errflag], log, `${locname}`);
                throw new Error(errorMessage, { name: `${locname} General Error:`, stack: error });
            case 2: // Type Error: Instance of
                this.deBug._debug(error, errorMessage[errflag], log, `${locname}`);
                throw new TypeError(errorMessage, { name: `${locname} TypeError:`, stack: error });
            case 3: // EventListener Binding Errors
                this.deBug._debug(error, errorMessage[errflag], log, `${locname}: addListener Binding`);
                throw new Error(errorMessage, { name: `${locname} Binding Error:`, stack: error });
            default: // Uncatched Errors
                this.deBug._debug(error, errorMessage.default, log, `${locname}`);
                break;
        }
    }

    /** evaluateParameter [ ] 0.4.0 : FREEZE
     * @function evaluateParameter
     * @kind function
     * @returns {string} Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*,class} param Parameter under evaluation
     * @param {number} [argIndex] Optional, switches between type of parameters. @default 0
     * @param {number} [log] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof StartListener
     * @date 2023/03/19
     * @note This has the capcity to check other parameters, but is not implemented.
     * @version 0.3.0  DONE @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0  FREEZE @date 2023/03/27. See Changelog on this date.
     */
    evaluateParameter(param, argIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter()`) {
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
            this.deBug._debug(param, errmessage, log, `${locname}: evaluateParameter()`);
            throw new Error(errmessage);
        }
    }

    /** evaluateEventType [ ] TODO: FREEZE
     * @function evaluateEventType
     * @kind function
     * @returns {string} Returns the event type
     * @description checks for presnce of event and returns its
     * @usage Stanitise the constructor (evnt) (eventType) before assignment to the  event listener.
     * @param {string} event Event, as a string literal, under evaluation
     * @param {number} [argIndex] Optional, switches between type of events. @default 0
     * @param {number} [log] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof StartListener
     * @date 2023/03/19
     * @note This has the capcity to check other future event types, but is not implemented.
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    evaluateEventType(event, eventIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateEventType()`) {
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
        if ((event ?? true) || !typeof event === "string") {
            const eventName = eventNameMap[eventIndex] || eventNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is ${
                event ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(event, errmessage, log, `${locname}: Wrong Event provided: ${eventNameMap[1]} is needed`);
            throw new Error(errmessage);
        }
    }
}

export { StartListener };
