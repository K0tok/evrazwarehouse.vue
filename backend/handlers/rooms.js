const { pool } = require('../database.js')


async function showRooms(){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/rooms/show'
    const client = await pool.connect()
    try {
        const rooms = await client.query('select "id","name","space","warehouseId" from rooms')
        console.log(rooms.rows)
        data.message = rooms.rows
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()')
    }
    return data
}

async function addRooms(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/rooms/add'
    const client = await pool.connect()
    try {
        request = request.body
        const rooms = await client.query(`insert into rooms ("name","space","warehouseId") values ($1,$2,$3) 
        returning "id","name","space","warehouseId"`, [request.name, request.space, request.warehouseId])
        console.log(rooms.rows)
        data.message = rooms.rows
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()')
    }
    return data
}

async function deleteRooms(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/rooms/delete'
    const client = await pool.connect()
    try {
        request = request.body
        const rooms = await client.query(`delete from rooms where id = ${request.id}`)
        console.log(rooms.rows)
        data.message = rooms.rows
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()')
    }
    return data
}

async function updateRooms(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/rooms/update'
    const client = await pool.connect()
    try {
        request = request.body
        const rooms = await client.query(`UPDATE rooms SET "name" = '${request.name}', "city" = '${request.space}', "space" = '${request.warehouseId}' 
        WHERE "id" = ${request.id}`)
        data.message = { id: request.id, name: request.name, city: request.city, space: request.space }
        // console.log(data.message)
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.release()
        console.log(urlName, 'client release()')
    }
    return data
}

module.exports = {
    showRooms: showRooms,
    addRooms: addRooms,
    deleteRooms: deleteRooms,
    updateRooms: updateRooms
}