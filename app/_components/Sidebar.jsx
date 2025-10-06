import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { ProductContext } from '@/context/ProductContext';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

export function AppSidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useUser();
  const { products, setProductByFilter, type, setType } =
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
  const filterProductsByTag = async (tag) => {
    try {
      const filtered = products
        .filter((product) => product.product_type == type)
        .filter((product) => product.tag_list.includes(tag));
      setProductByFilter(filtered);
      console.log(filtered);
      document.getElementById('products')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <Link href={'/'}>
            <Image
              src={
                resolvedTheme === 'light' ? '/light_logo.svg' : '/dark_logo.svg'
              }
              width={40}
              height={40}
              className="w-[150px] object-contain cursor-pointer"
              alt="Logo"
            />
          </Link>
          <Button
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }
            variant={'ghost'}
          >
            {resolvedTheme === 'light' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="p-3 my-2">
            <h2 className="text-xl font-bold whitespace-nowrap">
              Product Types{' '}
              <ArrowRight className="inline pl-1 hover:translate-x-1" />
            </h2>
            <ul className="px-2 py-1 text-[18px] cursor-pointer flex flex-col gap-1">
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('blush')}
              >
                Blush
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('bronzer')}
              >
                Bronzer
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('eyebrow')}
              >
                Eyebrow
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('eyeliner')}
              >
                Eyeliner
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('eyeshadow')}
              >
                Eyeshadow
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('foundation')}
              >
                Foundation
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('lip_liner')}
              >
                Lip liner
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('lipstick')}
              >
                Lipstick
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('mascara')}
              >
                Mascara
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => fetchProductsByType('nail_polish')}
              >
                Nail polish
              </li>
            </ul>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <div className="p-3 my-2">
            <h2 className="text-xl font-bold whitespace-nowrap">
              Tags list{' '}
              <ArrowRight className="inline pl-1 hover:translate-x-1" />
            </h2>
            <ul className="px-2 py-1 text-[18px] cursor-pointer flex flex-col gap-1">
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black "
                onClick={() => filterProductsByTag('Canadian')}
              >
                Canadian
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('CertClean')}
              >
                CertClean
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Chemical Free')}
              >
                Chemical Free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Dairy Free')}
              >
                Dairy Free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('EWG Verified')}
              >
                EWG Verified
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('EcoCert')}
              >
                EcoCert
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Fair Trade')}
              >
                Fair Trade
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Gluten Free')}
              >
                Gluten Free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Hypoallergenic')}
              >
                Hypoallergenic
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Natural')}
              >
                Natural
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('No Talc')}
              >
                No Talc
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Non-GMO')}
              >
                Non-GMO
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Organic')}
              >
                Organic
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Peanut Free Product')}
              >
                Peanut Free Product
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Sugar Free')}
              >
                Sugar Free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('USDA Organic')}
              >
                USDA Organic
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('Vegan')}
              >
                Vegan
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('alcohol free')}
              >
                alcohol free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('cruelty free')}
              >
                cruelty free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('oil free')}
              >
                oil free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('purpicks')}
              >
                purpicks
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('silicone free')}
              >
                silicone free
              </li>
              <li
                className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black"
                onClick={() => filterProductsByTag('water free')}
              >
                water free
              </li>
            </ul>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={'px-5'}>
        {!user ? (
          <SignInButton className="w-full mb-15 p-1 text-lg cursor-pointer mt-5 border rounded-md dark:text-black dark:bg-gray-200 text-white bg-black">
            SignIn / SignUp
          </SignInButton>
        ) : (
          <div className="mb-15 mt-5 w-full">
            <div
              className="w-full p-3 border rounded-md dark:bg-gray-800 bg-gray-50 flex items-center justify-between cursor-pointer"
              onClick={(e) => {
                const userButton = e.currentTarget.querySelector('button');
                if (userButton) userButton.click();
              }}
            >
              <div className="flex items-center gap-3">
                <UserButton />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold dark:text-white text-black">
                    Welcome back!
                  </span>
                  <span className="text-xs dark:text-gray-400 text-gray-600">
                    Manage your account
                  </span>
                </div>
              </div>
              <svg
                className="w-5 h-5 dark:text-gray-400 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
