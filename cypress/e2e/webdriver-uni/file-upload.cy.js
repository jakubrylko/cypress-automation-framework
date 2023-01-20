/// <reference types="cypress" />

describe('Test file upload via WebDriverUni', () => {
    it('Upload a file - old method', () => {
        cy.visit('/');
        cy.get('#file-upload').invoke('removeAttr', 'target').click();

        cy.fixture('laptop.png', 'base64').then(fileContent => {
            cy.get('#myFile').attachFile(
                {
                    fileContent,
                    fileName: 'laptop.png',
                    mimeType: 'image/png'
                },
                {
                    uploadType: 'input'
                }
            );
        });

        cy.get('#submit-button').click();
        cy.on('window:alert', (string) => {
            expect(string).to.equal('Your file has now been uploaded!');
        });
    });

    it('Upload a file - new method', () => {
        cy.visit('/');
        cy.get('#file-upload').invoke('removeAttr', 'target').click();

        cy.get('#myFile').selectFile("cypress/fixtures/laptop.png");
        cy.get('#submit-button').click();
        cy.on('window:alert', (string) => {
            expect(string).to.equal('Your file has now been uploaded!');
        });
    });

    it('Upload no file', () => {
        cy.visit('/');
        cy.get('#file-upload').invoke('removeAttr', 'target').click();
        cy.get('#submit-button').click();
        cy.on('window:alert', (string) => {
            expect(string).to.equal('You need to select a file to upload!');
        });
    });
});