class RecipesApi {
    constructor(favarite){
        this.recipesList = []
        this.favarite =favarite
    }
    fetchDataFromApi( arr, data){
        data.recipesData.forEach( (recipe,index) => {
            const newRecipe = new Recipe()
            newRecipe.id = recipe.idMeal
            newRecipe.title = recipe.title
            newRecipe.category = recipe.strCategory
            newRecipe.region = recipe.strArea
            newRecipe.ingredients = recipe.ingredients
            newRecipe.imgUrl = recipe.thumbnail
            newRecipe.videoUrl = recipe.href
            newRecipe.favarite = this.favarite || false;
            newRecipe.rate = Math.floor(Math.random() * 5) + 1
            newRecipe.cheef = data.cheefData[index].fullName
            arr.push(newRecipe)
        });
    }
    addRandomCheef (recipe, fullName ){
        recipe.cheef =  new Cheef(fullName);
    }
}

