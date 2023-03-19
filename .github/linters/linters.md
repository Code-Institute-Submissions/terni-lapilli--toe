# Linters

> Using [Github Super Linters](https://github.com/marketplace/actions/super-linter)

```yaml
---
#################################
#################################
## Super Linter GitHub Actions ##
#################################
#################################
name: Lint Code Base

#############################
# Start the job on all push #
#############################
on:
    push:
        branches-ignore: [master, main]
        # Remove the line above to run when pushing to master
    pull_request:
        branches: [master, main]

###############
# Set the Job #
###############
jobs:
    build:
        # Name the Job
        name: Lint Code Base
        # Set the agent to run on
        runs-on: ubuntu-latest

        ##################
        # Load all steps #
        ##################
        steps:
            ##########################
            # Checkout the code base #
            ##########################
            - name: Checkout Code
              uses: actions/checkout@v3
              with:
                  # Full git history is needed to get a proper
                  # list of changed files within `super-linter`
                  fetch-depth: 0

            ################################
            # Run Linter against code base #
            ################################
            - name: Lint Code Base
              uses: github/super-linter:slim-v4
              env:
                  VALIDATE_ALL_CODEBASE: false
                  DEFAULT_BRANCH: master
                  GITHUB_DOMAIN: github.com
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
                  CREATE_LOG_FILE: true
                  DEFAULT_BRANCH: main
                  DEFAULT_WORKSPACE: /tmp/lint
                  DISABLE_ERRORS: false
                  IGNORE_GITIGNORED_FILES: true
                  #JAVASCRIPT_DEFAULT_STYLE: standard
                  JAVASCRIPT_DEFAULT_STYLE: prettier
                  LINTERS_RULES_PATH: .github/linters
                  LOG_FILE: .github/linters/super-linter.log
                  LOG_LEVEL: verbose
                  MARKDOWN_CONFIG_FILE: .markdown-lint.yml
                  MULTI_STATUS: true
                  #PYTHON_FLAKE8_CONFIG_FILE: .flake8
                  #PYTHON_ISORT_CONFIG_FILE: .isort.cfg
                  #PYTHON_MYPY_CONFIG_FILE: .mypy.cfg
                  #PYTHON_PYLINT_CONFIG_FILE: .python-lint
                  #EDITORCONFIG_FILE_NAME: .ecrc
                  #CSS_FILE_NAME: .stylelintrc.json
                  #JAVASCRIPT_ES_CONFIG_FILE: .eslintrc.json
                  VALIDATE_EDITORCONFIG: false
                  VALIDATE_HTML: false
                  VALIDATE_CSS: true
                  VALIDATE_MARKDOWN: false
                  VALIDATE_PYTHON_BLACK: false
                  VALIDATE_PYTHON_FLAKE8: false
                  VALIDATE_PYTHON_ISORT: false
                  VALIDATE_PYTHON_MYPY: false
                  VALIDATE_PYTHON_PYLINT: false
                  VALIDATE_JAVASCRIPT_ES: true
                  VALIDATE_JAVASCRIPT_STANDARD: true
                  #YAML_CONFIG_FILE: .yaml-lint.yml
                  YAML_ERROR_ON_WARNING: false

```

## Work Flow

> Using Pull Request and Action to Check the code quality of the project files.