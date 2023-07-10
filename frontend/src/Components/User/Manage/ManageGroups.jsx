import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import Toast from "../../../Shared/Components/Toast"
import { displayErrorMessage, displaySuccessMessage } from "../../../Shared/notify"
import apiRequest from '../../../Utils/apiRequest';
import { Button, Form as EditForm, Form as AddForm, Input, Modal, Space, Table, Transfer, Form } from 'antd';


const UserGroupContainer = styled.div`
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

const availablePermissions = [
    {
        key: 1,
        name:"Can add log entry",
        formatted_name: "admin | logentry | Can add log entry",
        codename: "add_logentry",
        content_type: 1
    }, {
        key: 2,
        name: "Can change log entry",
        formatted_name: "admin | logentry | Can change log entry",
        codename: "change_logentry",
        content_type: 1
    }, {
        key: 3,
        name: "Can delete log entry",
        formatted_name: "admin | logentry | Can delete log entry",
        codename: "delete_logentry",
        content_type: 1
    }, {
        key: 4,
        name: "Can view log entry",
        formatted_name: "admin | logentry | Can view log entry",
        codename: "view_logentry",
        content_type: 1
    }, {
        key: 9,
        name: "Can add group",
        formatted_name: "auth | group | Can add group",
        codename: "add_group",
        content_type: 3
    }, {
        key: 10,
        name: "Can change group",
        formatted_name: "auth | group | Can change group",
        codename: "change_group",
        content_type: 3
}
];


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

    const  updateTable = ( responseData ) => {
        const updatedData = data.map(item => {
            if (item.key === responseData.key) {
                return {
                    key: responseData.key,
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

    const updadteUserGroup = (values) => {
    };

    const deleteIssueType = (id) => {
        apiRequest
            .delete(`/api/user_groups/${id}`,{ headers: { "Authorization": `Token ${authToken}` } })
            .then(response => {
                displaySuccessMessage('Successfully delete the requested Group!');
            })
            .catch(error => {
                displayErrorMessage(`Error occurred while deleting the Group ${error}`);
            });
    };

    const createIssueType = (values) => {
    };

    const onPermissionChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };

    const onPermissionSelectionChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const fetchData = async () => {
        try {
            const [groupsResponse, permissionsResponse] = await Promise.all([
                apiRequest.get(`/api/user_groups/`, { headers: { "Authorization": `Token ${authToken}` } }),
                apiRequest.get(`/api/user_permissions/`, { headers: { "Authorization": `Token ${authToken}` } })
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

            console.log('Groups Data:', groupsData);
            console.log('Permissions Data:', permissionsData);

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
            content: `Are you sure you want to delete this Group: ${record.name}  ?`,
            onOk() {
                deleteIssueType(record.id);
                const updatedData = data.filter((item) => item.id !== record.id);
                setData(updatedData);
                setFilteredData(updatedData);
                setTotalItems(updatedData.length);
            },
        });
    };

    const handleEditLink = ( record ) => {
        setSelectedItem(record);
        editTypeForm.setFieldsValue(record);
        setModalVisible( true );
    };

    const handleAddLink = () => {
        setSelectedItem(null);
        setModalVisible(true);
    };

    const handleEditModal = (values) => {
        updadteUserGroup(values)
    }

    const handleAddModal = (values) => {
        console.log('Values on submission of form', values);
        setModalVisible(false);
        createIssueType(values)
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
        { title: 'ID', dataIndex: 'id' },
        { title: 'Group', dataIndex: 'name' },
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
            <UserSidebar />
            <NavBar/>
            <Toast />
            <UserGroupContainer>
                <h2>User Groups</h2>
                <Input.Search placeholder="Search by group name" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 16 }} />
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={handleAddLink}>
                        <AiOutlinePlus /> Add
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
                        <Button key="submit" type="primary" onClick={() => {selectedItem ? editTypeForm.submit() : addTypeForm.submit()}}>
                            { selectedItem ? 'Edit Item' : 'Add Item'}
                        </Button>,
                    ]}
                    width={800}
                >
                    {selectedItem ? (
                        <>
                            <EditForm form={editTypeForm} onFinish={handleEditModal}>
                                <StyledEditFormItem label="Type" name="type" rules={[{ required:true}]}>
                                    <Input />
                                </StyledEditFormItem>
                            </EditForm>
                        </>
                    ) : (
                        <>
                            <AddForm form={addTypeForm} onFinish={handleAddModal} >
                                <StyledAddFormItem label="Group" name="name" value={null} rules={[{ required: true, message: 'Please enter Group name' }]}>
                                    <Input placeholder="Enter Group name" />
                                </StyledAddFormItem>
                                <StyledEditFormItem label="Permissions" name="targetKeys" >
                                    <Transfer
                                        dataSource={availablePermissions}
                                        titles={['Available Permissions', 'Selected Permissions']}
                                        targetKeys={targetKeys}
                                        selectedKeys={selectedKeys}
                                        onChange={onPermissionChange}
                                        onSelectChange={onPermissionSelectionChange}
                                        render={(item) => item.formatted_name}
                                        listStyle={{ height: 300, width: 300 }}
                                        showSearch
                                    />
                                </StyledEditFormItem>
                            </AddForm>
                        </>
                    )}
                </Modal>
            </UserGroupContainer>
        </div>
    );
}
export default ManageGroups;
