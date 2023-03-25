/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Logic view class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/19
  *@version 0.2.0
 * @requires { GameBoard } from "GameBoard.js"; @see module:GameBoard
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 * @requires { GamePieces } from "GamePieces.js"; @see module:GamePieces
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
  * FIXME Import Class Modules: Author's custom Convention: __FileName.js => indicates Class Module. Non essential/fixable
 */

import { GameBoard } from "/lib/__GameBoard.js";
import { GamePieces } from "/lib/__GamePieces.js";
import { GameDebug } from "/lib/__GameDebug.js";

/** GameLogic [ ] TODO: REVIEW/FREEZE V0.3.0 2023/03/22
 * @name GameLogic
 * @kind class
 * @classdesc Instance of the current Game logic model
 * @export {GameLogic}
 * @usage Used to check Win or Draw conditions of the game.
 * @summary Class for the logic/game flow for the running of the game's state.
 * @prop {GameBoard} currentBoard  of GameBoard for the current instance of the game
 * @prop {GamePieces} currentPieces Array [string, string] of GamePieces for the current instance of the game
 * @prop {string} currentPlayer: Holder of for the current piece in play for the current instance of the game.
 * @prop {string} aBLANK: Empty Cell. Literal string representation.
 * @prop {number[][]} winningCombinations: Retrieves the games winning moves & logic of the game to evaluate  the possible combinations of moves
 * @prop {GameDebug} debug Debugger/Console
 * @function  isAWin @return {boolean}
 * @description Game logic of the game to test for check for winning combinations.
 * @function isADraw @return  {boolean}
 * @description Game logic of the game to test for a draw when every cell is occupied
 * @function evaluateParameter @throws {Error} if @param param is null or undefined or @return {*} param to the class @property assigned
 * @function evaluateType @throws {TypeError} on exit if @param param is not @type {GameBoard} || @type {GamePieces}
 * @author @iPoetDev
 * @date 2022/03/08
 */
class GameLogic {
    /** GameLogic Class Props
     * @prop {GameDebug} debug Debugger/Console
     * @prop {GameBoard} currentBoard  of GameBoard for the current instance of the game
     * @prop {GamePieces} currentPieces Array (strings, string) of GamePieces for the current instance of the game
     * @prop {string} currentPlayer: Holder of for the current piece in play for the current instance of the game.
     * @prop {string} aBLANK: Empty Cell. Literal string representation.
     * @prop {number[][]} winningCombinations: Retrieves the games winning moves & logic of the game to evaluate  the possible combinations of moves.
     */
    // Class Fields (Properties)
    deBug = new GameDebug();
    currentBoard = new GameBoard();
    currentPieces = new GamePieces("X", "O");
    currentPlayer = "";
    aBLANK = "";
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
    fileName = "GameLogic.js";
    logLevel = 0;

    /** GAME LOGIC [ ] TODO: FREEZE V0.3.0 2023/03/22
     * Game model class (constructor) for the logic conditions of the game of TicTacToe.
     * @name constructor
     * @description Creates an instance of GameLogic.
     * @param {*} board
     * @param {*} pieces
     * @param {*} locname
     * @constructor
     * @constructs GameLogic
     * @type {GameLogic}
     * @memberof GameLogic
     * @date 2023/03/19
     * @note Refactored to employ internal helper functions instead of inline conditional and defensive code to improve readability, reduce code duplication and improve maintainability.
     * @version 0.3.0 FREEZE @date 2023/03/22. See Changelog on this date.
     */
    constructor(board, pieces = ["X", "O"], locname = `${this.fileName}: Constructor`) {
        this.deBug = new GameDebug();
        const check = this.logLevel;
        //Defensive checking with helper functions:
        // 1: Null | Undefined checking, else assign params
        // debugger;
        this.currentBoard = this.evaluateParameter(board, 1, this.logLevel);
        this.currentPieces = this.evaluateParameter(pieces, 2, 0);
        // 2: Type checking, and log to console.
        this.evaluateType(this.currentBoard, 1, this.logLevel);
        this.evaluateType(this.currentPieces, 2, this.logLevel);
        // 3: Null | Undefined checking, else assign current player's piece
        this.deBug._debug(
            this.currentPieces.currentPiece,
            `${this.currentPieces.currentPiece}, ${locname} -> Current Piece`,
            check,
            locname
        );
        this.currentPieces.currentPiece; /*?+*/
        // debugger;
        this.currentPlayer = this.evaluateParameter(this.currentPieces.currentPiece, 0, this.logLevel);
        /** [ ] TODO @note 4: Moved Blank and Comination class members to field properties, as (I think) these class members are not needed in every instance as they are internal use only, else move back to constructor */
        this.gameLogger(this.logLevel, `${locname}`);
    }

