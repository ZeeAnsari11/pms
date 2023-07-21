import styled from "styled-components";
import { color } from "../Sidebar/utils/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin-top: 24px;

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c9c9c9;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 16px;
  font-weight: bold;
`;

export const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.borderLight};
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #dcdcdc;
  }
  &:hover {
    background-color: #EBECF0;
  }
`;

export const TableData = styled.td`
  text-align: left;
  padding: 16px;
`;

export const ColumnTitle = styled.div`
  font-weight: bold;
`;