import styled from 'styled-components';
import {Tooltip, Input} from "antd";


export const StyledInput = styled(Input)`
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 100%;
`;

export const StyledErrorText = styled.p`
  color: red;
  margin-top: 8px;
`;


export const StyledTooltip = styled(Tooltip)`
  color: white;
`;