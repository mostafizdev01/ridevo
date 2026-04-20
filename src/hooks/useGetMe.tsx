"use client"

import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetMe = ({ enabled }: { enabled: boolean }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!enabled) return;
        const getMe = async () => {
            try {
                const { data } = await axios.get('/api/user/me')
                dispatch(setUserData(data?.user))
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        getMe()

    }, [enabled]);
};

export default useGetMe