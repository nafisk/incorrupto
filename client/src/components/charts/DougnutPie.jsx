import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DoughnutPie = ({ data, options, chartType = 'doughnut' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current) {
      const chartInstance = new Chart(ctx, {
        type: chartType,
        data,
        options,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, options, chartType]);

  // Style the container to control the width of the chart
  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DoughnutPie;
