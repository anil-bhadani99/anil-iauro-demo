const User = require('../models/users');
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config/config';
export class MongoHelper {
  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose
      .connect(Config.mongoUrl)
      .then(() => {
        console.log('Connected to MongoDb');
      })
      .catch((err: Error) => {
        console.log("DB connection error >>>", err.message)
        throw `There is error in connecting Mongo DB ${err.message}`;
      });
  }
}
