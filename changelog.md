# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and adheres to [Semantic Versioning](http://semver.org/).

> - Modified, by incrementing and counting the index of commits on a daily basis
> - (Major.Minor.Patch.CommitIndex) (By CJ)
> - Header Formatting & Intents as below

> ## Changelog: v.major.minor.patch.commitindex 20yy.mm.dd
>
> ### `Added`  for new features
>
> ### `Changed` | Updated: for changes in existing functionality
>
> ### `Deprecated`: for soon-to-be removed features
>
> ### `Removed`:  for now removed features, files, folders
>
> ### `Fixed`: for any bug fixes
>
> ### `ToDo`: Project Outstanding items of note
>
> ### `Noted`: Project Logging, Journalling. Comments

---

# Changelog: Project Terni-Lapilli--Toe

> **Template**
>
## Changelog: 2023.03.01 v.0.0.04.001

### Added

### Changed

### Removed

### Fixed

### ToDo

### Noted

---

# Changelog: Project Terni-Lapilli--Toe

## Changelog: 2023.03.08 v.0.0.05.001

### Added

- Added: Outline of Game Design and Logic [001]
- Added: State Diagram & Transitions Flows for Game Flow [001]
- Added: Mermaid Text to Diagram Code [001]

## Changelog: 2023.03.01 v.0.0.04.001

### Added

- Author's credit to HTML for Gameboard UI: [https://codepen.io/shammadahmed](https://codepen.io/shammadahmed) @ [CodePen: CodePen Home
Tic-Tac-Toe game layout with CSS Grid Layout](https://codepen.io/shammadahmed/pen/JOWEGW) [001]

### Changed

- Changed: Adapted the source gameboard UI with enhancements (i.e. data-* attributes) for ease of state change and interactivity coding. [001]
- Updated: Class names and used a class delimiter syntax from CUBE.fyi ( `[` ... `] | [` ... `]` ) [001]

---

## Changelog: 2023.03.03 v.0.0.02.001-003

### Added: [001-002]

- Added: Outline and categorised linting rules as employed by [StandardJS.com](https://standardjs.com/), [Github: https://github.com/standard/standard](https://github.com/standard/standard) using opinionated though standard [Eslint rules](https://eslint.org/docs/latest/rules/) [001]
- Added Core.css for Styling
  - Applied [CUBE.fyi](https://cube.fyi/) via CSS Layers (currently non valid CSS by Jigsaw, but modern browser supported, though is Recommended Candidate in 2022). [002]
- Added Index.html for Game Pad 'canvas' for Tic Tac Toe [002]
  - Source: Hammad Ahmed (CodePen) "Tic Tac Toe game layout" with CSS Grid Layout. Last Accessed: 2023-03-03: [https://codepen.io/shammadahmed/pen/JOWEGW](https://codepen.io/shammadahmed/pen/JOWEGW) and modified by author.
  - Applied CUBE delimiters `[`, `]`, `|`, inside class="", which are ignored by Web Engine parser, but act as delimiters for improved readablity
    - 1st `[  ]` = Compose | Block
    - 2nd+  `[  ]` = Utilities
    - Last  `[  ]` = Exceptions | State change
- Added data-* attributes for anticipated Javascript reference, manipulation of state, value and coordinates of data/content.
- Added Core.css and adapted above source css:
      - Added Custom Properties for Javascript manipulation or variables and media/container queries. [002]
      - Updated to logical properties [002]
      - Applied Andy Bell's Relative Rounded Corners and created Util Classes [002]
      - Added Minmax for Grid items dimensions for control over Grid sizing on small screens [002]

### Updated

- Updated: Readme - Reliability > Testing & Vertification > Validation > JS [Donelog Item: 2.1](_documentation/done.md#2.1)

### Noted

- Decided on using StandardJS.com as JS Linter, over JSLint and ESLint, though ESLint is employed by Standard.[002]
- Validated HTML and have 0 Errors. [003] [2.2](_documentation/done.md#2.2)
- Validated CSS and have 7 Errors for @layers. This is CSS is supported by all modern browsers, and is a Recommended Candidate for Cascade. [003] [2.3](_documentation/done.md#2.3)

---

## Changelog: v.0.0.01.001 2023.03.01

### Added: 001

- Added: New Changelog.md template: For tracking human parsing of project changes [001]
- Added: New Donelog.md template: For tracking MVP and DoD of Assessment Criteria. [001]
- Added: GitHub Pages for Project: URI: <https://ipoetdev.github.io/terni-lapilli--toe/>

### Changed: 001

- Updated: Donelog content: Initial Focus on Pass Criteria DoD checklist.[001]
