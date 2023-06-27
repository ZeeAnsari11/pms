import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../Dashboard/Navbar/index';
import apiRequest from '../../../Utils/apiRequest';
import { AuthContext } from '../../../Utils/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import { useParams } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";
import { Table, Input, Button, Modal, Pagination, Space, Form, Switch } from 'antd';
import { AiOutlineSetting, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";

const { Column } = Table;
const {userModalForm} = Form;


const PermissionsContainer = styled.div`
    margin-left: 16%;
    margin-top: 0%;
    padding-top: 61px;
    padding-left: 80px;
    margin-right: 90px;
`;

const Heading = styled.h2`
    margin-left: 10px;
`;



const PermissionsTable = styled(Table)`
    margin-top: 20px;
`;

const PaginationWrapper = styled.div`
  float: right;
  margin-top: 15px;
`;



const ManageUsers = () => {
    const [data, setData] = useState([]); // Data for the table
    const [filteredData, setFilteredData] = useState([]); // Filtered data based on search query
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [pageSize, setPageSize] = useState(10); // Number of items per page
    const [totalItems, setTotalItems] = useState(0); // Total number of items
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility
    const [modalData, setModalData] = useState(null); // Data for the modal
    const [modalEditedData, setModalEditedData] = useState(null); // Data for the modal


    const { authToken } = useContext(AuthContext);

    const { projectId } = useParams();

    // Mock API call to fetch data
    const fetchData = () => {
        // Replace this with your actual API call to fetch data

        const response = [
            { id: 1, username: 'john123', email: 'john@example.com', firstName: 'John', lastName: 'Doe', isStaff: true },
            { id: 2, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 3, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 4, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 5, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 6, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 7, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 8, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 9, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 10, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 11, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 12, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 13, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 14, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 15, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 16, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            { id: 17, username: 'jane456', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', isStaff: false },
            // Add more data...
        ];

        setData(response);
        setFilteredData(response);
        setTotalItems(response.length);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter the data based on search query
        const filtered = data.filter((item) =>
            item.username.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase()) ||
            item.firstName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1);
    };

      // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            setFilteredData(updatedData);
            setTotalItems(updatedData.length);
    };

    // Handle edit action
    const handleEdit = (record) => {
        setModalData(record);
        setModalVisible(true);
    };

  // Handle modal close
    const handleModalClose = () => {
        setModalVisible(false);
        setModalData(null);
    };

    const handleModalSave = () => {
        console.log('Modal data before edit', modalData);
        setModalVisible(false);
        setModalData(null);
    };



    const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Username', dataIndex: 'username' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'First Name', dataIndex: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName' },
    { title: 'Is Staff', dataIndex: 'isStaff', render: (isStaff) => (isStaff ? 'Yes' : 'No') },
    {
        title: 'Actions',
            render: (_, record) => (
            <Space>
                <Button type="link" onClick={() => handleEdit(record)}>
                    <AiOutlineEdit /> Edit
                </Button>
                <Button type="link" onClick={() => handleDelete(record.id)}>
                    <AiOutlineDelete /> Delete
                </Button>
            </Space>
            ),
        },
    ];

    // Calculate pagination values
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);



    return (
        <>
            <UserSidebar/>
            <NavBar/>
            <PermissionsContainer>
                <Heading>Users List</Heading>
                <Input.Search placeholder="Search" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 16 }} />
                <PermissionsTable
                    dataSource={paginatedData}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                    />
                <PaginationWrapper>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        onChange={handlePageChange}
                        showSizeChanger
                        onShowSizeChange={handlePageSizeChange}
                        style={{ marginBottom: 16 }}
                />
                </PaginationWrapper>
            </PermissionsContainer>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <Modal
                title="Edit User"
                open={modalVisible}
                onOk={handleModalSave}
                onCancel={handleModalClose}
                footer={[
                    <Button form="myForm" key="submit" htmlType="submit">
                        Submit
                    </Button>
        ]}
            >
            {modalData && (
                <Form initialValues={modalData}
                >
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter an email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter a first name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter a last name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Is Staff" name="isStaff" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            )}
            </Modal>
        </>
    );
};

export default ManageUsers;
