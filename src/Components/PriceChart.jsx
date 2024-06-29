import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { STRINGS } from '../Strings/Strings';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

// chart component
const PriceChart = ({ data }) => {
   
  // chart structure
  const chartData = {
    labels: data?.map(point => point.time),
    datasets: [
      {
        label: 'Price',
        data: data.map(point => point.price),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
      {
        label: 'Bids',
        data: data.map(point => point.bids),
        fill: false,
        backgroundColor: '#FF2C2C',
        borderColor: '#FF2C2C',
      },
      {
        label: 'Asks',
        data: data.map(point => point.asks),
        fill: false,
        backgroundColor: '#22C55E',
        borderColor: '#22C55E',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time', // Use 'time' type for x-axis
        time: {
          unit: 'minute', // Display data by minute intervals
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  return (
    <div>
      <h5>{STRINGS.REAL_TIME_CHART}</h5>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;
