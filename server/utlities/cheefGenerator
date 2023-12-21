const { faker } = require('@faker-js/faker');
 class CheefGenerator {
    static createRandomUsers = function(numOfCheefs){
        const listOfCheefs = []
        for(let i = 0; i < numOfCheefs; i++){
            const firstName = faker.person.fullName();
            listOfCheefs.push({ "fullName" :firstName})
        }
        return listOfCheefs
    }
 }
module.exports = CheefGenerator