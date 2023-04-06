/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __MoveListener,js class as module for the game of TicTacToe
 * @kind module
 * @exports MoveListener
 * @type {MoveListener}}
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/13 @version 0.1.2
 * @date 2023/03/20 @version 0.3.0
 * @date 2023/03/26 @version 0.4.0 @note Issue#14
 * @date 2023/03/29 @version 0.4.1 onClick is WIP, as are update[On|At]Action methods as UI interfaces
 * @date 2023/04/02 @version 0.4.2
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 */
import { Game } from "../lib/__Game.js";
import { GameDebug } from "../lib/__GameDebug.js";

/** MoveListener 0.4.1
 * @name MoveListener
 * @kind class
 * @classdesc This class listens for user's mouse actions as move events, UI refreshes,  game terminal states and error handling on each move
 * @summary Major UI controller for most common User interaction, mouse clicks, and UI actions and UI responses.
 * @exports MoveListener
 * @usage Use: moveListener.setListeners runs on App.init()
 * @description This class listens for move events, my assigning event listeners to each cell from the UI, via a click event. Handles the user intercation on the UI f the game for each move.
 * @prop {GameDebug} deBug @kind member @private
 * @prop {NodeLists} userMoves @kind member @private
 * @prop {Game} newGame @kind member @public
 * @prop {string} eventType @kind member @public
 * @prop {string} moveTargetID @kind member @public
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
 * @prop {string} fileName @kind member @private
 * @prop {boolean} disableUI @kind member @private
 * @function constructor @kind function @public
 * @function setListeners @kind function @private
 * @function onClick @kind function @private
 * @function updateOnMove @kind function @private
 * @function updateAtEnd @kind function @private
 * @function clearUI @kind function @public
 * @function onError @kind function @private
 * @function evaluateParameter @kind function @private
 * @function evaluateEventType @kind function @private
 * @date 2023/03/13 @version 0.1.2
 * @date 2023/03/20 @version 0.3.0
 * @date 2023/03/26 @version 0.4.0 @note Issue#14
 * @date 2023/03/29 @version 0.4.1 Class & Method bumped. Update of Class JSDoc. RaySnapped and Booked Marked.
 * @date 2023/03/29 @version 0.4.2 Bump methods, add message+trace, ts-ignore = code hotpost linting, refactored construcor signature, fixed boolean and default issues,
 * @author @iPoetDev.githib.com
 */
class MoveListener {
    /** Class Props @version 0.4.1 [x] FREEZE 2023/03/29
     * @prop {GameDebug} deBug @kind member
     * @prop {NodeLists} userMoves @kind member
     * @prop {Game} newGame @kind member
     * @prop {string} eventType @kind member @default click
     * @prop {string} moveTargetID @kind member @default .cell
     * @prop {string} fileName - FileNams identifer for Error Handling @default MoveListener.js
     * @prop {string} logLevel Class & method Info status to console @default 0
     * @prop {string} errorLevel Class & method error status to console @kind member @default 0
     * @prop {string} fileName - Flag to disable UI, prevent clicks app errors @since 0.4.1 @todo WIP
     */
    deBug = new GameDebug();
    userMoves;
    newGame = new Game();
    eventType = "click";
    moveTargetID = ".cell";
    fileName = "MoveListener.js";
    logLevel = 8;
    errorLevel = 9;
    validMoveState = false; /**@since 0.4.2 03/31 */
    disableUI = true;
    /** MoveListener constructor @version 0.4.1 [ ] FREEZE 2023/03/29
     * @function constructor()
     * @kind function
     * @classdesc Creates an instance of MoveListener & initialises the custom Event Listener.
     * @constructs MoveListener
     * @type {MoveListener}
     * @param {Game} game Instance of current game
     * @param {string} [moveTargetID] Grid cell class identifer @default .cell
     * @param {string} [event] Toggle a default value for testing purposes @default click
     * @param {number} [log] Status logging to cosnsole @default this.logLevel
     * @param {string} [filename] Status logging to cosnsole @default MoveListener.js
     * @throws {Error} if the setListerner method fails to initialise the game event listeners for  user move targets `grid cells`
     * @memberof MoveListener
     * @date 2023/03/10 @version 0.1.2
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/26 @version 0.4.0 @note Issue#14
     * @date 2023/03/29 @version 0.4.1 Minor: symbol name & default value change, big update to JSDoc
     * @date 2023/04/02 @version 0.4.2
     */
    constructor(
        game,
        moveTargetID = ".cell",
        event = "click",
        log = 0,
        // @ts-ignore
        filename = `MoveListener.js`
    ) {
        const logs = log;
        const checks = this.errorLevel;
        const locname = `${filename}: constructor()`;
        this.userMoves = document.querySelectorAll(moveTargetID);
        const aGame = this.evaluateParameter(game, 2, logs, `${locname}: Check game parameter`);
        const type = "string";
        //@ts-ignore
        this.eventType = this.evaluateEventType(event, 1, type, logs, `${locname}: Check Event ID`);

        try {
            // Assign Moves Listener on a Move
            // @ts-ignore
            this.setListeners(this.userMoves, aGame, this.eventType, logs, `${locname}: setListeners, update Game`);
        } catch (error) {
            this.onError(error, 1, checks, `${locname}: onError: setListeners ${error.linenums}`);
        }
    }

