import { useState } from 'react';
import Navbar from '@/components/navbar';
import DataTable from '@/components/DataTable';
import ToggleSwitch from '@/components/ToggleSwitch';
import BarGraph from './charts/BarGraph';
import PieChart from './charts/PieChart';
import DoughnutPie from './charts/DougnutPie';
import DelayBarChart from './charts/DelayBarChart';

// Default test data
const datatest = [65, 59, 80, 81, 56, 55, 40, 30]; // change this to zero as default.

const datatestpi = [20, 30, 40]; // set to zero

const fact_or_op_default = [20, 30]; // set to zero

function AnalysisCharts() {
  const [showTable, setShowTable] = useState(false);

  // Initial data setup for each graph type

  // IN EAACH OF these data points, the data entry is what should be changed.
  const initialBarGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Bar Graph Data',
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(116, 120, 141, 0.2)',
          'rgba(233, 30, 99, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(116, 120, 141, 1)',
          'rgba(233, 30, 99, 1)',
        ],
        borderWidth: 1,
        data: datatest,
      },
    ],
  };

  const initialPieChartData = {
    labels: ['Right-Wing', 'Left-Wing', 'Neutral'],
    datasets: [
      {
        label: 'Political Spectrum',
        data: datatestpi, // Ensure this array has three elements, one for each category
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red for Right-Wing
          'rgba(54, 162, 235, 0.6)', // Blue for Left-Wing
          'rgba(116, 120, 141, 0.6)', // Gray for Neutral
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red border for Right-Wing
          'rgba(54, 162, 235, 1)', // Blue border for Left-Wing
          'rgba(116, 120, 141, 1)', // Gray border for Neutral
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const initialDoughnutChartData = {
    labels: ['Fact', 'Opinion'],
    datasets: [
      {
        label: 'Analysis',
        data: fact_or_op_default, // Ensure this is defined somewhere in your code
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)', // Green for Fact
          'rgba(255, 159, 64, 0.5)', // Orange for Opinion
        ],
        hoverOffset: 4,
      },
    ],
  };

  const initialDelayBarChartData = {
    labels: [
      'Toxicity',
      'Masculine',
      'Feminine',
      'Insult',
      'Mental Illness',
      'Obscene',
      'Sexually Explicit',
      'Severely Toxic',
    ],
    datasets: [
      {
        label: 'Sentiment Analysis',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Red for Toxicity
          'rgba(54, 162, 235, 0.2)', // Blue for Masculine
          'rgba(255, 205, 86, 0.2)', // Yellow for Feminine
          'rgba(75, 192, 192, 0.2)', // Teal for Insult
          'rgba(153, 102, 255, 0.2)', // Purple for Mental Illness
          'rgba(255, 159, 64, 0.2)', // Orange for Obscene
          'rgba(201, 203, 207, 0.2)', // Light Grey for Sexually Explicit
          'rgba(233, 30, 99, 0.2)', // Pink for Severely Toxic
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Red
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 205, 86, 1)', // Yellow
          'rgba(75, 192, 192, 1)', // Teal
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(255, 159, 64, 1)', // Orange
          'rgba(201, 203, 207, 1)', // Light Grey
          'rgba(233, 30, 99, 1)', // Pink
        ],
        borderWidth: 1,
        data: datatest, // Ensure this array has eight elements, one for each category
      },
    ],
  };

  // State for each graph's data
  const [barGraphData, setBarGraphData] = useState(initialBarGraphData);
  const [pieChartData, setPieChartData] = useState(initialPieChartData);
  const [doughnutChartData, setDoughnutChartData] = useState(
    initialDoughnutChartData
  );
  const [delayBarChartData, setDelayBarChartData] = useState(
    initialDelayBarChartData
  );

  // Options (common for all charts if applicable)

  const optionsBarGraph = {
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Political Spectrum Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // This setting applies to charts with axes
      },
    },
  };

  const optionsPie = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Political Spectrum Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // This setting applies to charts with axes
      },
    },
  };

  const optionsDoughNut = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Fact and Opinion Percentages',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // This setting applies to charts with axes
      },
    },
  };

  return (
    <div className='mt-12'>
      {/* Article Info: Title, Author, Date posted, etc */}
      <div className='leading-loose'>
        <h1 className='mb-4 text-2xl font-bold'>Title of the Article</h1>

        {/* Author */}
        <p className='text-lg'>
          Author:
          <a
            href={`https://www.google.com/search?q=John+Doe`}
            target='_blank'
            rel='noopener noreferrer'
            className='px-3 py-1 mx-2 text-white bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700 focus:bg-indigo-800'
          >
            John Doe
          </a>
        </p>

        {/* Date posted */}
        <p className='mb-2 text-md'>Date Posted: January 1, 2024</p>

        {/* People of Interest */}
        <p className='text-lg'>
          People of Interest:
          <a
            href={`https://www.google.com/search?q=John+Doe`}
            target='_blank'
            rel='noopener noreferrer'
            className='px-3 py-1 mx-2 text-black bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 focus:bg-gray-500'
          >
            John Doe
          </a>
        </p>

        {/* Places of Interest */}
        <p className='text-lg'>
          Places of Interest:
          <a
            href={`https://www.google.com/search?q=New+York`}
            target='_blank'
            rel='noopener noreferrer'
            className='px-3 py-1 mx-2 text-black bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 focus:bg-gray-500'
          >
            New York
          </a>
        </p>
      </div>

      {/*       
      <BarGraph data={barGraphData} options={optionsBarGraph} />
      <PieChart data={pieChartData} options={optionsPie} />
      <DoughnutPie
        data={doughnutChartData}
        options={optionsDoughNut}
        chartType='doughnut'
      />
      <DelayBarChart data={delayBarChartData} /> */}
    </div>
  );
}

export default AnalysisCharts;
