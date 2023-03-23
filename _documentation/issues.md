# IssueLogs

> This is a project log for the major / significant issues. Summaries and links from README will point to here.

## Notable Issues

1. Log as a GitHUb Issue from IDE
   - [ ] Use CodeStream to select text from the IDE
   - [ ] CodeStream will capture text, open a dialog to enter the issue details
   - [ ] Log it as a GitHub Issue
2. Enter in the expanding issue / problem statement below fir
   - [ ] Rubber Ducking
   - [ ] Visual Flow Diagraming
   - [ ] Troubleshooting
3. Document tha possible decisions, options and if known consequences of the choice
    - Use a v light ADR format
4. Document the new design in mermaid and text2diagram format

## Issue Logging 2023-03-23 GitHub Issue[# ,](  "")

### Check List

- [ ] Use CodeStream to select text from the IDE
- [ ] CodeStream will capture text, open a dialog to enter the issue details
- [ ] Log it as a GitHub Issue
- [ ] Record Issue Id
- [ ] Outline the Issue either in mermaid, or diagrams or both.
  - [ ] State the as-is: what is the current ball of code
  - [ ] State the to-be: the new ball of code, refactored and or tested
  - [ ] Have you rubber ducked it
  - [ ] Have you pusedo coded it
  - [ ] Have you a visual flow[chart] of the issue, i.e. code flow
  - [ ] Have you any other issues, errors, debugging efforts
- [ ] Has a light light weight of ADR
  - 1. Headline as a Summary
  - 2. Choices
  - 3. Consequeneces
  - 4. Decision

---

## Issue Logging 2023-03-23 GitHub Issue[#3: \[Refactor\] App.js & Custom EventListener](https://github.com/iPoetDev/terni-lapilli--toe/issues/3#issue-1636376340 "#3: [Refactor] App.js & Custom EventListener")

[CodeStream](https://api.codestream.com/c/ZBNk4xDOQ2o6RTpe/T_-H4myPT22eWpkrUC2rlA)

### Issue: [Refactor] App.js. Game.js & Custom EventListener: Start Button not firing

### Github Issue [#3]( ""), [#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4#issue-1636381685 ""), & [#5]( "")

- Root Cause: Start Button does not fire when presses.
- Concern: App is a ball of mud/code in terms of code flows/links.
- Concern: Too many instances of game, DX is v poor, as confused
- Task: Refactor App.js & Custom Event handling, ( StartListener.js ) and Game.js's constructors and other initialisers
- Linked to: [#3]( ""), [#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4#issue-1636381685 ""), & [#5]( ""),

### Steps Taken

- [x] Document the Classes in the [_documentation/architecture] folder for App, Game and StartListener
- [x] Document the Classes code flow
- [x] Idenitify the classes and where they fit in the flow, and bugs if thet do !!!
- [x] Update the decision.md log

### ADR # .1

- **ADR #**: <ins>Redesign App, StartListener as a Custom EventListener, & Game [Part 1: App.js, Issue 3](https://github.com/iPoetDev/terni-lapilli--toe/issues/3#issue-1636376340)
- *ADR: Choices*: 1) Stay as is 2) Remodel & Refactor 3) Use a different design patten
- *ADR: Consequences*
  - 1) Current Code could me made to work if it copies this MoveListener and bind()
  - 2) Remodel and Refactor, following the mermaid diagrams above, reduce the complexity of the code base, have a cleaner maintainability, use less objects in memory, and be easier to test.
  - 3) Observer Pattern: Option 2 tightlight couples the implmentation of the custom Event Listener to the game class and the app class to the startListener. High coupling and low cohesion is a code smell.
    - Research suggests that the `Observer` pattern is a good fit to reduce coupling, it helps with modularity and extensibility (which is why i chose classes and modules as a design principle), and ease of maintainability (a stated developer goal).
    - However the app is not the intended target, or subject, for the observer functionality.
- ***ADR: Decision***
  - For v0.3.0 of App and its functions, I will opt for Option 2, Remodel and Refactor

### ADR # .2

- **ADR #**: <ins>Redesign App, StartListener as a Custom EventListener, & Game [Part 2: StartListener.js, Issue 4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4#issue-1636381685)
- *ADR: Choices*: 1) Stay as is 2) Remodel & Refactor 3) Use a different design patten
- *ADR: Consequences*
  - 1) Current Code could me made to work if it copies this MoveListener and bind()
  - 2) Remodel and Refactor, following the mermaid diagrams above, reduce the complexity of the code base, have a cleaner maintainability, use less objects in memory, and be easier to test.
  - 3) Observer Pattern: Option 2 tightlight couples the implmentation of the custom Event Listener to the game class and the app class to the startListener. High coupling and low cohesion is a code smell.
    - Research suggests that the `Observer` pattern is a good fit to reduce coupling, it helps with modularity and extensibility (which is why i chose classes and modules as a design principle), and ease of maintainability (a stated developer goal).

- ***ADR: Decision***
  - For v0.3.0 of StartListener and its functions, I will opt for Option 2, Remodel and Refactor to get ths bind() functiong and starting the newGame to initialise and run.
  - This would be an MVP level DoD.

### ADR # .3

- **ADR #**: <ins>Redesign App, StartListener as a Custom EventListener, & Game [Part 3: Game.js, Issue 5](https://github.com/iPoetDev/terni-lapilli--toe/issues/5#issue-1637492083)
- *ADR: Choices*: 1) Stay as is 2) Remodel & Refactor 3) Use a different design pattern 4)
- *ADR: Consequences*
  - 1) *Current Code* could me made to work if it copies this MoveListener and bind()
  - 2) *Remodel and Refactor*, following the mermaid diagrams above, reduce the complexity of the code base, have a cleaner maintainability, use less objects in memory, and be easier to test.
  - 3) *Observer Pattern*: Option 2 tightlight couples the implmentation of the custom Event Listener to the game class and the app class to the startListener. High coupling and low cohesion is a code smell.
    - Research suggests that the `Observer` pattern is a good fit to reduce coupling, it helps with modularity and extensibility (which is why i chose classes and modules as a design principle), and ease of maintainability (a stated developer goal).

- ***ADR: Decision***
  - For v0.3.0 of Game and its functions, I will opt for Option 2, Remodel and Refactor, however, if time permits, I will also try to implement the Observer Pattern to see how it works out. as a future enhancement.
  - Now I just need to get the start button to work.

---
