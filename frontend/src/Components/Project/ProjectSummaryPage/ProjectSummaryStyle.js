import styled from "styled-components";

export const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const SummaryHeadingWrapper = styled.div`
  width: 100%;
`;

export const SummaryDetailsContainer = styled.div`
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 265px;
  width: 100%;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

export const SummaryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
export const ListingWrapper = styled.div`
    width: 100%;
    min-height: 100px;
    height: auto;
    padding-top: 0px;
    
`;

