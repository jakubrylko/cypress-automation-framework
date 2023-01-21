import Homepage_PO from "../../support/page-objects/webdriver-uni/homepage-po";
import ContactUs_PO from "../../support/page-objects/webdriver-uni/contact-us-po";
/// <reference types="cypress" />

describe('Test Contact Us form via WebdriverUni', () => {
    Cypress.config('defaultCommandTimeout', 20000);
    const homepage_PO = new Homepage_PO();
    const contactUs_PO = new ContactUs_PO();

    before(() => {
        cy.fixture('example.json').then(example => {
            globalThis.example = example;
        });
    });

    beforeEach(() => {
        homepage_PO.visitHomepage();
        homepage_PO.clickButton('contact-us');

        //cy.visit(Cypress.env('webDriverUni') + '/Contact-Us/contactus.html');

        cy.document().should('have.prop', 'charset').and('eq', 'UTF-8');
        cy.title().should('contain', 'Contact Us');
        cy.url().should('include', 'contactus');
    })

    it('Should be able to submit a successful submission via contact us form', () => {
        contactUs_PO.submitContactForm(example.firstName, example.lastName, example.email, example.comment);

        //cy.fillContactForm(Cypress.env('firstName'), example.lastName, example.email, example.comment);

        cy.get('h1').contains('Thank You for your Message!', { timeout: 60000 });
    });

    it('Should not be able to submit a successful submission via contact us form as all fields are required', () => {
        if (Cypress.isBrowser('firefox')) {

        } else {
            cy.fillContactForm(Cypress.env('firstName'), example.lastName, ' ', example.feedback);
            cy.get('body').contains('Error: Invalid email address');
        }
    });
});