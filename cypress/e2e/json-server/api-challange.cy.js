/// <reference types='cypress' />

describe('API Challenge', () => {
    let randomBody = Math.random().toString(36).substring(2);
    let randomPostId = Math.round(Math.random() * 10);
    let commentsArr = [];

    it('Create new comment', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/comments',
            body: {
                body: randomBody,
                postId: randomPostId
            }
        }).then(response => {
            expect(response.status).to.eql(201);
        });
    });

    it('Assert new comment', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/comments',
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body));

            body.forEach(comment => {
                commentsArr.push(comment)
            });
        }).then(() => {
            let latestComment = commentsArr[commentsArr.length - 1];
            expect(latestComment.id).to.eq(commentsArr.length);
            expect(latestComment.body).to.eq(randomBody);
            expect(latestComment.postId).to.eq(randomPostId);
        });
    });

    it('Delete new comment', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/comments/' + commentsArr.length
        }).then(response => {
            expect(response.status).to.eql(200);
        });
    });
});