/* eslint-disable no-tabs */
// Wait for the HTML to be loaded to instialisation of DOM
// Research if needed if script in in the body or if script is loaded in the head
// Author: @JSAcademyOffical (2021-05-23)
// Title: Create a simple tic tac toe game using HTML, CSS, JavaScript
// Last Accessed: 2023-03-06
// https://www.youtube.com/watch?v=B3pmT7Cpi24
// Adaptations:
// i) Standalone if conditionals to while conditionals
window.addEventListener('DOMContentLoaded',() => {

  const cells = Array.from(document.getElementsByClassName('box'))
  const messenger = document.getElementById('statusText')
  const restart = document.getElementById('restart')
  console.dir(restart)

  const winCombinations = [
    // Rows
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Columns
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonals
    [0,4,8],
    [2,4,6]
  ]

  /* Coords | Indecies
      [0] [1] [2]
      [3] [4] [5]
      [6] [7] [8]
  */

  // const winCoords = [
  //   // Row
  //   [ 'A1', 'A2', 'A3' ],
  //   [ 'B1', 'B2', 'B3' ],
  //   [ 'C1', 'C2', 'C3' ],
  //   // Columns
  //   [ 'A1', 'B1', 'C1' ],
  //   [ 'A2', 'B2', 'C3' ],
  //   [ 'A3', 'B3', 'C3' ],
  //   // Diagonals
  //   [ 'A1', 'B2', 'C3' ],
  //   [ 'A3', 'B2', 'C1' ]
  // ]

  let gameState = ['','','','','','','','','']
  let currentPlayer = 'X'
  let isCurrentGame = true

  const PLAYER1_WIN = 'PLAYER1_WIN'
  const PLAYER2_WIN = 'PLAYER2_WIN'
  const TIE = 'TIE'
  const SYMBOL_CROSS = 'X'
  const SYMBOL_NOUGHT = 'O'
  const BLANKS = ''

  function handleResult() {
    let win = false
    for (let checks = 0; checks <= 7; checks++) {
      const winningMove = winCombinations[checks]
      const move1 = gameState[winningMove[0]]
      const move2 = gameState[winningMove[1]]
      const move3 = gameState[winningMove[2]]

      if (move1 === BLANK || move2 === BLANK || move3 === BLANK) {
        continue
      }
      if (move1 === move2 && move2 === move3) {
        win = true
        break
      }
    }

    if (win) {
      isCurrentGame = false
      return
    }

    if (!gameState.includes("")) {
      message(TIE)
    }
  }

  const message = ( /** @type {string} */ type) => {
    if (messenger != null) {
      switch (type) {
        case PLAYER1_WIN:
          messenger.innerText = `${PLAYER1_WIN} as ${SYMBOL_CROSS}'s wins!`
          break
        case PLAYER2_WIN:
          messenger.innerText = `${PLAYER1_WIN} as ${SYMBOL_NOUGHT}'s wins!`
          break
        case TIE:
          messenger.innerText = `${TIE}`
      }
    } else {
      console.error(messenger)
    }

  }

  const isValidAction = (cell) => {
    if (cell.textContent === SYMBOL_CROSS || cell.textContent === SYMBOL_NOUGHT) {
      return false
    }
  }

  const updateBoard = (index) => {
    gameState[index] = currentPlayer
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === currentPlayer ? SYMBOL_NOUGHT : SYMBOL_CROSS
  }

  const playMove = (cell,index) => {
    while (isValidAction(cell) && isCurrentGame) {
      cell.textContent = currentPlayer
      updateBoard(index)
      handleResult()
      changePlayer()
    }
  }

  const resetBoard = () => {
    gameState = gameState = ['','','','','','','','','']
    isCurrentGame = false

    if (currentPlayer === SYMBOL_NOUGHT) {
      changePlayer()
    }
    cells.forEach((cell) => {
      cell.textContent = BLANKS
    })
  }

  cells.forEach((cell,index) => {
    cell.addEventListener('click',() => playMove(cell,index))
  })

  if (restart !== null ) {
    restart.addEventListener('click',resetBoard)
    console.log(restart)
  } else {
    console.error(restart)
    console.dir(restart)
  }
})
