/// <reference types="cypress" />

describe('Handle JavaScript alerts', () => {
    it('Confirm JavaScript alert contains the correct text', () => {
        cy.wduHomepage();
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button1').click();
        cy.on('window:alert', (string) => {
            expect(string).to.equal('I am an alert box!');
        });
    });

    it('Validate JavaScript alert box works correctly when clicking ok', () => {
        cy.wduHomepage();
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button4').click();
        cy.on('window:confirm', () => {
            return true;
        });
        cy.get('#confirm-alert-text').contains('You pressed OK!');
    });

    it('Validate JavaScript alert box works correctly when clicking cancel', () => {
        cy.wduHomepage();
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button4').click();
        cy.on('window:confirm', () => {
            return false;
        });
        cy.get('#confirm-alert-text').contains('You pressed Cancel!');
    });

    it('Validate JavaScript alert box using a stub', () => {
        cy.wduHomepage();
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();

        const stub = cy.stub();
        cy.on('window:confirm', stub);

        cy.get('#button4').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!');
        }).then(() => {
            return true;
        }).then(() => {
            cy.get('#confirm-alert-text').contains('You pressed OK!');
        });
    });
});