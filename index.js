const Tail = require('tail').Tail
const path = require('path')
const fs = require('fs')

module.exports = (app) => {
	var ctx = {
		events: {},
		lastEvent: ''
	}
	app({
		file: (filePath) => {
			filePath = path.resolve(filePath)
			if (!fs.existsSync(filePath)) {
				return app({
					file: () => { return null },
					on: () => { return null },
					error: (func) => {
						if (func && typeof func == 'function') {
							return func(`File not found: ${filePath}`, ctx)
						}
						return false
					}
				})
			}
			ctx.tail = new Tail(filePath)
		},
		on: (events, func) => {
			if (func && typeof func == 'function') {
				if (Array.isArray(events)) {
					for (let event of events) {
						ctx.events[event] = func
					}
				} else {
					ctx.events[events] = func
				}
			}
			return null
		},
		error: (func) => {
			if (func && typeof func == 'function') {
				ctx.error = func
			}
			return null
		}
	})
	if (ctx.tail) {
		ctx.tail.on('line', (eventName) => {
			var event = ctx.events[eventName]
			ctx.event = eventName.toString()
			if (event) {
				return event(ctx)
			}
			ctx.lastEvent = eventName.toString()
		})
		if (ctx.error) {
			ctx.tail.on('error', (error) => {
				return ctx.error(error, ctx)
			})
		}
	} else {
		if (ctx.error) {
			return ctx.error('Falid load app.file(...)', ctx)
		}
	}
}
