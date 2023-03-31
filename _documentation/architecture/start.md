# Class: StartListener

> - File: /lib/__StartListener.js
> - Module: StartListener
> - Export: StartListener
> - Imported By: __App.js
> - Depends: __Game.js
> - Depends: __GameDebug.js

## Design

- [x] All class properties are first class members
- [x]  Some class properties have an initial default value
- [x] Constructor has parameters that are default values
- [x] Constructor has parameters that are optional values
- [x]  Constructor and functions have `log` and `locname` parameters for tracing and logging purpose, which are optional, with default values.
- [x] Constructor and functions params without a optional value are mandatorty.
- [x] All classes have a dependency on GameDebug, which abstracts & wraps the console logging methods to various levels of logging information.
- [x]  Default values ae a defensive design against missing parameters, null conditions and undefined states, which were a debugging issue that led to this design decision.
- [x]  Hard coded values are minimised or moves to optiional parameters, when they repeat themselves more than once.
- [x] Alterrnatively they are extracted from inline referencing and placed in a `const`, a `let` or a `paramValueMap` object, if there is a bilateral choice and a default value.

## Declaration

Class Diagram without logging and tracing

```mermaid
classDiagram
    class StartListener{
        -GameDebug debug
        -Node startbutton
        -Game newGame
        -string eventType
        -string btnID
        -string fileName
        -number logLevel
        -number errorLevel
        +StartListener constructor(game,btnID,evnt)
        +void oninit(game)
        +void isStartClicked()
        +void addListener(element)
        +void onEror(error)
        +void evaluateParameter(param)
        +void evaluateEventType(event,argIndex)
    }
```

### Snapshots v0.4.0

#### Module

![](../code/0.4.0/StartListener/001-startlistener-module.png "StartListener Module Defintion")

#### Class declaration and properties

![](../code/0.4.0/StartListener/002-startlistener-declaration-props.png "StartListener Class Definition")

#### constructor

![](../code/0.4.0/StartListener/003-startlistener-constructor.png)

#### onInit

![](../code/0.4.0/StartListener/004-startlistener-methods-initialiser.png)

#### addListener

![](../code/0.4.0/StartListener/004-startlistener-methods-addListener.png)

#### onError

![](../code/0.4.0/StartListener/004.3-startlistener-methods-onerror.png)

#### evaluateParameter

![](../code/0.4.0/StartListener/004.1-startlistener-methods-evaluateparamter.png)

#### evaluateEventType

![](../code/0.4.0/StartListener/004.5-startlistener-methods-evaluateeventtype.png)
