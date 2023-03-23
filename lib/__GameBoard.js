import { GameDebug } from "/lib/__GameDebug.js";

/**
 * @name GameBoard
 * @summary Instance of a individual game board and blank cells.
 * @class GameBoard
 * @module GameBoard
 * @exports GameBoard
 * @usage Usage: Provides the reset capability for new game's playing board/surface
 * @see Game
 * @see GameDebug @imports
 * @description A class for instance of a game board to be used for each game.
 * [ ] TODO: Use board class to manage the state of the game.
 * [ ] TODO: Use board class to maybe store the data and retrieve from the local storage
 * [ ] TODO: Use board class to to check the state of the game's tiles/cells (Maybe) against illegal moves.
 * @notes Is this class really needed?
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/12
 * @version 0.1.0
 */
class GameBoard {
    /**
     * @prop {Array} surface (@alias: board): Array x 9 using the array.fill of a BLANK string
     * @prop {Boolean} isValid
     * @prop {Boolean} isInValid
     * @prop {GameDebug} debug
     */
    grid = new Array(9).fill("");
    isValid = true;
    isInValid = false;
    debug = new GameDebug();

    /**
     * @name constructor
     * @constructor constructor
     * @constructs GameBoard
     * @description  Creates an instance of GameBoard, sets up a new blank grid array for board, and instialises game states/booleans accordingly.
     * @memberof GameBoard
     */

    constructor() {
        // debugger;
        this.grid = new Array(9).fill(""); /*?+*/
        this.isValid = true;
        this.isInValid = false;
        this.debug = new GameDebug();
    }

    /**
     * @description check is grid cell is free.
     * @usage Usage: Not used yet.
     * @date 2023/03/19
     * [ ] TODO  Remove if no use case
     * @memberof GameBoard
     */
    isCellFree() {}
    /**
     * @description check is grid cell is not free.
     * @usage Usage: Not used yet.
     * @date 2023/03/19
     * [ ] TODO  Remove if no use case
     * @memberof GameBoard
     */
    isCellOccupied() {}
}

export { GameBoard };
