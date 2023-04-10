// @ts-nocheck
/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/16
 * @date 2023/04/01
  *@version 0.4.3 Major: Addec STATE Constants
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GameLogic } from "GameLogic.js"; @see module:GameLogic
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */
/** * @bug Module path is either "/lib/" or "../lib" or ".\lib" ... Breaking change for GITHUB Pages */
import { GameBoard } from "../lib/__GameBoard.js";
import { GamePieces } from "../lib/__GamePieces.js";
import { GameLogic } from "../lib/__GameLogic.js";
import { GameDebug } from "../lib/__GameDebug.js";
// import {GameBoard} from "..\\lib\\__GameBoard.js"
// import {GamePieces} from "..\\lib\\__GamePieces.js";
// import { GameLogic } from "..\\lib\\__GameLogic.js";
// import { GameDebug } from "..\\lib\\__GameDebug.js";

/** GAME @version 0.4.2 @date 2023/04/02: Update of Class definition
 * @name Game
 * @kind class
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @prop {GameDebug}  deBug checks for draw moves against is all squares are filled
 * @prop {string} Player1's symbol, nominally Ex, X., or a Cross
 * @prop {string} Player2's symbol, nominally Zero, O, or a Nought
 * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
 * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
 * @prop {GamePieces} gamePieces Players' pieces for the game play.
 * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
 * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
 * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
 * @prop {boolean} INITSTATE @constant @kind member @public
 * @prop {boolean} RUNSTATE @constant @kind member @public
 * @prop {boolean} STOPSTATE @constant @kind member @public
 * @prop {boolean} CONTSTATE @constant @kind member @public
 * @prop {boolean} TERMINUS @constant @kind member @public
 * @prop {boolean} RESETSTATE @constant @kind member @public
 * @prop {boolean} EXITSTATE @constant @kind member @public
 * @constructor @kind class @public @interface
 * @function onInit @kind function @public @interface
 * @function isGameStarted @kind function @public @interface
 * @function checkMove @kind function @private
 * @function updateGrid @kind function @public @interface
 * @function makeMove @kind function @public @interface
 * @function nextTurn @kind function @private
 * @function isGameOver @kind function @public @interface
 * @function clearCurretGame @kind function @public @interface
 * @function evaluateParameter @kind function @private
 * @date 2023/03/22 @version 0.3.0 . See Changelog on this date.
 * @date 2023/04.02 @version 0.4.2  Class Definition update: added new functions, new constants, current interfaces
 * @developer JSDoc is used extensively for: IDE+TS Type checking and linting, without compling, as developer experience
 * @developer JSDoc is used expressively only in assessment/educational projects.
 * @developer Not to be use for production environments as JSDoc loc > class Loc
 */
class Game {
  /** GAME Declaration  @version 0.4.2 @date @2023/04/02
   * @prop {GameDebug} deBug Debugger/Console
   * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
   * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
   * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
   * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
   * @prop {GamePieces} gamePieces Players' pieces for the game play.
   * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
   * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
   * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
   * @prop {boolean} EXITSTATE > EXIT game state, when leaving the same @default true @constant
   * @prop {string} fileName - FileNams identifer for Error Handling
   * @prop {number} logLevel Logs to console @default 0
   * @prop {number} errorLevel Error to console @default 9
   * @prop {boolean} INITSTATE > INITAL game state @default false @constant
   * @prop {boolean} RUNSTATE  > ACTIVE game state when running @default true @constant
   * @prop {boolean} STOPSTATE > INACTIVE game state when game is stopped @default false @constant
   * @prop {boolean} CONTSTATE > CONTINUE game state when no win or draw @default true @constant
   * @prop {boolean} TERMINUS > TERMINAL game state when Win or Draw @default false @constant
   * @prop {boolean} RESETSTATE > RESET game state when reseting a game or reinitialising @default true @constant
   * @prop {boolean} gameRunning > Class periststent state for game State, changed accordingly
   */
  // Game Fields (Properties): @version 0.4.2.1 @date 2023/04/06 Update prop types from any/infered to explicit
  /**@type {GameDebug}*/
  deBug = new GameDebug();
  /**@type {string}*/
  Player1 = "X";
  /**@type {string}*/
  Player2 = "O";
  gamePieces;
  /**@type {string}*/
  currentPiece;
  /**@type {string}*/
  playedPiece;
  /**
    @type {GameBoard}*/
  gameBoard;
  /**
    @type {GameLogic}*/
  gameLogic;
  /**@type {string}*/
  fileName = "Game.js";
  /**@type {number}*/
  logLevel = 8;
  /**@type {number}*/
  errorLevel = 8;
  /** @type {object} */
  STATES = {
    game: {
      INITIAL: "INITIAL",
      START: "START", // START  of game
      RUN: "RUN", // Maps to ACTIVE. start => run
      STOP: "STOP", // Maps to INACTIVE
      OVER: "OVER",
      TRY: "TRYAGAIN",
      REPEAT: "REPEAT",
      PAUSE: "PAUSE", // dE
    },
    moves: {
      READY: "READY",
      CONTINUE: "CONTINUE", // Maps to CONTINUE
      TERMINAL: "TERMINAL",
      ILLEGAL: "ILLEGAL",
      VALID: "VALID", // Maps to TERMINAL
    },
    outcomes: {
      WIN: "WIN",
      DRAW: "DRAW",
      LOST: "LOST",
      PLAY: "PLAY",
      NONE: "NONE",
      UNRESOLVED: "UNRESOLVED",
    },
    flow: {
      ENTER: "ENTER",
      INTERUPTS: "INTERUPT",
      RESUME: "RESUME",
      OK: "OK",
      CONFIRM: "CONFIRM",
      POSITIVE: "POSITIVE",
      NEGATIVE: "NEGATIVE",
      PROMPT: "PROMPT",
      ALERT: "ALERT",
      ERROR: "ERROR",
      RESET: "RESET", // RESET GAME
      EXIT: "EXIT", // EXIT GAME
    },
  };
  /**@type {string}*/
  gameRunning = this.STATES.game.INITIAL;
  movesOutcome = this.STATES.move.CONTINUE;
  resultOutcome = this.STATES.outcome.NONE;
  flowControl = this.STATES.flow.ENTER;

