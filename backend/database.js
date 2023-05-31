const Pool = require('pg-pool')

const pool = new Pool({
    database: 'warehouse',
    user: 'postgres',
    password: '123456789',
    port: 5432,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
    maxUses: 7500,
})

pool.on('error', (error, client) => {
    console.error(error)
    process.exit(-1)
})
pool.on('connect', client => {
    console.log('New client')
})
pool.on('remove', client => {
    console.log('Client pool removed')
})

module.exports = {
    pool: pool
}