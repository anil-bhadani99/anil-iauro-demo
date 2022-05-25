import { Schema, model, Model, Document } from 'mongoose'

const { ObjectId } = Schema.Types

export interface ProductDoc extends Document {
  id: typeof ObjectId
  ownerId: typeof ObjectId
  productName: String
  price: Number,
  qty: Number,
  isActive: Boolean,
  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date,
}

// Static Methods
interface ProductModel extends Model<ProductDoc> {
  build(attrs: any): ProductDoc
}

const productSchema = new Schema<ProductDoc>(
  {
    ownerId: { type: ObjectId, ref: 'user' },
    productName: { type: String },
    price: { type: Number },
    qty: { type: Number },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    autoIndex: true,
    versionKey: false,
    timestamps: true,
  }
)

export const Products = model<ProductDoc, ProductModel>('Product', productSchema)

productSchema.statics.build = async (attrs: any) => {
  const product = new Products(attrs)
  await product.save()
  return product
}
