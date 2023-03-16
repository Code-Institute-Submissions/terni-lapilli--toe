/**
  (c) 2023-2025, Charles Fowler, iPoetDev.github.com
 * @copyright 2023-2025,
 * @file Game Debugger class for the game of TicTacToe
 * @kind module
 * @author Charles Fowler iPoetDev.github.com
 * @date 2023/03/09
 * @since 2023/03/16
 * @version 0.2.0
 * @summary Game Debugger for testing, and inspecting the game's state, transitions, activities and errors. Also allows code reviwers and other developers, to monitor the app and game's functioning.
   */


/**
 * @name GameDebug
 * @kind class
 * @class
 * @constructor
 * @classdesc Game Debugger class for the game of TicTacToe
 * @field @property {String} this.ERR_HTML @public @instance
 * @function _debug() @public
 * @exports GameDebug
*/
class GameDebug {

  constructor() {
    this.ERR_HTML = 'the Element is missing | null:'
  }

  /**
   * @name _debug
   * @function _debug
   * @summary Debugger function with levels of StdOut/StdErr.
   * @description Flaged directed switch statements for selecting a level debugger StdOut, StdErr in console mode / browser console
    *      Level 1:  Info/Output
    *      Level 2:  Info/Logging (alias for 1)
    *      Level 3:  Info/Tracing
    *      Level 4:  Debug/Tracing
    *      Level 5:  Warn/Tracing
    *      Level 6:  Error/ Tracing
    *      Level 7:  Dir/Interactive Property Inspector
    *                  Dirxml/Interactive Tree of decendants
    *      Level 8:  Dirxml/Interactive Decendants  & Warn Tracing
    *      Level 9:  Error/Full stack error tracking
    *      Level Default: Clers the console output.
    * @usage Attatch to any class, and determine the root cause of errors, or confirmation logs.
    * @usage Possible future use case for unit testing, i think
    * @param {*} obj: Object to inspect
    * @param {*} mgs Custom message
    * @param {*} level Debug level
    * @param {*} filename Author provided filename location of debugger
    * @version 0.1.0
    * @memberof GameDebug
  */
  _debug(obj,mgs,level,filename) {

    switch (level) {
      case 1:
        console.info(`=====================Logging: Level 1: Infomation: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 1: Info/Output`)
        console.info(`=====================End: Level 1=====================`)
        debugger;
        break
      case 2:
        console.info(`=====================Log Strings: Level 2: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 2: Info/Logging`)
        console.log(`2: Log: Object: ${obj.toString} : ${obj}`)
        console.info(`=====================End: Level 2=====================`)
        debugger;
        break
      case 3:
        console.info(`=====================Trace: Level 3: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 3: Info/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.info(`=====================End: Level 3=====================`)
        debugger;
        break
      case 4:
        console.info(`=====================Debug: Level 4: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 4: Debug/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.debug(`4: Debug: ${obj}`)
        console.info(`=====================End: Level 4=====================`)
        debugger;
        break
      case 5:
        console.info(`=====================Warn Tracing: Level 5: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 5: Warn/Tracing`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`3: Trace: ${obj}`)
        console.warn(`5: Warn: ${obj}`)
        console.info(`=====================End: Level 5=====================`)
        debugger;
        break
      case 6:
        console.info(`=====================Error Tracing: Level 6: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 6: Error/Tracing: HTMLElements`)
        console.log(`2: Log: Object: ${obj}`)
        console.trace(`5: Trace: ${obj}`)
        console.error(`6: Error: ${this.ERR_HTML} ${obj}`)
        console.info(`=====================End: Level 6=====================`)
        debugger;
        break
      case 7:
        console.info(`=====================Object Tracing: Level 7: ${filename} ===================`)
        console.info(`1: ${filename} Info: ${mgs}. Level 7: Dir/Interactive Property Inspector`)
        console.log(`2: Log: Object: ${obj}  ${obj.toString} :   ${obj.toString} : ${Object.values(obj)}`)
        console.dir(`7: ${filename} Dir: ${obj}:  ${obj.toString} : `,{colors: true,compact: true})
        console.dir(obj,{colors: true,compact: true})
        console.dirxml(`7:${filename}  DirXML: ${obj}`)
        console.dirxml(obj)
        console.info(`=====================End: Level 7=====================`)
        debugger;
        break
      case 8:
        console.info(`===================DirXML Warn Tracing: Level 8:  ${filename} =================`)
        console.info(`1: ${filename} Info: ${mgs}. Level: 8: DirXML Inspector: Trace`)
        console.trace(`5: Trace: ${obj}`)
        console.warn(`5: Trace OB Name: ${obj} : ${Object.getPrototypeOf(obj).constructor.name}`)
        console.dirxml(`8: DirXML: ${obj}`)
        console.dirxml(obj)
        console.info(`===================End: Level 8==============================`)
        debugger;
        break
      case 9:
        console.info(`===================Full Stack Tracing: Level 9:  ${filename} =================`)
        console.info(`1: ${filename} Info: ${mgs}. Level: 9: Error/Full Stack & DomXML`)
        console.trace(`5: ${filename}  Trace: ${obj}`)
        console.dir(`7: ${filename}  Dir: ${obj}`,{colors: true,compact: true, customInspect: true})
        console.dir(obj, {colors: true, compact: false, customInspect: true})
        console.dirxml(`7: ${filename} DirXML: ${obj}`)
        console.dirxml(obj,{colors: true,compact: false, showHidden: true})
        // console.error(`9: ${filename}  Error: ${obj} ${obj.toString}`)
        console.error(`10: ${filename}  Error: ${Object.getPrototypeOf(obj).constructor.name}`)
        console.error(`10: ${filename}  Error: ${Object.getPrototypeOf(obj).constructor.params}`)
        console.info(`===================End: Level 9==============================`)
        debugger;
        break
      default:
        console.clear()
      break
    }

  }
}
 export { GameDebug }