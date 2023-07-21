import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
`;
export const UploadButton = styled.button`
  background-color: #F5F6F8;
  border-radius: 5%;
  border: none;
  color: #050303;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ECEDF0;
  }
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  display: none;

  & + label {
    background-color: #F5F6F8;
    border-radius: 5%;
    border: none;
    color: #050303;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out;
    margin-bottom: 1rem;

    &:hover {
      background-color: #ECEDF0;
    }
  }
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

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;