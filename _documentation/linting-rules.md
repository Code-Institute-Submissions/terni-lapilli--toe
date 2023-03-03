# Linting Rules

- To check syntax,
- To find problems, and
- To enforce code style

## Eslint Rules
>
> [Standard / Rules.md](https://github.com/standard/standard/blob/master/RULES.md)
>
> Sorting and Ordering of these done by CJ for learning and refreshing of knowledge. Mistakes likely. JFF (Just for fun)

### Variables

- Prevents accidental use of poorly-named browser globals like open, length, event, and name.
- Avoid comparing a variable to itself.
- Declare browser globals with a /*global*/ comment.
- For var declarations, write each declaration in its own statement.
- Initializing to undefined is not allowed.
- No delete operator on variables.
- No redeclaring variables.
- No Unused Vars

### Assignment

- Assignments in return statements must be surrounded by parentheses.
- Avoid assigning a variable to itself
- Avoid reassigning function declarations.
- No new without assigning object to a variable.
- No reassigning exceptions in catch clauses.
- No reassigning read-only global variables.
- Wrap conditional assignments with additional parentheses. This makes it clear that the expression is intentionally an assignment (=) rather than a typo for equality (===).

### Evaluation

- Always: ===, not ==
- Avoid Yoda conditions.
- Exception: obj == null is allowed to check for null || undefined.
- For the ternary operator in a multi-line setting, place ? and : on their own lines.
- No debugger statements.
- No implied eval().
- No ternary operators when simpler alternatives exist.
- No using eval().
- The left operand of relational operators must not be negated.
- typeof must be compared to a valid string.
- Use break to prevent fallthrough in switch cases.
- Use isNaN() when checking for NaN.

### Syntax

- Avoid using arguments.callee and arguments.caller.
- Avoid using constant expressions in conditions (except loops).
- Avoid using the comma operator.
- For multi line statements, use curly braces
- Keep else statements on same line as curly braces
- No empty destructuring patterns.
- No unnecessary use of escape.
- Exceptions are: window, document, and navigator.

### Statements

- No label statements.
- No using new require.
- No using with statements.
- Use a single import statement per module.

### Conditionals

- No flow control statements in finally blocks.
- No unmodified conditions of loops.
- No unreachable code after return, throw, continue, and break statements.
- Only throw an Error object.

### Naming

- Constructor names must begin with a capital letter.
- No duplicate name in class members.
- No labels that share a name with an in scope variable.
- Renaming import, export, and destructured assignments to the same name is not allowed.
- Restricted names should not be shadowed.
- Use camel case when naming variables and functions.

### Functions

- Always handle the `err` function parameter
- Avoid unnecessary function binding.
- Avoid unnecessary use of .call() and .apply().
- Immediately Invoked Function Expressions (IIFEs) must be wrapped.
- No function declarations in nested blocks.
- No unnecessary parentheses around function expressions.

### Objects

- Avoid modifying variables declared using const.
- Avoid modifying variables of class declarations.
- Avoid using __proto__. Use getPrototypeOf instead.
- Avoid using unnecessary computed property keys on objects.
- Constructor with no arguments must be invoked with parentheses
- Constructors of derived classes must call super.
- No calling global object properties as functions.
- No extending native objects.
- No unnecessary constructor.
- No using __iterator__.
- No using primitive wrapper instances.
- No using the Function constructor.
- No using the Object constructor.
- No using the Symbol constructor.
- Objects must contain a getter when a setter is defined
- super() must be called before using this.

## Primitives

### Strings

- No multiline strings.
- Avoid string concatenation when using __dirname and__filename.

### Literals

- Avoid unnecessary boolean casts.
- No floating decimals.
- No octal escape sequences in string literals.
- No octal literals.
- Regular strings must not contain template literal placeholders.
- Sparse arrays are not allowed.
- Use array literals instead of array constructors.

### RegEx

- No control characters in regular expressions.
- No empty character classes in regular expressions.
- No invalid regular expression strings in RegExp constructors.

### No Duplications

- No duplicate arguments in function definitions.
- No duplicate keys in object literals.
- No duplicate case labels in switch statements.

### Whitespace
>
> *<small>Whitespace, newlines, tabs, spaces, EoL, BoM.</small>*

- Add space between colon and value in key value pairs.
- Add spaces inside single line blocks
- Avoid mixing spaces and tabs for indentation.
- Avoid multiple spaces in regular expression literals.
- Commas should have space after them
- Do not use multiple spaces except for indentation.
- Files must end with a newline.
- Infix operators must be spaced
- Keyword Spacing.
- Maintain consistency of newlines between object properties.
- Multiple blank lines not allowed
- Must have a space before blocks.
- No irregular whitespace.
- No padding within blocks.
- No space between function identifiers and their invocations.
- No spaces inside parentheses.
- No spacing in template strings.
- No whitespace before properties.
- No whitespace between spread operators and their expressions.
- Semicolons must have a space after and no space before.
- Space before Function Parenethsis
- Tabs should not be used
- The *in yield*expressions must have a space before and after.
- Use spaces inside comments.
- Whitespace not allowed at end of line.

### Punctuation, Delimiters

- Commas must be placed at the end of the current line
- Dot should be on the same line as property.
- No unnecessary nested blocks.
- Quotes:
- Trailing commas not allowed.

### Semicolons

- No semicolons. (see: 1, 2, 3)
- Never start a line with (, [, `, or a handful of other unlikely possibilities.
  - This is the only gotcha with omitting semicolons, and standard protects you from this potential issue.
  - (The full list is: [, (, `, +, *, /, -, ,, ., but most of these will never appear at the start of a line in real code.)
