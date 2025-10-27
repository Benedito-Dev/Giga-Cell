import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import Banner1 from '../images/Banners/4.png';
import Banner2 from '../images/Banners/7.png';
import Banner3 from '../images/Banners/9.png';

function Banner() {
    return (
        <div className="banner bg-gray-200 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full flex justify-center items-center">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true 
                }}
                autoplay={{ delay: 8000 }}
                loop
                className="w-full h-full relative"
            >
                <SwiperSlide>
                    <div className="flex justify-center items-center h-full p-2 sm:p-4">
                        <img 
                            className='w-full h-full object-contain sm:object-cover max-w-none sm:max-w-[95%] rounded-lg sm:rounded-3xl lg:rounded-3xl' 
                            src={Banner1} 
                            alt="Banner promocional 1" 
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="flex justify-center items-center h-full p-2 sm:p-4">
                        <img 
                            className='w-full h-full object-contain sm:object-cover max-w-none sm:max-w-[95%] rounded-lg sm:rounded-3xl lg:rounded-3xl' 
                            src={Banner2} 
                            alt="Banner promocional 2" 
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="flex justify-center items-center h-full p-2 sm:p-4">
                        <img 
                            className='w-full h-full object-contain sm:object-cover max-w-none sm:max-w-[95%] rounded-lg sm:rounded-3xl lg:rounded-3xl' 
                            src={Banner3} 
                            alt="Banner promocional 3" 
                        />
                    </div>
                </SwiperSlide>

                {/* Botões de navegação customizados */}
                <div className="swiper-button-prev !hidden sm:!flex !text-white !text-2xl !left-4 !w-12 !h-12 !bg-black !bg-opacity-50 !rounded-full after:!text-lg !items-center !justify-center"></div>
                <div className="swiper-button-next !hidden sm:!flex !text-white !text-2xl !right-4 !w-12 !h-12 !bg-black !bg-opacity-50 !rounded-full after:!text-lg !items-center !justify-center"></div>
            </Swiper>
        </div>
    );
}

export default Banner;