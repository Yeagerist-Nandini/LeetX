import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminRoute = () => {
//   const {authUser, isCheckingAuth} = useAuthStore();

  const authUser = {
    role: "ADMIN"
  }

  const isCheckingAuth = false;

  if(isCheckingAuth){
    return <div className='flex items-center h-screen'>
        <Loader className='size-10 animate-spin'/>
    </div>
  }

  if(!authUser || authUser.role !== "ADMIN"){
    return <div>
        {toast.error("Not Authorized")}
        <Navigate to="/"/>
    </div> 
  }

  return <Outlet/>
}

export default AdminRoute