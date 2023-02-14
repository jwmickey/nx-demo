/// <reference types="cypress" />
import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { mount, MountConfig } from 'cypress/angular';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const MOUNT_ALIAS = '__mountedComponent';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      byData(dataCy: string): Chainable<JQuery<HTMLElement>>;
      mount: typeof mountWithAlias;
      detectChanges(): void;
    }
  }
}

function mountWithAlias<T>(
  component: string | Type<T>,
  config?: MountConfig<T>
) {
  return mount<T>(component, config).as(MOUNT_ALIAS);
}

Cypress.Commands.add('mount', mountWithAlias);

Cypress.Commands.add('byData', (dataCy: string) => {
  return cy.get(`[data-cy="${dataCy}"]`);
});

Cypress.Commands.add('detectChanges', () => {
  cy.get<{ fixture: ComponentFixture<unknown> }>(`@${MOUNT_ALIAS}`).then(
    ({ fixture }) => {
      console.log(fixture.detectChanges());
    }
  );
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
