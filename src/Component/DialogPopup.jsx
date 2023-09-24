import React from 'react';
import '../Styles/DialogPopup.css'

function DialogPopup({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="custom-dialog">
      <div className="custom-dialog-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirmer</button>
        <button onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}

export default DialogPopup;