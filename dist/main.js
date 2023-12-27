const pageRenderer = new Render()
const recipesApi = new RecipesApi()
const Favaritsrecipes= new Favarits()
let is_favartPage =false
let is_glutenFree = false
let is_dairyFree = false
let is_excludedIngredient = []
let cheefData = []
let currentPage = 1

// --------------------- Serach Button -------------------------------
const serchRecipes = function(){
    const ingredient = $("#wantedItemText").val().toLowerCase()
    is_excludedIngredient = [$("#exludedItem").val()]

    is_favartPage =false
    recipesApi.recipesList = []
    $.get(`/${ingredient}?isDiary=${is_glutenFree}&isGluten=${is_dairyFree}&isExuldedIngredient=${is_excludedIngredient[0]}`, function (reponseResults ) {
        try {
            recipesApi.fetchDataFromApi(recipesApi.recipesList,reponseResults )
            renderData()
        } 
         catch (error) {
            alert("Please Enter an ingredient")
        }})
    }
$(".headContainer").on("click","#searchButton",function(){
    serchRecipes()
})

// --------------------- Filtter Check -------------------------------

$(".filterContainer").on("click","#glutenFree",function(){
    is_glutenFree = $(this)[0].checked 
})
$(".filterContainer").on("click","#dairyFree",function(){
    is_dairyFree = $(this)[0].checked 
})

// --------------------Render Data --------------------------------------
const renderData = function(){
    let recipesArr =  (is_favartPage)? Favaritsrecipes.favarits : recipesApi.recipesList
    if (recipesArr.length <= 0 ){
        alert(`There is No Recipes for this Integrdient`)
    }
    if(Favaritsrecipes.favarits.length > 0 && !is_favartPage ){
        recipesArr.forEach( recipy => Favaritsrecipes.favarits.find(rec => rec.id == recipy.id)!=undefined?recipy.favarite=true: console.log(recipy.favarite))
    }
    pageRenderer.renderPage(currentPage,recipesArr);
 }

// --------------------Favarits List --------------------------------------
// Add Button  By Api
$(".headContainer").on("click","#favaritsButton",function(){
    $.get('favaritsRecipes',function(data) {
        is_favartPage =true
        Favaritsrecipes.favarits = []
        Favaritsrecipes.fetchDataFromApi(Favaritsrecipes.favarits ,data)
        renderData()})
})
// Delete Button 
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
        }).then(()=>(is_favartPage)?renderData():'')
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
    for(var i = 1; i <= n; ++i)
        accum += block.fn(i);
    return accum;
});
Handlebars.registerHelper('ifCond', function(v1, options) {
    if(v1 === currentPage) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

//---------------------Email Us Button -----------------------------------------
$("body").on("click","#emailUsButton", function(){
    const recipyTitle = $(this).closest(".recipyContainer").find(".recipyHeader").find("#recipyTitle").text()
    const recipyVideo = $(this).closest(".recipyContainer").find(".recipyHeader").find("#recipyTitle").attr('href');
    window.location = `mailto:?subject=Check%20out%20this%20recipe!%20${recipyTitle}&body=You%20can%20see%20the%20recipe%20in%20this%20video:%20${recipyVideo}`
})

// --------------pagination -------------------------
$("body").on("click","li", function(){
    currentPage = parseInt($(this).attr("id"));
    if(currentPage)
    renderData()
})
