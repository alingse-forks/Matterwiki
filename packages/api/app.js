const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const { Model } = require('objection')

const initDbConnection = require('./utils/initDbConnection')
const appRouter = require('./router')
const errorHandler = require('./middleware/errorHandler')

// Setup DB connection and objection ORM
const knex = initDbConnection()
Model.knex(knex)

const app = express()

app.use(helmet())
app.use(compression())

app.use(appRouter)

// Global error handling
// TODO https://www.joyent.com/node-js/production/design/errors
app.use(errorHandler)

module.exports = app
