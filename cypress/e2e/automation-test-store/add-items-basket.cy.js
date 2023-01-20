import AsHomepage_PO from "../../support/page-objects/automation-store/as-homepage-po";
import AsHairCare_PO from "../../support/page-objects/automation-store/as-haircare-po";
/// <reference types="cypress" /> 

describe('Add multiple items to basket', () => {
    const asHomepage_PO = new AsHomepage_PO();
    const asHairCare_PO = new AsHairCare_PO();
    
    before(() => {
        cy.fixture("products").then(products => {
            globalThis.products = products;
        });
    });

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
        asHomepage_PO.accessHomepage();
        asHomepage_PO.clickLink('Hair Care');
    });

    it('Add specific items to basket', () => {
        asHairCare_PO.addProductToBasket();

        cy.get('.input-group-sm').find('input').then(listing => {
            const listingCount = Cypress.$(listing).length;
            expect(listingCount).to.equal(products.productName.length);
            let i;
            for (i = 0; i < listingCount; i++) {
                cy.get('.input-group-sm').find('input').eq(i).invoke('attr', 'value').should('equal', '1');
            };
        });
    });
});