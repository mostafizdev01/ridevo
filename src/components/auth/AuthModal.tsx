"use client"

import { Lock, Mail, User, X } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import google from "../../../public/images/google.png"
import { useState } from "react"

type propType = {
  open: boolean,
  onClose: () => void
}

type stepType = "login" | "signup" | "otp"

const AuthModal = ({ open, onClose }: propType) => {

  const [step, setStep] = useState<stepType>("login")

  return (
    <>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=" fixed inset-0 z-90 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-100 flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                <div className=" absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black transition" onClick={onClose}>
                  <X size={20} />
                </div>

                {/* login from title and desc  */}
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">RIDEVO</h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </p>

                  {/* google login button */}
                  <button className='w-full cursor-pointer h-11 mt-3 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition'>
                    <Image src={google} alt='Google' width={20} height={20} />
                    Continue with Google
                  </button>

                  {/* login modal or section  */}
                  <div className=" flex items-center gap-4 my-6">
                    <div className=" flex-1 h-px bg-black/10" />
                    <div className=" text-xs text-gray-500">OR</div>
                    <div className=" flex-1 h-px bg-black/10" />
                  </div>

                  {/* input login & Sign up from */}
                  <div>
                    {step == "login" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h1 className='text-xl font-semibold'>Welcome back</h1>
                        <div className=" mt-5 space-y-4">

                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Mail size={18} className=" text-gray-500" />
                            <input type="email" placeholder="Email"
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Lock size={18} className=" text-gray-500" />
                            <input type="password" placeholder="Password"
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <button className='w-full cursor-pointer h-11 mt-3 rounded-xl bg-black text-white flex items-center justify-center gap-3 text-sm font-semibold hover:bg-gray-900 transition'>
                            Login
                          </button>
                          <div className=" text-center text-sm text-gray-500">
                            Don't have an account? <span className=" text-black cursor-pointer hover:underline" onClick={() => setStep("signup")}>Sign up</span>
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {/* sign up modal or section  */}
                    {step == "signup" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h1 className='text-xl font-semibold'>Create an account</h1>
                        <div className=" mt-5 space-y-4">

                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <User size={18} className=" text-gray-500" />
                            <input type="text" placeholder="Full Name"
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Mail size={18} className=" text-gray-500" />
                            <input type="email" placeholder="Email"
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Lock size={18} className=" text-gray-500" />
                            <input type="password" placeholder="Password"
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <button className='w-full cursor-pointer h-11 mt-3 rounded-xl bg-black text-white flex items-center justify-center gap-3 text-sm font-semibold hover:bg-gray-900 transition'>
                            Sign Up
                          </button>
                          <div className=" text-center text-sm text-gray-500">
                            Already have an account? <span className=" text-black cursor-pointer hover:underline" onClick={() => setStep("login")}>Login</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  )
}

export default AuthModal