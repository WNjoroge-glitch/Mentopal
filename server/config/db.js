const Pool = require('pg').Pool
const pool = new Pool({
  user:"postgres",
  password:"9@ZTgR3s",
  host:"localhost",
  port:5432,
  database:"afritonics"
})

module.exports = pool