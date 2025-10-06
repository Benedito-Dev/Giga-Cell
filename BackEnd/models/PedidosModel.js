const crypto = require('crypto');

class Pedido {
  constructor({
    id,
    usuario_id,
    data,
    status,
    total,
    forma_pagamento
  }) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.data = data;
    this.status = status;
    this.total = total;
    this.forma_pagamento = forma_pagamento;
  }

  toJSON() {
    return {
      id: this.id,
      usuario_id: this.usuario_id,
      data: this.data,
      status: this.status,
      total: this.total,
      forma_pagamento: this.forma_pagamento
    };
  }

  toSummaryJSON() {
    return {
      id: this.id,
      status: this.status,
      total: this.total,
      data: this.data
    };
  }

  /**
   * Retorna os dados com o valor total criptografado
   * (por exemplo, para exibição pública ou logs)
   */
  toJSONWithEncryptedTotal(secret) {
    const base = this.toJSON();
    const key = secret || process.env.ORDER_SECRET || 'fallback-order-secret';

    let totalCriptografado = null;
    if (this.total) {
      totalCriptografado = crypto
        .createHmac('sha256', key)
        .update(String(this.total))
        .digest('hex');
    }

    return {
      ...base,
      total: totalCriptografado
    };
  }
}

module.exports = Pedido;
