import mongoose from 'mongoose'
import colors from 'colors'
import { config } from 'dotenv'
config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
