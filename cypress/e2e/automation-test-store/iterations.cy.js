/// <reference types="cypress" />

describe('Iterate over elements', () => {
    beforeEach(() => {
        cy.visit('https://www.automationteststore.com');
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click();
    });

    it('Log information of all products', () => {
        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log(`${index} - ${$el.text()}`);
        });
    });

    it('Add specific product to basket', () => {
        cy.selectProduct('Curls to straight Shampoo');
    });

    it('Add challange product to basket', () => {
        cy.selectProduct('Eau Parfumee au The Vert Shampoo');
    });
});