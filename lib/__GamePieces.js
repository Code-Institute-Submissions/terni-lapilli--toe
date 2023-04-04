/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Controller class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08
 * @since 2023/03/18
 * @version 0.2.0
 * @requires { GameDebug } from "GameDebug.js"; @see module:GameDebug
 */
import { GameDebug } from "../lib/__GameDebug.js";

/** GamePieces
 * @name GamePieces
 * @kind class
 * @classdesc Instance of the game current pieces. Game pieces to be placed on the game board
 * @export GamePieces
 * @usage Use for storing default peiecs or alternate pieces if user has a choice
 * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
 * @prop {string} Xpiece Piece/symbol of the first piece. Traditionally an X and is first piece played.
 * @prop {string} Opiece Piece/symbol of the second piece. Traditionally an O and is second piece played.
 * @prop {string} currentPiece Default piece for the first mover / turn.
 * @prop {GameDebug} debug Debugger/Console
 * @function getX() Retrieves this.XPiece
 * @function getO() Retrieves this.XPiece
 * @function setX(piece) @returns {string}
 * @function setO(piece) @returns {string}
 * @function checkAPiece(piece) @return {boolean} Boolean truthy check conditional for setting a Piece; or returns a falsey.
 * @function hasAPiece(piece,symbols,slot) @return {boolean} Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
 * @function evaluatePieces @returns {Array(string, string)} Evaluates the pieces for the game for @type {string} literal.
 */
class GamePieces {
    /** Class Props [ ] TODO FREEZE
     * @prop {GameDebug} debug Debugger/Console
     * @prop {Array(string, string)} pieces Array of two to store 1st and 2nd game pieces. Starts at [0]
     * @prop {string} Xpiece Piece/symbol of the first piece. Traditionally an X and is first piece played. @default O
     * @prop {string} Opiece Piece/symbol of the second piece. Traditionally an O and is second piece played. @default O
     * @prop {string} currentPiece Default piece for the first mover / turn. @default ''
     * @prop {string} fileName - FileName identifer for Error Handling @default GamePieces.js:
     */

    deBug = new GameDebug();
    pieces = [];
    Xpiece = "X";
    Opiece = "O";
    currentPiece = "X";
    fileName = "GamePieces.js";
    logLevel = 1;
    errorLevel = 9;

    /** constructor [ ] TODO FREEZE
     * Game model class (constructor) for storage and retrieval of pieces for the game of Tic Tac Toe
     * @name constructor
     * @kind function
     * @classdesc Creates an instance of GamePieces.
     * @usage Instanitated by @see module:GameLogic
     * @param {string} firstPiece: type of string @default X
     * @param {string} secondPiece: typeof string @default 0
     * @constructs GamePieces
     * @type {GamePieces}
     * @memberof GamePieces
     * @date 2023/03/08 @version 0.1.0
     * @date 2023/03/19 @version 0.3.0  See Changelog on this date.
     * @date 2023/03/27 @version 0.4.0 Removes method
     */
    constructor(firstPiece = "X", secondPiece = "O") {
        this.setX(firstPiece);
        this.currentPiece = this.getX();
        this.pieces[0] = this.getX();
        this.setO(secondPiece);
        this.pieces[1] = this.getO();
    }

    /** getX [ ] TODO check
     * @function getX  nominally a getter
     * @kind function
     * @description Gets the X piece that is currently set, if it exists and n of the array
     * @usage External accessor to class, is used?
     * @returns {string} firstPiece - The X piece
     * @throws {Error} Else throws an error and attatches this debugger.
     * @memberof GamePieces
     * @note: This function was originally a @getter, now nominally is.
     * @date 2023/03/12
     * @date 2023/03/19 @version 0.3.0
     * @date 2023/03/27 @version 0.4.0
     */
    getX() {
        const log = this.logLevel;
        const check = this.errorLevel;
        const locname = `${this.fileName}: getX()`;

        try {
            const firstPiece = this.Xpiece;
            // if (this.hasAPiece(firstPiece, this.pieces[0], 0))
            if (firstPiece ?? false) {
                this.deBug._debug(firstPiece, `${locname}retrieves X from ${this.pieces.toString()}`, log, locname);
                return firstPiece;
            }
        } catch (err) {
            const errmessage = `X Piece is not available ${firstPiece}`;
            // Else throws an error.
            this.deBug._debug(firstPiece, errmessage, check, locname);
            throw new Error(errmessage, { name: `${locname} Get X Error:`, stack: err });
        }
    }

