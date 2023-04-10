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
//import {GamePieces} from './__GamePieces.js'

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
 * @date 2023/04/06 @version 0.4.2.1 Added types to members, variables, consts, functions etc, debugger keywords
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
  /** MoveListener constructor @version 0.4.2.1  2023/03/29
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
      trace: `${filename}: constructor()`,
      gametrace: `${filename}: Check game parameter`,
      settrace: `${filename}: setListeners, update Game`,
      eventtrace: `${filename}: check Event Id and Type`,
      errortrace: `${filename}: onError: setListeners`,
      infoconsole: log,
      errorconsole: this.errorLevel,
      generalerror: 1,
      stringoff: "string",
    };
    // 2: Input/Param validation
    this.userMoves = document.querySelectorAll(listener.id);
    const aGame = this.evaluateParameter(
      listener.param.object,
      listener.param.type,
      listener.infoconsole,
      listener.gametrace
    );
    // @ts-ignore 2: Event/Param validation
    this.eventType = this.evaluateEventType(
      listener.events.mouse.pointer,
      listener.events.mouse.interact,
      listener.stringoff,
      listener.infoconsole,
      listener.eventtrace
    );
    // 3: Listener initialisation for Nodes.
    try {
      // Assign Moves Listener on a Move
      // @ts-ignore
      this.setListeners(
        this.userMoves,
        aGame,
        this.eventType,
        listener.infoconsole,
        listener.settrace
      );
    } catch (error) {
      // Throw UI Error
      this.onError(
        error,
        listener.generalerror,
        listener.errorconsole,
        `${listener.errortrace} ${error.linenums}`
      );
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
   * @date 2023/04/02 @version 0.4.2 IS STABLE, Deprecate GameDebug statements, commented out for now.
   */
  setListeners(
    nodes,
    game,
    event,
    log = this.logLevel,
    locname = `${this.fileName}: setListener()`
  ) {
    nodes.forEach((cell) => {
      cell.addEventListener(
        event,
        this.onClick.bind(this, cell, game, nodes, log, locname)
      );
    });
  }

  /** onClick @version 0.4.1 @2023/04/01
   * @function onClick
   * @kind function
   * @description Attatch the move's target the game, On each user click, update the UI based on game state
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
   */

  // @ts-ignore
  onClick(
    cell,
    game,
    nodes,
    log = this.logLevel,
    locname = `${this.fileName}: onClick`
  ) {
    // @ts-ignore
    // 1.1 Set: Types, casts and Falsey values
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
    const outcome = game.makeMove(
      flows.ID,
      flows.TARGET,
      flows.CURRENT,
      flows.console,
      flows.trace
    );
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
        trace: `${locname}: Is Error: ${outcome instanceof Error} ${
          outcome.name
        }`,
        console: 9,
      },
    };
    // 6: Debug the ouput for onClick, genral
    debugger;
    this.deBug._debug(
      outputs.ONCLICK.inspect,
      outputs.ONCLICK.message,
      outputs.ONCLICK.console,
      outputs.ONCLICK.trace
    );
    this.deBug._debug(
      outputs.DEBUG.inspects,
      outputs.DEBUG.message,
      outputs.DEBUG.console,
      outputs.DEBUG.trace
    );
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
    debugger; /** TODO REMOVE */
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

    debugger; /** TODO REMOVE */
    // 8: Update the UI at End states: No Game active and Terminal state true: collectively clear/end game
    if (
      game.gameRunning === flows.INACTIVE &&
      outcome === flows.TERMINATE &&
      typeof outcome === casts.STR
    ) {
      this.deBug._debug(
        outputs.END.inspect,
        outputs.END.message,
        outputs.END.console,
        outputs.END.trace
      );
      this.updateAtEnd(
        flows.GRID,
        flows.INSTANCE,
        outputs.END.inspect,
        outputs.END.console,
        outputs.END.trace
      );
      return;
    }

    // 9: Check for string and null/undefined errors. Hard to when strings are the only return of a deterministic finite state machine.
    debugger; /** TODO REMOVE */
    if (
      (outcome ?? casts.ISNULL) ||
      typeof outcome === casts.UNDEF ||
      outcome !== casts.EMPTY
    ) {
      this.deBug._debug(
        outputs.TYPES.inspect,
        outputs.TYPES.message,
        outputs.TYPES.console,
        outputs.TYPES.trace
      );
      window.alert(flows.INTERUPT);
      // Prompt User to try again, or to say illegal move or to resert the game or to exit game if makeMove is neither CONTINUE OR TERMINATE boolean state
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
   * @param {Element} cell Array of Grid cells
   * @param {Game} game Current game instance
   * @param {string} outcome End game flag === false
   * @param {number} [log] @default this.logLevel = 0
   * @param {string} [locname] - Filename for logging and tracing @default 0
   * @return Nothing: Events just wait for the next event. No coupling of outputs
   * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
   * @date 2023/04/02 @version 0.4.2
   */
  updateOnMove(
    cell,
    game,
    outcome,
    log = this.logLevel,
    locname = `${this.fileName}: updateOnMove()`
  ) {
    debugger;
    // @ts-ignore
    const target = {
      id: cell.getAttribute("id"),
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
    // @ts-ignore
    cell.dataset.value = target.value.toString();
    // @ts-ignore
    cell.dataset.state = target.state.toString();
    // @ts-ignore
    const celltext = document.createTextNode(target.text.toString());
    const turn = {
      message: `Next Turn: Move Updated: End State: ${outcome}: Game ${game}: State ${target.state}: Cell ${celltext}: Attr ${target.value}: Piece ${target.text}: Cell Text ${target.text}: ${target.element}`,
      trace: `${locname}: Cell/Tile Updated`,
      console: log,
    };
    this.deBug._debug(outcome, turn.message, turn.console, turn.trace);
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
   */
  updateAtEnd(
    nodes,
    game,
    outcome,
    log = this.logLevel,
    locname = `${this.fileName}: updateAtEnd()`
  ) {
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
    };
    this.deBug._debug(
      outcome,
      ends.user.message,
      ends.user.console,
      ends.user.trace
    );
    if (
      outcome === game.movesOutcome &&
      outcome === game.STATES.moves.TERMINAL
    ) {
      game.clearCurrentGame(
        game.gameRunning,
        game.movesOutcome,
        ends.game.console,
        ends.game.trace
      );
      // @ts-ignore
      this.clearUI(nodes, ends.browser.console, ends.browser.trace);
      // @ts-ignore
      this.newGame = undefined;
      this.deBug._debug(
        outcome,
        ends.game.message,
        ends.game.console,
        ends.game.trace
      );
      return;
    }
    // Display winning Piece/Player
    // Offer to start a new Game
    // Update the UI/Refresh the UI
    this.deBug._debug(
      outcome,
      ends.browser.message,
      ends.browser.console,
      ends.browser.trace
    );
  }

  /** clearUI @version 0.4.2 NEW [X] WIP 2023/04/01
   * @function clearUI
   * @kind function
   * @description This function clears the text content of all grid cells, resets the disable UI to initial state.
   * @param {NodeList} nodes Array of Grid cells
   * @param {number} [log] @default 0
   * @param {string} [locname] - Filename for logging and tracing
   * @return Nothing.
   * @date 2023/03/29 @version 0.4.1 @todo enchance @since 0.4.1.
   * @date 2023/04/02 @version 0.4.2
   */
  clearUI(nodes, log = this.logLevel, locname = `${this.fileName}: clearUI`) {
    // @ts-ignore
    nodes.forEach((cell) => {
      if (cell.textContent ?? true) {
        cell.textContent = "";
      }
    });
    this.disableUI = true;
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
  onError(
    error,
    errflag = 0,
    log = this.errorLevel,
    locname = `${this.fileName}: onError()`
  ) {
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
          return `${locname} General Error : Instance of ${
            error.name
          } is not defined ${error.toString()}.`;
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

  /** evaluateParameter @version 0.4.2 @date 2023/04/01
   * @function evaluateParameter
   * @kind function
   * @return Returns the parameter value
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
  evaluateParameter(
    param,
    argIndex = 0,
    log = this.errorLevel,
    locname = `${this.fileName}: evaluateParameter()`
  ) {
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

    if (!(param ?? true)) {
      return;
    }
    const paramName = paramNameMap[argIndex] || paramNameMap.default;
    const errortrace = `${locname}: Parameter Error`;
    const errmessage = `${locname}: ${
      errOutMap.default
    }: ${paramName} - ${param} is
                                ${param ? errOutMap[1] : errOutMap[2]}`;
    this.deBug._debug(param, errmessage, log, errortrace);
    throw new Error(`${errortrace}: ${errmessage}`);
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
    const eventName = eventNameMap[argIndex] || eventNameMap.default;
    const errortrace = `${locname} EventType Error`;
    const errmessage = `${locname}: ${
      errOutMap.default
    }: ${eventName} - ${event} is
                                ${event ? errOutMap[1] : errOutMap[2]}`;
    this.deBug._debug(event, errmessage, log, errortrace);
    throw new Error(`${errortrace}: ${errmessage}`);
  }
}

export { MoveListener };
