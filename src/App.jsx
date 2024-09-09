import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage, SignInPage, SignUpPage, UserCertificate } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<SignInPage />}/>
        <Route path='/register' element={<SignUpPage />}/>
        <Route path='/:id/certificate' element={<UserCertificate />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App