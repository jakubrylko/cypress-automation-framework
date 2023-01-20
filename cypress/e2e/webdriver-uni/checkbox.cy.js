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
});