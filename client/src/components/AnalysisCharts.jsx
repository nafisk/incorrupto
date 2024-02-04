import { useState } from 'react';
import ChartSection from './ChartSection';

function AnalysisCharts() {
  const [showYoutube, setShowYoutube] = useState(false);

  return (
    <div className='mt-12'>
      {/* Article Info: Title, Author, Date posted, etc */}
      <div className='flex justify-between'>
        {/* Article Info */}
        <div className='w-1/2 p-4 leading-loose'>
          <h1 className='my-4 text-2xl font-bold'>Title of the Article</h1>

          {/* Author */}
          <p className='my-4 text-lg'>
            <span className='font-bold'>Author:</span>
            <a
              href={`https://www.google.com/search?q=John+Doe`}
              target='_blank'
              rel='noopener noreferrer'
              className='px-3 py-1 mx-2 text-white bg-orange-400 rounded-full cursor-pointer hover:bg-orange-500 focus:bg-orange-700'
            >
              John Doe
            </a>
          </p>

          {/* People of Interest */}
          <p className='my-4 text-lg'>
            <span className='font-bold'>People of Interest:</span>
            <a
              href={`https://www.google.com/search?q=John+Doe`}
              target='_blank'
              rel='noopener noreferrer'
              className='px-3 py-1 mx-2 text-white bg-orange-400 rounded-full cursor-pointer hover:bg-orange-500 focus:bg-orange-700'
            >
              John Doe
            </a>
          </p>

          {/* Places of Interest */}
          <p className='my-4 text-lg'>
            <span className='font-bold'>Places of Interest:</span>
            <a
              href={`https://www.google.com/search?q=New+York`}
              target='_blank'
              rel='noopener noreferrer'
              className='px-3 py-1 mx-2 text-white bg-orange-400 rounded-full cursor-pointer hover:bg-orange-500 focus:bg-orange-700'
            >
              New York
            </a>
          </p>

          {/* Date Posted */}
          <p className='mt-4 text-lg'>
            <span className='font-bold'>Date Posted: </span>
            February 3, 2024
          </p>
        </div>

        {/* YouTube Embedding */}
        <div className='w-1/2 p-4'>
          {showYoutube && (
            <iframe
              width='100%'
              height='315'
              src='https://www.youtube.com/embed/[VIDEO_ID]'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* Summary and Image */}
      <div className='flex'>
        {/* Summary Section */}
        <div className='w-2/3 p-4'>
          <h2 className='mb-4 text-xl font-semibold'>Summary</h2>
          <p className='text-lg'>
            {/* Summary text here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            {/* Add more paragraphs as needed */}
          </p>
        </div>

        {/* Image Section */}
        <div className='w-1/3 p-4'>
          <img
            src='https://img.freepik.com/free-vector/comic-burst-text-balloons-flat-icon-collection_74855-5779.jpg'
            alt='Descriptive Alt Text'
            className='object-cover w-full h-auto rounded-lg'
          />
        </div>
      </div>

      {/* Display Charts */}
      <ChartSection />
    </div>
  );
}

export default AnalysisCharts;
