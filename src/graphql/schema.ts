import { makeExecutableSchema } from 'graphql-tools';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive'
import { applyMiddleware } from 'graphql-middleware'
import rootDefs from './schemas/schema';
import resolvers from './resolvers/resolvers';
import Permissions from '../middlewares/permissions'

const schema = constraintDirective()(
  makeExecutableSchema({
    typeDefs: [rootDefs, constraintDirectiveTypeDefs],
    resolvers,
  })
)

export const schemaWithMiddleware = applyMiddleware(schema, Permissions)
