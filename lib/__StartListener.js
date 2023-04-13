// @ts-check
/** StartListener: 001 : Module: @version v0.5.0 @date 2023/04/13
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
import { Game } from "../lib/__Game.js";
import { GameDebug } from "../lib/__GameDebug.js";

/** StartListener: 002 Class Defintion @version 0.5.0 @date 2023/04/13
 * @name StartListener
 * @kind class
 * @classdesc This class listener for the Start Button event when the user clicks on the Game start button.
 * @export StartListener
 * @prop {GameDebug} deBug @kind member @private
 * @prop {Game} newGame @kind member @private
 * @prop {*} startButton @kind member @private
 * @prop {String} eventType @kind member @private
 * @prop {string} buttonId @kind member @public
 * @prop {string} startClicked @kind member @public
 * @prop {string} fileName @kind member @private
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
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
 * @date 2023/04/13 @version 0.5.0
 */
class StartListener {
    /** Class Props @version 0.5.0 @date 2023/04/13
     * @prop {GameDebug} deBug Console logger
     * @prop {Element} startButton Start Button
     * @prop {Game} newGame Current game instance
     * @prop {String} eventType Click event @default click
     * @prop {string} btnId Start Button id @default #start
     * @prop {string} startClicked Initiale button state @default "NOSTART"
     * @prop {string} fileName Trace for File/Method @default StartListener.js
     * @prop {number} logLevel Console logging level @default 0
     * @prop {number} errorLevel Console error level @default 9
     */

    //
    /**@type {GameDebug} */
    deBug = new GameDebug();
    startButton;
    /**@type {Game} */
    newGame;
    eventType = "click";
    /**@type {string} */
    buttonID = "#start";
    /**@type {string} */
    startClicked = `NOSTART`;
    /**@type {string} */
    fileName = "StartListener.js";
    /**@type {number} */
    logLevel = 8; // Logger Output cleared
    /**@type {number} */
    errorLevel = 8; // Logger Full Stack Inspector

    /** StartListener constructor @version 0.5.0  @date 2023/04/13
     * @function constructor
     * @kind function
     * @classdesc Creates an instance of StartListener, to listen for button  press.
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
     * @version 0.4.1 @date 2023/03/31
     * @version 0.4.2 @date 2023/04/02 Removes this. as a reference for constructors, dehosit params to block vars,
     * @version 0.5.0 @date 2023/04/13 Bumped: Assigned Object+Property pattern: listener object.
     */
    constructor(game, btnID = "#start", evnt = "click", log = 0, filename = `StartListener.js`) {
        // 1: Assign Block vars
        const logs = log;

        const listener = {
            game: {
                param: game,
                input: this.evaluateParameter(game, 2, logs),
            },
            button: {
                state: false,
                id: btnID,
                start: document.querySelector("#start"),
                this: this.startButton,
                message: `${this.startButton}: addListener`,
                trace: `${filename}: addListener, new button, new Game`,
                pressed: `You have clicked the start button`,
            },
            event: {
                param: evnt,
                type: this.evaluateEventType(evnt, 1, logs),
            },
            casts: {
                NOTNULL: false,
                ISNULL: true,
            },
            outputs: {
                location: filename,
                message: ``,
                trace: `${filename}: Listener`,
            },
            error: {
                flag: 1,
                message: ``,
                trace: `${filename}: AddListener Error`,
                console: this.errorLevel,
            },
            logs: {
                console: log,
            },
        };
        // Update the globals with instance game, start button, and event type
        this.newGame = listener.game.input;
        this.startButton = listener.button.start;
        this.eventType = listener.event.type;
        try {
            if (listener.button.start ?? listener.casts.NOTNULL) {
                // 5: Attatch Listener to Start Button
                //@ts-ignore
                this.addListener(listener, listener.logs.console, listener.button.trace);
            }
            this.deBug._debug(
                listener.button.start,
                listener.button.message,
                listener.logs.console,
                listener.button.trace
            );
        } catch (error) {
            this.onError(error, listener.error.flag, listener.error.console, listener.error.trace);
        }
    }

