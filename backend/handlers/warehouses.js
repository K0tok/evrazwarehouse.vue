const { pool } = require('../database.js')


async function showWarehouses(){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/warehouses/show'
    const client = await pool.connect()
    try {
        const warehouses = await client.query('select "id","name","city","space" from warehouses')
        console.log(warehouses.rows)
        data.message = warehouses.rows
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

async function addWarehouses(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/warehouses/add'
    const client = await pool.connect()
    try {
        request = request.body
        const warehouses = await client.query(`insert into warehouses ("name","city","space") values ($1,$2,$3) 
        returning "id","name","city","space"`, [request.name, request.city, request.space])
        console.log(warehouses.rows)
        data.message = warehouses.rows
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

async function deleteWarehouses(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/warehouses/delete'
    const client = await pool.connect()
    try {
        request = request.body
        const warehouses = await client.query(`delete from warehouses where id = ${request.id}`)
        console.log(warehouses.rows)
        data.message = warehouses.rows
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

async function updateWarehouses(request){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/warehouses/update'
    const client = await pool.connect()
    try {
        request = request.body
        const warehouses = await client.query(`UPDATE warehouses SET "name" = '${request.name}', "city" = '${request.city}', "space" = '${request.space}' 
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
    showWarehouses: showWarehouses,
    addWarehouses: addWarehouses,
    deleteWarehouses: deleteWarehouses,
    updateWarehouses: updateWarehouses
}