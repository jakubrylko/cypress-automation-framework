/// <reference types='cypress' />

describe('Update request', () => {
    let postId = 3;

    it('Update an existing post', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/posts/${postId}`,
            body: {
                title: 'Updated Cypress Post',
                author: 'Jakub Tester'
            }
        }).then(response => {
            expect(response.status).to.eql(200);
        });
    });

    it('Validate values of updated post', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:3000/posts/${postId}`,
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));
            expect(body.id).to.eql(postId);
            expect(body.title).to.eql('Updated Cypress Post');
            expect(body.author).to.eql('Jakub Tester');
        });
    });
});