import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { RequestBaptismForm, RequestConfirmationForm, RequestDeathForm, UserDashboard, RequestMarriageForm, SignInPage, SignUpPage, UserCertificate, ScheduleBaptismForm, ScheduleDeathForm, ScheduleMarriageForm, ScheduleConfirmationForm, UserSchedule, AdminDashboard, AdminUser, Landing, Membership, AdminSchedule, UserViewCertificate, UserViewSchedule, AdminTransaction, AdminDonation, UserDonation, SelectRegistration, UserProfile, AdminMaintenance, AdminSubscription, ExpiredPage } from './pages'
import { AuthContext } from './context/AuthContext';
import SignUpAdmin from './pages/Auth/SIngUpAdmin/SignUpAdmin';
import { AdminBaptism, AdminConfirmation, AdminDeath, AdminMarriage } from './pages/AdminCertificate';
import { AdminRequestAppointment, AdminRequestCertificate } from './pages/AdminRequest';
import { fetchSubscriptionByChapelId } from './api/subscription';

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [isValidSubscription, setIsValidSubscription] = React.useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (auth?.user?.parish) {
        const { data, error } = await fetchSubscriptionByChapelId(auth.user.parish._id);
        if (!error) {
          setIsValidSubscription(data?.status);
        }
      }
      setLoading(false);
    };
    checkSubscription();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading spinner or skeleton here if desired
  }

  return isValidSubscription ? children : <Navigate to="/renew" replace />;
}

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path='/selectRegistration' element={<SelectRegistration />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/register/:id' element={<SignUpAdmin />} />
        <Route path='/renew' element={<ExpiredPage />} />
        {/* Main */}
        <Route path='/' element={<Landing />} />
        <Route path='/membership' element={<Membership />} />

        {/* User Routes */}
        <Route path='/user/dashboard' element={auth ? <UserDashboard /> : <SignInPage />} />
        <Route path='/user/profile' element={auth ? <UserProfile /> : <SignInPage />} />
        <Route path='/user/donation' element={auth ? <UserDonation /> : <SignInPage />} />
        {/* Schedule */}
        <Route path='/user/schedule' element={auth ? <UserSchedule /> : <SignInPage />} />
        <Route path='/user/schedule/baptism' element={auth ? <ScheduleBaptismForm /> : <SignInPage />} />
        <Route path='/user/schedule/death' element={auth ? <ScheduleDeathForm /> : <SignInPage />} />
        <Route path='/user/schedule/marriage' element={auth ? <ScheduleMarriageForm /> : <SignInPage />} />
        <Route path='/user/schedule/confirmation' element={auth ? <ScheduleConfirmationForm /> : <SignInPage />} />
        {/* Request */}
        <Route path='/user/request' element={auth ? <UserCertificate /> : <SignInPage />} />
        <Route path='/user/request/baptism' element={auth ? <RequestBaptismForm /> : <SignInPage />} />
        <Route path='/user/request/death' element={auth ? <RequestDeathForm /> : <SignInPage />} />
        <Route path='/user/request/marriage' element={auth ? <RequestMarriageForm /> : <SignInPage />} />
        <Route path='/user/request/confirmation' element={auth ? <RequestConfirmationForm /> : <SignInPage />} />
        {/* View Certificate */}
        <Route path='/user/certificate' element={auth ? <UserViewCertificate /> : <SignInPage />} />
        {/* View Schedule */}
        <Route path='/user/viewSchedule' element={auth ? <UserViewSchedule /> : <SignInPage />} />

        {/* Admin Routes */}
        <Route
          path='/admin/dashboard'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> :
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
          }
        />

        <Route
          path='/user'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminUser />
          }
        />

        <Route
          path='/request/appointment'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminRequestAppointment />
          }
        />

        <Route
          path='/request/certificate'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminRequestCertificate />
          }
        />

        <Route
          path='/certificate/baptism'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminBaptism />
          }
        />

        <Route
          path='/certificate/marriage'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminMarriage />
          }
        />

        <Route
          path='/certificate/death'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminDeath />
          }
        />

        <Route
          path='/certificate/confirmation'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminConfirmation />
          }
        />

        <Route
          path='/schedule'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminSchedule />
          }
        />

        <Route
          path='/transaction'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminTransaction />
          }
        />

        <Route
          path='/donation'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminDonation />
          }
        />

        <Route
          path='/maintenance'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminMaintenance />
          }
        />

        <Route
          path='/subscription'
          element={
            !auth || auth?.user?.role === 3 ? <SignInPage /> : <AdminSubscription />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App