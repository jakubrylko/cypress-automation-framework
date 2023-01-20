/// <reference types="cypress" />

describe('Validate WebdriverUni homepage links', () => {
    it('Confirm links redirect to the correct pages', () => {
        cy.visit('/');
        cy.get('#contact-us').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'contactus');

        cy.go('back');
        cy.url().should('not.include', 'contactus');

        // cy.reload(true); // reload without using cache
        cy.reload();

        cy.go('forward');
        cy.url().should('include', 'contactus');

        cy.go('back');
        cy.get('#login-portal').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'Login-Portal');

        cy.go('back');
        cy.url().should('not.include', 'Login-Portal');
    });

    it('Browser navigation challange', () => {
        cy.visit('/');
        cy.get('#to-do-list').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'To-Do-List');

        cy.go('back');
        cy.url().should('not.include', 'To-Do-List');
    });
});