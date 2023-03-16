// Import Class Modules: Localised Convention: __FileName.js => indicates Class Module
import {Game} from "/lib/__Game.js"
import {GameDebug} from "/lib/__GameDebug.js"

/**
 * @name MoveListener
 * @summary This class listens for move events and error handling.
 * @class MoveListener
 * @module MoveListener
 * @exports MoveListener
 * @usage Use: moveListener.setListeners runs on App.init()
 * @description This class listens for move events, my assigning event listeners to each cell from the UI, via a click event. Handles the user intercation on the UI f the game for each move.
 * @see NodeList.Node HTML static node list of the div with queried style selector.
 * @see Game The current instance of the game is passed into the listener.
 * @see string Event name
 * @see App
 * @author @iPoetDev.githib.com
 * @date 2023/03/13
 */
class MoveListener {
  /**
   * @name constructor
   * @function constructor()
   * @constructor .
   * @summary Creates an instance of MoveListener.
   * @description Creates an instance of MoveListener, handles the error and type checking of the params
   * @param {*} _move The NodeList of move;s targets, i.e. the cells of the game board
   * @param {*} _game The game controler of the current instance of the game.
   * @param {*} _evt The string label for the type of event.
   * @prop {NodeList} move
   * @prop {Game} game
   * @prop {string} eventType
   * @prop {GameDebug} debug
   * @prop {*} onMove: Binds this instance to the listeners for all the moves.
   * @memberof MoveListener
   */
  constructor(_move, _game, _evt) {

    if (!(_move instanceof NodeList)) {
      throw new TypeError("Type: Move must be a NodeList.",{cause: _move})
    }
    if (!(_game instanceof Game)) {
      throw new TypeError("Type: Game be instance of the Game class.",{cause: _game})
    }

    if (typeof _evt !== "string") {
      //Debugger
      this.debug._debug(_evt,`Event: ${_evt} is not defined at runtime.`,6)
      this.error(_evt,3)
    }

    // Assign moves to the Game
    this.move = _move
    // Assign debugger to StartListener instances
    this.game = _game
    this.eventType = _evt
    // Assign debugger to StartListener instances
    this.debug = new GameDebug()

    this.onMove = this.onMove.bind(this)
  }

  /**
   * @name setListeners
   * @function setListeners()
   * @summary Intialise each of the moves targets for the MoveListener class
   * @description Intialise each of the moves targets for the MoveListener class. Lops throught the NodeList iterator, list of Nodes, and addEventListener() to the click event type
   * @param {*} evt Strink label for the event type of click
   * @prop cell the node that is being iterated over, applies the listner and linked to.
   * @memberof MoveListener
   */
  setListeners() {
    this.move.forEach((cell) => {
      // For each cell, (node | tile), add an event listener, assign the move to the listner and attatch to the game.
      cell.addEventListener(this.eventType,() => {
        this.onMove(cell.dataset.index)
        //Attatch debugger to the console and info output
        this.debug._debug(cell,
          `Cell ${cell.dataset.index} attatches an ${this.eventTyper}. Waiting for...`,
          3)
      })
    })
  }

  /**
   * @name onMove
   * @function onMove()
   * @summary Attatch the move's targetto the game
   * @description On each move, listen for when event emitted and attatch to the game
   * @function @memberof MoveListener
   * @param {*} i
   */
  onMove(i) {
    this.game.makeMove(i)
  }
}

export { MoveListener }