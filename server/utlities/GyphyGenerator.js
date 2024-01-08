const axios = require("axios")
const {consts }= require("../../config")
const apiGiphy = consts.apiGiphy
class GyphyGenerator{
    static gypyGenerator = function(recipesArr){
        return axios.get(`${apiGiphy}${recipesArr.length}`)
        .then((response)=>{
            const gyphList = response.data.data
            recipesArr.forEach((recipe, index) => {
                recipe.thumbnail =  gyphList[index].embed_url
              });
            })
}}
module.exports = GyphyGenerator
