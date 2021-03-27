const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'some_aw3om_secret',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/proshop',
}

export default config
