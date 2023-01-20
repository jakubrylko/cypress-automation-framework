/// <reference types="cypress" />

describe('Handling data via WebdriverUni', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
    });

    it('Calculate and assert the total age of all users', () => {
        let userDetails = [];
        let numb = 0;
        cy.get('#thumbnail-1 td').each(($el, index, $list) => {
            userDetails[index] = $el.text();
        }).then(() => {
            let i;
            for (i = 0; i < userDetails.length; i++) {
                if (Number(userDetails[i])) {
                    numb += Number(userDetails[i]);
                };
            };
            cy.log('Total age: ' + numb).then(() => {
                expect(numb).eq(322);
            });
        });
    });

    it('Calculate and assert the age of a given user based on last name', () => {
        cy.get('#thumbnail-1 td:nth-child(2)').each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes('Woods')) {
                cy.get('#thumbnail-1 td:nth-child(2)').eq(index).next().then(age => {
                    const userAge = age.text();
                    expect(userAge).equals('80');
                });
            };
        });
    });
});