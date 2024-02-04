import logo from '../assets/icon.png';
import Login from './Login';

function Navbar({}) {
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
                  className='block px-3 py-2 font-bold rounded text-paragraph hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-highlight md:p-0 dark:text-main md:dark:hover:text-highlight dark:hover:bg-tertiary dark:hover:text-main md:dark:hover:bg-transparent'
                >
                  Analysis
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-3 py-2 font-bold rounded text-paragraph hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-tertiary md:p-0 dark:text-main md:dark:hover:text-highlight dark:hover:bg-tertiary dark:hover:text-main md:dark:hover:bg-transparent'
                >
                  About
                </a>
              </li>
              {/* Add other menu items here */}
            </ul>
          </div>

          {/* Avatar */}
          <div className='flex flex-col items-center justify-center ml-10'>
            <Login />
          </div>
        </div>
      </div>
      <div className='block w-full h-0.5 bg-button opacity-10 max-w-screen-2xl px-4 mx-auto' />
    </nav>
  );
}

export default Navbar;
