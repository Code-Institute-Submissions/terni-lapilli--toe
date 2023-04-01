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

import { GameBoard } from "/lib/__GameBoard.js";
import { GamePieces } from "/lib/__GamePieces.js";
import { GameLogic } from "/lib/__GameLogic.js";
import { GameDebug } from "/lib/__GameDebug.js";

/** GAME CLASS [ ] TODO: FIXME: REBUILD / ISSUE 005, 2023-03-22
 * @name Game
 * @kind class
 * @classdesc Game Controller class for the game of TicTacToe, with 2x Player properties, a board, game pieces, and game logic.
 * @export Game
 * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
 * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
 * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
 * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
 * @prop {GamePieces} gamePieces Players' pieces for the game play.
 * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
 * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
 * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
 * @prop {GameDebug}  deBug checks for draw moves against is all squares are filled
 * @function makeMove(move)
 * @description Takes a move as an (array's) index to the board array and assigns the symbol to the move.
 * @function nextTurn
 * @description Assigns the next turn and changes the symbol according to the players turn.
 * @function resetBoard
 * @description Resets the board to a new Game Board, essentially reseting the terminal state of current game; and returning the game to an initail or new  state for a new game round. @since @date 2033/03/16  @version 0.2.0
 * @version 0.3.0 REFACTOR @date 2023/03/22. See Changelog on this date.
 */
class Game {
    /** GAME [ ] TODO: REFACTOR ISSUES 00_ 2023/03/22
     * @prop {GameDebug} deBug Debugger/Console
     * @prop {String} Player1's symbol, nominally Ex, X., or a Cross
     * @prop {String} Player2's symbol, nominally Zero, O, or a Nought
     * @prop {GameBoard} gameBoard Game's board and conditions of play for a starting game board or for reseting the board.
     * [ ] TODO  Optionally use this interface to store the state of the game and write/update the state back to HTML data-value & data-state attributes. @date 2033/03/16
     * @prop {GamePieces} gamePieces Players' pieces for the game play.
     * [ ] TODO: Optionally use this interface to assign symbols to the players, by user input for customisation @date 2033/03/16
     * @prop {GameLogic} gameLogic  checks for winning or draw moves against possible combinations.
     * [ ] TODO Optionally use this interface to manage the level of difficulty of the game: Just Click, ii) Randomisation of move iii) Minimax Algorithm @date 2033/03/16
     * @prop {boolean} INITSTATE > INITAL game state @default false @constant
     * @prop {boolean} RUNSTATE  > ACTIVE game state when running @default true @constant
     * @prop {boolean} STOPSTATE > INACTIVE game state when game is stoppped @default false @constant
     * @prop {boolean} CONTSTATE > CONTINUE game state when no win or draw @default true @constant
     * @prop {boolean} TERMINUS > TERMINAL game state when Win or Draw @default false @constant
     * @prop {boolean} RESETSTATE > RESET game state when reseting a game or reinitialising @default true @constant
     * @prop {boolean} EXITSTATE > EXIT game state, when leaving the same @default true @constant
     * @prop {string} fileName - FileNams identifer for Error Handling
     * @prop {number} logLevel Logs to console @default 0
     * @prop {number} errorLevel Error to console @default 9
     */
    // Game Fields (Properties)
    deBug = new GameDebug(); /* ?+*/
    Player1 = "X"; /* ?+*/
    Player2 = "O"; /* ?+*/
    gamePieces;
    currentPiece;
    playedPiece;
    gameBoard;
    gameLogic;
    fileName = "Game.js";
    logLevel = 8;
    errorLevel = 8;
    INITSTATE = false; // INITAL state
    RUNSTATE = true; // Maps to ACTIVE
    STOPSTATE = false; // Maps to INACTIVE
    CONTSTATE = true; // Maps to CONTINUE
    TERMINUS = false; // Maps to TERMINAL
    RESETSTATE = true; // RESET GAME
    EXITSTATE = true; // EXIT GAME
    gameRunning = this.INITSTATE;

