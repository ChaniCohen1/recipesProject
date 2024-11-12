import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";

const connect = async () => {
  try {
    console.log(MONGO_URI);
    
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connect successfuly!!");
  } catch (error) {
    throw new Error("Error in connecting to mongoDB" + error);
  }
};

export default connect;