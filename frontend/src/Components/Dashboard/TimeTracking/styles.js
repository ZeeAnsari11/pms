import styled from "styled-components";

export const TimeTrackingContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
`;

export const StyledSpan = styled.span`
  display: inline-block;
  background-color: #DFE1E6;
  color: black;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;
`;


export const InputHeading = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;


export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 16px;

  .ql-toolbar {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #f0f2f5;
  }

  .ql-container {
    height: 150px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #ccc;
  }

  .ql-editor {
    padding: 8px;
    font-size: 14px;
  }
`;
