import './index.css'
import { FloatingShap } from './Components/FloatingShap'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import Loginpage from './pages/Loginpage'
import Forgetpassword from './pages/Forgetpassword'
import toast, { Toaster } from 'react-hot-toast'
import EmailVerification from './pages/EmailVerification'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

import Dashboard from './pages/Dashboard'
import Loadingspinner from './pages/Loadingspinner'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Page404 from './pages/Page404'

// Protect routes that requre authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace={true} />
  }
  return children;
}


// redirect authenticated users to the home page
const RedirectAuthencatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace={true} />
  }
  return children;
}
function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br 
 from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShap color="bg-green-500 " size="w-64 h-64" top="-5" left="10%" delay={0} />
      <FloatingShap color="bg-emerald-500 " size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShap color="bg-lime-500 " size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path='/signup' element={
          <RedirectAuthencatedUser>
            <Signup />
          </RedirectAuthencatedUser>

        } />
        <Route path='/login' element={
          <RedirectAuthencatedUser>
            <Loginpage />
          </RedirectAuthencatedUser>

        } />
        <Route path='/forgot-password' element={
          <RedirectAuthencatedUser>
            <Forgetpassword />
          </RedirectAuthencatedUser>


        } />
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/reset-password/:token' element={
          <RedirectAuthencatedUser>
            <ResetPasswordPage />
          </RedirectAuthencatedUser>
        } />
        <Route path='*' element={<Page404 />}></Route>
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
