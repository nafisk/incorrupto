import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current) {
      const pieChart = new Chart(ctx, {
        type: 'pie',
        data,
        options,
      });

      return () => {
        pieChart.destroy();
      };
    }
  }, [data, options]);

  // Adjust the div style to control the width of the pie chart
  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
