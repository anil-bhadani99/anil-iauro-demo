import { ApolloServer } from 'apollo-server-express'
import { schemaWithMiddleware } from '../graphql/schema'
import { Config } from '../config/config';
import { authorize } from '../helpers/authorizer'


export default async function () {
	return new ApolloServer({
		schema: schemaWithMiddleware,
		introspection: Config.NODE_ENV !== 'production',
		context: async ({ req }: any) => {
			if (req.headers.authorization) {
				const user = await authorize(req)
				return { user }
			}
			return { req }
		},
	})
}