    /** onInit() @version 0.5.0 @date 2023/04/13
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
     * @version 0.5.0 @date 2023/04/13
     */
    onInit(game, log = this.logLevel, locname = `${this.fileName}: onInit()`) {
        // 1: Set Object+Property Pattern: starts object
        const starts = {
            CURRENT: {
                /**@type {Game} */
                game: game,
                status: this.startClicked,
                initmessage: `This game is initialising`,
                beingsmessage: `This game has yet to being/start`,
                notmessage: `This game has failed to start`,
                activemessage: `The game's start button is BEING pressed`,
                donemessage: `The game's start button has been pressed. Game Started`,
            },
            states: {
                INIT: `INITIAL`,
                NOSTART: `NOSTART`,
                NOTSTARTED: `NOTSTARTED`,
                START: `START`,
                STARTED: `STARTED`,
            },
            message: {
                game: `${locname}: Game Running`,
            },
            error: {
                flag: 1,
                message: ``,
                trace: `${locname}: Initialisation Error`,
                console: this.errorLevel,
            },
            traces: {
                game: `${locname}: Game is initialised`,
            },
            casts: {
                NOTNULL: false,
                ISNULL: true,
            },
            logs: {
                console: log,
            },
        };

        const actions = {
            BEINGS: starts.CURRENT.game.gameRunning === starts.states.NOSTART,
            START: starts.CURRENT.game.gameRunning === starts.states.START,
            FAILSTO: starts.CURRENT.game.gameRunning === starts.states.NOTSTARTED,
        };
        // 2: onInit is boundd to an event lister, expect void return.
        try {
            // NO START is initialisation default.
            if (actions.BEINGS) {
                // NOSTART|BEGIN => START
                starts.CURRENT.game.gameRunning = starts.states.START;
                starts.CURRENT.status = starts.states.START;
                this.deBug._debug(starts.CURRENT.game, starts.message.game, starts.logs.console, starts.traces.game);
                this.newGame.onInit(starts.CURRENT.status, starts.logs.console, starts.traces.game);
                window.alert(starts.CURRENT.activemessage);
                //Update the global flag => START
                this.startClicked = starts.CURRENT.status;
            }
            // Sets state to step for game running, post start button clicked.
            if (actions.START) {
                // START => STARTED
                starts.CURRENT.game.gameRunning = starts.states.STARTED;
                starts.CURRENT.status = starts.states.STARTED;
                window.alert(starts.CURRENT.donemessage);
                //Update the global flag => STARTED
                this.startClicked = starts.CURRENT.status;
            }
            // Resets back to initials state
            if (actions.FAILSTO) {
                // NOTSTART resets to => NOSTART || BEGIN
                starts.CURRENT.game.gameRunning = starts.states.NOSTART;
                starts.CURRENT.status = starts.states.NOSTART;
                window.alert(starts.CURRENT.notmessage);
                //Update the global flag => NOSTART
                this.startClicked = starts.CURRENT.status;
            }

            // Default: NOSTART => NOSTART || NOTSTARTED => NOSTART
            starts.CURRENT.game.gameRunning = starts.states.NOSTART;
            starts.CURRENT.status = starts.states.NOSTART;
            window.alert(starts.CURRENT.beginmessage);
            this.startClicked = starts.CURRENT.status;
        } catch (error) {
            this.onError(error, starts.error.flag, starts.error.console, starts.error.trace);
        }
    }

    /** isStartClicked @version 0.5.0 @date 2023/04/13
     * @function isStartClicked
     * @kind function
     * @description checks if a start button is clicked (initial is false), and parrellels the the game active state to true.
     * @param {Game} game
     * @returns {string}  String state of
          1) BEGIN| NOSTART ==> return START
          1) START ==> return STARTED
          1) FAILSTO ==> return NOSTART
          1) BEGIN| NOSTART ==> return START
     * @memberof Game
     * @version 0.4.1 @date 2023/03/30
     * @version 0.5.0 @date 2023/04/13  Bumped. Not in use yet. Dupe with onInit (returns void).
     * @usage Useful of you need to check for current start stated for resets to new game, resumes from pause.
     */
    isStartClicked(game) {
        const starts = {
            CURRENT: {
                game: game,
                status: this.startClicked,
                initmessage: `This game is initialising`,
                beingsmessage: `This game has yet to being/start`,
                notmessage: `This game has failed to start`,
                activemessage: `The game's start button is BEING pressed`,
                donemessage: `The game's start button has been pressed. Game Started`,
            },
            states: {
                INIT: `INITIAL`,
                NOSTART: `NOSTART`,
                NOTSTARTED: `NOTSTARTED`,
                START: `START`,
                STARTED: `STARTED`,
                RUN: `RUN,`,
            },
            casts: {
                NOTNULL: false,
                ISNULL: true,
            },
        };

        const actions = {
            BEING: starts.CURRENT.status === starts.states.NOSTART,
            STARTS: starts.CURRENT.status === starts.states.START,
            FAILSTO: starts.CURRENT.status === starts.states.NOSTARTED,
            BEGUN: starts.CURRENT.status === starts.states.STARTED,
        };

        if (actions.BEING) {
            starts.CURRENT.status = starts.states.START;
            this.startClicked = starts.CURRENT.status;
            // @ts-ignore
            window.alert(starts.current.activemessage);
            return starts.CURRENT.status;
        }

        if (actions.STARTS) {
            starts.CURRENT.status = starts.states.STARTED;
            starts.CURRENT.game.gameRunning = starts.CURRENT.states.RUN;
            this.startClicked = starts.CURRENT.status;
            // @ts-ignore
            window.alert(starts.CURRENT.donemessage);
            return starts.CURRENT.status;
        }

        if (actions.FAILSTO) {
            starts.CURRENT.status = starts.states.NOSTART;
            this.startClicked = starts.CURRENT.status;
            // @ts-ignore
            window.alert(`Failed to so try again: Begin ${starts.current.beginsmessage}`);
            return starts.CURRENT.status;
        }

        if (actions.BEGUN) {
            starts.CURRENT.game.gameRunning = starts.CURRENT.states.RUN;
            window.alert(`${starts.current.donemessage}`);
            return starts.states.STARTED;
        }

        starts.CURRENT.status = starts.states.NOTSTARTED;
        window.alert(starts.CURRENT.notmessage);
        this.startClicked = starts.CURRENT.status;
        return starts.CURRENT.status;
    }

