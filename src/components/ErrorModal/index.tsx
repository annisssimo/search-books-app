import './index.css';

import React from 'react';

import errorIcon from './error-icon.svg';
import { ErrorModalProps } from './types';

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onMouseDown={handleCloseModal}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={errorIcon} alt="Error Icon" className="error-icon" />
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
