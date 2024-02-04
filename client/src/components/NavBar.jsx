import { useState } from 'react';
import logo from '../assets/icon.png';

function Navbar() {
  // check local storage for user data
  const [avatar, setAvatar] = useState(
    'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png'
  );
  const user = localStorage.getItem('user');
  if (user) {
    console.log('User found:', user);
  }

  // handle login
  const handleLogin = () => {
    console.log('Login clicked');
  };

  return (
    <nav className='border-gray-200 bg-background dark:bg-paragraph'>
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src={logo} className='h-32' alt='Logo' />
        </a>

        {/* Main navigation and button for smaller screens */}
        <div className='flex items-center'>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>

          {/* Main menu */}
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-background dark:bg-gray-800 md:dark:bg-paragraph dark:border-gray-700'>
              {/* Menu items */}
              <li>
                <a
                  href='#'
                  className='block px-3 py-2 rounded text-paragraph hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-highlight md:p-0 dark:text-main md:dark:hover:text-highlight dark:hover:bg-tertiary dark:hover:text-main md:dark:hover:bg-transparent'
                >
                  Analysis
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-3 py-2 rounded text-paragraph hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-tertiary md:p-0 dark:text-main md:dark:hover:text-highlight dark:hover:bg-tertiary dark:hover:text-main md:dark:hover:bg-transparent'
                >
                  About
                </a>
              </li>
              {/* Add other menu items here */}
            </ul>
          </div>

          {/* Avatar */}
          <div
            className='hidden ml-10 cursor-pointer md:block'
            onClick={handleLogin}
          >
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
        </div>
      </div>
      <div className='block w-full h-0.5 bg-button opacity-10 max-w-screen-2xl px-4 mx-auto' />
    </nav>
  );
}

export default Navbar;
