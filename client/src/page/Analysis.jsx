import { useState } from 'react';
import Navbar from '@/components/navbar';
import DataTable from '@/components/DataTable';

function Analysis() {
  // State to track the visibility of the DataTable
  const [showTable, setShowTable] = useState(false);

  return (
    <div>
      <Navbar />
      <div className='w-full mt-5'>
        <div className='max-w-[1175px] mx-auto text-sm'>
          <div>
            {/* Switch/Button to toggle the DataTable */}
            <button
              className='px-3 py-3 text-white transition duration-300 ease-in-out bg-purple-600 rounded hover:bg-red-400'
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? 'Hide Previous Reports' : 'Show Previous Reports'}
              _TURN TO SWITCH_
            </button>

            {/* Conditionally render the DataTable */}
            {showTable && <DataTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
