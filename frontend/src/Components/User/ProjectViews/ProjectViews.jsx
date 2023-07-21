import React, {useState} from 'react';
import * as ProjectViewComponents from './style'
import ProjectListing from '../ProjectListing/ProjectListing';
import NavBar from '../../Dashboard/Navbar';

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
                    <ProjectViewComponents.ProjectButton onClick={submit}>Create Project</ProjectViewComponents.ProjectButton>
                </ProjectViewComponents.ProjectsHeaderContainer>
                <ProjectViewComponents.SearchContainer>
                    <ProjectViewComponents.SearchInputContainer>
                        <ProjectViewComponents.SearchIcon/>
                        <ProjectViewComponents.SearchInput type="text" placeholder="Search Projects" value={searchValue}
                                        onChange={handleSearchChange}/>
                    </ProjectViewComponents.SearchInputContainer>
                </ProjectViewComponents.SearchContainer>
                <ProjectListing/>
                <hr></hr>
            </ProjectViewComponents.ProjectsPageContainer>
        </div>
    );
};

export default ProjectsPage;
