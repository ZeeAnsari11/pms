import React from 'react';
import * as ModalComponents from './Style';

function Modal(props) {
  return (
    <ModalComponents.StyledModal
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <ModalComponents.ModalContent onClick={(event) => event.stopPropagation()}>
        {props.children}
      </ModalComponents.ModalContent>
    </ModalComponents.StyledModal>
  );
}

export default Modal;
