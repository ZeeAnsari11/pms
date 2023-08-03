import React, {useState} from 'react';
import * as ProjectViewComponents from './Style'
import ProjectListing from '../ProjectListing/ProjectListing';
import NavBar from '../../Dashboard/Navbar';
import {useNavigate} from "react-router-dom";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";

const ProjectsPage = () => {
    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const navigate = useNavigate()

    return (
        <div>
            <NavBar/>
            <ProjectViewComponents.ProjectsPageContainer>
                <ProjectViewComponents.ProjectsHeaderContainer>
                    <ProjectViewComponents.ProjectsHeader>Projects</ProjectViewComponents.ProjectsHeader>
                    {IsAdminOrStaffUser &&
                        <ProjectViewComponents.ProjectButton onClick={() => navigate('/create-project')}>
                            Create Project
                        </ProjectViewComponents.ProjectButton>
                    }
                </ProjectViewComponents.ProjectsHeaderContainer>
                <ProjectListing/>
                <hr></hr>
            </ProjectViewComponents.ProjectsPageContainer>
        </div>
    );
};

export default ProjectsPage;
