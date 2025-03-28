import NavBarr from "../components/NavBarr"
import FilterSystem from "../components/Products/Filter"
import SubBarr from "../components/SubBarr"

function Products() {
    return (
        <div className="Produtos">
            <NavBarr />
            <SubBarr />
            <div className="Container mt-10 flex items-center justify-around w-full">
                <FilterSystem />
                <div className="Products">
                    
                </div>
            </div>
        </div>
    )
}

export default Products