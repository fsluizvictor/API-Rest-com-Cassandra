const { v4: uuidv4 } = require('uuid')
const express = require('express')
const cassandra = require('cassandra-driver')
const { json } = require('express')
const routes = express.Router()

//Configuração do Cassandra
const database = {
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'blog'
}

//montando conexão com banco de dados Cassandra
const connection = new cassandra.Client(database)

connection.connect(() => {
    console.log('Connection established...')
})

//GET
routes.get('/posts', ((req, res) => {
    try {

        const getAllPosts = 'SELECT * FROM blog.posts'

        connection.execute(getAllPosts, [], ((err, result) => {
            res.json(result.rows)
        }))

    } catch (error) {
        res.json({
            error
        })
    }
}))

routes.get('/users', ((req, res) => {
    try {

        const getAllSubscribers = 'SELECT * FROM blog.users'

        connection.execute(getAllSubscribers, [], ((err, result) => {
            res.json(result.rows)
        }))

    } catch (error) {
        res.json({
            error
        })
    }
}))

//POST
routes.post('/users', ((req, res) => {
    try {

        const id = uuidv4()

        const {
            email,
            first_name,
            last_name,
            login,
            password,
        } = req.body

        const user = {
            id,
            email,
            first_name,
            last_name,
            login,
            password,
        }

        const query = 'INSERT INTO blog.users (id,email,first_name,last_name,login,password) VALUES(?,?,?,?,?,?)'

        connection.execute(query, [id, email, first_name, last_name, login, password], ((err, result) => {
            res.json({
                user
            })
        }))

    } catch (error) {
        res.json({
            error
        })
    }
}))

routes.post('/posts', () => { })

//PUT
routes.put('/users/:id', ((req, res) => {

    try {

        const id = req.params

        const {
            email,
            first_name,
            last_name,
            login,
            password,
        } = req.body

        const user = {
            id,
            email,
            first_name,
            last_name,
            login,
            password,
        }

        const query = 'UPDATE blog.users SET email=?, first_name=?, last_name=?, login=?, password=? WHERE id=?'

        connection.execute(query, [email, first_name, last_name, login, password, id], ((err, result) => {
            res.json({
                user
            })
        }))

    } catch (error) {
        res.json({
            error
        })
    }

}))

//DELETE
routes.delete('/users/:id', ((req, res) => {
    try {

        const id = req.params

        const query = 'DELETE FROM blog.users WHERE id = ?'

        connection.execute(query, id, ((err, result) => {
            res.json({
                msg: 'success'
            })
        }))

    } catch (error) {
        res.json({
            error
        })
    }
}))




module.exports = routes
