import React from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import Listing from "../ProjectSummaryPage/ListingTable"

const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SummaryHeadingWrapper = styled.div`
  width: 100%;
`;

const SummaryDetailsContainer = styled.div`
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

const SummaryWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
const ListingWrapper = styled.div`
    width: 100%;
    min-height: 100px;
    height: auto;
    padding-top: 0px;
    
`;


function ProjectSummary() {

    const columns = ['Column', 'Task limit', 'Visible on dashboard', 'Open tasks', 'Closed tasks'];
    const project = {
        name: 'Project Name',
        category: 'Project Setting'
    }

    return (
        <div>
            <PageContainer>
                <ProjectSidebar />
                <NavBar/>
                <ContentWrapper>
                    <SummaryHeadingWrapper>
                        <SummaryHeading>Summary</SummaryHeading>
                    </SummaryHeadingWrapper>
                    <SummaryDetailsContainer>
                        <SummaryWrapper>
                            <ul>
                                <li><strong>This project is open </strong></li>
                                <br></br>
                                <li>Project owner: <strong> Qamar Zaman Butt</strong></li>
                                <br></br>
                                <li>Public access disabled</li>
                                <br></br>
                                <li>Modified: 27.02.2023 7:12 pm</li>
                                <br></br>
                                <li>Column task limits are applied across swimlanes</li>
                                <br></br>
                                <li>Task limit: 998</li>
                            </ul>
                        </SummaryWrapper>
                    </SummaryDetailsContainer>
                    <SummaryHeadingWrapper>
                        <SummaryHeading>Columns</SummaryHeading>
                    </SummaryHeadingWrapper>
                <ListingWrapper>
                    <Listing columns={columns}/>
                </ListingWrapper>
                </ContentWrapper>
            </PageContainer>
        </div>
    );
}

export default ProjectSummary;