    /** iwAWin [ ] DONE: FREEZE V0.3.0 2023/03/22
     * @function isAWin
     * @memberof GameLogic
     * @description Function to check if the move is a Win, or not; and logs the winner in the console.
     * @inner@function isWinningCombination Assigns the winning combo
     * @returns {boolean}
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    isAWin(log = 0, locname = `${this.fileName}: isAWin`) {
        /**
         * @function isWinningCombo
         * @inner
         * @description Inner function to checks if a cell is occupied and if all cells meet the winning combination.
         * @param {*} combination The winning combination parameter.
         * @returns {Boolean}
         * @memberof isAWin
         * @note Add a messaging class messages to the UI and User or [ ] TODO hosit this as a move to a higher / calling Class
         **/
        const isWinningCombo = (combination) => {
            /** @param {array} combination */
            const [a, b, c] = combination;
            return (
                this.board.grid[a] !== this.aBLANK &&
                this.board.grid[a] === this.board.grid[b] &&
                this.board.grid[b] === this.board.grid[c]
            );
        };
        // Announces if the currentPlayer is the winner
        if (this.winningCombinations.some(isWinningCombo)) {
            this.deBug._debug(this.winningCombinations, `Winning combination`, log, `${locname}`);
            this.deBug._debug(this.currentPlayer, `The winner is: ${this.currentPlayer}`, level, `${locname}`);
            return true;
        }
        // Return false by default.
        this.deBug._debug(
            this.board,
            `checks Win: This Game is in play and the current Player is ${this.currentPlayer}`,
            level,
            `${locname}`
        );
        return false;
    }

    /** isADraw [ ] INSPECT:  v0.3.0 2023/03/22
     * @function isADraw
     * @memberof GameLogic
     * @description checks every cell in the board array if all cells are all full, if true, and logs a draw in the console.
     * @description If check is not true, returns false and logs current game state and who the current player is.
     * @returns {boolean}
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     **/
    isADraw(log = 0, locname = `${this.fileName}: isADraw`) {
        if (this.board.every((cell) => cell !== this.aBLANK)) {
            this.deBug._debug(
                this.board,
                `This Game is a Draw and the current Player is ${this.currentPlayer}`,
                log,
                `${locname}`
            );
            return true;
        }
        this.deBug._debug(
            this.board,
            `check Draw: This Game is in play and the current Player is ${this.currentPlayer}`,
            log,
            `${locname}`
        );
        return false;
    }
    /** evaluateParameter [ ] FREEZE: v.0.3.0 2023/03/20
     * @function evaluateParameter
     * @description checks for presnce of parameter value and returns it, else exits on null or undefined.
     * @param {*} param Parmeter under evaluation
     * @param {number} [argIndex=0] Optional, switches between number of parameters
     * @returns {*} The parameter
     * @throws {Error} If param is null or undefined.
     * @memberof GameLogic
     * @date 2023/03/19
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    evaluateParameter(param, argIndex = 0, log = 0, locname = `${this.fileName}: evaluateParameter`) {
        // Object: Key: Value map like Object
        const paramNameMap = {
            1: "GameBoard",
            2: "GamePieces",
            default: "GamePiece's Current Symbol",
        };
        // checks if param is not null or undefined, and returns the parameter, else throws an Error.
        if (param ?? false) {
            return param;
        } else {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            this.deBug._debug(
                param,
                `${locname}: Null | Undefined: ${paramName} ${param} is ${param ? "not set" : "required"}.`,
                log,
                `${locname}`
            );
            throw new Error(`${locname}: ${paramName} ${param} is ${param ? "not set" : "required"}.`);
        }
    }
    /** evaluateType [ ] INSPECT:  v0.3.0 2023/03/22
     * @function evaluateType
     * @description checks for the correct parameter types, else exits on TypeError
     * @param {*} param Parmeter under evaluation
     * @param {number} [argIndex] Optional, switches between number of parameters @default 0
     * @param {number} [log] Optional, switches between number of parameters @default 0
     * @throws {TypeError} If param is not of type GameBoard or GamePieces
     * @memberof GameLogic
     * @date 2023/03/19
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    evaluateType(param, argIndex = 0, log = 0, locname = `${this.fileName}: evaluateType`) {
        // Object: Key: Value map like Object
        const paramNameMap = {
            1: "GameBoard",
            2: "GamePieces",
            default: "Unkown Type Exception",
        };
        // checks if param is not of type GameBoard and GamePieces, and throws a TypeError.
        if (!(param instanceof GameBoard) && !(param instanceof GamePieces)) {
            const paramName = paramNameMap[argIndex] || paramNameMap.default;
            this.deBug._debug(
                param,
                `${locname}: Both Types: ${paramName} ${param} is not of type GameBoard and GamePieces.`,
                log,
                `${locname}`
            );
            throw new TypeError(
                `BOTH: ${locname}: Both Types: ${paramName} ${param} is not of type GameBoard or GamePieces.`
            );
        }
    }
    /** gameLogger [ ] INSPECT:  v0.3.0 2023/03/22
     * @function gameLogger
     * @description Used to log or debug the current class instance and method.
     * @usage Only to be used in class constructors currently for the nominal flow of the game/app.
     * @author @iPoetDev.githib.com
     * @param {number} log [level=1] Default level is 1, the lowest level of logging, just informational, but developer can toggle these as needed. @default "1" @see module:GameDebug for more information on levels.
     * @param {string} Locname [locname="this.fileName"]: Default is the filename. Location name of when the logger is called. Filename and method name in a template literal. @default "this.fileName"
     * @date 2023/03/19
     * @memberof GameLogic
     * @note Adjust the message strings per class instance.
     * @version 0.3.0 INSPECT @date 2023/03/22. See Changelog on this date.
     */
    gameLogger(log = 0, locname = `${this.fileName}`) {
        this.deBug._debug(
            this.currentBoard,
            `InstanceOf: Game's Current Board ${this.currentBoard}`,
            log,
            locname
        ); /*?+*/
        this.deBug._debug(
            this.currentPieces,
            `InstanceOf: Game's Current Pieces ${this.currentPieces}`,
            log,
            locname
        ); /*?+*/
        this.deBug._debug(
            this.currentPlayer,
            `InstanceOf: Game's Current Player's piecce ${this.currentPlayer}`,
            log,
            locname
        ); /*?+*/
    }
}

export { GameLogic };
