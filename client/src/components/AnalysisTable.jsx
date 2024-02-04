import { useState } from 'react';
import DataTable from '@/components/DataTable';
import ToggleSwitch from '@/components/ToggleSwitch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ArticleTable({ handleAnalysis, setUrl}) {
  // Accepting the prop here
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      {' '}
      <h1 className='mb-4 text-3xl font-bold text-center'>Analysis</h1>
      <div className='flex justify-between'>
        <label className='flex items-center cursor-pointer'>
          <ToggleSwitch setShowTable={setShowTable} />
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
            {showTable ? 'Hide Previous Reports' : 'Show Previous Reports'}
          </span>
        </label>

        <div>
          <div className='flex items-center w-full max-w-sm'>
            <Input
              type='email'
              placeholder='URL'
              className='rounded-l-xl'
              onChange={e => setUrl(e.target.value)}
            />
            <Button
              type='submit'
              className='rounded-r-xl bg-button text-buttonText hover:bg-highlight'
              onClick={handleAnalysis}
            >
              Analyze
            </Button>
          </div>
        </div>
      </div>
      {showTable && <DataTable />}
    </>
  );
}

export default ArticleTable;
