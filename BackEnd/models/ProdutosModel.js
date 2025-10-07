const crypto = require('crypto');

class Produto {
  constructor({
    id,
    nome,
    imagemUrl,
    preco,
    categoria,
    descricao,
    estoque,
    marca,
    cor,
    armazenamento
  }) {
    this.id = id;
    this.nome = nome;
    this.imagemUrl = imagemUrl;
    this.preco = preco;
    this.categoria = categoria;
    this.descricao = descricao;
    this.estoque = estoque;
    this.marca = marca;
    this.cor = cor;
    this.armazenamento = armazenamento;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      imagemUrl: this.imagemUrl,
      preco: this.preco,
      categoria: this.categoria,
      descricao: this.descricao,
      estoque: this.estoque,
      marca: this.marca,
      cor: this.cor,
      armazenamento: this.armazenamento
    };
  }

  toAuthJSON() {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      estoque: this.estoque,
      imagemUrl: this.imagemUrl,
      categoria: this.categoria
    };
  }

  toJSONWithEncryptedPreco(secret) {
    const base = this.toJSON();
    const key = secret || process.env.SHOW_PRICE_SECRET || 'fallback-secret';

    let precoCriptografado = null;
    if (this.preco) {
      precoCriptografado = crypto
        .createHmac('sha256', key)
        .update(String(this.preco))
        .digest('hex');
    }

    return {
      ...base,
      preco: precoCriptografado
    };
  }
}

module.exports = Produto;