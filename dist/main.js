

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]

const pageRenderer = new Render()
const recipesApi = new RecipesApi()
const Favaritsrecipes= new Favarits()
let favartPage =false
let glutenFree = false
let dairyFree = false
let excludedIngredient = []

// --------------------- Serach Button -------------------------------
const serchRecipes = function(){
    const ingredient = $("#wantedItemText").val()
    excludedIngredient = [$("#exludedItem").val()]
    if (!ingredient.match(/^[a-z]+$/i) || ingredient == '') {
        // throw error
    }
    favartPage =false
    recipesApi.recipesList = []
    $.get(`/${ingredient}`, function (storeData) {
        recipesApi.fetchDataFromApi( recipesApi.recipesList,storeData)
    }).then( (data) => {     
        renderData()
        
})
    
}
$(".headContainer").on("click","#searchButton",function(){
    serchRecipes()
})

// --------------------- Filtter Check -------------------------------
const filterByIngredient = function(arr, ingredient){
    return arr.find(ingredientEle => ingredient.toLowerCase().includes(ingredientEle.toLowerCase()))? true : false
}
const filterRecipes = function(recipesArr, itemToFilterBy){
    return recipesArr.filter( recipy => recipy.ingredients.find(ingredient => filterByIngredient(itemToFilterBy, ingredient)) == undefined)
}
$(".filterContainer").on("click","#glutenFree",function(){
    glutenFree = $(this)[0].checked 
    renderData()
})
$(".filterContainer").on("click","#dairyFree",function(){
    dairyFree = $(this)[0].checked 
    renderData()
})

// --------------------Reder Data --------------------------------------
const renderData = function(){
    let recipesArr =  (favartPage)? Favaritsrecipes.favarits : recipesApi.recipesList
     if(glutenFree)
         recipesArr = filterRecipes(recipesArr, glutenIngredients)
     if(dairyFree)
         recipesArr = filterRecipes(recipesArr, dairyIngredients)
     if(excludedIngredient[0] != "")
         recipesArr = filterRecipes(recipesArr, excludedIngredient)
    if(Favaritsrecipes.favarits.length > 0 && !favartPage ){
        recipesArr.forEach( recipy => Favaritsrecipes.favarits.find(rec => rec.id == recipy.id)!=undefined?recipy.favarite=true: console.log(recipy.favarite))
    }
    
     pageRenderer.removeElement(pageRenderer.bodyContainer)
     recipesArr.forEach(recipy => {pageRenderer.render(pageRenderer.recipySource, pageRenderer.bodyContainer, recipy)})
 }

// --------------------Favarits List --------------------------------------

$("body").on("click",".heartContainer",function(){
    const id = $(this).data().id
    const checked = $(this).find(".heart-stroke").css("fill") == 'rgb(255, 0, 0)'? true : false
    if (checked){
        $(this).find(".heart-stroke").css("fill","none")
        $.ajax({
            url:`/favaritsRecipes/${id}`,
            type: 'DELETE',
            success: function(data) {
                Favaritsrecipes.favarits = []
                Favaritsrecipes.fetchDataFromApi(Favaritsrecipes.favarits,data)
            }
        }).then(()=>(favartPage)?renderData():'')
        
    }
    else{
        $.post('/favaritsRecipes',{"id" : id},function(data){
            Favaritsrecipes.favarits = []
            Favaritsrecipes.fetchDataFromApi(Favaritsrecipes.favarits,data)
        })
        $(this).find(".heart-stroke").css("fill","red")
    }
})
$(".headContainer").on("click","#favaritsButton",function(){
    $.get('/favaritsRecipes').then( (data) => {
        favartPage =true
        Favaritsrecipes.favarits = []
        Favaritsrecipes.fetchDataFromApi(Favaritsrecipes.favarits ,data)
        renderData()})
        

})