import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequestBaptismForm, RequestConfirmationForm, RequestDeathForm, LandingPage, RequestMarriageForm, SignInPage, SignUpPage, UserCertificate, ScheduleBaptismForm, ScheduleDeathForm, ScheduleMarriageForm, ScheduleConfirmationForm, UserSchedule } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        {/* Auth */}
        <Route path='/login' element={<SignInPage />}/>
        <Route path='/register' element={<SignUpPage />}/>
        {/* Request */}
        <Route path='/:id/request' element={<UserCertificate />}/>
        <Route path='/:id/request/baptism' element={<RequestBaptismForm />}/>
        <Route path='/:id/request/death' element={<RequestDeathForm />}/>
        <Route path='/:id/request/marriage' element={<RequestMarriageForm />}/>
        <Route path='/:id/request/confirmation' element={<RequestConfirmationForm />}/>
        {/* Schedule */}
        <Route path='/:id/schedule' element={<UserSchedule />}/>
        <Route path='/:id/schedule/baptism' element={<ScheduleBaptismForm />}/>
        <Route path='/:id/schedule/death' element={<ScheduleDeathForm />}/>
        <Route path='/:id/schedule/marriage' element={<ScheduleMarriageForm />}/>
        <Route path='/:id/schedule/confirmation' element={<ScheduleConfirmationForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App