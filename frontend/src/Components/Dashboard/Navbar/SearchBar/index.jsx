import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SearchInput, SearchResultsContainer, SearchIcon, SearchContainer, CloseIcon} from './Styles'
import apiRequest from "../../../../Utils/apiRequest";
import {Divider, List, Avatar, Tag} from 'antd';
import {Link} from 'react-router-dom';
import {REACT_APP_DOMAIN} from "../../../../Utils/envConstants";

const SearchBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState({projects: [], issues: []});

    const inputRef = useRef(null);
    const navigate = useNavigate();


    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setExpanded(false);
        } else if (event.key === 'Enter' && searchValue) {
            setExpanded(true);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchInputBlur = () => {
        setExpanded(false);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        if (searchValue && expanded) {
            apiRequest
                .get(`/global_search/?q=${searchValue}`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('access')}`
                    },
                })
                .then(response => {
                    const responseData = response.data;
                    if (responseData && responseData.projects) {
                        setSearchResults(responseData);
                    } else {
                        console.error('Unexpected response structure:', responseData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        } else {
            setSearchResults({projects: [], issues: []});
        }
    }, [searchValue, expanded]);


    useEffect(() => {
        if (expanded) {
            inputRef.current.focus();
        }
    }, [expanded]);

    return (
        <SearchContainer onClick={toggleExpand} onKeyDown={handleKeyDown} expanded={expanded}>
            <SearchIcon/>
            {expanded ? (
                <>
                    <SearchInput
                        ref={inputRef}
                        placeholder="Search ProjeX..."
                        value={searchValue}
                        onChange={handleSearchInputChange}
                    />
                    <CloseIcon onClick={() => {
                        handleClearSearch();
                        setExpanded(false);
                    }}/>
                </>

            ) : (
                <SearchInput placeholder="Search..." onClick={toggleExpand}/>
            )}
            {expanded && (
                <SearchResultsContainer>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1}}>

                            <Divider>Projects</Divider>
                            <List
                                itemLayout="horizontal"
                                dataSource={searchResults.projects}
                                renderItem={(project) => (
                                    <List.Item style={{margin: "10px"}}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={`${REACT_APP_DOMAIN}/${project.icon}`}/>}
                                            title={
                                                <Link
                                                    to={`/project/${project.id}/dashboard`}
                                                    onClick={(event) => event.stopPropagation()}
                                                    target="_blank"
                                                >
                                                    {project.name}
                                                </Link>
                                            }
                                            description={project.company?.company_name &&
                                                (<Tag color="blue">{project.company?.company_name}</Tag>)
                                            }
                                        />
                                        {project.assignees && project.assignees.length > 0 && (
                                            <Avatar.Group maxCount={2} maxStyle={{
                                                color: '#000',
                                                backgroundColor: '#fde3cf',
                                                cursor: 'pointer',
                                            }}>
                                                {project.assignees.map(assignee => (
                                                    <Avatar
                                                        key={assignee.id}
                                                        src={`${REACT_APP_DOMAIN}/${assignee.userprofile.image}`}
                                                    />
                                                ))}
                                            </Avatar.Group>
                                        )}
                                    </List.Item>
                                )}
                            />
                        </div>
                        <Divider type="vertical" style={{width: '15px', margin: '0 20px'}}/>
                        <div style={{flex: 1}}>
                            <Divider>Issues</Divider>
                            <List
                                itemLayout="horizontal"
                                dataSource={searchResults.issues}
                                renderItem={(issue) => (
                                    <List.Item style={{margin: "10px"}}>
                                        <List.Item.Meta
                                            title={
                                                <Link
                                                    to={`/project/${issue.project}/dashboard?selectedIssue=${issue.slug}`}
                                                    onClick={(event) => event.stopPropagation()}
                                                    target="_blank"
                                                >
                                                    {issue.name} ({issue.slug})
                                                </Link>
                                            }
                                            description={issue.priority || issue.type ? (
                                                <>
                                                    <Tag
                                                        color={
                                                            issue.priority === 'Medium'
                                                                ? 'yellow'
                                                                : issue.priority === 'High'
                                                                    ? 'green'
                                                                    : 'red'
                                                        }
                                                    >
                                                        {issue.priority}
                                                    </Tag>
                                                    <Tag color="blue">{issue.type.type}</Tag>
                                                </>
                                            ) : null}
                                        />
                                        {issue.assignee && (
                                            <div>
                                                <Avatar key={issue.assignee.id}
                                                        src={`${REACT_APP_DOMAIN}/${issue.assignee.userprofile.image}`}/>
                                            </div>
                                        )}
                                        {issue.reporter && (
                                            <div>
                                                <Avatar key={issue.reporter.id}
                                                        src={`${REACT_APP_DOMAIN}/${issue.reporter.userprofile.image}`}/>
                                            </div>
                                        )}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </SearchResultsContainer>
            )}
        </SearchContainer>
    );
};

export default SearchBar;
