// @ts-check
/** MoveListener @version 0.5 2023/04/10
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __MoveListener.js class as module for the game of TicTacToe
 * @kind module
 * @exports MoveListener
 * @type {MoveListener}}
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/13 @version 0.1.2
 * @date 2023/03/20 @version 0.3.0
 * @date 2023/03/26 @version 0.4.0 @note Issue#14
 * @date 2023/03/29 @version 0.4.1 onClick is WIP, as are update[On|At]Action methods as UI interfaces
 * @date 2023/04/02 @version 0.4.2
 * @date 2023/04/10 @version 0.5.0 @note #25 Bump of a full minor
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 */
import { Game } from "../lib/__Game.js";
import { GameDebug } from "../lib/__GameDebug.js";
// import {GamePieces} from './__GamePieces.js'

/** MoveListener 0.5.0
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
 * @date 2023/04/06 @version 0.4.2.1 Added types to members, variables, consts, functions etc, debugger keywords
 * @date 2023/04/10 @version 0.5.0 @note Issue #25 Bump of a full minor: Objects and Finite State Management {string}, remove booleans for state
 * @author @iPoetDev.githib.com
 */
class MoveListener {
    /** Class Props @version 0.5 2023/04/10
     * @prop {GameDebug} deBug @kind member
     * @prop {NodeLists} userMoves @kind member
     * @prop {Game} newGame @kind member
     * @prop {string} eventType @kind member @default click
     * @prop {string} moveTargetID @kind member @default .cell
     * @prop {string} fileName - FileNams identifer for Error Handling @default MoveListener.js
     * @prop {string} logLevel Class & method Info status to console @default 0
     * @prop {string} errorLevel Class & method error status to console @kind member @default 0
     * @prop {string} fileName - Flag to disable UI, prevent clicks app errors @since 0.4.1 @todo WIP
     * @date 2023/04/06 @version 0.4.3 Added types to members, variables, consts, functions etc
     */
    deBug = new GameDebug();
    userMoves;
    newGame = new Game();
    eventType = "click";
    moveTargetID = ".cell";
    fileName = "MoveListener.js";
    logLevel = 3;
    errorLevel = 9;
    /** @since 0.4.2 03/31 */
    disableUI = true;
    /** MoveListener constructor @version 0.5  2023/04/10
     * @function constructor()
     * @kind function
     * @classdesc Creates an instance of MoveListener & initialises the custom Event Listener.
     * @constructs MoveListener
     * @type {MoveListener}
     * @param {Game} game Instance of current game
     * @param {string} [moveID] Grid cell class identifer @default .cell
     * @param {string} [event] Toggle a default value for testing purposes @default click
     * @param {number} [log] Status logging to cosnsole @default this.logLevel
     * @param {string} [filename] Status logging to cosnsole @default MoveListener.js
     * @throws {Error} if the setListerner method fails to initialise the game event listeners for  user move targets `grid cells`
     * @memberof MoveListener
     * @date 2023/03/10 @version 0.1.2
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/26 @version 0.4.0 @note Issue#14
     * @date 2023/03/29 @version 0.4.1 Minor: symbol name & default value change, big update to JSDoc
     * @date 2023/04/02 @version 0.4.2 Updated types, symbol names
     * @date 2023/04/10 @version 0.5.0 @note #25 Bump of a full minor
        - Changed: Switch simple variable assignments into Object.
        - Changed: Objects manage state/data state, code structure, implict type assignment, aimed for improved readability] and maintenance
        - Impact: Increase in complexity, and method LoC scores
        - Impact: Is interim for post submission refactoring
     */
    constructor(
        game,
        moveID = ".cell",
        event = "click",
        log = 0, // @ts-ignore
        filename = `MoveListener.js`
    ) {
        // 0: Assignment of Default values via Block Objects. Improved readability, maintainability. Fewer const assignments.
        const listener = {
            id: moveID,
            param: {
                object: game,
                type: 1,
            },
            events: {
                mouse: {
                    screen: "fixed",
                    device: "mouse",
                    pointer: event,
                    interact: 1,
                },
            },
            traces: {
                trace: `${filename}: constructor()`,
                gametrace: `${filename}: Check game parameter`,
                settrace: `${filename}: setListeners, update Game`,
                eventtrace: `${filename}: check Event Id and Type`,
                errortrace: `${filename}: onError: setListeners`,
            },
            console: {
                info: log,
                error: this.errorLevel,
            },
            generalerror: 1,
            stringoff: "string",
        };
        // 2: Input/Param validation
        this.userMoves = document.querySelectorAll(listener.id);
        const aGame = this.evaluateParameter(
            listener.param.object,
            listener.param.type,
            listener.console.info,
            listener.traces.gametrace
        );
        // @ts-ignore 2: Event/Param validation
        this.eventType = this.evaluateEventType(
            listener.events.mouse.pointer,
            listener.events.mouse.interact,
            listener.stringoff,
            listener.console.info,
            listener.traces.eventtrace
        );
        // 3: Listener initialisation for Nodes.
        try {
            // Assign Moves Listener on a Move
            // @ts-ignore
            this.setListeners(this.userMoves, aGame, this.eventType, listener.console.info, listener.traces.settrace);
        } catch (error) {
            // Throw UI Error
            this.onError(
                error,
                listener.generalerror,
                listener.console.error,
                `${listener.traces.errortrace} ${error.linenums}`
            );
        }
    }

