describe('Input Field', () => {
    it('should show app after visit', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Text Input');
    });

    it('should add field to drop area after click', () => {
        cy.contains('Text Input').click();
        cy.get('#text-field').should('be.visible');
    });

    it('should be writeable', () => {
        cy.get('[data-cy=text-field]')
            .type('ahoj')
            .should('have.value', 'ahoj');
    });

    it('should duplicate form element after copy action', () => {
        cy.get('[title="Copy"]').click();
        cy.get('[data-cy=text-field]').should('have.length', 2);
    });

    it('should delete first element after delete action', () => {
        cy.get('[data-cy=action-Delete]')
            .first()
            .click();
        cy.get('[data-cy=text-field]').should('have.length', 1);
    });

    it('should show modal after edit action', () => {
        cy.get('[data-cy="action-Edit"]').click();
        cy.contains('Edit Form Element');
    });

    it('should be possible to change label', () => {
        cy.get('[data-cy=edit-label]')
            .clear()
            .type('my test label');
        cy.get('[data-cy=apply-attributes-button]').click();
        cy.get('[data-cy=button-close-modal]').click();
        cy.get('#text-field-label').should('contain', 'my test label');
    });

    it('should not change url', () => {
        cy.url().should('equal', 'http://localhost:3000/');
    });
});
