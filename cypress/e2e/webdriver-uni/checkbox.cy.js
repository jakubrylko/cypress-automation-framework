/// <reference types="cypress" />

describe('Verify checkboxes via WebdriverUni', () => {
    beforeEach(() => {
        cy.log(Cypress.env('name'));
        cy.wduCheckbox();
    });

    it('Check and validate checkbox', () => {
        cy.get('[type="checkbox"]').first().as('option-1');
        cy.get('@option-1').check().should('be.checked');
    });

    it('Uncheck and validate checkbox', () => {
        cy.get('[type="checkbox"]').eq(2).as('option-3');
        cy.get('@option-3').uncheck().should('not.be.checked');
    });

    it('Check multiple checkboxes', () => {
        cy.get('[type="checkbox"]').check().should('be.checked');
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Click all radio buttons', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[value="green"]').check();
        cy.get('[value="blue"]').check();
        cy.get('[value="yellow"]').check();
        cy.get('#radio-buttons > [value="orange"]').check();
        cy.get('[value="purple"]').check();
        /* ==== End Cypress Studio ==== */
    });
});