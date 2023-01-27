/// <reference types='cypress' />

describe('Juice Shop - Challange', () => {
    const password = 'Password123!';
    let randomEmail;

    describe('UI Tests', () => {
        before(() => {
            cy.log('Generating random data...')
            cy.currentDateTime().then(dateTime => {
                randomEmail = 'jrtest' + dateTime + '@test.com';
            });
        });

        beforeEach(() => {
            cy.visit('http://localhost:3000/')
            cy.get('.close-dialog').click();
            cy.get('.cc-btn').click();
        });

        it('Test valid signup', () => {
            cy.goToLogin();

            cy.get('#newCustomerLink').click();
            cy.url().should('contain', 'register');

            cy.get('#emailControl').type(randomEmail);
            cy.get('#passwordControl').type(password);
            cy.get('#repeatPasswordControl').type(password);
            cy.get('mat-select').click();
            cy.get('.mat-option-text').contains('Name of your favorite pet?').click();
            cy.get('#securityAnswerControl').type('Max');

            cy.get('#registerButton').should('not.have.class', 'mat-button-disabled').click();
            cy.get('.mat-snack-bar-container').should('be.visible').and('contain', 'Registration completed successfully.');
        });

        it('Test valid login', () => {
            cy.goToLogin();

            cy.get('#email').type(randomEmail);
            cy.get('#password').type(password);

            cy.get('#loginButton').should('not.have.class', 'mat-button-disabled').click();
            cy.url().should('contain', 'search');

            cy.get('#navbarAccount').click();
            cy.get('#mat-menu-panel-0').find('button').eq(0).contains(randomEmail);
        });

        it('Test login request', () => {
            cy.intercept('POST', '*/user/login').as('userLogin');

            cy.goToLogin();

            cy.get('#email').type(randomEmail);
            cy.get('#password').type(password);
            cy.get('#loginButton').click();

            cy.wait('@userLogin').then(({ request, response }) => {
                console.log('Test login request')
                console.log(response);

                expect(response.statusCode).to.eql(200);
                expect(response.body.authentication.token).to.exist;
                expect(response.body.authentication.umail).to.eql(randomEmail);
            });
        });
    });

    describe('API Tests', () => {
        it('Login using API', () => {
            cy.request('POST', 'http://localhost:3000/rest/user/login', { email: randomEmail, password: password }).then(response => {
                console.log('Login using API')
                console.log(response);

                expect(response.status).to.eql(200);
                expect(response.body.authentication.token).to.exist;
                expect(response.body.authentication.umail).to.eql(randomEmail)
            });
        });

        it('Login using token', () => {
            const userCredentials = {
                email: randomEmail,
                password: password
            };

            cy.request('POST', 'http://localhost:3000/rest/user/login', userCredentials)
                .its('body').then(body => {
                    const token = body.authentication.token;

                    cy.visit('http://localhost:3000/', {
                        onBeforeLoad(browser) {
                            browser.localStorage.setItem('token', token);
                        }
                    });
                    cy.get('.cdk-overlay-backdrop').click({ force: true });
                    cy.get('.cc-btn').click();
                    cy.get('.fa-layers-counter').should('contain', 0);
                });
        });
    });
});