import env from "dotenv";
import mongoose from "mongoose";
env.config();

const connection = {
  isConnected: null,
};

const dbConnect = async () => {
  if (connection?.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default dbConnect;
