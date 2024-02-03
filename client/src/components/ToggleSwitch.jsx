import PropTypes from 'prop-types';

const ToggleSwitch = ({ setShowTable }) => {
  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only peer'
        onChange={() => setShowTable(prev => !prev)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
    </label>
  );
};

// Define PropTypes for ToggleSwitch
ToggleSwitch.propTypes = {
  setShowTable: PropTypes.func.isRequired,
};

export default ToggleSwitch;
