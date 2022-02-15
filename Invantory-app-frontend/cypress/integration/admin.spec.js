/// <reference types="cypress" />

describe("invantor application", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });
  it("Active users Should be able to log in", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("user@user.com");
    cy.get("[data-cy=password-field]").type("password");
    cy.get("#login-button").click();
    cy.contains("Low Stock");
    cy.get("body").children().should("not.contain", "ADMIN");
  });

  it("Admins Should be able to create a new account for staff members to use", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("admin@admin.com");
    cy.get("[data-cy=password-field]").type("password123");
    cy.get("#login-button").click();
    cy.findByRole("tab", { name: "Admin" }).click();
    cy.findByRole("button").click();
    cy.get("[data-cy=username]").type("NEWUSER2");
    cy.get("[data-cy=password]").type("PASSWORD");
    cy.get("[data-cy=passwordconfirmation]").type("PASSWORD");
    cy.findByRole("button", { name: "Submit" }).click();
    cy.get("[data-cy=create-user]").parent().click();
  });

  it("Admins SHOULD be able to deactivate users and deactivated users cannot log in.", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("admin@admin.com");
    cy.get("[data-cy=password-field]").type("password123");
    cy.get("#login-button").click();
    cy.findByRole("tab", { name: "Admin" }).click();
    cy.findByRole("rowheader", { name: "user@user.com" })
      .get("[data-cy=check-box]")
      .findByRole("checkbox")
      .click();
    cy.findByRole("tab", { name: "Sign Out" }).click();
    cy.get("[data-cy=username-field]").type("user@user.com");
    cy.get("[data-cy=password-field]").type("password");
    cy.get("#login-button").click();
    cy.get("#banner-div")
      .children()
      .should("contain", "Invalid Login Details")
      .and("be.visible");
  });
});
