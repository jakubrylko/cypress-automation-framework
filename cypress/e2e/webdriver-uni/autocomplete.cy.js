/// <reference types="cypress" />

describe('Verify autocomplete dropdown lists via WebdriverUni', () => {
    it('Select specific product via autocomplete list', () => {
        cy.visit('/');
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click();
        cy.get('#myInput').type('A');

        cy.get('#myInputautocomplete-list > *').should('have.length', 5);
        cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
            const prodA = $el.text();
            const porductToSelect = 'Avacado';
            if (prodA === porductToSelect) {
                $el.trigger('click');
                cy.get('#submit-button').click();
                cy.url().should('include', porductToSelect)
            }
        }).then(() => {
            cy.get('#myInput').type('G');
            cy.get('#myInputautocomplete-list > *').each(($el, index, $list) => {
                if ($el.text() === 'Grapes') {
                    $el.trigger('click');
                    cy.get('#submit-button').click();
                    cy.url().should('include', 'Grapes');
                };
            });
        });
    });
});