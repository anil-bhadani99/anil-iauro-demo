import { ErrorConstants } from '../constants/errors.constants';

export async function validateRegister(input: any) {
  let error = {
    status: false,
    error: ""
  };

  if (!input.fullName) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_REQUIRED;
    return error;
  }

  var regName = /^[a-zA-Z ]+$/;
  if (!regName.test(input.fullName)) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_STRING_ONLY;
    return error;
  }

  if (!input.mobileNumber) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_REQUIRED;
    return error;
  }

  regName = /^\d{10}$/;
  if (!regName.test(input.mobileNumber)) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_DIGIT_ONLY;
    return error;
  }

  if (!input.password) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_REQUIRED;
    return error;
  }

  return error;
}

export async function validateCreateAdmin(input: any) {
  let error = {
    status: false,
    error: ""
  };

  if (!input.fullName) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_REQUIRED;
    return error;
  }

  var regName = /^[a-zA-Z ]+$/;
  if (!regName.test(input.fullName)) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_STRING_ONLY;
    return error;
  }

  if (!input.mobileNumber) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_REQUIRED;
    return error;
  }

  regName = /^\d{10}$/;
  if (!regName.test(input.mobileNumber)) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_DIGIT_ONLY;
    return error;
  }

  if (!input.password) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_REQUIRED;
    return error;
  }

  return error;
}

export async function validateLogin(input: any) {
  let error = {
    status: false,
    error: ""
  };

  if (!input.mobileNumber) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_REQUIRED;
    return error;
  }

  let regName = /^\d{10}$/;
  if (!regName.test(input.mobileNumber)) {
    error.status = true;
    error.error = ErrorConstants.MOBILE_NUMBER_DIGIT_ONLY;
    return error;
  }

  if (!input.password) {
    error.status = true;
    error.error = ErrorConstants.FULL_NAME_REQUIRED;
    return error;
  }

  return error;
}

