const { it } = require("mocha");

describe("Transações", () => {
  // Hooks
  beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/");
  });

  it("Cadastrar uma entrada", () => {
    criarTransacao("Frella da semana", 300);

    // --- Asserção
    cy.get("tbody tr td.description").should("have.text", "Frella da semana");
  });

  // Transação de saída
  it("Cadastrar uma saída", () => {
    criarTransacao("Cinema", -80);
    cy.get("tbody tr td.description").should("have.text", "Cinema");
  });

  it("Excluir transação", () => {
    criarTransacao("Mesada", 200);
    criarTransacao("Frellas", 100);

    cy.contains(".description", "Frellas").parent().find("img").click();
  });
});

// Função auxiliadora
function criarTransacao(descricao, valor) {
  cy.contains("+ Nova Transação").click();
  cy.get("#description").type(descricao);
  cy.get("#amount").type(valor);
  cy.get("#date").type("2024-03-28");
  cy.contains("button", "Salvar").click();
}
