/** GamePieces: 001 Module Summary @version 0.4.2 2023/04/04
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file GamePieces, a repository/data store interface, class for the game of TicTacToe
 * @summary GamePieces act as a repository/model for game pieces/players in a game of Tic Tac Toe, for checking Piece (if input/chosen by user) and for switching pieces upon each turn completion. An interface to further functionality.
 * @kind module
 * @export GamePieces
 * @type {GamePieces}}
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08 @version 0.1.1
 * @since 2023/03/18 @version 0.3.0
 * @date 2023/04/05 @version 0.4.2
 * @link https://github.com/iPoetDev/terni-lapilli--toe/issues/17 @since 0.4.0
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 */
import { GameDebug } from "../lib/__GameDebug.js";

/**  GamePieces: 002 Class Definition @version 0.4.2 2023/04/05
 * @name GamePieces
 * @kind class
 * @classdesc Instance of the game current pieces. Game pieces to be placed on the game board
 * @export GamePieces
 * @type {GamePieces}}
 * @prop {GameDebug} deBug @kind member @private
 * @prop {Array(string, string)} pieces @kind member @private
 * @prop {string} Xpiece @kind member @public
 * @prop {string} Opiece @kind member @private
 * @prop {string} currentPiece @kind member @private
 * @prop {string} fileName @kind member @private
 * @prop {number} logLevel @kind member @private
 * @prop {number} errorLevel @kind member @private
 * @function constructor @kind function @public
 * @function getX() @kind function @public
 * @function getO() @kind function @public
 * @function setX(piece) @kind function @public
 * @function setO(piece) @kind function @public
 * @function switchPieces(nextPiece) @kind function @public
 * @function checkAPiece(piece) @kind function @private
 */
/** GamePieces: 003 Class Declaration version 0.4.2 @2023/04/04*/
class GamePieces {
    /** Game Pieces: 003 Class Props version 0.4.2 @2023/04/05
     * @prop {GameDebug} deBug Class logger @kind member
     * @prop {string[]} pieces Array of two to store 1st and 2nd game pieces. @kind member
     * @prop {string} Xpiece Piece/symbol of the first piece. Traditionally an X and is first piece played. @kind member @default X
     * @prop {string} Opiece Piece/symbol of the second piece. Traditionally an O and is second piece played. @kind member @default O
     * @prop {string} currentPiece Default piece for the first mover / turn. @kind member @default ''
     * @prop {string} fileName - FileName identifer for Error Handling @default GamePieces.js:
     * @prop {number} logLevel Class logging level for info console @kind member @default 0
     * @prop {number} errorLevel Class logging level for error console @kind member @default 9
     * @version 0.4.2 @date 2023/04/03 Bumped, JSDoc tidy, type annotations
     */

    deBug = new GameDebug();
    /**
     * @type {string[]} */
    pieces = [];
    Xpiece = "X";
    Opiece = "O";
    currentPiece = "X";
    fileName = "GamePieces.js";
    logLevel = 0;
    errorLevel = 9;

    /**  Game Pieces: 003 Constructor version 0.4.2 @2023/04/05
     * Game model class (constructor) for storage and retrieval of pieces for the game of Tic Tac Toe
     * @name constructor
     * @kind function
     * @classdesc Creates an instance of GamePieces.
     * @usage Instanitated by @see module:GameLogic
     * @param {string} firstPiece: type of string @default X
     * @param {string} secondPiece: typeof string @default 0
     * @constructs GamePieces
     * @memberof GamePieces
     * @date 2023/03/08 @version 0.1.0
     * @date 2023/03/19 @version 0.3.0  See Changelog on this date.
     * @date 2023/03/27 @version 0.4.0 Removes method
     * @date 2023/04/05 @version 0.4.2 Bump, added named Constants
     */
    constructor(firstPiece = "X", secondPiece = "O") {
        const XPIECE = 0;
        const OPIECE = 1;
        // @ts-ignore
        this.setX(firstPiece);
        this.currentPiece = this.getX();
        this.pieces[XPIECE] = this.getX();
        // @ts-ignore
        this.setO(secondPiece);
        this.pieces[OPIECE] = this.getO();
    }

