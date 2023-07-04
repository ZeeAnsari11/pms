import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(121, 120, 120, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  max-height: 95vh;
  overflow-y: auto;
`;

function Modal(props) {
  return (
    <StyledModal
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <ModalContent onClick={(event) => event.stopPropagation()}>
        {props.children}
      </ModalContent>
    </StyledModal>
  );
}

export default Modal;
