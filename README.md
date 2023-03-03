# **3 Grains & Toe**

Three Grains and Toe is a

[![](_documentation/Screenshots/___"AmiResponsive: <https://ui.dev/amiresponsive?url=>")](https://ui.dev/amiresponsive?url=/ "Visit the Proof of Responsiveness: 3 Grains &amp; Toe")

> Visit: [3 Grains & Toe](https://ipoetdev.github.io/terni-lapilli--toe/ "3 Grains &amp; Toe: <https://ipoetdev.github.io/terni-lapilli--toe/> by Charles J Fowler (@ipoetdev)") | [https://ipoetdev.github.io/terni-lapilli--toe/](https://ipoetdev.github.io/terni-lapilli--toe/)

## **1. Project Goals**

### <ins>Developer Goals</ins>
<!--

-->

### <ins>User | Audience Goals</ins>

## **2. Plan**

### <ins>User Experience</ins>

### <ins>Audience(s)</ins>

### <ins>Requirements</ins>

### *<ins>Roadmap</ins>*

## **3. Design (UXD)**

### <ins>Information Architecture & Hierarchy</ins>

### <ins>Colour</ins>

##### *<ins>Colour Palette<ins></ins>*

##### *<ins>Colour Contrast<ins>*

#### *<ins>Future Enhancements</ins>*

### <ins>Accessibility</ins>

### *<ins>Graphics</ins>*

#### <ins>Navigation</ins>

#### _Site Intents_

#### _Page Intents_

#### *<ins>Future Enhancements</ins>*

## **4. BUILD**

### **<ins>Environment</ins>**

<!-- > Did not use Gitpod, too high a friction and high context switching costs. -->

***Local***

- VSCode Insiders - Local
- LivePreview
- LiveServer: <http://127.0.0.1>

***Remote***

- Gitpod
- Github Pages from Github.com

### **<ins>Browsers</ins>**

- Google Chrome (Dev) versions 112
- Google Chrome versions 110
- Firefox Developer Edition versions 111.0 beta
- Polypane 13.0.3

### Browser Extensions

> <sub>[*] DevTools extensions</sub>

- Webhint

### Languages

- HTML5
- CSS3
- Javascript (ES5, Core)

### IDE

> Extensions: A brief summary of a few key ones.

- HTML Language Server (VSCode)
- CSS Language Server (VSCode)
- HTML Validate (html-validate.vscode-html-validate, 2020-2023), version 7.13.2
- ESLint
- Standard
- PostCSS Language Support (CSStools.postCSS), version 1.0.9
- PostCSS Intellisense and Highlighting (vunguyentuan.vscode-postCSS), version 2.0.2
- PostCSS Sorting(mrmlnc.vscode-postCSS-sorting, 2016-2017 (_Last commit: 5 years ago_)), version 3.0.1.

### Repository

<!-- Packages used for developer quality of life and delivery purposes -->

- Javascript (Node, pnpm and npmregistry packages).
- YAML (configuration files for NPM packages)
- C/make for .gitignore and similar ignore files

#### _NPM Plugins_

<!-- These were used during the build but removed prior to submission -->

- Prettier
- Editorconfig
- HTML-validate
- Stylelint
- ESLint
- Standard - [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
- PostCSS

### Frameworks Used

> Programs, Packages and Libraries used in different workflows, and where code was generated and then adapted for use in the html or the CSS as a component.

- [Font Squirrels Web Font Generator](https://www.fontsquirrel.com/tools/webfont-generator "Font Squirrel: A free font collection for web safe fonts, within in reason, and request to ask for respect to each font's license"). FAQ: <https://www.fontsquirrel.com/faq>

#### Readme Tooling

- [Mermaid Live Editor](https://mermaid.live/) for Sitemap and Page hierarchy.

#### Design Workflows

- [Balsmiq Desktop](https://balsamiq.com/)

<br>

## CODE

### Features

## RELIABILITY

## Testing & Verification

### Verification

### Validation

#### _HTML_

|     Page     |  Checked   | Issues           . | Resolved | Passed |
| :----------: | :--------: | :----------------: | :------: | :----: |
|  Home.html   | March 28th |         -          |    -     |   -    |
|  Folio.html  | March 28th |         -          |    -     |   -    |
| Profile.html | March 28th |        - -         |    -     |        |

#### _CSS_

| Page | Checked | Issues           . | Resolved | Passed | Impact | CanIUse |
| :--: | :-----: | :----------------: | :------: | :----: | ------ | ------- |
| Page | Checked | Issues           . | Resolved | Passed | Impact | CanIUse |

#### _JS_

> *<small>DoD 2.1</small>*

- EsLint
- StandardJS, using EsLint rules, as packaged.
- EsLint-config-standard
- EsLint Plugin * dependencies

Steps

- Why Run ESlint: To check syntax, find problems, and enforce code style.
- Type of Modules: Javascript modules (import/export)
- Which framework? None of React or Vue, Core JS only.
- Use typescript? No
- Code runs in? Browser
  -Define a style(guide)
- Use a popular style guide: [Standard: https://github.com/standard/standard](https://github.com/standard/standard)
- File format in: YAML
- Dependencies:
  - eslint-config-standard@latest
  - eslint@^8.0.1
  - eslint-plugin-import@^2.25.2
  - eslint-plugin-n@^2.25.2
  - eslint-plugin-promise@^6.0.0

Using [StandardJs Rule's](https://standardjs.com/) set [Linting Rules](_documentation/linting-rules.md "StandardJS Linting Rules presented/organisted by @iPoetDev"), this project is continually validates syntax, style checks and find problems using this JavaScript linter.

- This linter packages and constrains the multitude if EsLint rules i.e. > 200.
- Bike-shedding is done by StandardJS authors so others don't have to.
- Alternatives style guides are, when running `npx eslint --lint`:
  - AirBnB
  - Google

#### _Lighthouse_

**Conditions**

|     Page     |   Mode   | Device  | Performance | Accessibility | Best Practices | SEO |
| :----------: | :------: | :-----: | :---------: | :-----------: | :------------: | :-: |
|  Home.html   | Snapshot | Desktop |     / 4     |     / 13      |      / 4       | / 7 |
|  Folio.html  | Snapshot | Desktop |             |      /14      |       /4       | /7  |
| Profile.html | Snapshot | Desktop |     / 4     |     / 14      |      / 4       | / 7 |

# DEPLOY

## Features

### Log & Title Bar

### Grid-like Layouts for Content

### Future Enhancements

#### Definition of Done Requirements to be Delivered

See the [Definition of Done-log](_documentation/done.md)

#### *<ins>Code Refactoring</ins>*

## Deployment

- Github & GitHub User Account.
- VSCode with Gitlens.
- Github Pages with a domain of Github.io.

### Repository Service

- Github.com is the remote code repository service being used.
- User account and profile is
  >
  > - `@iPoetDev`
  >
- The repository name is
  >
  > - `terni-lapiil--toei`
  >
- The repository domain URI is
  >
  > - `https://github.com/iPoetDev/terni-lapilli--toe`

### Local Git Service / IDE

- VSCode configured with Github account for Local development environment.
- VSCode extension: Gitlens installed and enabled for local development and deployment.
- Utilized a Changelog format to document the changes, a la, [Keep a Changelog](http://keepachangelog.com/).
  - Intent here was to catalogue in longer more human readable format a more contextual change history. Greater than the 50 chars of a commit 1st line.
  - Additionally, utilized the changelog as a summation effort to shorted and be precise on the commit description.
- Most adhered to [Semantic Versioning](http://semver.org/) approach.
  - Minor adjustment was to put a double digit index for each separate commit if several occurred on one day.

### Deployment Environment

- Github Pages via the inbuilt Github Actions workflows of:
  1. Deploy a static web page off every commit.
  2. Once the commit is built, then deploy the new website and pushes to hosted domain URI.
- Github.io is the hosted domain URI and service.
- The final URI is
  > `https://github.com/iPoetDev/the-folio`

## LAUNCH

### Author Note

### Live Site

In deploying to Github;s website hosting service, GitHub pages, the website was created. The steps to deploy are as follows:

- Login to Github and search for the Github repository 'the-folio' by `@iPoetDev`
- Click on the `Settings` cog icon at the top of the repository.
- Click on `Pages` on the left hand side navigation menu.
- Select `Deploy` from a branch' under `Source` if this is not already selected.
- Under the `Branch` drop down menus, select 'main' and 'root'
- Click `Save`
- Once the page refreshes, the live link should appear underneath the 'Github Pages' title.

The latest version, and prior versions, of the site can be found under the `Actions` tab and in the latest version of the workflow `pages build and deployment` as well as above.

Live link is: [https://ipoetdev.github.io/the-folio/](https://ipoetdev.github.io/the-folio/)

## Assessment

### Credits

#### Design

#### Color

#### Fonts

#### Frameworks/Tooling

## Acknowledgements

### Guides

### Video

- Feross Aboukhadijeh (2018 Feb, 09): "Write Perfect Code With Standard And ESLint - JSConf.Asia 2018". Last Accessed: [https://www.youtube.com/watch?v=kuHfMw8j4xk](https://www.youtube.com/watch?v=kuHfMw8j4xk)
