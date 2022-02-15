/// <reference types="cypress" />

describe("invantor application", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to is it the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visit(`${Cypress.config("baseUrl")}`);
    cy.clearLocalStorage();
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("admin@admin.com");
    cy.get("[data-cy=password-field]").type("password123");
    cy.get("#login-button").click();
    cy.findByRole("tab", { name: "Drinks" }).click();
  });

  it("Drink should NOT be created with Missing Name", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Name can't be blank")
      .and("be.visible");
  });

  it("Drink should NOT be created with Missing Alcohol", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry");
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Alcohol must exist")
      .and("be.visible");
  });

  it("Drink should NOT be created with Missing Alcohol Amount", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry");
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Alcohol amount can't be blank")
      .and("be.visible");
  });


  it("Drink should NOT be created with Missing Mixer", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry");
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Mixer must exist")
      .and("be.visible");
  });

  it("Drink should NOT be created with Missing Mixer", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry");
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Mixer amount can't be blank")
      .and("be.visible");
  });

  it("Drink SHOULD be created", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry");
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Successfully Created")
      .and("be.visible");
  });
  
  it("Second drink SHOULD be created", () => {
    cy.findByRole("button", { name: "Create" }).click();
    cy.findByRole("textbox", { name: "Name" }).type("New_Drink_Entry_2");
    cy.get("#alcoholid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Alcohol Amount" }).type("100");
    cy.get("#mixerid").click();
    cy.findByRole("listbox", { tabindex: -1 }).click();
    cy.findByRole("textbox", { name: "Mixer Amount" }).type("100");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Successfully Created")
      .and("be.visible");
  });
  
it("Edit button SHOULD bring up the edit modal when clicked", () => {
    cy.findByRole("button", { name: "Show" }).click();
    cy.get('[aria-label="simple table"]')
      .contains('tr', 'New_Drink_Entry')
      .find("[data-cy=edit-button]")
      .click();
  // cy.get("#MuiBox-root css-1acyv19")
    // .should('be.visable')
});
  
it("Edit should NOT be successful, duplicate error", () => {
  cy.findByRole("button", { name: "Show" }).click();
    cy.get('[aria-label="simple table"]')
      .contains('tr', 'New_Drink_Entry')
      .find("[data-cy=edit-button]")
      .click();
   cy.get("[data-cy=edit-name]").clear().type("New_Drink_Entry_2");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Name has already been taken")
      .and("be.visible");
});
  
it("Edit should successfully edit alcohol amount", () => {
  cy.findByRole("button", { name: "Show" }).click();
    cy.get('[aria-label="simple table"]')
      .contains('tr', 'New_Drink_Entry')
      .find("[data-cy=edit-button]")
      .click();
   cy.get("[data-cy=edit-alcohol-amount]").clear().type("101");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Successfully Updated")
      .and("be.visible");
});
  
  it("Edit SHOULD successfully edit mixer amount", () => {
    cy.findByRole("button", { name: "Show" }).click();
    cy.get('[aria-label="simple table"]')
      .contains('tr', 'New_Drink_Entry')
      .find("[data-cy=edit-button]")
      .click();
    cy.get("[data-cy=edit-mixer-amount]").clear().type("101");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Successfully Updated")
      .and("be.visible");
  });

  it("Delete SHOULD successfully edit mixer amount", () => {
  cy.findByRole("button", { name: "Show" }).click();
    cy.get('[aria-label="simple table"]')
      .contains('tr', 'New_Drink_Entry')
      .find("[data-cy=edit-button]")
      .click();
   cy.get("[data-cy=edit-mixer-amount]").clear().type("101");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.findByRole("alert")
      .should("contain", "Successfully Updated")
      .and("be.visible");
});
});
``;
