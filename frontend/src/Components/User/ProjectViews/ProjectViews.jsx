import React, {useState} from 'react';
import * as ProjectViewComponents from './Style'
import ProjectListing from '../ProjectListing/ProjectListing';
import NavBar from '../../Dashboard/Navbar';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProjectsPage = () => {
    const currentUserProfileData = useSelector((state) => state.DataSyncer.userProfileData);
    const IsAdminOrStaffUser = currentUserProfileData?.user?.is_staff || currentUserProfileData?.user?.is_superuser

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
