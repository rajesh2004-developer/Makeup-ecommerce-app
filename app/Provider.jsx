'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './_components/Sidebar';
import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import Footer from './_components/Footer';
import { ProductContext } from '@/context/ProductContext';
import { useState } from 'react';

export function ThemeProvider({ children, ...props }) {
  const [products, setProducts] = useState([]);
  const [productByFilter, setProductByFilter] = useState([]);
  const [type, setType] = useState('');
  return (
    <NextThemesProvider {...props}>
      <ProductContext.Provider
        value={{ products, setProducts, productByFilter, setProductByFilter,type, setType }}
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
      </ProductContext.Provider>
    </NextThemesProvider>
  );
}