    /** setListeners @version 0.4.1 2023/03/29
     * @function setListeners
     * @kind function
     * @description Intialise each of the moves targets, Iteratively binds each node cell, current game, grid's nodes on the click event.
     * @usage Used to link the user moves to the EventListeners and bind to each move to a node's cell on the grid @constructor
     * @param {NodeList} nodes Current nodes of grid cells
     * @param {Game} game Current game
     * @param {string} event Click event
     * @param {number} [log] Optional console outupt on success @default this.logLevel
     * @param {string} [locname] Console location of usage @default this.fileName
     * @memberof MoveListener
     * @date 2023/03/09 @version 0.1.2
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/26 @version 0.4.0
     * @date 2023/03/26 @version 0.4.1: Pass nodes onClick stack for clearing UI later, symbol name change, update of JSDocs
     * @date 2023/04/02 @version 0.4.2
     */
    setListeners(nodes, game, event, log = this.logLevel, locname = `${this.fileName}: setListener()`) {
        const logs = log;
        nodes.forEach((cell) => {
            debugger;
            cell.addEventListener(event, this.onClick.bind(this, cell, game, nodes));
            const setlistentrace = `${locname}: onClick binds to ${cell}`;
            const setlistenmessage = `Event ${event} clicked and cell and game bounded to the onClick`; /**@todo: REMOVE*/
            this.deBug._debug(event, setlistenmessage, 8, setlistentrace); /**@todo: REMOVE*/
        });
    }

    /** onClick @version 0.4.1 @2023/04/01
     * @function onClick
     * @kind function
     * @description Attatch the move's target the game, On each user click, update the UI based on game state
     * @param {Node} cell The index of the cell targeted for the move
     * @param {Game} game Current instance of the game
     * @param {NodeList} nodes Nodes of the grid cells.
     * @param {number} [log] Log to console @default this.logLevel
     * @param {string} [locname] - Function tracing: Name off
     * @usage Use on binding, listen, checks game state, and update the UI
     * @memberof MoveListener
     * @see Game.onMove() @see module:Game
     * @date 2023/03/26 @version 0.1.0 => 0.4.0
     * @date 2023/03/26 @version 0.4.0  @note Issue#14
     * @date 2023/03/28-29. @version 0.4.1  @note Destructuring assignments. WIP. Testing focus
     * @date 2023/04/02 @version 0.4.2
     */

