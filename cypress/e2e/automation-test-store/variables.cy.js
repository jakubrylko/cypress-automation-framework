/// <reference types="cypress" />

describe('Veryfing variables, cypress commands and jquery commands', () => {
    it('Navigating to specific product pages', () => {
        cy.visit('https://www.automationteststore.com');
        cy.get("a[href*='product/category&path=']").contains('Makeup').click();
        cy.get("a[href*='product/category&path=']").contains('Skincare').eq(0).click();
    });

    it('Navigating to makeup products page', () => {
        cy.visit('https://www.automationteststore.com');
        cy.get("a[href*='product/category&path=']").contains('Makeup').click();

        cy.get('h1 > .maintext').then(($headerText) => {
            const headerText = $headerText.text();
            cy.log('Found header text: ' + headerText);
            expect(headerText).eq('Makeup');
        })
    });

    it('Validate properties of the contact us page', () => {
        cy.visit('https://www.automationteststore.com');
        cy.get('.info_links_footer').find('li').contains('Contact Us').click();

        // Uses cypress commands and chaining
        cy.contains('#ContactUsFrm', 'Contact Us Form').find('#field_11').should('contain', 'First name');

        //  JQuery approach
        cy.contains('#ContactUsFrm', 'Contact Us Form').then(text => {
            const firstNameText = text.find('#field_11').text();
            expect(firstNameText).contain('First name');

            // Embedded commands (Closure)
            cy.get('#field_11').then(fnText => {
                cy.log(fnText.text());
                cy.log(fnText);
            });
        });
    });
});