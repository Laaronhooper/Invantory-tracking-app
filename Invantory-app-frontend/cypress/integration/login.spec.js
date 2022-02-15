/// <reference types="cypress" />

describe("invantor application", () => {
  it("Login should fail if username is not provided", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=password-field]").type("password");
    cy.get("#login-button").click();
    cy.get("#banner-div")
      .children()
      .should("contain", "Invalid Login Details")
      .and("be.visible");
  });

  it("Login should fail if password is not provided", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("USERNAME");
    cy.get("#login-button").click();
    cy.get("#banner-div")
      .children()
      .should("contain", "Invalid Login Details")
      .and("be.visible");
  });

  it("Admin Login should succeed if correct credentials are provided", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("admin@admin.com");
    cy.get("[data-cy=password-field]").type("password123");
    cy.get("#login-button").click();
    cy.contains("Low Stock");
    cy.findByRole("tab", { name: "Admin" }).should("exist");
  });

  it("User Login should succeed if correct credentials are provided", () => {
    cy.visit("http://localhost:3001/signin");
    cy.get("[data-cy=username-field]").type("user@user.com");
    cy.get("[data-cy=password-field]").type("password");
    cy.get("#login-button").click();
    cy.contains("Low Stock");
    cy.get("body").children().should("not.contain", "ADMIN");
  });
});
