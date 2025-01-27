import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from "mongoose"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
};
export default dbConnect;
