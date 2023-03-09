export default class MoveListener {
  constructor(move,game) {
    this.move = move
    this.game = game
    this.onMove = this.onMove.bind(this)
  }

  initialize(evt) {
    this.move.forEach((cell) => {
      cell.addEventListener(evt,() => {
        this.onMove(cell.dataset.index)
        console.log(" ",cell.dataset.index," Clicked")
      })
    })
  }

  onMove(i) {
    this.game.makeMove(i)
  }
}

export { MoveListener }