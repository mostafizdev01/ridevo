"use client"

import { useRef } from "react"
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

const page = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const containerRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const{userData} = useSelector((state: RootState)=> state.user)

    const handleClick = async ()=> {
        if(!containerRef){
            return null
        }

        try {
            const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
            const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret!, "asdfas",  userData?._id.toString()!, "Mostafiz");

            const zp = ZegoUIKitPrebuilt.create(kitToken)
            zp.joinRoom({
                container: containerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall
                },
                showPreJoinView: false
            })
        } catch (error) {
            console.log("zegoError: ", error)
        }
    }

  return (
    <div className=" bg-white h-screen flex justify-center items-center">
        <button onClick={handleClick} className=" border text-black py-2 px-5 hover:bg-black hover:text-white transition cursor-pointer rounded-md">Video Call</button>
    </div>
  )
}

export default page