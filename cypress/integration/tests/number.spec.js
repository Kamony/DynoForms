describe('NUmber test', () => {
    it('should visit localhost', () => {
        cy.visit('http://localhost:3000');
        cy.url().should('contain', 'localhost');
    });
    it('should add formElement after click', () => {
        cy.contains('Number').click();
        cy.get('[data-cy=text-field]').should('be.visible');
    });
    it('should allow typing', () => {
        cy.get('[data-cy=text-field]')
            .type('ahoj1')
            .should('have.value', '1');
    });
    it('should duplicate elelement', () => {
        cy.get('[data-cy=action-Copy]').click();
        cy.get('[data-cy=text-field]').should('have.length', 2);
    });
});
