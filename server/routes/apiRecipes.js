const consts = require("../../config")
const express = require("express")
const router = express.Router()
const axios = require("axios")
const CheefGenerator = require("../utlities/cheefGenerator")
const favaritsRecipes = []
let recipesData = []
let cheefData = []

router.get("/:ingredient", function(request, response){
   const ingredient = request.params.ingredient
   axios.get(`${consts.apiRecipesByIngredient}${ingredient}`)
        .then(res => {
            recipesData = res.data.results
            cheefData = CheefGenerator.createRandomUsers(recipesData.length)
            response.send({recipesData,cheefData})
         })
})
router.get("/favaritsRecipes", function(request, response){
    response.send(favaritsRecipes)
})

router.post("/favaritsRecipes",function(request, response){
   const recipyId = request.body.id
   favaritsRecipes.find(rec => rec.id == recipyId) ? response.end():
   axios.get(`${consts.apiRecipeByID}${recipyId}`)
   .then(results => { 
      const recipe = results.data
      favaritsRecipes.push(recipe)
      response.send(favaritsRecipes)})
})

router.delete("/favaritsRecipes/:id",function(request, response){
   const recipyId = request.params.id
   const indexRecipyIdToDelete = favaritsRecipes.findIndex(rec => rec.idMeal === recipyId)
   favaritsRecipes.splice(indexRecipyIdToDelete, 1)
   response.send(favaritsRecipes)
})

module.exports = router