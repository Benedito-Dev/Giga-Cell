import NavBarr from '../components/NavBarr'
import Banner from '../containers/Banner'
import Footer from '../containers/Footer'
import Acessorios from '../containers/Acessorios'
import SubBarr from '../components/SubBarr'
import Help from '../components/Help'
import CellPhones from '../containers/CellPhones'
import FloatingCart from '../components/Cart'

function Home() {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header Section */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
                <NavBarr />
                <SubBarr />
            </header>

            {/* Help Bar */}
            <section className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                <Help />
            </section>

            {/* Hero Banner */}
            <section className="relative hidden md:block">
                <Banner />
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 to-transparent pointer-events-none"></div>
            </section>

            {/* Main Content */}
            <main className="relative">
                {/* Products Sections */}
                <div className="">
                    {/* CellPhones Section */}
                    <section className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 via-transparent to-orange-50/30 pointer-events-none"></div>
                        <CellPhones />
                    </section>

                    {/* Acessorios Section */}
                    <section className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 pointer-events-none"></div>
                        <Acessorios />
                    </section>
                </div>

                {/* Call to Action Section */}
                <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-12 sm:py-16 lg:py-20 mt-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                            Encontre o Produto Perfeito
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Explore nossa coleção completa de celulares, tablets e acessórios com os melhores preços do mercado
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="/produtos" className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                                Ver Todos os Produtos
                            </a>
                            <a href="/contato" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300">
                                Fale Conosco
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
            
            {/* Floating Elements */}
            <FloatingCart />
        </div>
    )
}

export default Home;