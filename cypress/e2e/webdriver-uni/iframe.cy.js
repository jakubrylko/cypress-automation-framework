/// <reference types="cypress" />

describe('Handling iframe and modals', () => {
    it('Handle WebdriverUni iframe and modal', () => {
        cy.visit('/');
        cy.get('#iframe').invoke('removeAttr', 'target').click();

        cy.get('#frame').then(($iframe) => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).as('iframe');
        });

        cy.get('@iframe').find('#button-find-out-more').click();
        cy.get('@iframe').find('#myModal').as('modal');
        cy.get('@modal').should(($expectedText) => {
            const text = $expectedText.text();
            expect(text).to.include('we sell a wide range of electrical goods');
        });

        cy.get('@modal').contains('Close').click();
    });
});