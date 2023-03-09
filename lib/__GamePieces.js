

/**
 * @class GamePlayers
 * @export
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/08
 */
export class GamePieces {
  constructor(x,y) {
    this.pieces= [x,y]
    this.currentSymbol = this.pieces[0]
    this.X = X()
    this.O = O()
  }

  static get X() {
    this.X = this.pieces[0]
    return X
  }
  static get O() {
    this.O = this.pieces[1]
    return O
  }
  static set X(symbol) {
    this.X = symbol
  }
  static set O(symbol) {
    this.O = symbol
  }
}