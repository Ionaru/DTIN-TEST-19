describe('User account', () => {

    const user = {
        username: 'mail+20201117@example.com',
        password: 'Wachtwoord123'
    };

    beforeEach(() => {
        cy.visit('/');
    });

    after(() => {
        cy.clearCookies();
    });

    it('can log in', () => {
        cy.login(user.username, user.password);
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.getCookie('NOPCOMMERCE.AUTH').should('exist');
        cy.get('.header .account').should('have.text', user.username);
        cy.contains('Log out');
    });

    it('can subscribe to the newsletter', () => {
        cy.login(user.username, user.password);
        cy.get('#newsletter-email').type(user.username);
        cy.get('#newsletter-subscribe-button').click();
        cy.get('#newsletter-result-block').should('have.text', 'Thank you for signing up! A verification email has been sent. We appreciate your interest.');
    });

    it('can change gender to female', () => {
        cy.login(user.username, user.password);
        cy.get('.header .account').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/customer/info`);
        cy.get('.account-page #gender-female').click();
        cy.get('.account-page .save-customer-info-button').click();
        cy.reload();
        cy.get('.account-page #gender-female').should('have.attr', 'checked');
        cy.get('.account-page #gender-male').click();
        cy.get('.account-page .save-customer-info-button').click();
        cy.reload();
        cy.get('.account-page #gender-male').should('have.attr', 'checked');
    });

    it('can change email to something else', () => {
        cy.login(user.username, user.password);

        // Change email
        const newEmail = 'test+20201117@example.com';
        cy.get('.header .account').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/customer/info`);
        cy.get('.account-page #Email').clear().type(newEmail);
        cy.get('.account-page .save-customer-info-button').click();
        cy.reload();
        cy.get('.header .account').should('have.text', newEmail);
        cy.get('.account-page #Email').should('have.value', newEmail);

        // Attempt to login with old email
        cy.get('.header .ico-logout').click();
        cy.login(user.username, user.password);
        cy.get('.validation-summary-errors').should('have.text', 'Login was unsuccessful. Please correct the errors and try again.\nNo customer account found\n');

        // Attempt to login with new email
        cy.login(newEmail, user.password);
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        // Restore old email
        cy.get('.header .account').click();
        cy.get('.account-page #Email').clear().type(user.username);
        cy.get('.account-page .save-customer-info-button').click();
    });

    it('can log out', () => {
        cy.login(user.username, user.password);
        cy.get('.header .ico-logout').click();
        cy.getCookie('NOPCOMMERCE.AUTH').should('not.exist');
        cy.contains('Log in');
    });
});
