import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  max-height: 82vh;
  overflow-y: auto;
  margin-top: 50px;
  margin-bottom: 50px;

`;
