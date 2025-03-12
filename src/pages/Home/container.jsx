import Carrousel from "./Carrousel";
import banner from "../../assets/images/Banners/Banner.png";

function BlockContainer() {
    return (
        <div className="bg-gradient-to-r from-[#d90309] to-[#042fb9] w-full flex overflow-hidden justify-center items-center">
            <img
                src={banner}
                alt="Banner Principal"
                className="transform scale-50 border-radius rounded-3xl" // Reduz o tamanho em 30%
            />
        </div>
    );
}

export default BlockContainer;