import React from "react";
import Footer from "../../containers/Footer";
import NavBarr from "../../components/NavBarr";
import SubBarr from "../../components/SubBarr";

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
        <NavBarr />
        <SubBarr />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Sobre a <span className="text-black bg-white px-2 rounded-lg">Giga Cell</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100">
            Conectando você à tecnologia desde 2010. Qualidade, inovação e confiança 
            para transformar sua experiência digital.
          </p>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-xl bg-gray-800 hover:bg-orange-600 transition">
            <h3 className="text-2xl font-bold mb-3">Nossa Missão</h3>
            <p className="text-gray-300">
              Tornar a tecnologia acessível e de qualidade para todos os nossos clientes,
              oferecendo soluções modernas e confiáveis.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800 hover:bg-orange-600 transition">
            <h3 className="text-2xl font-bold mb-3">Nossa Visão</h3>
            <p className="text-gray-300">
              Ser referência nacional em e-commerce de eletrônicos, 
              inovando sempre e priorizando a satisfação do cliente.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800 hover:bg-orange-600 transition">
            <h3 className="text-2xl font-bold mb-3">Nossos Valores</h3>
            <p className="text-gray-300">
              Transparência, confiança, inovação e excelência no atendimento 
              ao cliente, são a base do que fazemos.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-orange-500">Nossa História</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A <span className="font-semibold text-white">Giga Cell</span> nasceu em 2010 com 
              o objetivo de trazer os melhores eletrônicos e acessórios para o mercado 
              brasileiro. Desde então, temos crescido junto com nossos clientes, sempre 
              priorizando qualidade e confiança.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Hoje, contamos com milhares de clientes satisfeitos em todo o Brasil, 
              oferecendo desde smartphones, notebooks até os mais modernos acessórios 
              tecnológicos.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="Nossa equipe trabalhando"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-10">O que dizem nossos clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
              <p className="text-gray-300 mb-4">
                "A Giga Cell sempre entrega qualidade e rapidez. Comprei meu notebook e chegou
                em 2 dias, perfeito!"
              </p>
              <h4 className="font-bold text-white">— João Silva</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
              <p className="text-gray-300 mb-4">
                "Atendimento excelente, me ajudaram a escolher o celular ideal. Recomendo muito!"
              </p>
              <h4 className="font-bold text-white">— Maria Oliveira</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition">
              <p className="text-gray-300 mb-4">
                "Já comprei várias vezes e nunca me decepcionei. Giga Cell é sinônimo de confiança."
              </p>
              <h4 className="font-bold text-white">— Carlos Santos</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Faça parte da nossa história!</h2>
        <p className="text-lg mb-6 text-gray-100">
          Descubra as melhores ofertas em eletrônicos com quem entende de tecnologia.
        </p>
        <a
          href="#"
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Conheça nossos produtos
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
