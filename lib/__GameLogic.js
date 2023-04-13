// @ts-check
/** GameLogic.js 001 Module @version 0.5.0 @date 2023/04/11
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Logic view class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/19
  *@version 0.2.0
  *@version 0.4.2 Major Bump v0.4. Patch to 0.4.2, removed JSdocs lines
  *@version 0.5.0 Bumped to v.05.0
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 */

import { GameBoard } from "../lib/__GameBoard.js";
import { GamePieces } from "../lib/__GamePieces.js";
import { GameDebug } from "../lib/__GameDebug.js";

/** GameLogic 002 Class Definition @verso=ion 0.5.0 @date 2023/04/11
 * @name GameLogic
 * @kind class
 * @classdesc Instance of the current Game logic model
 * @export {GameLogic}
 * @usage Used to check Win or Draw conditions of the game.
 * @summary Class for the logic/game flow for the running of the game's state.
 * @prop {GameDebug} deBug @kind function @private
 * @prop {GameBoard} currentBoard  @kind member @public
 * @prop {string} currentPlayer @kind member @private
 * @prop {number[][]} winningCombinations @kind member @private
 * @prop {string} fileName @kind member @private
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
 * @function isAWin @kind function @private
 * @function isAWinningCombo @kind function @private
 * @function isADraw @kind function @private
 * @function evaluateParameter @kind function @private
 * @function evaluateType @kind function @private
 * @version 0.1.+ @date 2022/03/08
 * @version 0.4.2 @date 2022/04/04 Major bump
 * @version 0.5.0 @date 2022/04/11 Bumped. Added Object (enum like) CONSTANTS for GameLogic Outcome states.,
                        2022/04/11 Added dynamic flas: has(Outcome) flags: *Result, *Win, *Outcome, *Lost
 */
