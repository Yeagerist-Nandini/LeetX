import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = ({children}) => {
    const { logout } = useAuthStore();

    const onLogout = async () => {
        await logout();
    }


    return (
        <button className="hover:bg-primary hover:text-white text-base font-semibold" onClick={onLogout}>
            {children}
        </button>
    )
}

export default LogoutButton