

export class GameBoard {
  constructor() {
    this.board = new Array(9).fill('')
    this.isValid = true;
    this.isInValid = false;
  }

  isCellFree() { }

  isCellOccupied() { }

}