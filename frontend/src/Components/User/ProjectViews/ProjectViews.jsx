import React, {useState} from 'react';
import * as ProjectViewComponents from './Style'
import ProjectListing from '../ProjectListing/ProjectListing';
import NavBar from '../../Dashboard/Navbar';
import {DataSyncer} from "../../../Store/Slice/DataSyncerSlice";
import {useDispatch} from "react-redux";

const ProjectsPage = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const submit = () => {
        window.location.href = '/create-project';
    };


    return (
        <div>
            <NavBar/>
            <ProjectViewComponents.ProjectsPageContainer>
                <ProjectViewComponents.ProjectsHeaderContainer>
                    <ProjectViewComponents.ProjectsHeader>Projects</ProjectViewComponents.ProjectsHeader>
                    <ProjectViewComponents.ProjectButton onClick={submit}>Create
                        Project</ProjectViewComponents.ProjectButton>
                </ProjectViewComponents.ProjectsHeaderContainer>
                <ProjectListing/>
                <hr></hr>
            </ProjectViewComponents.ProjectsPageContainer>
        </div>
    );
};

export default ProjectsPage;
