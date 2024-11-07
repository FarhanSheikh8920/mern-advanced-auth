import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../Components/Input'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
const loginpage = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState()
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
    return regex.test(password);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setpassword(value);
    if (value === '') {
      setPasswordError('Password cannot be empty');
    } else if (!validatePassword(value)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
    } else {
      setPasswordError('');
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setemail(value);

    if (value === '') {
      setEmailError('Email cannot be empty');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const isButtonDisabled = email == '' || password == ''


  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError == '' && passwordError == '') {
      try {
        await login(email, password)
      } catch (error) {
        console.error('login error')
        toast.error('Make  sure to fill in all fields and enter a valid email and password');
      }
    }

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blue-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className="p-8">
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <Input icon={Mail}
            type='text'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange} />
          {emailError && <p className='text-red-500 '>{emailError}</p>}

          <Input icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange} />
          {passwordError && <p className='text-red-500'>{passwordError}</p>}
          
          <div className="flex item-center mb-2"></div>
         
          <Link to={"/forgot-password"} className='text-green-400 hover:underline text-sm'>
            Forget password ?

          </Link>
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

          <motion.button
            className='mt-5 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 font-bold shadow-lg text-center hover:from-green-600 hover:to-emerald-700 focus:outline-none rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
   cursor-pointer'
            whileHover={{ scale: 1.02 }}
            whileTop={{ scale: 0.98 }}
            type='Submit'
            disabled={isLoading || isButtonDisabled}
          >
            {isLoading ? <Loader className='animate-spin mx-auto' /> : 'Login'}




          </motion.button>
          <div className="my-3  px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className='text-sm text-gray-400'>
              Don't Have an Account ?{" "}
              <Link to={"/signup"} className='text-green-400 hover:underline'>
                Signup

              </Link>
            </p>



          </div>


        </ form>
      </div>
    </motion.div>
  )
}

export default loginpage