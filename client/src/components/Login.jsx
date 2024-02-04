import { useEffect, useState } from 'react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogin = async () => {
    const data = { email, password };
    axios
      .post('http://127.0.0.1:5000/get-user', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data['user']));
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {/* Avatar */}
          <div className='cursor-pointer'>
            <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full hover:bg-button'>
              {/* Avatar SVG here */}
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
          {isLoggedIn ? (
            <>
              <SheetHeader>
                <SheetTitle>Log Out</SheetTitle>
                <SheetDescription>Click below to log out.</SheetDescription>
              </SheetHeader>
              <div className='p-4'>
                <button
                  className='w-full p-2 text-white bg-red-500 rounded hover:bg-red-600'
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Login;
