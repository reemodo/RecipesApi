const axios = require("axios")
class GyphyGenerator{
    static gypyGenerator = function(recipesArr){
        return axios.get(`https://api.giphy.com/v1/stickers/search?api_key=BbapDliSM0MOwoZWKlELEHVepw9UfKKU&q=food&type=gif&lang=en&limit=${recipesArr.length}`)
        .then((response)=>{
            const gyphList = response.data.data
            recipesArr.forEach((recipe, index) => {
                recipe.thumbnail =  gyphList[index].embed_url
              });
            })
}}
module.exports = GyphyGenerator
