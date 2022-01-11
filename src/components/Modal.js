import React, { useState } from "react";
import { Modal } from 'react-responsive-modal';

const OpenModal = (props) => {

  return (
    <>
      <Modal 
        open={props.open} 
        center 
        showCloseIcon={false}
        classNames={{
          modal: 'customModal'
        }}
      >
        <img src={props.src} className='modal-img' />
        <p>{props.message}</p>
        <button className='custom-button' onClick={props.onCloseModal}>OK</button>
      </Modal>
    </>
  );
}

export default OpenModal;