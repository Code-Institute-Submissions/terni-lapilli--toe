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
 * @date 2023/03/26 @version 0.4.0 @see Issue#14
 * @date 2023/03/29 @version 0.4.1 onClick is WIP, as are update[On|At]Action methods as UI interfaces
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
 * @date 2023/03/26 @version 0.4.0 @see Issue#14
 * @date 2023/03/29 @version 0.4.1 Class & Method bumped. Update of Class JSDoc. RaySnapped and Booked Marked.
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
    newGame;
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
     * @param {string} moveTargetID Grid cell class identifer @default .cell
     * @param {string} event Toggle a default value for testing purposes
     * @param {number} logs Status logging to cosnsole @default this.logLevel
     * @param {number} check Error logging to cosnsole @default this.errorLevel
     * @param {string} locname Tracing of methods to console @default this.fileName
     * @throws {Error} if the setListerner method fails to initialise the game event listeners for  user move targets `grid cells`
     * @memberof MoveListener
     * @date 2023/03/10 @version 0.1.2
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/26 @version 0.4.0 @see Issue#14
     * @date 2023/03/29 @version 0.4.1 Minor: symbol name & default value change, big update to JSDoc
     */
    constructor(
        game,
        moveTargetID = ".cell",
        event = "click",
        log = this.logLevel,
        check = this.errorLevel,
        locname = `${this.fileName} Constructor`
    ) {
        const logs = log;
        const checks = check;
        this.userMoves = document.querySelectorAll(moveTargetID);
        const aGame = this.evaluateParameter(game, 2, logs, `${locname}: Check game parameter`);
        this.newGame = aGame;
        const type = "string";
        this.eventType = this.evaluateEventType(event, 1, type, logs, `${locname}: Check Event ID`);

        try {
            // Assign Moves Listener on a Move
            this.setListeners(
                this.userMoves,
                this.newGame,
                this.eventType,
                logs,
                `${locname}: setListeners, update Game`
            );
        } catch (error) {
            this.onError(error, 1, checks, `${locname}: onError: setListeners ${error.linenums}`);
        }
    }

    /** setListeners @version 0.4.1 [ ] FREEZE 2023/03/29
     * @function setListeners
     * @kind function
     * @type {void}
     * @description Intialise each of the moves targets, Iteratively binds each node cell, current game, grid's nodes on the click event.
     * @usage Used to link the user moves to the EventListeners and bind to each move to a node's cell on the grid @constructor
     * @param {NodeList} nodes Current nodes of grid cells
     * @param {game} game Current game
     * @param {string} event Click event
     * @param {number} logs Optional console outupt on success @default this.logLevel
     * @param {string} locname Console location of usage @default this.fileName
     * @memberof MoveListener
     * @date 2023/03/09 @version 0.1.2
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/26 @version 0.4.0
     * @date 2023/03/26 @version 0.4.1: Pass nodes onClick stack for clearing UI later, symbol name change, update of JSDocs
     */
    setListeners(nodes, game, event, log = this.logLevel, locname = `${this.fileName}: setListener()`) {
        const logs = log;
        nodes.forEach((cell) => {
            cell.addEventListener(event, this.onClick.bind(this, cell, game, nodes, logs));
            const messages = `Event ${event} clicked and cell and game bounded to the onClick`; /**@todo: REMOVE*/
            this.deBug._debug(
                event,
                messages,
                logs,
                `${locname}: onClick binds to ${cell.dataset.index}`
            ); /**@todo: REMOVE*/
        });
    }

    /** onClick @version 0.4.1 [ ] WIP
     * @function onClick
     * @kind function
     * @type {void}
     * @description Attatch the move's target the game
     * @param {node} cell - The index of the cell targeted for the move
     * @param {Game} game - Current instance of the game
     * @param {string} locname - Function tracing: Name off
     * @usage On each user click
     * @memberof MoveListener
     * @see Game.onMove() @see module:Game
     * @date 2023/03/26 @version 0.1.0 => 0.4.0
     * @date 2023/03/26 @version 0.4.0  @see Issue#
     * @date 2023/03/28-29. @version 0.4.1  @see, Destructuring assignments. WIP. Testing focus
     */

    onClick(cell, game, nodes, log = this.logLevel, locname = `${this.fileName}: onClick`) {
        const logs = 8;
        // JS42 suggested refactoring from individual assignments to a destructing assignments
        const index = cell.dataset.index; /*?+*/
        const moveId = parseInt(index); /*?+*/
        const value = cell.dataset.value; /*?+*/
        const status = cell.dataset.state; /*?+*/
        const row = cell.dataset.row; /*?+*/
        const col = cell.dataset.col; /*?+*/
        const coord = cell.dataset.coord; /*?+*/
        const content = cell.textContent.toString(); /*?+*/

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
        const outcome = game.makeMove(moveId, cell, gameActive, logs, `${locname}: makeMove`); /*?+*/
        //
        const debugmsg = `Parse of game.makeMove is ${outcome} === True`;
        const debugtrace = `${locname}: Check outcome`;
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

    checkCell(content) {
        return (content ?? true) || content !== "";
    }

    /** updateOnMove @version 0.4.1 NEW [X] WIP 2023/03/28
     * @function updateOnMove
     * @kind function
     * @type {void}
     * @description Utility method to update (writes to) a cell with the move's piece {string} as textual output.
     * @description Optionally, to update the board's internal data record on each click/on each move, with cell attributes.
     * @param cell Array of Grid cells
     * @param game Current game instance
     * @param outcome End game flag === false
     * @param log @default this.logLevel = 0
     * @param locname - Filename for logging and tracing @default 0
     * @returns Nothing: Events just wait for the next event. No coupling of outputs
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     */
    updateOnMove(cell, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateOnMove()`) {
        const turnstart = `Next Turn: Let Next Player know: ${outcome}: ${game}:`;
        this.deBug._debug(outcome, turnstart, log, locname);
        debugger;
        //
        const logs = log;
        //const content = cell.textContent.toString(); /*?+*/
        //const value = cell.dataset.value.toString(); /*?+*/
        const value = "X";
        const state = cell.dataset.state.toString(); /*?+*/
        const playingPiece = game.playedPiece;
        //
        content = playingPiece;
        state = this.game.gameRunning;
        value = playingPiece;
        //
        cell.textContent = "X";
        cell.dataset.value = value.toString();
        cell.dataset.state = state.toString();

        const element = document.getElementById(cell.id);
        const id = cell.id;
        const cellText = document.createTextNode(content.toString());
        element.textContent = playedPiece;
        //
        const turnupdate = `Next Turn: Move Updated: End State: ${outcome}: Game ${game}: Status ${status}: Cell ${content}: Attr ${value}: Piece ${playingPiece}: Cell Text ${cellText}: ${element}`;
        this.deBug._debug(outcome, turnupdate, logs, `${locname}: Cell/Tile Updated`);
        //game.gameBoard.updateBoardCell(cell)
        return;
    }
    /**  updateAtEnd @version 0.4.1 NEW [X] WIP 2023/03/28
     * @function updateAtEnd
     * @kind function
     * @type {void}
     * @description Utility method to manage the terminal state of the UI and reset to clear current game.
     * @param nodes Array of Grid cells
     * @param game Current game instance
     * @param outcome End game flag === false
     * @param log @default this.logLevel = 0
     * @param locname - Filename for logging and tracing @default 0
     * @returns Nothing: Events just wait for the next event. No need for further at end of game.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     */
    updateAtEnd(nodes, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateAtEnd()`) {
        const logs = log;
        const endmessage = `Game End: Offer a new Game: ${outcome}: ${game}: ${nodes}`;
        this.deBug._debug(outcome, endmessage, logs, locname);
        game.clearCurrentGame(outcome);
        this.clearUI(nodes, logs, locname);
        game.gameRunning = false;
        this.newGame = game;
        this.newGame = undefined;
        console.log(`End of Game. Inform all of End State`);
        //Display winning Piece/Player
        //Offer to start a new Game
        //Update the UI/Refresh the UI
        return;
    }

    /** clearUI @version 0.4.1 NEW [X] WIP 2023/03/29
     * @function clearUI
     * @kind function
     * @type {void}
     * @description This function clears the text content of all grid cells, resets the disable UI to initial state.
     * @param nodes Array of Grid cells
     * @param log @default 0
     * @param locname - Filename for logging and tracing
     * @returns Nothing.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     */
    clearUI(nodes, log = 0, locname = this.logLevel) {
        const logs = log;
        const locnames = locname;
        nodes.forEach((cell) => {
            if (cell.textContent ?? true) {
                cell.textContent = "";
            }
        });
        this.disableUI = true;
        return;
    }

    /** onError: @version 0.4.1 [x] FREEZE 2023.03/29
     * @function onError
     * @kind function
     * @description Error messages according to flags and location
     * @param {Error,*} error object for Try/Catch exceptions and/general objects.
     * @param {number} [flag] Switches which error is to be thrown. @default 0
     * @param {number} [level] Debug level for the error. @default this.errorLevel
     * @param {string} [locname] Location of the error. @default this.fileName
     * @throws {Error} Error, used for catching null or undefined errors.
     * @throws {TypeError} TypeError, used when checking for instanceof Errors
     * @throws {[Listener]Error} ListenerError, used for Binding errors
     * @memberof MoveListener
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/29 @version 0.4.1  FREEZE  Rename symbol Minor: e -> error , level - > log, switch literals to variables
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
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
                this.deBug._debug(error, errorMessage, log, locname);
                throw new Error(errorMessage, { name: `${locname} General :`, stack: e });
            case 2: // Type Error: Instance of
                this.deBug._debug(error, errorMessage, log, locname);
                throw new TypeError(errorMessage, { name: `${locname}  Type: :`, stack: e });
            case 3: // EventListener Binding Errors
                this.deBug._debug(error, errorMessage, log, `${locname}: addListener Binding`);
                throw new Error(errorMessage, { name: `${locname} Binding Error:`, stack: e });
            default: // Uncatched Errors
                this.deBug._debug(error, errorMessage, log, locname);
                break;
        }
    }

    /** evaluateParameter @version 0.4.1 [x] FREEZE 2023/03/29
     * @function evaluateParameter
     * @kind function
     * @returns {string} Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*} param Parameter under evaluation
     * @param {number} [argIndex] Optional, switches between type of parameters. @default 0
     * @param {number} [level] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof MoveListener
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/29 @version 0.4.0 @see Issue#14
     * @date 2023/03/29 @version 0.4.1  FREEZE Update of JSDocs
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
    /** evaluateEventType @version 0.4.1 [x]  FREEZE : 2023/03/29
     * @function evaluateEventType
     * @kind function
     * @returns {string} Returns the event based on it type and value.
     * @description Checks for presence of event and returns its
     * @usage Stanitise the constructor (event) (eventType) before assignment to the  event listener.
     * @param {string} event Event under evaluation
     * @param {number} [argIndex] Optional, switches between type of events. @default 0
     * @param {string} [literal] Recommended, determine type of parameter @default string
     * @param {number} [level=1] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, traces the location of the error @default this.fileName
     * @throws {Error} If event is null or undefined or not of type literal string.
     * @memberof MoveListener
     * @date 2023/03/19 @version 0.3.0  FREEZE
     * @date 2023/03/29 @version 0.4.0  FREEZE
     * @date 2023/03/29 @version 0.4.1  UPDATE Added new param literal, default type string, to method
     */
    evaluateEventType(
        event,
        argIndex = 0,
        literal = "string",
        log = this.errorLevel,
        locname = `${this.fileName}: evaluateEventType()`
    ) {
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
            const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is
            ${event ? errOutMap[1] : errOutMap[2]}`;
            this.deBug._debug(event, errmessage, log, `${locname} EventType Error`);
            throw new Error(errmessage);
        }
    }
}

export { MoveListener };
