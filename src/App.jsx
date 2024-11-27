import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequestBaptismForm, RequestConfirmationForm, RequestDeathForm, UserDashboard, RequestMarriageForm, SignInPage, SignUpPage, UserCertificate, ScheduleBaptismForm, ScheduleDeathForm, ScheduleMarriageForm, ScheduleConfirmationForm, UserSchedule, AdminDashboard, AdminUser, Landing, Membership, AdminSchedule, UserViewCertificate, UserViewSchedule, AdminTransaction } from './pages'
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

        {/* User Routes */}
        <Route path='/user/dashboard' element={auth ? <UserDashboard/> : <SignInPage/>} />
        {/* Schedule */}
        <Route path='/user/schedule' element={auth ? <UserSchedule /> : <SignInPage/>}/>
        <Route path='/user/schedule/baptism' element={auth ? <ScheduleBaptismForm /> : <SignInPage/>}/>
        <Route path='/user/schedule/death' element={auth ? <ScheduleDeathForm /> : <SignInPage/>}/>
        <Route path='/user/schedule/marriage' element={auth ? <ScheduleMarriageForm /> : <SignInPage/>}/>
        <Route path='/user/schedule/confirmation' element={auth ? <ScheduleConfirmationForm /> : <SignInPage/>}/>
        {/* Request */}
        <Route path='/user/request' element={auth ? <UserCertificate /> : <SignInPage/>}/>
        <Route path='/user/request/baptism' element={auth ? <RequestBaptismForm /> : <SignInPage/>}/>
        <Route path='/user/request/death' element={auth ? <RequestDeathForm /> : <SignInPage/>}/>
        <Route path='/user/request/marriage' element={auth ? <RequestMarriageForm /> : <SignInPage/>}/>
        <Route path='/user/request/confirmation' element={auth ? <RequestConfirmationForm /> : <SignInPage/>}/>
        {/* View Certificate */}
        <Route path='/user/certificate' element={auth ? <UserViewCertificate /> : <SignInPage/>}/>
        {/* View Schedule */}
        <Route path='/user/viewSchedule' element={auth ? <UserViewSchedule /> : <SignInPage/>}/>

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={auth ? <AdminDashboard/> : <SignInPage/>} />
        <Route path='/user' element={<AdminUser />}/>
        <Route path='/request/appointment' element={auth ? <AdminRequestAppointment /> : <SignInPage/>}/>
        <Route path='/request/certificate' element={auth ? <AdminRequestCertificate />  : <SignInPage/>}/>
        <Route path='/certificate/baptism' element={auth ? <AdminBaptism /> : <SignInPage/>}/>
        <Route path='/certificate/marriage' element={auth ? <AdminMarriage /> : <SignInPage/>}/>
        <Route path='/certificate/death' element={auth ? <AdminDeath /> : <SignInPage/>}/>
        <Route path='/certificate/confirmation' element={auth ? <AdminConfirmation /> : <SignInPage/>}/>
        <Route path='/schedule' element={auth ? <AdminSchedule /> : <SignInPage/>}/>
        <Route path='/transaction' element={auth ? <AdminTransaction /> : <SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App