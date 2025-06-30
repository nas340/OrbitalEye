import { useState } from 'react';
import Earth from './components/3d/earth';
import { OrbitalEyeLander } from './components/lander/lander';
import { AppContext } from './context/appContext';

const App = () => {
  const [context, setContext] = useState({});

  return (
    <AppContext.Provider
      value={{
        context,
        setContext
      }}
    >
      <div id="container">
        <Earth />
        <OrbitalEyeLander />
      </div>
    </AppContext.Provider>
  );
};

export default App;
