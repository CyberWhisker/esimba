import { LinearProgress } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [auth, setAuth] = useState(null)

    const logout = async () => {
        localStorage.removeItem('auth')
        setAuth(null)
    }

    const checkStorage = async () => {
        setIsLoading(true)
        const user = localStorage.getItem('auth')
        if (user) {
            setAuth(JSON.parse(user))
        }
        setIsLoading(false)
    }

    useEffect(() => {
        checkStorage()
    },[])
    if (isLoading) {
        return (
            <LinearProgress/>
        )
    }

    return (
        <AuthContext.Provider value={{logout, auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}