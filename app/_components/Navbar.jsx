import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductContext } from '@/context/ProductContext';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Moon, Search, ShoppingCart, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');

  const { products, setProductByFilter, setType } = useContext(ProductContext);
  const fetchProductsByType = async (type) => {
    try {
      type = type.trim().toLowerCase();
      setType(type);
      const filterByType = products.filter(
        (product) => product.product_type == type
      );
      setProductByFilter(filterByType);
      console.log(filterByType);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full flex flex-wrap items-center justify-between gap-4 p-4 shadow-md dark:shadow-white/10 shadow-black/10 sticky top-0 z-1 bg-white dark:bg-black">
      <Link href={'/'} className="flex-shrink-0">
        <Image
          src={resolvedTheme === 'light' ? '/light_logo.svg' : '/dark_logo.svg'}
          width={40}
          height={40}
          className="w-[150px] object-contain m-2 cursor-pointer"
          alt="Logo"
        />
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
        <Badge className="flex items-center gap-2 rounded-lg px-3 py-2 text-base tabular-nums bg-black dark:bg-white text-white dark:text-black border-0 hover:scale-105 transition-transform cursor-pointer">
          <ShoppingCart className="w-7 h-7" />
          <span className="hidden sm:inline">Cart</span>
        </Badge>
        {user ? (
          <UserButton />
        ) : (
          <SignInButton className="w-full p-1 text-xl px-1 cursor-pointer border rounded-md dark:text-black dark:bg-gray-200 text-white bg-black">
            SignIn
          </SignInButton>
        )}
        <Button
          onClick={() => setTheme(resolvedTheme == 'light' ? 'dark' : 'light')}
          variant={'ghost'}
          className="cursor-pointer"
        >
          {resolvedTheme == 'light' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
