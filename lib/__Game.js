 // @ts-check
/** Game.js 001 Module
is  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @date 2023/03/16
 * @date 2023/04/01 @version 0.4.3 Major: Addec STATE Constants
 * @date 2023/04/10 @version 0.5.0 Bump. Significant Code/Critcial Path change.
                    Deterministic Finite State Machine and Controller
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GameLogic } from "GameLogic.js"; @see module:GameLogic
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 */
/** * @bug Module path is either "/lib/" or "../lib" or ".\lib" ... Breaking change for GITHUB Pages */
import { GameBoard } from "../lib/__GameBoard.js";
import { GamePieces } from "../lib/__GamePieces.js";
import { GameLogic } from "../lib/__GameLogic.js";
import { GameDebug } from "../lib/__GameDebug.js";

/** GAME @version 0.5.0 @date 2023/04/02: Added FSM Object STATES
 * @name Game
 * @kind class
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @prop {GameDebug} deBug @kind member @private
 * @prop {string} Player1's @kind member @public
 * @prop {string} Player2's @kind member @public
 * @prop {GameBoard} gameBoard @kind member @private
 * @prop {string} currentPiece @kind member @public
 * @prop {string} playedPiece @kind member @public
 * @prop {GamePieces} gamePieces @kind member @private
 * @prop {GameLogic} gameLogic  c@kind member @private
 * @prop {string} fileName @kind member @private
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
 * @prop {object} STATES Finite State Machine @interface @kind member @public
 * @prop {string} gameRunning @kind member @public
 * @prop {string} movesOutcome @kind member @public
 * @prop {string} resultOutcome @kind member @public
 * @prop {string} flowControl @kind member @public
 * @constructor @kind class @public
 * @function onInit @kind function @public
 * @function isGameStarted @kind function @public
 * @function checkMove @kind function @private
 * @function updateGrid @kind function @public
 * @function makeMove @kind function @public
 * @function nextTurn @kind function @private
 * @function isGameOver @kind function @public
 * @function endGame @kind function @public
 * @function evaluateParameter @kind function @private
 * @date 2023/03/22 @version 0.3.0 . See Changelog on this date.
 * @date 2023/04.02 @version 0.4.2  Class Definition update: added new functions, new constants, current interfaces
 * @date 2023/04.02 @version 0.5.0  Bumped, Added FSM called STATE. (Finite State Machine 'prototype', not complete implement. Added typing to Javasript using JDoc types. All states are string states (determinate), not boolean (indeterminate) states.
 */
