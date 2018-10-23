# Polybar-Helpers

Polybar - Helpers to create plugin/module using NodeJS

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install polybar-helpers --save
```

## Usage

Conifg in polybar

```
; My Module
[module/test]
type = custom/script
exec = node App.js
click-left = echo left >> $HOME/.config/polybar/events
click-middle = echo middle >> $HOME/.config/polybar/events
click-right = echo right >> $HOME/.config/polybar/events
scroll-up = echo scrollUp >> $HOME/.config/polybar/events
scroll-down = echo scrollDown >> $HOME/.config/polybar/events
tail = true
```

App.js

```js
const polybarHelpers = require('polybar-helpers')

polybarHelpers(
	(app) => {
		app.file('/home/tiago/.config/polybar/events')
		app.on(['left', 'right'], (ctx) => {
			console.log(ctx)
		})
		app.on('middle', (ctx) => {
			console.log(ctx)
			console.log(ctx.lastEvent) //return last event, e.g: left
		})
		app.on(['scrollUp', 'scrollDown'], (ctx) => {
			console.log(ctx)
			console.log(ctx.event) //return current event, e.g: scrollUp or scrollDown
		})
		app.error((msg, ctx) => {
			console.error(msg, ctx)
		})
	}
)
```

## Dependencies

- [tail](https://ghub.io/tail): tail a file in node

## License

MIT
