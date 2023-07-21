import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding: 0 20% 0 20%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

export const Details = styled.h1`
  margin: 50px;
`;

export const NameInput = styled.input`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 2%;
  background-color: #FAFBFC;
  width: 359px;

  :hover {
    background-color: #EBECF0;
  }
`;


export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 325px;
`;

export const LabelForKey = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 342px;
`;


export const Labelforlead = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 10px;
  margin-right: 278px;
`;

export const Description = styled.p`
  font-size: 0.7rem;
  color: #555;
  margin-top: 5px;
`;

export const SaveButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 310px;
  margin-bottom: 10px;

  &:hover {
    background-color: #3e81ed;
  }
`;