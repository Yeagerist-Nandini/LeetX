import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast'


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    // checking if user is authenticated and getting user data
    checkAuth: async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get("/auth/my-profile");
            console.log("check auth response", res.data);

            set({authUser: res.data.user});
        } catch (error) {
            console.log("Error checking auth:", error);
            set({authUser: null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    //sigup 
    signup: async (data) => {
        set({isSigninUp: true});
        try {
            const res = await axiosInstance.post("/auth/register", data);
            
            set({authUser: res.data.user});

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up");
        }
        finally{
            set({isSigninUp: false});
        }
    },

    //login
    login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({authUser: res.data.user});

            toast.success(res.data.message);
            
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        }
        finally{
            set({isLoggingIn: false});
        }
    },

    //logout
    logout: async() => {
        try {
            await axiosInstance.get("/auth/logout");
            set({authUser: null});

            toast.success("Logout successful");
        } catch (error) {
            console.log("Error logging out", error);
            toast.error("Error logging out");
        }
    }
}))