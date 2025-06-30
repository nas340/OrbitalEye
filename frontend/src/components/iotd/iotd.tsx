import { useEffect, useState } from 'react';
import { fetchData } from '../../util/api';
import { iotdData } from '../../util/apiConfig';
import { IOTDResponse } from '../../types/apiTypes';
import '../../index.css';
import Loading from '../common/loading/loading';
import Error from '../common/error/error';

export const Iotd = () => {
  const [response, setResponse] = useState<IOTDResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchIotdData = (date?: string) => {
    setLoading(true);
    setResponse(undefined);
    fetchData(iotdData(date))
      .then(data => {
        if (data.length === 0) setError(false);
        setResponse(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchIotdData();
  }, []);

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="">
      <div className="text-gray-300 glass rounded-2xl max-h-[80vh] overflow-auto explanation-scrollbar max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]">
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
          <>
            <div className="max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] max-h-[50vh] overflow-hidden flex items-center justify-center relative">
              <div className="absolute top-0 right-0 m-2 z-30">
                <div className="glass flex justify-end">
                  <input
                    name="date"
                    type="date"
                    placeholder="helo"
                    className="border px-4 py-2 rounded-md border-zinc-400"
                    max={getTodayDateString()}
                    onChange={event => fetchIotdData(event.target.value)}
                  />
                </div>
              </div>
              <a href={response?.hdurl}>
                <img className="h-full w-full" src={response?.hdurl} />
                <div className="bg-gradient-to-t from-black/80 inset-0 via-transparent to-transparent absolute" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-thin text-xl ">NASA Image of the day</p>
                  <h3 className="text-5xl italic">{response?.title}</h3>
                </div>
              </a>
            </div>
            <div className="p-10 pt-4 font-thin">
              <p className="text-3xl mb-4">{response?.date}</p>
              <p className="break-words">{response?.explanation}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
