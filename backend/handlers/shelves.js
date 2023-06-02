const { pool } = require('../database.js')


async function showShelves(){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/shelves/show'
    const client = await pool.connect()
    try {
        const shelves = await client.query('select "id","name","space","rackId" from shelves')
        console.log(shelves.rows)
        data.message = shelves.rows
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

async function addShelves(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/shelves/add'
    const client = await pool.connect()
    try {
        request = request.body
        const shelves = await client.query(`insert into shelves ("name","space","rackId") values ($1,$2,$3) 
        returning "id","name","space","rackId"`, [request.name, request.space, request.rackId])
        console.log(shelves.rows)
        data.message = shelves.rows
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

async function deleteShelves(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/shelves/delete'
    const client = await pool.connect()
    try {
        request = request.body
        const shelves = await client.query(`delete from shelves where id = ${request.id}`)
        console.log(shelves.rows)
        data.message = shelves.rows
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

async function updateShelves(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/shelves/update'
    const client = await pool.connect()
    try {
        request = request.body
        const shelves = await client.query(`UPDATE shelves SET "name" = '${request.name}', "city" = '${request.space}', "space" = '${request.rackId}' 
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
    showShelves: showShelves,
    addShelves: addShelves,
    deleteShelves: deleteShelves,
    updateShelves: updateShelves
}