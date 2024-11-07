import { create } from 'zustand'
import axios from 'axios'
import { LogOut } from 'lucide-react'
import Forgetpassword from '../pages/Forgetpassword'

const API = "http://localhost:5000/api/auth"
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message:null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error siging up ", isLoading: false })
            throw error

        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error login up ", isLoading: false })
            throw error

        }
    },
    Logout : async () => {
        set({ isLoading: true, error: null })
        try {
             await axios.post(`${API}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false,error:null })
        } catch (error) {
            set({ error: "Error Logout up ", isLoading: false })
            throw error

        }
    },

    verifyEmail: async(code)=>{
        set({ isLoading: true, error: null })
     //   await new Promise((resolve) => setTimeout(resolve,2000))
        try {
            const response = await axios.post(`${API}/verify-email`, { code });
            set({user:response.data.user, isAuthenticated:true , isLoading:false})
            return response.data
        } catch (error) {
            set({error: error.response.data.message|| "Error verify email",isLoading:false});
            throw error
        }
    },

checkAuth: async() =>{
    
    set({isCheckingAuth:true,error:null})
    try {
        const  response = await axios.get(`${API}/check-auth`)
            set({user: response.data.user,isAuthenticated:true,isCheckingAuth: false,})
    } catch (error) {
        set({ error:null, isCheckingAuth: false , isAuthenticated:false})
    }



},
forgotpassword : async(email) =>{
    set({ isLoading: true, error: null })
    try {
        const response = await axios.post(`${API}/forgot`, { email });
        set({message: response.data.message, isLoading: false });

}catch(error) {
    set({error: error.response.data.message|| "Error forget password",isLoading:false});
 throw error;
}
},
resetpassword : async(token, password) =>{
    set({isLoading:true,error:null})
    try {
        const response = await axios.post(`${API}/reset-password/${token}`,{password})
        set({message: response.data.message,isLoading:false})
    } catch (error) {
        set({error: error.response.data.message|| "Error reseting password",isLoading:false});
        throw error
    }
},
}))


