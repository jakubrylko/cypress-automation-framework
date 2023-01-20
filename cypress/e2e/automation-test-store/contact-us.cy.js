/// <reference types="cypress" />

describe('Test Contact Us form via Automation Test Store', () => {
    beforeEach(() => {
        //cy.viewport(390, 844);
        cy.fixture('user.json').as('user');
    });

    it('Successful submission via contact us form with CSS selectors', {
        retries: {
            runMode: 2,
            openMode: 2
        }
    }, () => {
        cy.visit('https://www.automationteststore.com');
        cy.get("a[href$='contact']").click().then((contactButtonText) => {
            cy.log("Text on the selected button: " + contactButtonText.text());
            expect(contactButtonText.text()).eq('Contact Us');
        });
        cy.get('@user').then(user => {
            cy.get('#ContactUsFrm_first_name').type(user.firstName);
            cy.get('#ContactUsFrm_email').type(user.email);
        })
        cy.get('#ContactUsFrm_first_name').should('have.class', 'form-control');
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email');
        cy.get('#ContactUsFrm_enquiry').type('Do you provide support with CSS selectors?');
        cy.get('#ContactUsFrm_enquiry').should('have.attr', 'rows', '8');
        cy.get('button[title="Submit"]').click();
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
        cy.log('Test has completed!');
    });

    it('Successful submission via contact us form with XPath selectors', () => {
        cy.visit('https://www.automationteststore.com');
        cy.xpath('//a[text()="Contact Us"]').click();
        cy.get('@user').then(user => {
            cy.xpath('//*[contains(@name, "first")]').type(user.firstName);
            cy.xpath('//*[contains(@id, "email")]').type(user.email);
        });
        cy.xpath('//*[starts-with(@name, "enq")]').type('Do you provide support with XPath selectors?');
        cy.xpath('//*[starts-with(@title, "Sub")]').click();
    });
});