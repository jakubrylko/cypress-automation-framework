/// <reference types='cypress' />

describe('Post request', () => {
    let postTitles = [];
    let randomTitle = Math.random().toString(36).substring(2);

    it('Create a new post', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            body: {
                title: randomTitle,
                author: "Jakub Rylko"
            }
        }).then(response => {
            expect(response.status).to.eql(201);
        });
    });

    it('Validate title of new post', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/posts',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));

            body.forEach(item => {
                postTitles.push(item.title)
            });
        }).then(() => {
            let latestPost = postTitles[postTitles.length - 1];
            expect(latestPost).to.eq(randomTitle);
            cy.log('Number of posts: ' + postTitles.length);
        })
    });
});