    /** setX [ ] TODO check
     * @function setX nominally a setter
     * @kind function
     * @description Sets the X piece to the specified value. Else throws an error and attatches logs to console
     * @usage sets the X piece to the specified given value @constructor
     * @param {*} [piece] Must be provided @default X
     * Sets @prop {string} this.pieces[0] X piece for first piece
     * Sets @prop {string} this.currentPiece Updates the current piece
     * @throws {Error} Throws if piece is not set or not the current Piece.
     * @memberof GamePieces
     * @note: This function was originally a @setter, now nominally is.
     * @date 2023/03/12
     * @date 2023/03/19
     **@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
     */
    setX(piece = "X") {
        const log = this.logLevel;
        const check = this.errorLevel;
        const locname = `${this.fileName}: setX()`;
        /** Uses null coalescing, only proceeds if firstPiece is truthy, and is not the currentPiece  */
        try {
            if (this.checkAPiece(piece, "string")) {
                this.pieces[0] = piece;
                this.currentPiece = piece;
                this.deBug._debug(
                    piece,
                    `${locname} sets X currently to ${this.currentPiece} or ${this.pieces[0]}`,
                    log,
                    locname
                );
            }
        } catch (error) {
            const errmessage = `Setting a new piece to the first piece: ${this.Xpiece} as failed, @param: ${piece}`;
            this.deBug._debug(error, errmessage, check, `${locname}: firstPiece`);
            throw new Error(errmessage, { name: `${locname}: Set X Error:`, stack: error });
        }
    }

    /** getO [ ] TODO check
     * @function getO getter, nominally
     * @kind function
     * @description Gets the O piece that is currently set, if set, and n+1 of array
     * @usage External accessor to class, is used?
     * @returns {string} secondPiece - The O piece
     * @throws {Error} Else throws an error and the logs to console, default: trace.
     * @memberof GamePieces
     * @note: This function was originally a @getter, now nominally is.
     * @date 2023/03/12
     * @date 2023/03/19
     * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
     */
    getO() {
        const log = this.logLevel;
        const check = this.errorLevel;
        const locname = `${this.fileName}: getO()`;
        try {
            const secondPiece = this.pieces[1];
            if (this.hasAPiece(secondPiece, this.pieces, 1)) {
                this.deBug._debug(firstPiece, `${locname} retrieves O from ${this.pieces.toString()}`, log, locname);
                return secondPiece;
            }
        } catch (err) {
            const errmessage = `O Piece is not available ${secondPiece}`;
            // Else throws an error.
            this.deBug._debug(secondPiece, message, check, locname);
            throw new Error(errmessage, { name: `${locname} Get O Error:`, stack: err });
        }
    }

