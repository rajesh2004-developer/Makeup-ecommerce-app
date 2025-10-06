'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';

export function CarouselHero() {
  const [carouselData, setCarouselData] = useState([]);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch('/api/carousel');
        const data = await response.json();
        const ModifiedData = data.slice(0, 5);
        setCarouselData(ModifiedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCarouselData();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="min-h-screen">
          {carouselData.map((item, index) => (
            <CarouselItem key={item.id || index} className="min-h-screen">
              <div className="relative w-full min-h-screen">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      item.image_link || item.api_featured_image
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                    <div className="text-white space-y-4 md:space-y-6">
                      <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium uppercase tracking-wider">
                        {item.brand || 'Brand'}
                      </div>

                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {item.name}
                      </h1>

                      <p className="text-base md:text-lg lg:text-xl text-gray-200 line-clamp-3 md:line-clamp-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
                          ${item.price || '0.0'}
                        </div>
                        {item.rating && (
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-sm md:text-base">
                              {item.rating}/5
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                        {/* <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 text-sm md:text-base">
                          Shop Now
                        </button> */}
                        <button className="px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white hover:bg-white/20 transition-all text-sm md:text-base">
                          Learn More
                        </button>
                      </div>

                      {item.product_colors &&
                        item.product_colors.length > 0 && (
                          <div className="flex items-center gap-3 pt-2 md:pt-4">
                            <span className="text-xs md:text-sm text-gray-300">
                              Colors:
                            </span>
                            <div className="flex gap-2">
                              {item.product_colors
                                .slice(0, 5)
                                .map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color.hex_value }}
                                    title={color.colour_name}
                                  />
                                ))}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="hidden md:flex justify-center items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                        <img
                          src={item.image_link || item.api_featured_image}
                          alt={item.name}
                          className="relative w-64 h-64 lg:w-96 lg:h-96 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {carouselData.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all ${
                        idx === index
                          ? 'w-8 md:w-12 bg-white'
                          : 'w-6 md:w-8 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 md:left-8 w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="right-2 md:right-8 w-10 h-10 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </div>
  );
}

export default CarouselHero;
