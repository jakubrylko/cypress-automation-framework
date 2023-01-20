/// <reference types="cypress" />

describe('Interact with dropdown via WebdriverUni', () => {
    it('Select specific values via select dropdown lists', () => {
        cy.visit('/');
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#dropdowm-menu-1').select('c#');
        cy.get('#dropdowm-menu-2').select('testng').should('have.value', 'testng');
        cy.get('#dropdowm-menu-3').select('JQuery').contains('JQuery');

        cy.get('#dropdowm-menu-2').select('maven').should('have.value', 'maven');
        cy.get('#dropdowm-menu-2').select('TestNG').contains('TestNG');
    });

    it('Select all options in the dropdown list', () => {
        cy.visit('/');
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#dropdowm-menu-1').then(select => {
            cy.wrap(select).find('option').each(option => {
                cy.wrap(select).select(option.text());
            })
        });
    });
});