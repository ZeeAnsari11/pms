import styled from "styled-components";
import {Select} from "antd";

export const StyledSelect = styled(Select)`
  width: ${({width}) => width ? width : '70%'};
  height: ${({height}) => height ? height : '32px'};

`;

export const StyledOption = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    border-radius: 9999px;
  }
`;
