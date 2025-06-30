import { useEffect, useState } from 'react';
import { fetchData } from '../../../util/api';
import { asteroidData } from '../../../util/apiConfig';
import '../../../index.css';
import { AsteroidData } from '../../../types/apiTypes';
import { SelectedAsteroid } from '../selectedAsteroid/selectedAsteroid';
import Loading from '../../common/loading/loading';
import Error from '../../common/error/error';

const AsteroidInfo = () => {
  const [response, setResponse] = useState<AsteroidData[]>();
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidData>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(asteroidData('2025-06-01', '2025-06-07'))
      .then(data => {
        setResponse(data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="flex">
      <div className="overflow-auto explanation-scrollbar max-w-[80vw] md:max-w-[70vw] lg:max-w-[50vw] glass">
        {loading && (
          <div className="h-[50vh] w-[40vw] flex justify-center items-center">
            <Loading />
          </div>
        )}
        {error && (
          <div className="h-[50vh] w-[40vw] flex justify-center items-center">
            <Error />
          </div>
        )}
        {response && (
          <div>
            <div className="sticky top-0 bg-zinc-900 w-full text-center p-2">
              Asteroid Info
            </div>
            <div className="flex mt-1">
              <div className="max-h-[70vh] basis-2/5 overflow-auto explanation-scrollbar">
                {response.map(val => (
                  <>
                    <button
                      className={`flex justify-center items-center rounded-xl my-2 w-full`}
                      onClick={() => setSelectedAsteroid(val)}
                    >
                      <svg
                        viewBox="0 0 100 100"
                        width="30"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          d="M20 50c0-18 12-30 30-30s30 12 30 30-12 30-30 30S20 68 20 50Z"
                          fill="#4B4B4B"
                        />
                        <circle cx="40" cy="40" r="4" fill="#6E6E6E" />
                        <circle cx="60" cy="50" r="3" fill="#6E6E6E" />
                        <circle cx="50" cy="65" r="2" fill="#6E6E6E" />
                      </svg>

                      <p className="text-slate-300">{val?.name}</p>
                    </button>
                    <div className="w-full h-[1px] bg-slate-600" />
                  </>
                ))}
              </div>
              <div className=" max-h-[80vh] basis-3/5 overflow-auto">
                {!selectedAsteroid ? (
                  <div className="flex h-full justify-center text-center items-center italic font-thin px-20 mx-10">
                    select asteroid to get started
                  </div>
                ) : (
                  <div className="flex">
                    <SelectedAsteroid data={selectedAsteroid} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsteroidInfo;
