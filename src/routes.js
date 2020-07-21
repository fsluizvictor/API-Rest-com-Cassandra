const express = require('express')
const cassandra = require('cassandra-driver')
const routes = express.Router()

//Configuração do Cassandra
const database = {
    contactPoints: ['127.0.0.1'],
    keyspace: 'blog'
}

//montando conexão com banco de dados Cassandra
const connection = new cassandra.Client(database)

connection.connect(() => {
    console.log('Connection established...')
})



