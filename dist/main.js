

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]

const pageRenderer = new Render()
const recipesApi = new RecipesApi()
const Favaritsrecipes= new Favarits()
let favartPage =false
let glutenFree = false
let dairyFree = false
let excludedIngredient = []
let cheefData = []

// --------------------- Serach Button -------------------------------
const serchRecipes = function(){
    const ingredient = $("#wantedItemText").val()
    excludedIngredient = [$("#exludedItem").val()]
    if (!ingredient.match(/^[a-z]+$/i) || ingredient == '') {
        // throw error
    }
    favartPage =false
    recipesApi.recipesList = []
   
    $.get(`/${ingredient}?isDiary=${glutenFree}&isGluten=${dairyFree}&isExuldedIngredient=${excludedIngredient[0]}`, function (reponseResults ) {
        recipesApi.fetchDataFromApi(recipesApi.recipesList,reponseResults )
    }).then( () => {     
        renderData()
})}
$(".headContainer").on("click","#searchButton",function(){
    serchRecipes()
})
$(".headContainer").on("click","#favaritsButton",function(){
    $.get('favaritsRecipes',function(data) {
        favartPage =true
        Favaritsrecipes.favarits = []
        Favaritsrecipes.fetchDataFromApi(Favaritsrecipes.favarits ,data)
        renderData()})
})

// --------------------- Filtter Check -------------------------------
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

// --------------------Render Data --------------------------------------
const renderData = function(){
    let recipesArr =  (favartPage)? Favaritsrecipes.favarits : recipesApi.recipesList
    recipesArr = recipesArr.filter(recipy => (glutenFree)? filterRecipes(recipy, glutenIngredients) :true
                   && (dairyFree) ?  filterRecipes(recipy, dairyIngredients):true
                    && (excludedIngredient[0] != "")?  filterRecipes(recipy, excludedIngredient): true)
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


//-------------------Add to Hendlebars For Function --------------------------------------
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