    /** addListener @version 0.5.0 @date 2023/04/13
     * @function addListener
     * @kind function
     * @description Adds an event listener based on the event type to the button, and generally error handles the any unforeseen issues, and logs to console.
     * @param {object} listener The listerner data object
     * @param {number} log Optional console output on success @default 1 Information @see module:GameDebug
     * @param {string} locname Console location of usage @default this.fileName
     * @usage Used on instantiaion of this the {StartListener} instance, in the @constructor
     * @throws {Error} if the html element type null | undefined & logs to console.
     * @memberof StartListener
     * @date 2023/03/09
     * @date 2023/03/19 @version 0.3.0 done
     * @date 2023/03/24.@version 0.4.0 and Snapshots
     * @date 2023/05/13.@version 0.5.0 Bumped. Passed the constructor Listern object, this shows the
     * look of passing state machine objects for consistency. Removed button and game refernece,as bundled in the listerer object. Improved readability/maintainability.
     */
    addListener(listener, log = this.logLevel, locname = `${this.fileName}: addListener()`) {
        //Update Listener values
        listener.location = locname;
        listener.logs.console = log;
        listener.trace = `${listener.location}: Listener Debug`;
        listener.error.console = 3;
        listener.error.trace = `${locname}: AddListener Error`;
        try {
            if ((listener.button.start ?? listener.casts.NOTNULL) || (listener.game.input ?? listener.casts.NOTNULL)) {
                //Send to console & windows alert for testing
                this.deBug._debug(listener, listener.outputs.message, listener.logs.console, listener.outputs.trace);
                window.alert(listener.button.pressed);
                // Bind this StartListener to to Element Event  listener using onStart function name(params) {
                return listener.button.start.addEventListener(
                    listener.event.type,
                    this.onInit.bind(this, listener.game.input)
                );
            }
        } catch (error) {
            listener.error.message = `${error.name} : ${listener.button.start || listener.game.input} is not attached`;
            this.deBug._debug(listener, listener.error.message, listener.error.console, listener.error.trace);
            this.onError(error, listener.error.flag, listener.error.console, listener.error.trace);
        }
    }

    /** onError @version 0.5.0 @date 2023/04/13
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {Error} error object for Try/Catch exceptions and/general objects.
     * @param {number} [errflag] Switches which error is to be thrown. @default 0
     * @param {number} [log] Debug level for the error. @default 9
     * @param {string} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {ListenerError} ListenerError, used for Binding errors
     * @memberof StartListener
     * @version 0.3.0 @date 2023/03/20. See Changelog on this date.
     * @version 0.4.0 @date 2023/03/24. See Changelog on this date.
     * @version 0.5.0 @date 2023/04/13 Bumped. Remoduled duel switch to  Object+Property pattern and switch for error throwing. Cleaner readability, maintainability for error state values.
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
        const errors = {
            GENERAL: {
                message: `${locname} General Error: Instance of ${error.name} is not defined ${error.toString()}.`,
                console: log,
                trace: `${locname}: General: ${error.name}`,
                flag: 1,
            },
            TYPE: {
                message: `${locname} Type Error: Instance of: ${error.name}: ${error.toString()} is not correct type.`,
                console: log,
                trace: `${locname}: Type: ${error.name}`,
                flag: 2,
            },
            LISTENER: {
                message: `${locname} Error: addListener() ${error.name}: ${error.toString()} did not get attached to ${
                    this.startButton
                }.`,
                console: log,
                trace: `${locname}: Listener: ${error.name}`,
                flag: 3,
            },
            default: {
                message: `Uncaught Exception: ${error.name}: ${error.toString()}.`,
                console: log,
                trace: `${locname}: Unknown: ${error.name}`,
                flag: 0,
            },
        };

        switch (errflag) {
            case errors.GENERAL.flag: // General Error:  Null | Not Defined
                this.deBug._debug(error, errors.GENERAL.message, errors.GENERAL.console, errors.GENERAL.trace);
                throw new Error(`${errors.GENERAL.trace} :${errors.GENERAL.message}`);
            case errors.TYPE.flag: // Type Error: Instance of
                this.deBug._debug(error, errors.TYPE.message, errors.TYPE.console, errors.TYPE.trace);
                throw new Error(`${errors.TYPE.trace} :${errors.TYPE.message}`);
            case errors.LISTENER.flag: // EventListener Binding Errors
                this.deBug._debug(error, errors.LISTENER.message, errors.LISTENER.console, errors.LISTENER.trace);
                throw new Error(`${errors.TYPE.trace} :${errors.TYPE.message}`);
            default: // Uncatched Error
                this.deBug._debug(error, errors.default.message, errors.default.console, errors.default.trace);
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
