import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import { displayErrorMessage, displaySuccessMessage } from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import { Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table, Col, Row, ColorPicker  } from 'antd';


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
`;

const StyledAddFormItem = styled(AddForm.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;

function Tags() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editTagForm] = EditForm.useForm();
    const [addTagForm] = AddForm.useForm();

    let authToken = localStorage.getItem('auth_token');

    const { projectId } = useParams();


    const  updateTable = ( responseData ) => {
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
                {"name": values.name, "color": values.color},
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
            .delete(`/api/project_labels/${id}`,{ headers: { "Authorization": `Token ${authToken}` }
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
            .post(`/api/project_labels/`,
                { "project" : projectId, "name" : values.name, "color" : values.color },
                { headers: { "Authorization": `Token ${authToken}` }
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
                displayErrorMessage(`Error occurred while creating new Status: ${error}`);
            });
    };

    useEffect(() => {
        apiRequest
            .get(`/api/project_labels/`,
                {
                    params: { project: projectId, },
                    headers: { "Authorization": `Token ${authToken}` }
                } )
            .then(response => {
                const dataArray = response.data.map(item => {
                    const { id, name, color } = item;
                    return { id, name, color };
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
            content: `Are you sure you want to delete this issue Status: ${record.name}  ?`,
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
        editTagForm.setFieldValue('name', record.name);
        editTagForm.setFieldValue('color', record.color);
        setModalVisible( true );
    };

    const handleAddLink = () => {
        addTagForm.setFieldValue('name',null);
        addTagForm.setFieldValue('color',null);
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
        { title: 'ID', dataIndex: 'id' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Color', dataIndex: 'color' },
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
                <h2>Project Issues Tags</h2>
                <Input.Search placeholder="Search by tag name" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 16 }} />
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
                        <Button key="submit" type="primary" onClick={() => {selectedItem ? editTagForm.submit() : addTagForm.submit()}}>
                            { selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                >
                    {selectedItem ? (
                        <>
                            <EditForm form={editTagForm} onFinish={handleEditModal}>
                                <StyledEditFormItem label="Name" name="name" rules={[{ required:true}]}>
                                    <Input />
                                </StyledEditFormItem>
                                <StyledEditFormItem label="Color" name="color" rules={[{ required:true,}]}>
                                    <Input />
                                </StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm form={addTagForm} onFinish={handleAddModal} >
                                <StyledAddFormItem label="Name" name="name" value={null} rules={[{required:true, message: 'Please enter the Status Name' }]}>
                                    <Input />
                                </StyledAddFormItem>
                                <StyledEditFormItem label="Color" name="color" rules={[{ required: true }]}>
                                    <Row gutter={8} align="middle">
                                        <Col span={18}>
                                          <Input />
                                        </Col>
                                    <Col span={6}>
                                        <ColorPicker />
                                    </Col>
                                  </Row>
                                </StyledEditFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </TypesContainer>
        </div>
    );
}
export default Tags;
