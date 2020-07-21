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



routes.get('/', ((req, res) => {
    const getAllSubscribers = 'SELECT * FROM blog.subscribers'

    connection.execute(getAllSubscribers, [], ((err, result) => {
        if (err) {
            res.status(404).send({
                msg: err
            })
        } else {
            res.json(result.rows)
        }
    }))
}))

// routes.get('/posts', ((req, res) => {

//     const data = {
//         "error": 1,
//         "Posts": ""
//     }

//     const select = 'SELECT * from posts'

//     connection.execute(select, ((err, rows) => {
//         if (rows.length != 0) {
//             data["error"] = 0;
//             data["Books"] = rows;
//             res.json(data);
//         } else {
//             data["Books"] = 'No books Found..';
//             res.json(data);
//         }
//     }))
// }))


module.exports = routes
