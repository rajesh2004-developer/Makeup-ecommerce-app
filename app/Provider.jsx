'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/Sidebar';
import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import { ProductContext } from '@/context/ProductContext';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/Config/fireBase';
import { CartProductsContext } from '@/context/CartProductsContext';
import uniqid from 'uniqid';

export function ThemeProvider({ children, ...props }) {
  const [products, setProducts] = useState([]);
  const [productByFilter, setProductByFilter] = useState([]);
  const [type, setType] = useState('');
  const { user } = useUser();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState('');

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);
  useEffect(() => {
    if (cartId) {
      getCartData();
    }
  }, [cartId]);

  const getCartData = async () => {
    try {
      if (!cartId) return;
      console.log(cartId);
      const cartRef = doc(db, 'cart', cartId);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();

        const existingProducts = cartData?.products;
        console.log(existingProducts);
        setCartProducts(existingProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewUser = async () => {
    const userRef = doc(db, 'users', user?.primaryEmailAddress?.emailAddress);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      setCartId(userData?.cartId);
      console.log('User already exists');
    } else {
      let createCartId = uniqid();
      setCartId(createCartId);

      const userData = {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
        cartId: createCartId,
      };
      await setDoc(userRef, userData);
      console.log('New user created');
    }
  };

  return (
    <NextThemesProvider {...props}>
      <ProductContext.Provider
        value={{
          products,
          setProducts,
          productByFilter,
          setProductByFilter,
          type,
          setType,
        }}
      >
        <CartProductsContext.Provider
          value={{ cartProducts, setCartProducts, cartId, setCartId }}
        >
          <Navbar />
          <Hero />
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger className={'fixed top-0 z-30'} />
              {children}
              {/* <Footer /> */}
            </main>
          </SidebarProvider>
        </CartProductsContext.Provider>
      </ProductContext.Provider>
    </NextThemesProvider>
  );
}
