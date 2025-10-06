import { Button } from '@/components/ui/button';
import { ProductContext } from '@/context/ProductContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BookOpen, ExternalLink, Tag } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/Config/fireBase';
import { useUser } from '@clerk/nextjs';
import { CartProductsContext } from '@/context/CartProductsContext';

const Products = () => {
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);
  const { setProducts, productByFilter, setProductByFilter } =
    useContext(ProductContext);
  const { user } = useUser();
  const { cartProducts, setCartProducts, cartId } =
    useContext(CartProductsContext);

  const updateCartProducts = async (product, quantity) => {
    console.log('working');

    try {
      if (!cartId) {
        return;
      }
      // console.log(userSnap.data().cartId);
      const cartRef = doc(db, 'cart', cartId);
      const cartSnap = await getDoc(cartRef);
      let cartData = {
        name: product.name,
        image: product.image_link
          ? product.image_link
          : product.api_featured_image,
        price: product.price || '1.0',
        quantity: quantity,
        id: product.id,
        brand: product.brand || 'Brand',
        addedAt: new Date(),
        description:
          product.description ||
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione quasi voluptas est modi ipsam dolor ex eligendi repellat minus architecto.',
      };
      if (cartSnap.exists()) {
        let cartDbData = cartSnap.data();
        let existingProducts = cartDbData?.products || [];
        const productIndex = existingProducts.findIndex(
          (item) => item.id === product.id
        );
        console.log(existingProducts);

        if (productIndex !== -1) {
          existingProducts[productIndex].quantity += quantity;
        } else {
          existingProducts.push(cartData);
        }
        setCartProducts(existingProducts);
        await updateDoc(cartRef, {
          products: existingProducts,
          updatedAt: new Date(),
        });
      } else {
        setCartProducts([cartData]);
        await setDoc(cartRef, {
          products: [cartData],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/everything');
        const data = res.data;
        setProducts(data);
        setProductByFilter(data.slice(0, 20));

        const initialCounters = {};
        data.forEach((_, index) => {
          initialCounters[index] = 1;
        });
        setCounters(initialCounters);
        setLoading(false);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const updateCounter = (index, change) => {
    setCounters((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + change),
    }));
  };

  return (
    <div className="w-full mt-12" id="products">
      <h2 className="text-2xl font-bold text-center py-3">
        Products Available
      </h2>
      <div className="flex flex-wrap items-center justify-around p-5">
        {loading &&
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="card w-72 bg-base-100 shadow-xl m-3 p-2 h-[500px] relative"
            >
              <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        {productByFilter &&
          productByFilter.length > 0 &&
          productByFilter.map((product, index) => (
            <div key={index}>
              <div
                className={`card w-72 bg-base-100 shadow-xl m-3 p-2 rounded-md relative`}
              >
                <img
                  src={
                    product.image_link
                      ? product.image_link
                      : product.api_featured_image
                  }
                  alt={product?.name}
                  className="rounded-lg w-full h-42 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/product.jpg';
                  }}
                />

                <p className="absolute right-3 top-3">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-gray-900 rounded-full px-4 py-1.5 text-sm font-medium shadow-lg border border-gray-100 dark:bg-gray-900/95 dark:text-white dark:border-gray-800">
                    {product?.brand || 'Brand'}
                  </span>
                </p>

                <div className="flex flex-col gap-2 my-2">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        (product?.description?.slice(0, 80) ||
                          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, praesentium incidunt exercitationem rem odio ullam laudantium consectetur.'.slice(
                            0,
                            80
                          )) + '...',
                    }}
                  />
                  <div className="flex gap-2 items-center justify-between">
                    <p className="text-xl font-bold">
                      ${product.price || '1.0'}
                    </p>
                    <p className="text-sm text-gray-400">
                      ⭐ {product.rating ? product.rating : '1'}/5
                    </p>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                    <Button
                      className={'cursor-pointer'}
                      onClick={() =>
                        updateCartProducts(product, counters[index] || 1)
                      }
                    >
                      Add to Cart
                    </Button>
                    <div className="flex gap-2 items-center">
                      <Button
                        className={'cursor-pointer'}
                        onClick={() => updateCounter(index, 1)}
                      >
                        +
                      </Button>
                      <p>{counters[index] || 1}</p>
                      <Button
                        className={'cursor-pointer'}
                        onClick={() => updateCounter(index, -1)}
                      >
                        -
                      </Button>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <BookOpen />
                      </PopoverTrigger>
                      <PopoverContent className="w-96 max-h-[600px] overflow-y-auto">
                        <div className="space-y-4">
                          <div className="border-b pb-3">
                            <h3 className="font-bold text-lg mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 capitalize">
                              {product.brand} • {product.product_type}
                            </p>
                          </div>

                          {/* Price & Rating */}
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-2xl font-bold text-green-600">
                                {product.price_sign}
                                {product.price || '0.0'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.currency}
                              </p>
                            </div>
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">
                                  {product.rating}
                                </span>
                                <span className="text-gray-500">/5</span>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          {product.description && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Description
                              </h4>
                              <p
                                className="text-sm text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: product.description,
                                }}
                              />
                            </div>
                          )}

                          {/* Category */}
                          <div>
                            <h4 className="font-semibold mb-2">Category</h4>
                            <div className="flex gap-2 flex-wrap">
                              {product.category && (
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {product.category}
                                </span>
                              )}
                              {product.product_type && (
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {product.product_type}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Tags */}
                          {product.tag_list && product.tag_list.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1">
                                <Tag className="h-4 w-4" />
                                Tags
                              </h4>
                              <div className="flex gap-2 flex-wrap">
                                {product.tag_list.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Color Options */}
                          {product.product_colors &&
                            product.product_colors.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Available Colors
                                </h4>
                                <div className="space-y-2">
                                  {product.product_colors.map((color, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-3"
                                    >
                                      <div
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                                        style={{
                                          backgroundColor: color.hex_value,
                                        }}
                                      />
                                      <span className="text-sm">
                                        {color.colour_name}
                                      </span>
                                      <span className="text-xs text-gray-400 ml-auto">
                                        {color.hex_value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Links */}
                          <div className="pt-3 border-t space-y-2">
                            {product.product_link && (
                              <a
                                href={product.product_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                              >
                                <ExternalLink className="h-4 w-4" />
                                View on Website
                              </a>
                            )}
                            {product.website_link && (
                              <a
                                href={product.website_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:underline"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Visit Brand Site
                              </a>
                            )}
                          </div>

                          {/* Metadata */}
                          <div className="pt-3 border-t text-xs text-gray-400 space-y-1">
                            {product.created_at && (
                              <p>
                                Added:{' '}
                                {new Date(
                                  product.created_at
                                ).toLocaleDateString()}
                              </p>
                            )}
                            {product.updated_at && (
                              <p>
                                Updated:{' '}
                                {new Date(
                                  product.updated_at
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {productByFilter.length === 0 && !loading && (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
