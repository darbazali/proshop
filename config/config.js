const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/proshop',
  jwtSecret: process.env.JWT_SECRET || 'my_awsome_secret',
}

export default config
