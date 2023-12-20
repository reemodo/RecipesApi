const express = require("express")
const axios = require("axios")
const path = require("path")
const favaritsRecipes = []


//creating App and lunching method
const port = 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '.', 'dist')))
app.use(express.static(path.join(__dirname, '.', 'node_modules')))
app.listen(port, function(){
    console.log(`Node server created at port ${port}`)
})


app.get("/:ingredient", function(request, response){
    const ingredient = request.params.ingredient
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`)
        .then(res => { response.send(res.data.results)})
})
app.get("/favaritsRecipes", function(request, response){
     response.send(favaritsRecipes)
    })
app.post("/favaritsRecipes",function(request, response){
    const recipyId = request.body.id
    favaritsRecipes.find(rec => rec.id == recipyId) ? response.end():
    axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/id/${recipyId}`)
    .then(res => { 
        favaritsRecipes.push(res.data)
        response.send(favaritsRecipes)})
})

app.delete("/favaritsRecipes/:id",function(request, response){
    const recipyId = request.params.id
    const indexRecipyIdToDelete = favaritsRecipes.findIndex(rec => rec.idMeal === recipyId)
    favaritsRecipes.splice(indexRecipyIdToDelete, 1)
    response.send(favaritsRecipes)
})