  /** Game constructor @version 0.4.2 @date 2023/04/02
   * Game controller class (constructor) for the game of TicTacToe
   * @name constructor
   * @kind function
   * @classdesc Instantiated the Game class with the players' pieces, and the game's board, pieces, and logic. Then enables the game's state.
   * @param {string} [_X], Player1's symbol, nominally Ex, X., or a Cross, Can be assigned new string type of piece/representation for the game. Optionally defaults to X. @default 'X'
   * @param {string} [_O], Player2's symbol, nominally Zero, O, or a Nought. Can be assigned new string type of piece/representation for the game. Optionally defaults to O. @default 'O'
   * @param {number} [log] Log to console @default 0
   * @param {string} [filename] Optional, method location in log @default 'Game.js'
   * @constructor
   * @constructs Game
   * @type {Game}
   * @memberof Game
   * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
   * @version 0.4.1 @date 2023/04/01 Assigns block vars, contants, message and tracing patterns
   * @version 0.4.2 @date 2023/04/03 Adjust signature to remove this keyword, dohoist to block vars
   */

  constructor(_X = "X", _O = "O", log = 0, filename = `Game.js`) {
    // 1: Assigned blocks vars and CONSTANTS
    const players = {
      one: {
        name: "Player 1",
        defaul: "X",
        piece: _X,
        index: 1,
        console: log,
        trace: `${filename}: sets Player1`,
      },
      two: {
        name: "Player 2",
        defaul: "X",
        piece: _O,
        index: 2,
        console: log,
        trace: `${filename}: sets Player2`,
      },
    };

    this.deBug = new GameDebug();
    // 2: Checks and sets Players (Input validation, error handling)
    this.Player1 = this.evaluateParameter(
      players.one.piece,
      players.one.index,
      players.one.console,
      players.one.trace
    );
    this.Player2 = this.evaluateParameter(
      players.two.piece,
      players.two.index,
      players.two.console,
      players.two.trace
    );
    // 3: Sets game's aspects various state on each new Game object

      this.gameRunning = this.STATES.game.INITIAL;
      this.movesOutcome = this.STATES.move.CONTINUE; // Move to READY if game is pre initialised, pre start button
      this.resultOutcome = this.STATES.outcome.NONE;
      this.flowControl = this.STATES.flow.ENTER
  }

  /** Game onInit : Initialiser @version 0.4.2 @date 2023/04/02
     * @name onInit
     * @kind function
     * @description Initialises the Game's dependencies, and initialise the class active game state.
       * @return  Updates the caller's state
     * @param {string} isRunning
     * @param {PointerEvent} pointerEvent @default null and never used. See note.
         @note very weird, I actially don't know why pointerevents was automatically refered to for logs as args[1]
         So created pointerevent refernece else args[2] for logs =  {number} and args[1] = {PointerEvent}
     * @param {number} [log] Log to console. @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @prop {GamePieces} this.gamePieces A new set|instance of GamePieces per each new game
     * @prop {string} this.currentPiece Game instance copy of this.gamePieces.currentPiece for initialisation
     * @prop {GameBoard} this.gameBoard A new board|instance of GameBoard per eacg new game
     * @prop {GameLogic} this.gameBoard A new logic engine|instance of GameLogic per each new game
     * @prop {boolean} this.gameRunning Update the new instance's game persistent|active state @value true
     * @constant {boolean} START Start flag/flow state @value true
     * @constant {boolean} NOSTART NoStart flag/flow state @value false
     * @throw {Error} Game initialisation errors.
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/04/01 @version 0.4.1 Debugging, Validating
     * @memberof Game
     */ // Set isRunning = true by default for positive flow testing

