import { useContext, useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ProductContext } from '@/context/ProductContext';

const TopCategory = () => {
  const [topCategory, setTopCategory] = useState([]);
  const {products, setProductByFilter, type, setType } =
    useContext(ProductContext);

  const fetchProductsByType = async (type) => {
    try {
      setType(type);
      console.log(type);
      const filterByType = products.filter(
        (product) => product.product_type == type
      );
      setProductByFilter(filterByType);
      console.log(filterByType);
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTopCategoryData = async () => {
      try {
        const response = await fetch('/api/carousel');
        const data = await response.json();
        const categoryWithImages = data
          .filter(
            (item) => item.product_type != null && item.image_link != null
          )
          .map((item) => ({
            product_type: item.product_type,
            image_link: item.image_link,
          }));

        const uniqueCategoryMap = new Map();
        categoryWithImages.forEach((item) => {
          if (!uniqueCategoryMap.has(item.product_type)) {
            uniqueCategoryMap.set(item.product_type, item.image_link);
          }
        });
        const uniqueCategory = Array.from(
          uniqueCategoryMap,
          ([product_type, image_link]) => ({
            product_type,
            image_link,
          })
        ).slice(0, 5);

        console.log(uniqueCategory);
        setTopCategory(uniqueCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopCategoryData();
  }, []);

  const formatCategoryName = (name) => {
    return name
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <div className="w-full py-12 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Top Categories
          </h2>
          <p className="text-gray-600">
            Explore our most popular makeup collections
          </p>
        </div>

        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
        >
          <CarouselContent className="-ml-4">
            {topCategory.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                onClick={() => fetchProductsByType(category.product_type)}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                      <img
                        src={category.image_link}
                        alt={formatCategoryName(category.product_type)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold text-center text-gray-800 group-hover:text-pink-600 transition-colors">
                        {formatCategoryName(category.product_type)}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12 bg-white shadow-md hover:bg-pink-50" />
          <CarouselNext className="right-0 translate-x-12 bg-white shadow-md hover:bg-pink-50" />
        </Carousel>
      </div>
    </div>
  );
};

export default TopCategory;
