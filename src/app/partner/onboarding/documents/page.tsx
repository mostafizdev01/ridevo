/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { ArrowLeft, FileCheck, Loader, UploadCloud } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type docsType = "nationalId" | "license" | "rc";

const page = () => {
  const router = useRouter();
  const [docs, setDocs] = useState<Record<docsType, File | null>>({
    nationalId: null,
    license: null,
    rc: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [licenseUrl, setLicenseUrl] = useState("")
  const [nationalIdUrl, setNationalIdUrl] = useState("")
  const [rcUrl, setRcUrl] = useState("")

  console.log("licenseUrl: ", licenseUrl)
  console.log("nationalIdUrl: ", nationalIdUrl)
  console.log("rcUrl: ", rcUrl)

  // Post documents data
  const handleDocs = async () => {
    setLoading(true);
    setError("")
    try {
      const formData = new FormData();

      if (!docs.license || !docs.nationalId || !docs.rc) {
        setLoading(false);
        setError("All documents are required!");
        return null;
      }

      formData.append("nationalId", docs.nationalId!);
      formData.append("license", docs.license!);
      formData.append("rc", docs.rc!);

      const { data } = await axios.post(
        "/api/partner/onboarding/documents",
        formData,
      );

      if (data?.success) {
        setLoading(false);
        router.push("/partner/onboarding/bank");
      }

      if(!data.success){
        setLoading(false)
        setError(data.message)
      }

    } catch (error: any) {
      setLoading(false);
      setError(error?.response?.data?.message ?? "Something went wrong!")
    }
  };

  // get image data

  const handleImage = (doc: docsType, file: File | null) => {
    if (!file) {
      return;
    }

    setDocs((prev) => ({ ...prev, [doc]: file }));
  };


  /// Get vehicel data 

    useEffect(()=> {
      const handleGetDocuments = async ()=> {
        try {
          const {data} = await axios.get("/api/partner/onboarding/documents")
          if(data){
            setLicenseUrl(data?.license)
            setNationalIdUrl(data?.nationalId)
            setRcUrl(data?.rc)
          }
          
        } catch (error: any) {
          console.log("error: ", error)
        }
      }
      handleGetDocuments() 
    }, [])

    const isCompleted = docs.license && docs.nationalId && docs.rc

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
          <p className=" text-xs text-gray-700 font-bold">step 2 of 3</p>
          <h1 className=" text-2xl font-bold mt-1 text-gray-800">
            Vehicle Documents
          </h1>
          <p className=" text-sm text-gray-500 mt-2">Upload your documents</p>
        </div>

        {/* Documents data */}
        <div className=" mt-8 space-y-6">
          <motion.label
            whileHover={{ scale: 1.02 }}
            className=" flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black 
            transition"
          >
            <div>
              <p className=" text-sm font-semibold text-black">
                Passport / NID Proof
              </p>
              <p className=" text-xs text-gray-500">Goverment issued ID</p>
            </div>
            <div>
              <span className=" text-xs text-gray-400">Upload</span>
              <div className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                {docs?.nationalId || nationalIdUrl ? (
                  <Image
                    src={docs?.nationalId ? URL.createObjectURL(docs.nationalId) : nationalIdUrl}
                    width={100}
                    height={100}
                    alt="National ID"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UploadCloud size={18} />
                )}
              </div>
            </div>
            <input
              type="file"
              hidden
              accept="image/*, .pdf"
              onChange={(e) =>
                handleImage("nationalId", e.target?.files?.[0] || null)
              }
            />
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02 }}
            className=" flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black 
            transition"
          >
            <div>
              <p className=" text-sm font-semibold text-black">
                Driving License
              </p>
              <p className=" text-xs text-gray-500">Valid driving license</p>
            </div>
            <div>
              <span className=" text-xs text-gray-400">Upload</span>
              <div className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                {docs?.license || licenseUrl ? (
                  <Image
                    src={docs.license ? URL.createObjectURL(docs?.license) : licenseUrl}
                    width={100}
                    height={100}
                    alt="License"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UploadCloud size={18} />
                )}
              </div>
            </div>
            <input
              type="file"
              hidden
              accept="image/*, .pdf"
              onChange={(e) =>
                handleImage("license", e.target?.files?.[0] || null)
              }
            />
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02 }}
            className=" flex items-center justify-between p-4 rounded-2xl border border-gray-200 cursor-pointer hover:border-black 
            transition"
          >
            <div>
              <p className=" text-sm font-semibold text-black">Vehicle RC</p>
              <p className=" text-xs text-gray-500">Registration Certificate</p>
            </div>
            <div>
              <span className=" text-xs text-gray-400">Upload</span>
              <div className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                {docs?.rc || rcUrl ? (
                  <Image
                    src={docs.rc ? URL.createObjectURL(docs.rc) : rcUrl}
                    width={100}
                    height={100}
                    alt="Registation certificate"
                    className=" w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <UploadCloud size={18} />
                )}
              </div>
            </div>
            <input
              type="file"
              hidden
              accept="image/*, .pdf"
              onChange={(e) => handleImage("rc", e.target?.files?.[0] || null)}
            />
          </motion.label>
        </div>

        <div className=" mt-5 flex items-center gap-3 text-xs text-gray-500">
          <FileCheck size={16} />
          <p>
            Documents are securely stored and manually verified by our team.
          </p>
        </div>

        {error && (
          <p className=" text-sm text-red-500 mt-5 p-1 bg-red-50 font-semibold rounded-md mb-3">
            {error}
          </p>
        )}

        <motion.button
          disabled={ !isCompleted || loading}
          onClick={handleDocs}
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
