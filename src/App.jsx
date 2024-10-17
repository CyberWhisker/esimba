import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequestBaptismForm, RequestConfirmationForm, RequestDeathForm, UserDashboard, RequestMarriageForm, SignInPage, SignUpPage, UserCertificate, ScheduleBaptismForm, ScheduleDeathForm, ScheduleMarriageForm, ScheduleConfirmationForm, UserSchedule, AdminDashboard, AdminUser, AdminAppointment, AdminRecord, Landing, Membership, AdminFile, AdminForm } from './pages'
import { AuthContext } from './context/AuthContext';
import SignUpAdmin from './pages/Auth/SIngUpAdmin/SignUpAdmin';
import { AdminBaptism, AdminConfirmation, AdminDeath, AdminMarriage } from './pages/AdminCertificate';
import { AdminRequestAppointment, AdminRequestCertificate } from './pages/AdminRequest';

function App() {
  const {auth} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path='/login' element={<SignInPage />}/>
        <Route path='/register' element={<SignUpPage />}/>
        <Route path='/register/:id' element={<SignUpAdmin />}/>
        {/* Main */}
        <Route path='/' element={<Landing/>}/>
        <Route path='/membership' element={<Membership/>}/>

        <Route path='/dashboard' element={
          auth ? 
          (auth.user.role != 3 ?
            <AdminDashboard/> :
            <UserDashboard/>
          ) : 
          <SignInPage/>
        }/>
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

        <Route path='/user' element={<AdminUser />}/>
        <Route path='/request/appointment' element={<AdminRequestAppointment />}/>
        <Route path='/request/certificate' element={<AdminRequestCertificate />}/>

        <Route path='/certificate/baptism' element={<AdminBaptism />}/>
        <Route path='/certificate/marriage' element={<AdminMarriage />}/>
        <Route path='/certificate/death' element={<AdminDeath />}/>
        <Route path='/certificate/confirmation' element={<AdminConfirmation />}/>

        <Route path='/record' element={<AdminRecord />}/>
        <Route path='/record/form/:type' element={<AdminForm/> }/>

        <Route path='/pdf' element={<AdminFile/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App