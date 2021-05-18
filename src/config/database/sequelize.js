const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../../.env') });
// const db = {
//   test: 'db_test',
//   production: ,
//   development: 'postgres',
// }

// const options = {
//   production: { ssl: { require: true, rejectUnauthorized: false } },
//   test: {},
//   development: {},
// }


module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
};