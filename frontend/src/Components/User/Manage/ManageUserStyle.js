import styled from "styled-components";
import { Form, Table } from "antd";

export const UserContainer = styled.div`
  margin-left: 16%;
  margin-top: 0%;
  padding-top: 50px;
  padding-left: 20px;
  margin-right: 20px;
`;


export const PermissionsTable = styled(Table)`
  margin-top: 20px;
`;

export const PaginationWrapper = styled.div`
  float: right;
  margin-top: 15px;
`;

export const StyledFormItem = styled(Form.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  .ant-form-item-label {
    font-weight: bold;
  }
`;