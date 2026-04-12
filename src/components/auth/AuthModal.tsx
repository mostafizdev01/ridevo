"use client"

import { X } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import google from "../../../public/images/google.png"

type propType = {
  open: boolean,
  onClose: () => void
}

const AuthModal = ({ open, onClose }: propType) => {
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
                <div className=" absolute right-4 top-4 text-gray-500 hover:text-black transition" onClick={onClose}>
                  <X size={20} />
                </div>
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">RYDEX</h1>
                  <p className="mt-1 text-xs text-gray-500">
                    Premium Vehicle Booking
                  </p>
                  <button className='w-full h-11 mt-3 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition'>
                    <Image src={google} alt='Google' width={20} height={20} />
                    Continue with Google
                  </button>
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