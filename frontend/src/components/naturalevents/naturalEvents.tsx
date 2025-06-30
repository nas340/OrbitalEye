import { useEffect, useState } from 'react';
import { fetchData } from '../../util/api';
import { naturalEvents } from '../../util/apiConfig';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Loading from '../common/loading/loading';
import Error from '../common/error/error';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Natural events VS years',
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const NaturalEvents = () => {
  const [response, setResponse] = useState<Record<string, number>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [labels, setLabels] = useState<string[]>();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Natural events',
        data: Object.values(response ?? {}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    fetchData(naturalEvents)
      .then(data => {
        setLoading(false);
        setResponse(data);
        setLabels(Object.keys(data));
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <div className="w-[80vw] h-[75vh] md:h-[65vh] glass p-8 pt-2">
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}

      {error && (
        <div className="w-full h-full">
          <Error />
        </div>
      )}
      {response && labels && (
        <>
          <h3 className="font-semibold m-4 italic ml-4 text-2xl">
            Natural events trends over past few years 🌋
          </h3>
          <p className="ml-4 text-zinc-500">
            This is the plot of number of natural event (such as Earthquakes,
            floods, cyclones etc) against year.
          </p>
          <div className="w-full h-[50vh]">
            <Line options={options} data={data} />
          </div>
        </>
      )}
    </div>
  );
};
