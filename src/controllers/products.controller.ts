import { Context } from '../models/context';
import { ErrorConstants } from '../constants/errors.constants';
import { SuccessConstants } from '../constants/success.constants';
import { Products } from '../models/product'
import { resSuccess, resError } from '../helpers/response';
import { searchHelper, facetHelper } from '../helpers/aggregateHelper';

export class ProductsController {

  async addProduct(__: any, inputObject: any, ctx: Context) {
    let productData;
    try {
      productData = await Products.findOne({ productName: inputObject.input.productName })
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (productData) {
      return resError(ErrorConstants.PRODUCT_EXIST, 409);
    } else {
      let newProduct;
      try {
        newProduct = await Products.create(inputObject.input);
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }

      if (!newProduct) return resError(ErrorConstants.PRODUCT_NOT_CREATED, 409);

      return resSuccess(SuccessConstants.PRODUCT_CREATED, 200, {})
    }
  }

  async getProductDetails(__: any, inputObject: any, ctx: any) {
    let productData;
    try {
      productData = await Products.findOne({ _id: inputObject.input.productId });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }
    if (!productData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    }

    let temp = { id: '' }
    Object.values(productData).map((d, i) => {
      if (i == 2) {
        temp = d;
        temp.id = d._id
      }
    })

    return resSuccess(SuccessConstants.SUCCESS, 200, temp)

  }

  async updateProduct(__: any, inputObject: any, ctx: any) {
    let productData;

    try {
      productData = await Products.findOne({ _id: inputObject.input.productId });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!productData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    } else {
      productData.productName = inputObject.input.productName;
      productData.isActive = inputObject.input.isActive;
      try {
        await productData.save();
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }
      return resSuccess(SuccessConstants.USER_UPDATED, 200, {})
    }
  }

  async deleteProduct(__: any, inputObject: any, ctx: any) {
    let productData;

    try {
      productData = await Products.findOne({ _id: inputObject.input.productId });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!productData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    } else {
      productData.isDeleted = true;
      try {
        await productData.save();
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }
      return resSuccess(SuccessConstants.USER_DELETED, 200, {})
    }
  }

  async listAllProduct(__: any, inputObject: any, ctx: any) {
    try {
      let productList;
      try {
        const aggregateQuery = []

        if (inputObject.input.metadata.filter.isActive) {
          aggregateQuery.push({ $match: { isActive: inputObject.input.metadata.filter.isActive } })
        }

        var searchFiled = inputObject.input.metadata.search || false
        if (searchFiled) {
          aggregateQuery.push(searchHelper(searchFiled, ['productName']))
        }

        aggregateQuery.push(facetHelper(inputObject.input.metadata.offset, inputObject.input.metadata.limit))

        productList = await Products.aggregate(aggregateQuery);

      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }

      const response = {
        metadata: {
          search: inputObject.input.metadata.search,
          filter: inputObject.input.metadata.filter,
          offset: inputObject.input.metadata.offset || 0,
          limit: inputObject.input.metadata.limit || 10,
          total: (productList[0] && productList[0].totalRecords[0]) ? productList[0].totalRecords[0].count : 0
        },
        product: productList[0] ? productList[0].list : []
      }

      return resSuccess(SuccessConstants.SUCCESS, 200, response)
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }
  }
}
