class AsHairCare_PO {
    addProductToBasket() {
        globalThis.products.productName.forEach(element => {
            cy.addProductToBasket(element).then(() => {
                //debugger
            });
        });
        cy.get('.menu_text').contains('Cart').eq(0).click().debug();
    }
};

export default AsHairCare_PO;