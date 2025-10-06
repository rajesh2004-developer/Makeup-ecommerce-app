import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div className="w-[70vw] h-1 bg-black mx-auto dark:bg-white mt-5"></div>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 flex flex-wrap gap-3 items-start justify-around my-10">
        <aside>
          <img
            src={
              mounted
                ? resolvedTheme == 'dark'
                  ? `/dark_logo.svg`
                  : `/light_logo.svg`
                : `/dark_logo.svg`
            }
            className="w-40 mb-4"
            alt="logo"
          />
        </aside>
        <nav className="flex flex-col gap-1">
          <h6 className="footer-title text-xl">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav className="flex flex-col gap-1">
          <h6 className="footer-title text-xl">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="flex flex-col gap-1">
          <h6 className="footer-title text-xl">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <p className="text-center mb-10">
        Copyright © {new Date().getFullYear()} - All right reserved by MakeUp
        Industries Ltd
      </p>
    </>
  );
};

export default Footer;
