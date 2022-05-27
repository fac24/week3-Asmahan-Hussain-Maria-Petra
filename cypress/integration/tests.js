const { idleTimeoutMillis } = require("pg/lib/defaults");


// beforeEach(() => {
//     cy.task("resetDb");
// });


//server route tests
describe("Page navigation", () => {
    it("can navigate to homepage", () => {
      cy.visit("/");
    });

    it("can navigate to sign-up page", () => {
        cy.visit("/sign-up");
    });

    it("can navigate to login page", () => {
        cy.visit("/login");
    });

    it("can navigate to add posts page", () => {
        cy.visit("/add-post");
    });

    it("can navigate to posts page", () => {
        cy.visit("/view-posts");
    });
    });


//home page links
describe ("Home page links work", () => {
it("login link works", () => {
    cy.visit("/");
    cy.get('.login-link').click()
});

it("sign-up link works", () => {
    cy.visit("/");
    cy.get('.signup-link').click()
})
})


//sign-up page test
describe ("sign up page tests", () => {
it("can allow users to sign up", () => {
    cy.visit("/sign-up");
    cy.get("#username").find("input[name='email']").type("TestUser");
    cy.get("#email").find("input[name='username']").type("test@email.com");
    cy.get("#password").find("input[name='password']").type("password123");
    cy.get('.button').submit();
    cy.contains("TestUser")
})
})


//login page test
describe ("sign up page tests", () => {
    it("can allow users to sign up", () => {
        cy.get("#email").find("input[name='username']").type("test@email.com");
        cy.get("#password").find("input[name='password']").type("password123");
        cy.get('.login-btn').submit();
        cy.contains("TestUser")
    })
    })


    //delete test


//     //add posts test
// describe ("sign up page tests", () => {
//     it("can allow users to sign up", () => {
//         cy.get("#email").find("input[name='username']").type("test@email.com");
//         cy.get("#password").find("input[name='password']").type("password123");
//         cy.get('.login-btn').submit();
//         cy.contains("TestUser")
//     })
//     })


after(() => {
    cy.task("resetDb");
});

