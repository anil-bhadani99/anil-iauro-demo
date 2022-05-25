const jwt = require('jsonwebtoken')
import { Context } from '../models/context';
import { ErrorConstants } from '../constants/errors.constants';
import { SuccessConstants } from '../constants/success.constants';
import { Users } from '../models/users'
import { Config } from '../config/config';
import { resSuccess, resError } from '../helpers/response';
import { validateRegister, validateCreateAdmin, validateLogin } from '../validator/users.validator';

const Cryptr = require('cryptr');
const cryptr = new Cryptr(Config.AUTH_ENCRYPTION_SALT);

export class UsersController {

  async register(__: any, inputObject: any, ctx: Context) {
    const valid = await validateRegister(inputObject.input);

    if (valid.status) return resError(valid.error, 409);

    let userData;
    try {
      userData = await Users.findOne({ mobileNumber: inputObject.input.mobileNumber })
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (userData) {
      return resError(ErrorConstants.MOBILE_NUMBER_EXIST, 409);
    } else {
      inputObject.input.password = cryptr.encrypt(inputObject.input.password)
      inputObject.input.role = "user"
      let newUser;
      try {
        newUser = await Users.create(inputObject.input);
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }

      if (!newUser) return resError(ErrorConstants.USER_NOT_CREATED, 409);

      return resSuccess(SuccessConstants.USER_CREATED, 200, {})
    }
  }

  async createAdmin(__: any, inputObject: any, ctx: Context) {
    const valid = await validateCreateAdmin(inputObject.input);

    if (valid.status) return resError(valid.error, 409);

    let userData;
    try {
      userData = await Users.findOne({ mobileNumber: inputObject.input.mobileNumber, role: "admin" })
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (userData) {
      return resError(ErrorConstants.ONLY_ONE_ADMIN_CAN_EXIST, 409);
    } else {
      inputObject.input.password = cryptr.encrypt(inputObject.input.password)
      inputObject.input.role = "admin"
      let newUser;
      try {
        newUser = await Users.create(inputObject.input);
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }

      if (!newUser) return resError(ErrorConstants.ADMIN_NOT_CREATED, 409);

      return resSuccess(SuccessConstants.ADMIN_CREATED, 200, {})
    }
  }

  async login(__: any, inputObject: any, ctx: Context) {
    const valid = await validateLogin(inputObject.input);
    if (valid.status) return resError(valid.error, 409);

    let userData;
    try {
      userData = await Users.findOne({ mobileNumber: inputObject.input.mobileNumber })

      if (userData) {
        const decryptedPassword = cryptr.decrypt(userData?.password);
        if (inputObject.input.password !== decryptedPassword) {
          return resError(ErrorConstants.PASSWORD_WRONG, 409)
        }
      }
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!userData) {
      return resError(ErrorConstants.MOBILE_NUMBER_NOT_EXIST, 409)
    } else if (userData.isDeleted) {
      return resError(ErrorConstants.PROFILE_DELETED_BY_YOU, 409);
    } else if (userData.isBlocked) {
      return resError(ErrorConstants.ACCOUNT_BLOCK_BY_ADMIN, 409);
    }

    const encryption = {
      _id: userData._id,
      mobileNumber: userData.mobileNumber,
      role: userData.role
    }

    let token;
    try {
      token = await jwt.sign({ user: encryption }, Config.SECRET_FOR_JWT, { expiresIn: '1d' });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }


    userData.token = token
    userData.lastLogin = new Date(Date.now())

    try {
      await userData.save();
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    return resSuccess(SuccessConstants.SUCCESS, 200, { token })
  }

  async revokeToken(__: any, inputObject: any, ctx: any) {
    let userData;

    try {
      userData = await Users.findOne({ _id: ctx.user._id });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!userData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    } else {
      userData.token = ""
      try {
        await userData.save();
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }
      return resSuccess(SuccessConstants.USER_LOG_OUT, 200, {})
    }
  }

  async getUserDetails(__: any, inputObject: any, ctx: any) {
    let userData;
    try {
      userData = await Users.findOne({ _id: ctx.user._id });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }
    if (!userData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    }

    let temp = { id: '' }
    Object.values(userData).map((d, i) => {
      if (i == 2) {
        temp = d;
        temp.id = d._id
      }
    })

    return resSuccess(SuccessConstants.SUCCESS, 200, temp)

  }

  async updateUser(__: any, inputObject: any, ctx: any) {
    let userData;

    try {
      userData = await Users.findOne({ _id: inputObject.input.userId });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!userData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    } else {
      userData.fullName = inputObject.input.fullName;
      try {
        await userData.save();
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }
      return resSuccess(SuccessConstants.USER_UPDATED, 200, {})
    }
  }

  async deleteUser(__: any, inputObject: any, ctx: any) {
    let userData;

    try {
      userData = await Users.findOne({ _id: inputObject.input.userId });
    } catch (err: any) {
      console.log("err : ", err)
      return resError(err.message, 500);
    }

    if (!userData) {
      return resError(ErrorConstants.INVALID_USER_ID, 409);
    } else {
      userData.isDeleted = true;
      userData.token = "";
      try {
        await userData.save();
      } catch (err: any) {
        console.log("err : ", err)
        return resError(err.message, 500);
      }
      return resSuccess(SuccessConstants.USER_DELETED, 200, {})
    }
  }
}
