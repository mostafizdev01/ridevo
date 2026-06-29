/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import {
  ArrowLeft,
  BadgeCheck,
  CircleCheckBig,
  CreditCard,
  Landmark,
  Loader,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  /// post bank details
  const handleBank = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("/api/partner/onboarding/bank", {
        accountHolder,
        accountNumber,
        ifsc: ifscCode,
        mobileNumber: mobile,
      });

      if (data.success) {
        setLoading(false);
        toast.success("Request send successfully!");
        router.push("/");
      }

      if (!data.success) {
        setLoading(false);
        setError(data.message);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.response.message);
      console.log("Bank submition error: ", error);
    }
  };

  // get bank details
  useEffect(()=> {
    const handleGetBank = async ()=> {
      try {
        const {data} = await axios.get("/api/partner/onboarding/bank")
      if(data){
        setAccountHolder(data?.accountHolder)
        setAccountNumber(data?.accountNumber)
        setIfscCode(data?.ifsc)
        setMobile(data?.mobileNumber)
      }
      } catch (error) {
        console.log("error: ", error)
      }
    }
    handleGetBank()
  }, [])

  const validAccountHolder = accountHolder.length >= 3;
  const validBankNumber = accountNumber.length == 16;
  const validIfsc = IFSC_REGEX.test(ifscCode);
  const validMobileNumber = mobile.length == 12;

  const validBankDeatails = validAccountHolder && validBankNumber && validIfsc && validMobileNumber;
  

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
                onChange={(e) => setAccountHolder(e.target.value.slice(0, 30))}
                value={accountHolder}
                type="text"
                id="ahn"
                placeholder="As per bank records"
                className={`flex-1 border-b pb-2
                text-sm text-black placeholder:text-gray-400 focus:outline-none ${
                  accountHolder.length > 0 && !validAccountHolder
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {!validAccountHolder &&
              accountHolder.length > 0 &&
              accountHolder.length < 3 && (
                <p className="text-sm text-red-500">
                  Minimum 3 characters required.
                </p>
              )}
          </div>

          {/* account number */}
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
                onChange={(e) => setAccountNumber(e.target.value.slice(0, 16))}
                value={accountNumber}
                type="number"
                id="ahn"
                placeholder="Enter account number"
                className={`flex-1 border-b pb-2
                text-sm text-black placeholder:text-gray-400 focus:outline-none ${
                  accountNumber.length > 0 && !validBankNumber
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {!validBankNumber &&
              accountNumber.length > 0 &&
              accountNumber.length < 16 && (
                <p className="text-sm text-red-500">Invalid bank number</p>
              )}
          </div>

          {/* account ifsc code */}
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
                onChange={(e) =>
                  setIfscCode(e.target.value.toUpperCase().slice(0, 11))
                }
                value={ifscCode}
                type="text"
                id="ahn"
                placeholder="HDFC0001234"
                className={`flex-1 border-b pb-2
                text-sm text-black placeholder:text-gray-400 focus:outline-none ${
                  ifscCode.length > 0 && !validIfsc
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {!validIfsc && ifscCode.length > 0 && (
              <p className="text-sm text-red-500">Invalid IFSC Code</p>
            )}
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
                onChange={(e) => setMobile(e.target.value.slice(0, 12))}
                value={mobile}
                type="number"
                id="ahn"
                placeholder="10 digit mobile number"
                className={`flex-1 border-b pb-2
                text-sm text-black placeholder:text-gray-400 focus:outline-none ${
                  mobile.length > 0 && !validMobileNumber
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {!validMobileNumber && mobile.length > 0 && (
              <p className="text-sm text-red-500">Invalid mobile number</p>
            )}
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
            Bank details are virified before first payout. This usually takes
            24-48 hours.
          </p>
        </div>

        {error && (
          <p className=" text-sm text-red-500 mt-5 p-1 bg-red-50 font-semibold rounded-md mb-3">
            {error}
          </p>
        )}

        <motion.button
          disabled={ !validBankDeatails || loading}
          onClick={handleBank}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center
      justify-center gap-2  disabled:opacity-40 transition cursor-pointer"
        >
          {!loading ? (
            "Continue"
          ) : (
            <div className=" flex justify-center items-center gap-3 text-gray-400">
              <span>Continuing...</span>
              <Loader className=" animate-spin" />
            </div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default page;
