import { Context } from '../../models/context';
import { UsersController } from '../../controllers/users.controller';
import { ProductsController } from '../../controllers/products.controller';
import { customScalarResolvers } from '../../custom-scalars/index'


const usersController = new UsersController();
const productsController = new ProductsController();

const resolvers = {
  Query: {
    success: () => {
      return "Success"
    },
    getUserDetails: (__: any, inputObject: any, ctx: Context) => {
      return usersController.getUserDetails(__, inputObject, ctx);
    },
    getProductDetails: (__: any, inputObject: any, ctx: Context) => {
      return productsController.getProductDetails(__, inputObject, ctx);
    },
    listAllProduct: (__: any, inputObject: any, ctx: Context) => {
      return productsController.listAllProduct(__, inputObject, ctx);
    },
  },
  Mutation: {
    register: (__: any, inputObject: any, ctx: Context) => {
      return usersController.register(__, inputObject, ctx);
    },
    createAdmin: (__: any, inputObject: any, ctx: Context) => {
      return usersController.createAdmin(__, inputObject, ctx);
    },
    login: (__: any, inputObject: any, ctx: Context) => {
      return usersController.login(__, inputObject, ctx);
    },
    revokeToken: (__: any, inputObject: any, ctx: Context) => {
      return usersController.revokeToken(__, inputObject, ctx);
    },
    updateUser: (__: any, inputObject: any, ctx: Context) => {
      return usersController.updateUser(__, inputObject, ctx);
    },
    deleteUser: (__: any, inputObject: any, ctx: Context) => {
      return usersController.deleteUser(__, inputObject, ctx);
    },
    addProduct: (__: any, inputObject: any, ctx: Context) => {
      return productsController.addProduct(__, inputObject, ctx);
    },
    updateProduct: (__: any, inputObject: any, ctx: Context) => {
      return productsController.updateProduct(__, inputObject, ctx);
    },
    deleteProduct: (__: any, inputObject: any, ctx: Context) => {
      return productsController.deleteProduct(__, inputObject, ctx);
    },


  },
  Date: customScalarResolvers
};

export default resolvers;
