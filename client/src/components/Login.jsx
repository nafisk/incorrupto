import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';

function Login() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check local storage for user data
  // const user = localStorage.getItem('user');
  // if (user) {
  //   console.log('User found:', user);
  // }

  // Handle login
  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post('http://127.0.0.1:5000/get-user', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        console.log(response.data);
        // store user data in local storage
        localStorage.setItem('user', JSON.stringify(response.data['user']));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {/* Avatar */}
          <div className='cursor-pointer'>
            <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full hover:bg-button'>
              {/* Added hover effect */}
              <svg
                className='absolute w-12 h-12 text-gray-400 hover:text-white -left-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Log In</SheetTitle>
            <SheetDescription>
              Enter your email and password to log in.
            </SheetDescription>
          </SheetHeader>
          <div className='p-4'>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-2 mb-4 border rounded'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              required
              className='w-full p-2 mb-4 border rounded'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className='w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600'
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Login;
