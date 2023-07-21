import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  border: 2px solid var(--primary-color);
  padding: 20px;
  width: 510px;
  height: 300px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: whitesmoke;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 280px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #eee;
  display: flex;
  justify-content: center;
  margin-left: 20px;

  &:last-child {
    margin-left: 27px;
  }
`;

export const Button = styled.button`
  width: 220px;
  border: none;
  border-radius: 20px;
  background-color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:last-child {
    margin-left: 54px;
  }

  &:hover {
    background-color: #000000;
    color: #ffffff;
    border-color: whitesmoke;
  }
`;

export const Headline = styled.h2`
  color: whitesmoke;
`;

export const Message = styled.p`
  color: whitesmoke;
`;