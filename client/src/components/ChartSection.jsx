import { useState } from 'react';
import BarGraph from './charts/BarGraph';
import PieChart from './charts/PieChart';
import DoughnutPie from './charts/DougnutPie';
import DelayBarChart from './charts/DelayBarChart';

// Default test data
const datatest = [65, 59, 80, 81, 56, 55, 40, 30]; // change this to zero as default.
const datatestpi = [70, 30]; // set to zero
const fact_or_op_default = [50, 30]; // set to zero

const initialPieChartData = {
  labels: ['Right-Wing', 'Left-Wing'],
  datasets: [
    {
      label: 'Political Spectrum',
      data: datatestpi, // Ensure this array has three elements, one for each category
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Red for Right-Wing
        'rgba(54, 162, 235, 0.6)', // Blue for Left-Wing
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', // Red border for Right-Wing
        'rgba(54, 162, 235, 1)', // Blue border for Left-Wing
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
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

// Progress Bar Component
const ProgressBar = ({ percentage }) => {
  // Determine the color based on the percentage
  const getColor = percentage => {
    if (percentage <= 25) return 'bg-green-500';
    if (percentage <= 50) return 'bg-yellow-500';
    if (percentage <= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className='w-full h-6 bg-gray-200 rounded-full opacity-60'>
      <div
        className={`h-6 rounded-full ${getColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

function ChartSection() {
  // State for each graph's data

  const [pieChartData, setPieChartData] = useState(initialPieChartData);
  const [doughnutChartData, setDoughnutChartData] = useState(
    initialDoughnutChartData
  );
  const [delayBarChartData, setDelayBarChartData] = useState(
    initialDelayBarChartData
  );
  const implicitHateSpeechPercentage = 90; // This should be dynamically set based on your data

  return (
    <div>
      {/* BarGraph and DoughnutPie side by side */}

      <DoughnutPie
        data={doughnutChartData}
        options={optionsDoughNut}
        chartType='doughnut'
      />
      <DelayBarChart data={delayBarChartData} />

      {/* implicit-hate-speech*/}
      <div className='my-4' id='implicit-hate-speech'>
        <h2 className='mb-2 font-semibold text-md'>
          Implicit Hate Speech Analysis
        </h2>
        <ProgressBar percentage={implicitHateSpeechPercentage} />
      </div>

      {/* PieChart - USE THIS AS NSFW*/}
      <PieChart data={pieChartData} options={optionsPie} />

      {/* Radar for left/midde/neutral 
      https://www.chartjs.org/docs/latest/charts/radar.html
      */}
    </div>
  );
}

export default ChartSection;
