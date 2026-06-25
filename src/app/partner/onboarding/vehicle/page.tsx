/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { VEHICLE_CATEGORIES } from "@/src/components/home/VehicleSlider";
import axios from "axios";
import { ArrowLeft, Loader } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Vehicle = () => {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError]  =useState("")
  
  const handleVehicleSubmit = async ()=>  {
    setError("")
    setLoading(true)
    try {
      
      const {data} = await axios.post("/api/partner/onboarding/vehicle",{
        type: vehicleType, number:vehicleNumber, vehicleModel
      })

      console.log("data: ", data)
      if(data.success){
        setLoading(false)
        router.push("/partner/onboarding/documents")
      }

      if(!data?.success){
        setError(data?.message)
        setLoading(false)
      }
      
    } catch (error: any) {
      setLoading(false)
      setError(error?.response?.data?.message ?? "Something went wrong!")
      console.log("Vehicle data submited error", error)
    }

  }
  
  return (
    <div className=" min-h-screen bg-slate-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" w-full max-w-3xl bg-white rounded-3xl border border-gray-200 
      shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className=" relative text-center">
          <button
            onClick={() => router.back()}
            className=" absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-700 
          flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft color="black" size={18} />
          </button>

          {/* from desc */}
          <p className=" text-xs text-gray-700 font-bold">step 1 of 3</p>
          <h1 className=" text-2xl font-bold mt-1 text-gray-800">Vehicle Details</h1>
          <p className=" text-sm text-gray-500 mt-2">Add your vehicle information</p>
        </div>

        {/* icon filed */}
        <div className=" mt-8 space-y-6">
            <p className=" text-xs font-semibold text-gray-500 mb-3">Vehicle Type</p>
          <div className=" flex flex-wrap justify-start items-center gap-3">
            {
              VEHICLE_CATEGORIES?.map((v, i)=>{
                const Icon = v.Icon
                const active = vehicleType==v.title
                return (
                  <motion.div
                  key={i}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={()=> setVehicleType(v?.title)}
                  className={`rounded-2xl cursor-pointer border p-4 flex flex-col items-center gap-2 transition
                    ${active 
                      ? "bg-black text-white border-black" 
                      : " border-gray-200 hover:border-black"}
                    `}
                  >
                    {/* Vehicle type icon */}
                    <div className={` w-11 h-11 rounded-full flex items-center justify-center
                      ${active 
                        ? " bg-white text-black" 
                        : " bg-black text-white"}
                      `}> 
                      <Icon />
                    </div>

                    <div className={`text-sm font-semibold text-gray-700 ${ active ? "text-white" : ""}`}>{v.title}</div>
                    <p className={`text-xs ${
                      active 
                      ? " text-gray-300"
                      : " text-gray-500"
                    }`}>{v.description}</p>

                  </motion.div>
                )
              })
            }
          </div>

            {/* number vehicle input */}
          <div>
            <label
              htmlFor="vn"
              className=" text-xs font-semibold text-gray-500"
            >
             Vehicle Number
            </label>
            
            <input
              type="text"
              onChange={(e)=> setVehicleNumber(e.target.value.toLocaleUpperCase().slice(0, 10))}
              value={vehicleNumber}
              placeholder="MH12AB1234"
              id="vn"
              className=" w-full 
            border-b border-gray-300 pb-2 text-sm focus:outline-none 
            focus:border-bl transition text-gray-700 font-medium"
            />
          </div>
          {/* model vehicle input */}
          <div>
            <label
              htmlFor="vm"
              className=" text-xs font-semibold text-gray-500"
            >
             Vehicle Model
            </label>
            <input
              type="text"
              onChange={(e)=> setVehicleModel(e.target.value.toLocaleUpperCase().slice(0, 10))}
              value={vehicleModel}
              placeholder="Tata Ace"
              id="vm"
              className=" w-full 
            border-b border-gray-300 pb-2 text-sm focus:outline-none 
            focus:border-bl transition text-gray-700 font-medium"
            />
          </div>
        </div>

        {error && <p className=" text-sm text-red-500 mt-5 p-1 bg-red-50 font-semibold rounded-md mb-3">{error}</p>}

        <motion.button
        disabled={loading}
        onClick={handleVehicleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center
      justify-center gap-2  disabled:opacity-40 transition cursor-pointer"
        >
          {!loading ? "Continue" : (<div className=" flex justify-center items-center gap-3 text-gray-400"><span>Continuing...</span><Loader className=" animate-spin" /></div>)}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Vehicle;
