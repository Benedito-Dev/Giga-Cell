// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Banner1 from '../images/Banners/4.png';
import Banner2 from '../images/Banners/7.png';
import Banner3 from '../images/Banners/9.png';

function Banner() {
    return (
        <div className="banner bg-gray-200 h-[90vh] w-full flex justify-center items-center flex-col">
            <Swiper
                modules={[Navigation, Autoplay]} // Adiciona os módulos de navegação e autoplay
                navigation // Habilita as setas de navegação
                autoplay={{ delay: 8000 }} // Configura o autoplay para passar os slides a cada 3 segundos
                loop // Habilita o loop infinito
                className="w-full h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full">
                        <img className='scale-95 rounded-3xl' src={Banner1} alt="Banner 4" />
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full">
                    <img className='scale-95 rounded-3xl' src={Banner2} alt="Banner 4" />
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full">
                    <img className='scale-95 rounded-3xl' src={Banner3} alt="Banner 4" />
                    </div>
                </SwiperSlide>

                {/* Adicione mais slides conforme necessário */}
            </Swiper>
        </div>
    );
}

export default Banner;