    /** Game constructor @version 0.4.1 @date 2023/04/01
     * Game controller class (constructor) for the game of TicTacToe
     * @name constructor
     * @kind function
     * @classdesc Instantiated the Game class with the players' pieces, and the game's board, pieces, and logic. Then enables the game's state.
     * @param {string} [_X], Player1's symbol, nominally Ex, X., or a Cross, Can be assigned new string type of piece/representation for the game. Optionally defaults to X. @default 'X'
     * @param {string} [_O], Player2's symbol, nominally Zero, O, or a Nought. Can be assigned new string type of piece/representation for the game. Optionally defaults to O. @default 'O'
     * @param {number} [log] Log to console @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @constructor
     * @constructs Game
     * @type {Game}
     * @memberof Game
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.1 @date 2023/04/01 Assigns block vars, contants, message and tracing patterns
     */
    constructor(_X = "X", _O = "O", log = this.logLevel, locname = `${this.fileName}: constructor`) {
        // 1: Assigned blocks vars and CONSTANTS
        const logs = log;
        const onetrace = `${locname}: sets Player1`;
        const twotrace = `${locname}: sets Player2`;
        const PLAYER1 = 1;
        const PLAYER2 = 2;
        const INTIAL = false;
        this.deBug = new GameDebug();
        //debugger;
        // 2: Checks and sets Players
        this.Player1 = this.evaluateParameter(_X, PLAYER1, logs, onetrace);
        this.Player2 = this.evaluateParameter(_O, PLAYER2, logs, twotrace);
        // 3: Sets game's initial state on each Initialisation/instantiation
        this.gameRunning = INITIAL;
    }

    /** Game onInit : Initialiser @version 0.4.1 @date 2023/04/01
     * @name onInit
     * @kind function
     * @description Initialises the Game's dependencies, and initialise the class active game state.
       * @return  Updates the caller's state
     * @param {boolean} isRunning
     * @param {PointerEvent} pointerEvent @default null and never used. See note.
         @note very weird, I actially don't know why pointerevents was automatically refered to for logs as args[1]
         So created pointerevent refernece else args[2] for logs =  {number} and args[1] = {PointerEvent}
     * @param {number} [log] Log to console. @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @prop {GamePieces} this.gamePieces A new set|instance of GamePieces per each new game
     * @prop {GameBoard} this.gameBoard A new board|instance of GameBoard per eacg new game
     * @prop {GameLogic} this.gameBoard A new logic engine|instance of GameLogic per each new game
     * @prop {boolean)}this.gameRunning Update the new instance's game persistent|active state @value true
     * @throw {Error} Game initialisation errors.
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/04/01 @version 0.4.1 Debugging, Validating
     * @memberof Game
     */
    onInit(isRunning, pointerEvent, log = this.logLevel, locname = `${this.fileName}: onInit`) {
        // 1: Sets Block vars
        const logs = log;
        const check = this.errorLevel;
        let pointer = pointerEvent; // === null
        debugger; /** TODO REMOVE */
        try {
            // 3: Assign the game's pieces to a) the current game players and b)  up a new board
            this.gamePieces = new GamePieces(this.Player1, this.Player2); /* ?+*/
            this.gameBoard = new GameBoard(); /* ?+*/
            // 4: Link the current board and current pieces to the game logic
            this.gameLogic = new GameLogic(this.gameBoard, this.gamePieces); /* ?+*/
            // 5: Set the game persistent active state to true, for duration of the game, from the game init.
            this.gameRunning = isRunning;
            //return this.gameRunning
        } catch (errorinit) {
            let errormessage = `${locname}: Game Initialiser ${errorinit.linenumber}:${errorinit.columnNumber}`;
            this.deBug._debug(errorinit, `${errormessage}`, check, locname);
        }
    }

    /** isGameStarted @version 0.4.1 @date 2023/04/01
     * @function isGameStarted
     * @kind function
     * @description checks if a game has started (initial is false), and updated the game active state to true.
     * @param {boolean} [isGameRun] Toggles initial state of the game from initial state or User message @default false
     * @usage Used as interface to signal to UI/User with Alerts (OK Only).
     * @date 2023/03/30 @sincce @version 0.4.1
     * @returns {boolean} Game tranistory and instance persistence state ACTIVE {boolean} or EXIT {undefined}
     * @memberof Game
     * @version 0.4.1 @date 2023/04/01 Added constant, User message if game is already runningm and exit flow.
     */
    isGameStarted(isGameRun = this.INITSTATE) {
        const ACTIVE = this.RUNSTATE;
        const INACTIVE = this.STOPSTATE;
        const EXIT = this.EXITSTATE;
        //const EXIT = undefined
        const startmessage = `Welcome to a new game of Tic Tac Toe. Click ok to continue`;
        const activemessage = `The current game is already running`;
        // 2: Sets the game running state, and or sent a user message interface/dialog
        if (isGameRun === INACTIVE) {
            window.alert(startmessage);
            return (this.gameRunning = ACTIVE);
        }
        if (this.gameRunning === ACTIVE) {
            window.alert(activemessage);
            return EXIT;
        }
    }

