import styled from "styled-components";

export const DashboardContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DashboardOuter = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;
`;

export const DashboardBoards = styled.div`
  min-width: fit-content;
  display: flex;
  gap: 30px;
  height: 100%;
  margin-top: 50px;
`;
