class Render{
    constructor(){
        this.bodyContainer = $('.bodyContainer')
        this.recipySource = $('#recipySource')
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
}


