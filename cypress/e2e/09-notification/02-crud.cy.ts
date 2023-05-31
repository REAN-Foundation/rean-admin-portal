/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
    const filePath = 'image.jpg';
		cy.visit('http://localhost:5173/');

		cy.fixture('login').then((data) => {
			const ln = new login();
      cy.wait(3000)
			ln.setUserName(data.username);
			ln.setPassword(data.password);
			ln.clickLogin();
		});
    cy.wait(3000)
      cy.get('.app-bar-slot-lead > .flex').click()
      cy.wait(2000)
      cy.contains('Miscellaneous').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Notifications').click()
      cy.wait(2000)
      cy.get('.absolute > .btn').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('You can now limit credit card numbers by card type and country.')
      cy.wait(2000)
      cy.get('input[name=body]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      cy.wait(2000)
      cy.get('select[name=type]').select('Auto')
      cy.wait(2000)
      cy.get('input[name=broadcastToAll]').check().should('be.checked')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > .text-primary-primary-500').click()
    })
	});
 

