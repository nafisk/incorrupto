import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PolarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current) {
      const polarChart = new Chart(ctx, {
        type: 'polarArea',
        data,
        options: {
          responsive: true,
          scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 18,
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Polar Area Chart With Centered Point Labels',
              ...options?.plugins?.title,
            },
          },
          ...options,
        },
      });

      return () => {
        polarChart.destroy();
      };
    }
  }, [data, options]);

  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PolarChart;
