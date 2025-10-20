import { useState } from "react";
import NavBarr from "../../components/NavBarr";
import SubBarr from "../../components/SubBarr";

function Agendamento() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    servico: "",
    data: "",
    hora: "",
    observacoes: "",
  });
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
    <div className="bg-gray-950 min-h-screen w-full text-white">
      <NavBarr />
      <SubBarr />

      {/* HERO */}
      <section className="py-20 text-center bg-gray-900 border-b-2 border-orange-500">
        <h1 className="text-5xl font-bold text-orange-500 mb-4">Agendamento Online</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Agende o reparo do seu dispositivo de forma rápida e prática. 
          Escolha o serviço, a melhor data e hora para você, e deixe o resto conosco.
        </p>
      </section>

      {/* ETAPAS */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-green-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-wrench text-4xl mb-3 text-green-400"></i>
          <h3 className="text-lg font-bold text-orange-500">1. Escolha o serviço</h3>
          <p className="text-gray-300">Selecione o tipo de reparo que precisa.</p>
        </div>

        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-blue-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-calendar text-4xl mb-3 text-blue-400"></i>
          <h3 className="text-lg font-bold text-orange-500">2. Defina data e hora</h3>
          <p className="text-gray-300">Escolha o melhor dia e horário para você.</p>
        </div>

        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow p-6 text-center 
          transition-all duration-[160ms] ease-in-out hover:bg-yellow-600 hover:scale-110 cursor-pointer">
          <i className="bx bx-check-circle text-4xl mb-3 text-yellow-400"></i>
          <h3 className="text-lg font-bold text-orange-500">3. Confirme</h3>
          <p className="text-gray-300">Receba a confirmação do seu agendamento.</p>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gray-900 border-2 border-orange-500 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Agende seu reparo</h2>
          {enviado && (
            <div className="bg-green-700 text-white p-3 rounded mb-4 border border-green-400 text-center">
              ✅ Agendamento realizado com sucesso!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Tipo de Serviço</label>
              <select
                name="servico"
                value={formData.servico}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Selecione</option>
                <option value="tela">Troca de Tela</option>
                <option value="bateria">Troca de Bateria</option>
                <option value="software">Problema de Software</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Data</label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Observações</label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border-2 border-gray-600 text-white rounded-lg bg-gray-800 focus:ring-2 focus:ring-green-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg border-2 border-orange-500 transition w-full"
            >
              Confirmar Agendamento
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900 py-16 px-6 border-t-2 border-orange-500">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Dúvidas Frequentes</h2>
          <ul className="space-y-6 text-gray-300">
            <li className="flex items-start gap-3">
              <i className="bx bx-time text-green-400 text-2xl"></i>
              <div>
                <strong className="text-white">Quanto tempo leva o reparo?</strong><br />
                Em média, de 1 a 3 dias úteis, dependendo do serviço.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="bx bx-shield text-blue-400 text-2xl"></i>
              <div>
                <strong className="text-white">Os reparos têm garantia?</strong><br />
                Sim! Garantia mínima de 90 dias para serviços realizados.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <i className="bx bx-money text-yellow-400 text-2xl"></i>
              <div>
                <strong className="text-white">Como posso pagar?</strong><br />
                Aceitamos Pix, cartão de crédito e débito.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 text-center bg-gradient-to-r from-green-700 via-green-600 to-gray-900 border-t-2 border-orange-500">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
          Precisa de ajuda urgente?
        </h2>
        <a
          href="https://wa.me/5585988640696"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold border-2 border-orange-500 inline-block transition-all duration-200 hover:scale-105"
        >
          Falar no WhatsApp
        </a>
      </section>
    </div>
  );
}

export default Agendamento;