    /**Game Pieces 004 getX Declaration version 0.4.2 @2023/04/05
     * @function getX  nominally a getter
     * @kind function
     * @description Gets the X piece that is currently set, if it exists and n of the array
     * @usage External accessor to class, is used?
     * @returns {string} firstPiece - The X piece
     * @throws {Error} Else throws an error and attatches this debugger.
     * @memberof GamePieces
     * @date 2023/03/12
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/27 @version 0.4.0
     * @date 2023/04/05 @version 0.4.2, Bump, named Constants, error messsage+trace, removed deBug from positive flow
     */
    getX() {
        const firstPiece = this.Xpiece;
        const check = this.errorLevel;
        const locname = `${this.fileName}: getX()`;
        const NOTNULL = false;
        const ISNULL = true;
        const DEFAULT = "X";
        try {
            //
            if (firstPiece ?? NOTNULL) return firstPiece;
            //
            if (firstPiece ?? ISNULL) return DEFAULT;
            //
            return "";
        } catch (error) {
            const errmessage = `X Piece is not available ${firstPiece}. ${error.stack}`;
            const errtrace = `${locname}: ${error.name} X Piece`;
            // Else throws an error.
            this.deBug._debug(firstPiece, errmessage, check, errtrace);
            throw new Error(`${errtrace}: ${errmessage}`);
        }
    }

    /** Game Pieces 004 setX Declaration version 0.4.2 @2023/04/05
     * @function setX nominally a setter
     * @kind function
     * @description Sets the X piece to the specified value. Else throws an error and attatches logs to console
     * @usage sets the X piece to the specified given value @constructor
     * @param {string} [piece] Must be provided @default "X"
     * Sets @prop {string} this.pieces[0] X piece for first piece
     * Sets @prop {string} this.currentPiece Updates the current piece
     * @throws {Error} Throws if piece is not set or not the current Piece.
     * @memberof GamePieces
     * @date 2023/03/12
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/04/05 @version 0.4.2 Bump, JSdoc tidy, added Named constants, remove deBug, message+trace
     */
    setX(piece = "X") {
        const check = this.errorLevel;
        const locname = `${this.fileName}: setX()`;
        const LITERAL = "string";
        const XPIECE = 0;
        try {
            if (this.checkAPiece(piece, LITERAL)) {
                this.pieces[XPIECE] = piece;
                this.currentPiece = piece;
            }
        } catch (error) {
            const errmessage = `Setting a new piece to the first piece: ${this.Xpiece} as failed, @param: ${piece}`;
            const errtrace = `${locname}: Set X Error:`;
            this.deBug._debug(error, errmessage, check, errtrace);
            throw new Error(`${errtrace}: ${errmessage}`);
        }
    }

    /** Game Pieces 005 get0 Declaration version 0.4.2 @2023/04/05
     * @function getO getter, nominally
     * @kind function
     * @description Gets the O piece that is currently set, if set, and n+1 of array
     * @usage External accessor to class, is used?
     * @returns {string} secondPiece - The O piece
     * @throws {Error} Else throws an error and the logs to console, default: trace.
     * @memberof GamePieces
     * @date 2023/03/12
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/04/05 @version 0.4.2 Bump, named Constants, error messsage+trace, removed deBug from positive flow
     */
    getO() {
        const secondPiece = this.Opiece;
        const check = this.errorLevel;
        const locname = `${this.fileName}: getO()`;
        const NOTNULL = false;
        const ISNULL = true;
        const DEFAULT = "O";
        try {
            //
            if (secondPiece ?? NOTNULL) return secondPiece;
            //
            if (secondPiece ?? ISNULL) return DEFAULT;
            //
            return "";
        } catch (error) {
            const errmessage = `O Piece is not available ${secondPiece}`;
            const errtrace = `${locname} ${error.name} O Piece`;
            // Else throws an error.
            this.deBug._debug(secondPiece, errmessage, check, errtrace);
            throw new Error(`${errtrace}: ${errmessage}`);
        }
    }

