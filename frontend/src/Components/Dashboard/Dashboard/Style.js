import styled, { keyframes }  from "styled-components";

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

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`;


export const SkeletonDashboardContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SkeletonDashboardOuter = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 200px; 
  margin-bottom: -10px;
`;

export const SkeletonDashboardBoards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 80px;
  flex-direction: row; 
`;

export const SkeletonCard = styled.div`
  display: inline-block;
  width: calc(33.33% - 50px);
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 30px;
  position: relative;
  animation: ${ pulse } 1.5s infinite;

  align-items: center;
  justify-content: center;
`;

export const AvatarIconWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;