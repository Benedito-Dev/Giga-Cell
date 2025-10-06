class Items {
  constructor({
    id,
    pedido_id,
    produto_id,
    nome,
    quantidade,
    preco_unitario,
    subtotal
  }) {
    this.id = id;
    this.pedido_id = pedido_id;
    this.produto_id = produto_id;
    this.nome = nome;
    this.quantidade = quantidade;
    this.preco_unitario = preco_unitario;
    this.subtotal = subtotal;
  }

  // Representação completa para retorno de dados
  toJSON() {
    return {
      id: this.id,
      pedido_id: this.pedido_id,
      produto_id: this.produto_id,
      nome: this.nome,
      quantidade: this.quantidade,
      preco_unitario: this.preco_unitario,
      subtotal: this.subtotal
    };
  }

  // Versão resumida, útil para exibição em carrinhos ou listagens
  toSummaryJSON() {
    return {
      id: this.id,
      nome: this.nome,
      quantidade: this.quantidade,
      subtotal: this.subtotal
    };
  }
}

module.exports = Items;