    /** checkMove @version 0.4.1. @date 2023/04/01 @TODO REMOVE DEFAULT FOR VALIDMOVE
     * @function checkMove
     * @kind function
     * @description checks if the move is valid and the game is not over.
     * @param {number} move The index of the move to make
     * @param {boolean} VALID if the move is valid, based on game's transitory state.
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @return ACTIVE || INACTIVE
         ACTIVE if grid repository is empty, and move is valid.
         INACTIVE for invalid move, as gameRunning false - INVALID
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     * @version 0.4.1 @date 2023/04/01: Reactor, message & trace patttern, update sign with log flag
     */

    /** TODO REMOVE valieMove's default value, and just check for truthy */
    checkMove(move, VALID = true, log = this.logLevel, locname = `${this.fileName}: checkMove()`) {
        // 1: Assign Block vars & CONSTANTS
        const logs = log;
        const ACTIVE = this.RUNSTATE;
        const INACTIVE = this.STOPSTATE;
        const TYPE = "number";
        const BLANK = "";
        // 2: Checks types and game transitory active state
        if (typeof move === TYPE && VALID === ACTIVE) {
            const cellId = parseInt(move);
            return this.gameBoard.grid[cellId] === BLANK && this.gameRunning === VALID;
        }
        // 3: Game transitory inactive state (and or check the cell content??) or in moveListener.onClick
        if (VALID === INACTIVE) {
            const message = `Can not make a move at this time. Press the start button or check the console for more information, and contact the developer`;
            window.alert(message);
            const debugmessage = `Illegal move type or game state`;
            const debugtrace = `${locname}: Illegal type of Move or inactive game state`;
            this.deBug._debug(move || VALID === INACTIVE, debugmessage, logs, debugtrace);
            return INACTIVE;
        }
    }

    /** updateGrid  @version 0.4.1. @date 2023/04/01 @TODO REMOVE
     * @function updateGrid
     * @kind function
     * @description Assigns the current move to the grid and assign the current piece..
     * @param {number} move The index of the move to make
     * @param {Node} cell The cell node to be updated.
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @memberof Game
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.1 @date 2023/04/01: Reactor, message & trace patttern, update sign with log flag
     */
    updateGrid(move, cell, log = this.logLevel, locname = `${this.fileName}: updateGrid()`) {
        debugger; /**@TODO REMOVE*/
        const logs = log;
        const logmessage = `${locname} Current Piece ${this.gamePieces.currentPiece} to update Grid`;
        this.deBug._debug(this.gamePieces.currentPiece, logmessage, logs, locname);
        this.gameBoard.grid[move] = this.gamePieces.currentPiece;
        window.alert(this.gameBoard.grid[move]); /**@TODO REMOVE*/
        // this.gameBoard.currentCellMove(cell);
    }

