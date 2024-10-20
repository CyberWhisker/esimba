import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequestBaptismForm, RequestConfirmationForm, RequestDeathForm, UserDashboard, RequestMarriageForm, SignInPage, SignUpPage, UserCertificate, ScheduleBaptismForm, ScheduleDeathForm, ScheduleMarriageForm, ScheduleConfirmationForm, UserSchedule, AdminDashboard, AdminUser, AdminRecord, Landing, Membership, AdminFile, AdminForm, AdminSchedule } from './pages'
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

        <Route path='/user' element={<AdminUser />}/>
        <Route path='/request/appointment' element={<AdminRequestAppointment />}/>
        <Route path='/request/certificate' element={<AdminRequestCertificate />}/>

        <Route path='/certificate/baptism' element={<AdminBaptism />}/>
        <Route path='/certificate/marriage' element={<AdminMarriage />}/>
        <Route path='/certificate/death' element={<AdminDeath />}/>
        <Route path='/certificate/confirmation' element={<AdminConfirmation />}/>
        <Route path='/schedule' element={<AdminSchedule />}/>

        <Route path='/record' element={<AdminRecord />}/>
        <Route path='/record/form/:type' element={<AdminForm/> }/>

        <Route path='/pdf' element={<AdminFile/> }/>

        {/* User Routes */}
        <Route path='/user/dashboard' element={<UserDashboard/>} />
        {/* Schedule */}
        <Route path='/user/schedule' element={<UserSchedule />}/>
        <Route path='/user/schedule/baptism' element={<ScheduleBaptismForm />}/>
        <Route path='/user/schedule/death' element={<ScheduleDeathForm />}/>
        <Route path='/user/schedule/marriage' element={<ScheduleMarriageForm />}/>
        <Route path='/user/schedule/confirmation' element={<ScheduleConfirmationForm />}/>
        {/* Request */}
        <Route path='/user/request' element={<UserCertificate />}/>
        <Route path='/user/request/baptism' element={<RequestBaptismForm />}/>
        <Route path='/user/request/death' element={<RequestDeathForm />}/>
        <Route path='/user/request/marriage' element={<RequestMarriageForm />}/>
        <Route path='/user/request/confirmation' element={<RequestConfirmationForm />}/>

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App