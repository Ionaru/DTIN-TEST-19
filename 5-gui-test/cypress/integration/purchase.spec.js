describe('Purchase', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    after(() => {
        cy.clearCookies();
    });

    it('can add an item to the basket', () => {
        // Log in
        cy.login(Cypress.config().user.email, Cypress.config().user.password);

        // Search for product
        cy.get('.search-box form #small-searchterms').type('Smartphone');
        cy.get('.search-box form').submit();

        // Check search results
        cy.get('.search-results .product-item').first().contains('Smartphone');

        // Navigate to product page
        cy.get('.search-results .product-item img').first().click();

        // Check product information
        cy.url().should('eq', `${Cypress.config().baseUrl}/smartphone`);
        cy.get('.product-essential .product-name').contains('Smartphone');
        cy.get('.product-essential .product-price').contains('100.00');

        // Add product to cart
        cy.get('.product-essential .add-to-cart-button').click();

        // Check that product is in shopping cart
        cy.get('#bar-notification.success').contains('The product has been added to your shopping cart');
        cy.get('.header-links #topcartlink .cart-qty').contains('(1)');

        // Navigate to shopping cart
        cy.get('.header-links #topcartlink a').click();

        // Check shopping cart information
        cy.get('.cart .cart-item-row .product').first().contains('Smartphone');
        cy.get('.cart .cart-item-row .product-unit-price').first().contains('100.00');
        cy.get('.cart .cart-item-row .qty input').first().should('have.value', 1);
        cy.get('.cart .cart-item-row .subtotal').first().contains('100.00');
        cy.get('.totals .cart-total .product-price').first().contains('100.00');
        cy.get('.totals .cart-total .product-price.order-total').contains('100.00');

        // Remove product from cart
        cy.get('.cart .cart-item-row .remove-from-cart input').first().check();
        cy.get('.update-cart-button').click();

        //Check that cart is empty
        cy.get('.header-links #topcartlink .cart-qty').contains('(0)');
        cy.get('.order-summary-content').contains('Your Shopping Cart is empty!');

        //Log out
        cy.get('.header .ico-logout').click();
    });
});
