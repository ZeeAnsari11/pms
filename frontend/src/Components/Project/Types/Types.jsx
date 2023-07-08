import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import {displaySuccessMessage, displayErrorMessage} from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import { Modal, Button, Input, Table, Form } from 'antd';


const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeadingWrapper = styled.div`
  width: 100%;
`;

const StyledFormItem = styled(Form.Item)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;

function Types() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editTypeForm] = Form.useForm();
    const [addTypeForm] = Form.useForm();

    let authToken = localStorage.getItem('auth_token');

    const { projectId } = useParams();


    const deleteIssueType = (id) => {
        apiRequest
            .delete(`/api/project_type/${id}`,{
                headers:
                    { "Authorization": `Token ${authToken}` }
            } )
            .then(response => {
                console.log('Data deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting data', error);
            });
    };

    const createIssueType = (values) => {
        apiRequest
                .post(`/api/project_type/`,
                    {
                        "type": values.type
                    },
                    { headers: { "Authorization": `Token ${authToken}` } } )
                .then(response => {
                    const result = {
                        "id": response.data.id,
                        "type": response.data.type,
                    };
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
    };

    const handleDeleteType = (record) => {
        Modal.confirm({
            title: 'Confirm',
            content: `Are you sure you want to delete this issue type: ${record.type}  ?`,
            onOk() {
                deleteIssueType(record.id);
            },
        });
    };

    const handleEditType = (values) => {

    }

    const handleAddType = (values) => {
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

    const handleAdd = () => {
        setSelectedItem(null);
        setModalVisible(true);
    };


    const handleEdit = item => {
        setSelectedItem(item);
        setModalVisible(true);
    };


    useEffect(() => {
        apiRequest
            .get(`/api/project_type/`,
                {
                    params: {
                        project: projectId,
                    },
                    headers: {
                        "Authorization": `Token ${authToken}`
                    }
                } )
            .then(response => {
                const dataArray = response.data.map(item => {
                    const { id, type } = item;
                    return { id, type };
                })
                setData(dataArray);
                setFilteredData(dataArray);
                setTotalItems(dataArray.length);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        { title: 'Type', dataIndex: 'type' },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        <AiOutlineEdit /> Edit
                    </Button>
                    <Button type="link" onClick={() => handleDeleteType(record)}>
                        <AiOutlineDelete /> Delete
                    </Button>
                </>
            )
        }
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);


    return (
        <div>
            <PageContainer>
                <ProjectSidebar />
                <NavBar/>
                <Toast />
                <ContentWrapper>
                    <HeadingWrapper>
                        <SummaryHeading>Project Issues Types</SummaryHeading>
                    </HeadingWrapper>
                    <Input.Search placeholder="Search by label name" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 16 }} />
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={handleAdd}>
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
                            <Button key="submit" type="primary" onClick={() => selectedItem ? editTypeForm.submit : addTypeForm.submit}>
                                { selectedItem ? 'Edit Item' : 'Add Item'}
                            </Button>,
                        ]}
                    >
                        {selectedItem ? ((
                            <>
                                <Form form={editTypeForm} onFinish={handleEditType} initialValues={selectedItem}>
                                    <StyledFormItem label="Type" name="type" rules={[{ required:true}]}>
                                        <Input />
                                    </StyledFormItem>
                                </Form>
                            </>
                        )) : ((
                            <>
                                <Form form={addTypeForm} onFinish={handleAddType}>
                                    <StyledFormItem label="Type" name="type" rules={[{required:true, message: 'Please enter the new Type' }]}>
                                        <Input />
                                    </StyledFormItem>
                                </Form>
                            </>
                        ))}
                    </Modal>
                </ContentWrapper>
            </PageContainer>
        </div>
    );
}
export default Types;
