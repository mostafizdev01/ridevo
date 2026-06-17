"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "../auth/AuthModal";
import { useDispatch } from "react-redux";
import { Bike, Car, ChevronRight, LogOut, Menu, Truck, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { setUserData } from "@/src/redux/userSlice";

const navItems = ["Home", "Booking", "About Us", "Contact Us"];

function Nav() {
  const [authOpen, setAuthOpen] = useState(false);
  const pathName = usePathname();
  // const { userData } = useSelector((state: RootState) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showbar, setShowbar] = useState(false);

  const router = useRouter();

  const { data } = useSession();

  const userData = data?.user;

  // console.log("userData", userData)

  const dispatch = useDispatch();
  /// handle logout function
  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(setUserData(null));
    setProfileOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-4 px-2`}
      >
        <div className=" mx-auto px-3 md:px-8 flex items-center justify-between">
          <Image src={logo} alt="logo" width={100} height={100} priority />
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, index) => {
              let href;
              if (item == "Home") {
                href = "/";
              } else {
                href = `/${item.toLocaleLowerCase()}`;
              }
              const active = href == pathName;
              return (
                <Link
                  key={index}
                  href={href}
                  className={` text-sm pl-5 font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* <button className="md:hidden text-white hover:text-gray-300 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
         </button> */}
          <div className=" flex items-center gap-3 relative">
            <div className=" w-full relative">
              {!userData ? (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:block bg-white text-black px-4 py-1.5 cursor-pointer rounded-full hover:bg-gray-200 transition duration-300"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    className=" w-11 h-11 rounded-full bg-white text-black font-bold flex items-center justify-center cursor-pointer"
                  >
                    {userData?.name?.charAt(0).toUpperCase()}
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="  hidden md:block absolute right-0 mt-2 w-68 bg-white shadow-lg rounded-md py-2"
                      >
                        <div className="p-5">
                          <p className="font-semibold text-lg text-gray-500">
                            {userData.name}
                          </p>

                          <p className="text-xs uppercase text-gray-500 mb-4">
                            {userData.role}
                          </p>

                          {userData.role !== "partner" && (
                            <div onClick={()=> router.push("/partner/onboarding/vehicle")} className="w-full flex items-center mb-2 gap-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-xl">
                              <div className=" flex -space-x-2">
                                <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                                  <Bike size={16} />
                                </div>
                                <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                                  <Car size={16} />
                                </div>
                                <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                                  <Truck size={16} />
                                </div>
                              </div>
                              Become a Partner
                              <ChevronRight size={16} />
                            </div>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex justify-center items-center gap-3 cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                          >
                            <span>Logout</span>{" "}
                            <LogOut size={16} className=" inline" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
            {/* /// mobile menu */}
            <div className=" md:hidden text-white hover:text-gray-300 transition duration-300 cursor-pointer">
              {showbar ? (
                <X color="white" size={28} onClick={() => setShowbar(false)} />
              ) : (
                <Menu size={28} onClick={() => setShowbar(true)} />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* create mobile menu sidebar and backdrop */}
      <AnimatePresence>
        {showbar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className=" fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* /// create mobile menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-22 left-1/2 -translate-x-1/2 w-[92%] bg-[#0B0B0B] rounded-2xl shadow-2xl z-50 md:hidden overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10 gap-6 pl-6 py-6">
                {navItems?.map((item, index) => {
                  let href;

                  if (item == "Home") {
                    href = "/";
                  } else {
                    href = `/${item.toLocaleLowerCase()}`;
                  }

                  const active = href == pathName;
                  return (
                    <Link
                      key={index}
                      href={href!}
                      className={`text-white hover:text-gray-300 transition duration-300 ${active ? "text-blue-500" : ""}`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* profile modal  */}
      <AnimatePresence>
        {profileOpen && userData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            <motion.div
              initial={{ y: 400 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", duration: 2.5 }}
              className=" md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-[#ffffff] rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* profile model box */}
              <div className="p-5">
                <p className="font-semibold text-lg text-gray-500">
                  {userData.name}
                </p>

                <p className="text-xs uppercase text-gray-500 mb-4">
                  {userData.role}
                </p>

                {userData?.role !== "partner" && (
                  <div className="w-full flex items-center gap-3 py-3 text-gray-500 hover:bg-gray-100 rounded-xl">
                    <div className=" flex -space-x-2">
                      <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                        <Bike size={16} />
                      </div>
                      <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                        <Car size={16} />
                      </div>
                      <div className=" w-6 h-6 rounded-full bg-black text-white flex items-center">
                        <Truck size={16} />
                      </div>
                    </div>
                    <div className=" w-full">Become a Partner</div>
                    <div className=" flex items-center justify-center">
                      <ChevronRight size={46} />
                    </div>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex justify-center items-center gap-3 cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  <span>Logout</span> <LogOut size={16} className=" inline" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Nav;
