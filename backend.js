const restify = require('restify')

const server = restify.createServer()

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const messages = []

server.get('/', (req, res) => {
	return res.send(200, messages)
})

server.post('/message', (req, res, next) => {
	const body = req.body
	body.timestamp = Date.now()
	messages.push(req.body)
	res.send(201, body)
	return next()
})

const port = process.env.PORT || "0.0.0.0"
server.listen(port, () => {
	console.log('%s listening at %s', server.name, server.url)
})
