import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: string;
  weight: string;

  image: {
    url: string;
    publicId: string;
    alt: string;
  };

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      alt: {
        type: String,
        default: "",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>(
    "Product",
    ProductSchema,
  );

export default Product;