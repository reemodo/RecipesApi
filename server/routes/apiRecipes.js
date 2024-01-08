const {consts} = require("../../config")
const express = require("express")
const router = express.Router()
const axios = require("axios")
const CheefGenerator = require("../utlities/cheefGenerator")
const FilterRecipes = require("../utlities/filterRecipes")
const GyphyGenerator = require("../utlities/GyphyGenerator")
let favaritsRecipes = []
let recipesData = []
let cheefData = []
let isDiarySenitivity = false
let isGlutenSenitivity  = false
let isExuldedIngredient = false



// Get : Favarits Recipes  
router.get("/favaritsRecipes", function(request, response){
   response.status(202).send({recipesData:favaritsRecipes, cheefData})
})

// Post : Favairt Recipe to Favarits Lists
router.post("/favaritsRecipes",function(request, response){
   const recipyId = request.body.id
   try {
      if (favaritsRecipes.find(rec => rec.id == recipyId)){
         response.status(202).end()
      } 
      favaritsRecipes.push(recipesData.find(rec => rec.idMeal == recipyId))
      response.status(202).send({recipesData:favaritsRecipes, cheefData})
   } catch (error) {
      response.status(404).send(`Faild to add Recipie with ID : ${recipyId} in Favarits List`)
   }
})

// Delete :  Favairt Recipe of Favarits Lists By Id
router.delete("/favaritsRecipes/:id",function(request, response){
   const recipyId = request.params.id
   const indexRecipyIdToDelete = favaritsRecipes.findIndex(rec => rec.idMeal === recipyId)
   try {
      favaritsRecipes.splice(indexRecipyIdToDelete, 1)
      response.status(202).send({recipesData:favaritsRecipes,cheefData})
   } catch (error) {
      response.status(404).send(`Theres is no Recipie in Favarits List with this ID : ${recipyId}`)
   }
   
})

// Get : Recipes By Ingredient
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
            isDiarySenitivity == "true" ? sensitivityArray.push(consts.sensitivity.dairyIngredients) : null
            isGlutenSenitivity == "true" ? sensitivityArray.push(consts.sensitivity.glutenIngredients):null
            isExuldedIngredient != "" ? sensitivityArray.push ([isExuldedIngredient]) :null
            recipesData = FilterRecipes.filterRecipesBySensitivites(sensitivityArray, recipesData)
         })
         .then(()=>{
            Promise.all( [GyphyGenerator.gypyGenerator(recipesData) ])          
                  .then(() =>{
                      response.status(202).send({recipesData:recipesData, cheefData})
                     })
          })
         .catch(error => 
            console.log(error))
})



module.exports = router