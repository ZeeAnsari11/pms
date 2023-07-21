import React, {useEffect, useState} from 'react';
import * as ManageGroupComponents from './ManageGroupStyle'
import NavBar from "../../Dashboard/Navbar/index";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import {AiOutlineDelete, AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import {Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table, Transfer} from 'antd';

function ManageGroups() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [targetKeys, setTargetKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [editTypeForm] = EditForm.useForm();
    const [addTypeForm] = AddForm.useForm();

    let authToken = localStorage.getItem('auth_token');

    const updateTable = (responseData) => {
        const updatedData = data.map(item => {
            if (item.id === responseData.id) {
                return {
                    id: responseData.id,
                    name: responseData.name,
                    permissions: responseData.permissions
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

    const updateUserGroup = (values) => {
        apiRequest
            .patch(`/api/user_groups/${selectedItem.id}/`,
                {"name": values.name, "permissions": values.targetKeys},
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                updateTable(response.data)
                displaySuccessMessage('Successfully update the requested Type!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while updating the type ${error}`);
            });
    };

    const deleteIssueType = (id) => {
        apiRequest
            .delete(`/api/user_groups/${id}`, {headers: {"Authorization": `Token ${authToken}`}})
            .then(response => {
                displaySuccessMessage('Successfully delete the requested User Group!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while deleting the User Group ${error}`);
            });
    };

    const createUserGroup = (values) => {
        apiRequest
            .post(`/api/user_groups/`,
                {
                    name: values.name,
                    permissions: values.targetKeys,
                }, {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                displaySuccessMessage('Successfully create the requested User Group!');
                const result = {
                    "id": response.data.id,
                    "name": response.data.name,
                    "permissions": response.data.permissions
                };
                setData((data) => [...data, result]);
                setFilteredData((filteredData) => [...filteredData, result]);
                setTotalItems((totalItems) => totalItems + 1);
                setModalVisible(false);
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while creating new User Group ${error}`);
            });
    };

    const onPermissionChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const onPermissionSelectionChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const fetchData = async () => {
        try {
            const [groupsResponse, permissionsResponse] = await Promise.all([
                apiRequest.get(`/api/user_groups/`, {headers: {"Authorization": `Token ${authToken}`}}),
                apiRequest.get(`/api/user_permissions/`, {headers: {"Authorization": `Token ${authToken}`}})
            ]);

            const groupsData = groupsResponse.data.map(item => ({
                id: item.id,
                name: item.name,
                permissions: item.permissions
            }));

            const permissionsData = permissionsResponse.data.map(item => ({
                key: item.id,
                formatted_name: item.formatted_name
            }));

            setData(groupsData);
            setFilteredData(groupsData);
            setTotalItems(groupsData.length);
            setAvailablePermissions(permissionsData);
        } catch (error) {
            displayErrorMessage(`Error occurred while fetching data: ${error}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [authToken]);

    const handleDeleteLink = (record) => {
        Modal.confirm({
            title: 'Confirm',
            content: `Are you sure you want to delete this User Group: ${record.name}  ?`,
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
        editTypeForm.setFieldValue('name', record.name);
        if (record.permissions && record.permissions.length > 0) {
            setTargetKeys(record.permissions.map(permission => permission.id));
        }
        setSelectedItem(record);
        setModalVisible(true);
    };

    const handleAddLink = () => {
        addTypeForm.resetFields();
        setTargetKeys([]);
        setSelectedItem(null);
        setModalVisible(true);
    };

    const handleEditModal = (values) => {
        updateUserGroup(values)
    }

    const handleAddModal = (values) => {
        createUserGroup(values)
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = data.filter(
            item => item.formatted_name.toLowerCase().includes(query.toLowerCase())
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
        {title: 'Group', dataIndex: 'name'},
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
            <UserSidebar/>
            <NavBar/>
            <Toast/>
            <ManageGroupComponents.UserGroupContainer>
                <h2>User Groups</h2>
                <Input.Search placeholder="Search by group name" value={searchQuery} onChange={handleSearch}
                              style={{marginBottom: 16}}/>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={handleAddLink}>
                        <AiOutlinePlus/> Add
                    </Button>
                </div>
                <Table
                    dataSource={paginatedData}
                    columns={columns}
                    rowKey="key"
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
                    width={800}
                >
                    {selectedItem ? (
                        <>
                            <EditForm layout="vertical" form={editTypeForm} onFinish={handleEditModal}>
                                <ManageGroupComponents.StyledAddFormItem label="Group" name="name"
                                                   rules={[{required: true, message: 'Please enter Group name'}]}>
                                    <Input placeholder="Enter Group name"/>
                                </ManageGroupComponents.StyledAddFormItem>
                                <ManageGroupComponents.StyledEditFormItem label="Permissions" name="targetKeys">
                                    <Transfer
                                        dataSource={availablePermissions}
                                        titles={['Available Permissions', 'Selected Permissions']}
                                        targetKeys={targetKeys}
                                        selectedKeys={selectedKeys}
                                        onChange={onPermissionChange}
                                        onSelectChange={onPermissionSelectionChange}
                                        render={(item) => item.formatted_name}
                                        listStyle={{height: 300, width: 300}}
                                        showSearch
                                    />
                                </ManageGroupComponents.StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm layout="vertical" form={addTypeForm} onFinish={handleAddModal}>
                                <ManageGroupComponents.StyledAddFormItem label="Group" name="name"
                                                    rules={[{required: true, message: 'Please enter Group name'}]}>
                                    <Input placeholder="Enter Group name"/>
                                </ManageGroupComponents.StyledAddFormItem>
                                <ManageGroupComponents.StyledEditFormItem label="Permissions" name="targetKeys">
                                    <Transfer
                                        dataSource={availablePermissions}
                                        titles={['Available Permissions', 'Selected Permissions']}
                                        targetKeys={targetKeys}
                                        selectedKeys={selectedKeys}
                                        onChange={onPermissionChange}
                                        onSelectChange={onPermissionSelectionChange}
                                        render={(item) => item.formatted_name}
                                        listStyle={{height: 300, width: 300}}
                                        showSearch
                                    />
                                </ManageGroupComponents.StyledEditFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </ManageGroupComponents.UserGroupContainer>
        </div>
    );
}

export default ManageGroups;
