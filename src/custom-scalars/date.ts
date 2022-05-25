import { GraphQLScalarType } from 'graphql'
import { ApolloError } from 'apollo-server-errors'
import validator from 'validator'
import { Kind } from 'graphql/language'

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'An ISO 8601-encoded UTC date string.',
	parseValue: (value: any) => {
		if (validator.isISO8601(value)) {
			return value
		}
		throw new ApolloError('DateTime must be a valid ISO 8601 Date string')
	},
	serialize: (value: any) => {
		if (typeof value !== 'string') {
			value = value.toISOString()
		}

		if (validator.isISO8601(value)) {
			return value
		}
		throw new ApolloError('DateTime must be a valid ISO 8601 Date string')
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10) // ast value is always in string format
		}
		return null
	},
})

export const dateResolver = {
	Date: dateScalar,
}
