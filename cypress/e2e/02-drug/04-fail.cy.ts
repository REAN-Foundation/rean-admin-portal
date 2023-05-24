/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
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
      // eslint-disable-next-line no-useless-escape
      cy.contains('Clinical').click()
      cy.wait(2000)
      cy.contains('Drugs').click()
      cy.wait(2000)
      cy.get('.absolute > .btn').click()
      cy.wait(2000)
      cy.get('select[name=genericName]').select('Auto')
      cy.wait(2000)
      cy.get('input[name=ingredients]').type('svdsdvsfdfbdf')
      cy.wait(2000)
      cy.get('select[name=strength]').select('Low')
      cy.wait(2000)
      cy.get('input[name=otherCommercialNames]').type('egergerbd')
      cy.wait(2000)
      cy.get('input[name=manufacturer]').type('ergreersdds')
      cy.wait(2000)
      cy.get('input[name=otherInformation]').type('sdufdfsssds')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(4000)
      cy.get(':nth-child(1) > .text-primary-primary-500').click()
    })
	});
 

