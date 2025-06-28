import { Menu } from '../menu/menu';
import { Notifications } from '../notifications/notifications';
import Modal from '../modal/modal';
import { Iotd } from '../iotd/iotd';
import { Screens } from '../../types/commonTypes';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import AsteroidInfo from '../asteroidInfo/asteroidInfo';

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

  console.log(context.screen);

  const screens = {
    [Screens.IOTD]: <Iotd />,
    [Screens.ASTEROID_DATA]: <AsteroidInfo />,
  };

  return (
    <div>
      <div>
        <div className="absolute top-0 left-0 mt-2 ml-2">
          <Menu />
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
