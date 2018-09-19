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

	if (!body.name) return res.send(422, "Name must not be empty.")
	if (!body.message) return res.send(422, "Message must not be empty.")

	body.timestamp = Date.now()
	messages.push(req.body)
	res.send(201, body)

	return next()
})

const port = process.env.PORT || "1337"
server.listen(port, () => {
	console.log('%s listening at %s', server.name, server.url)
})
