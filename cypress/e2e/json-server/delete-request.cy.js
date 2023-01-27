/// <reference types='cypress' />

describe('Delete request', () => {
    let postId = 5;
    
    it('Delete post', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/posts/${postId}`
        }).then(response => {
            expect(response.status).to.eql(200);
        });
    });
});