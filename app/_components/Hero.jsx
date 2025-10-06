import React from 'react';
import { CarouselHero } from './CarouselHero';
import TopCategory from './TopCategory';
import Products from './Products';
import Footer from './Footer';
const Hero = () => {
  return (
    <div className="mt-5">
      <CarouselHero />
      <TopCategory />
      <Products />
      <Footer/>
    </div>
  );
};

export default Hero;
