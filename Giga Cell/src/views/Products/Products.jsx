// Products.js (componente pai)
import { useState } from "react";
import NavBarr from "../../components/NavBarr";
import FilterSystem from "../../components/Products/Filter";
import SubBarr from "../../components/SubBarr";
import ProductsGrid from "../../components/Products/Itens";
import FloatingCart from '../../components/Cart'

function Products() {
    // Estado que guarda os filtros selecionados
    const [filtros, setFiltros] = useState({});

    return (
        <div className="Produtos min-h-screen flex flex-col">
            <NavBarr />
            <SubBarr />
            <FloatingCart />
            
            <div className="flex flex-col lg:flex-row flex-1 w-full bg-gray-900">
                {/* Filtros no canto superior esquerdo */}
                <div className="lg:sticky lg:top-20 lg:self-start lg:ml-4 lg:mt-4 w-[20vw]">
                    <FilterSystem onChangeFilters={setFiltros} />
                </div>
                
                {/* Conteúdo principal com produtos */}
                <div className="flex-1 lg:ml-4">
                    <ProductsGrid filtros={filtros} />
                </div>
            </div>
        </div>
    );
}

export default Products;