import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
