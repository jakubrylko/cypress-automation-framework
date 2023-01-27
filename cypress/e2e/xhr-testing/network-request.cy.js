/// <reference types='cypress' />

describe('Network requests', () => {
    const errorMessage = 'Unable to find a comment!';

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests');
    });

    it('Get request', () => {
        cy.intercept({
            method: 'GET',
            //  url: 'https://jsonplaceholder.cypress.io/comments/1'
            url: '**/comments/*'
        }, {
            body: {
                postId: 1,
                id: 1,
                name: 'Test name',
                email: 'joe.blogs@test.com',
                body: 'Hello world!'
            }
        }).as('getComment');

        cy.get('.network-btn').click();
        cy.wait('@getComment').its('response.statusCode').should('eq', 200);
    });

    it('Post request', () => {
        cy.intercept('POST', '/comments').as('postComment');

        cy.get('.network-post').click();
        cy.wait('@postComment').then(({ request, response }) => {
            console.log('POST Request');
            console.log(request);
            expect(request.body).to.include('email');
            expect(request.headers).to.have.property('content-type');
            expect(request.headers).to.have.property('referer', 'https://example.cypress.io/');

            console.log('POST Response');
            console.log(response);
            expect(response.body).to.have.property('name', 'Using POST in cy.intercept()');
        });
    });

    it('Put request', () => {
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*'
        }, {
            statusCode: 404,
            body: { error: errorMessage },
            delay: 500
        }).as('putComment');

        cy.get('.network-put').click();
        cy.wait('@putComment').its('response.statusCode').should('eq', 404);
        cy.get('.network-put-comment').should('be.visible').and('contain', errorMessage);
    });
});