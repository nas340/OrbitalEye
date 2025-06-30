import { ReactNode, useContext } from 'react';
import { AppContext } from '../../../context/appContext';
import { Screens } from '../../../types/commonTypes';
import './modal.css'

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { setContext } = useContext(AppContext);
  return (
    <>
      <div className="modal-container">
        <div
          className="modal-content-wrapper"
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
