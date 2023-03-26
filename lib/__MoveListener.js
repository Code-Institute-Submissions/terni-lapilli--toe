/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __MoveListener,js class as module for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/20
  *@version 0.2.0
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */
import { Game } from "/lib/__Game.js";
import { GameDebug } from "/lib/__GameDebug.js";

/**
 * @name MoveListener
 * @kind class
 * @classdesc This class listens for move events and error handling.
 * @exports MoveListener
 * @usage Use: moveListener.setListeners runs on App.init()
 * @description This class listens for move events, my assigning event listeners to each cell from the UI, via a click event. Handles the user intercation on the UI f the game for each move.
 * @see NodeList.Node HTML static node list of the div with queried style selector.
 * @see Game The current instance of the game is passed into the listener.
 * @see string Event name
 * @see App
 * @author @iPoetDev.githib.com
 * @date 2023/03/13
 */
class MoveListener {
    /** Class Props [ ] TODO FREEZE
     * @prop {NodeListOf<Element>} userMoves @kind member
     * @prop {Game} newGame @kind member
     * @prop {string} eventType
     * @prop {GameDebug} deBug
     * @prop {string} fileName - FileNams identifer for Error Handling
     */
    deBug = new GameDebug();
    userMoves;
    newGame;
    eventType = "click";
    moveTargetID = ".cell";
    fileName = "MoveListener.js";
    logLevel = 5;
    errorLevel = 9;
    /** MoveListener constructor [ ] TODO checkS
     * @function constructor()
     * @kind function
     * @classdesc Creates an instance of MoveListener.
     * @param {NodeList} moves
     * @param {Game} game
     * @param {string} evnt Toggle a default value for testing purposes
     * @throws {Error} if the OnMove method fails to bind the user move targets `grid cells`. to level 9 by default
     * @type {MoveListener}
     * @constructs MoveListener
     * @memberof MoveListener
     */
    constructor(
        game,
        moveTargetID = ".cell",
        evnt = "click",
        log = this.logLevel,
        locname = `${this.fileName} Constructor`
    ) {
        this.userMoves = document.querySelectorAll(moveTargetID);
        const aGame = this.evaluateParameter(game, 2, log, `${locname}: Check game parameter`);
        this.newGame = aGame;
        this.eventType = this.evaluateEventType(evnt, 1, log, `${locname}: Check Event ID`);

        try {
            // Assign Moves Listener on a Move
            this.setListeners(
                this.userMoves,
                this.newGame,
                this.eventType,
                log,
                `${locname}: setListeners, update Game`
            );
            // this.onEachMove = this.onEachMove.bind(this);
        } catch (error) {
            this.onError(error, 1, this.errorLevel, `${locname}: onError: setListeners ${error.linenums}`);
        }
    }

    /** setListeners [ ] TODO Error Handling
     * @function setListeners
     * @kind function
     * @type {void}
     * @description Intialise each of the moves targets for the MoveListener class. Lops throught the NodeList iterator, list of Nodes, and addEventListener() to the click event type
     * @param {NodeList} nodes
     * @param {number} log Optional console outupt on success @default 1 Information @see module:GameDebug
     * @param {string} locname Console location of usage @default this.fileName
     * @usage Used to link the user moves to the EventListeners and bind to each move @constructor
     * @memberof MoveListener
     * @date 2023/03/09
     * @date 2023/03/20
     * [ ] TODO @date 2023/03/20 Add try.. catch error handling, @note Not sure best practice forEach loops with error handling.
     */
    setListeners(nodes, game, evnt, log = this.logLevel, locname = `${this.fileName}: setListener()`) {
        nodes.forEach((cell) => {
            cell.addEventListener(evnt, this.onClick.bind(this, cell));
            this.onEachMove(game, cell.dataset.index, log, `${locname}: onEachMove()`);
        });
    }

    onClick(cell) {
        if (!cell.textContent) {
            const moveOutcome = this.newGame.makeMove(cell.dataset.index);
            if (moveOutcome) {
                cell.textContent = moveOutcome;
            }
            return;
        }
        console.log("Cell already taken");
    }

