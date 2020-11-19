import mongoose from 'mongoose'
import config from '../../config/config.js'
const connectDB = async () => {
  mongoose
    .connect(config.mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`MongoDB connected`.cyan.underline)
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`.red.underline.bold)
      process.exit(1)
    })
}

export default connectDB
