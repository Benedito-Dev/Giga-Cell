import { useState } from "react";
import NavBarr from "../../components/NavBarr";
import SubBarr from "../../components/SubBarr";

function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="bg-black text-white min-h-screen w-full">
      <NavBarr />
      <SubBarr />

      {/* HERO */}
      <section className="py-20 text-center bg-gradient-to-r from-orange-600 to-orange-500">
        <h1 className="text-5xl font-bold text-white mb-4">Fale Conosco</h1>
        <p className="text-lg text-gray-100 max-w-2xl mx-auto">
          Estamos prontos para ajudar! Entre em contato pelos nossos canais ou
          preencha o formulário abaixo.
        </p>
      </section>

      {/* INFORMAÇÕES DE CONTATO */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-green-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-map text-4xl mb-3 text-orange-500"></i>
          <h3 className="text-lg font-bold text-orange-500">Endereço</h3>
          <p className="text-gray-300">Rua José Hipólito, 264 - Fortaleza/CE</p>
        </div>

        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-blue-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-phone text-4xl mb-3 text-orange-500"></i>
          <h3 className="text-lg font-bold text-orange-500">Telefone</h3>
          <p className="text-gray-300">(11) 9999-9999</p>
        </div>

        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-purple-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-envelope text-4xl mb-3 text-orange-500"></i>
          <h3 className="text-lg font-bold text-orange-500">E-mail</h3>
          <p className="text-gray-300">contato@gigacell.com</p>
        </div>

        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-green-600 hover:scale-110 cursor-pointer">
          <i className="bx bxl-whatsapp text-4xl mb-3 text-orange-500"></i>
          <h3 className="text-lg font-bold text-orange-500">WhatsApp</h3>
          <p className="text-gray-300">Clique e fale com a gente!</p>
        </div>
      </section>

      {/* MAPA */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="rounded-xl overflow-hidden border-2 border-orange-500 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.80580287060175!2d-38.49320851851128!3d-3.833166818461656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74f8d1e90eccb%3A0x3c594be259d88274!2sShopping%20Giga%20Mall!5e0!3m2!1spt-BR!2sbr!4v1759595591531!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Perguntas Frequentes</h2>
          <ul className="space-y-6 text-gray-300">
            <li className="flex items-start gap-3">
              <i className="bx bx-package text-orange-500 text-2xl"></i>
              <div>
                <strong>Como acompanho meu pedido?</strong><br />
                Você pode acompanhar diretamente no seu painel de cliente em "Meus pedidos".
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="bx bx-credit-card text-orange-500 text-2xl"></i>
              <div>
                <strong>Quais formas de pagamento aceitam?</strong><br />
                Aceitamos Pix, cartões de crédito e boleto bancário.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="bx bx-truck text-orange-500 text-2xl"></i>
              <div>
                <strong>Qual o prazo de entrega?</strong><br />
                O prazo varia de acordo com sua região, mas em média 5 a 10 dias úteis.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 text-center bg-gradient-to-r from-orange-600 to-orange-500">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Prefere falar direto no WhatsApp?
        </h2>
        <a
          href="https://wa.me/5585988640696"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black transition-all duration-[160ms] hover:scale-110 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold border-2 border-white inline-block"
        >
          Falar no WhatsApp
        </a>
      </section>
    </div>
  );
}

export default Contato;
