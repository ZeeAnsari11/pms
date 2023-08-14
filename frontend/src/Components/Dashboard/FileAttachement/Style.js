import styled from "styled-components";

export const UploadContainer = styled.div`
  border: 1px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;

  &:hover {
    border-color: #4096ff;
  }

  .upload-text {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .input {
    margin-left: 65px;
  }

  .upload-button {
    background-color: #2196f3;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0c7cd5;
    }
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  padding: 10px 0; 
  width: ${(props) => (props.width ? props.width : "560px")};
  border: 1px solid lightgrey;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PreviewItem = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

export const DeleteButton = styled.button`
  background-color: ${props => props.hovered ? '#1E64D1' : '#ccc'};
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1E64D1;
  }
`;
export const PreviewImage = styled.img`
  background-color: #D9DCE1;
  width: 100%;
  height: 155px;
  object-fit: cover;

`;

export const PreviewPDF = styled.iframe`
  width: 100%;
  height: 150px;
`;

export const PreviewFile = styled.iframe`
  width: 100%;
  height: 150px;
`;

export const PreviewVideo = styled.video`
  width: 100%;
  height: 155px;
`;

export const AttachmentsBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const CardContainer = styled.div`
  width: 180px;
  height: 250px;
`;