import React from 'react';
import * as ProjectViewComponents from './Style'
import ProjectListing from '../ProjectListing/ProjectListing';
import NavBar from '../../Dashboard/Navbar';
import {useNavigate} from "react-router-dom";
import {Button} from "antd"
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
                        <Button type={"primary"} onClick={() => navigate('/create-project')}>Create Project</Button>
                    }
                </ProjectViewComponents.ProjectsHeaderContainer>
                <ProjectListing/>
                <hr></hr>
            </ProjectViewComponents.ProjectsPageContainer>
        </div>
    );
};

export default ProjectsPage;
