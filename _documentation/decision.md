# ADLog: Architectural Decision Logs as a Project Decision Journal

All notable architectural and design decisions (i.e. the why behind the what and how), as aligned to the assessment criteria and to a personal decision to track the evolution of this project will be documented in this file. Inspired by the Changelog Format.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and may align with to [Semantic Versioning](http://semver.org/).

> This is a subset of the changelog format, as per changelog.md. Summary are added to the changelog as well per entry

## ADlog: 2023.03.11 v.0.1.002.002

### Added

- Added: ADLog, (Alias:  DecisionLog), for tracking key developer choices, architectural and design decisions

### Required / Used

- Use: HTML, CSS and Javascript as chosen Languages/Technologies
- Use a Cloud Platform to deploy a front-end web application
  - Use: Github Pages for hosting web application.
  - Use: Github for remote code repository.
  - Use: Git for source code management.
- Use a Single HTML Page for web application.
- Use a JavaScript Linter for validating and verifying JavaScript syntax correctness and without issues
- Use a HTML validator, W3C Validator, for validating and verifying HTML syntax correctness and without issues
- Use a CSS validator,  for validating and verifying JavaScript syntax correctness and without issues
- Use Semantic HTML
- Use Markdown for a Readme format
- Use Readme to document the project and web application development
- Use external Javascript at bottom of HTML Page
- Use external CSS in header of HTML page.
- Use folders for organisaing of external CSS files
- Use folders for organisaing of external Javascript files

### User Decisions

- Decided

| ADR# | Name | Date | Summary | Choice | Options | Consequences | Author  | Why | 10 | 11 | 12 |
| :- | :- | :- | :- | :- | :------ | :- | :- | :- | :- | :- | :- |
| 001 | Style of Javascript | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 002 | Functional or OOP | Mar 8th| Choose the style of programming | OOP  | - Functional: Declarative Programming is on trend apporach <br> - OOP/Imperative is useful for extensible code bases. | 7 | @iPoetDev |  Was trainned in OOP/Imperitative Coding (2002-04) | 10 | 11 | 12 |
| 003 | Monofile or Modular | Mar 9th | Choose a file & code organisation | 5 | 6 | - Improve Readability <br> - Improve Maintenance <br> - Improve Extensibility | @iPoetDev | 9 | 10 | 11 | 12 |
| 004 | Use Imports & Exports | Mar 9th | Modularisation using Imports | Use ES6 Imports | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 005 | Use Default Statement: Classes | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 006 | Use Single Constructors: Classes | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 007 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 008 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 009 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 010 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 011 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 012 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 013 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |
| 014 | 2 | 3 | 4 | 5 | 6 | 7 | @iPoetDev | 9 | 10 | 11 | 12 |

> Adjust ADR sequences later, as a post fix issue

### ADR 2023/03/23 ADR00x

- ***Headline*:  Refactor App.js, Startlistener.js, and Game.js**
- *Issue*: Game not starting
- *Bug*: Game object is orphaned in the code base
- *Decision*: Refactor and Remodel
- *Initiative*: Document the Class diagrams, and code flows, as triage, for App [#3](https://github.com/iPoetDev/terni-lapilli--toe/issues/3), for Game [#5](https://github.com/iPoetDev/terni-lapilli--toe/issues/5) and especially for StartListener [#4](https://github.com/iPoetDev/terni-lapilli--toe/issues/4)
- See [Issues.md](_documentation/issues.md) for further details
