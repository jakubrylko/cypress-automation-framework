class ContactUs_PO {
    submitContactForm(firstName, lastName, email, inputText) {
        cy.get('[name="first_name"]').type(firstName);
        cy.get('[name="last_name"]').type(lastName);
        cy.get('[name="email"]').type(email);
        cy.get('textarea.feedback-input').type(inputText);
        cy.get('[type="submit"]').click();
        cy.screenshot();
    };
};

export default ContactUs_PO;