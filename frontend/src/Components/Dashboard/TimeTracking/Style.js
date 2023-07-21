import styled from "styled-components";

export const TimeTrackingContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  cursor: pointer;

  .ant-progress {
    border-radius: 5px;
    transition: background-color 0.5s;

    &:hover {
      background-color: #f0f0f0;
    }
`;

export const TimeEstimate = styled.span`
  display: inline-block;
  background-color: #DFE1E6;
  color: black;
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
  border-radius: 40px;
`;

export const TimeTextDisplayContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ModalTimeTextContainer = styled.div`
  margin-top: 0;
  font-weight: bold;
  font-size: small;
`;

export const TapTimeTextContainer = styled.div`
  margin-top: 0;
  font-weight: bold;
  font-size: small;
`;


export const InputHeading = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 5px;
`;


export const WorkLogModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 24px;
  grid-column-gap: 16px;
  margin-top: 20px;

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


export const StyledProgressBarContainer = styled.div`
  width: 100%;

  .progress-bar {
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
      transition: background-color 0.3s;
    }
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #108ee9;
    transition: width 0.3s;
  }
`;


export const WorklogDescription = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;