    /** setO [ ] TODO check
     * @function setO nominally a setter
     * @kind function
     * @description Sets the O piece to the specified value. Else throws an error and attatches debugger.
     * @param {*} piece
     * Set @prop {string} pieces[1] O piece for second piece
     * Set @prop {string} currentPiece Updates the current piece
     * @throws {Error} Throws if piece is not set or not the current Piece.
     * @memberof GamePieces
     * @note: This function was originally a @setter, now nominally is.
     * @date 2023/03/12
     * @date 2023/03/19
     * *@version 0.3.0  @TOfreeze @date 2023/03/20. See Changelog on this date.
     */
    setO(piece = "O") {
        const log = this.logLevel;
        const check = this.errorLevel;
        const locname = `${this.fileName}: setO()`;
        try {
            // if (this.checkAPiece(secondPiece, this.currentPiece))
            if (this.checkAPiece(piece, "string")) {
                this.pieces[1] = piece;
                this.currentPiece = piece;
                this.deBug._debug(
                    piece,
                    `${locname} sets O currently to ${this.currentPiece} or ${this.pieces[1]}`,
                    log,
                    locname
                );
            }
        } catch (error) {
            const errmessage = `Setting a new piece to the second piece: ${this.Opiece} as failed. @param: ${piece}`;
            this.deBug._debug(error, errmessage, check, `${locname}: firstPiece`);
            throw new Error(errmessage, { name: `${locname}: Set O Error:`, stack: error });
        }
    }

    /** switchPieces [ ] TODO FREEZE Is in Use?
     * @function switchPieces
     * @kind function
     * @description Swaps the current piece for the next player's piece based on the current turn's game piece.
     * @usage Is this in use?
     * @property {string} this.X Class member & X piece
     * @property {string} O Class member & O piece
     * @property {string} currentPiece Updates the current piece
     * @throws {Error} Throws if piece is not set or not the current Piece.
     * @memberof GamePieces
     * @date 2023/03/19
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    switchPieces(nextMovePiece, log = 1, check = 5, locname = `${this.fileName}: switchPieces()`) {
        // Function message strings.
        const message = `${locname}: Current Piece is ${this.currentPiece}. Old peice is`;
        const errmessage = `${locname}: Piece is not defined ${this.currentPiece}. Swapping game piece failed`;
        // Swap pieces
        switch (nextMovePiece) {
            case this.Xpiece:
                // Log to console
                this.deBug._debug(
                    this.currentPiece,
                    `${message} : ${this.Xpiece}: the new piece is ${this.Opiece}`,
                    log,
                    `${locname}: Next turn is X`
                );
                return (this.currentPiece = this.Opiece); // Switch to O Piece
            case this.Opiece:
                // Log to console
                this.deBug._debug(
                    this.currentPiece,
                    `${message} : ${this.Opiece}: the new piece is ${this.Xpiece}`,
                    log,
                    `${locname}: Next turn is O`
                );
                return (this.currentPiece = this.Xpiece); // Switch to X Piece
            default:
                this.deBug._debug(this.currentPiece, errmessage, check, locname);
                throw new Error(errmessage, { name: `${locname}: Switch Symbol Error:` });
        }
    }

    /** checkAPiece [ ] TODO FREEZE
     * @function checkAPiece
     * @summary Boolean truthy check conditional for setting a Piece; or returns a falsey.
     * @param {*} piece
     * @param {*} current
     * @returns {Boolean} true or false
     * @useage this.checkAPiece(piece, current) is used to evaluate a piece for setting a game piece's content, on an @accessor with a @setter
     * @memberof GamePieces
     * @date 2023/03/19
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    checkAPiece(piece, literaltype = "string") {
        return (piece ?? false) && typeof piece === literaltype;
    }

    /** hasAPiece [ ] TODO FREEZE
     * @function hasAPiece
     * @kind function
     * @returns {Boolean} true or false
     * @description Boolean truthy check conditional for getting of a game Piece; or returns a falsey.
     * @param {*,string} piece - piece to check from the slot/index of the array/
     * @param {*,array} symbols - two member array of pieces in a two player/piece game
     * @param {*,number} slot - slot / index of the array
     * @usage this.hasAPiece(piece, symbol, element) is used to evaluate a piece for getting/retrieving  a game piece's content, on an @accessor with a @getter
     * @memberof GamePieces
     * @date 2023/03/19
     * @version 0.3.0  FREEZE @date 2023/03/20. See Changelog on this date.
     */
    hasAPiece(piece, symbols, slot) {
        return (piece ?? false) && symbols[slot].includes(piece, slot);
    }
}

export { GamePieces };
