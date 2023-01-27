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

Cypress.Commands.add('currentDateTime', () => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear().toString().slice(-2);
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    let dateTime = `${day}${month}.${hour}${minutes}`;
    return dateTime;
});

Cypress.Commands.add('goToLogin', () => {
    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click();
    cy.url().should('contain', 'login');
});