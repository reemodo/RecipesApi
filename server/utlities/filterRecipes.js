// --------------------- Filtter Check -------------------------------
const consts = require('../../config')
const dummyData = consts.dummyData
const sensitivesMap = consts.sensitivity

class FilterRecipes {
    static isContainingSensntivites = function (arrSenstivities, ingredients) {
        let arr =  ingredients.find(ingredient => 
            arrSenstivities.find(sesntivity => 
                sesntivity.find(ingredientEle => ingredient.toLowerCase().includes(ingredientEle.toLowerCase())) != undefined
        ) != undefined)
        return arr
    }
    static filterRecipesBySensitivites(arrSenstivities, recipes) {
        return recipes.filter((recipe) => !this.isContainingSensntivites(arrSenstivities, recipe.ingredients))
    }

}

module.exports =  FilterRecipes




