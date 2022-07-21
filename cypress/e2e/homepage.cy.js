describe("home page functionality", () => {
  it.skip("should login as a new user", () => {
    cy.fixture("users").then((users) => {
      cy.loginWithCognitoUI(users.newUser.username, Cypress.env("qaPassword"));
      cy.visit("/");
      cy.getBySel("posts-count").should("have.text", 2);
    });
  });

  it("should render posts using SSR", () => {
    cy.visit("/");
    cy.getBySel("posts-count").should("have.text", 2);

    cy.getBySelLike("post-").should("have.length", 2);
  });
});
