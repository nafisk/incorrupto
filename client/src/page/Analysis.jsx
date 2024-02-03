import { useState } from 'react';
import Navbar from '@/components/navbar';
import DataTable from '@/components/DataTable';
import ToggleSwitch from '@/components/ToggleSwitch'; // Corrected import for ToggleSwitch

function Analysis() {
  // State to track the visibility of the DataTable
  const [showTable, setShowTable] = useState(false);

  return (
    <div>
      <Navbar />
      <div className='w-full mt-5'>
        <div className='max-w-[1175px] mx-auto text-sm'>
          <div>
            {/* Toggle Switch to control the DataTable */}
            <label className='flex items-center cursor-pointer'>
              <ToggleSwitch setShowTable={setShowTable} />
              <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                {showTable ? 'Hide Previous Reports' : 'Show Previous Reports'}
              </span>
            </label>

            {/* Conditionally render the DataTable */}
            {showTable && <DataTable />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
