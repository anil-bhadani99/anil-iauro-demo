import dotenv from 'dotenv'
import { Config } from './config/config';
dotenv.config()

// Load Path Alias For Transpiled Code [Sync]
import path from 'path'
if (path.extname(__filename) === '.js') {
	require('module-alias/register')
}

import app from './core/app'
import initApolloServer from './core/apollo'
(async () => {
	const port = Config.PORT
	const server = await initApolloServer()

	await server.start()

	server.applyMiddleware({ app, cors: true, path: '/user', })

	await new Promise<void>((resolve) => app.listen({ port }, resolve))
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})().catch((error) => {
	console.log('Failed to start server', error)
})
