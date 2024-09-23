import { Box } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = () => {
    const [isLoading, setIsLoading] = useState()
    const [auth, setAuth] = useState()
    
    const login = async () => {
        console.log("Login COntroller")
    }

    const register = async () => {
        console.log("Register COntroller")
    }

    const logout = async () => {
        console.log("LogOut COntroller")
    }

    const checkStorage = async () => {

    }

    useEffect(() => {

    },[])

    if (isLoading) {
        return (
            <AuthContext.Provider>AuthContext</AuthContext.Provider>
        )
    }

    return (
        <AuthContext.Provider>AuthContext</AuthContext.Provider>
    )
}