    /** onMove [ ] TODO: FREEZE
     * @function onMove
     * @kind function
     * @type {void}
     * @description Attatch the move's targetto the game
     * @param {*} i - The index of the cell targeted for the move
     * @usage On each move, listen for when event emitted and attatch to the game's controller
     * @memberof MoveListener
     * @see Game.onMove() @see module:Game
     * @date 2023/03/09
     * @date 2023/03/20
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    onEachMove(game, i, log = this.logLevel, locname = `${this.fileName}: onEachMove()`) {
        const message = `Cell ${i} attatches on ${this.eventType}. Waiting for...${game}`;
        this.deBug._debug(game, message, log, `${locname}: Check ${game.toString()}`); //remove as needed
        this.deBug._debug(i, message, log, `${locname}: Check ${i.toString()}`); //remove as needed
        game.makeMove(i);
    }

    /** onError: [ ] TODO: FREEZE
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {*} e error object for Try/Catch exceptions and/general objects.
     * @param {number} [flag] Switches which error is to be thrown. @default 0
     * @param {number} [level] Debug level for the error. @default 9
     * @param {*} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {[Listener]Error} ListenerError, used for Binding errors
     * @memberof MoveListener
     * [ ] TODO @description: Move to it's own class {GameError} for project level error handling. Needs more use cases/scenarios.
     * [ ] TODO @description [ ] TODO => Avoids overloading function using a switch statement & flags
     * @date 2023/03/20
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    onError(error, errflag = 0, level = this.errorLevel, locname = `${this.fileName}: onError()`) {
        const errorMessage = (() => {
            switch (errflag) {
                case 1: // General Error:  Null | Not Defined
                    return `${locname} General Error : Instance of ${error.name} is not defined ${error.toString()}.`;
                case 2: // Type Error: Instance of
                    return `${locname} Type Error : Instance of: ${
                        error.name
                    }: ${error.toString()} is not correct type.`;
                case 3: // EventListener Binding Errors
                    return `${locname} Error: addListener() ${
                        error.name
                    }: ${error.toString()} did not get attached to ${this.userMoves}.`;
                default: // Uncatched Errors. Nothing Throwable yet
                    return `Uncaught Exception: ${error.name}: ${error.prototype.name} ${error.toString()}.`;
            }
        })();

        switch (errflag) {
            case 1: // General Error:  Null | Not Defined
                this.deBug._debug(error, errorMessage, level, `${locname}`);
                throw new Error(errorMessage, { name: `${locname} General :`, stack: e });
            case 2: // Type Error: Instance of
                this.deBug._debug(error, errorMessage, level, `${locname}`);
                throw new TypeError(errorMessage, { name: `${locname}  Type: :`, stack: e });
            case 3: // EventListener Binding Errors
                this.deBug._debug(error, errorMessage, level, `${locname}: addListener Binding`);
                throw new Error(errorMessage, { name: `${locname} Binding Error:`, stack: e });
            default: // Uncatched Errors
                this.deBug._debug(error, errorMessage, level, `${locname}`);
                break;
        }
    }

    /** evaluateParameter [ ] TODO: FREEZE
     * @function evaluateParameter
     * @kind function
     * @returns {string} Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*} param Parameter under evaluation
     * @param {number} [argIndex] Optional, switches between type of parameters. @default 0
     * @param {number} [level] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof MoveListener
     * @date 2023/03/20
     * @note This has the capcity to check other parameters, but is not implemented.
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    evaluateParameter(param, argIndex = 0, log = this.errorLevel, locname = `${this.fileName}: evaluateParameter()`) {
        // Object: Key: Value map for parameter switching
        const paramNameMap = {
            1: "Game",
            2: "User's Move Target",
            default: `${locname}'s Arguments: ${argIndex} & ${param}`,
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

        if (param ?? true) {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is ${
                param ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(param, errmessage, log, `${locname}: Parameter Error`);
            throw new Error(errmessage);
        }
    }
    /** evaluateEventType [ ] TODO: FREEZE
     * @function evaluateEventType
     * @kind function
     * @returns {string} Returns the event type
     * @description checks for presnce of event and returns its
     * @usage Stanitise the constructor (evnt) (eventType) before assignment to the  event listener.
     * @param {*} event Event under evaluation
     * @param {number} [argIndex] Optional, switches between type of events. @default 0
     * @param {number} [level=1] Optional, determine debugging level @default 1
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof MoveListener
     * @date 2023/03/19
     * @note This has the capcity to check other future event types, but is not implemented.
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    evaluateEventType(event, argIndex = 0, log = this.errorLevel, locname = `${this.fileName}: evaluateEventType()`) {
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
        } else {
            const eventName = eventNameMap[argIndex] || eventNameMap.default;
            const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is ${
                event ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(event, errmessage, log, `${locname} EventType Error`);
            throw new Error(errmessage);
        }
    }
}

export { MoveListener };
