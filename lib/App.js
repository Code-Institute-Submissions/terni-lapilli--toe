
import { Game } from "/lib/__Game.js"
import { ButtonListener } from "/lib/__ButtonListener.js"
import { MoveListener } from "/lib/__MoveListener.js"

const _CELL = '.cell'        /** @type {String}  */
const _START = '#start'    /** @type {String}  */
const _EVNT = 'click'       /** @type {String}  */

// Load the Game Controller
let game = new Game( 'X','Y' )
console.trace( game )
// Capture the UI elements idents that the User Inputs has interactions with
let move = document.querySelectorAll( _CELL )
let button = document.querySelectorAll( _START )
// Initailise the button Listener and start the game when start game state changes
let buttonListener = new ButtonListener( button, game, _EVNT )
buttonListener.onStart()
// Installise the move listener and listen for the user inputs
let moveListener = new MoveListener( move, game, _EVNT )
moveListener.initialize()




