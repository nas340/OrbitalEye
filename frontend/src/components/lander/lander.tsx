import { Menu } from '../menu/menu';
import { Notifications } from '../notifications/notifications';
import Modal from '../common/modal/modal';
import { Iotd } from '../iotd/iotd';
import { Screens } from '../../types/commonTypes';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import AsteroidInfo from '../asteroid/asteroidInfo/asteroidInfo';
import './lander.css';

export const OrbitalEyeLander = () => {
  const { context } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (context.screen !== Screens.HIDE) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [context.screen]);

  const screens = {
    [Screens.IOTD]: <Iotd />,
    [Screens.ASTEROID_DATA]: <AsteroidInfo />,
  };

  return (
    <div>
      <div>
        <div className="menu">
          <Menu />
        </div>
        <div className='absolute top-0 right-0 m-4 font-bold text-2xl italic'>
          <h1 className='text-white'>Orbital Eye</h1>
        </div>
        <div>
          <Notifications />
        </div>
        <div>
          {showModal && context.screen && (
            <Modal>{screens[context.screen]}</Modal>
          )}
        </div>
      </div>
    </div>
  );
};