class Game {
    /** GAME Declaration  @version 0.5.0 @date @2023/04/10
     * @prop {GameDebug} deBug Debugger/Console
     * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
     * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
     * // Dependencies Object
     * @prop {GameBoard} gameBoard Game's board and conditions of play
     * @prop {GamePieces} gamePieces Players' pieces for the game play.
     * @prop {GameLogic} gameLogic Determines the Outcome states for each move, thus terminal resultant states.states of the game
     * // Interim Pieces
     * @prop {string} currentPiece @kind member @public
     * @prop {string} playedPiece @kind member @public
     * // Game `proxy` Determinitic Finite State machine. Single source of state/truth per game.
     * @prop {object} STATES FSM Interface. Object.dot.property Key:Value constants for game, flow, move and result states. @interface @public
     * // Logging Flags
     * @prop {string} fileName - FileNams identifer for Error Handling
     * @prop {number} logLevel Logs to console @default 0
     * @prop {number} errorLevel Error to console @default 9
     * // Game Flags: 1st States on Instantiation
     * @prop {string} gameRunning Game state machine @default this.STATES.game.INITIAL
     * @prop {string} movesOutcome Each move's outome @default this.STATES.moves.READY
     * @prop {string} resultOutcome Result's outcome @default this.STATES.outcomes.NONE
     * @prop {string} flowControl Game/App Flow control @default this.STATES.flow.ENTER
     */
    // Game Fields (Properties): @version 0.5.0 @date 2023/04/10
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
            INITIAL: "INITIAL", // Game initialised
            START: "START", // Game start or not started
            RUN: "RUN", // Game running, (started)
            STOP: "STOP", // Game stopped (Move is terminal)
            OVER: "OVER", // Game is over (Result has outcome)
            TRY: "TRYAGAIN", // Request user try again,
            REPEAT: "REPEAT", // As above
            PAUSE: "PAUSE",
            EXIT: "EXIT", // User pauses game or logic needs pause
        },
        moves: {
            READY: "READY", // Initial, pre 1st move
            CONTINUE: "CONTINUE", // Non Final Move
            TERMINAL: "TERMINAL", // Final Move
            ILLEGAL: "ILLEGAL", // Illegal move (i.e. cell occupied)
            VALID: "VALID", // Valid Move state
        },
        outcomes: {
            NONE: "NONE", // Initial Outcome, Netural
            WIN: "WIN", // Win Outcomes
            NOWIN: "NOWIN", // Opposing state to WIN
            DRAW: "DRAW", // Draw Outcomes: No winner/no looser
            NODRAW: "NODRAW", // Opposing state to WIN
            LOST: "LOST", // Lost Outcome for other player
            NOLOST: "LOST", // Lost Outcome for other player
            PLAY: "PLAY", // Continue state, end of a move, no result yet
            RESULT: "RESULT", // Combined state to win or draw
            NORESULT: "NORESULT", // Opposing result state to Combined state.
            UNRESOLVED: "UNRESOLVED", // Unknown outcome
        },
        flow: {
            ENTER: "ENTER", // Enter state of app/game
            INTERUPTS: "INTERUPT", // Interupt from error/pause etc
            RESUME: "RESUME", // Rsume state from an interupt
            OK: "OK", // Ok state to User
            CANCEL: "CANCEL", // Cancel state to User
            CONFIRM: "CONFIRM", // Confirm state to User
            POSITIVE: "POSITIVE", // Positive flow state
            NEGATIVE: "NEGATIVE", // Negative flow state
            PROMPT: "PROMPT", // Prompt state to User
            ALERT: "ALERT", // Alert state to User
            ERROR: "ERROR", // Error state
            RESET: "RESET", // Reses GAM,
            EXIT: "EXIT", // EXIT GAME
        },
    };
    /**@type {string}*/
    gameRunning = this.STATES.game.INITIAL;
    /**@type {string}*/
    movesOutcome = this.STATES.moves.CONTINUE;
    /**@type {string}*/
    resultOutcome = this.STATES.outcomes.NONE;
    /**@type {string}*/
    hasEnded;
    /**@type {string}*/
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
     * @version 0.5.0 @date 2023/04/10  Bumped. Object & Property Pattern
     *   1) players: Object of Player objects. Added initial states for each class instance (resets game's state)

     */

    constructor(_X = "X", _O = "O", log = 0, filename = `Game.js`) {
        // 1: Assigned blocks vars and CONSTANTS
        const players = {
            one: {
                name: "Player 1",
                default: "X",
                piece: _X,
                index: 1,
                console: log,
                trace: `${filename}: sets Player1`,
            },
            two: {
                name: "Player 2",
                default: "O",
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
        this.movesOutcome = this.STATES.moves.CONTINUE;
        this.resultOutcome = this.STATES.outcomes.NONE;
        this.flowControl = this.STATES.flow.ENTER;
    }

    /** Game onInit : Initialiser @version 0.5.0 @date 2023/04/10
     * @name onInit
     * @kind function
     * @description Initialises the Game's dependencies, and initialise the class active game state.
       * @return  Updates the caller's state
     * @param {string} isRunning @default "RUN" for testing
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
     * @date 2023/04/01 @version 0.5.0 Bumped. Block Object & Property pattern. Added state machine updated to game, moves, results and flow control base on conditions
        Objects
        1) state: Game's localised state and details (status, message, logging, trace and pieces as needed)
        2) exception: Game initialisation exception object
     * @memberof Game
     */ // Set isRunning = true by default for positive flow testing

    onInit(isRunning = "RUN", log = this.logLevel, locname = `${this.fileName}: onInit`) {
        // 1: Sets Block level: Object & Property Pattern
        const state = {
            CURRENT: {
                status: isRunning,
                message: `On Initailisation: Current ${isRunning}`,
                trace: `${locname}: State is${isRunning}`,
                console: log,
                game: this.gameRunning,
                moves: this.movesOutcome,
                results: this.resultOutcome,
                flow: this.flowControl,
            },
            INITIAL: {
                current: isRunning,
                status: this.STATES.game.INITIAL,
                message: `The game is is initialising.`,
                trace: `${locname}: ${this.STATES.game.INITIAL}`,
                console: 1,
            },
            NOSTART: {
                current: isRunning,
                status: this.STATES.game.STOP,
                message: `The game has not started. Click the start button again.`,
                trace: `${locname}: ${this.STATES.game.STOP}`,
                console: 8,
            },
            START: {
                current: isRunning,
                status: this.STATES.game.START,
                piece: this.gamePieces.currentPiece,
                message: `The game is started started.`,
                trace: `${locname}: ${this.STATES.game.START}`,
                console: log,
            },
            RUN: {
                current: isRunning,
                status: this.STATES.game.RUN,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started.`,
                trace: `${locname}: ${this.STATES.game.RUN}`,
                console: log,
            },
            EXIT: {
                current: isRunning,
                status: this.STATES.flow.EXIT,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started.`,
                trace: `${locname}: ${this.STATES.flow.EXIT}`,
                console: log,
            },
            DEBUG: {
                current: isRunning,
                status: this.STATES.flow.INTERPUT,
                message: `Game interupted: Debug Error`,
                trace: `${locname}: ${this.STATES.flow.INTERPUT}`,
                console: this.errorLevel,
            },
            ERROR: {
                current: isRunning,
                status: this.STATES.flow.ERROR,
                trace: `Game faulted; Initialise Error`,
                message: `${locname}: ${this.STATES.flow.ERROR}`,
                console: this.errorLevel,
            },
        };
        debugger; /** TODO REMOVE */
        try {
            // 3: Assign the game's pieces to a) the current game players and b)  up a new board
            this.gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
            this.currentPiece = state.START.piece;
            this.deBug._debug(state.START.piece, state.START.message, state.START.console, state.START.trace);
            this.gameBoard = new GameBoard(); /* ?+*/
            // 4: Link the current board and current pieces to the game logic
            this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces);
            // 5: First run state switch game from START to RUN
            if (state.CURRENT.status === this.STATES.game.START) {
                // Console: first and only state. Set when start button is clicked.
                console.log(state.START.message);
                this.gameRunning = this.STATES.game.RUN; // Set to Running state, prime state for active game
            }
            // 6: Set the game persistent active state to true, for duration of the game, from the game init.
            if (state.CURRENT.status === this.STATES.game.RUN) {
                // Console
                console.log(state.RUN.message);
                // Update persistent running state
                this.gameRunning = this.STATES.game.RUN; // Set to Running state, prime state for active game
                this.movesOutcome = this.STATES.moves.CONTINUE; // Confirm move ready, not played.
                this.resultOutcome = this.STATES.outcomes.NONE; // Reset game outcome
                this.flowControl = this.STATES.flow.ENTER; // Set to enter the game
                // Output to console
                this.deBug._debug(state.CURRENT.status, state.RUN.message, state.RUN.console, state.RUN.trace);
            }
            // 7: Not Running, Not Started: Reset to Initial state. Beware of state loops
            if (state.CURRENT.status !== this.STATES.game.RUN && state.CURRENT.status === state.NOSTART.status) {
                this.gameRunning = this.STATES.game.INITIAL; // Reset game initialiseation, not yet active, not inactive
                this.movesOutcome = this.STATES.moves.READY; // Confirm move ready, not played.
                this.resultOutcome = this.STATES.outcomes.NONE; // Reset game outcome
                this.flowControl = this.STATES.flow.INTERPUT; // Pause game flow.
                window.alert(state.NOSTART.message);
                this.deBug._debug(
                    state.CURRENT.status,
                    state.NOSTART.message,
                    state.NOSTART.console,
                    state.NOSTART.trace
                );
            }
            // 8: Not Running, Not No Started:  Reset to Initial state. Beware of state loops
            // Alert developer: Interface with a user message by state flag and flow state.
            if (state.CURRENT.status !== this.STATES.game.RUN && state.CURRENT.status !== state.NOSTART.status) {
                this.gameRunning = this.STATES.game.INITIAL; // Reset game initialiseation
                this.movesOutcome = this.STATES.moves.READY; // Confirm move ready, not played.
                this.resultOutcome = this.STATES.outcomes.NONE; // Reset game outcome
                this.flowControl = this.STATES.flow.ENTER; // Set to enter the game
                window.alert(state.NOSTART.message);
                this.deBug._debug(
                    state.CURRENT.status,
                    state.NOSTART.message,
                    state.NOSTART.console,
                    state.NOSTART.trace
                );
            }
        } catch (errorinit) {
            // 9: Exception Object & Property Pattern for Error Block scope
            const exception = {
                error: errorinit,
                current: state.CURRENT.status,
                message: `${state.ERROR.message} ${errorinit.linenumber}:${errorinit.columnNumber}`,
                console: 8,
                trace: `${state.ERROR.trace}: State: ${state.CURRENT.status}`,
                game: this.STATES.game.STOP,
                moves: this.STATES.moves.ILLEGAL,
                result: this.STATES.outcomes.UNRESOLVED,
                flow: this.STATES.flow.ERROR,
            };
            state.ERROR.console = exception.console
            // 10: Sets game state machine to exceptional states, error states and out of bounds.
            this.gameRunning = exception.game;
            this.movesOutcome = exception.moves;
            this.resultOutcome = exception.result; // Reset game initialiseation
            this.flowControl = exception.flow;
            // 11: Error Output to console
            this.deBug._debug(exception.error, exception.message, exception.console, exception.trace);
            this.deBug._debug(exception, exception.message, exception.console, exception.trace);
        }
    }

    /** isGameStarted @version 0.4.2 @date 2023/04/02
     * @function isGameStarted
     * @kind function
     * @description checks if a game has started (initial is false), and updated the game active state to true.
     * @param {string} [isRunning] Toggles initial state of the game from initial state or User message @default this.INITSTATE
     * @usage Used as interface to signal to UI/User with Alerts (OK Only).
     * @date 2023/03/30 @since @version 0.4.1
     * @return {string}  Returns the START state for the game fom INITIAL state. No exit state yet.
     * @memberof Game
     * @version 0.4.1 @date 2023/04/01 Added constant, User message if game is already running and exit flow.
     * @version 0.4.2 @date 2023/04/02 Update of JSDoc for constants
     * @version 0.5.0 @date 2023/04/10 Bumped. Object & Property Pattern for Game Started scope
       1) state: Block Object for  games entery / readiness states.
          a) state.CURRENT, state.INITIAL, state.NOSTART, state.START, state.RUN, state.ERROR/DEBUG
     */

    isGameStarted(
        isRunning = this.STATES.game.INITIAL,
        log = this.logLevel,
        locname = `${this.fileName}: isGameStarted`
    ) {
        const state = {
            CURRENT: {
                status: isRunning,
                message: `The game current state is ${isRunning}`,
                trace: `${locname}: Current ${isRunning}`,
                console: log,
                game: isRunning,
                moves: this.STATES.moves.READY,
                results: this.STATES.outcomes.PLAY,
                flow: this.STATES.flow.ENTER,
            },
            INITIAL: {
                current: isRunning,
                status: this.STATES.game.INITIAL,
                message: `The game is is initialising.`,
                trace: `${locname}: ${this.STATES.game.INITIAL}`,
                console: 1,
            },
            NOSTART: {
                current: isRunning,
                status: this.STATES.game.STOP,
                message: `The game has not started. Click the start button again.`,
                trace: `${locname}: ${this.STATES.game.STOP}`,
                console: 8,
            },
            START: {
                current: isRunning,
                status: this.STATES.game.START,
                piece: this.gamePieces.currentPiece,
                message: `The game is started started.`,
                trace: `${locname}: ${this.STATES.game.START}`,
                console: log,
            },
            RUN: {
                current: isRunning,
                status: this.STATES.game.RUN,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started.`,
                trace: `${locname}: ${this.STATES.game.RUN}`,
                console: log,
            },
            EXIT: {
                current: isRunning,
                status: this.STATES.flow.EXIT,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started.`,
                trace: `${locname}: ${this.STATES.flow.EXIT}`,
                console: log,
            },
            DEBUG: {
                current: isRunning,
                status: this.STATES.flow.INTERPUT,
                message: `Game interupted: Debug Error`,
                trace: `${locname}: ${this.STATES.flow.INTERPUT}`,
                console: this.errorLevel,
            },
            ERROR: {
                current: isRunning,
                status: this.STATES.flow.ERROR,
                trace: `Game faulted; Initialise Error`,
                message: `${locname}: ${this.STATES.flow.ERROR}`,
                console: this.errorLevel,
            },
        };
        // 2: Switches game from initial to Start state, and update the game state flags for game startedness/Begin state
        if (state.CURRENT.status === this.STATES.flow.INITIAL) {
            this.gameRunning = state.START.status;
            this.movesOutcome = state.CURRENT.moves;
            this.resultOutcome = state.CURRENT.results;
            this.flowControl = state.CURRENT.flow;
            this.deBug._debug(state.CURRENT, state.CURRENT.message, state.CURRENT.console, state.CURRENT.trace);
            return state.START.status;
        }
            return state.INITIAL.status;
    }

    /**
     * checkMove @version 0.4.2 @date 2023/04/02 @TODO REMOVE DEFAULT FOR VALIDMOVE
     * TODO REMOVE VALID default value, and just check for truthy WHILE TESTING
     * @function checkMove
     * @kind function
     * @description checks if the move is valid and the game is not over.
     * @param {string} move The index of the move to make
     * @param {string} isRunning if the move is valid, based on game's transitory state.
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

    checkMove(move, isRunning = "RUN", log = this.logLevel, locname = `${this.fileName}: checkMove()`) {
        // 1: Assign Block Casts/Types
        const cast = {
            NOTNULL: false,
            ISNULL: true,
            NUMTYP: "number",
            STRTYP: "string",
            EMPTY: "",
        };
        // 1: Game States
        const state = {
            CURRENT: {
                gridID: parseInt(move),
                status: isRunning,
                piece: this.gamePieces.currentPiece,
                message: `The game current state is ${isRunning}`,
                trace: `${locname}: Current ${isRunning}`,
                console: log,
                game: this.gameRunning,
                moves: this.movesOutcome,
                results: this.resultsOutcome,
                flow: this.flowControl,
            },
            INITIAL: {
                current: isRunning,
                status: this.STATES.game.INITIAL,
                message: `The game is is initialising. Current status is ${isRunning}.`,
                trace: `${locname}: ${this.STATES.game.INITIAL}`,
                console: 1,
            },
            NOSTART: {
                current: isRunning,
                status: this.STATES.game.STOP,
                message: `The game has not started. Click the start button again. Current status is ${isRunning}.`,
                trace: `${locname}: ${this.STATES.game.STOP}`,
                console: 8,
            },
            START: {
                current: isRunning,
                status: this.STATES.game.START,
                piece: this.gamePieces.currentPiece,
                message: `The game is started started. Current status is ${isRunning}.`,
                trace: `${locname}: ${this.STATES.game.START}`,
                console: log,
            },
            RUN: {
                current: isRunning,
                status: this.STATES.game.RUN,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}: ${this.STATES.game.RUN}`,
                console: log,
            },
            PAUSE: {
                current: isRunning,
                status: this.STATES.game.PAUSE,
                piece: this.gamePieces.currentPiece,
                message: `The game is pausesd, was runnig, was started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}: ${this.STATES.game.PAUSE}`,
                console: log,
            },
            TRYAGAIN: {
                current: isRunning,
                status: this.STATES.game.PAUSE,
                piece: this.gamePieces.currentPiece,
                message: `The game is pausesd, was runnig, was started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}: ${this.STATES.game.PAUSE}`,
                console: log,
            },
            EXIT: {
                current: isRunning,
                status: this.STATES.flow.EXIT,
                message: `The game is exiting, is over, and has stopped.`,
                trace: `${locname}: ${this.STATES.flow.EXIT}`,
                console: log,
            },
            TYPE: {
                current: isRunning,
                status: this.STATES.flow.INTERPUT,
                message: `Game interupted: Debug Error: Type is ${typeof move}`,
                trace: `${locname}: ${this.STATES.flow.INTERPUT}`,
                console: this.errorLevel,
            },
            ERROR: {
                current: isRunning,
                status: this.STATES.flow.ERROR,
                trace: `Game faulted; Initialise Error`,
                message: `${locname}: ${this.STATES.flow.ERROR}`,
                console: this.errorLevel,
            },
        };
        // 2: Input : Check for string, update to Number
        if (typeof state.CURRENT.gridID === cast.STRTYPE) {
            state.CURRENT.gridID = parseInt(move);
        }
        // 2: Error Control: Check if not Number, throw an Error if not.
        if (typeof state.CURRENT.gridID !== cast.NUMTYPE) {
            return new Error(`${state.TYPE.trace}: ${state.TYPE.message}`);
        }
        // 3: Positive Flow: is Number, Is Running, Grid free or not, Try again or Carry on Running
        if (typeof state.CURRENT.gridID === cast.NUMTYP && state.CURRENT.status === state.RUN.status) {
            // 4: Checks if the grid cell/target has been filled from a prior move.
            if (this.gameBoard.grid[state.CURRENT.gridID] !== cast.EMPTY) {
                window.alert(state.TRYAGAIN.message);
                this.deBug._debug(state.CURRENT, state.TRYAGAIN.message, state.TRYAGAIN.console, state.TRYAGAIN.trace);
                this.gameRunning = state.TRYAGAIN.status;
                return state.TRYAGAIN.status;
            }
            // 4: Before setting a state for a active & valid move
            if (this.gameBoard.grid[state.CURRENT.gridID] === cast.EMPTY) {
                if (this.gameRunning === state.RUN.status) {
                    this.deBug._debug(state.CURRENT, state.RUN.message, state.RUN.console, state.RUN.trace);
                    this.gameRunning = state.RUN.status;
                    return state.RUN.status;
                }
            }
        }
        // 5: Negative flow: Current State is stop, and persistent Running state is Stopped
        // Check if game over. Use isGameOver to resume ending states or resumedness
        if (state.CURRENT.status === state.STOP.status) {
            if (this.gameRunning === state.STOP.status) {
                window.alert(`${state.STOP.trace}: ${state.STOP.message}`);
                this.deBug._debug(this, state.STOP.message, state.STOP.console, state.STOP.trace);
                this.isGameOver(state.CURRENT.status, state);
                this.gameRunning = this.STATES.game.STOP;
                return state.STOP.status;
            }
        }
        // 6: Negative flow: Switch between RUN, RESUME, RESTART, STOP, EXIT
        if (state.CURRENT.status === state.PAUSE.status) {
            this.deBug._debug(state.CURRENT, state.PAUSE.message, state.PAUSE.console, state.PAUSE.trace);
            // Do something, not often we get to Pause before check move
            this.gameRunning = state.PAUSE.status;
        }
        // 6: Negative flow: Switch between RUN, RESUME, RESTART, STOP, EXIT
        if (state.CURRENT.status === state.EXIT.status) {
            window.alert(`${state.EXIT.trace}: ${state.EXIT.message}`);
            this.deBug._debug(state.CURRENT, state.EXIT.message, state.EXIT.console, state.EXIT.trace);
            // Do something, not often we get to Pause before check move
            this.gameRunning = state.EXIT.status;
        }
        // 7: Instead of Pause, Prompt user to try move again as default.
        this.gameRunning = state.TRYAGAIN.status;
        return state.TRYAGAIN.status;
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

    updateGrid(move, cell, log = this.logLevel, locname = `${this.fileName}: updateGrid()`) {
        debugger; /**@TODO REMOVE*/
        // 1: Block Object & Property Pattern
        const updates = {
            gridID: parseInt(move),
            target: cell,
            piece: this.currentPiece,
            message: `Current Piece ${this.currentPiece} to update Grid`,
            actual: `${locname} Current Target ${cell.toString()} on move ${move},`,
            trace: `${locname} Game's is ${this.gameRunning}. Move is ${this.movesOutcome}`,
            debug:  ``,
            console: log,
        };
        updates.debug = `${updates.message}. ${updates.actual}`;
        // 2: Positive Flow: Fill the grid per move.
        // @ts-ignore
        if (updates.piece === this.gamePieces.currentPiece) {
            this.gameBoard.grid[updates.gridID] = updates.piece;
            console.dirxml(this.gameBoard.grid[updates.gridID], updates.target);
            this.gameRunning = this.STATES.game.RUN;
        } else {
            // Have User try again if on each move Current Pieces are not the same. Update issue.
            this.gameRunning = this.STATES.game.TRYAGAIN;
        }
        this.deBug._debug(updates.piece, updates.debug, updates.console, updates.trace);
        // this.gameBoard.currentCellMove(updates.target);
    }

    /** makeMove  @version 0.4.2 @date 2023/04/02
     * @function makeMove
     * @kind function
     * @description Assigns the current piece to the move if it is valid and the game is not over.
     * If the game is over (i.e., there is a winner or a draw), it resets the game. and returns boolean state to UI Handlers onClick
     * @param {string} move The index of the current move (cell index).
     * @param {Node} current Current cell, param passing of current node to update the grid's repository
     * @param {string} isRunning Current transitory state ACTIVE || INACTIVE
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

    makeMove(move, current, isRunning = "RUN", log = this.logLevel, locname = `${this.fileName}: makeMove()`) {
        // 1: Assign Object style Messages & Traces
        const outputs = {
            messages: {
                this: `makeMove()`,
                checks: `checksMove()`,
                updates: `updateGrid()`,
                init: `onBegin()`,
                run: `onRun()`,
                stop: `Game onStop`,
                pause: `Game onPause`,
                isover: `isGameOver()`,
                error: `throws Error`,
            },
            traces: {
                this: `Make Move`,
                checks: `Check Move`,
                updates: `Game Grid Updated`,
                init: `Game Set()`,
                run: `Game onRun`,
                stop: `Game onStop`,
                pause: `Game onPause`,
                isover: `Game Over`,
                error: `Error in makeMove()`,
            },
            types: {
                UNDEF: "undefined",
                STRTYPE: "string",
                NUMTYPE: "number",
                EMPTY: "",
            },
        };
        //Local state machine for critical path method.
        const state = {
            CURRENT: {
                gridID: move,
                status: isRunning,
                target: current,
                piece: this.gamePieces.currentPiece,
                message: `The game current state is ${isRunning}`,
                locname: locname,
                trace: `${locname}: Current ${isRunning}`,
                console: log,
                game: this.gameRunning,
                moves: this.movesOutcome,
                results: {
                    status: this.resultsOutcome,
                    none: this.STATES.outcomes.NORESULT,
                    playon: this.STATES.outcomes.PLAY,
                    conculded: this.STATES.outcomes.RESULT,
                    win: undefined,
                    draw: undefined,
                    outcome: undefined,
                },
                flow: this.flowControl,
                players: {
                    win: this.gamePieces.currentPiece,
                    lost: this.gamePieces.switchPieces(this.gamePieces.currentPiece),
                    drew: "There was no winner/looser: Just a draw",
                },
                validate: undefined,
            },
            INITIAL: {
                current: isRunning,
                status: this.STATES.game.INITIAL,
                game: this.STATES.game.INITIAL,
                moves: this.STATES.moves.READY,
                outcome: this.STATES.outcomes.NONE,
                flow: this.STATES.flow.ENTER,
                message: `The game is is initialising. Current status is ${isRunning}.`,
                trace: `${locname}: ${this.STATES.game.INITIAL}`,
                console: 1,
            },
            CHECKS: {
                current: isRunning,
                status: isRunning,
                message: `Move is being checked. Current status is ${isRunning}.`,
                trace: `${locname}: ${outputs.traces.this} : CHECKS`,
                console: 1,
            },
            NOSTART: {
                current: isRunning,
                status: this.STATES.game.STOP,
                message: `The game has not started. Click the start button again. Current status is ${isRunning}.`,
                trace: `${locname}: ${outputs.traces.this} ${this.STATES.game.STOP}`,
                console: 8,
            },
            START: {
                current: isRunning,
                status: this.STATES.game.START,
                piece: this.gamePieces.currentPiece,
                message: `The game is started started. Current status is ${isRunning}.`,
                trace: `${locname}: ${outputs.traces.this} ${this.STATES.game.START}`,
                locname: locname,
                console: log,
            },
            RUN: {
                current: isRunning,
                status: this.STATES.game.RUN,
                game: this.STATES.game.RUN,
                moves: this.STATES.moves.CONTINUE,
                outcome: this.STATES.outcomes.PLAY,
                flow: this.STATES.flow.ENTER,
                piece: this.gamePieces.currentPiece,
                message: `The game is running, and has started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}: ${outputs.traces.this} ${this.STATES.game.RUN}`,
                locname: locname,
                console: log,
            },
            PAUSE: {
                current: isRunning,
                status: this.STATES.game.PAUSE,
                game: this.STATES.game.PAUSE,
                moves: this.STATES.moves.READY,
                outcome: this.STATES.outcomes.NONE,
                flow: this.STATES.flow.INTERPUT,
                piece: this.gamePieces.currentPiece,
                message: `The game is paused, was running, was started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}: ${outputs.traces.this} ${this.STATES.game.PAUSE}`,
                locname: locname,
                console: log,
            },
            STOP: {
                current: isRunning,
                status: this.STATES.game.STOP,
                game: this.STATES.game.STOP,
                moves: this.STATES.moves.TERMINAL,
                outcome: this.STATES.moves.UNRESOLVED,
                flow: this.STATES.flow.INTERUPT,
                piece: this.gamePieces.currentPiece,
                message: `The game has stopped, was running, was started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}:${outputs.traces.this} ${this.STATES.game.STOP}`,
                locname: locname,
                console: log,
            },
            OVER: {
                current: isRunning,
                status: this.STATES.game.OVER,
                game: this.STATES.game.OVER,
                moves: this.STATES.moves.TERMINAL,
                outcome: this.STATES.outcomes.RESULT,
                flow: this.STATES.flow.RESET,
                piece: this.gamePieces.currentPiece,
                message: `The game is over, was stopped, now terminal, not continuing. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}:${outputs.traces.this} ${this.STATES.game.OVER}`,
                locname: locname,
                console: log,
            },
            TRYAGAIN: {
                current: isRunning,
                status: this.STATES.game.PAUSE,
                game: this.STATES.game.TRYAGAIN,
                moves: this.STATES.moves.CONTINUE,
                outcome: this.STATES.outcomes.PLAY,
                flow: this.STATES.flow.RESUME,
                piece: this.gamePieces.currentPiece,
                message: `The game is pausesd, was runnig, was started. Current status is ${isRunning} and move  ${move}.`,
                trace: `${locname}:${outputs.traces.this} ${this.STATES.game.PAUSE}`,
                locname: locname,
                console: log,
            },
            EXIT: {
                current: isRunning,
                status: this.STATES.flow.EXIT,
                game: this.STATES.game.OVER,
                moves: this.STATES.moves.TERMINAL,
                outcome: this.STATES.outcomes.RESULT,
                flow: this.STATES.flow.EXIT,
                message: `The game is exiting, is over, and has stopped.`,
                trace: `${locname}: ${this.STATES.flow.EXIT}`,
                locname: locname,
                console: log,
            },
            TYPE: {
                current: isRunning,
                status: this.STATES.flow.INTERPUT,
                message: `Game interupted: Debug Error: Type is ${typeof move}`,
                trace: `${locname}: ${this.STATES.flow.INTERPUT}`,
                console: this.errorLevel,
            },
            ERROR: {
                current: isRunning,
                status: this.STATES.flow.ERROR,
                trace: `Game faulted; Initialise Error`,
                message: `${locname}: ${this.STATES.flow.ERROR}`,
                locname: locname,
                console: this.errorLevel,
            },
        };

        const result = {
            NONE: {
                status: this.STATES.outcomes.NONE,
                value: this.STATES.outcomes.NONE.toString(),
                decision: this.STATES.outcomes.READY,
                moves: this.movesOutcome,
                outcome: this.STATES.outcomes.WIN,
                message: `Game is indetermined`,
                trace: `${locname}: ${outputs.traces.this} Game No Result.`,
            },
            WIN: {
                status: this.gameLogic.hasWin,
                value: this.gameLogic.hasWin.valueOf(),
                decision: this.STATES.outcomes.TERMINAL,
                moves: this.movesOutcome,
                outcome: this.STATES.outcomes.WIN,
                message: `Game is won`,
                trace: `${locname}: ${outputs.traces.this} Game Draw.`,
                console: log,
            },
            DRAW: {
                status: this.gameLogic.hasDraw,
                value: this.gameLogic.hasDraw.valueOf(),
                decision: this.STATES.moves.TERMINAL,
                moves: this.movesOutcome,
                outcome: this.STATES.outcomes.DRAW,
                message: `Game is drawn`,
                trace: `${locname}: ${outputs.traces.this} Game Draw.`,
                console: log,
            },
            PLAYON: {
                status: this.gameLogic.hasResult,
                value: this.gameLogic.hasResult.valueOf(),
                decision: this.STATES.moves.CONTINUE,
                moves: this.movesOutcome,
                outcome: this.STATES.outcomes.NONE,
                message: `No result, play on`,
                trace: `${locname}: ${outputs.traces.this} Game Continues.`,
                console: log,
            },
            OUTCOME: {
                current: this.movesOutcome,
                winner: this.currentPiece,
                looser: this.gamePieces.switchPieces(this.currentPiece),
                winnessage: `Player ${this.currentPiece} wins`,
                loosemesage: `Player ${this.gamePieces.switchPieces(this.currentPiece)} looses`,
                message: `This game has an outcome. The moves are ${this.movesOutcome} and the result is ${
                    this.STATES.outcomes[this.movesOutcome]
                }. The game is/has ${this.gameRunning}.`,
                trace: `${locname}: ${outputs.traces.this} Game Outcome`,
                console: log,
            },
        };
        // 2: Error control for a critical method

        function setsError(error) {
            if (error instanceof Error) {
                const errors = {
                    error,
                    name:`Make Move Error`,
                    stack: error.stack,
                    message: ``,
                    location: `${locname}: Validation error ${error.toString()}`,
                    trace: `${locname} : ${error.name}: ${outputs.traces.error}`,
                    statement: ``,
                    console: log,
                };
                error.name = `Make Move Error`;
                errors.name = error.name
                errors.message = `${errors.name} ${errors.location}: ${errors.stack}.${errors.cause}`;
                errors.statement = `${errors.trace}: ${errors.message}`;
                this.deBug._debug((errors.error, errors.message, errors.console, errors.trace));
                return error;
            } else {
                window.alert("No Error. Ugh??. Contact the Developer");
                return "EXIT";
            }
        }



        try {
            // 3: Check each move v prior moves and game's transitory state
            const validate = this.checkMove(
                state.CURRENT.gridID,
                state.CURRENT.status,
                state.CURRENT.console,
                outputs.traces.checks
            );
            // 4: Return the Outcome of the game or an error
            /** @type {string|object} */
            const outcome = this.isGameOver(state.CURRENT.status, state, state.CURRENT.console, outputs.traces.isover);

            switch (validate) {
                // If Game is initial state (exception) to then enable game
                case state.INITIAL.status:
                    return this.onBegin(state, result, outputs);
                // Return to Caller: Result: Win | Draw | Play On or Error
                case state.RUN.status:
                    return this.onRun(state, outcome, result, outputs);
                // If Game is in STOP STATUS
                case state.STOP.status:
                    return this.onStop(state, outcome, result, outputs);
                // If Game is in OVER STATUS
                case state.OVER.status:
                    return this.onOver(state, outcome, result, outputs);
                // If Game is in PAUSE STATUS
                case state.PAUSE.status:
                    return this.onPause(state, outcome, result, outputs);
                // Defaul: Error exception state for an illegal move
                default:
                    return this.checksError(state, validate, outputs);
            }
        } catch (makemoveerror) {
            return setsError(makemoveerror);
        }
    }

    // END Critcial PATH Method
    // Conditionally check STOP state, and update  flags and result states
        /** onRun  @version 0.5.0 @date 2023/04/12
     * @function onBegin alias for onInitialise/onInit
     * @kind function
     * @description: Handles the Run  flags output after a Game over State is checked
     * @returns {string | Error} Returns the resultant decision:result Win | DRAW | PLAY ON (Continue)
            1: Win: this.STATES.outcomes.WIN (or this.gameLogic.hasWin)
            2: Draw: this.STATES.outcomes.DRAW (or this.gameLogic.hasDraw)
            3: Play On: this.STATES.outcomes.= NORESULT (or this.gameLogic.hasResult = NORESULT)
            4: Error @ type {Error}
     * @param {object} state The local state object/properties
     * @param {object} result The local result state object
     * @param {object} outputs Ouput strings for console/Errors
     * @summary Use of closure functions set*() for improved readability and cleaner switch case.*/
    onBegin(state, result, outputs) {
        window.alert("Why me, why am I here?");
        this.deBug._debug(state.CURRENT, state.TRYAGAIN.message, state.TRYAGAIN.console, outputs.traces.init);
        this.gameRunning = state.TRYAGAIN.status;
        this.movesOutcome = state.TRYAGAIN.moves;
        this.resultOutcome = result.PLAYON.decision;
        this.flowControl = state.TRYAGAIN.flow;
        return result.PLAYON.decision;
    }
    // Conditionally check RUN state, and update  flags and result states
    /** onRun  @version 0.5.0 @date 2023/04/12
     * @function onRun
     * @kind function
     * @description: Handles the Run  flags output after a Game over State is checked
     * @returns {string | Error} Returns the resultant decision:result Win | DRAW | PLAY ON (Continue)
            1: Win: this.STATES.outcomes.WIN (or this.gameLogic.hasWin)
            2: Draw: this.STATES.outcomes.DRAW (or this.gameLogic.hasDraw)
            3: Play On: this.STATES.outcomes.= NORESULT (or this.gameLogic.hasResult = NORESULT)
            4: Error @ type {Error}
     * @param {object} state The local state object/properties
     * @param {string | Error} outcome The outcome return from theof this.isGameOver
     * @param {object} result The local result state object
     * @param {object} outputs Ouput strings for console/Errors
     * @summary Use of closure functions set*() for improved readability and cleaner switch case.*/
    onRun(state, outcome, result, outputs) {
        this.updateGrid(state.CURRENT.gridID, state.CURRENT.target);
        this.deBug._debug(state.CURRENT, state.RUN.message, state.RUN.console, state.RUN.trace);
        /** setWin  @version 0.5.0 @date 2023/04/12
         * @function setWin
         * @kind function
         * @description: sets the win state flags
         * @returns {string} Returns the resultant decision:result Win */
        function setWin() {
            this.gameRunning = state.OVER.status;
            this.movesOutcome = state.OVER.moves;
            this.resultOutcome = result.WIN.decision;
            this.flowControl = state.OVER.flow;
            return result.WIN.decision;
        }
        /** setDraw  @version 0.5.0 @date 2023/04/12
         * @function setDraw
         * @kind function
         * @description: sets the win state flags
         * @returns {string} Returns the resultant decision:result Draw */
        function setDraw() {
            this.gameRunning = state.OVER.status;
            this.movesOutcome = state.OVER.moves;
            this.resultOutcome = result.DRAW.decision;
            this.flowControl = state.OVER.flow;
            return result.DRAW.decision;
        }
        /** setWin  @version 0.5.0 @date 2023/04/12
         * @function setPlayOn
         * @kind function
         * @description: sets the win state flags
         * @returns {string} Returns the resultant decision:result Win */
        function setPlayOn() {
            this.currentPiece = state.CURRENT.piece;
            this.gameRunning = state.CURRENT.status;
            this.movesOutcome = state.CURRENT.moves;
            this.resultOutcome = result.PLAYON.decision;
            this.flowControl = state.CURRENT.flow;
            return result.PLAYON.decision;
        }
        /** serError  @version 0.5.0 @date 2023/04/12
         * @function setError
         * @kind function
         * @description: sets onRun outcome error states
         * @returns {Error} Returns the resultant decision:result Win */
        function setError(input) {
            if (input instanceof Error) {
                const errors = {
                    object: input,
                    inspect: `${outputs.traces.error}: ${input}: ${result}: ${state}: ${input.stack}`,
                    message: `${outputs.messages.error}:${state.ERROR.message}. ${input.toString()}`,
                    trace: `${outputs.traces.error}: ${state.ERROR.trace}.${input.name}`,
                    output: `${outputs.traces.error}: ${state.ERROR.trace}: ${outputs.messages.error}:${state.ERROR.message}`,
                    console: state.ERROR.console,
                };
                this.deBug._debug(errors.object, errors.message, errors.console, errors.trace);
                return new Error(errors.output);
            }
            window.alert("No Error. Ugh??. Contact the Developer");
            return new Error(`Uncaught Error: ${state.ERROR.message}`);
        }
        // In a running game, check the outcome state
        try {
            switch (outcome) {
                case result.WIN.status:
                    return setWin();
                case result.DRAW.status:
                    return setDraw();
                case result.PLAYON.status:
                    return setPlayOn();
                default:
                    return setError(outcome);
            }
        } catch (runstate) {
            throw setError(runstate);
        }
    }
    // Conditionally check STOP state, and update  flags and result states
    /** onStop  @version 0.5.0 @date 2023/04/12
     * @function onStop
     * @kind function
     * @description: Handles the error default case from makeMove
     * @returns {string} Returns each move's Move state when GAME IS paused.
            1: Try Again move state @todo switch with pause.
            2: On Pause if current is not Paused
            3: Illegal move for Exception
     * @param {object} state The local state object/properties
     * @param {string} outcome
     * @param {object} result
     * @param {object} outputs Ouput strings for console/Errors*/
    onStop(state, outcome, result, outputs) {
        // If state is valid
        if (typeof state.STOP.moves !== outputs.TYPE.UNDEF) {
            // Update flags on STOP state
            if (state.CURRENT.status === state.STOP.status) {
                state.CURRENT.status = state.STOP.status;
                this.currentPiece = state.STOP.piece;
                this.gameRunning = state.STOP.status;
                this.movesOutcome = state.STOP.moves;
                this.resultOutcome = result.OUTCOME.current;
                this.flowControl = state.OVER.flow;
                return result.OUTCOME.current;
            }
            // Else set the game to pause state (before error, give user a choice)
            this.gameRunning = state.PAUSE.status;
            return state.PAUSE.status;
        }
        return state.ERROR.outcome;
    }
    // Conditionally check STOP state, and update  flags and result states
    /** onOver  @version 0.5.0 @date 2023/04/12
     * @function onOver
     * @kind function
     * @description: Handles the error default case from makeMove
     * @returns {string} Returns each move's Move state when GAME IS paused.
            1: Try Again move state @todo switch with pause.
            2: On Pause if current is not Paused
            3: Illegal move for Exception
     * @param {object} state The local state object/properties
     * @param {string} outcome
     * @param {object} result
     * @param {object} outputs Ouput strings for console/Errors*/
    onOver(state, outcome, result, outputs) {
        // Is State is valid,
        if (typeof state.STOP.moves !== outputs.TYPE.UNDEF) {
            // Game must be stoped (ie if a result has an outcome.)
            if (state.CURRENT.status === state.STOP.status && state.CURRENT.moves === state.STOP.moves) {
                // Clear the Game (Is a dupe of MoveListener.clearUI/called twice)
                this.endGame(state.RESULT.status, result.OUTCOME, state.OVER.console, state.OVER.trace)
                this.currentPiece = result.WIN.piece
                this.gameRunning = state.OVER.status
                this.movesOutcome = state.OVER.moves
                this.resultOutcome = result.OUTCOME.current
                this.flowControl = state.OVER.flow
                return result.OUTCOME.current
            }
            return state.PAUSE.moves;
        }
        return state.ERROR.outcome;
    }
    /** onPause  @version 0.5.0 @date 2023/04/11
     * @function onPause
     * @kind function
     * @description: Handles the error default case from makeMove
     * @returns {string} Returns each move's Move state when GAME IS paused.
            1: Try Again move state @todo switch with pause.
            2: On Pause if current is not Paused
            3: Illegal move for Exception
     * @param {object} state The local state object/properties
     * @param {string} outcome
     * @param {object} result
     * @param {object} outputs Ouput strings for console/Errors*/
    onPause(state, outcome, result, outputs) {
        if (typeof this.movesOutcome !== outputs.TYPE.UNDEF) {
            if (state.CURRENT.status === state.PAUSE.status) {
                // Do something with Pause: a) Resume game, b)  Stop Game c) Reset Game d) End Game: Advanced
                // For now, just have it set to Try Again (Resume)./ cURRENT pIECE
                // Assume that the game continues
                this.currentPiece = state.TRYAGAIN.piece;
                this.gameRunning = state.TRYAGAIN.status;
                this.movesOutcome = state.TRYAGAIN.moves;
                this.resultOutcome = state.TRYAGAIN.outcome;
                this.flowControl = state.TRYAGAIN.flow;
                return state.TRYAGAIN.moves;
            }
            return state.PAUSE.moves;
        }
        return state.ERROR.outcome;
    }
    /** checksError  @version 0.5.0 @date 2023/04/11
     * @function checksError
     * @kind function
     * @description: Handles the error default case from makeMove
     * @returns {Error | string} Error or game Exit state.
     * @param {object} state The local state object/properties
     * @param {string | Error} validate
     * @param {object} outputs Ouput strings for console/Errors*/
    checksError(state, validate, outputs) {
        // 1: Pause the game, temporariliy, to check error (?)
        this.gameRunning = state.PAUSE.status;
        // 2: checkMove returns (string | Error}, so this is encapuslated here. Use a better error message
        if (validate instanceof Error) {
            throw new Error(outputs.messages.error);
        } else {
            // Log the output to
            this.deBug._debug(
                validate,
                `${state.CHECKS.message}: ${state.ERROR.message}: ${validate}`,
                state.ERROR.console,
                `${state.ERROR.trace}: ${outputs.traces.checks}`
            );
            window.alert("You have exited the game. See console for logs");
            // 4:  if on error, reset the game to initial state, so a new game can start.
            this.gameRunning = state.INITIAL.status;
            this.movesOutcome = state.INITIAL.moves;
            this.resultOutcome = state.INITIAL.outcome;
            this.flowControl = state.INITIAL.flow;
            return state.EXIT.flow;
        }
    }
    /** nextTurn  @version 0.5.0 @date 2023/04/11
     * @function nextTurn
     * @kind functioN
     * @description Assigns the next turn and changes the symbol according to the players
     * @param {string} isRunning  If the gameRunning transitory state is true, make next turn.
     * @param {string} nextPiece Check if the current piece is the same || different to next piece @testing
     * @param {number} [log] Logs to console @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @returns {string | string | string} Move state for each turn.
            1) this.STATES.moves.CONTINUE,
            2) this.STATES.moves.TERMINAL,
            3) this.STATES.moves.ILLEGAL;
     * @memberof Game
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.3.1 @date 2023/03/24 Updated Docstrings
     * @version 0.4.1 @date 2023/04/01 Change signature, new params, JSDoc & version bump,
     * @version 0.4._ @date 2023/04/0 PENDING BUMP once console.logs are not needed @TODO
     * @version 0.5.0 @date 2023/04/11 Bump, Object and Property Pattern,Update of game, move and results flags.
     **/
    nextTurn(isRunning, nextPiece, state, log = this.logLevel, locname = `${this.fileName}: nextTurn()`) {
        // 1: Block level Object & Property pattern.
        const turns = {
            status: isRunning,
            current: this.currentPiece,
            next: nextPiece,
            new: "",
            message: ` ${locname} @param: ${isRunning}: ${nextPiece}`,
            trace: `${locname}`,
            console: log,
        };
        // 2: Pre action log to console.
        this.deBug._debug(turns, `${turns.message}: ${turns.current}`, turns.console, turns.trace);
        // 3: Turns is either RUN or STOP. Check for STOP. Switches the Pieces
        if (turns.status === this.STATES.game.RUN) {
            // 3a Update Turn and Playing Piece
            turns.new = this.gamePieces.switchPieces(turns.next);
            // 3b Update the gamePieces Current Piece & Current piece in game
            this.gamePieces.currentPiece = turns.new;
            this.currentPiece = turns.new;
            // 3c Keep ths game Running if Game is RUN
            this.gameRunning = turns.status;
            // 3d Keep the move on CONTINU
            this.movesOutcome = this.STATES.moves.CONTINUE;
            // 3d Keep the results as in PLAY
            this.resultOutcome = this.STATES.outcomes.PLAY;
            // 3e Check the successful turn to console
            this.deBug._debug(turns, `${turns.message}: ${turns.new}`, turns.console, turns.trace);
            // 3f REturn the CONTINUE state to UI controller.
            return this.STATES.moves.CONTINUE;
        }
        // 4: Turns is either RUN or STOP. Check for STOP. Passes to isGameOver
        if (turns.status === this.STATES.game.STOP) {
            // 4a: Update the Turns status
            turns.status = this.STATES.game.STOP;
            this.gameRunning = this.STATES.game.STOP;
            this.movesOutcome = this.STATES.moves.TERMINAL;
            // 4b: Set to GameOver as STOP
            //this.isGameOver(turns.status );
            // 4c: Check to console for STOP state.
            this.deBug._debug(turns, `${turns.message}: ${turns.status}`, turns.console, turns.trace);
            // 4d: Return Terminal state to UI controller
            return this.STATES.moves.TERMINAL;
        }
        // 5: Else return a ILLEGAL and throw User Error.
        return this.STATES.moves.ILLEGAL;
    }
    /** isGameOver @version 0.5.0 @date 2023/04/12
     * @function isGameOver
     * @kind function
     * @description Truth for if the game is Over (i.e. isAWin or isADraw).
     * @param {string} isRunning Current game running state, transitory: ACTICE || INACTIVE.
     * @param {number} [log] Logs to console @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @constant {boolean} ACTIVE Block var gameRunning local ACTIVE STATE @default this.RUNSTATE
     * @constant {boolean} INACTIVE Block var gameRunning local INACTIVE STATE @default this.STOPSTATE
     * @constant {boolean} CONTINUE Block var no Win, no Draw state local CONTINUE STATE @default this.CONTSTATE
     * @constant {boolean} TERMINAL Block var Win or Draw local TERMINAL STATE @default this.TERMINUS
     * @return {string | Error}  Return the Result state for is is GameOver
            1) WIN: Update/return game data with the winner to makeMove.outcome || the CURRENT.results.win.
            2) DRAW: Update/return game data with the draw state || the CURRENT.results.draw.
            2) PLAYON: Update/return game data with the draw state || the CURRENT.results.playon.
     * @memberof Game
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.1 @date 2023/04/01. Big Refactor, update to signature, hosting strings/booleans
     *   into block const for readability/maintainability, update of JSDoc
     * @version 0.4.2 @date 2023/04/02. Update of JSDoc constants
     * @version 0.5.0 @date 2023/04/12. Bumped. Assign gameLogic outcomes to object for evals..*/

    isGameOver(isRunning, hasState, log = this.logLevel, locname = `${this.fileName}: isGameOver()`) {
        // 1: Assign Block vars
        // 2: Local Status Constants
        const state = hasState;
        // Update state console levels
        state.CURRENT.console = log;
        state.RUN.console = log;
        state.STOP.console = log;
        state.OVER.console = log;
        state.PAUSE.conole = log;
               // 3: Messages and Traces
        // 4: Check the tranistory running state of game, before checking terminal/continue states

        const resultflow = {
            win: this.gameLogic.isAWin() === this.STATES.outcomes.WIN, // True
            draw: this.gameLogic.isADraw() === this.STATES.outcomes.DRAW, // True
            nowin: this.gameLogic.isAWin() === this.STATES.outcomes.NOWIN, // true
            nodraw: this.gameLogic.isADraw() === this.STATES.outcomes.NODRAW, // true
            terminal: this.gameLogic.hasResult === this.STATES.outcomes.RESULT, // true
            continue: this.gameLogic.hasResult === this.STATES.outcomes.NORESULT, // true
        };

        function activeFlags() {
            isRunning = state.RUN.game;
            // Set the transitsory CURRENT state to Game Over flags
            state.CURRENT.status = state.RUN.game;
            state.CURRENT.game = state.RUN.game;
            state.CURRENT.moves = state.RUN.moves;
            state.CURRENT.results = state.RUN.outcome;
            state.CURRENT.flow = state.RUN.flow;
            // Set the instances public flags to Over and gameLoic results
            this.gameRunning = state.RUN.game;
            this.movesOutcomes = state.RUN.moves;
            this.flowControl = state.RUN.flow;
        }

        function stopFlags() {
            isRunning = state.STOP.game;
            // Set the transitsory CURRENT state to Game Over flags
            state.CURRENT.status = state.STOP.game;
            state.CURRENT.game = state.STOP.game;
            state.CURRENT.moves = state.STOP.moves;
            state.CURRENT.results = state.STOP.outcome;
            state.CURRENT.flow = state.STOP.flow;
            // Set the instances public flags to Over and gameLoic results
            this.gameRunning = state.STOP.game;
            this.movesOutcomes = state.STOP.moves;
            this.flowControl = state.STOP.flow;
        }

        function overFlags() {
            // set the passed param to Game Over
            isRunning = state.OVER.game;
            // Set the transitsory CURRENT state to Game Over flags
            state.CURRENT.status = state.OVER.game;
            state.CURRENT.game = state.OVER.game;
            state.CURRENT.moves = state.OVER.moves;
            state.CURRENT.results = state.OVER.outcome;
            state.CURRENT.flow = state.OVER.flow;
            // Set the instances public flags to Over and gameLoic results
            this.gameRunning = state.OVER.game;
            this.movesOutcomes = state.OVER.moves;
            this.flowControl = state.OVER.flow;
        }
        function pauseFlags() {
            // set the passed param to Game Over
            isRunning = state.PAUSE.game;
            // Set the transitsory CURRENT state to Game Over flags
            state.CURRENT.status = state.PAUSE.game;
            state.CURRENT.game = state.PAUSE.game;
            state.CURRENT.moves = state.PAUSE.moves;
            state.CURRENT.results = state.PAUSE.outcome;
            state.CURRENT.flow = state.PAUSE.flow;
            // Set the instances public flags to Over and gameLoic results
            this.gameRunning = state.PAUSE.game;
            this.movesOutcomes = state.PAUSE.moves;
            this.flowControl = state.PAUSE.flow;
        }

        function checkResults() {

            if (resultflow.win && resultflow.terminal) {
                //@ts-ignore
                if (this.gameLogic.hasWin === this.STATES.outcomes.WIN) {
                    overFlags();
                    // Set the results for DRAW and RESULT
                    //@ts-ignore
                    this.resultOutcome = this.gameLogic.hasWin;
                    //@ts-ignore
                    this.hasConclusion = this.gameLogic.hasResult;
                    //@ts-ignore
                    state.CURRENT.results.win = this.gameLogic.hasWin;
                    //@ts-ignore
                    state.CURRENT.results.outcome = this.gameLogic.hasResult;
                    // Alter the User to the Draw Outcome (apply here per game or per UI)
                    window.alert(
                        `There has been a ${this.hasConclusion}: of ${this.resultOutcome}. There is a winner. ${state.CURRENT.players.win}`
                    );
                    return state.CURRENT.win;
                }
            }

            if (resultflow.draw && resultflow.terminal) {
                //@ts-ignore
                if (this.gameLogic.hasDraw === this.STATES.outcomes.DRAW) {
                    overFlags();
                    // Set the results for DRAW and RESULT
                    //@ts-ignore
                    this.resultOutcome = this.gameLogic.hasDraw;
                    //@ts-ignore
                    this.hasConclusion = this.gameLogic.hasResult;
                    //@ts-ignore
                    state.CURRENT.results.draw = this.gameLogic.hasDraw;
                    //@ts-ignore
                    state.CURRENT.results.outcome = this.gameLogic.hasResult;
                    // Alter the User to the Draw Outcome (apply here per game or per UI)
                    window.alert(
                        `There has been a ${this.hasConclusion}: of ${this.resultOutcome}. Both Draw. ${state.CURRENT.players.drew}`
                    );
                    return state.CURRENT.draw;
                }
            }

            if ((resultflow.nowin && resultflow.continue) || (resultflow.nodraw && resultflow.continue)) {
                //@ts-ignore
                if (state.CURRENT.moves === this.STATE.moves.CONTINUE) {
                    activeFlags();
                    // Set the results for DRAW and RESULT
                    this.resultOutcome = state.CURRENT.results.status;
                    this.hasConclusion = state.CURRENT.results.none;
                    //@ts-ignore
                    if (this.gameLogic.hasResult === this.STATES.outomes.NORESULT) {
                        //@ts-ignore
                        state.CURRENT.results.playon = this.gameLogic.hasResult;
                        state.CURRENT.outcome = state.CURRENT.results.none;
                    }
                    // Alter the User to the Draw Outcome (apply here per game or per UI)
                    window.alert(
                        `There is ${this.hasConclusion}: of ${this.resultOutcome}. Carry on playing`
                    );
                    return state.CURRENT.results.playon
                }
            }
        }

        function hasError() {
            const error = {
                conditional: isRunning,
                /** @type {object|undefined} */
                object:undefined,
                name: ``,
                message: ``,
                /** @type {object|undefined} */
                stack: undefined,
                /** @type {object|undefined} */
                cause: undefined,
                output: ``,
                statement: ``,
                file: locname,
                trace: `${locname}: isGameOver: Error`,
                console: log,
            };
            const isGameOver = new Error(`isGameOver has an error`);
            error.object = isGameOver;
            error.name = isGameOver.name = `isGameOver Error`;
            error.stack = isGameOver.stack;
            error.location = `${locname}: ${isGameOver.toString()}: `;
            error.message = `${locname} is not RUN|STOP|OVER|PAUSE. It is ${isRunning}`;
            error.output = isGameOver.toString();
            error.statement = `${error.name}: ${error.location}: ${error.cause}: ${error.message}. ${error.stack}`;
            this.deBug._debug(error.object, error.statement, error.console, error.trace);
            return isGameOver;
        }

        switch (isRunning) {
            case state.RUN.status: {
                //Active state for game after button Clicked. Checks results on each move. Switch result, change the game,moves and outcome states.
                window.alert(`You have a game running`);
                return checkResults();
            }
            case state.STOP.status: {
                // Potential deprecated or an interim state. Game Over prefered.
                window.alert(`You have stoped the game`);
                break;
            }
            case state.OVER.status: {
                // Updates the Game Over, pre exit conditions
                window.alert(`You have game over. Outcome cheked at each move, game running. This is now decided.`);
                overFlags();
                this.resultsOutcome = state.OVER.outcome;
                this.flowControl = state.OVER.flow;
                this.endGame(this.gameRunning, this.resultsOutcome);
                return this.gameRunning;
            }
            case state.PAUSE.status: {
                // Use a window.confirm dialog: OK to RESUME, CANCEL game over.
                window.alert(`You have PAUSED the game. Cease game (Over the Exit) or Resume (RUN) `);

                break;
            }
            case state.EXIT.status: {
                // Display before unloading the page, or migrating away from page
                window.alert(`You have exited the game`);
                this.flowControl = this.STATES.flow.EXIT;
                this.hasEnded = this.endGame(this.gameRunning, this.resultsOutcome);
                this.gameRunning = this.STATES.game.EXIT;
                return this.gameRunning;
            }
            default: // Defauth if NOT RUN | STOP | OVER | EXIT. Throw an error if user moves too early or in weirdness. add new case if need been.
                window.alert(`You have a game error`);
                return hasError();
        }
        return this.STATES.flow.EXIT
    }

    /** ednGame: @version 0.5.0 @date 2023/04/13
     * @function endGame
     * @kind function
     * @description Clears/reinitialised the game's objects/artefactes. JS does good GC/Memory.
     * @param {string} isRunning
     * @param {string} hasOutcome
     * @param {number} log Log level @default 1
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @constant {string} END Local end state matched to game state @default this.TERMINUS
     * @memberof Game
     * @date 2023/03/22 @version 0.3.0 REFACTOR . See Changelog on this date.
     * @version 0.4.1 ENCHANCE @date 2023/03/28.
     * @version 0.4.2 @date 2023/04/02 Bumped, Added JSDoc constants, updated END const
     * @version 0.5.0 @date 2023/04/11 Bumped, method name, Object & property pattern (current & ends object), exit states.
     **/

    endGame(isRunning, hasOutcome, log = this.logLevel, locname = `${this.fileName}: endGame()`) {
        const logs = log;
        const current = {
            status: isRunning,
            result: hasOutcome,
        };
        const ends = {
            INIT: this.STATES.game.INITIAL,
            STOP: this.STATES.game.STOP,
            OVER: this.STATES.game.OVER,
            RESULT: this.STATES.outcomes.RESULT,
            EXIT: this.STATES.flow.EXIT,
            inspect: ``,
            message: `End of Game: All Game items are cleared or reset.`,
            trace: `${locname}: Cleared/Initalised current Game Items`,
            output: ``,
            console: logs,
        };

        ends.inspect = `Game State: ${current.status}: Result is ${current.result} `;
        ends.output = `${ends.message}: ${ends.inspect}`;

        if (current.status === ends.OVER) {
            // This method is called when the current game has reached it endState, terminal state.
            if (current.result === ends.RESULT) {
                debugger; /** TODO REMOVE */
                this.Player1 = "X";
                this.Player2 = "O";
                this.gamePieces = new GamePieces(this.Player1, this.Player2);
                this.gamePieces.currentSymbol = this.Player1;
                this.gameRunning = ends.INIT;
                this.deBug._debug(current, ends.ouput, ends.console, ends.trace);
                this.logLevel = 0;
                return ends.EXIT;
            }
            return ends.EXIT;
        }
        return ends.EXIT;
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
    evaluateParameter(param, playerindex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter()`) {
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
                message: `${locname}: ${output.default}: ${paramName} - ${param} is ${param ? output[1] : output[2]}`,
                traces: `${locname}: Parameter Error`,
                console: logs,
            };
            this.deBug._debug(param, error.message, error.console, error.traces);
            throw new Error(`${error.traces}: ${error.message}`);
        }
    }
}

export { Game };
