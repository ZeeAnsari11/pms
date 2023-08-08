import React, {useState, useEffect} from 'react';
import apiRequest from '../../../Utils/apiRequest';
import {Space, Table, Tag} from 'antd';
import * as ProjectListingComponents from './Style';
import {Modal} from 'antd';
import {GrAlert} from 'react-icons/gr';
import ToastContainer from "../../../Shared/Components/Toast";
import {displayErrorMessage} from "../../../Shared/notify";

const ProjectListing = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    let authToken = localStorage.getItem('auth_token')

    const handleImageError = (e) => {
        e.target.src = `/Images/NoImage.jpeg`;
    };

    const columns = [
        {title: 'ID', dataIndex: 'id', sorter: (record1, record2) => (record1.id > record2.id)},
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <ProjectListingComponents.ProjectLink to={`/project/${record.id}/dashboard`}>
                    <ProjectListingComponents.ProjectIcon>
                        <ProjectListingComponents.ProjectAvatar src={`${process.env.REACT_APP_HOST}/${record.icon}`}
                                                                alt={record.name}
                                                                onError={handleImageError}
                        />
                    </ProjectListingComponents.ProjectIcon>
                    {text}
                </ProjectListingComponents.ProjectLink>
            ),
            sorter: (record1, record2) => record1.name.localeCompare(record2.name)
        }, {
            title: 'Key', dataIndex: 'slug', key: 'slug', render: (text) => text.toUpperCase()
        }, {
            title: 'Project Lead', dataIndex: 'lead', key: 'lead',
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
            title: 'Action', key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            await apiRequest
                .get(`/api/projects/`, {
                    headers: {
                        Authorization: `Token ${authToken}`,
                    },
                })
                .then(response => {
                    const dataArray = response.data.map(project => ({
                        id: project.id,
                        name: project.name,
                        slug: project.slug,
                        lead: project.project_lead.username,
                        icon: project.icon,
                        category: typeof project.category === 'string' ? project.category : project.category.category
                    }));
                    setFilteredData(dataArray);
                    setProjects(dataArray);
                    setTotalItems(dataArray.length);
                    setLoading(false);
                })
                .catch(error => {
                    displayErrorMessage(`Error occurred while fetching data: ${error}`);
                    setLoading(false);
                });
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
        setTotalItems(filteredProjects.length);
        setCurrentPage(1);
    };


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
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
                <p>Only ProjeX admins can restore the project from the trash.</p>
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
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalItems,
                        onChange: handlePageChange,
                        showSizeChanger: true,
                        onShowSizeChange: handlePageSizeChange
                    }}
                />
            </ProjectListingComponents.ProjectListingTable>
        </>
    );
};

export default ProjectListing;