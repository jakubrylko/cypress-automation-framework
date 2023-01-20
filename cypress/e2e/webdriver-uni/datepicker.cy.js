/// <reference types="cypress" />

describe('Test datepicker via WebdriverUni', () => {
    it('Get date basic logic', () => {
        cy.visit('/');
        cy.get('#datepicker').invoke('removeAttr', 'target').click();

        let date = new Date();

        date.setDate(date.getDate());
        cy.log(date.getDate());

        date.setDate(date.getDate() + 5);
        cy.log(date.getDate());
    });

    it('Select full date from the datepicker', () => {
        cy.visit('/');
        cy.get('#datepicker').invoke('removeAttr', 'target').click();
        cy.get('#datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 360);

        let futureYear = date.getFullYear();
        let futureMonth = date.toLocaleString('en-US', { month: 'long' });
        let futureDay = date.getDate();

        cy.log('Future year to select: ' + futureYear);
        cy.log('Future month to select: ' + futureMonth);
        cy.log('Future day to select: ' + futureDay);

        function selectMonthAndYear() {
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if (!currentDate.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectMonthAndYear();
                }
            }).then(() => {
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if (!currentDate.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear();
                    };
                });
            });
        };

        function selectDay() {
            cy.get('[class="day"]').contains(futureDay).eq(0).click();
        };

        selectMonthAndYear();
        selectDay();
    });
});