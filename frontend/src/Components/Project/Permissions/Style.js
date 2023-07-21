import styled from "styled-components";
import { Button, Table } from "antd";

export const PermissionsContainer = styled.div`
  margin-left: 16%;
  margin-top: 0%;
  padding-top: 61px;
  padding-left: 80px;
  margin-right: 90px;
`;

export const Heading = styled.h2`
  margin-left: 10px;
`;

export const AddPermissionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;


export const PermissionsTable = styled( Table )`
  margin-top: 20px;
`;

export const CustomButton = styled( Button )`
  background-color: rgb(30, 100, 209);
  margin-top: 5px;
  margin-left: 10px;
`;