    // @ts-ignore
    onClick(cell, game, nodes, log = this.logLevel, locname = `${this.fileName}: onClick`) {
        const logs = 8;
        // JS42 suggested refactoring from individual assignments to a destructing assignments
        // @ts-ignore
        const index = cell.dataset.index; /*?+*/
        const moveId = parseInt(index); /*?+*/
        // @ts-ignore
        const value = cell.dataset.value; /*?+*/
        // @ts-ignore
        const state = cell.dataset.state; /*?+*/
        // @ts-ignore
        const row = cell.dataset.row; /*?+*/
        // @ts-ignore
        const col = cell.dataset.col; /*?+*/
        // @ts-ignore
        const coord = cell.dataset.coord; /*?+*/
        // @ts-ignore
        const content = cell.textContent.toString(); /*?+*/

        const onclickmessage = `${index}: ${moveId}: ${value}: ${state}: ${row}: ${col}: ${coord}: ${content}: `;
        const onclicktrace = `${locname}: display onClick Values`;
        this.deBug._debug(cell, onclickmessage, 8, onclicktrace);

        // 1. Test for illegal moves, if Cell has content and early return with user messagge
        // if (content) {
        //     // Good interface to check if start button is pressed or not, else early return and prompt user
        //     // Check to disable focus from div or prevent errors and prevent any further user actiion until game ui enabled/start button pressed.
        // }
        // 2.1 Game's Running State
        const ACTIVE = true;
        const INACTIVE = false;
        // 2.2 Game Terminus State
        const CONTINUE = false;
        const TERMINATE = true;
        debugger; /** TODO REMOVE */
        const outcome = game.makeMove(moveId, cell, game.gameRunning, logs, `${locname}: makeMove`); /*?+*/
        //
        const debugmsg = `Parse of game.makeMove is ${outcome} === True`;
        const debugtrace = `${locname}: Check outcome`;
        debugger;
        this.deBug._debug(outcome, debugmsg, logs, debugtrace); /** TODO REMOVE */

        debugger; /** TODO REMOVE */
        // onClick Action if Cell is free, Game is active, and Terminal state is false
        if (game.gameRunning === ACTIVE && outcome === CONTINUE) {
            this.updateOnMove(cell, game, outcome, logs, `${locname}: updateOnMove`);
            return;
        }

        debugger; /** TODO REMOVE */
        // No Game active and Terminal state true
        if (game.gameRunning === INACTIVE && outcome === TERMINATE) {
            this.updateAtEnd(nodes, game, outcome, logs, `${locname}: updateAtEnd`);
            return;
        }
    }
    // Hmmm, how do I check for cell occupancy on each click: getElementByID {Element}, {Node}
    /**
     * @param {string} content
     * @date 2023/03/28 @version 0.4.0
     * @date 2023/04/02 @version 0.4.2
     */
    checkCell(content) {
        return (content ?? true) || content !== "";
    }

