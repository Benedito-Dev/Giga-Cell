const crypto = require('crypto');

class Acessorio {
  constructor({
    id,
    nome,
    tipo,
    marca,
    compatibilidade,
    imagemUrl,
    material,
    cores_disponiveis,
    preco,
    estoque,
    data_cadastro,
    garantia_meses
  }) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.marca = marca;
    this.compatibilidade = compatibilidade;
    this.imagemUrl = imagemUrl;
    this.material = material;
    this.cores_disponiveis = cores_disponiveis;
    this.preco = preco;
    this.estoque = estoque;
    this.data_cadastro = data_cadastro;
    this.garantia_meses = garantia_meses;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      tipo: this.tipo,
      marca: this.marca,
      compatibilidade: this.compatibilidade,
      imagemUrl: this.imagemUrl,
      material: this.material,
      cores_disponiveis: this.cores_disponiveis,
      preco: this.preco,
      estoque: this.estoque,
      data_cadastro: this.data_cadastro,
      garantia_meses: this.garantia_meses
    };
  }

  toAuthJSON() {
    return {
      id: this.id,
      nome: this.nome,
      tipo: this.tipo,
      marca: this.marca,
      preco: this.preco,
      estoque: this.estoque,
      imagemUrl: this.imagemUrl
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

module.exports = Acessorio;