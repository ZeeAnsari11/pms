import React, {useState, useEffect} from 'react';
import apiRequest from '../../../Utils/apiRequest';
import {Space, Table, Tag} from 'antd';
import * as ProjectListingComponents from './Style';
import {Modal} from 'antd';
import {GrAlert} from 'react-icons/gr';
import ToastContainer from "../../../Shared/Components/Toast";
import {displayErrorMessage} from "../../../Shared/notify";
import {useSelector} from "react-redux";

const ProjectListing = () => {
    const columns = [
        {title: 'ID', dataIndex: 'id'},
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <ProjectListingComponents.ProjectLink to={`/project/${record.id}/dashboard`}>
                    <ProjectListingComponents.ProjectIcon>
                        <ProjectListingComponents.ProjectAvatar src={`${process.env.REACT_APP_HOST}/${record.icon}`}
                                                                alt={record.name}/>
                    </ProjectListingComponents.ProjectIcon>
                    {text}
                </ProjectListingComponents.ProjectLink>
            ),
        }, {
            title: 'Key',
            dataIndex: 'slug',
            key: 'slug',
        }, {
            title: 'Project Lead',
            dataIndex: 'lead',
            key: 'lead',
        }, {
            title: 'Category',
            key: 'category',
            dataIndex: 'tag',
            render: (_, {category}) => (
                <Tag color='geekblue' key={category}>
                    {category.toUpperCase()}
                </Tag>
            ),
        }, {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const projectsData = useSelector((state) => state.DataSyncer.projectsData);


    useEffect(() => {
        const fetchProjects = async () => {
            const dataArray = projectsData.map(project => ({
                id: project.id,
                name: project.name,
                slug: project.key,
                lead: project.project_lead.username,
                icon: project.icon,
                category: typeof project.category === 'string' ? project.category : project.category.category
            }));
            setFilteredData(dataArray);
            setProjects(dataArray);
        };
        fetchProjects()
    }, []);

    const handleSearch = (value) => {
        const filteredProjects = projects.filter(
            (project) => project.name.toLowerCase().includes(value.toLowerCase()) ||
                project.slug.toLowerCase().includes(value.toLowerCase()) ||
                project.lead.toLowerCase().includes(value.toLowerCase()) ||
                project.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filteredProjects);
    };


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    const userIcon = <GrAlert/>;

    return (
        <>
            <ToastContainer/>
            <Modal
                title={`Welcome, ${userIcon}!`}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={ProjectListingComponents.modalStyle}
            >
                <p>
                    <GrAlert/> The project along with its issues, components, attachments, and versions will be
                    available in the trash for 60 days after which it will be permanently deleted.
                </p>
                <p>Only Jira admins can restore the project from the trash.</p>
            </Modal>
            <ProjectListingComponents.SearchContainer>
                <ProjectListingComponents.SearchInputContainer>
                    <ProjectListingComponents.SearchIcon/>
                    <ProjectListingComponents.SearchInput type="text" placeholder="Search Projects" value={null}
                                                          onChange={(e) => handleSearch(e.target.value)}/>
                </ProjectListingComponents.SearchInputContainer>
            </ProjectListingComponents.SearchContainer>
            <ProjectListingComponents.ProjectListingTable>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{defaultPageSize: 10, showSizeChanger: true}}
                />
            </ProjectListingComponents.ProjectListingTable>
        </>
    );
};

export default ProjectListing;