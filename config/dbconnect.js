
import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    console.log(process.env.MONGODB_URI)
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error)
    return
  }
}

export default connectDb