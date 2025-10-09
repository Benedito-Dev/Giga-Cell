const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou SMTP customizado
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmailConfirmacao(destinatario, pedido) {
  const itensHTML = pedido.itens.map(
    (item) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.nome}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantidade}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: right;">R$ ${Number(item.preco_unitario).toFixed(2)}</td>
      </tr>
    `
  ).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 0; color: #333;">
      <div style="max-width: 600px; background: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Pedido Confirmado! 🎉</h2>
        </div>

        <div style="padding: 24px;">
          <p style="font-size: 16px;">Olá,</p>
          <p style="font-size: 15px; line-height: 1.5;">
            Obrigado por comprar conosco! Seu pedido foi recebido com sucesso e está sendo processado.
          </p>

          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Status:</strong> ${pedido.status}</p>
            <p style="margin: 4px 0;"><strong>Forma de pagamento:</strong> ${pedido.forma_pagamento}</p>
            <p style="margin: 4px 0;"><strong>Total:</strong> <span style="color: #16a34a;">R$ ${Number(pedido.total).toFixed(2)}</span></p>
          </div>

          <h3 style="margin-top: 24px; font-size: 18px; color: #1e3a8a;">Itens do Pedido</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="text-align: left; padding: 8px 12px;">Produto</th>
                <th style="text-align: center; padding: 8px 12px;">Qtd</th>
                <th style="text-align: right; padding: 8px 12px;">Preço</th>
              </tr>
            </thead>
            <tbody>
              ${itensHTML}
            </tbody>
          </table>

          <div style="text-align: center; margin-top: 32px;">
            <a href="http://localhost:5173/account/meus-pedidos"
              style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold;">
              Ver meus pedidos
            </a>
          </div>

          <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 32px;">
            Caso tenha dúvidas, entre em contato com nosso suporte.<br/>
            <span style="color: #2563eb;">Equipe GigaCell</span>
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Loja GigaCell" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: `Confirmação do seu pedido #${pedido.id}`,
    html,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 E-mail de confirmação enviado para ${destinatario}`);
}

module.exports = { enviarEmailConfirmacao };
