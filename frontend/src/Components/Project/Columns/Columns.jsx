import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import { displayErrorMessage, displaySuccessMessage } from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import { Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table } from 'antd';


const TypesContainer = styled.div`
    margin-left: 16%;
    margin-top: 0%;
    padding-top: 50px;
    padding-left: 20px;
    margin-right: 20px;
`;


const StyledEditFormItem = styled(EditForm.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  .ant-form-item-label {
    font-weight: bold;
  }
`;

const StyledAddFormItem = styled(AddForm.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  .ant-form-item-label {
    font-weight: bold;
  }
`;

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

    let authToken = localStorage.getItem('auth_token');

    const { projectId } = useParams();


    const  updateTable = ( responseData ) => {
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
            .patch(`/api/project_status/${selectedItem.id}/`,
                {"type": values.type, "priority": values.priority},
                { headers: { "Authorization": `Token ${authToken}` }
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
            .delete(`/api/project_status/${id}`,{ headers: { "Authorization": `Token ${authToken}` }
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
            .post(`/api/project_status/`,
                { "project" : projectId, "status" : values.status, "priority" : values.priority },
                { headers: { "Authorization": `Token ${authToken}` }
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
            .get(`/api/project_status/`,
                {
                    params: { project: projectId, },
                    headers: { "Authorization": `Token ${authToken}` }
                } )
            .then(response => {
                const dataArray = response.data.map(item => {
                    const { id, status, priority } = item;
                    return { id, status, priority };
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

    const handleEditLink = ( record ) => {
        setSelectedItem(record);
        editStatusForm.setFieldValue('priority', record.priority);
        editStatusForm.setFieldValue('status', record.status);
        setModalVisible( true );
    };

    const handleAddLink = () => {
        addStatusForm.setFieldValue('priority',null);
        addStatusForm.setFieldValue('status',null);
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
        { title: 'ID', dataIndex: 'id' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Priority', dataIndex: 'priority' },
        {
            title: 'Actions',
                render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEditLink(record)}>
                        <AiOutlineEdit /> Edit
                    </Button>
                    <Button type="link" onClick={() => handleDeleteLink(record)}>
                        <AiOutlineDelete /> Delete
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
            <ProjectSidebar />
            <NavBar/>
            <Toast />
            <TypesContainer>
                <h2>Project Issues Status</h2>
                <Input.Search placeholder="Search by label name" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 16 }} />
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={handleAddLink}>
                        <AiOutlinePlus /> Add
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
                        <Button key="submit" type="primary" onClick={() => {selectedItem ? editStatusForm.submit() : addStatusForm.submit()}}>
                            { selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                >
                    {selectedItem ? (
                        <>
                            <EditForm layout="vertical" form={editStatusForm} onFinish={handleEditModal}>
                                <StyledEditFormItem label="Status" name="status" rules={[{ required:true}]}>
                                    <Input />
                                </StyledEditFormItem>
                                <StyledEditFormItem label="Priority" name="priority" rules={[{ required:true,}]}>
                                    <Input />
                                </StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm layout="vertical" form={addStatusForm} onFinish={handleAddModal} >
                                <StyledAddFormItem label="Status" name="status" value={null} rules={[{required:true, message: 'Please enter the Status Name' }]}>
                                    <Input />
                                </StyledAddFormItem>
                                <StyledAddFormItem label="Priority" name="priority" value={null} rules={[{required:true, message: 'Integer value is required' }]}>
                                    <Input />
                                </StyledAddFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </TypesContainer>
        </div>
    );
}
export default Columns;
