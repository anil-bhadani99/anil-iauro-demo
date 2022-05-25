import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((__: any, ___: any, { user }) => {
	return user ? true : false
})

const isAdminAuthenticated = rule()((__: any, ___: any, { user }) => {
	return user.role === "admin" ? true : false
})

const isUserAuthenticated = rule()((__: any, ___: any, { user }) => {
	return user.role === "user" ? true : false
})

export default shield({
	Query: {
		getUserDetails: isAdminAuthenticated,
		listAllProduct: isAuthenticated
	},
	Mutation: {
		revokeToken: isAuthenticated,
	},
})
