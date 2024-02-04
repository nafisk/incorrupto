import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const barChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        ...options,
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data, options]);

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarGraph;