class GameLogic {
    /** GameLogic: 003 Class Props @version 0.5.0 @2023/04/11
     * @prop {GameDebug} deBug Debugger/Console
     * @prop {GameBoard} currentBoard  of GameBoard for the current instance of the game
     * @prop {GamePieces} currentPieces Array (strings, string) of GamePieces for the current instance of the game
     * @prop {string} currentPlayer: Holder of for the current piece in play for the current instance of the game..
     * @prop {number[][]} winningCombinations: Retrieves the games winning moves & logic of the game to evaluate  the possible combinations of moves.
     * @prop {string} fileName @default 'GameLogic.js'
     * @prop {string} logLevel @default 0
     * @prop {string} errorLevel @default 9'
     */
    // Class Fields (Properties)
    deBug = new GameDebug();
    currentBoard = new GameBoard();
    currentPieces = new GamePieces("X", "O");
    currentPlayer = "";
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], //Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Cols
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];
    // Outcome States
    /** @type {object} */
    OUTCOME = {
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
    };
    // Class Level flags
    /** @type {string} */
    hasResult = this.OUTCOME.NORESULT;
    /** @type {string} */
    hasWin = this.OUTCOME.NOWIN;
    /** @type {string} */
    hasDraw = this.OUTCOME.NODRAW;
    /** @type {string} */
    hasLost = this.OUTCOME.NOLOST;
    // Console & Tracing
    fileName = "GameLogic.js";
    logLevel = 8;
    errorLevel = 9;

    /** GameLogic: 003 Constructor @version 0.5.0 @date 2023/04/11
     * @name constructor
     * @kind function
     * @type {GameLogic}
     * @constructs GameLogic
     * @classdesc Creates an instance of GameLogic.
     * @param {GameBoard} board Current instance of a game's board
     * @param {array} pieces[] Pieces array container @default ["X","O"]
     * @param {string} locname Method trace to console @default 'GameLogic.js'
     * @interface logis GameLogic data structure/interface
     * @memberof GameLogic
     * @version 0.1.0 @date 2023/03/19
     * @version 0.3.0 @date 2023/03/22. .
     * @version 0.3.0 @date 2023/03/22. .
     * @version 0.4.2 @date 2023/04/03. Refactored, Message & Trace, Constants. dropped `this` keyboard in signature, bumped version and JSDoc
     * @version 0.5.0 @date 2023/04/11. Bumped. Addeed Object & Property pattern (logis:{object} )
     */
    constructor(board, pieces = ["X", "O"], locname = `GameLogic.js`) {
        this.deBug = new GameDebug();
        // 1: Log and Error Console
        const logis = {
            BOARD: {
                i: 1,
                param: board,
                type: `${locname}: 1 Initial: Board`,
                typetrace: `${locname}: 2 Type: Board`,
                console: this.logLevel,
            },
            PIECES: {
                i: 2,
                param: pieces,
                type: `${locname}: 1 Initial: Piece`,
                typetrace: `${locname}: 2 Type: Piece`,
                console: this.logLevel,
            },
            CURRENT: {
                i: 0,
                piece: this.currentPieces.currentPiece,
                type: `${locname}: Initial Current Player`,
                typetrace: `${locname}: 2 Type: Current Player`,
                console: this.logLevel,
            },
        };
        // 3:  santise Params
        this.currentBoard = this.evaluateParameter(
            logis.BOARD.param,
            logis.BOARD.i,
            logis.BOARD.console,
            logis.BOARD.traces
        );
        this.currentPieces = this.evaluateParameter(
            logis.PIECES.param,
            logis.PIECES.i,
            logis.PIECES.console,
            logis.PIECES.traces
        );
        this.currentPlayer = this.evaluateParameter(
            logis.CURRENT.piece,
            logis.CURRENT.i,
            logis.CURRENT.console,
            logis.CURRENT.trace
        );
        // 4: Type checking, and log to console.
        this.evaluateType(this.currentBoard, logis.BOARD.i, logis.BOARD.console, logis.BOARD.typetrace);
        this.evaluateType(this.currentPieces, logis.PIECES.i, logis.PIECES.console, logis.PIECES.typetrace);
    }

    /** isAWin: 004 @version 0.5.0 @2023/04/11 STABLE
     * @function isAWin
     * @kind function
     * @description Function to check if the move is a Win, or not; and logs the winner in the console.
     * @constant wins.ISDRAW NODRAW | NO RESULT @default this.OUTCOME.DRAW;
     * @constant wins.NODRAW NODRAW | NO RESULT @default this.OUTCOME.NODRAW;
     * @inner isWinningCombo A closure function that assigns the winning combo.
     * @returns {string | string}  Outcome DRAW | NODRAW => Maps to Game.STATES.outcome (DRAW|NODRAW|RESULT|NORESULT)
     * @memberof GameLogic
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.2 @date 2023/04/03 Removed deBug, added Constants, Bumped version & JSDoc
     * @version 0.5.0 @date 2023/04/11  Bumped. Object & Propertys (wins ENUM)
     */
    isAWin(log = this.logLevel, locname = `${this.fileName}: isAWin`) {
        const wins = {
            EMPTYGRID: "",
            ISWINS: this.OUTCOME.WIN,
            NOWINS: this.OUTCOME.NOWIN,
            RESULT: this.OUTCOME.RESULT,
            NORESULT: this.OUTCOME.NORESULT,
            console: log,
            trace: locname,
        };
        /**  Inner function to checks if a cell is occupied and if all cells meet the winning combination.
         * @function isWinningCombo
         * @param {*} combination The winning combination parameter.
         * @returns {boolean} Playing grid match with combinations
         * @memberof GameLogic.isAWin
         **/
        const isWinningCombo = (combination) => {
            const [a, b, c] = combination;
            return (
                this.currentBoard.grid[a] !== wins.EMPTYGRID &&
                this.currentBoard.grid[a] === this.currentBoard.grid[b] &&
                this.currentBoard.grid[b] === this.currentBoard.grid[c]
            );
        };
        if (this.winningCombinations.some(isWinningCombo)) {
            // 3: Game is Terminal: Return WINRESULT.
            this.hasResult = wins.RESULT;
            this.hasWin = wins.ISWINS;
            this.hasDraw = wins.NODRAW;
            return wins.ISWINS;
        }
        // 4: Game is Active: Return NOOUTCOME by default.
        this.hasResult = wins.NORESULT;
        this.hasWin = wins.NOWINS;
        this.hasDraw = wins.NODRAW;
        return wins.NOWINS;
    }

    /** isADraw 005 @version 0.5.0 @date 2023/04/11 STABLE
     * @function isADraw
     * @kind function
     * @description Checks current board grid is full, not blank as a DRAW
     * @constant wins.ISDRAW NODRAW | NO RESULT @default this.OUTCOME.DRAW;
     * @constant wins.NODRAW NODRAW | NO RESULT @default this.OUTCOME.NODRAW;
     * @returns {string | string}  Outcome DRAW | NODRAW => Maps to Game.STATES.outcome (DRAW|NODRAW|RESULT|NORESULT)
     * @memberof GameLogic
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.2 @date 2023/04/03. Reduced deBug instance, added Constants, bumped version and JSDoc
     * @version 0.5.0 @date 2023/04/11  Bumped. Object & Propertys (draws ENUM)
     */

    isADraw(log = this.logLevel, locname = `${this.fileName}: isADraw`) {
        // 1: Block level args
        const draws = {
            EMPTYGRID: "",
            ISDRAW: this.OUTCOME.DRAW,
            NODRAW: this.OUTCOME.NODRAW,
            RESULT: this.OUTCOME.RESULT,
            NORESULT: this.OUTCOME.NORESULT,
            console: log,
            trace: locname,
        };
        // 2: DRAW is all grid cells complete
        if (this.currentBoard.grid.every((cell) => cell !== draws.EMPTYGRID)) {
            // 3: Game is Terminal: Return WINRESULT.
            this.hasResult = draws.RESULT;
            this.hasDraw = draws.ISDRAW;
            this.hasWin = draws.NOWIN;
            return draws.ISDRAW;
        }
        // 4: Game is Active: Return NOOUTCOME by default.
        this.hasResult = draws.NORESULT;
        this.hasDraw = draws.NODRAW;
        this.hasWin = draws.NOWIN;
        return draws.NODRAW;
    }
    /** evaluateParameter 006 @version 0.5.0 @date 2023/04/11
     * @function evaluateParameter
     * @description checks for presence of parameter value and returns it, else exits on null or undefined.
     * @param {*} param Parmeter under evaluation
     * @param {number} [paramindex]
     * @param {number} [log] Log to console @default this.logLevel
     * @param {string} [locname] Method's trace @default this.fileName
     * @returns {object} The parameter
     * @throws {Error} If param is null or undefined.
     * @memberof GameLogic
     * @version 0.3.0 @date 2023/03/22
     * @version 0.4.2 @date 2023/04/03. Added Constants for NULL/NOTNULL, hoisted strings to Map, bumped version & JSDoc
     */
    evaluateParameter(param, paramindex = 0, log = this.logLevel, locname = `${this.fileName}: evaluateParameter`) {
        const logs = log;
        const NOTNULL = false;
        const ISNULL = true;
        // Object: Key: Value map like Object
        const paramNameMap = {
            1: "GameBoard",
            2: "GamePieces",
            default: "GamePiece's Current Symbol",
        };

        const msgMap = {
            1: "not set",
            2: "required",
            default: "Null | Undefined",
        };
        // checks if param is not null or undefined, and returns the parameter, else throws an Error.
        if (param ?? NOTNULL) {
            return param;
        }

        if (param ?? ISNULL) {
            const paramName = paramNameMap[paramindex] || paramNameMap.default;
            const paramMessage = `${locname}: ${msgMap.default}: ${paramName} ${param} is
                                                ${param ? msgMap[1] : msgMap[2]}.`;
            this.deBug._debug(param, paramMessage, logs, locname);
            throw new Error(paramMessage);
        }
    }
    /** evaluateType 006 @version 0.5.0 @date 2023/04/11
     * @function evaluateType
     * @description checks for the correct parameter types, else exits on TypeError
     * @param {object} types Parmeter under evaluation
     * @param {number} [typeindex] Optional, switches between number of parameters @default 0
     * @param {number} [log] Optional, switches between number of parameters @default 0
     * @throws {TypeError} If param is not of type GameBoard or GamePieces
     * @memberof GameLogic
     * @version 0.1.+ @date 2023/03/19
     * @version 0.3.0 @date 2023/03/22.
     * @version 0.4.2 @date 2023/04/03 Changed symbol names, created a inner closure, evalTypeError, bumped version and JSDoc
     */
    evaluateType(types, typeindex = 0, log = this.errorLevel, locname = `${this.fileName}: evaluateType`) {
        const check = log;
        // Object: Key: Value map like Object
        const typesNameMap = {
            1: "GameBoard",
            2: "GamePieces",
            default: "Unknown Type Exception",
        };
        // Closure (Inner Function) #added: 2023/04/03:11:00
        function evalTypeError() {
            // checks if param is not of type GameBoard and GamePieces, and throws a TypeError.
            if (!(types instanceof GameBoard) || !(types instanceof GamePieces)) {
                // Build ParamName from Object Literal
                const typesName = typesNameMap[typeindex] || typesNameMap.default;
                // Build Error Message & Trace
                const typesMessage = `${locname}: Both Types: ${typesName} ${types} is not of type ${typesNameMap[1]} or ${typesNameMap[2]} or ${typesNameMap.default}`;
                const typesTrace = `${locname}: Not Correct Types`;
                // Log error and Type Error
                this.deBug._debug(types, typesMessage, check, typesTrace);
                throw new TypeError(typesMessage);
            }
        }
        evalTypeError();
    }
}

export { GameLogic };
