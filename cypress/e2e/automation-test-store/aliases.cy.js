/// <reference types="cypress" />

describe('Aliases and invokes', () => {
    it('Validate a specific product', () => {
        cy.visit('https://www.automationteststore.com');
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click();
        cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail');
        cy.get('@productThumbnail').then(function () {
            cy.log(this.productThumbnail);
        });
        cy.get('@productThumbnail').its('length').should('be.gt', 5);
        cy.get('@productThumbnail').should('include', 'Seaweed Conditioner');
    });

    it('Validate product thumbnail', () => {
        cy.visit('https://www.automationteststore.com');
        cy.get('.thumbnail').as('productThumbnail');
        cy.get('@productThumbnail').should('have.length', 16);
        cy.get('@productThumbnail').find('.productcart').invoke('attr', 'title').should('include', 'Add to Cart');
    });

    it('Calculate total of normal and sale products', () => {
        cy.visit('https://www.automationteststore.com');

        // cy.get('.thumbnail').as('productThumbnail');
        // cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
        //     cy.log($el.text()); 
        // });

        cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemPrice');
        cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemPrice');

        let itemsTotal = 0;

        cy.get('@itemPrice').then($linkText => {
            // cy.log('Linked normal prices: \n' + $linkText);
            let itemPrice = $linkText.split('$');
            let itemPriceTotal = 0;
            let i;
            for (i = 1; i < itemPrice.length; i++) {
                // cy.log(`$${itemPrice[i]}`);
                itemPriceTotal += Number(itemPrice[i]);
            };
            itemsTotal += itemPriceTotal;
            cy.log(`Total price of normal products: $${itemPriceTotal}.00`);
        })

        cy.get('@saleItemPrice').then($linkText => {
            // cy.log('Linked sale prices: \n' + $linkText);
            let saleItemPrice = $linkText.split('$');
            let saleItemPriceTotal = 0;
            let i;
            for (i = 1; i < saleItemPrice.length; i++) {
                // cy.log(`$${saleItemPrice[i]}`);
                saleItemPriceTotal += Number(saleItemPrice[i]);
            };
            itemsTotal += saleItemPriceTotal;
            cy.log(`Total price of sale products: $${saleItemPriceTotal}.00`);
        })
            .then(() => {
                cy.log(`Total price of all products: $${itemsTotal}.00`);
                expect(itemsTotal).to.eq(625.6);
            });
    });
});