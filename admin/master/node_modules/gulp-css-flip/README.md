# gulp-css-flip [![Build Status](https://travis-ci.org/itaymesh/gulp-css-flip.png)](https://travis-ci.org/itaymesh/gulp-css-flip)


A CSS BiDi flipper gulpjs plugin based on css-flip package

## Installation

```sh
npm install gulp-css-flip
```

## Example use

```js
var flip = require('gulp-css-flip');
var css = 'div { float: left; }';

flip(css);
// => 'div { float: right; }'
```

As a [Rework](https://github.com/reworkcss/rework) plugin:

```js
var flip = require('gulp-css-flip');
var rework = require('rework');
var css = 'div { float: left; }';

rework(css).use(flip.rework()).toString();
// => 'div { float: right; }'
```

## Supported CSS Properties (a-z)

`background-position`,
`background-position-x`,
`border-bottom-left-radius`,
`border-bottom-right-radius`,
`border-color`,
`border-left`,
`border-left-color`,
`border-left-style`,
`border-left-width`,
`border-radius`,
`border-right`,
`border-right-color`,
`border-right-style`,
`border-right-width`,
`border-style`,
`border-top-left-radius`,
`border-top-right-radius`,
`border-width`,
`box-shadow`,
`clear`,
`direction`,
`float`,
`left`,
`margin`,
`margin-left`,
`margin-right`,
`padding`,
`padding-left`,
`padding-right`,
`right`,
`text-align`

## Processing directives

gulp-css-flip provides a way to ignore declarations or rules that should not be
flipped.

### @noflip

Prevent a single declaration from being flipped.

Source:

```css
p {
  /*@noflip*/ float: left;
  clear: left;
}
```

Yields:

```css
p {
  /*@noflip*/ float: left;
  clear: right;
}
```

Prevent all declarations in a rule from being flipped.

Source:

```css
/*@noflip*/
p {
  float: left;
  clear: left;
}
```

Yields:

```css
/*@noflip*/
p {
  float: left;
  clear: left;
}
```

## CLI

The CLI can be used globally or locally in a package.

View available options:

```
gulp-css-flip --help
```

Example use:

```sh
gulp-css-flip path/to/file.css > path/to/file.rtl.css
```

## Development

Run the lint and unit tests:

```
npm test
```

Just the JSHint tests:

```
npm run lint
```

Just the Mocha unit tests:

```
npm run unit
```

Run Mocha unit tests in "watch" mode:

```
npm run watch
```

## License and Acknowledgements

Copyright 2014 Twitter, Inc. and other contributors.

Licensed under the MIT License

gulp-css-flip is based on [css-filp](https://github.com/twitter/css-flip).
