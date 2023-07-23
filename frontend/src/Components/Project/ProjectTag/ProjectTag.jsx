import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import * as TagComponents from './Style';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import {Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table} from 'antd';
import {ChromePicker} from 'react-color';

function Tags() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [pickedColor, setPickedColor] = useState('#1677ff');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editTagForm] = EditForm.useForm();
    const [addTagForm] = AddForm.useForm();

    let authToken = localStorage.getItem('auth_token');

    const {projectId} = useParams();


    const updateTable = (responseData) => {
        const updatedData = data.map(item => {
            if (item.id === responseData.id) {
                return {
                    id: responseData.id,
                    name: responseData.name,
                    color: responseData.color,
                }
            }
            return {
                ...item,
            };
        });
        setData(updatedData);
        setFilteredData(updatedData);
        setTotalItems((totalItems) => totalItems + 1);
        setModalVisible(false);
    }

    const updadteIssueStatus = (values) => {
        apiRequest
            .patch(`/api/project_labels/${selectedItem.id}/`,
                {"name": values.name, "color": values.color?.hex},
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                displaySuccessMessage('Successfully update the requested Tag!');
                updateTable(response.data)
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while updating the Tag ${error}`);
            });
    };
    const deleteIssueStatus = (id) => {
        apiRequest
            .delete(`/api/project_labels/${id}`, {
                headers: {"Authorization": `Token ${authToken}`}
            })
            .then(response => {
                displaySuccessMessage('Successfully delete the requested Tag!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while deleting the Tag ${error}`);
            });
    };

    const createIssueType = (values) => {
        apiRequest
            .post(`/api/project_labels/`,
                {"project": projectId, "name": values.name, "color": values.color.hex},
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                const result = {
                    "id": response.data.id, "name": response.data.name, "color": response.data.color
                };
                setData((data) => [...data, result]);
                setFilteredData((filteredData) => [...filteredData, result]);
                setTotalItems((totalItems) => totalItems + 1);
                setModalVisible(false);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while creating new Tag: ${error}`);
            });
    };

    useEffect(() => {
        apiRequest
            .get(`/api/project_labels/`,
                {
                    params: {project: projectId,},
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                const dataArray = response.data.map(item => {
                    const {id, name, color} = item;
                    return {id, name, color};
                })
                setData(dataArray);
                setFilteredData(dataArray);
                setTotalItems(dataArray.length);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while fetching data: ${error}`);
            });
    }, []);

    const handleDeleteLink = (record) => {
        Modal.confirm({
            title: 'Confirm',
            content: `Are you sure you want to delete this issue Tag: ${record.name}  ?`,
            onOk() {
                deleteIssueStatus(record.id);
                const updatedData = data.filter((item) => item.id !== record.id);
                setData(updatedData);
                setFilteredData(updatedData);
                setTotalItems(updatedData.length);
            },
        });
    };

    const handleEditLink = (record) => {
        setSelectedItem(record);
        editTagForm.setFieldValue('name', record.name);
        setPickedColor(record.color);
        setModalVisible(true);
    };

    const handleAddLink = () => {
        addTagForm.setFieldValue('name', null);
        setPickedColor('#1677ff');
        setSelectedItem(null);
        setModalVisible(true);
    };

    const handleEditModal = (values) => {
        updadteIssueStatus(values)
    }

    const handleAddModal = (values) => {
        createIssueType(values)
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = data.filter(
            item => item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const columns = [
        {title: 'ID', dataIndex: 'id'},
        {title: 'Name', dataIndex: 'name'},
        {
            title: 'Color',
            dataIndex: 'color',
            render: (color) => <TagComponents.ColorBox color={color}/>,
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEditLink(record)}>
                        <AiOutlineEdit/> Edit
                    </Button>
                    <Button type="link" onClick={() => handleDeleteLink(record)}>
                        <AiOutlineDelete/> Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div>
            <ProjectSidebar/>
            <NavBar/>
            <Toast/>
            <TagComponents.TagContainer>
                <h2>Project Issues Tags</h2>
                <Input.Search placeholder="Search by tag name" value={searchQuery} onChange={handleSearch}
                                style={{marginBottom: 16}}/>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={handleAddLink}>
                        <AiOutlinePlus/> Add
                    </Button>
                </div>
                <Table
                    dataSource={paginatedData}
                    columns={columns}
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
                <Modal
                    title={selectedItem ? 'Edit Item' : 'Add Item'}
                    open={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={[
                        <Button key="submit" type="primary" onClick={() => {
                            selectedItem ? editTagForm.submit() : addTagForm.submit()
                        }}>
                            {selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                >
                    {selectedItem ? (
                        <>
                            <EditForm layout="vertical" form={editTagForm} onFinish={handleEditModal}>
                                <TagComponents.StyledEditFormItem label="Name" name="name" rules={[{required: true}]}>
                                    <Input/>
                                </TagComponents.StyledEditFormItem>
                                <TagComponents.StyledEditFormItem label="Color" name="color"
                                                                  rules={[{required: true,}]}>
                                    <ChromePicker color={pickedColor} onChange={(color) => setPickedColor(color)}/>
                                </TagComponents.StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm layout="vertical" form={addTagForm} onFinish={handleAddModal}>
                                <TagComponents.StyledAddFormItem label="Name" name="name" value={null} rules={[{
                                    required: true,
                                    message: 'Please enter the Tag Name'
                                }]}>
                                    <Input/>
                                </TagComponents.StyledAddFormItem>
                                <TagComponents.StyledEditFormItem label="Color" name="color" rules={[{required: true}]}>
                                    <ChromePicker color={pickedColor} onChange={(color) => setPickedColor(color)}/>
                                </TagComponents.StyledEditFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </TagComponents.TagContainer>
        </div>
    );
}

export default Tags;
