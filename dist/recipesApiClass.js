class RecipesApi {
    constructor(favarite){
        this.recipesList = []
        this.favarite =favarite
       
    }
    fetchDataFromApi(arr, data){
        data.forEach(recipe => {
            const newRecipe = new Recipy()
            newRecipe.id = recipe.idMeal
            newRecipe.title = recipe.title
            newRecipe.category = recipe.strCategory
            newRecipe.region = recipe.strArea
            newRecipe.ingredients = recipe.ingredients
            newRecipe.imgUrl = recipe.thumbnail
            newRecipe.videoUrl = recipe.href
            newRecipe.favarite = this.favarite || false
            arr.push(newRecipe)
        });
    }
}

class Favarits  extends RecipesApi {
    constructor(){
        super(true)
        this.favarits=[]
        
    }
    
}
