import React from "react";
import { Modal } from 'react-responsive-modal';

const AlertModal = (props) => {
  return (
    <Modal 
      open={props.open}
      onClose={props.close} 
      center 
      showCloseIcon={false}
      classNames={{
        modal: 'customModal'
      }}
    >
      <img src={props.img}  className='modal-img' />
      <p>{props.message}</p>
      <button className='custom-button' onClick={props.close}>OK</button>
    </Modal>
  )
}

export default AlertModal;