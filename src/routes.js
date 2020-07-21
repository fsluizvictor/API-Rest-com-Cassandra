const express = require('express')
const cassandra = require('cassandra-driver')
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

routes.get('/subscribers', ((req, res) => {
    try {
        const getAllSubscribers = 'SELECT * FROM blog.subscribers'

        connection.execute(getAllSubscribers, [], ((err, result) => {
            res.json(result.rows)
        }))
    } catch (error) {
        res.json({
            error
        })
    }
}))

// routes.get('/', ((req, res) => {
//     const getAllSubscribers = 'SELECT * FROM blog.posts'

//     connection.execute(getAllSubscribers, [], ((err, result) => {
//         if (err) {
//             res.status(404).send({
//                 msg: err
//             })
//         } else {
//             res.json(result.rows)
//         }
//     }))
// }))

module.exports = routes
