import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { ArrowBigRight, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export function AppSidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <Image
            src={
              resolvedTheme === 'light' ? '/light_logo.svg' : '/dark_logo.svg'
            }
            width={40}
            height={40}
            className="w-[150px] object-contain"
            alt="Logo"
          />
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
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Blush
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Bronzer
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Eyebrow
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Eyeliner
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Eyeshadow
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Foundation
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Lip liner
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Lipstick
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Mascara
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
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
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black ">
                Canadian
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                CertClean
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Chemical Free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Dairy Free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                EWG Verified
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                EcoCert
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Fair Trade
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Gluten Free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Hypoallergenic
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Natural
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                No Talc
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Non-GMO
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Organic
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Peanut Free Product
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Sugar Free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                USDA Organic
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                Vegan
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                alcohol free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                cruelty free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                oil free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                purpicks
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                silicone free
              </li>
              <li className="w-full hover:bg-gray-200 p-1 rounded hover:dark:text-black">
                water free
              </li>
            </ul>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={'px-5'}>
        <Button className="w-full mb-15 p-1 text-lg cursor-pointer mt-5">
          SignIn / SignUp
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
