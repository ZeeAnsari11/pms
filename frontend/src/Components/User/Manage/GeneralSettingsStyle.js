import styled from "styled-components";

export const PersonalSetting = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  margin-left: 50px;
  padding: 40px 20% 0 14%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 20px 0;
`;

export const Details = styled.h1`
  margin: 0;
`;

export const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
  //padding-bottom: 5px;
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

export const ConfigureMessage = styled.p`
  margin-top: -5px;
  font-size: 0.9rem;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: -5px;
`;

export const CheckboxLabel = styled.label`
  margin-bottom: 7px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;


export const SaveButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: fit-content;
  margin-bottom: 15px;

  &:hover {
    background-color: #3e81ed;
  }
`;