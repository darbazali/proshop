import mongoose from 'mongoose'
import config from '../../config/config.js'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB connected at ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
    process.exit(1)
  }
}

export default connectDB
