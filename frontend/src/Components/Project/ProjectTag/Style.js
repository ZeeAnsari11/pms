import styled from "styled-components";
import { Form as AddForm, Form as EditForm } from "antd";

export const TagContainer = styled.div`
    margin-left: 16%;
    margin-top: 0%;
    padding-top: 50px;
    padding-left: 20px;
    margin-right: 20px;
`;


export const StyledEditFormItem = styled(EditForm.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  .ant-form-item-label {
    font-weight: bold;
  }
`;

export const StyledAddFormItem = styled(AddForm.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  .ant-form-item-label {
    font-weight: bold;
  }
`;

export const ColorBox = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${(props) => props.color};
`;
