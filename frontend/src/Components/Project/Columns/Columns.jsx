import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import * as ColumnsComponents from './Style';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import {Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table} from 'antd';
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";

function Columns() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editStatusForm] = EditForm.useForm();
    const [addStatusForm] = AddForm.useForm();

    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const {projectId} = useParams();


    const updateTable = (responseData) => {
        const updatedData = data.map(item => {
            if (item.id === responseData.id) {
                return {
                    id: responseData.id,
                    status: responseData.status,
                    priority: responseData.priority,
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
            .patch(`/project_status/${selectedItem.id}/`,
                {"type": values.type, "priority": values.priority},
                {
                    headers: {"Authorization": `JWT ${localStorage.getItem('access')}`}
                })
            .then(response => {
                displaySuccessMessage('Successfully update the requested Status!');
                updateTable(response.data)
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while updating the Status ${error}`);
            });
    };
    const deleteIssueStatus = (id) => {
        apiRequest
            .delete(`/project_status/${id}`, {
                headers: {"Authorization": `JWT ${localStorage.getItem('access')}`}
            })
            .then(response => {
                displaySuccessMessage('Successfully delete the requested Status!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while deleting the Status ${error}`);
            });
    };

    const createIssueType = (values) => {
        apiRequest
            .post(`/project_status/`,
                {"project": projectId, "status": values.status, "priority": values.priority},
                {
                    headers: {"Authorization": `JWT ${localStorage.getItem('access')}`}
                })
            .then(response => {
                const result = {
                    "id": response.data.id, "status": response.data.status, "priority": response.data.priority
                };
                setData((data) => [...data, result]);
                setFilteredData((filteredData) => [...filteredData, result]);
                setTotalItems((totalItems) => totalItems + 1);
                setModalVisible(false);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while creating new Status: ${error}`);
            });
    };

    useEffect(() => {
        apiRequest
            .get(`/project_status/`,
                {
                    params: {project: projectId,},
                    headers: {"Authorization": `JWT ${localStorage.getItem('access')}`}
                })
            .then(response => {
                const dataArray = response.data.map(item => {
                    const {id, status, priority} = item;
                    return {id, status, priority};
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
            content: `Are you sure you want to delete this issue Status: ${record.status}  ?`,
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
        editStatusForm.setFieldValue('priority', record.priority);
        editStatusForm.setFieldValue('status', record.status);
        setModalVisible(true);
    };

    const handleAddLink = () => {
        addStatusForm.setFieldValue('priority', null);
        addStatusForm.setFieldValue('status', null);
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
            item => item.status.toLowerCase().includes(query.toLowerCase())
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
        {title: 'Status', dataIndex: 'status'},
        {title: 'Priority', dataIndex: 'priority'},
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
            <ColumnsComponents.ColumnContainer>
                <h2>Project Issues Status</h2>
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
                            selectedItem ? editStatusForm.submit() : addStatusForm.submit()
                        }}>
                            {selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                >
                    {selectedItem ? (
                        <>
                            <EditForm layout="vertical" form={editStatusForm} onFinish={handleEditModal}>
                                <ColumnsComponents.StyledEditFormItem label="Status" name="status"
                                                                      rules={[{required: true}]}>
                                    <Input/>
                                </ColumnsComponents.StyledEditFormItem>
                                <ColumnsComponents.StyledEditFormItem label="Priority" name="priority"
                                                                      rules={[{required: true,}]}>
                                    <Input/>
                                </ColumnsComponents.StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm layout="vertical" form={addStatusForm} onFinish={handleAddModal}>
                                <ColumnsComponents.StyledAddFormItem label="Status" name="status" value={null} rules={[{
                                    required: true,
                                    message: 'Please enter the Status Name'
                                }]}>
                                    <Input/>
                                </ColumnsComponents.StyledAddFormItem>
                                <ColumnsComponents.StyledAddFormItem label="Priority" name="priority" value={null}
                                                                     rules={[{
                                                                         required: true,
                                                                         message: 'Integer value is required'
                                                                     }]}>
                                    <Input/>
                                </ColumnsComponents.StyledAddFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </ColumnsComponents.ColumnContainer>
        </div>
    );
}

export default Columns;
