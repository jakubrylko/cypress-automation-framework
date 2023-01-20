// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('selectProduct', productName => {
    cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
        if ($el.text().includes(productName)) {
            cy.wrap($el).click();
            cy.get('.cart').click().then(() => {
                cy.get('.maintext').should('be.visible');
            });
        };
    });
});

Cypress.Commands.add('addProductToBasket', productName => {
    cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
        if ($el.text() === productName) {
            cy.log(index + ': ' + $el.text());
            cy.wrap($el).click();
            cy.get('.productpagecart').click();
            cy.go(-2);
        };
    });
});

Cypress.Commands.add('fillContactForm', (firstName, lastName, email, inputText) => {
    cy.get('[name="first_name"]').type(firstName);
    cy.get('[name="last_name"]').type(lastName);
    cy.get('[name="email"]').type(email);
    cy.get('textarea.feedback-input').type(inputText);
    cy.get('[type="submit"]').click();
});

Cypress.Commands.add('wduHomepage', () => {
    cy.visit('/');
});

Cypress.Commands.add('wduCheckbox', () => {
    cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html');
});