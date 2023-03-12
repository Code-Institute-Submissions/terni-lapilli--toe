/**
 * @class GameDebug
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/10
 * @export
 */
export default class GameDebug {
  constructor() {
    this.ERRSTR_HTML = 'the HTMLElements is missing | null:'
    this.ERRSTR_NODE = 'the NODEList is missing | null:'
  }

  /**
   * @description
   * @author @iPoetDev.githib.com
   * @date 2023/03/10
   * @param {*} obj
   * @param {*} mgs
   * @param {*} level
   * @version 0.1.0
   * @memberof GameDebug
   */
  _debug(obj,mgs,level) {

    switch (level) {
      case 1:
        console.info(`1: Info: ${mgs}`)
        break
      case 2:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        break
      case 3:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        break
      case 4:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.debug(`4: Debug: ${obj}`)
        break
      case 5:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.warn(`5: Warn: ${obj}`)
        break
      case 6:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`5: Trace: ${obj}`)
        console.error(`6: Error: ${ERRSTR_HTML} ${obj}`)
        break
      case 7:
        console.info(`1: Info: ${mgs}`)
        console.log(`2: Log: Object: ${obj}`)
        console.dir(`7: Dir: ${obj}`,{colors: true,compact: true})
        console.dir(obj,{colors: true,compact: true})
        console.dirxml(`7: DirXML: ${obj}`)
        console.dirxml(obj)
        break
      case 8:
        console.info(`1: Info: ${mgs}`)
        console.trace(`5: Trace: ${obj}`)
        break
      case 9:
        console.info(`1: Info: ${mgs}`)
        console.trace(`5: Trace: ${obj}`)
        console.dir(`7: Dir: ${obj}`,{colors: true,compact: true})
        console.dirxml(`7: DirXML: ${obj}`)
        console.error(`7: Error: ${ERRSTR_HTML} ${obj}`)
        break
      default:
        console.clear()
        break
    }

  }
}
 export {GameDebug}