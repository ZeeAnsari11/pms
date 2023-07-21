
import React from 'react';
import * as ProjectSummaryComponents from './ProjectSummaryStyle';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import Listing from "../ProjectSummaryPage/ListingTable"

function ProjectSummary() {

    const columns = ['Column', 'Task limit', 'Visible on dashboard', 'Open tasks', 'Closed tasks'];

    return (
        <div>
            <ProjectSummaryComponents.PageContainer>
                <ProjectSidebar />
                <NavBar/>
                <ProjectSummaryComponents.ContentWrapper>
                    <ProjectSummaryComponents.SummaryHeadingWrapper>
                        <ProjectSummaryComponents.SummaryHeading>Summary</ProjectSummaryComponents.SummaryHeading>
                    </ProjectSummaryComponents.SummaryHeadingWrapper>
                    <ProjectSummaryComponents.SummaryDetailsContainer>
                        <ProjectSummaryComponents.SummaryWrapper>
                            <ul>
                                <li><strong>This project is open </strong></li>
                                <br></br>
                                <li>Project owner: <strong> Usman IlamDin</strong></li>
                                <br></br>
                                <li>Public access disabled</li>
                                <br></br>
                                <li>Modified: 27.02.2023 7:12 pm</li>
                                <br></br>
                                <li>Column task limits are applied across swimlanes</li>
                                <br></br>
                                <li>Task limit: 998</li>
                            </ul>
                        </ProjectSummaryComponents.SummaryWrapper>
                    </ProjectSummaryComponents.SummaryDetailsContainer>
                    <ProjectSummaryComponents.SummaryHeadingWrapper>
                        <ProjectSummaryComponents.SummaryHeading>Columns</ProjectSummaryComponents.SummaryHeading>
                    </ProjectSummaryComponents.SummaryHeadingWrapper>
                <ProjectSummaryComponents.ListingWrapper>
                    <Listing columns={columns}/>
                </ProjectSummaryComponents.ListingWrapper>
                </ProjectSummaryComponents.ContentWrapper>
            </ProjectSummaryComponents.PageContainer>
        </div>
    );
}

export default ProjectSummary;