    /** makeMove  @version 0.4.2 @date 2023/04/01
     * @function makeMove
     * @kind function
     * @return Returns game state ACTIVE: for Game Terminus: Continue|| INACTIVE for Game Terminus: Game Ends
     * @description Assigns the current piece to the move if it is valid and the game is not over.
     * If the game is over (i.e., there is a winner or a draw), it resets the game. and returns boolean state to UI Handlers onClick
     * @param {number} move The index of the current move (cell index).
     * @param {Node} current Current cell, param passing of current node to update the grid's repository
     * @param {boolean} gameState Current transitory state ACTIVE || INACTIVE
     * @param {number} [log] Log to console @default this.logLevel:
     * @param {string} [locname] Method trace @default this.fileName
     * @throw {Error} Catch uncaught errors if makeMove fails.
     * @memberof Game
     * @date 2023/03/22 @version 0.3.0 See Changelog
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/03/28 @version 0.4.1
     * @date 2023/04/01 @version 0.4.2 Adopt the message/trace vars, refactor, game state contants,
     *                                 dynamically update the class/instancxe peristent gameRunning state
     *                                 Added try..catch for error handling for a critical method.
     */
    makeMove(move, current, gameState, log = this.logLevel, locname = `${this.fileName}: makeMove()`) {
        // 1: Assign Block vars and CONSTANTS
        const logs = 8;
        const ACTIVE = this.RUNSTATE;
        const INACTIVE = this.STOPSTATE;
        const BLANK = "";
        debugger; /** TODO REMOVE */
        const logmessage = `Game Running Persistent State: Class ${this.gameRunning}.
                            Expect ${gameState} is ${ACTIVE}, OR ${INACTIVE}`;
        console.log(logmessage);
        // 2: Error control for a critical method
        try {
            const checkmovetrace = `${locname} => checkMove(): ${move}`;
            // 3: Check each move v prior moves and game's transitory state
            if (this.checkMove(move, gameState, logs, checkmovetrace)) {
                // 4: Assign the current piece to game board interface
                this.updateGrid(move, current);
                this.gameRunning = ACTIVE;
                // 5: Local piece vars
                let playingPiece = this.gamePieces.currentPiece;
                let currentmessage = `${current} . `;
                const currenttrace = `${locname}: call Cell Index: ${playingPiece}`;
                const gameactivetrace = `${locname}: GameActive`;
                const gameovertrace = `${locname}: GameOver`;
                this.deBug._debug(current, currentmessage, logs, currenttrace);

                // 6.1: After game start, game running is ACTIVE, so check if terminal ot continue state is true.
                if (!this.isGameOver(this.gameRunning, logs, gameactivetrace)) {
                    const gamecontmessage = `Game is Active: Init a New Turn ${this.gameRunning}`;
                    const gameconttrace = `${locname}: Next Turn`;
                    // Switch to the next turn
                    let playedPiece = this.nextTurn(this.gameRunning, playingPiece, logs, gameconttrace);
                    this.deBug._debug(this.playedPiece, gamecontmessage, logs, gameconttrace);
                    return (this.gameRunning = ACTIVE);
                }
                // 6.2 During game ACTIVE, if game terminus is reached, end Game.
                if (this.isGameOver(this.gameRunning, logs, gameovertrace)) {
                    const gameovermessage = `Game Ended: ${this.gameRunning}`;
                    const gameendtrace = `${locname}: Start Ending Game ${this.gameRunning}`;
                    // Reset the game
                    playingPiece = BLANK;
                    //Clear Game
                    this.clearCurrentGame(this.gameRunning);
                    this.deBug._debug(this.gamePieces.currentPiece, gameovermessage, logs, gameendtrace);
                    return (this.gameRunning = INACTIVE);
                }
            }
        } catch (error) {
            // 7: Messages and Trace for new Error Handing: makeMove is a critical function
            const errormessage = `${locname}: ${error.linenumber}: ${error.columnNumber} `;
            const errortrace = `${locname} : ${error.name}: makeMove Error`;
            this.deBug._debug((this, errormessage, logs, errortrace));
            //throw new Error(errormessage, { name: `${error.name}: ${errortrace}`, stack: error });
        }
    }

    /** nextTurn  @version 0.4.1 @date 2023/04/01 REMOVE CONSOLE.LOGS @TODO
     * @function nextTurn
     * @kind function
     * @description Assigns the next turn and changes the symbol according to the players turn.
     * @returns updated game's current|instance's udpated current piece
     * @param {boolean} turn  If the gameRunning transitory state is true, make next turn.
     * @param {string} nextPiece Check if the current piece is the same || different to next piece @testing
     * @param {number} [log] Logs to console @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @version 0.4.1 @date 2023/04/01 Change signature, new params, JSDoc & version bump,
     **/
    nextTurn(turn, nextPiece, log = this.logLevel, locname = `${this.fileName}: nextTurn()`) {
        const logs = 0;
        const nextmessage = `@param: ${turn}: ${locname}`;
        const nexttrace = `${locname}`;
        this.deBug._debug(turn, nextmessage, logs, nexttrace);
        console.log(nextPiece, this.gamePieces.currentPiece); /** @TODO REMOVE*/
        if (turn) {
            console.log(nextPiece, this.gamePieces.currentPiece); /** @TODO REMOVE*/
            const newPiece = this.gamePieces.switchPieces(nextPiece);
            console.log(nextPiece, this.gamePieces.currentPiece, newPiece); /** @TODO REMOVE*/
            return (this.gamePieces.currentPiece = this.gamePieces.switchPieces(nextPiece));
        }
    }

