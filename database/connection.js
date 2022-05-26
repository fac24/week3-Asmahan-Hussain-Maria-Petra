const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL env var");
}
//console.log('initiate')

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db; // const pg = require("pg");
// if (!DB_URL) {
//   throw new Error("Please set the DATABASE_URL environment variable");
// }

// const options = {
//   connectionString: DB_URL,
// };

// const db = new pg.Pool(options);

// module.exports = { db };
