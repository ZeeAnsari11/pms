import styled from 'styled-components';
import {Tooltip, Input} from "antd";


export const StyledInput = styled(Input)`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #D9D9D9;
  margin-bottom: 16px;
  width: 96%;
`;

export const StyledErrorText = styled.p`
  color: red;
  margin-top: 8px;
`;


export const StyledTooltip = styled(Tooltip)`
  color: white;
`;