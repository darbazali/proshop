const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'my_jwt_secret',
  mongoUri: process.MONGO_URI || 'mongodb://localhost:27017/proshop',
}

export default config
