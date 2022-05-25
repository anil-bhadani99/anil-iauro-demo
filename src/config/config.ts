require('dotenv').config()

export abstract class Config {
  public static mongoUrl = "mongodb://localhost:27017/iauro"

  public static PORT = process.env.PORT || 3000
  public static NODE_ENV = process.env.NODE_ENV || "dev"
  public static AUTH_ENCRYPTION_SALT = process.env.AUTH_ENCRYPTION_SALT
  public static SECRET_FOR_JWT = process.env.SECRET_FOR_JWT
}