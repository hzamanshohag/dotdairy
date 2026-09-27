// import mongoose from "mongoose";
// import { seedAdmin } from "./seed-admin";


// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in .env.local");
// }

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     await seedAdmin();
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     throw error;
//   }
// };
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongoose = globalThis as unknown as {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const cached = globalForMongoose.mongoose || {
  conn: null,
  promise: null,
};

globalForMongoose.mongoose = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}