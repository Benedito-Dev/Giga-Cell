import { useState } from "react";
import NavBarr from "../../components/NavBarr";
import FilterSystem from "../../components/Products/Filter";
import SubBarr from "../../components/SubBarr";
import ProductsGrid from "../../components/Products/Itens";
import FloatingCart from '../../components/Cart'

function Tablets() {
    // Estado que guarda os filtros selecionados
    const [filtros, setFiltros] = useState({});

    return (
        <div className="Produtos min-h-screen flex flex-col">
            <NavBarr />
            <SubBarr />
            <FloatingCart />
            
            <div className="flex flex-col lg:flex-row flex-1 w-full bg-gray-900 gap-4 p-4">
                {/* Filtros */}
                <div className="lg:sticky lg:top-4 lg:self-start w-full lg:w-80 lg:min-w-[320px] flex-shrink-0">
                    <FilterSystem onChangeFilters={setFiltros}/>
                </div>
                
                {/* Conteúdo principal com produtos */}
                <div className="flex-1 min-w-0">
                    <ProductsGrid categoria={'tablet'} filtros={filtros} />
                </div>
            </div>
        </div>
    );
}

export default Tablets;