/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  ArrowLeft,
  BadgeCheck,
  CircleCheckBig,
  CreditCard,
  Landmark,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  //   const [vehicleType, setVehicleType] = useState("")
  //   const [vehicleNumber, setVehicleNumber] = useState("")
  //   const [vehicleModel, setVehicleModel] = useState("")

  return (
    <div className=" min-h-screen bg-slate-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" w-full max-w-xl bg-white rounded-3xl border border-gray-200 
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
          <p className=" text-xs text-gray-700 font-bold">step 3 of 3</p>
          <h1 className=" text-2xl font-bold mt-1 text-gray-800">
            Bank & Payment Setup
          </h1>
          <p className=" text-sm text-gray-500 mt-2">
            Used for partner payouts
          </p>
        </div>

        {/* Bank input data */}
        <div className=" mt-8 space-y-6">
          <div>
            <label
              htmlFor="ahn"
              className=" text-xs font-semibold text-gray-500"
            >
              Account holder name
            </label>
            <div className=" flex items-center gap-2 mt-2">
              <div className=" text-gray-400">
                <BadgeCheck color="green" />
              </div>
              <input
                type="text"
                id="ahn"
                placeholder="As per bank records"
                className=" flex-1 border-b pb-2
              text-sm text-black placeholder:text-gray-400 focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ahn"
              className=" text-xs font-semibold text-gray-500"
            >
              Bank account number
            </label>
            <div className=" flex items-center gap-2 mt-2">
              <div className=" text-gray-400">
                <CreditCard color="green" />
              </div>
              <input
                type="text"
                id="ahn"
                placeholder="Enter account number"
                className=" flex-1 border-b pb-2
              text-sm text-black placeholder:text-gray-400 focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ahn"
              className=" text-xs font-semibold text-gray-500"
            >
              IFSC code
            </label>
            <div className=" flex items-center gap-2 mt-2">
              <div className=" text-gray-400">
                <Landmark color="green" />
              </div>
              <input
                type="text"
                id="ahn"
                placeholder="HDFC0001234"
                className=" flex-1 border-b pb-2
              text-sm text-black placeholder:text-gray-400 focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ahn"
              className=" text-xs font-semibold text-gray-500"
            >
              Mobile number
            </label>
            <div className=" flex items-center gap-2 mt-2">
              <div className=" text-gray-400">
                <Phone color="green" />
              </div>
              <input
                type="text"
                id="ahn"
                placeholder="10 digit mobile number"
                className=" flex-1 border-b pb-2
              text-sm text-black placeholder:text-gray-400 focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ahn"
              className=" text-xs font-semibold text-gray-500"
            >
              UPI ID (optional)
            </label>
            <div className=" flex items-center gap-2 mt-2">
              <input
                type="text"
                id="ahn"
                placeholder="name@upi"
                className=" flex-1 border-b pb-2
              text-sm text-black placeholder:text-gray-400 focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className=" mt-5 flex items-center gap-3 text-xs text-gray-500">
          <CircleCheckBig size={16} />
          <p>
            Bank details are virified before first payout. This usually takes 24-48 hours.
          </p>
        </div>

        <motion.button
          onClick={() => router.push("/partner/onboarding/bank")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center
      justify-center gap-2  disabled:opacity-40 transition cursor-pointer"
        >
          Finish
        </motion.button>
      </motion.div>
    </div>
  );
};

export default page;
