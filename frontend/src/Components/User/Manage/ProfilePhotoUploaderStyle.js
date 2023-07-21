import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 175px;
  height: 175px;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
`;


export const Input = styled.input`
  display: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;