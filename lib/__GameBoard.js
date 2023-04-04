/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file __GamBoard,js class as module for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/08 @version 0.1.0
 * @date 2023/03/20 @version 0.3.0
 * @date 2023/03/27 @version 0.4.0 Extension of methods to set/get/fetch Grid data, cell data and JSON data
 * @requires { Game } from 'GameBoard.js'; @see module:GameBoard
 * @requires { GameLogic } from 'GameLogic.js'; @see module:GameLogic
 * @requires { GameDebug } from 'GameDebug.js'; @see module:GameDebug
 * @note Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
 */

import { GameDebug } from "../lib/__GameDebug.js";

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
 * @author Charles J Fowler (iPoetDev.githib.com)
 * @date 2023/03/12 @version 0.1.0
 * @date 2023/03/26 @version 0.4.1
 * @date 2023/03/25 @version 0.5.0 Add Map and JSON data structures.
 */
class GameBoard {
    /**
     * @prop {Array} surface (@alias: board): Array x 9 using the array.fill of a BLANK string
     * @prop {Boolean} isValid
     * @prop {Boolean} isInValid
     * @prop {GameDebug} debug
     */
    grid = new Array(9).fill("");
    currentCell;
    currentGridAttrs = new Map();
    boardJSON;
    isValid = false;
    isInValid = true;
    debug = new GameDebug();

    /**
     * @name constructor
     * @constructor constructor
     * @constructs GameBoard
     * @description  Creates an instance of GameBoard, sets up a new blank grid array for board, and instialises game states/booleans accordingly.
     * @memberof GameBoard
     */

    constructor() {
        // debugger; //** TODO REMOVE */
        this.grid = new Array(9).fill(""); /*?+*/
        this.isValid = true;
        this.isInValid = false;
        this.resetCurrentCell();
        this.debug = new GameDebug();
    }

    updateGridData(cell) {
        if (cell ?? false) {
            this.isCellValid = true;
            this.currentCellData(cell);
            key = cell.dataset.coord;
            //Want the Id attr of current Node
            const celldata = {};
            celldata.index = cell.datastate.index;
            celldata.state = cell.dataset.state === "true";
            celldata.row = cell.dataset.row;
            celldata.col = cell.dataset.col;
            celldata.coord = cell.dataset.coord;
            celldata.content = cell.textContent;
            this.currentGridAttrs(key, celldata);
            this.sendToJSON(this.currentGridData);
            return;
        }
    }

    clearGridData() {
        this.grid = new Array(9).fill("");
        this.currentGridAttrs = new Map();
        return;
    }

    sendToJSON(data) {
        const jsonData = JSON.stringify(Object.fromEntries(data), null, 2);
        console.dirxml(jsonData);

        this.boardJSON = jsonData;
        // return jsonData;
        return;
    }

    fetchJSON(data) {
        try {
            if (data ?? false) {
                const jsonData = JSON.parse(data);
                console.dirxml(jsonData);
                const mapData = new Map();
                for (const [key, value] of Object.entries(jsonData)) {
                    mapData.set(key, value);
                }
                this.currentGridAttrs = mapData;
                console.dirxml(mapData);
                return;
            }
        } catch (error) {
            throw new Error(
                `${error.name}: Failed to parse JSON data: ${error.filename}: ${error.linenums}:  ${error.colnumNumber}:`,
                { name: `${error.name}: Fetch & parse JSON`, stack: error }
            );
        }
    }

    updateBoardCell(cell) {
        if (cell ?? false) {
            this.currentCell = cell;
        }
    }
    fetchCurrentCell() {
        return this.currentCell;
    }

    resetCurrentCell() {
        if (this.currentCell ?? true) {
            this.currentCell = null;
        }
    }

    resetBoardData() {
        this.resetCurrentCell();
        this.clearGridData();
        this.isValid = false;
        this.isInValidState = true;
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