  onInit(
    isRunning = "RUN",
    pointerEvent,
    log = this.logLevel,
    locname = `${this.fileName}: onInit`
  ) {
    // 1: Sets Block vars
    const state = {
      INITIAL: {
        status: isRunning,
        message: `The game is is initialising.`,
        trace: `${locname}: ${this.STATES.game.INITIAL}`,
        console: 1,
      },
      NOSTART: {
        status: this.STATES.game.STOP,
        message: `The game has not started. Click the start button again.`,
        trace: `${locname}: ${this.state.NOSTART.message}`,
        console: 8,
      },
      START: {
        status: this.STATES.flow.START,
        piece: this.gamePieces.currentPiece,
        message: `The game is started started.`,
        trace: `${locname}: ${this.state.START.message} $this.STATES.flow.START}`,
        console: log,
      },
      RUN: {
        status: this.STATES.game.RUN,
        piece: this.gamePieces.currentPiece,
        message: `The game is running, and has started.`,
        trace: `${locname}: ${this.state.RUN.message} $this.STATES.game.RUN}`,
        console: log,
      },
      DEBUG: {
        status: this.STATES.flow.INTERPUT,
        message: `${locname}: ${this.state.ERROR.message}`,
        trace: `${locname}: Initialise Error`,
        console: this.errorLevel,
      },
      ERROR: {
        status: this.STATES.flow.ERROR,
        message: `${locname}: ${this.state.ERROR.message}`,
        trace: `${locname}: Initialise Error`,
        console: this.errorLevel,
      },
    };

    let pointer = pointerEvent; // === null // Is this unclaimeď a side effect of click events add listeners
    debugger; /** TODO REMOVE */
    try {
      // 3: Assign the game's pieces to a) the current game players and b)  up a new board
      this.gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
      this.currentPiece = state.START.piece;
      this.deBug._debug(state.START.piece, state.START.message, state.START.console, state.START.trace);
      this.gameBoard = new GameBoard(); /* ?+*/
      // 4: Link the current board and current pieces to the game logic
      this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces);
      // 5: Set the game persistent active state to true, for duration of the game, from the game init.
      if (isRunning === this.STATES.game.RUN) {
        console.log(state.START.message);
        //this.gameRunning = this.isGameStarted(isRunning);
        this.gameRunning = this.STATES.game.RUN,
        this.deBug._debug(
          isRunning,
          state.RUN.message,
          state.RUN.console,
          state.RUN.trace
        );
      }

      if (isRunning !== this.STATES.game.RUN && isRunning === state.NOSTART.status) {
        this.gameRunning = this.STATES.game.INITIAL
        window.alert(state.NOSTART.message);
      }

        if (isRunning !== this.STATES.game.RUN && isRunning !== state.NOSTART.status) {
          this.gameRunning = this.STATES.game.INITIAL
          window.alert(state.NOSTART.message);
        }
    } catch (errorinit) {
      const errormessage = `${state.ERROR.message} ${errorinit.linenumber}:${errorinit.columnNumber}`;
      this.deBug._debug(errorinit, errormessage, state.ERROR.console, state.ERROR.trace);
    }
  }

  /** isGameStarted @version 0.4.2 @date 2023/04/02
   * @function isGameStarted
   * @kind function
   * @description checks if a game has started (initial is false), and updated the game active state to true.
   * @param {string} [isRunning] Toggles initial state of the game from initial state or User message @default this.INITSTATE
   * @constant {boolean} ACTIVE Block var gameRunning local ACTIVE STATE @default this.RUNSTATE
   * @constant {boolean} INACTIVE Block var gameRunning local INACTIVE STATE @default this.STOPSTATE
   * @constant {boolean} EXIT Block var gameRunning local EXIT STATE @default this.EXITSTATE
   * @usage Used as interface to signal to UI/User with Alerts (OK Only).
   * @date 2023/03/30 @since @version 0.4.1
   * @return {string} Game transitory and instance persistence state ACTIVE {boolean} or EXIT {undefined}
   * @memberof Game
   * @version 0.4.1 @date 2023/04/01 Added constant, User message if game is already running and exit flow.
   * @version 0.4.2 @date 2023/04/02 Update of JSDoc for constants
   */

  isGameStarted(isRunning = this.STATES.game.INITIAL) {
    const ACTIVE = this.STATES.game.RUN;

    const INACTIVE = this.STATES.game.STOP;

    const EXIT = this.STATES.flow.EXIT;
    //const EXIT = undefined

    const startmessage = `Welcome to a new game of Tic Tac Toe. Click ok to continue`;

    const activemessage = `The current game is already running`;
    // 2: Sets the game running state, and or sent a user message interface/dialog
    return ACTIVE;
    // if (isGameRun === INACTIVE) {
    //     window.alert(startmessage);
    //     return (this.gameRunning = ACTIVE);
    // }
    // if (this.gameRunning === ACTIVE) {
    //     window.alert(activemessage);
    //     return EXIT;
    // }
  }

  /**
   * checkMove @version 0.4.2 @date 2023/04/02 @TODO REMOVE DEFAULT FOR VALIDMOVE
   * TODO REMOVE VALID default value, and just check for truthy WHILE TESTING
   * @function checkMove
   * @kind function
   * @description checks if the move is valid and the game is not over.
   * @param {string} move The index of the move to make
   * @param {string} GAMESTATE if the move is valid, based on game's transitory state.
   * @constant {boolean} ACTIVE Block var gameRunning local ACTIVE STATE @default this.RUNSTATE
   * @constant {boolean} INACTIVE Block var gameRunning local INACTIVE STATE @default this.STOPSTATE
   * @constant {string} TYPE Typeof check for number literals @default "number"
   * @constant {string} BLANK Typeof check for empty string literals @default ""
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @return {string | Error} GameState or Error
   * @date 2023/03/24 @version 0.3.1 Updated Docstrings
   * @memberof Game
   * @version 0.3.0 INSPECT
   * @date 2023/03/22. See Changelog on this date.
   * @version 0.4.1
   * @date 2023/04/01: Reactor, message & trace patttern, update sign with log flag
   * @version 0.4.2
   * @date 2023/04/02 Update of JSDoc constants, NOTE THE TODO
   */

  checkMove(
    move,
    GAMESTATE = "RUN",
    log = this.logLevel,
    locname = `${this.fileName}: checkMove()`
  ) {
    // 1: Assign Block vars & CONSTANTS

    const logs = log;

    const cellId = parseInt(move);
    // 1: Casts/Types
    const cast = {
      TYPE: "number",
      BLANK: "",
    };
    // 1: Game States
    const state = {
      INIT: this.STATES.game.INITIAL,

      ACTIVE: this.STATES.game.RUN,

      INACTIVE: this.STATES.game.STOP,

      PAUSE: this.STATES.game.PAUSE,

      TRY: this.STATES.game.TRY,
    };
    // 2: Move/Game State Validation Message
    const validateMessage = {
      TOSTART: `${GAMESTATE}: Game has not started yet. Click Start Button`,

      ACTIVE: `${GAMESTATE}: Game state is ${state.ACTIVE}`,

      TRYAGAIN: `${GAMESTATE}: ${this.gameBoard.grid[cellId] !== cast.BLANK}. ${
        state.TRY
      }`,

      PAUSE: `${GAMESTATE}: Game state is ${state.PAUSE}`,

      INACTIVE: `${GAMESTATE}: Game state is ${state.INACTIVE}`,

      DEBUG: `${GAMESTATE}: Invalid move or game running state`,

      ERROR: `${GAMESTATE}: Is this an error state`,

      TYPE: `${GAMESTATE}: Method Param Type error is ${
        typeof move !== cast.TYPE
      }`,
      default: `Can not make a move at this time. Press the start button or check the console for more information, and contact the developer`,
    };
    // 2b: Move/Game State Traces
    const validateTrace = {
      TOSTART: `${locname}: Game To Start on ${GAMESTATE}`,

      ACTIVE: `${locname}: Game Running on ${GAMESTATE}`,

      TRYAGAIN: `${locname}: Repeat move on ${GAMESTATE}`,

      PAUSE: `${locname}: Game Paused ${GAMESTATE}`,

      INACTIVE: `${locname}: Game stopped on ${GAMESTATE}`,

      DEBUG: `${locname}: Game debug on ${GAMESTATE}`,

      ERROR: `${locname}: Game error on ${GAMESTATE}`,

      TYPE: `${locname}: Method Param Type error on ${GAMESTATE}`,

      default: `${locname}: Game state is ${GAMESTATE}`,
    };
    // 2: Checks types and game transitory active state. Nested If is intentional for branching logic and explict exit gates

    if (typeof move === cast.TYPE && GAMESTATE === state.ACTIVE) {
      if (this.gameBoard.grid[cellId] === cast.BLANK) {
        if (this.gameRunning === this.STATES.game.RUN) {
          this.deBug._debug(
            GAMESTATE,
            validateMessage.ACTIVE,
            logs,
            validateTrace.ACTIVE
          );

          return (this.gameRunning = state.ACTIVE);
        }
      }
      // 3: Checks if the grid cell/target has been filled from a prior move.

      if (this.gameBoard.grid[cellId] !== cast.BLANK) {
        window.alert(validateMessage.TRYAGAIN);

        this.deBug._debug(
          GAMESTATE,
          validateMessage.TRYAGAIN,
          logs,
          validateTrace.TRYAGAIN
        );

        return (this.gameRunning = this.STATES.game.TRY);
      }
    }
    // 4: Game transitoryinactive state (and or check the cell content??) or in moveListener.onClick

    if (GAMESTATE === state.INACTIVE) {
      if (this.gameRunning === this.STATES.game.STOP) {
        window.alert(`${validateTrace.DEBUG}: ${validateMessage.DEBUG}`);

        this.deBug._debug(
          this,
          validateMessage.INACTIVE,
          logs,
          validateTrace.INACTIVE
        );

        this.deBug._debug(
          this,
          validateMessage.DEBUG,
          logs,
          validateTrace.DEBUG
        );

        this.isGameOver(GAMESTATE);

        return (this.gameRunning = this.STATES.game.STOP);
      }
    }
    // 5: Input validation. A DX check if the developer has assigned the wrong type for paramter.

    if (typeof move !== cast.TYPE) {
      return new Error(
        `${validateTrace.TYPE}: ${validateMessage.TYPE} so ${validateMessage.ERROR}`
      );
    }
    // 6: Game's state into paused state as default. Allow user to resume game play. debug is testing.

    if (GAMESTATE === state.PAUSE) {
      const pauseOutput = `${GAMESTATE.toString()}, ${this.PAUSESTATE.toString()}, ${this.gameRunning.toString()}`;

      this.deBug._debug(
        pauseOutput,
        validateMessage.PAUSE,
        logs,
        validateTrace.PAUSE
      );
    }

    return (this.gameRunning = this.STATES.game.PAUSE);
  }

  /** updateGrid  @version 0.4.2. @date 2023/04/02 @TODO REMOVE debugger
   * @function updateGrid
   * @kind function
   * @description Assigns the current move to the grid and assign the current piece..
   * @param {string} move The index of the move to make
   * @param {Node} cell The cell node to be updated.
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @date 2023/03/24 @version 0.3.1 Updated Docstrings
   * @memberof Game
   * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
   * @version 0.4.1 @date 2023/04/01: Reactor, message & trace patttern, update sign with log flag
   * @version 0.4.2 @date 2023/04/01: Do I enable the GameBoard Update interface @param cell
   */

  updateGrid(
    move,
    cell,
    log = this.logLevel,
    locname = `${this.fileName}: updateGrid()`
  ) {
    debugger; /**@TODO REMOVE*/

    const logs = log;

    const gridID = parseInt(move);

    const tile = cell;

    const logmessage = `${locname} Current Piece ${this.gamePieces.currentPiece} to update Grid`;

    this.deBug._debug(this.gamePieces.currentPiece, logmessage, logs, locname);

    this.gameBoard.grid[move] = this.gamePieces.currentPiece;

    window.alert(this.gameBoard.grid[gridID]); /**@TODO REMOVE*/
    // this.gameBoard.currentCellMove(tile);
  }

  /** makeMove  @version 0.4.2 @date 2023/04/02
   * @function makeMove
   * @kind function
   * @return Returns game state ACTIVE: for Game Terminus: Continue|| INACTIVE for Game Terminus: Game Ends
   * @description Assigns the current piece to the move if it is valid and the game is not over.
   * If the game is over (i.e., there is a winner or a draw), it resets the game. and returns boolean state to UI Handlers onClick
   * @param {string} move The index of the current move (cell index).
   * @param {Node} current Current cell, param passing of current node to update the grid's repository
   * @param {string} GAMESTATE Current transitory state ACTIVE || INACTIVE
   * @param {number} [log] Log to console @default this.logLevel:
   * @param {string} [locname] Method trace @default this.fileName
   * @constant {boolean} ACTIVE Block var gameRunning local ACTIVE STATE @default this.RUNSTATE
   * @constant {boolean} INACTIVE Block var gameRunning local INACTIVE STATE @default this.STOPSTATE
   * @constant {string} BLANK Block var gameRunning local ACTIVE STATE @default ""
   * @throw {Error} Catch uncaught errors if makeMove fails.
   * @return {string | Error}
   * @memberof Game
   * @date 2023/03/22 @version 0.3.0 See Changelog
   * @date 2023/03/24 @version 0.3.1 Updated Docstrings
   * @date 2023/03/28 @version 0.4.1
   * @date 2023/04/01-02 @version 0.4.2 Adopt the message/trace vars, refactor, game state contants,
   *                                 dynamically update the class/instancxe peristent gameRunning state
   *                                 Added try..catch for error handling for a critical method.
   */

  makeMove(
    move,
    current,
    GAMESTATE = "RUN",
    log = this.logLevel,
    locname = `${this.fileName}: makeMove()`
  ) {
    // 1: Assign Object style Messages & Traces
    const traces = {
      this: `makeMove()`,
      checks: `checkMove()`,
      isover: `isGameOver()`,
      error: `throws Error`,
    };
    const messages = {
      this: `Make Move`,
      checks: `Check Move`,
      isover: `Game Over`,
      error: `Error in makeMove()`,
      checkmsg: `Check Move`,
    };
    //Local state machine for critical path method.
    const state = {
      CHECK: {
        status: GAMESTATE,

        value: GAMESTATE.toString(),

        message: `Check move current/transitory game State on ${GAMESTATE} IF valid`,
        level: 0,

        trace: `${locname}: ${traces.this} Game's move is valid`,
      },
      RESULT: {
        status: this.gameRunning,

        value: this.gameRunning.toString(),

        message: `Move has a result on ${this.gameRunning}`,
        level: 0,

        trace: `${locname}: ${traces.this} Game's move as a result`,
      },
      ACTIVE: {
        status: this.STATES.game.RUN,

        value: this.STATES.game.RUN.toString(),
        message: `Game in play`,

        level: log,

        trace: `${locname}: ${traces.this} Game Running`,
      },
      INACTIVE: {
        status: this.STATES.game.STOP,

        value: this.STATES.game.STOP.toString(),
        message: `Game has stopped`,
        level: 1,

        trace: `${locname}: ${traces.this} Game Inactive`,
      },
      OVER: {
        status: this.STATES.game.OVER,

        value: this.STATES.game.OVER.toString(),
        message: `Game is over`,
        level: 0,

        trace: `${locname}: ${traces.this} Game Stopped`,
      },
      PAUSE: {
        status: this.STATES.game.PAUSE,

        value: this.STATES.game.PAUSE.toString(),
        message: `Game state is paused`,

        level: log,

        trace: `${locname}: ${traces.this} Game Paused`,
      },
      ERROR: {
        status: this.STATES.flow.ERROR,

        value: this.STATES.flow.ERROR.toString(),
        message: `Game state in error`,
        level: 9,

        trace: `${locname}: ${traces.this} Game Interupted`,
      },
    };

    const result = {
      WIN: {
        status: this.gameLogic.WINSTATE,

        value: this.gameLogic.WINSTATE.toString(),

        decision: this.STATES.outcomes.TERMINAL,

        moves: this.movesOutcome,

        outcome: this.STATES.outcomes.WIN,
        message: `Game is won`,

        trace: `${locname}: ${traces.this} Game Draw.`,
      },
      DRAW: {
        status: this.gameLogic.DRAWSTATE,

        value: this.gameLogic.DRAWSTATE.toString(),

        decision: this.STATES.moves.TERMINAL,

        moves: this.movesOutcome,

        outcome: this.STATES.outcomes.DRAW,
        message: `Game is drawn`,

        trace: `${locname}: ${traces.this} Game Draw.`,
      },
      PLAYON: {
        status: this.gameLogic.NOOUTCOMESTATE,

        value: this.gameLogic.NOOUTCOMESTATE.toString(),

        decision: this.STATES.moves.CONTINUE,

        moves: this.movesOutcome,

        outcome: this.STATES.outcomes.NONE,
        message: `No result, play on`,

        trace: `${locname}: ${traces.this} Game Continues.`,
      },

      OUTCOME: this.movesOutcome,
    };
    // 2: Error control for a critical method

    try {
      // 3: Check each move v prior moves and game's transitory state

      const validate = this.checkMove(
        move,
        GAMESTATE,
        state.CHECK.level,
        traces.checks
      );

      const outcome = this.isGameOver(
        state.RESULT.status,
        state.RESULT.level,
        traces.isover
      );

      switch (validate) {
        case this.INITSTATE:
          window.alert("Why me, why am I here?");
          break;
        case state.ACTIVE.status:
          const playingPiece = this.gamePieces.currentPiece;

          this.updateGrid(move, current);

          this.deBug._debug(
            current,
            state.ACTIVE.message,
            state.ACTIVE.level,
            state.ACTIVE.message
          );
          // In a running game, check the outcome state
          try {
            switch (outcome) {
              case result.WIN.status:
                this.gameRunning = state.OVER.status;

                this.movesOutcome = result.WIN.decision;
                return this.movesOutcome;
              case result.DRAW.status:
                this.gameRunning = state.OVER.status;

                this.movesOutcome = result.DRAW.decision;
                return this.movesOutcome;
              case result.PLAYON.status:
                this.currentPiece = playingPiece;

                this.gameRunning = state.ACTIVE.status;

                this.movesOutcome = result.PLAYON.decision;
                return this.movesOutcome;
              default:
                const objects = {
                  inspect: `${traces.error}: ${outcome}: ${result}: ${state}: ${validate}`,
                  errormessage: `${messages.error}:${state.ERROR.message}`,
                  errortrace: `${traces.error}: ${state.ERROR.trace}`,
                  erroroutput: `${traces.error}: ${state.ERROR.trace} ${messages.error}:${state.ERROR.message}`,
                  level: state.ERROR.level,
                };

                this.deBug._debug(
                  objects.inspect,
                  objects.errormessage,
                  objects.level,
                  objects.errortrace
                );
                return new Error(objects.erroroutput);
            }
          } catch (runstateerror) {
            const errobjects = {
              inspect: `${traces.error}: ${outcome}: ${result}: ${state}: ${validate}: ${runstateerror.stack}`,
              errormessage: `${messages.error}:${
                state.ERROR.message
              }. ${runstateerror.toString()} `,
              errortrace: `${traces.error}: ${state.ERROR.trace}.${runstateerror.name}`,
              erroroutput: `${traces.error}: ${state.ERROR.trace} ${messages.error}:${state.ERROR.message}`,
              errorlevel: state.ERROR.level,
            };

            this.deBug._debug(
              errobjects.inspect,
              errobjects.errormessage,
              errobjects.errorlevel,
              errobjects.errortrace
            );
            throw new Error(errobjects.erroroutput);
          }
        // If Game is in INACTIVE STATUS
        case state.INACTIVE.status:
          if (typeof this.movesOutcome !== "undefined") {
            this.clearCurrentGame(
              state.RESULT.status,
              result.OUTCOME,
              log,
              state.INACTIVE.trace
            );

            this.movesOutcome = this.STATES.moves.TERMINAL;

            return (this.gameRunning = state.INACTIVE.status);
          }

          this.movesOutcome = this.STATES.moves.TERMINAL;

          return (this.gameRunning = state.PAUSE.status);
        // If Game is in INACTIVE STATUS
        case state.OVER.status:
          if (typeof this.movesOutcome !== "undefined") {
            this.clearCurrentGame(
              state.RESULT.status,
              result.OUTCOME,
              log,
              state.OVER.trace
            );

            this.movesOutcome = this.STATES.moves.TERMINAL;

            return (this.gameRunning = state.INACTIVE.status);
          }

          this.movesOutcome = this.STATES.moves.TERMINAL;

          return (this.gameRunning = state.PAUSE.status);
        case state.PAUSE.status:
          this.deBug._debug(
            current,
            state.PAUSE.message,
            log,
            state.PAUSE.message
          );

          return (this.gameRunning = state.PAUSE.status);
        default:
          this.gameRunning = state.PAUSE.status;
          if (validate instanceof Error) {
            throw new Error(messages.error);
          } else {
            this.deBug._debug(
              this,
              messages.error,
              log,
              `${locname}: ${traces.this} Game Running State`
            );
            window.alert("You have exited the game. See console for logs");

            return (this.gameRunning = this.STATES.flow.EXIT);
          }
      }

      return this.PAUSESTATE;
    } catch (makemoveerror) {
      // 7: Messages and Trace for new Error Handing: makeMove is a critical function

      const errormessage = `${locname}: . ${makemoveerror.name} ${makemoveerror.linenumber}: ${makemoveerror.columnNumber}. ${makemoveerror.stack}. ${makemoveerror.cause} `;

      const errortrace = `${locname} : ${makemoveerror.name}: makeMove Error`;

      this.deBug._debug((this, errormessage, log, errortrace));
      return new Error(`${errortrace}: ${errormessage}`);
    }
  }

  // END Critcial PATH Method

  /** nextTurn  @version 0.4.1 @date 2023/04/01 REMOVE CONSOLE.LOGS @TODO
   * @function nextTurn
   * @kind function
   * @description Assigns the next turn and changes the symbol according to the players turn.
   * @returns updated game's current|instance's udpated current piece
   * @param {string} GAMESTATE  If the gameRunning transitory state is true, make next turn.
   * @param {string} nextPiece Check if the current piece is the same || different to next piece @testing
   * @param {number} [log] Logs to console @default this.logLevel
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @memberof Game
   * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
   * @version 0.3.1 @date 2023/03/24 Updated Docstrings
   * @version 0.4.1 @date 2023/04/01 Change signature, new params, JSDoc & version bump,
   * @version 0.4._ @date 2023/04/0 PENDING BUMP once console.logs are not needed @TODO
   **/

  nextTurn(
    GAMESTATE,
    nextPiece,
    log = this.logLevel,
    locname = `${this.fileName}: nextTurn()`
  ) {
    const logs = 0;
    const turnOutputs = {
      MESSAGE: `@param: ${GAMESTATE}: ${locname}`,

      TRACE: `${locname} nextTurn`,
      defaults: ``,
    };

    this.deBug._debug(GAMESTATE, turnOutputs.MESSAGE, logs, turnOutputs.TRACE);

    console.log(nextPiece, this.gamePieces.currentPiece); /** @TODO REMOVE*/

    if (GAMESTATE === this.RUNSTATE) {
      const newPiece = this.gamePieces.switchPieces(nextPiece);

      console.log(
        nextPiece,
        this.gamePieces.currentPiece,
        nextPiece
      ); /** @TODO REMOVE*/

      console.log(
        nextPiece,
        this.gamePieces.currentPiece,
        newPiece
      ); /** @TODO REMOVE*/

      this.gamePieces.currentPiece = newPiece;
      return this.CONTSTATE;
    }

    if (GAMESTATE === this.STOPSTATE) {
      GAMESTATE = this.STOPSTATE;

      this.isGameOver(GAMESTATE);
      return this.TERMINUS;
    }
    return this.PAUSESTATE;
  }

  /** isGameOver @version 0.4.1 @date 2023/04/01
   * @function isGameOver
   * @kind function
   * @description Truth for if the game is Over (i.e. isAWin or isADraw).
   * @param {string} GAMESTATE Current game running state, transitory: ACTICE || INACTIVE.
   * @param {number} [log] Logs to console @default this.logLevel
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @constant {boolean} ACTIVE Block var gameRunning local ACTIVE STATE @default this.RUNSTATE
   * @constant {boolean} INACTIVE Block var gameRunning local INACTIVE STATE @default this.STOPSTATE
   * @constant {boolean} CONTINUE Block var no Win, no Draw state local CONTINUE STATE @default this.CONTSTATE
   * @constant {boolean} TERMINAL Block var Win or Draw local TERMINAL STATE @default this.TERMINUS
   * @date 2023/03/24 @version 0.3.1 Updated Docstrings
   * @date 2023/03/24 @version 0.3.2 Changed method body to track game state
   * @return {string} Terminal state of the game: CONTINE || TERMINAL
   * @usage: Updates the current|instance's gameRunning state and returns terminal state.
   * @memberof Game
   * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
   * @version 0.4.1 date 2023/04/01. Big Refactor, update to signature, hosting strings/booleans
   *   into block const for readability/maintainability, update of JSDoc
   * @version 0.4.2 date 2023/04/02. Update of JSDoc constants
   **/

  isGameOver(
    GAMESTATE,
    log = this.logLevel,
    locname = `${this.fileName}: isGameOver()`
  ) {
    // 1: Assign Block vars

    const logs = log;
    // 2: Local Status Constants
    const state = {
      INITIAL: this.STATES.game.INITIAL,

      ACTIVE: this.STATES.game.RUN,

      INACTIVE: this.STATES.game.STOP,

      CONTINUE: this.STATES.game.CONTINE,

      PAUSE: this.STATES.game.PAUSE,

      NEXT: this.STATES.moves.CONTINE,

      TERMINAL: this.STATES.moves.CONTINE,

      EXIT: this.STATES.flow.EXIT,

      WIN: this.gameLogic.WINSTATE,

      DRAW: this.gameLogic.DRAWSTATE,

      PLAYON: this.gameLogic.NOOUTCOMESTATE,
    };
    // 3: Messages and Traces
    // 4: Check the tranistory running state of game, before checking terminal/continue states

    switch (GAMESTATE) {
      case state.INITIAL:
        const initialStates = {
          INIT: `The game only initialsied yet`,
          TOCLICK: `User needs to click the start button`,
          STARTS: `Hits Play: Thank you for starting a new game, `,
          STARTED: `A new game has already started. No further game to start.`,
          RESTART: `Do you wish to start over and restart the current game?`,
          ANEW: `Do you wish to start a brand new game?`,
          default: `The game has an start or initialisation error. Restart the game`,
        };
        const initialTraces = {
          INIT: `${locname}: Game is not running`,

          TOCLICK: `${locname}: Game is set`,

          STARTS: `${locname}: Game is about to start`,

          STARTED: `${locname}: Game has already started`,

          RESTART: `${locname}: Game is about to restart`,

          ANEW: `${locname}: Game is about to start a new game`,

          default: `${locname} Error?`,
        };

        this.gameRunning = this.INITSTATE;
        window.alert("Game not initialised. Why are you here?");

        this.deBug._debug(
          GAMESTATE,
          initialStates.INIT,
          logs,
          initialTraces.INIT
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.TOCLICK,
          logs,
          initialTraces.TOCLICK
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.STARTS,
          logs,
          initialTraces.STARTS
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.STARTED,
          logs,
          initialTraces.STARTED
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.RESTART,
          logs,
          initialTraces.RESTART
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.ANEW,
          logs,
          initialTraces.ANEW
        );

        this.deBug._debug(
          GAMESTATE,
          initialStates.default,
          logs,
          initialTraces.default
        );
        break;
      case state.ACTIVE:
        const run = {
          WIN: {
            states: `Game has a winner`,

            traces: `${locname}: Logic isAWin()`,
            console: logs,
          },
          DRAW: {
            states: `Game is a draw. There is no winner`,

            traces: `${locname}: Logic: isADraw()`,
            console: logs,
          },
          NEXT: {
            states: `Next Turn`,

            traces: `${locname}: Logic: isADraw()`,
            console: logs,
          },
          CONTINUE: {
            states: `Game in running`,

            traces: `${locname}: Logic is No Result: Contine Play`,
            console: logs,
          },
          default: {
            states: `Game has an error. Restart the game`,

            traces: `${locname} Error?`,
            console: 9,
          },
        };

        // Core State Decisions/Transitions

        switch (this.gameLogic.isAWin() || this.gameLogic.isADraw()) {
          case state.WIN: {
            // a: Winning Outcome, terminate, update instance's states for running a game, and move's result
            this.deBug._debug(
              state.WIN,
              run.WIN.states,
              run.WIN.console,
              run.WIN.traces
            );

            this.gameRunning = state.INACTIVE; // Switch the game state as non active

            this.moveOutcome = state.WIN; // Switch the move's state as "WINSTATE"
            return state.TERMINAL; // Return terminal state
          }
          case state.DRAW: {
            // b: Draw Outome, terminate, update instance's states for running a game, and move's result
            this.deBug._debug(
              state.DRAW,
              run.DRAW,
              run.DRAW.console,
              run.DRAW.traces
            );

            this.gameRunning = state.INACTIVE; // Switch the game state as non active

            this.moveOutcome = state.DRAW; // Switch the move's state as "WINSTATE"
            return state.TERMINAL; // Return terminal state
          }
          case state.PLAYON: {
            // c: Ultimate check, No outcome, continue game
            this.deBug._debug(
              state.PLAYON,
              run.CONTINUE.states,
              run.CONTINUE.console,
              run.CONTINUE.traces
            );

            this.gameRunning = state.ACTIVE;

            this.moveOutcome = state.PLAYON; // Keep the game state as active.
            return state.NEXT;
          }
          default:
            window.alert("Game outcome is not determinate. Why are you here?");
            return state.EXIT;
        }

      case this.STOPSTATE: {
        const stop = {
          WON: {
            states: "Game is over, is stopped. There was a winner",

            traces: `${locname}: Won State, Stopped`,
            console: logs,
          },
          DREW: {
            states: "Game is over. Both users drew and there was no winner",

            traces: `${locname}: Drew State, Stopped`,
            console: logs,
          },
          TERMINAL: {
            states: "Game is over, is stopped. There was a winner",

            traces: `${locname}: End State, Stopped`,
            console: logs,
          },
          default: {
            states: "Game is over. Is this Error",

            traces: `${locname}: Error State, Stopped`,
            console: logs,
          },
        };

        switch (this.moveOutcome) {
          case state.WIN: {
            this.deBug._debug(
              this.moveOutcome,
              stop.WON.states,
              stop.WON.console,
              stop.WON.traces
            );
            return state.EXIT;
          }
          case state.DRAW: {
            this.deBug._debug(
              this.moveOutcome,
              stop.DREW.states,
              stop.DREW.console,
              stop.DREW.traces
            );
            return state.EXIT;
          }
          default:
            // Impossible, not even an edge case, for logic to have no outcome if game stopped
            const debug = `${stop.TERMINAL.states}: Error?${stop.defaul.states}`;

            this.deBug._debug(
              this.moveOutcome,
              debug,
              stop.default.console,
              stop.default.traces
            );
            return state.EXIT;
        }
      }
      // User initiated Pause or

      case this.PAUSESTATE:
        // Paused states are an enchancement. Added to @version 0.5 for a hint for further functionality.
        // Islinked to the default PAUSE returned state at end of fuctions for isGameOver, nextTurn, makeMove, er and isGameStarted, highest block scope.
        // A pause could be a user window confirm prompt. User choice from a game interupt state.
        // Usage of `Maps: Message & Trace` pattern, a v2 for message & trace pattern
        // Add a switch..case statement, ;possibli include save, to restore interim states, or move else where.
        const pauses = {
          TOPAUSE: {
            states: `Do you wish to pause the game`,

            traces: `${locname}: Request to Pause State, Paused`,
            console: logs,
          },
          PAUSED: {
            states: `You have paused the game`,

            traces: `${locname}: Paused. Game Data is active`,
            console: logs,
          },
          RESUME: {
            states: `You have resumed the game`,

            traces: `${locname}: Resumed, from Paused`,
            console: logs,
          },
          default: {
            states: `You are undefined. Throw an error`,

            traces: `${locname}: Error State, Paused`,
            console: logs,
          },
        };
        // Output all console messages. Insert Switch..case here.

        this.deBug._debug(
          this.PAUSESTATE,
          pauses.TOPAUSE.states,
          pauses.TOPAUSE.console,
          pauses.TOPAUSE.traces
        );

        this.deBug._debug(
          this.PAUSESTATE,
          pauses.PAUSE.states,
          pauses.PAUSE.console,
          pauses.PAUSE.traces
        );

        this.deBug._debug(
          this.PAUSESTATE,
          pauses.RESUME.states,
          pauses.RESUME.console,
          pauses.RESUME.traces
        );

        this.deBug._debug(
          this.PAUSESTATE,
          pauses.default.states,
          pauses.TOPAUSE.console,
          pauses.default.traces
        );
        return state.PAUSE;
      default:
        // Usage Map Message & Trace Pattern, a v2 for message & trace pattern
        // Add Error messages and or handling if this is reached.
        const defaultState = {
          default: `Game is in an unknown state. `,
        };
        const defaultTrace = {
          default: `${locname}: Error State, Paused`,
        };

        this.deBug._debug(
          GAMESTATE,
          defaultState.default,
          logs,
          defaultTrace.default
        );

        this.gameRunning = state.EXIT;
        return state.EXIT;
    }
    return state.EXIT;
  }

  /** clearCurrenGame: @version 0.4.2 @date 2023/04/02
   * @function clearCurrentGame
   * @kind function
   * @description Clears/reinitialised the game's objects/artefactes. JS does good GC/Memory.
   * @param {string} GAMESTATE
   * @param {string} OUTCOMERESULT
   * @param {number} log Log level @default 1
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @constant {string} END Local end state matched to game state @default this.TERMINUS
   * @memberof Game
   * @date 2023/03/22 @version 0.3.0 REFACTOR . See Changelog on this date.
   * @version 0.4.1 ENCHANCE @date 2023/03/28.
   * @version 0.4.2 @date 2023/04/02 Bumped, Added JSDoc constants, updated END const
   **/

  clearCurrentGame(
    GAMESTATE,
    OUTCOMERESULT,
    log = this.logLevel,
    locname = `${this.fileName}: clearCurrentGame()`
  ) {
    const logs = log;
    const gameEnd = {
      INIT: this.STATES.game.INITIAL,

      STOP: this.STATES.game.STOP,

      END: this.STATES.moves.TERMINAL,

      EXIT: this.STATES.flow.EXIT,

      inspect: `${GAMESTATE}: ${OUTCOMERESULT}`,
      message: `End of Game: All Game items are cleared or reset.`,

      trace: `${locname}: Cleared/Initalised current Game Items`,
    };

    if (GAMESTATE === gameEnd.STOP) {
      // This method is called when the current game has reached it endState, terminal state.

      if (OUTCOMERESULT === gameEnd.END) {
        debugger; /** TODO REMOVE */

        this.Player1 = "X";

        this.Player2 = "O";

        this.gamePieces = new GamePieces(this.Player1, this.Player2);

        this.gamePieces.currentSymbol = this.Player1;

        this.gameRunning = gameEnd.INIT;

        this.deBug._debug(
          gameEnd.inspect,
          gameEnd.message,
          logs,
          gameEnd.trace
        );

        this.logLevel = 0;
        return gameEnd.EXIT;
      }
      return gameEnd.EXIT;
    }
    return gameEnd.EXIT;
  }

  /** evaluateParameter: @version 0.4.2 @date 2023/04/02
   * @function evaluateParameter
   * @kind function
   * @description checks for presnce of parameter value and returns it, else exits on null or undefined.
   * @param {object} param Parmeter under evaluation
   * @param {number} [playerindex] Optional, switches between number of parameters @default 0
   * @param {number} [log] Optional, log @default 0
   * @param {string} [locname] Optional, method location in log @default this.fileName
   * @constant {boolean} NOTNULL Check flay for no nulls, falsey for Nullish operator @default false
   * @constant {boolean} ISNULL Check flag for nulls, truthy for Nullish operator @default true
   * @constant {boolean} TYPE Check type for string literals @default "string"
   * @return {object} param The parameter being checked
   * @throws {Error} If param is null or undefined.
   * @memberof GameLogic
   * @date 2023/03/19 @version 0.3.0
   * @date 2023/03/24 @version 0.3.1 Updated Docstrings
   * @date 2023/04/01 @version 0.4.1  UPDATE Refactored error handling for readability
   * @date 2023/04/02 @version 0.4.2  Bumped
   */
  // @date 2023/04/09 Debt Rating: C; CC= 10. Complex Method: Learning & Assessment,
  evaluateParameter(
    param,
    playerindex = 0,
    log = this.logLevel,
    locname = `${this.fileName}: evaluateParameter()`
  ) {
    // 1: Assign block vars
    const logs = log;
    const cast = {
      NOTNULL: false,
      ISNULL: true,
      ISSTR: "string",
    };
    // 2: Object literal map for Player id
    const paramNameMap = {
      1: "Player 1's Piece",
      2: "Player 2's Piece",
      default: "Current Player has no current piece",
    };
    // 2: Object literal map for error strings
    const output = {
      1: "not set",
      2: "required",
      default: "Null | Undefined",
    };
    // 3: Checks param validitity
    if ((param ?? cast.NOTNULL) && typeof param === cast.ISSTR) {
      return param;
    }
    // 4: When param is null/exception
    if (param ?? cast.ISNULL) {
      const paramName = paramNameMap[playerindex] || paramNameMap.default;
      const error = {
        message: `${locname}: ${output.default}: ${paramName} - ${param} is ${
          param ? output[1] : output[2]
        }`,
        traces: `${locname}: Parameter Error`,
        console: logs,
      };
      this.deBug._debug(param, error.message, error.console, error.traces);
      throw new Error(`${error.traces}: ${error.message}`);
    }
  }
}

export { Game };
