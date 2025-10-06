import NavBarr from "../../components/NavBarr";
import FilterSystem from "../../components/Products/Filter";
import SubBarr from "../../components/SubBarr";
import ProductsGrid from "../../components/Products/Itens";

function Tablets() {
    return (
        <div className="Produtos min-h-screen flex flex-col">
            <NavBarr />
            <SubBarr />
            
            <div className="flex flex-col lg:flex-row flex-1 w-full bg-gray-900">
                {/* Filtros no canto superior esquerdo (fixo em telas grandes) */}
                <div className="lg:sticky lg:top-20 lg:self-start lg:ml-4 lg:mt-4 w-[20vw]">
                    <FilterSystem />
                </div>
                
                {/* Conteúdo principal com produtos */}
                <div className="flex-1 lg:ml-4">
                    <ProductsGrid />
                </div>
            </div>
        </div>
    );
}

export default Tablets;