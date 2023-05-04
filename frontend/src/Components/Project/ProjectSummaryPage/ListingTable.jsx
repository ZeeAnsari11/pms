import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const TableContainer = styled.div`
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

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 16px;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #dcdcdc;
  }
  &:hover {
    background-color: #EBECF0;
  }
`;

const TableData = styled.td`
  text-align: left;
  padding: 16px;
`;

const ColumnTitle = styled.div`
  font-weight: bold;
`;

const Listing = ({ columns }) => {
  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              {
                columns.map((column) => (
                <TableHeader key={column}>
                  <ColumnTitle>{column}</ColumnTitle>
                </TableHeader>
              ))
              }
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableData>BACKLOG</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
            <TableRow>
              <TableData>READY FOR DEV/REFACTOR</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
            <TableRow>
              <TableData>IN PROGRESS</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
            <TableRow>
              <TableData>IN CODE REVIEW</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
          <TableRow>
              <TableData>IN PROGRESS</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
            <TableRow>
              <TableData>IN CODE REVIEW</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
          <TableRow>
              <TableData>IN PROGRESS</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>
            <TableRow>
              <TableData>IN CODE REVIEW</TableData>
              <TableData>Task limit value</TableData>
              <TableData>Visible on dashboard value</TableData>
              <TableData>Open tasks value</TableData>
              <TableData>Closed tasks value</TableData>
            </TableRow>

          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Listing;
