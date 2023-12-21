const apiRecipesByIngredient = "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"
const apiRecipeByID = "https://recipes-goodness-elevation.herokuapp.com/recipes/id/"
const sensitivity = {
    dairyIngredients : ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"],
    glutenIngredients : ["Flour","Bread","spaghetti","Biscuits","Beer"]}


module.exports = {apiRecipesByIngredient, apiRecipeByID, sensitivity}