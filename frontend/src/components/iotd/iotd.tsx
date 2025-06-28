import { useEffect, useState } from 'react';
import { fetchData } from '../../util/api';
import { iotdData } from '../../util/apiConfig';
import { IOTDResponse } from '../../types/apiTypes';
import '../../index.css';

export const Iotd = () => {
  const [response, setResponse] = useState<IOTDResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData(iotdData)
      .then(data => {
        setResponse(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div className="">
      <div className="text-gray-300 glass rounded-2xl max-h-[90vh] overflow-auto explanation-scrollbar max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
        <div className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] max-h-[50vh] overflow-hidden flex items-center justify-center relative">
          {loading && <>loading...</>}
          {error && <>error...</>}
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
      </div>
    </div>
  );
};
