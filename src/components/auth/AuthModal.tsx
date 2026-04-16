"use client"

import { CircleDashed, Lock, Mail, User, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import google from "../../../public/images/google.png"
import { use, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

type propType = {
  open: boolean,
  onClose: () => void
}

type stepType = "login" | "signup" | "otp"

const AuthModal = ({ open, onClose }: propType) => {

  const [step, setStep] = useState<stepType>("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();

  const {data: session} = useSession();
  console.log(session);

// register new user
  const handleSignup = async () => {
    setLoading(true)
    if(!name || !email || !password){
      setError("All fields are required")
      setLoading(false)
      return;
    }
    try {
      if(password.length < 6){
        setError("Password must be at least 6 characters long")
        setLoading(false)
        return;
      }else{
        setError("")
        setSuccess("")
      }
      const {data} = await axios.post("/api/auth/register", {
      name, email, password
    })
    if(data?.success){
      setSuccess(data?.message || "Registration successful")
      setError("")
      setName("")
      setEmail("")
      setPassword("")
      // router.push("/dashboard") // Redirect to dashboard page after successful registration
    }
    if(!data?.success){
      setError(data?.message || "An error occurred")
      setSuccess("")
      
    }
    setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // login existing user
  const handleLogin = async () => {
    setLoading(true)
    const res = await signIn("credentials", {
      email, password, redirect: false
    })
    setLoading(false)
    console.log(res);
    
  }

  // Google login handler
  const handleGoogleLogin = async () => {
    setLoading(true)
   const res = await signIn("google")
   console.log(res);
    setLoading(false)
    // router.push(res.url || "/dashboard")
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                  <button onClick={handleGoogleLogin} className='w-full cursor-pointer h-11 mt-3 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition'>
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
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Lock size={18} className=" text-gray-500" />
                            <input type="password" placeholder="Password"
                              onChange={(e)=>setPassword(e.target.value)}
                              value={password}
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <button onClick={handleLogin} className='w-full cursor-pointer h-11 mt-3 rounded-xl bg-black text-white flex items-center justify-center gap-3 text-sm font-semibold hover:bg-gray-900 transition'>
                            {loading ? <CircleDashed color="white" size={20} className=" animate-spin" /> : "Login"}
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
                              onChange={(e)=>setName(e.target.value)}
                              value={name}
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Mail size={18} className=" text-gray-500" />
                            <input type="email" required={true} placeholder="Email"
                              onChange={(e)=>setEmail(e.target.value)}
                              value={email}
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          <div className=" flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                            <Lock size={18} className=" text-gray-500" />
                            <input type="password" placeholder="Password"
                              onChange={(e)=>setPassword(e.target.value)}
                              value={password}
                              className=" w-full bg-transparent outline-none text-sm" />
                          </div>
                          {error && <p className=" text-red-500 text-sm bg-red-100 p-2 rounded-lg text-left">{error}</p>}
                          {success && <p className=" text-green-500 text-sm bg-green-100 p-2 rounded-lg text-left">{success}</p>}
                          <button disabled={loading} onClick={handleSignup} className='w-full cursor-pointer h-11 mt-3 rounded-xl bg-black text-white flex items-center justify-center gap-3 text-sm font-semibold hover:bg-gray-900 transition'>
                            {loading ? <CircleDashed color="white" size={20} className=" animate-spin" /> : "Sign up"}
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
    </AnimatePresence>
  )
}

export default AuthModal