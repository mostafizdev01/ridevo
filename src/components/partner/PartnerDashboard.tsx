/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { RootState } from '@/src/redux/store';
import { Check, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


type Step = {
  id: number,
  title: string,
  route?: string
}

const STEPS: Step[] = [
  {id: 1, title: "Vehicle", route: "/partner/onboarding/vehicle"},
  {id: 2, title: "Documents", route: "/partner/onboarding/documents"},
  {id: 3, title: "Bank", route: "/partner/onboarding/bank"},
  {id: 4, title: "Review"},
  {id: 5, title: "Video KYC"},
  {id: 6, title: "Pricing"},
  {id: 7, title: "Final Review"},
  {id: 8, title: "Live"},
]


const TOTAL_STEPS = STEPS.length;

const PartnerDashboard = () => {
  const [activeStep, setActiveStep] = useState(0)
  const {userData} = useSelector((state: RootState)=> state.user)
  const router = useRouter()

  useEffect(()=>{
    if(userData){
      setActiveStep(userData?.partnerOnBoardingSteps + 1)
    }
  }, [userData])

  const progressPercentage = ((activeStep -1) / (TOTAL_STEPS -1 )) * 100;

  /// route push function
  const goToStep = (step: Step)=> {
    if(step.route && step.id <= activeStep){
      router.push(step.route)
    }
  }
  
  return (
    
    <div className=' min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 pt-28 pb-20'>
      <div className=' max-w-7xl mx-auto space-y-16'>
        <div>
          <h1 className=' text-4xl font-bold text-black'>Partner Onboarding</h1>
          <p className=' text-gray-600 mt-3'>Complete all steps to activate your accout</p>
        </div>

        <div className=' bg-white rounded-3xl p-10 shadow-xl border overflow-x-auto'>
          <div className=' relative min-w-200'>
            <div className=' absolute top-7 left-0 w-full h-0.75 bg-gray-200 rounded-full' />

            <motion.div
            animate={{width: `${progressPercentage}%`}}
            transition={{duration: 0.6}}
            className=' absolute top-7 left-0 h-0.75 bg-black rounded-full'
            />
            <div className=' relative flex justify-between'>
              {
                STEPS.map((s, index)=>{
                  const completed = s.id < activeStep
                  const active = s.id == activeStep
                  const locked = s.id > activeStep

                  return (
                    <motion.div
                    key={index}
                    onClick={()=> goToStep(s)}
                    whileHover={!locked ? {scale:  1.1} : {}}
                    className=' flex flex-col items-center z-10 cursor-pointer'
                    >

                      <div className={` w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
                        ${completed ? "bg-black text-white border-black" : active ? "border-black bg-white" : "border-gray-300 text-gray-400 bg-white"}`}>
                          {
                            completed ? (
                              <Check size={20} />
                            ): locked ? (
                              <Lock size={20} />
                            ): (
                              <span className=' text-gray-900 font-semibold'>{s.id}</span>
                            )
                          }
                      </div>
                      <p className=' mt-3 flex-col items-center z-10 text-black font-semibold'>{s.title}</p>

                    </motion.div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PartnerDashboard