    /** setListeners @version 0.5 2023/04/10
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
     * @date 2023/04/02 @version 0.4.2 Deprecate GameDebug statements, commented out for now.
     * @date 2023/04/10 @version 0.5.0 STABLE Bump for consistenY
     */
    setListeners(nodes, game, event, log = this.logLevel, locname = `${this.fileName}: setListener()`) {
        nodes.forEach((cell) => {
            cell.addEventListener(event, this.onClick.bind(this, cell, game, nodes, log, locname));
        });
    }

    /** onClick @version 0.5 @2023/04/10
    * @function onClick
    * @kind function
    * @description Attatch the move's target the game, On each user click, update the UI based on game state
    * @flow Critical Path for User Interaction
    * @param {*} cell The index of the cell targeted for the move
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
    * @date 2023/04/10 @version 0.5.0 @note #25 Bump of a full minor
    - Changed: Switch simple variable assignments into Object.
      - casts: type checks
      - flows: for transitions/states
      - ouputs: for message, traces, console per ACTION-STATES
    - Changed: Objects manage state/data state, code structure, implict type assignment, aimed for improved readability] and maintenance
    - Impact: Increase in complexity, and method LoC scores
    - Impact: Is interim for post submission refactoring
     */

    onClick(cell, game, nodes, log = this.logLevel, locname = `${this.fileName}: onClick`) {
        // 1: Set: Types, casts and Falsey values
        const casts = {
            NOTNULL: false,
            ISNULL: true,
            UNDEF: "undefined",
            STR: "string",
            EMPTY: "",
            NULL: null,
        };

        // 2. Set up the UI Flow State/Inputs from User's point of view. Uncouple external reference in evaluations and assign to this interface.
        /** @type {object} @name flows */
        const flows = {
            ID: parseInt(cell.dataset.index),
            INDEX: cell.dataset.index,
            INSTANCE: game,
            GRID: nodes,
            TARGET: cell,
            CONTENT: cell.textContent.toString(),
            INIT: game.STATES.game.INIT,
            ENTER: game.STATES.flow.ENTER,
            ACTIVE: game.STATES.game.RUN,
            INACTIVE: game.STATES.game.STOP,
            CONTINUE: game.STATES.move.CONTINUE,
            TERMINATE: game.STATES.move.TERMINAL,
            INTERUPT: game.STATES.flow.INTERUPT,
            CURRENT: game.gameRunning,
            RESULT: game.resultOutcome,
            PAUSE: game.STATES.game.PAUSE,
            FLOW: game.flowControl,
            OVER: game.STATES.game.OVER,
            EXIT: game.STATES.flow.EXIT,
            console: log,
            trace: `${locname}: flows for makeMove()`,
        };
        // 3: Check for illegal move
        // if (content) {
        //     // Good interface to check if start button is pressed or not, else early return and prompt user
        //     // Check to disable focus from div or prevent errors and prevent any further user actiion until game ui enabled/start button pressed.
        // }
        /** TODO REMOVE */
        debugger;
        // 4: Assign the game's state machine's output here, based in inflow params: ID, Target cell, Current game
        const outcome = game.makeMove(flows.ID, flows.TARGET, flows.CURRENT, flows.console, flows.trace);
        /* ?+*/
        //
        // 5: Define the states of Outputs according to the onClick workflow actions.
        const outputs = {
            ONCLICK: {
                step: 1,
                flow: flows.ENTER,
                inspect: `${flows.TARGET}: ${flows.INDEX}: ${flows.CONTENT}: `,
                message: `${flows.INDEX}: ${flows.CONTENT}: `,
                trace: `${locname}: display Values`,
                console: 7,
            },
            UPDATE: {
                step: 2,
                flow: flows.CURRENT,
                inspect: outcome,
                message: `Ui updates: Successful Move`,
                trace: `${locname}: updateOnMove`,
                console: log,
            },
            END: {
                step: 3,
                flow: flows.OVER || flows.EXIT,
                inspect: outcome,
                message: `Game is terminal, Complete UI `,
                trace: `${locname}: updateAtEnd`,
                console: log,
            },
            TYPES: {
                step: 4,
                flow: game.STATES.flow.ERROR,
                inspect: outcome,
                message: `Outcome is null or undefined or empty (i.e. falsey). Gracefully inform User `,
                trace: `${locname}: Not Found`,
                console: 9,
            },
            DEBUG: {
                step: 0,
                flow: game.STATES.flow.INTERUPT,
                inspect: outcome,
                message: `Parse of game.makeMove is ${outcome} has errors`,
                trace: `${locname}: Check outcome`,
                console: 9,
            },
            ERROR: {
                step: 99,
                flow: game.STATES.flow.ERROR,
                inspect: outcome,
                message: `Parse of game.makeMove is ${outcome} has errors ${outcome.stack}`,
                trace: `${locname}: Is Error: ${outcome instanceof Error} ${outcome.name}`,
                console: 9,
            },
        };
        // 6: Debug the ouput for onClick, general
        debugger;
        this.deBug._debug(
            outputs.ONCLICK.inspect,
            outputs.ONCLICK.message,
            outputs.ONCLICK.console,
            outputs.ONCLICK.trace
        );
        this.deBug._debug(outputs.DEBUG.inspects, outputs.DEBUG.message, outputs.DEBUG.console, outputs.DEBUG.trace);
        // 7: catch and handle Errors first, as game/makeMove returns {string | Error}
        if (outcome instanceof Error) {
            this.deBug._debug(
                outputs.ERROR.inspects,
                outputs.ERROR.message,
                outputs.ERROR.console,
                outputs.ERROR.trace
            );
            window.alert(outputs.ERROR.trace);
        }
        debugger;
        /** TODO REMOVE */
        // 7: onClick Action if Cell is free, Game is active, and Terminal state is false: then Update the UI
        if (game.gameRunning === flows.ACTIVE && outcome === flows.CONTINUE) {
            this.deBug._debug(
                outputs.UPDATE.inspect,
                outputs.UPDATE.message,
                outputs.UPDATE.console,
                outputs.UPDATE.trace
            );
            this.updateOnMove(
                flows.TARGET,
                flows.INSTANCE,
                outputs.UPDATE.inspect,
                outputs.UPDATE.console,
                outputs.UPDATE.trace
            );
            return;
        }

        debugger;
        /** TODO REMOVE */
        // 8: Update the UI at End states: No Game active and Terminal state true: collectively clear/end game
        if (game.gameRunning === flows.INACTIVE && outcome === flows.TERMINATE && typeof outcome === casts.STR) {
            this.deBug._debug(outputs.END.inspect, outputs.END.message, outputs.END.console, outputs.END.trace);
            this.updateAtEnd(flows.GRID, flows.INSTANCE, outputs.END.inspect, outputs.END.console, outputs.END.trace);
            return;
        }

        // 9: Check for string and null/undefined errors. Hard to when strings are the only return of a deterministic finite state machine.
        debugger; /** TODO REMOVE */
        if ((outcome ?? casts.ISNULL) || typeof outcome === casts.UNDEF || outcome !== casts.EMPTY) {
            this.deBug._debug(outputs.TYPES.inspect, outputs.TYPES.message, outputs.TYPES.console, outputs.TYPES.trace);
            window.alert(flows.INTERUPT);
            // Prompt User to try again, or to say illegal move or to resert the game or to exit game if makeMove is neither CONTINUE OR TERMINATE boolean state
        }
    }
    // Hmmm, how do I check for cell occupancy on each click: getElementByID {Element}, {Node}
    /**
     * @param {string} content
     * @date 2023/03/28 @version 0.4.0
     * @date 2023/04/02 @version 0.4.2
     * @date 2023/04/02 @version 0.5.0 @note #25 Objects for type cast assignment. Option to hoist and for (en)closure into parent function, and class members for object
     */
    checkCell(content) {
        const cast = {
            ISNULL: true,
            EMPTY: "",
        };
        return (content ?? cast.ISNULL) && content !== cast.EMPTY;
    }

