import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Database connected to  ", instance.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default dbConnect;
