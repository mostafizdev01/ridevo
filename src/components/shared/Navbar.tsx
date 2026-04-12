"use client";

import { motion } from "motion/react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = ["Home", "Booking", "About Us", "Contact Us"];

function Nav() {
  const pathName = usePathname();
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-4 px-2`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          priority
        />
        <div className="hidden md:flex items-center gap-10">
          {
            navItems.map((item, index) => {
              let href;
              if(item == "Home"){
                href = "/"
              }else{
                href = `/${item.toLocaleLowerCase()}`
              }
              const active = href == pathName;
              return <Link key={index} href={href} className={` text-sm pl-5 font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}>
                  {item}
                </Link>
              
            })
          }
        </div>
        {/* <button className="md:hidden text-white hover:text-gray-300 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}
        <button className="hidden md:block bg-white text-black px-4 py-1.5 cursor-pointer rounded-full hover:bg-gray-200 transition duration-300">
          Login
        </button>
      </div>
    </motion.div>
  );
}

export default Nav;