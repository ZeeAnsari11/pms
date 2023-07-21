import styled from "styled-components";
import makeAnimated from 'react-select/animated';

export const animatedComponents = makeAnimated();
export const Tag = styled.span`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 5px;
`;