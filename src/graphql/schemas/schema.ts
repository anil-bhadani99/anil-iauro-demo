import { gql } from 'apollo-server-express'

const userTypes = gql`
  scalar Date

  type Query {
    success: String!
  }
   
  input inputRegister {
    fullName: String! @constraint(maxLength: 100)
    mobileNumber: String! @constraint(maxLength: 12)
    password: String! @constraint(maxLength: 12)
  }

  type messageResponse {
		message: String!
		status: Boolean!
		statusCode: Int!
	}

  type Mutation {
    register(input: inputRegister!):  messageResponse!
  }

  input inputAdmin {
    fullName: String! @constraint(maxLength: 100)
    mobileNumber: String! @constraint(maxLength: 12)
    password: String! @constraint(maxLength: 12)
  }

  type Mutation {
    createAdmin(input: inputAdmin!):  messageResponse!
  }

  input inputLogin {
    mobileNumber: String! @constraint(maxLength: 12)
    password: String! @constraint(maxLength: 12)
  }

  type tokenData{
    token : String
  }

  type messageLoginResponse {
		message: String!
		status: Boolean!
		statusCode: Int!
    data: tokenData
	}

  type Mutation {
    login(input: inputLogin!):  messageLoginResponse!
  }

  type Mutation {
    revokeToken: messageResponse!
  }

  type getUserDetailsResponse{
    id: ID
    fullName: String
    mobileNumber: String
    role: String
  }

  type Query {
    getUserDetails: getUserDetailsResponse!
  }

  input inputAddProduct {
    productName: String! @constraint(maxLength: 100)
    price: Int!
    qty: Int!
  }

  type Mutation {
    addProduct(input: inputAddProduct!):  messageResponse!
  }

  input inputUpdateProduct {
    product_id: ID!
    productName: String! @constraint(maxLength: 100)
    price: Int!
    qty: Int!
  }

  type Mutation {
    updateProduct(input: inputUpdateProduct!):  messageResponse!
  }

  input inputDeleteProduct {
    product_id: ID!
  }

  type Mutation {
    deleteProduct(input: inputDeleteProduct!):  messageResponse!
  }

  input inputUpdateUser {
    userId: ID!
    fullName: String! @constraint(maxLength: 100)
  }

  type Mutation {
    updateUser(input: inputUpdateUser!):  messageResponse!
  }

  input inputDeleteUser {
    userId: ID!
  }

  type Mutation {
    deleteUser(input: inputDeleteUser!):  messageResponse!
  }

  type getProductDetailsResponse{
    id: ID
    fullName: String
    mobileNumber: String
    role: String
  }

  input inputProductDetail {
    productId: ID!
  }

  type Query {
    getProductDetails(input: inputProductDetail!): getProductDetailsResponse!
  }

  
  input InputMetadata{
    search: String
    filter: inputFilterData
    offset: Int
    limit: Int
    total: Int
}

  input inputFilterData{
    isActive: Boolean
  }

type filterData{
    isActive: Boolean
}

type metadataResponse{
    search: String
    filter: filterData
    offset: Int
    limit: Int
    total: Int
}

  input inputListAllProduct{
    metadata: InputMetadata
}

type productData{
  productName: String
  price: Int
  qty: Int
}
type listProductResponse{
    metadata: metadataResponse,
    product: [productData]
}

type listAllProductResponse{
    message: String!
    status: Boolean!
    statusCode: Int!
    data: listProductResponse
}

type Query {
    listAllProduct(input: inputListAllProduct): listAllProductResponse!
}


`

export default userTypes