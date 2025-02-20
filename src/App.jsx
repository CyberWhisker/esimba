import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  RequestBaptismForm,
  RequestConfirmationForm,
  RequestDeathForm,
  UserDashboard,
  RequestMarriageForm,
  SignInPage,
  SignUpPage,
  UserCertificate,
  ScheduleBaptismForm,
  ScheduleDeathForm,
  ScheduleMarriageForm,
  ScheduleConfirmationForm,
  UserSchedule,
  AdminDashboard,
  AdminUser,
  Landing,
  Membership,
  AdminSchedule,
  UserViewCertificate,
  UserViewSchedule,
  AdminTransaction,
  AdminDonation,
  UserDonation,
  SelectRegistration,
  UserProfile,
  AdminMaintenance,
  AdminSubscription,
  ExpiredPage,
  Verify,
} from './pages';
import { AuthContext } from './context/AuthContext';
import SignUpAdmin from './pages/Auth/SIngUpAdmin/SignUpAdmin';
import { AdminBaptism, AdminConfirmation, AdminDeath, AdminMarriage } from './pages/AdminCertificate';
import { AdminRequestAppointment, AdminRequestCertificate } from './pages/AdminRequest';
import { fetchSubscriptionByChapelId } from './api/subscription';
import RequestResetPassword from './pages/RequestResetPassword/RequestResetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { fetchUserById } from './api/userApi';
import NotVerified from './pages/NotVerified/NotVerified';
import AdminEvent from './pages/AdminEvent/AdminEvent';
import moment from 'moment';
import BaptismForm from './pages/UserViewSchedule/FormCertificate/BaptismForm';
import ConfirmationForm from './pages/UserViewSchedule/FormCertificate/ConfirmationForm';
import DeathForm from './pages/UserViewSchedule/FormCertificate/DeathForm';
import MarriageForm from './pages/UserViewSchedule/FormCertificate/MarriageForm';
import PriestSchedule from './pages/PriestSchedule/PriestSchedule';
import UserRequest from './pages/UserRequest/UserRequest';
import AdminPrice from './pages/AdminPrice/AdminPrice';
import AdminReport from './pages/AdminReport/AdminReport';

// Wrapper for authenticated and verified user routes
function VerifiedUserRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerification = async () => {
      if (auth?.user) {
        try {
          const { data } = await fetchUserById(auth.user._id);
          setIsVerified(data.verified);
        } catch (error) {
          console.error('Verification check failed:', error);
        }
      }
      setLoading(false);
    };
    checkVerification();
  }, [auth]);

  if (!auth) return <Navigate to="/login" replace />;
  if (loading) return <div>Loading...</div>;
  if (!isVerified) return <Navigate to="/notVerified" replace />;

  return children;
}

// Wrapper for subscription-based routes
function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isValidSubscription, setIsValidSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (auth?.user?.parish) {
        const { data, error } = await fetchSubscriptionByChapelId(auth.user.parish._id);
        if (!error) {
          if (data?.status && moment(data.endDate).isSameOrBefore(moment())) {
            console.log("Subscription is expired");
            setIsValidSubscription(false);
          } else {
            console.log("Subscription is active");
            setIsValidSubscription(true);
          }
        }
      }
      setLoading(false);
    };
    checkSubscription();
  }, [auth]);

  if (loading) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;
  if (auth?.user?.role == 3) return <Navigate to="/login" replace />;
  if (auth?.user?.role != 1) {
    if (!isValidSubscription) return <Navigate to="/renew" replace />;
  }

  return children;
}

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/selectRegistration" element={<SelectRegistration />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/register/:id" element={<SignUpAdmin />} />
        <Route path="/renew" element={<ExpiredPage />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/request-reset-password" element={<RequestResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/notVerified" element={<NotVerified />} />

        {/* Main */}
        <Route path="/" element={<Landing />} />
        <Route path="/membership" element={<Membership />} />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <VerifiedUserRoute>
              <UserDashboard />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <VerifiedUserRoute>
              <UserProfile />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/donation"
          element={
            <VerifiedUserRoute>
              <UserDonation />
            </VerifiedUserRoute>
          }
        />
        {/* Schedule */}
        <Route
          path="/user/schedule"
          element={
            <VerifiedUserRoute>
              <UserSchedule />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/schedule/baptism"
          element={
            <VerifiedUserRoute>
              <ScheduleBaptismForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/schedule/death"
          element={
            <VerifiedUserRoute>
              <ScheduleDeathForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/schedule/marriage"
          element={
            <VerifiedUserRoute>
              <ScheduleMarriageForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/schedule/confirmation"
          element={
            <VerifiedUserRoute>
              <ScheduleConfirmationForm />
            </VerifiedUserRoute>
          }
        />
        {/* Request */}
        {/* <Route
          path="/user/request"
          element={
            <VerifiedUserRoute>
              <UserCertificate />
            </VerifiedUserRoute>
          }
        /> */}
        <Route
          path="/user/request"
          element={
            <VerifiedUserRoute>
              <UserRequest />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/request/baptism"
          element={
            <VerifiedUserRoute>
              <RequestBaptismForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/request/death"
          element={
            <VerifiedUserRoute>
              <RequestDeathForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/request/marriage"
          element={
            <VerifiedUserRoute>
              <RequestMarriageForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/request/confirmation"
          element={
            <VerifiedUserRoute>
              <RequestConfirmationForm />
            </VerifiedUserRoute>
          }
        />
        {/* View Certificate */}
        <Route
          path="/user/certificate"
          element={
            <VerifiedUserRoute>
              <UserViewCertificate />
            </VerifiedUserRoute>
          }
        />
        {/* View Schedule */}
        <Route
          path="/user/viewSchedule"
          element={
            <VerifiedUserRoute>
              <UserViewSchedule />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/baptismForm"
          element={
            <VerifiedUserRoute>
              <BaptismForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/confirmationForm"
          element={
            <VerifiedUserRoute>
              <ConfirmationForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/deathForm"
          element={
            <VerifiedUserRoute>
              <DeathForm />
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user/marriageForm"
          element={
            <VerifiedUserRoute>
              <MarriageForm />
            </VerifiedUserRoute>
          }
        />
        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/user"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminUser />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/request/appointment"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminRequestAppointment />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/request/certificate"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminRequestCertificate />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/certificate/baptism"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminBaptism />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/certificate/marriage"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminMarriage />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/certificate/death"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminDeath />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/certificate/confirmation"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminConfirmation />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminSchedule />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminTransaction />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminDonation />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminMaintenance />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminSubscription />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/event"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminEvent />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/priestSchedule"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <PriestSchedule />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/price"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminPrice />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        <Route
          path="/report"
          element={
            <VerifiedUserRoute>
              <ProtectedRoute>
                <AdminReport />
              </ProtectedRoute>
            </VerifiedUserRoute>
          }
        />
        {/* <Route
          path="/testUpload"
          element={
            <MarriageFiles />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
