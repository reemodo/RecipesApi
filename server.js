const express = require("express")
const path = require("path")

// Setting up express, serving client files, configuring bodyParser
const port = 4000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '.', 'dist')))
app.use(express.static(path.join(__dirname, '.', 'node_modules')))


// Internal Modules Imports
const api = require('./server/routes/apiRecipes')

// Connecting to "api", i.e our routes
app.use('', api)

// Running the server
app.listen(port, function(){
    console.log(`Node server created at port ${port}`)
})