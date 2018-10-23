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
