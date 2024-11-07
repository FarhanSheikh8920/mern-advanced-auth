import { motion } from 'framer-motion'
import Input from '../Components/Input'
import {  Loader, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PasswordStrengthMeter from '../Components/PasswordStrengthMeter'
import { useAuthStore } from '../store/authStore.js'

export const Signup = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/;
    return regex.test(password);
  };
  const validateName = (name) => {
   const regex= /^\p{L}[\p{L}\s.'-]*\p{L}$/u ; // Example: username must be at least 3 characters long
   return regex.test(name)
    
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
  
  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setname(value);

    if (value === '') {
      setNameError('Username cannot be empty');
    } else if (!validateName(value)) {
      setNameError('Make sure there is only letter Upper  and lower case');

    } 
    else {
      setNameError('');
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
  const handlesignup = async (e) => {
    e.preventDefault();
      if(emailError==''&&passwordError==""&&nameError==""){

    try {
      await signup(email, password, name)
      navigate("/verify-email")
    } catch (error) {
      console.log('ider hai bhai')
    }

  }else{
    toast.error('Make Sure its valid  or not be empty')

      }

    }
    const isButtonDisabled = email==''||password==''|| name=='';

  return (
    <motion.div

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blue-xl rounded-2xl shadow-xl overflow-hidden'


    >
      <div className="p-8">
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Create An Account
        </h2>
        <form onSubmit={handlesignup}>

          <Input
            icon={User}
            type='text'
            placeholder='Username'
            value={name}
            onChange={handleNameChange}
          />
          {nameError && <p className='text-red-500'>{nameError}</p>}

          <Input
            icon={Mail}
            type='text'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
           {emailError && <p className='text-red-500 '>{emailError}</p>}
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange  }
          />
          {passwordError && <p className='text-red-500'>{passwordError}</p>}
          {error && <p className='text-red-500 font-semibold'>{error.message}</p>}

          <PasswordStrengthMeter password={password} />



          <motion.button
            className='mt-5 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 font-bold shadow-lg text-center hover:from-green-600 hover:to-emerald-700 focus:outline-none rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
   cursor-pointer'
            whileHover={{ scale: 1.02 }}
            whileTop={{ scale: 0.98 }}
            type='Submit'
            disabled={isLoading||isButtonDisabled}
          
          >
            {isLoading ? <Loader className='animate-spin mx-auto' /> : 'Sign Up'}



          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className='text-sm text-gray-400'>
          Aldready have an acccount ?{" "}
          <Link to={"/login"} className='text-green-400 hover:underline'>
            Login

          </Link>
        </p>



      </div>


    </motion.div>
  );
};