    /** updateOnMove @version 0.4.1 NEW [X] WIP 2023/03/28
     * @function updateOnMove
     * @kind function
     * @description Utility method to update (writes to) a cell with the move's piece {string} as textual output.
     * @description Optionally, to update the board's internal data record on each click/on each move, with cell attributes.
     * @param {Node} cell Array of Grid cells
     * @param {Game} game Current game instance
     * @param {boolean} outcome End game flag === false
     * @param {number} [log] @default this.logLevel = 0
     * @param {string} [locname] - Filename for logging and tracing @default 0
     * @returns Nothing: Events just wait for the next event. No coupling of outputs
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     */
    updateOnMove(cell, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateOnMove()`) {
        const turnstart = `Next Turn: Let Next Player know: ${outcome}: ${game}:`;
        this.deBug._debug(outcome, turnstart, log, locname);
        debugger;
        const logs = log;
        //const content = cell.textContent.toString(); /*?+*/
        //const value = cell.dataset.value.toString(); /*?+*/
        const value = "X";
        //@ts-ignore
        const state = cell.dataset.state.toString(); /*?+*/
        const playingPiece = game.playedPiece;
        // @ts-ignore
        content = playingPiece;
        // @ts-ignore
        state = game.gameRunning;
        // @ts-ignore
        const piece = game.playedPiece;
        // @ts-ignore
        value = playingPiece;
        cell.textContent = "X";
        //@ts-ignore
        cell.dataset.value = value.toString();
        //@ts-ignore
        cell.dataset.state = state.toString();

        //@ts-ignore
        const element = document.getElementById(cell.id);
        // @ts-ignore
        const id = cell.id;
        // @ts-ignore
        const cellText = document.createTextNode(content.toString());
        // @ts-ignore
        element.textContent = playedPiece;
        //
        // @ts-ignore
        const turnupdate = `Next Turn: Move Updated: End State: ${outcome}: Game ${game}: State ${state}: Cell ${content}: Attr ${value}: Piece ${playingPiece}: Cell Text ${cellText}: ${element}`;
        this.deBug._debug(outcome, turnupdate, logs, `${locname}: Cell/Tile Updated`);
        //game.gameBoard.updateBoardCell(cell)
        return;
    }
    /**  updateAtEnd @version 0.4.1 NEW [X] WIP 2023/03/28
     * @function updateAtEnd
     * @kind function
     * @description Utility method to manage the terminal state of the UI and reset to clear current game.
     * @param {NodeList} nodes Array of Grid cells
     * @param {Game} game Current game instance
     * @param {boolean} outcome End game flag === false
     * @param {number} [log] @default this.logLevel = 0
     * @param {string} [locname] - Filename for logging and tracing @default 0
     * @returns Nothing: Events just wait for the next event. No need for further at end of game.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     */
    updateAtEnd(nodes, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateAtEnd()`) {
        const logs = log;
        const endmessage = `Game End: Offer a new Game: ${outcome}: ${game}: ${nodes}`;
        const usermessage = `End of Game. Inform all of End State`;
        this.deBug._debug(outcome, endmessage, logs, locname);
        game.clearCurrentGame(outcome);
        // @ts-ignore
        this.clearUI(nodes, logs, locname);
        game.gameRunning = false;
        //@ts-ignore
        this.newGame = game;
        // @ts-ignore
        this.newGame = undefined;
        console.log(usermessage);
        //Display winning Piece/Player
        //Offer to start a new Game
        //Update the UI/Refresh the UI
        return;
    }

    /** clearUI @version 0.4.2 NEW [X] WIP 2023/04/01
     * @function clearUI
     * @kind function
     * @description This function clears the text content of all grid cells, resets the disable UI to initial state.
     * @param {NodeList} nodes Array of Grid cells
     * @param {number} [log] @default 0
     * @param {string} [locname] - Filename for logging and tracing
     * @returns Nothing.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     */
    clearUI(nodes, log = this.logLevel, locname = `${this.fileName}: clearUI`) {
        // @ts-ignore
        const logs = log;
        // @ts-ignore
        nodes.forEach((cell) => {
            if (cell.textContent ?? true) {
                cell.textContent = "";
            }
        });
        this.disableUI = true;
        return;
    }

