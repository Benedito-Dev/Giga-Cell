const crypto = require('crypto');

class Celular {
  constructor({
    id,
    marca,
    modelo,
    imagemUrl,
    sistema_operacional,
    armazenamento_gb,
    ram_gb,
    preco,
    lancamento,
    estoque
  }) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.imagemUrl = imagemUrl;
    this.sistema_operacional = sistema_operacional;
    this.armazenamento_gb = armazenamento_gb;
    this.ram_gb = ram_gb;
    this.preco = preco;
    this.lancamento = lancamento;
    this.estoque = estoque;
  }

  toJSON() {
    return {
      id: this.id,
      marca: this.marca,
      modelo: this.modelo,
      imagemUrl: this.imagemUrl,
      sistema_operacional: this.sistema_operacional,
      armazenamento_gb: this.armazenamento_gb,
      ram_gb: this.ram_gb,
      preco: this.preco,
      lancamento: this.lancamento,
      estoque: this.estoque
    };
  }

  toAuthJSON() {
    return {
      id: this.id,
      marca: this.marca,
      modelo: this.modelo,
      preco: this.preco,
      estoque: this.estoque,
      imagemUrl: this.imagemUrl,
      sistema_operacional: this.sistema_operacional
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

module.exports = Celular;