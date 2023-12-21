// --------------------- Filtter Check -------------------------------
const {consts} = require('../../config')
const dummyData = consts.dummyDataRecipesOil.results
const sensitivesMap = consts.sensitives
​
class SenstivityUltities {
​
    static filterRecipesBySensitivites(arrSenstivities,recipes){
        return recipes.filter((recipe)=> !this.isContainingSensntivites(arrSenstivities,recipe))
    }
​
    static isContainingSensntivites = (arrSenstivities,recipe) => {
​
        for(let ingredient of recipe.ingredients){
            if(this.isIngredientContainSensntivity(ingredient,arrSenstivities)){
                return true
            }
        }
        return false
    }
​
    static isIngredientContainSensntivity = (ingredient, arrSenstivities) => {
        for(let sesntivity of arrSenstivities){
            if(sensitivesMap[sesntivity].includes(ingredient)){
                return true
            }
        }
        return false
    }
​
}
​
module.exports = SenstivityUltities
class FilterRecipes {
    static filterByIngredient = function(arrSenstivities, ingredient){
        return arrSenstivities.forEach( sesntivity => sesntivity
            .find(ingredientEle => ingredient.toLowerCase().includes(ingredientEle.toLowerCase()))? true : false

    )}
}
const filterByIngredient = function(arr, ingredient){
    return arr.find(ingredientEle => ingredient.toLowerCase().includes(ingredientEle.toLowerCase()))? true : false
}
const filterRecipes = function(recipy, itemToFilterBy){
    return recipy.ingredients.find(ingredient => filterByIngredient(itemToFilterBy, ingredient)) == undefined
}
$(".filterContainer").on("click","#glutenFree",function(){
    glutenFree = $(this)[0].checked 
    renderData()
})
$(".filterContainer").on("click","#dairyFree",function(){
    dairyFree = $(this)[0].checked 
    renderData()
})