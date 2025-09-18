'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const page = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();
    const payload = {
      name, 
      email,
      password
    }
    
    let res = await axios.post("http://localhost:4000/auth/login", payload);
    if (res.status === 200){
      // cookie will expire in 7 days
      Cookies.set("token", res.data.token, {expires: 7});
      router.push("/");
    }
  };

  // console.log(name, email, password);
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h1 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input 
                onChange={(e)=>{setEmail(e.target.value)}} 
                type="email" 
                id="email" 
                name="email" 
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input 
                onChange={(e)=>{setPassword(e.target.value)}} 
                type="password" 
                id="password" 
                name="password" 
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Enter your password'
              />
            </div>
          </div>

          <div>
            <button 
              type='submit'   
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page