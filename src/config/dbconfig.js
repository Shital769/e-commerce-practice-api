import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_CLIENT) {
      return console.log(
        "Make sure envirnmant variable MONGO_CLIENT has a MongoDB connection link."
      );
    }
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(process.env.MONGO_CLIENT);
    connection?.connections && console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
