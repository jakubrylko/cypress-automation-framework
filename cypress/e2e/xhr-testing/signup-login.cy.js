/// <reference types='cypress' />

describe('Signup and Login', () => {
    let randomUser = 'jrtest' + Math.round(Math.random() * 200);
    let randomEmail = randomUser + '@test.com';
    const password = 'Test123';

    before(() => {
        cy.log('Preparing fixtures...')
        cy.fixture("tags.json").then(tagList => {
            globalThis.tagList = tagList;
        });
        cy.fixture("articles.json").then(artList => {
            globalThis.artList = artList;
        });
    });

    beforeEach(() => {
        cy.log('Accessing homepage...')
        cy.visit('http://localhost:4200/');
    });

    it('Test valid signup', () => {
        cy.intercept('POST', '**/*.realworld.io/api/users').as('newUser');

        cy.get('.nav').contains('Sign up').click();
        cy.get('[placeholder="Username"]').type(randomUser);
        cy.get('[placeholder="Email"]').type(randomEmail);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('.btn').contains('Sign up').click();
        cy.get('.nav-item').eq(3).should('contain', randomUser);

        cy.wait('@newUser').then(({ request, response }) => {
            cy.log('Request: ' + JSON.stringify(request));
            cy.log('Response: ' + JSON.stringify(response));

            expect(response.statusCode).to.eq(200);
            expect(request.body.user.username).to.eq(randomUser);
            expect(request.body.user.email).to.eq(randomEmail);
        });
    });

    it('Test valid login and mock tags', () => {
        cy.intercept('GET', '**/tags', { fixture: 'tags.json' });

        cy.get('.nav').contains('Sign in').click();
        cy.get('[placeholder="Email"]').type(randomEmail);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('.btn').contains('Sign in').click();
        cy.get('.nav-item').eq(3).should('contain', randomUser);

        cy.get('.tag-list').find('a').then(tags => {
            const tagsCount = Cypress.$(tags).length;
            expect(tagsCount).to.eql(tagList.tags.length);

            for (let i = 0; i < tagsCount; i++) {
                cy.get('.tag-list').should('contain', tagList.tags[i]);
            };
        });
    });

    it('Mock global feed', () => {
        cy.intercept('GET', '**/articles*', { fixture: 'articles.json' });
        cy.intercept('GET', '**/tags', { fixture: 'tags.json' });

        cy.get('.nav').contains('Sign in').click();
        cy.get('[placeholder="Email"]').type(randomEmail);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('.btn').contains('Sign in').click();
        cy.get('.nav-item').eq(3).should('contain', randomUser);
        cy.get('.nav-link').contains('Global Feed').click();

        cy.get('app-article-list').find('app-article-preview').then(article => {
            const articlesCount = Cypress.$(article).length;
            expect(articlesCount).to.eql(artList.articles.length);
        });
    });
});