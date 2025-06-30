import { useContext, useState } from 'react';
import '../../index.css';
import { AppContext } from '../../context/appContext';
import { Screens } from '../../types/commonTypes';

export const Menu = () => {
  const { setContext } = useContext(AppContext);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const updateContextWithScreen = (screen: Screens) => {
    setDisplayDropdown(false);
    setContext(prev => ({
      ...prev,
      screen: screen,
    }));
  };

  return (
    <div className=''>
      <div
        className="glass flex justify-center items-center p-2 cursor-pointer"
        onClick={() => setDisplayDropdown(prev => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {displayDropdown && (
        <div className="glass mt-2 flex flex-col">
          <button
            className="px-4 py-2 hover:bg-zinc-700"
            onClick={() => updateContextWithScreen(Screens.IOTD)}
          >
            Image of the day
          </button>
          <div className="w-full h-[1px] bg-zinc-500" />
          <button
            className="px-4 py-2 hover:bg-zinc-700"
            onClick={() => updateContextWithScreen(Screens.ASTEROID_DATA)}
          >
            Asteroid info
          </button>
        </div>
      )}
    </div>
  );
};
