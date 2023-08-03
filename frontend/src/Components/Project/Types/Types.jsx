import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import * as TypeComponents from './Style';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import {Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table} from 'antd';
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";

function Types() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editTypeForm] = EditForm.useForm();
    const [addTypeForm] = AddForm.useForm();

    let authToken = localStorage.getItem('auth_token');
    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const {projectId} = useParams();


    const updateTable = (responseData) => {
        const updatedData = data.map(item => {
            if (item.id === responseData.id) {
                return {
                    id: responseData.id,
                    type: responseData.type,
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

    const updadteIssueType = (values) => {
        apiRequest
            .patch(`/api/project_type/${selectedItem.id}/`,
                {"type": values.type,},
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                displaySuccessMessage('Successfully update the requested Type!');
                updateTable(response.data)
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while updating the type ${error}`);
            });
    };

    const deleteIssueType = (id) => {
        apiRequest
            .delete(`/api/project_type/${id}`, {
                headers: {"Authorization": `Token ${authToken}`}
            })
            .then(response => {
                displaySuccessMessage('Successfully delete the requested Type!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while deleting the type ${error}`);
            });
    };

    const createIssueType = (values) => {
        apiRequest
            .post(`/api/project_type/`,
                {"project": projectId, "type": values.type},
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                const result = {"id": response.data.id, "type": response.data.type};
                setData((data) => [...data, result]);
                setFilteredData((filteredData) => [...filteredData, result]);
                setTotalItems((totalItems) => totalItems + 1);
                setModalVisible(false);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while creating new type: ${error}`);
            });
    };

    useEffect(() => {
        apiRequest
            .get(`/api/project_type/`,
                {
                    params: {project: projectId,},
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                const dataArray = response.data.map(item => {
                    const {id, type} = item;
                    return {id, type};
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
            content: `Are you sure you want to delete this issue type: ${record.type}  ?`,
            onOk() {
                deleteIssueType(record.id);
                const updatedData = data.filter((item) => item.id !== record.id);
                setData(updatedData);
                setFilteredData(updatedData);
                setTotalItems(updatedData.length);
            },
        });
    };

    const handleEditLink = (record) => {
        setSelectedItem(record);
        editTypeForm.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleAddLink = () => {
        addTypeForm.setFieldsValue(null);
        setSelectedItem(null);
        setModalVisible(true);
    };

    const handleEditModal = (values) => {
        updadteIssueType(values)
    }

    const handleAddModal = (values) => {
        createIssueType(values)
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = data.filter(
            item => item.type.toLowerCase().includes(query.toLowerCase())
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
        {title: 'Type', dataIndex: 'type'},
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

    if (!IsAdminOrStaffUser) {
        return (
            <>
                <NavBar/>
                <ProjectSidebar/>
                <ErrorPage status={403}/>
            </>
        );
    }

    return (
        <div>
            <ProjectSidebar/>
            <NavBar/>
            <Toast/>
            <TypeComponents.TypesContainer>
                <h2>Project Issues Types</h2>
                <Input.Search placeholder="Search by label name" value={searchQuery} onChange={handleSearch}
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
                            selectedItem ? editTypeForm.submit() : addTypeForm.submit()
                        }}>
                            {selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                >
                    {selectedItem ? (
                        <>
                            <EditForm layout="vertical" form={editTypeForm} onFinish={handleEditModal}>
                                <TypeComponents.StyledEditFormItem label="Type" name="type" rules={[{required: true}]}>
                                    <Input/>
                                </TypeComponents.StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm layout="vertical" form={addTypeForm} onFinish={handleAddModal}>
                                <TypeComponents.StyledAddFormItem label="Type" name="type" value={null} rules={[{
                                    required: true,
                                    message: 'Please enter the new Type'
                                }]}>
                                    <Input/>
                                </TypeComponents.StyledAddFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </TypeComponents.TypesContainer>
        </div>
    );
}

export default Types;
