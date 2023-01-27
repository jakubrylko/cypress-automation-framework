class Homepage_PO {
    visitHomepage() {
        cy.visit(Cypress.env('webDriverUni'), { timeout: 60000 });
    };

    clickButton(id) {
        cy.get(`#${id}`).invoke('removeAttr', 'target').click({ force: true }, { timeout: 8000 });
    }
};

export default Homepage_PO;