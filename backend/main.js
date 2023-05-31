const { pool } = require('./database.js')

const warehouses = require('./handlers/warehouses.js')
const rooms = require('./handlers/rooms.js')
const racks = require('./handlers/racks.js')
const shelves = require('./handlers/shelves.js')
const items = require('./handlers/items.js')

const fastify = require('fastify')({
    logger: true 
})

fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            origin: true
        };

        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        callback(null, corsOptions)
    }
})

// Запросы к складам
fastify.get('/warehouses/show', async function (request, reply) {
    const data = await warehouses.showWarehouses()
    reply.send(data)
})
fastify.post('/warehouses/add', async function (request, reply) {
    const data = await warehouses.addWarehouses(request)
    reply.send(data)
})
fastify.post('/warehouses/delete', async function (request, reply) {
    const data = await warehouses.deleteWarehouses(request)
    reply.send(data)
})
fastify.post('/warehouses/update', async function (request, reply) {
    const data = await warehouses.updateWarehouses(request)
    reply.send(data)
})

// Запросы к помещениям
fastify.get('/rooms/show', async function (request, reply) {
    const data = await rooms.showRooms()
    reply.send(data)
})
fastify.post('/rooms/add', async function (request, reply) {
    const data = await rooms.addRooms(request)
    reply.send(data)
})
fastify.post('/rooms/delete', async function (request, reply) {
    const data = await rooms.deleteRooms(request)
    reply.send(data)
})
fastify.post('/rooms/update', async function (request, reply) {
    const data = await rooms.updateRooms(request)
    reply.send(data)
})

// Запросы к стеллажам
fastify.get('/racks/show', async function (request, reply) {
    const data = await racks.showRacks()
    reply.send(data)
})
fastify.post('/racks/add', async function (request, reply) {
    const data = await racks.addRacks(request)
    reply.send(data)
})
fastify.post('/racks/delete', async function (request, reply) {
    const data = await racks.deleteRacks(request)
    reply.send(data)
})
fastify.post('/racks/update', async function (request, reply) {
    const data = await racks.updateRacks(request)
    reply.send(data)
})

// Запросы к полкам
fastify.get('/shelves/show', async function (request, reply) {
    const data = await shelves.showShelves()
    reply.send(data)
})
fastify.post('/shelves/add', async function (request, reply) {
    const data = await shelves.addShelves(request)
    reply.send(data)
})
fastify.post('/shelves/delete', async function (request, reply) {
    const data = await shelves.deleteShelves(request)
    reply.send(data)
})
fastify.post('/shelves/update', async function (request, reply) {
    const data = await shelves.updateShelves(request)
    reply.send(data)
})

// Запросы к предметам
fastify.get('/items/show', async function (request, reply) {
    const data = await items.showItems()
    reply.send(data)
})
fastify.post('/items/add', async function (request, reply) {
    const data = await items.addItems(request)
    reply.send(data)
})
fastify.post('/items/delete', async function (request, reply) {
    const data = await items.deleteItems(request)
    reply.send(data)
})
fastify.post('/items/update', async function (request, reply) {
    const data = await items.updateItems(request)
    reply.send(data)
})



// Запускаем сервер на порту 3000
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})