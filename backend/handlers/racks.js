const { pool } = require('../database.js')


async function showRacks(){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/racks/show'
    const client = await pool.connect()
    try {
        const racks = await client.query('select "id","name","space","roomId" from racks')
        console.log(racks.rows)
        data.message = racks.rows
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

async function addRacks(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/racks/add'
    const client = await pool.connect()
    try {
        request = request.body
        const racks = await client.query(`insert into racks ("name","space","roomId") values ($1,$2,$3) 
        returning "id","name","space","roomId"`, [request.name, request.space, request.roomId])
        console.log(racks.rows)
        data.message = racks.rows
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

async function deleteRacks(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/racks/delete'
    const client = await pool.connect()
    try {
        request = request.body
        const racks = await client.query(`delete from racks where id = ${request.id}`)
        console.log(racks.rows)
        data.message = racks.rows
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

async function updateRacks(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/racks/update'
    const client = await pool.connect()
    try {
        request = request.body
        const racks = await client.query(`UPDATE racks SET "name" = '${request.name}', "city" = '${request.space}', "space" = '${request.roomId}' 
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
    showRacks: showRacks,
    addRacks: addRacks,
    deleteRacks: deleteRacks,
    updateRacks: updateRacks
}