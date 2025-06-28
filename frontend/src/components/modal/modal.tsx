import { ReactNode, useContext } from 'react';
import '../../index.css';
import { AppContext } from '../../context/appContext';
import { Screens } from '../../types/commonTypes';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { setContext } = useContext(AppContext);
  return (
    <>
      <div className="absolute h-screen w-screen top-1/2 left-1/2 -translate-1/2 rounded-2xl max-h-[80vh] z-10">
        <div
          className="flex justify-center items-center h-full w-full rounded-2xl"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setContext(prev => ({
                ...prev,
                screen: Screens.HIDE,
              }));
            }
          }}
        >
          <div className="rounded-2xl p-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
