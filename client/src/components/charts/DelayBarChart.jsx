import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DelayBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let delayed;

    const ctx = chartRef.current.getContext('2d');
    const barChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: context => {
            let delay = 0;
            if (
              context.type === 'data' &&
              context.mode === 'default' &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true, // Ensures that the y-axis starts at zero
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Toxicity Report', // Title text
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DelayBarChart;
