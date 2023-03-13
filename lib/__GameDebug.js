/**
 * @class GameDebug
 * @description
 * @author @iPoetDev.githib.com
 * @date 2023/03/10
 * @export
*/
class GameDebug {

  constructor() {
    this.ERR_HTML = 'the HTMLElements is missing | null:'
    this.ERR_NODE = 'the NODEList is missing | null:'

  }

  /**
   * @name _debug
   * @function _debug
   * @summary Debugger function with levels of StdOut/StdErr.
   * @description Flaged directed switch statements for selecting a level debugger StdOut, StdErr in console mode / browser console
    *    Level 1:  Info/Output
    *      Level 2:  Info/Logging (alias for 1)
    *      Level 3:  Info/Tracing
    *      Level 4:  Debug/Tracing
    *      Level 5:  Warn/Tracing
    *      Level 6:  Error/ Tracing
    *      Level 7:  Dir/Interactive Property Inspector
    *                  Dirxml/Interactive Tree of decendants
    *      Level 8:  Simple Tracing @todo Remove/Improve
    *      Level 9:  Error/Full stack error tracking
    *      Level Default: Clers the console output.
    * @usage Attatch to any class, and determine the root cause of errors, or confirmation logs.
    * @usage Possible future use case for unit testing, i think
    * @param {*} obj: Object to inspect
    * @param {*} mgs Custom message
    * @param {*} level Debug level
    * @version 0.1.0
    * @memberof GameDebug
  */
  _debug(obj,mgs,level) {

    switch (level) {
      case 1:
        console.info(`1: Info: ${mgs}. Level 1: Info/Output`)
        break
      case 2:
        console.info(`1: Info: ${mgs}. Level 2: Info/Logging`)
        console.log(`2: Log: Object: ${obj}`)
        break
      case 3:
        console.info(`1: Info: ${mgs}. Level 3: Info/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        break
      case 4:
        console.info(`1: Info: ${mgs}. Level 4: Debug/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.debug(`4: Debug: ${obj}`)
        break
      case 5:
        console.info(`1: Info: ${mgs}. Level 5: Warn/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.warn(`5: Warn: ${obj}`)
        break
      case 6:
        console.info(`1: Info: ${mgs}. Level 6: Error/Tracing: HTMLElements`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`5: Trace: ${obj}`)
        console.error(`6: Error: ${this.ERR_HTML} ${obj}`)
        break
      case 7:
        console.info(`1: Info: ${mgs}. Level 7: Dir/Interactive Property Inspector`)
        console.log(`2: Log: Object: ${obj}`)
        console.dir(`7: Dir: ${obj}`,{colors: true,compact: true})
        console.dir(obj,{colors: true,compact: true})
        console.dirxml(`7: DirXML: ${obj}`)
        console.dirxml(obj)
        break
      case 8:
        console.info(`1: Info: ${mgs}. Level: 8: Info:/ Trace`)
        console.trace(`5: Trace: ${obj}`)
        break
      case 9:
        console.info(`1: Info: ${mgs}. Level: 9: Error/Full Stack & DomXML`)
        console.trace(`5: Trace: ${obj}`)
        console.dir(`7: Dir: ${obj}`,{colors: true,compact: true})
        console.dirxml(`7: DirXML: ${obj}`)
        console.error(`7: Error: ${this.ERR_HTML} ${obj}`)
        break
      default:
        console.clear()
        break
    }

  }
}
 export {GameDebug}