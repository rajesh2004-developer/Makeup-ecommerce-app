import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CartProductsContext } from '@/context/CartProductsContext';
import { ProductContext } from '@/context/ProductContext';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { LogIn, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/Config/fireBase';

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { products, setProductByFilter, setType } = useContext(ProductContext);
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

      if (cartSnap.exists()) {
        let cartDbData = cartSnap.data();
        let existingProducts = cartDbData?.products || [];
        const productIndex = existingProducts.findIndex(
          (item) => item.id === product.id
        );
        console.log(existingProducts);

        if (productIndex !== -1) {
          existingProducts[productIndex].quantity += quantity;
        }
        setCartProducts(existingProducts);
        await updateDoc(cartRef, {
          products: existingProducts,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsByType = async (type) => {
    try {
      type = type.trim().toLowerCase();
      setType(type);
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

  const calculateTotal = () => {
    return cartProducts.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);
  };

  return (
    <>
      <nav
        className="w-full flex flex-wrap items-center justify-between gap-4 p-4 shadow-md dark:shadow-white/10 shadow-black/10 sticky top-0 z-1 bg-white dark:bg-black"
        id="navbar"
      >
        <Link href={'/'} className="flex-shrink-0">
          {mounted && (
            <Image
              src={
                resolvedTheme === 'light' ? '/light_logo.svg' : '/dark_logo.svg'
              }
              width={40}
              height={40}
              className="w-[150px] object-contain m-2 cursor-pointer"
              alt="Logo"
            />
          )}
        </Link>
        <div className="flex items-center gap-2 border h-[40px] rounded-md w-full sm:w-[500px] md:flex-1 md:max-w-[600px] relative py-1 px-3 md:order-0 order-1">
          <input
            type="tex+"
            placeholder="Search by product type..."
            className="w-full outline-0 border-0 text-xl bg-transparent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchProductsByType(inputValue);
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }
            }}
          />
          <Search
            className="absolute right-2 cursor-pointer flex-shrink-0"
            onClick={() => {
              fetchProductsByType(inputValue);
              document.getElementById('products')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-2 sm:gap-4 flex-shrink-0">
          {user && (
            <Badge
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base tabular-nums bg-black dark:bg-white text-white dark:text-black border-0 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-7 h-7" />
              <span className="hidden sm:inline">Cart</span>
            </Badge>
          )}
          {user ? (
            <UserButton />
          ) : (
            <SignInButton className="h-full p-1 text-xl  cursor-pointer border rounded-md dark:text-black dark:bg-gray-200 text-white bg-black hover:scale-105 transition-transform ">
              <Button
                className={'flex items-center gap-2 px-3 py-3 text-base '}
              >
                <LogIn className="w-7 h-7" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </SignInButton>
          )}
          <Button
            onClick={() =>
              setTheme(resolvedTheme == 'light' ? 'dark' : 'light')
            }
            variant={'ghost'}
            className="cursor-pointer"
          >
            {resolvedTheme == 'light' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </nav>

      {/* Cart Popup */}
      {isCartOpen && (
        <>
          {/* 🔲 Background Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            onClick={() => setIsCartOpen(false)}
          />

          {/* 🛒 Cart Modal */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
              {/* ❌ Close Button */}
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 transition-colors shadow-md"
                aria-label="Close Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-800 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* 🛍️ Cart Items Section */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Your Cart
                </h2>
                <div className="overflow-y-auto h-[70vh] pr-2 space-y-5 sm:space-y-6 scrollbar-thin scrollbar-thumb-pink-400 dark:scrollbar-thumb-pink-600 scrollbar-track-transparent">
                  {cartProducts && cartProducts.length > 0 ? (
                    cartProducts.map((pro, index) => (
                      <Card
                        key={index}
                        className="p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700"
                      >
                        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                          {/* 🖼️ Product Image */}
                          <div className="w-full sm:w-40 flex-shrink-0">
                            <img
                              src={pro.image}
                              alt={pro.name}
                              className="w-full h-48 sm:h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700 hover:scale-[1.03] transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = '/product.jpg';
                                e.currentTarget.onerror = null;
                              }}
                            />
                          </div>

                          {/* 📝 Product Details */}
                          <div className="flex flex-col justify-between flex-1">
                            <div>
                              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                                {pro.name}
                              </h2>
                              <p
                                className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-3"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    pro?.description ||
                                    'A high-quality product designed for style, comfort, and performance.',
                                }}
                              />
                            </div>

                            {/* 💲 Price and Quantity Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                              <p className="font-semibold text-lg text-pink-600 dark:text-pink-400">
                                ${pro.price}
                              </p>

                              <div className="flex items-center justify-center sm:justify-end gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartProducts(pro, -1)}
                                  className="rounded-full px-3"
                                >
                                  -
                                </Button>
                                <p className="w-8 text-center text-gray-900 dark:text-gray-100 font-medium">
                                  {pro.quantity}
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateCartProducts(pro, 1)}
                                  className="rounded-full px-3"
                                >
                                  +
                                </Button>
                              </div>
                            </div>

                            {/* 🛒 Buy Now Button */}
                            <Button className="mt-4 sm:mt-5 w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 transition-all rounded-xl shadow-md hover:shadow-lg py-4 text-sm sm:text-base font-semibold">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm sm:text-base">
                      Your cart is empty 🛒
                    </p>
                  )}
                </div>
              </div>

              {/* 🧾 Order Summary Section */}
              <div className="w-full lg:w-96 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 border-t lg:border-t-0 lg:border-l border-pink-200 dark:border-pink-900 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-400">
                        Shipping
                      </span>
                      <span className="font-semibold text-pink-600 dark:text-pink-400">
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600 dark:text-gray-400">
                        Tax
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        ${(calculateTotal() * 0.1).toFixed(2)}
                      </span>
                    </div>

                    <Separator className="my-4 bg-pink-200 dark:bg-pink-900" />

                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span className="text-gray-900 dark:text-gray-100">
                        Total
                      </span>
                      <span className="text-pink-600 dark:text-pink-400">
                        ${(calculateTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-5 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
                    🔒 Secure checkout • 💝 Free returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