    /** onError: @version 0.4.2 [x] FREEZE 2023/04/01
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {Error} error object for Try/Catch exceptions and/general objects.
     * @param {number} [errflag] Switches which error is to be thrown. @default 0
     * @param {number} [log] Debug level for the error. @default this.errorLevel
     * @param {string} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {ListenerError} ListenerError, used for Binding errors
     * @memberof MoveListener
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/29 @version 0.4.1  Rename symbol Minor: e -> error , level - > log, switch literals to variables
     * @date 2023/04/01 @version 0.4.2  UPDATE Refactored error handling for readability
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
        // 1: IIFE Immediately invoked Function: Alternate is to use an ObjectLiteralMap pattern
        // For comparsion of technique and assessment, both are used @see this.evaluateParameter etc
        const check = log;
        // 2: Message & Trace Strings
        const generaltrace = `${locname}: General: `;
        const typetrace = `${locname}: Type: `;
        // @ts-ignore
        const listenertrace = `${locname}: Binding Error: `;
        // 3: Error Messages per Flag
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
                    return `Uncaught Exception: ${error.name}: ${error.toString()}.`;
            }
        })();
        // 4: Error Switch
        switch (errflag) {
            case 1: // General Error:  Null | Not Defined
                this.deBug._debug(error, errorMessage, check, generaltrace);
                // @ts-ignore
                throw new Error(`${generaltrace}: ${errorMessage}`);
            case 2: // Type Error: Instance of
                this.deBug._debug(error, errorMessage, check, typetrace);
                // @ts-ignore
                throw new TypeError(`${typetrace}: ${errorMessage}`);
            case 3: // EventListener Binding Errors
                // @ts-ignore
                this.deBug._debug(error, errorMessage, check, listenertrace);
                // @ts-ignore
                throw new Error(`${listenertrace}: ${errorMessage}`);
            default: // Uncatched Errors
                this.deBug._debug(error, errorMessage, check, locname);
                break;
        }
    }

    /** evaluateParameter @version 0.4.2 @date 2023/04/01
     * @function evaluateParameter
     * @kind function
     * @returns Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*} param Parameter under evaluation
     * @param {number} [argIndex] Optional, switches between type of parameters. @default 0
     * @param {number} [log] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof MoveListener
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/29 @version 0.4.0 @note Issue#14
     * @date 2023/03/29 @version 0.4.1  FREEZE Update of JSDocs
     * @date 2023/04/01 @version 0.4.2  UPDATE Refactored error handling for readability
     */
    evaluateParameter(param, argIndex = 0, log = this.errorLevel, locname = `${this.fileName}: evaluateParameter()`) {
        const check = log;
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
            const errortrace = `${locname}: Parameter Error`;
            const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is
                                ${param ? errOutMap[1] : errOutMap[2]}`;
            this.deBug._debug(param, errmessage, check, errortrace);
            throw new Error(`${errortrace}: ${errmessage}`);
        }
    }
    /** evaluateEventType @version 0.4.2  @date 2023/04/02
     * @function evaluateEventType
     * @kind function
     * @returns Returns the event based on it type and value.
     * @description Checks for presence of event and returns its
     * @usage Stanitise the constructor (event) (eventType) before assignment to the  event listener.
     * @param {string} event Event under evaluation
     * @param {number} [argIndex] Optional, switches between type of events. @default 0
     * @param {string} [literal] Recommended, determine type of parameter @default string
     * @param {number} [log] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, traces the location of the error @default this.fileName
     * @throws {Error} If event is null or undefined or not of type literal string.
     * @memberof MoveListener
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/29 @version 0.4.0
     * @date 2023/03/29 @version 0.4.1  UPDATE Added new param literal, default type string, to method
     * @date 2023/04/01 @version 0.4.2  UPDATE Refactored error handling for readability
     */
    // @ts-ignore
    evaluateEventType(
        event,
        argIndex = 0,
        literal = "string",
        log = this.errorLevel,
        locname = `${this.fileName}: evaluateEventType()`
    ) {
        const check = log;
        // Object: Key: Value map for click and other event handlers types
        const eventNameMap = {
            1: "click",
            default: `${locname}'s Unknown Event Type`,
        };
        // Object: Key: Value map for error strings
        const errOutMap = {
            1: "not set",
            2: `not typeof: string literal: ${literal}`,
            default: "Null | Undefined",
        };

        // checks if event is not null or undefined, and returns the parameter, early.
        if ((event ?? false) && typeof event === literal) {
            return event;
        }

        // checks if event is null or undefined or not string, throws an error
        if ((event ?? true) || typeof event !== literal) {
            const eventName = eventNameMap[argIndex] || eventNameMap.default;
            const errortrace = `${locname} EventType Error`;
            const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is
                                ${event ? errOutMap[1] : errOutMap[2]}`;
            this.deBug._debug(event, errmessage, check, errortrace);
            throw new Error(`${errortrace}: ${errmessage}`);
        }
    }
}

export { MoveListener };