    /** Game Pieces 005 get0 Declaration version 0.4.2 @2023/04/05
     * @function setO nominally a setter
     * @kind function
     * @description Sets the O piece to the specified value. Else throws an error and attatches debugger.
     * @param {string} piece
     * Set @prop {string} pieces[1] O piece for second piece
     * Set @prop {string} currentPiece Updates the current piece
     * @throws {Error} Throws if piece is not set or not the current Piece.
     * @memberof GamePieces
     * @date 2023/03/12 @version 0.1/+
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/04/05 @version 0.4.2 Bump, JSdoc tidy, added Named constants, remove deBug, message+trace
     */
    setO(piece = "O") {
        const check = this.errorLevel;
        const locname = `${this.fileName}: setO()`;
        const LITERAL = "string";
        const OPIECE = 1;
        try {
            // if (this.checkAPiece(secondPiece, this.currentPiece))
            if (this.checkAPiece(piece, LITERAL)) {
                this.pieces[OPIECE] = piece;
                this.currentPiece = piece;
            }
        } catch (error) {
            const errmessage = `Setting a new piece to the second piece: ${this.Opiece} as failed. @param: ${piece}`;
            const errtrace = `${locname} ${error.name} O Piece`;
            this.deBug._debug(error, errmessage, check, errtrace);
            throw new Error(`${errtrace}: ${errmessage}`);
        }
    }

    /**Game Pieces 006 switchPieces Declaration version 0.4.2 @2023/04/05
     * @function switchPieces
     * @kind function
     * @description Swaps the current piece for the next player's piece based on the current turn's game piece.
     * @usage
     * @see {module} :GameLogic.nextTurn()
     * @param {string} nextPiece
     * @param {number} log @default this.logLevel
     * @param {number} check @default this.errorLevel
     * @param {string} locname @default this.fileName
     * @prop {string} this.Xpiece @default "X"
     * @prop {string} this.Opiece @default "O"
     * @prop {string} this.currentPiece Updates the current piece upon return
     * @throws {Error} Throws if piece is neither X or O
     * @memberof GamePieces
     * @date 2023/03/20 @version 0.3.0
     * @date 2023/04/05 @version 0.4.2 Bump version, Updated defaults, message+trace
     */
    switchPieces(
        nextPiece,
        log = this.logLevel,
        check = this.errorLevel,
        locname = `${this.fileName}: switchPieces()`
    ) {
        // 1: Assign Block varsm message.
        const logs = log;
        const checks = check;
        // 2: Message+Trace
        const message = `${locname}: Current Piece is ${this.currentPiece}. Old peice is`;
        const xmessage = `${message} : ${this.Xpiece}: the new piece is ${this.Opiece}`;
        const omessage = `${message} : ${this.Opiece}: the new piece is ${this.Xpiece}`;
        const trace = `${locname}: Next turn is done`;
        const errmessage = `${locname}: Piece is not defined ${this.currentPiece}. Swapping game piece failed`;
        const errtrace = `${locname}: ${nextPiece} is illegal`;
        // Swap pieces
        switch (nextPiece) {
            case this.Xpiece:
                this.deBug._debug(this.currentPiece, xmessage, logs, trace);
                return (this.currentPiece = this.Opiece); // Switch to O Piece
            case this.Opiece:
                this.deBug._debug(this.currentPiece, omessage, logs, trace);
                return (this.currentPiece = this.Xpiece); // Switch to X Piece
            default:
                this.deBug._debug(this.currentPiece, errmessage, checks, trace);
                throw new Error(`${errtrace}: ${errmessage}`);
        }
    }

    /** Game Pieces 007 checkAPiece Declaration version 0.4.2 @2023/04/05
     * @function checkAPiece
     * @description Boolean truthy check conditional helper function
     * @param {*} piece Current Piece being checked.
     * @param {string} literaltype @default string
     * @return {boolean} true or false
     * @memberof GamePieces
     * @date 2023/03/19
     * @date 2023/03/20. @version 0.3.0
     * @date 2023/04/05. @version 0.4.2 Bump, JSDocs, Removed default in lieu of CONSTANT
     */
    checkAPiece(piece, literaltype) {
        const NOTNULL = false;
        return (piece ?? NOTNULL) && typeof piece === literaltype;
    }
}

export { GamePieces };
