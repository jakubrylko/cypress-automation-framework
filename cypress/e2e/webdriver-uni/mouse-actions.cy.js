/// <reference types="cypress" />

describe('Test mouse actions', () => {
    it('Scroll element into view', () => {
        cy.visit('/');
        cy.get('#actions').scrollIntoView().invoke('removeAttr', 'target').click();
    });

    it('Should be able to drag and drop item', () => {
        cy.visit('/');
        cy.get('#actions').invoke('removeAttr', 'target').click();
        cy.get('#draggable').trigger('mousedown', { which: 1 });
        cy.get('#droppable').trigger('mousemove').trigger('mouseup', { force: true });
        cy.get('#droppable').should('contain', 'Dropped!');
        cy.get('#double-click').should('have.css', 'background-color', 'rgb(254, 196, 45)')
    });

    it('Should be able to perform a double mouse click', () => {
        cy.visit('/');
        cy.get('#actions').invoke('removeAttr', 'target').click();
        cy.get('#double-click').should('have.css', 'background-color', 'rgb(254, 196, 45)');
        cy.get('#double-click').dblclick().should('have.css', 'background-color', 'rgb(147, 203, 90)');
    });

    it('Should be able to hold down the left mouse button', () => {
        cy.visit('/');
        cy.get('#actions').invoke('removeAttr', 'target').click();
        cy.get('#click-box').trigger('mousedown', { which: 1 }).then(($element) => {
            expect($element).to.have.css('background-color', 'rgb(0, 255, 0)');
        });
    });
});