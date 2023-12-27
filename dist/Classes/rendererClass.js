const itemsPerPage = 5;
class Render{
    constructor(){
        this.bodyContainer = $('.bodyContainer')
        this.recipySource = $('#recipySource')
        this.paginationSource = $('#paginationSource')
        this.paginationContainer = $('.headContainer').find(('.paginationContainer'))
    }
    render(scriptSource, countainer, data){
        const source = scriptSource.html();
        const template = Handlebars.compile(source);
        const newHTML = template(data);
        countainer.append(newHTML)
    }
    removeElement(countainer){
        countainer.empty()
    }
    renderRecipes(recipesArr){
        this.removeElement(this.bodyContainer)
        recipesArr.forEach(recipy => {this.render(this.recipySource,this.bodyContainer, recipy)})
    }
    renderPage(currentPage,items) {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        this.setupPagination(totalPages);
        this.showItems(items,currentPage);
      }
    showItems(items,page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        let pageItems;
        if(items.length > 5)
            pageItems = items.slice(startIndex, endIndex);
        else
            pageItems = items
        this.removeElement(this.bodyContainer)
        this.renderRecipes(pageItems)

      }
    setupPagination(totalPages) { 
        this.removeElement(this.paginationContainer)
        this.render(this.paginationSource, this.paginationContainer, {totalPages})
      }
      
}


