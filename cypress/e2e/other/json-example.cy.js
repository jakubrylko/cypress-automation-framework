/// <reference types="cypress" />

describe('JSON Object', () => {
    it('JSON Object Example', () => {
        const exampleObject = { "name": "Tonny", "surname": "Black" };
        const exampleArray = ["Sophie", "Victoria", "Rose"];
        const challangeArr = [{ "name": "Jack" }, { "surname": "Bond" }, { "age": 40 }]

        const users = {
            "firstName": "Joe",
            "lastName": "Blogs",
            "age": 30,
            "students": [
                {
                    "firstName": "Jim",
                    "lastName": "Parrot"
                },
                {
                    "firstName": "Kate",
                    "lastName": "Anger"
                }
            ]
        };

        cy.log(exampleObject.name);
        cy.log(exampleObject['surname']);

        cy.log(exampleArray[0]);
        cy.log(exampleArray[1]);

        cy.log(users.lastName);
        cy.log(users.students[0].lastName);

        cy.log(challangeArr[0].name + ' ' + challangeArr[1].surname + ' ' + challangeArr[2].age)
    });
});