class AsHomepage_PO {
    accessHomepage() {
        cy.visit('https://www.automationteststore.com/')
    };

    clickLink(linkName) {
        cy.get("a[href*='product/category&path=']").contains(linkName).click();
    };
};

export default AsHomepage_PO;