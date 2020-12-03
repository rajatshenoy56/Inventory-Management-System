const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'inventory',
//   password: 'rajat',
//   port: 5432,
// })
module.exports = {
  async query(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    console.log(res)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  },
}