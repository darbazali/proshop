const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/proshop',
  jwtSecret: process.env.JWT_SECRET || 'my_aweseom_secret',
}

export default config
