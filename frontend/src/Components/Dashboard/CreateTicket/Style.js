import styled from "styled-components";

export const ModalOverlay = styled.div`
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


export const CardInfoBoxClose = styled.div`
  float: right;
  margin-top: -15px;
  margin-right: -15px;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  padding: 24px;
  overflow: auto;
  max-height: 75vh;
  width: 60%;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 18px 0;
`;

export const ModalContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
`;

export const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const TaskList = styled.div`
  margin: 8px 0 15px;
`;

export const Divider = styled.div`
  border-bottom: 1px solid #ccc;
`;

export const SummaryInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  margin-bottom: 16px;
  width: 96%;
  background: #FFFFFF;
`;

export const Task = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CardInfoBoxCustom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 25px;
  padding-top: 30px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  background-color: #0077ff;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #0066cc;
  }

  &:focus {
    outline: none;
  }
`;