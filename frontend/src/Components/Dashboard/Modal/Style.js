import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding-top: 50px;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  max-height: 95vh;
  overflow-y: auto;
  margin-bottom: 100px;

`;
