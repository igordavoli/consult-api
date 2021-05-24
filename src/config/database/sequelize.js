const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const databaseName = {
  test: process.env.DB_TEST_NAME,
  development: process.env.DB_DEV_NAME,
  production: process.env.DB_NAME,
}
//databaseName[process.env.NODE_ENV]
// const options = process.env.NODE_ENV === 'production'

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  define: {
    underscored: true
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};