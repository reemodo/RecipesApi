const {consts} = require("../../config")
const express = require("express")
const router = express.Router()
const axios = require("axios")
const CheefGenerator = require("../utlities/cheefGenerator")
const FilterRecipes = require("../utlities/filterRecipes")
let favaritsRecipes = []
let recipesData = []
let cheefData = []
let isDiarySenitivity = false
let isGlutenSenitivity  = false
let isExuldedIngredient = false

router.get("/favaritsRecipes", function(request, response){
   response.send({recipesData:favaritsRecipes, cheefData})
})
router.post("/favaritsRecipes",function(request, response){
   const recipyId = request.body.id
   favaritsRecipes.find(rec => rec.id == recipyId) ? response.end():
   axios.get(`${consts.apiRecipeByID}${recipyId}`)
   .then(results => { 
      const recipe = results.data
      favaritsRecipes.push(recipe)
      response.send({recipesData:favaritsRecipes,cheefData})})
})

router.delete("/favaritsRecipes/:id",function(request, response){
   const recipyId = request.params.id
   const indexRecipyIdToDelete = favaritsRecipes.findIndex(rec => rec.idMeal === recipyId)
   favaritsRecipes.splice(indexRecipyIdToDelete, 1)
   response.send({recipesData:favaritsRecipes,cheefData})
})

router.get("/:ingredient/", function(request, response){
   const ingredient = request.params.ingredient
   isDiarySenitivity = request.query.isDiary
   isGlutenSenitivity  = request.query.isGluten
   isExuldedIngredient = request.query.isExuldedIngredient
   axios.get(`${consts.apiRecipesByIngredient}${ingredient}`)
        .then(res => {
            recipesData = res.data.results
            cheefData = CheefGenerator.createRandomUsers(recipesData.length)
            let sensitivityArray = []
            isDiarySenitivity == "true" ? sensitivityArray.push(consts.sensitivity.dairyIngredients) : console.log(false)
            isGlutenSenitivity == "true" ? sensitivityArray.push(consts.sensitivity.glutenIngredients):console.log(false)
            isExuldedIngredient != "" ? sensitivityArray.push ([isExuldedIngredient]) :console.log(false)
            recipesData = FilterRecipes.filterRecipesBySensitivites(sensitivityArray, recipesData)
            response.send({recipesData:recipesData, cheefData})
         })
})


module.exports = router