    /** isGameOver @version 0.4.1 @date 2023/04/01
     * @function isGameOver
     * @kind function
     * @description Truth for if the game is Over (i.e. isAWin or isADraw).
     * @param {boolean} isrunning Current game running state, transitory: ACTICE || INACTIVE.
     * @param {number} [log] Logs to console @default this.logLevel
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/03/24 @version 0.3.2 Changed method body to track game state
     * @return {boolean} Terminal state of the game: CONTINE || TERMINAL
     * @usage: Updates the current|instance's gameRunning state and returns terminal state.
     * @memberof Game
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     * @version 0.4.1 date 2023/04/01. Big Refactor, update to signature, hosting strings/booleans
     *   into block const for readability/maintainability, update of JSDoc
     **/
    isGameOver(isrunning, log = this.logLevel, locname = `${this.fileName}: isGameOver()`) {
        // 1: Assign Block vars
        const logs = log;
        // 2: Game Status Constants
        const ACTIVE = this.RUNSTATE;
        const INACTIVE = this.STOPSTATE;
        const CONTINUE = this.CONTSTATE;
        const TERMINAL = this.TERMINUS;
        // 3: Messages and Traces
        const isawinmessage = `${locname}: is in a Win state`;
        const isawintrace = `${locname}: isAWin`;
        const isadrawmessage = `${locname}: is in a Draw state`;
        const isadrawtrace = `${locname} isADraw`;
        // 4: Check the tranistory running state of game, before checking terminal/continue states
        if (isrunning) {
            if (this.gameLogic.isAWin()) {
                this.deBug._debug(this.gameLogic.isAWin(), isawinmessage, logs, isawintrace);
                this.gameRunning = INACTIVE; // Switch the game state as non active
                return TERMINAL; // Return terminal state
            }
            if (this.gameLogic.isADraw()) {
                this.deBug._debug(this.gameLogic.isADraw(), isadrawmessage, logs, isadrawtrace);
                this.gameRunning = INACTIVE; // Switch the game state as non active
                return TERMINAL; // Return terminal state
            }
        }
        // 5: Keep the game running/return to CONTINE, non-terminal state.
        this.gameRunning = ACTIVE; // Keep the game state as active.
        return CONTINUE; // Keep the game running/end state is not reached,
    }

    /** clearCurrenGame: @version 0.4.1 @date 2023/04/01
     * @function clearCurrentGame
     * @kind function
     * @description Clears/reinitialised the game's objects/artefactes. JS does good GC/Memory.
     * @param {boolean} start
     * @param {number} log Log level @default 1
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @memberof Game
     * @date 2023/03/22 @version 0.3.0 REFACTOR . See Changelog on this date.
     * @version 0.4.1 ENCHANCE @date 2023/03/28.
     **/
    clearCurrentGame(start, log = this.logLevel, locname = `${this.fileName}: clearCurrentGame()`) {
        const logs = log;
        const message = `End of Game: All Game items are cleared or reset.`;
        const endState = this.TERMINUS;
        // This method is called when the current game has reached it endState, terminal state.
        if (start === endState) {
            debugger; /** TODO REMOVE */
            this.Player1 = "X";
            this.Player2 = "O";
            this.gamePieces = new GamePieces(this.Player1, this.Player2);
            this.gameBoard.resetCellMove();
            this.gameBoard = undefined;
            this.gameLogic = undefined;
            this.gamePieces.currentSymbol = this.Player1;
            this.gameRunning = endState;
            this.deBug._debug(start, message, logs, `${locname}: Cleared/Initalised current Game Items`);
            this.logLevel = 0;
            this.deBug = undefined;
            return;
        }
    }

    /** evaluateParameter: @version 0.4.1 @date 2023/04/01
     * @function evaluateParameter
     * @kind function
     * @description checks for presnce of parameter value and returns it, else exits on null or undefined.
     * @param {*} param Parmeter under evaluation
     * @param {number} [argIndex] Optional, switches between number of parameters @default 0
     * @param {number} [log] Optional, log @default 0
     * @param {string} [locname] Optional, method location in log @default this.fileName
     * @return {*} param The parameter being checked
     * @throws {Error} If param is null or undefined.
     * @memberof GameLogic
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/24 @version 0.3.1 Updated Docstrings
     * @date 2023/04/01 @version 0.4.1  UPDATE Refactored error handling for readability
     */
    evaluateParameter(param, argIndex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter()`) {
        // 1: Assign block vars
        const logs = log;
        const NOTNULL = false;
        const ISNULL = true;
        const TYPE = "string";
        // 2: Object literal map for Player id
        const paramNameMap = {
            1: "Player 1's Piece",
            2: "Player 2's Piece",
            default: "Current Player has no current piece",
        };
        // 2: Object literal map for error strings
        const errOutMap = {
            1: "not set",
            2: "required",
            default: "Null | Undefined",
        };
        // 3: Checks param validitity
        if ((param ?? NOTNULL) && typeof param === TYPE) {
            return param;
        }
        // 4: When param is null/exception
        if (param ?? ISNULL) {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            const errortrace = `${locname}: Parameter Error`;
            const errmessage = `${locname}: ${errOutMap.default}: ${paramName} - ${param} is
                               ${param ? errOutMap[1] : errOutMap[2]}`;
            this.deBug._debug(param, errmessage, logs, errortrace);
            throw new Error(`${errortrace}: ${errmessage}`);
        }
    }
}

export { Game };
