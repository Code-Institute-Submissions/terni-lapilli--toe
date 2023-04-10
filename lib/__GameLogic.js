/** GameLogic.js 001 Module @version 0.4.2 @date 2023/04/04
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Logic view class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/19
  *@version 0.2.0
  *@version 0.4.2 Major Bump v0.4. Patch to 0.4.2, removed JSdocs lines
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 */

import { GameBoard } from "../lib/__GameBoard.js";
import { GamePieces } from "../lib/__GamePieces.js";
import { GameDebug } from "../lib/__GameDebug.js";

/** GameLogic 002 Class Definition @verso=ion 0.4.2 @date 2023/04/04
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
 */
class GameLogic {
    /** GameLogic: 003 Class Props @version 0.4.2 @2023/04/04
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
    /** @type {string} */
    WINSTATE = "WINRESULT";
    /** @type {string} */
    DRAWSTATE = "DRAWRESULT";
    /** @type {string} */
    NOOUTCOMESTATE = "NOOUTCOME";
    fileName = "GameLogic.js";
    logLevel = 8;
    errorLevel = 9;

    /** GameLogic: 003 Constructor @version 0.4.2 @date 2023/04/03
     * @name constructor
     * @kind function
     * @type {GameLogic}
     * @constructs GameLogic
     * @classdesc Creates an instance of GameLogic.
     * @param {GameBoard} board Current instance of a game's board
     * @param {array} pieces[] Pieces array container @default ["X","O"]
     * @param {string} locname Method trace to console @default 'GameLogic.js'
     * @constant BOARD {GameBoard} Flag @default 1
     * @constant PIECES {GamePieces} Flag @default 2
     * @constant SYMBOL  {string} Flag @default 0
     * @memberof GameLogic
     * @version 0.1.0 @date 2023/03/19
     * @version 0.3.0 @date 2023/03/22. .
     * @version 0.4.2 @date 2023/04/03. Refactored, Message & Trace, Constants. dropped `this` keyboard in signature, bumped version and JSDoc
     */
    constructor(board, pieces = ["X", "O"], locname = `GameLogic.js`) {
        this.deBug = new GameDebug();
        // 1: Log and Error Console
        const logs = this.logLevel;
        const BOARD = 1;
        const PIECES = 2;
        const SYMBOL = 0;
        // 2: Messages & Traces
        const boardtrace = `${locname}: 1 Initial: Game Board`;
        const boardtypetrace = `${locname}: 2 Type: Game Board`;
        const piecetrace = `${locname}: 1 Initial: Game Piece`;
        const piecetypetrace = `${locname}: 2 Type: Game Piece`;
        const currentplayertrace = `${locname}: Initial Current Player`;
        const currentpiece = this.currentPieces.currentPiece;
        // 3:  santise Params
        this.currentBoard = this.evaluateParameter(board, BOARD, logs, boardtrace);
        this.currentPieces = this.evaluateParameter(pieces, PIECES, logs, piecetrace);
        this.currentPlayer = this.evaluateParameter(currentpiece, SYMBOL, logs, currentplayertrace);
        // 4: Type checking, and log to console.
        this.evaluateType(this.currentBoard, BOARD, logs, boardtypetrace);
        this.evaluateType(this.currentPieces, PIECES, logs, piecetypetrace);
    }

    /** isAWin: 004 @version 0.4.2 @2023/04/03 STABLE
     * @function isAWin
     * @kind function
     * @description Function to check if the move is a Win, or not; and logs the winner in the console.
     * @constant ISWIN "WINRESULT" @default this.WINSTATE
     * @constant NOWIN "NOOUTCOME" @default this.NOOUTCOMESTATE
     * @inner isWinningCombo A closure function that assigns the winning combo.
     * @returns {string} @constant ISWIN @constant NOWIN
     * @memberof GameLogic
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.2 @date 2023/04/03 Removed deBug, added Constants, Bumped version & JSDoc
     */
    isAWin(log = this.logLevel, locname = `${this.fileName}: isAWin`) {
        /**@type {string} */
        const ISWIN = this.WINSTATE;
        /**@type {string} */
        const NOWIN = this.NOOUTCOMESTATE;
        const BLANK = "";
        /**  Inner function to checks if a cell is occupied and if all cells meet the winning combination.
         * @function isWinningCombo
         * @param {*} combination The winning combination parameter.
         * @returns {boolean} Playing grid match with combinations
         * @memberof GameLogic.isAWin
         **/
        const isWinningCombo = (combination) => {
            const [a, b, c] = combination;
            return (
                this.currentBoard.grid[a] !== BLANK &&
                this.currentBoard.grid[a] === this.currentBoard.grid[b] &&
                this.currentBoard.grid[b] === this.currentBoard.grid[c]
            );
        };
        if (this.winningCombinations.some(isWinningCombo)) {
            // 3: Game is Terminal: Return WINRESULT.
            return ISWIN;
        }
        // 4: Game is Active: Return NOOUTCOME by default.
        return NOWIN;
    }

    /** isADraw 005 @version 0.4.2 @date 2023/04/03 STABLE
     * @function isADraw
     * @kind function
     * @description Checks current board grid is full, not blank as a DRAW
     * @constant ISDRAW "DRAWRESULT" @default this.DRAWSTATE
     * @constant NODRAW "NOOUTCOME" @default this.NOOUTCOMESTATE;
     * @returns {string} @constant ISDRAW @constant NODRAW
     * @memberof GameLogic
     * @version 0.3.0 @date 2023/03/22. See Changelog on this date.
     * @version 0.4.2 @date 2023/04/03. Reduced deBug instance, added Constants, bumped version and JSDoc
     **/
    isADraw(log = this.logLevel, locname = `${this.fileName}: isADraw`) {
        // 1: Block level args
        const ISDRAW = this.DRAWSTATE;
        const NODRAW = this.NOOUTCOMESTATE;
        const BLANK = "";
        // 2: DRAW is all grid cells complete
        if (this.currentBoard.grid.every((cell) => cell !== BLANK)) {
            // 3: Game is Terminal: Return WINRESULT.
            return ISDRAW;
        }
        // 4: Game is Active: Return NOOUTCOME by default.
        return NODRAW;
    }
    /** evaluateParameter 006 @version 0.4.2 @date 2023/04/03
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
    /** evaluateType 006 @version 0.4.2 @date 2023/04/03
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
