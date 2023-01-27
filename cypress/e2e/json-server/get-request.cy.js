/// <reference types='cypress' />

describe('Get request', () => {
    let response;

    beforeEach(() => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }
        }).then($res => {
            response = JSON.parse(JSON.stringify($res));
        });
    });

    it('Validate status code', () => {
        expect(response.status).to.eql(200);
    });

    it('Validate keys and values', () => {
        expect(response.body[0]).has.property('title', 'Example Post');
        expect(response.body[1]).has.property('author', 'Jakub Rylko');

        response.body.forEach(item => {
            expect(item).to.have.all.keys('id', 'title', 'author');
            cy.log('Author: ' + item.author +  ' / ' + 'Title: ' + item['title']);
        });
    });
});