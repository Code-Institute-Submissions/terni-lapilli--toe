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
    userMoves = document.querySelectorAll(".cell");
    newGame = new Game("X", "O");
    eventType = "";
    fileName = "MoveListener.js";
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
    constructor(moves, game, evnt, locname = `Move Listener Constructor`) {
        this.userMoves = this.evaluateParameter(moves, 1, 10);
        this.newGame = this.evaluateParameter(game, 2, 10);
        this.eventType = this.evaluateEventType(evnt, 1, 10);

        try {
            // Assign Moves Listener on a Move
            this.setListeners(this.userMoves, 3);
            this.onMove = this.onMove.bind(this);
        } catch (error) {
            this.onError(e, 5, 9, `${locname}`);
        }
    }

    /** seListeners [ ] TODO Error Handling
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
    setListeners(nodes, log = 1, locname = `${this.fileName}: SetListener`) {
        nodes.forEach((cell) => {
            // For each cell, (node | tile), add an event listener, assign the move to the listner and attatch to the game.
            cell.addEventListener(this.eventType, () => {
                this.onMove(cell.dataset.index);
                //Attatch debugger to the console and info output
                this.deBug._debug(
                    cell,
                    `Cell ${cell.dataset.index} attatches an ${this.eventType}. Waiting for...`,
                    log,
                    `${locname}`
                );
            });
        });
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
    onMove(i) {
        this.newGame.makeMove(i);
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
    onError(e, flag = 0, level = 9, locname = `${this.fileName}: onError()`) {
        const errorMessage = (() => {
            switch (flag) {
                case 1: // General Error:  Null | Not Defined
                    return `${locname} General Error: Instance of ${e.name} is not defined ${e.toString()}.`;
                case 2: // Type Error: Instance of
                    return `${locname} Type Error: Instance of: ${e.name}: ${e.toString()} is not correct type.`;
                case 3: // EventListener Binding Errors
                    return `${locname} Error: addListener() ${e.name}: ${e.toString()} did not get attached to ${
                        this.userMoves
                    }.`;
                default: // Uncatched Errors. Nothing Throwable yet
                    return `Uncaught Exception: ${e.name}: ${e.toString()}.`;
            }
        })();

        switch (flag) {
            case 1: // General Error:  Null | Not Defined
                this.deBug._debug(e, errorMessage, level, `${locname}`);
                throw new Error(errorMessage, { name: `${locname} General Error:`, stack: e });
            case 2: // Type Error: Instance of
                this.deBug._debug(e, errorMessage, level, `${locname}`);
                throw new TypeError(errorMessage, { name: `${locname} TypeError:`, stack: e });
            case 3: // EventListener Binding Errors
                this.deBug._debug(e, errorMessage, level, `${locname}: addListener Binding`);
                throw new Error(errorMessage, { name: `${locname} Binding Error:`, stack: e });
            default: // Uncatched Errors
                this.deBug._debug(e, errorMessage, level, `${locname}`);
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
    evaluateParameter(param, argIndex = 0, level = 1, locname = `${this.fileName}: evaluateParameter()`) {
        // Object: Key: Value map for parameter switching
        const paramNameMap = {
            1: "User's Move Target",
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
        } else {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            let errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is ${
                param ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(param, errmessage, level, `${locname}`);
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
    evaluateEventType(event, argIndex = 0, level = 1, locname = `${this.fileName}: evaluateEventType()`) {
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
            let errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is ${
                event ? errOutMap[1] : errOutMap[2]
            }`;
            this.deBug._debug(event, errmessage, level, `${locname}`);
            throw new Error(errmessage);
        }
    }
}

export { MoveListener };
