// // import mongoose, { Document, Model, Schema } from "mongoose";

// // // ==========================================
// // // TYPES
// // // ==========================================

// // export type OrderStatus = "pending" | "approved" | "delivered" | "rejected";

// // export interface IOrder extends Document {
// //   productId: string;

// //   productName: string;

// //   weight: string;

// //   quantity: number;

// //   price: string;

// //   subtotal: number;

// //   deliveryCharge: number;

// //   total: number;

// //   customer: {
// //     name: string;
// //     phone: string;
// //     address: string;
// //     area: string;
// //     city: string;
// //     note: string;
// //   };

// //   status: OrderStatus;

// //   createdAt: Date;

// //   updatedAt: Date;
// // }

// // // ==========================================
// // // SCHEMA
// // // ==========================================

// // const OrderSchema = new Schema<IOrder>(
// //   {
// //     productId: {
// //       type: String,
// //       required: true,
// //       index: true,
// //     },

// //     productName: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     weight: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     quantity: {
// //       type: Number,
// //       required: true,
// //       min: 1,
// //       default: 1,
// //     },

// //     price: {
// //       type: String,
// //       required: true,
// //     },

// //     subtotal: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },

// //     deliveryCharge: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //       default: 0,
// //     },

// //     total: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },

// //     customer: {
// //       name: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //       },

// //       phone: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //       },

// //       address: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //       },

// //       // area: {
// //       //   type: String,
// //       //   default: "",
// //       //   trim: true,
// //       // },

// //       // city: {
// //       //   type: String,
// //       //   trim: true,
// //       // },

// //       note: {
// //         type: String,
// //         default: "",
// //         trim: true,
// //       },
// //     },

// //     status: {
// //       type: String,
// //       enum: ["pending", "approved", "delivered", "rejected"],

// //       default: "pending",

// //       index: true,
// //     },
// //   },

// //   {
// //     timestamps: true,
// //   },
// // );

// // // ==========================================
// // // MODEL
// // // ==========================================

// // const Order: Model<IOrder> =
// //   mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

// // export default Order;
// import mongoose, { Document, Model, Schema } from "mongoose";

// export interface IOrder extends Document {
//   productId: string;
//   productName: string;
//   weight: string;
//   quantity: number;
//   price: string;
//   totalPrice: number;

//   customer: {
//     name: string;
//     phone: string;
//     address: string;
//     note: string;
//   };

//   status: "pending" | "approved" | "delivered" | "rejected";
// }

// const OrderSchema = new Schema<IOrder>(
//   {
//     productId: {
//       type: String,
//       required: true,
//     },

//     productName: {
//       type: String,
//       required: true,
//     },

//     weight: {
//       type: String,
//       required: true,
//     },

//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//       default: 1,
//     },

//     price: {
//       type: String,
//       required: true,
//     },

//     totalPrice: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     customer: {
//       name: {
//         type: String,
//         required: true,
//       },

//       phone: {
//         type: String,
//         required: true,
//       },

//       address: {
//         type: String,
//         required: true,
//       },

//       note: {
//         type: String,
//         default: "",
//       },
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "delivered", "rejected"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const Order: Model<IOrder> =
//   mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

// export default Order;

import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// ==========================================
// ORDER STATUS
// ==========================================

export type OrderStatus =
  | "pending"
  | "approved"
  | "delivered"
  | "rejected";

// ==========================================
// ORDER INTERFACE
// ==========================================

export interface IOrder extends Document {
  productId: string;

  productName: string;

  weight: string;

  quantity: number;

  price: string;

  totalPrice: number;

  customer: {
    name: string;
    phone: string;
    address: string;
    note: string;
  };

  status: OrderStatus;

  createdAt: Date;

  updatedAt: Date;
}

// ==========================================
// SCHEMA
// ==========================================

const OrderSchema = new Schema<IOrder>(
  {
    productId: {
      type: String,
      required: true,
      index: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    price: {
      type: String,
      required: true,
      trim: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      note: {
        type: String,
        default: "",
        trim: true,
      },
    },

    status: {
      type: String,

      enum: [
        "pending",
        "approved",
        "delivered",
        "rejected",
      ],

      default: "pending",

      index: true,
    },
  },

  {
    timestamps: true,
  },
);

// ==========================================
// MODEL
// ==========================================

const Order: Model<IOrder> =
  mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);

export default Order;