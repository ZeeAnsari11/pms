import React, {useEffect, useState} from 'react';
import * as ManageUsersComponents from './ManageUserStyle';
import NavBar from '../../Dashboard/Navbar/index';
import Toast from "../../../Shared/Components/Toast"
import {displaySuccessMessage, displayErrorMessage} from "../../../Shared/notify"
import {Input, Button, Modal, Pagination, Space, Form, Switch} from 'antd';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai';
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";
import {fetchUsersList, updateUser, deleteUser} from "../../../api/list/users";


const ManageUsers = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);


    const [form] = Form.useForm();

    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const updateTable = (responseData, id) => {
        const updatedData = data.map(item => {
            if (item.id === responseData.id) {
                return {
                    id: responseData.id,
                    username: responseData.username,
                    email: responseData.email,
                    isSuperUser: responseData.is_superuser,
                    isActive: responseData.is_active,
                    isStaff: responseData.is_staff,
                    lastLogIn: responseData.last_login
                }
            }
            return {
                ...item,
            };
        });
        setData(updatedData);
        setFilteredData(updatedData);
        setTotalItems(updatedData.length);
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this user?',
            onOk: () => {
                deleteUser(id)
                    .then( response =>  {
                        displaySuccessMessage('Successfully delete the requested user!');
                        const updatedData = data.filter((item) => item.id !== id);
                        setData(updatedData);
                        setFilteredData(updatedData);
                        setTotalItems(updatedData.length);
                    } )
                    .catch( message =>  displayErrorMessage(message))
            },
        });
    };

    const fetchUsers = () => {
          fetchUsersList()
              .then(usersList => {
                  const mappedValues = usersList.data.map(item => {
                    return {
                        id: item.id,
                        username: item.username,
                        email: item.email,
                        isSuperUser: item.is_superuser,
                        isActive: item.is_active,
                        isStaff: item.is_staff,
                        lastLogIn: item.last_login
                    };
                });
                setData(mappedValues);
                setFilteredData(mappedValues);
                setTotalItems(mappedValues.length);
              })
              .catch(error => {
                  displayErrorMessage(error.message)
          })
    };

    const handleUserUpdate = (values) => {
        if (modalData.id) {
            updateUser(
                modalData.id,
                {
                    "username": values.username,
                    "email": values.email,
                    "is_superuser": values.isSuperUser,
                    "is_staff": values.isStaff,
                    "is_active": values.isActive,
                }
                )
                .then(response => {
                    updateTable(response.data)
                    displaySuccessMessage(`Successfully Update the user: ${values.email} `)
                })
                .catch(message => {
                    displayErrorMessage(message)
                })
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = data.filter((item) =>
            item.username.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleEdit = (record) => {
        setModalData(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalData(null);
        form.resetFields();
        setModalVisible(false);
    };

    const handleModalSave = (values) => {
        handleUserUpdate(values);
        setModalData(null);
        form.resetFields();
        setModalVisible(false);
    };

    const columns = [
        {title: 'ID', dataIndex: 'id'},
        {title: 'Username', dataIndex: 'username'},
        {title: 'Email', dataIndex: 'email'},
        {title: 'Admin Status', dataIndex: 'isSuperUser', render: (isSuperUser) => (isSuperUser ? 'Yes' : 'No')},
        {title: 'Active Status', dataIndex: 'isActive', render: (isActive) => (isActive ? 'Yes' : 'No')},
        {title: 'Staff Status', dataIndex: 'isStaff', render: (isStaff) => (isStaff ? 'Yes' : 'No')},
        {title: 'Last LogIn', dataIndex: 'lastLogIn'},
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        <AiOutlineEdit/> Edit
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record.id)}>
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
                <UserSidebar/>
                <ErrorPage status={403}/>
            </>
        );
    }

    return (
        <>
            <UserSidebar/>
            <NavBar/>
            <Toast/>
            <ManageUsersComponents.UserContainer>
                <h2>Users List</h2>
                <Input.Search placeholder="Search by Username or Email" value={searchQuery} onChange={handleSearch}
                              style={{marginBottom: 16}}/>
                <ManageUsersComponents.PermissionsTable
                    dataSource={paginatedData}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />
                <ManageUsersComponents.PaginationWrapper>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        onChange={handlePageChange}
                        showSizeChanger
                        onShowSizeChange={handlePageSizeChange}
                        style={{marginBottom: 16}}
                    />
                </ManageUsersComponents.PaginationWrapper>
            </ManageUsersComponents.UserContainer>

            <Modal
                title="Edit User"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="submit" type="primary" onClick={form.submit}>
                        Submit
                    </Button>,
                ]}
            >
                {modalData && (
                    <Form layout="vertical" form={form} onFinish={handleModalSave} initialValues={modalData}>
                        <ManageUsersComponents.StyledFormItem label="Username" name="username"
                                                              rules={[{message: 'Please enter a username'}]}>
                            <Input/>
                        </ManageUsersComponents.StyledFormItem>
                        <ManageUsersComponents.StyledFormItem label="Email" name="email"
                                                              rules={[{message: 'Please enter an email'}]}>
                            <Input/>
                        </ManageUsersComponents.StyledFormItem>
                        <ManageUsersComponents.StyledFormItem label="Admin Status" name="isSuperUser"
                                                              valuePropName="checked">
                            <Switch/>
                        </ManageUsersComponents.StyledFormItem>
                        <ManageUsersComponents.StyledFormItem label="Active Status" name="isActive"
                                                              valuePropName="checked">
                            <Switch/>
                        </ManageUsersComponents.StyledFormItem>
                        <ManageUsersComponents.StyledFormItem label="Is Staff" name="isStaff" valuePropName="checked">
                            <Switch/>
                        </ManageUsersComponents.StyledFormItem>
                        <ManageUsersComponents.StyledFormItem label="Last LogIn" name="lastLogIn"
                                                              rules={[{message: 'Please enter an email'}]}>
                            <Input disabled/>
                        </ManageUsersComponents.StyledFormItem>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default ManageUsers;