    /** updateOnMove @version 0.5 2023/04/10
     * @function updateOnMove
     * @kind function
     * @description Utility method to update (writes to) a cell with the move's piece {string} as textual output.
     * @description Optionally, to update the board's internal data record on each click/on each move, with cell attributes.
     * @param {Element} cell Array of Grid cells
     * @param {Game} game Current game instance
     * @param {string} outcome End game flag === false
     * @param {number} [log] @default this.logLevel = 0
     * @param {string} [locname] - Filename for logging and tracing @default 0
     * @return Nothing: Events just wait for the next event. No coupling of outputs
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     * @date 2023/04/02 @version 0.5.0 @note #25 Bump for object method state, and parameter expressions. Minimal block level const per instance, mutable properties.
     *    1: target: Object for the inbound tareget data/state.detail.
     *    2: turn: Object for the notion of at turn action/state/information
     */
    updateOnMove(cell, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateOnMove()`) {
        debugger;
        // @ts-ignore
        // 1: Object assignment of method paramters.
        const target = {
            id: cell.getAttribute("id"),
            cell: cell,
            instance: game,
            status: outcome,
            value: game.playedPiece,
            state: game.gameRunning,
            move: game.movesOutcome,
            winner: game.resultOutcome,
            row: 0,
            col: 0,
            coord: 0,
            element: document.getElementById(cell.id),
            text: game.playedPiece,
            piece: game.playedPiece,
            logs: log,
            trace: `${locname}: Target Object`,
        };
        //  2: Update the  Cell dataset
        cell.dataset.value = target.value.toString();
        cell.dataset.state = target.state.toString();
        // 3: Creates new node to append to  Node
        const celltext = document.createTextNode(target.text.toString());
        // Do someting with UI output
        // 4: Outputs to console
        const turn = {
            status: target.status,
            message: `Next Turn: Move Updated: End State: ${target.status}: Game ${target.instance}: State ${target.state}: Cell ${celltext}: Attr ${target.value}: Piece ${target.text}: Cell Text ${target.text}: ${target.element}`,
            trace: `${locname}: Cell/Tile Updated: Next`,
            console: log,
        };
        this.deBug._debug(turn.status, turn.message, turn.console, turn.trace);
        // Update the result to game's data structure (the board)
        // game.gameBoard.updateBoardCell(cell)
    }
    /**  updateAtEnd @version 0.4.1 NEW [X] WIP 2023/03/28
     * @function updateAtEnd
     * @kind function
     * @description Utility method to manage the terminal state of the UI and reset to clear current game.
     * @param {NodeList} nodes Array of Grid cells
     * @param {Game} game Current game instance
     * @param {string} outcome End game flag === false
     * @param {number} [log] @default this.logLevel = 0
     * @param {string} [locname] - Filename for logging and tracing @default 0
     * @return Nothing: Events just wait for the next event. No need for further at end of game.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     * @date 2023/04/02 @version 0.5.0 @note #25 Objects for message, trace, console per context: browser, user, game
     */
    updateAtEnd(nodes, game, outcome, log = this.logLevel, locname = `${this.fileName}: updateAtEnd()`) {
        // 1: Block Object and properties assignment. This keeps strings at top of method, and object.property at end of method.
        const ends = {
            browser: {
                message: `Game End: Offer a new Game: ${outcome}: ${game}: ${nodes}`,
                trace: `${locname}: Browser Console`,
                console: log,
            },
            user: {
                message: `User has ended the game`,
                trace: `${locname}: User exists game`,
                console: log,
            },
            game: {
                message: `Game is over. Now Exiting`,
                trace: `${locname}: Game End. La Fin`,
                console: log,
            },
            instance: game,
            state: outcome,
        };
        // 2: Ouput User's state to console.
        this.deBug._debug(ends.state, ends.user.message, ends.user.console, ends.user.trace);
        // 3: Check for end state for each move (TERMINAL), double check verses the global TERMINAL state.
        if (ends.state === game.movesOutcome && ends.state === game.STATES.moves.TERMINAL) {
            // 3.1 Clear the current game instances, using the game's dyanmic state, and move's outcome state
            game.clearCurrentGame(game.gameRunning, game.movesOutcome, ends.game.console, ends.game.trace);
            // 3.2 Clear up the UI/Browser context, and log to console.
            this.clearUI(nodes, ends.browser.console, ends.browser.trace);
            // 3.3 Assign a new game object to re-instalise
            this.newGame = new Game();
            // 3.4 Log game final state to the console for end of game.
            this.deBug._debug(ends.state, ends.game.message, ends.game.console, ends.game.trace);
            return;
        }
        // Display winning Piece/Player
        // Offer to start a new Game
        // Update the UI/Refresh the UI
        this.deBug._debug(outcome, ends.browser.message, ends.browser.console, ends.browser.trace);
    }

    /** clearUI @version 0.5.0 2023/04/10
     * @function clearUI
     * @kind function
     * @description This function clears the text content of all grid cells, resets the disable UI to initial state.
     * @param {NodeList} nodes Array of Grid cells
     * @param {number} [log] @default this.logLevel
     * @param {string} [locname] - Trace @default: this.filename
     * @return Nothing.
     * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
     * @date 2023/04/02 @version 0.4.2
     * @date 2023/04/02 @version 0.5.0 @note #25  Bump, Assign at block level, and apply the Object & property pattern to method body.
             1) clears: simple object to manage the method variables.
     */
    clearUI(nodes, log = this.logLevel, locname = `${this.fileName}: clearUI`) {
        const clears = {
            EMPTY: "",
            ISNULL: true,
            DISABLE: true,
            message: `${locname}: Clears the UI and attributes`,
            trace: locname,
            console: log,
        };
        // @ts-ignore
        nodes.forEach((cell) => {
            if (cell.textContent ?? clears.ISNULL) {
                cell.textContent = clears.EMPTY;
            }
        });
        this.disableUI = clears.DISABLE;
    }

    /** onError: @version 0.5.0 2023/04/10 No mutate.
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
     * @date 2023/04/01 @version 0.5.0  @note #25 Bump. No object * pattern refactoring. No need. Candidate for @version 0.6.0+ Could use object maping for reducing switch statements.
     */
    onError(error, errflag = 0, log = this.errorLevel, locname = `${this.fileName}: onError()`) {
        // 2: Message & Trace Strings
        const generaltrace = `${locname}: General: `;
        const typetrace = `${locname}: Type: `;
        // @ts-ignore
        const listenertrace = `${locname}: Binding Error: `;
        // 3: Error Messages per Flag
        const errorMessage = (() => {
            switch (errflag) {
                case 1:
                    // General Error:  Null | Not Defined
                    return `${locname} General Error : Instance of ${error.name} is not defined ${error.toString()}.`;
                case 2:
                    // Type Error: Instance of
                    return `${locname} Type Error : Instance of: ${
                        error.name
                    }: ${error.toString()} is not correct type.`;
                case 3:
                    // EventListener Binding Errors
                    return `${locname} Error: addListener() ${
                        error.name
                    }: ${error.toString()} did not get attached to ${this.userMoves}.`;
                default:
                    // Uncatched Errors. Nothing Throwable yet
                    return `Uncaught Exception: ${error.name}: ${error.toString()}.`;
            }
        })();
        // 4: Error Switch
        switch (errflag) {
            case 1:
                // General Error:  Null | Not Defined
                this.deBug._debug(error, errorMessage, log, generaltrace);
                // @ts-ignore
                throw new Error(`${generaltrace}: ${errorMessage}`);
            case 2:
                // Type Error: Instance of
                this.deBug._debug(error, errorMessage, log, typetrace);
                // @ts-ignore
                throw new TypeError(`${typetrace}: ${errorMessage}`);
            case 3:
                // EventListener Binding Errors
                // @ts-ignore
                this.deBug._debug(error, errorMessage, log, listenertrace);
                // @ts-ignore
                throw new Error(`${listenertrace}: ${errorMessage}`);
            default:
                // Uncatched Errors
                this.deBug._debug(error, errorMessage, log, locname);
                break;
        }
    }

    /** evaluateParameter @version 0.5.0 2023/04/10 NO Muttate
     * @function evaluateParameter
     * @kind function
     * @return Returns the parameter value
     * @description checks for presnce of parameter value and returns it
     * @usage Stanitise the constructor (parameters) (objects) before assignment to the class props.
     * @param {*} param Parameter under evaluation
     * @param {number} [index] Optional, switches between type of parameters. @default 0
     * @param {number} [log] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, determines the location of the error @default this.fileName
     * @throws {Error} If param is null or undefined.
     * @memberof MoveListener
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/03/29 @version 0.4.0  @note Issue#14
     * @date 2023/03/29 @version 0.4.1  FREEZE Update of JSDocs
     * @date 2023/04/01 @version 0.4.2  UPDATE Refactored error handling for readability
     * @date 2023/04/10 @version 0.5.0  @note #25 Bump to minor version. Was inspired for Object & Property pattern.
     */
    evaluateParameter(param, index = 0, log = this.errorLevel, locname = `${this.fileName}: evaluateParameter()`) {
        // Object: Key: Value map for parameter switching
        const paramNameMap = {
            1: "Game",
            2: "User's Move Target",
            default: `${locname}'s Arguments: ${index} & ${param}`,
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

        if (!(param ?? true)) {
            return;
        }
        const paramName = paramNameMap[index] || paramNameMap.default;
        const errortrace = `${locname}: Parameter Error`;
        const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is
                                ${param ? errOutMap[1] : errOutMap[2]}`;
        this.deBug._debug(param, errmessage, log, errortrace);
        throw new Error(`${errortrace}: ${errmessage}`);
    }
    /** evaluateEventType @version 0.5.0  @date 2023/04/10
     * @function evaluateEventType
     * @kind function
     * @returns Returns the event based on it type and value.
     * @description Checks for presence of event and returns its
     * @usage Stanitise the constructor (event) (eventType) before assignment to the  event listener.
     * @param {string} event Event under evaluation
     * @param {number} [index] Optional, switches between type of events. @default 0
     * @param {string} [literal] Recommended, determine type of parameter @default string
     * @param {number} [log] Optional, determine error logging to console @default this.errorLevel
     * @param {string} [locname] Optional, traces the location of the error @default this.fileName
     * @throws {Error} If event is null or undefined or not of type literal string.
     * @memberof MoveListener
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/29 @version 0.4.0
     * @date 2023/03/29 @version 0.4.1  UPDATE Added new param literal, default type string, to method
     * @date 2023/04/01 @version 0.4.2  UPDATE Refactored error handling for readability
     * @date 2023/04/01 @version 0.5.0  @note #25 Bump, no muttate. Minor symbol change. Future candidate for a reafactor @version 0.6.0+
     */
    // @ts-ignore
    evaluateEventType(
        event,
        index = 0,
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
        if (!((event ?? true) || typeof event !== literal)) {
            return;
        }
        const eventName = eventNameMap[index] || eventNameMap.default;
        const errortrace = `${locname} EventType Error`;
        const errmessage = `${locname}: ${errOutMap.default}: ${eventName} - ${event} is
                                ${event ? errOutMap[1] : errOutMap[2]}`;
        this.deBug._debug(event, errmessage, log, errortrace);
        throw new Error(`${errortrace}: ${errmessage}`);
    }
}

export { MoveListener };
