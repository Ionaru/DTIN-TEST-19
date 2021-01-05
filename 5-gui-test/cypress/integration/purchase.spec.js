describe('Purchase', () => {

    const getRandomItemFromArray = (items) => items[Math.floor(Math.random() * items.length)];
    const getRandomNumber = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;

    beforeEach(() => {
        cy.visit('/');
    });

    after(() => {
        cy.clearCookies();
    });

    it('can add an item to the basket', () => {

        const product = 'Smartphone';
        const productPrice = '100.00';

        // Log in
        cy.login(Cypress.config().user.email, Cypress.config().user.password);

        // Search for product
        cy.get('.search-box form #small-searchterms').type(product);
        cy.get('.search-box form').submit();

        // Check search results
        cy.get('.search-results .product-item').first().should('contain', product);

        // Navigate to product page
        cy.get('.search-results .product-item img').first().click();

        // Check product information
        cy.url().should('eq', `${Cypress.config().baseUrl}/smartphone`);
        cy.get('.product-essential .product-name').should('contain', product);
        cy.get('.product-essential .product-price').should('contain', productPrice);

        // Add product to cart
        cy.get('.product-essential .add-to-cart-button').click();

        // Check that product is in shopping cart
        cy.get('#bar-notification.success').should('contain', 'The product has been added to your shopping cart');
        cy.get('.header-links #topcartlink .cart-qty').should('contain', '(1)');

        // Navigate to shopping cart
        cy.get('.header-links #topcartlink a').click();

        // Check shopping cart information
        cy.get('.cart .cart-item-row .product').first().should('contain', product);
        cy.get('.cart .cart-item-row .product-unit-price').first().should('contain', productPrice);
        cy.get('.cart .cart-item-row .qty input').first().should('have.value', 1);
        cy.get('.cart .cart-item-row .subtotal').first().should('contain', productPrice);
        cy.get('.totals .cart-total .product-price').first().should('contain', productPrice);
        cy.get('.totals .cart-total .product-price.order-total').should('contain', productPrice);

        // Remove product from cart
        cy.get('.cart .cart-item-row .remove-from-cart input').first().check();
        cy.get('.update-cart-button').click();

        //Check that cart is empty
        cy.get('.header-links #topcartlink .cart-qty').should('contain', '(0)');
        cy.get('.order-summary-content').should('contain', 'Your Shopping Cart is empty!');

        //Log out
        cy.get('.header .ico-logout').click();
    });

    it('can add a random amount of two items to the basket', () => {

        cy.login(Cypress.config().user.email, Cypress.config().user.password);

        // Get configuration
        const products = [
            {
                name: getRandomItemFromArray(Cypress.config().productSets[0]),
                amount: getRandomNumber(Cypress.config().productAmountMin, Cypress.config().productAmountMax),
            },
            {
                name: getRandomItemFromArray(Cypress.config().productSets[1]),
                amount: getRandomNumber(Cypress.config().productAmountMin, Cypress.config().productAmountMax),
            },
        ];

        for (const product of products) {

            // Search for product
            cy.get('.search-box form #small-searchterms').type(product.name);
            cy.get('.search-box form').submit();

            // Check search results
            cy.get('.search-results .product-item').first().should('contain', product.name);

            // Navigate to product page
            cy.get('.search-results .product-item img').first().click();

            // Check product information
            cy.get('.product-essential .product-name').should('contain', product.name);

            // Get price
            cy.get('.product-essential .product-price').invoke('text').then((price) => {
                cy.wrap(Number(price)).as(`${product.name}_price`);
            });

            // Set quantity
            cy.get('.product-essential .qty-input').clear().type(product.amount.toString());

            // Add product to cart
            cy.get('.product-essential .add-to-cart-button').click();
        }

        // Navigate to shopping cart
        cy.get('.header-links #topcartlink a').click();

        cy.get(`@${products[0].name}_price`).then((productOnePrice) => {
            cy.get(`@${products[1].name}_price`).then((productTwoPrice) => {

                // Do price/amount calculations
                const productOnePriceTotal = productOnePrice * products[0].amount;
                const productTwoPriceTotal = productTwoPrice * products[1].amount;
                const priceTotal = productOnePriceTotal + productTwoPriceTotal;

                // Check products in cart
                cy.get('.cart .cart-item-row').then((rows) => {
                    cy.wrap(rows[0]).find('.product').should('contain', products[0].name);
                    cy.wrap(rows[0]).find('.product-unit-price').should('contain', productOnePrice);
                    cy.wrap(rows[0]).find('.qty input').should('have.value', products[0].amount);
                    cy.wrap(rows[0]).find('.product-subtotal').should('contain', productOnePriceTotal);

                    cy.wrap(rows[1]).find('.product').should('contain', products[1].name);
                    cy.wrap(rows[1]).find('.product-unit-price').should('contain', productTwoPrice);
                    cy.wrap(rows[1]).find('.qty input').should('have.value', products[1].amount);
                    cy.wrap(rows[1]).find('.product-subtotal').should('contain', productTwoPriceTotal);
                });

                // Check total
                cy.get('.totals .cart-total .product-price').not('.order-total').should('contain', priceTotal);
            });
        });

        // Remove products from cart
        cy.get('.cart .cart-item-row .remove-from-cart input').each(($element) => {
            cy.wrap($element).check();
        });
        cy.get('.update-cart-button').click();

        //Check that cart is empty
        cy.get('.header-links #topcartlink .cart-qty').should('contain', '(0)');
        cy.get('.order-summary-content').should('contain', 'Your Shopping Cart is empty!');

        //Log out
        cy.get('.header .ico-logout').click();
    });
});
