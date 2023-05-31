import React, {useState} from 'react';
import {Select, Button, Table} from 'antd';
import styled from 'styled-components';
import NavBar from '../../Dashboard/Navbar/index';
import Sidebar from "../../Dashboard/Sidebar";

const {Option} = Select;

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

const AddPermissionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const InputWrapper = styled.div`
  margin-right: 10px;
`;

const PermissionsTable = styled(Table)`
  margin-top: 20px;
`;

const Permissions = () => {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');
    const [permissions, setPermissions] = useState([]);

    const handleAddPermission = () => {
        if (userName && role) {
            const newPermission = {userName, role};
            setPermissions([...permissions, newPermission]);
            setUserName('');
            setRole('');
        }
    };

    const handleRemovePermission = (index) => {
        const updatedPermissions = permissions.filter((_, i) => i !== index);
        setPermissions(updatedPermissions);
    };

    const columns = [
        {title: 'User', dataIndex: 'userName', key: 'userName'},
        {title: 'Role', dataIndex: 'role', key: 'role'},
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (_, record, index) => (
                <Button type="link" onClick={() => handleRemovePermission(index)}>
                    Remove
                </Button>
            ),
        },
    ];

    const project = {
        name: 'Project Name',
        category: 'Project Setting',
    };

    const items = [
        {label: 'Project Member', value: 'Project Member'},
        {label: 'Project Manager', value: 'Project Manager'},
        {label: 'Project Viewer', value: 'Project Viewer'},
        {label: 'New Role', value: 'New Role'},
    ];

    const UserNames = [
        {label: 'Kaleem Shahzad', value: 'Kaleem Shahzadr'},
        {label: 'Talha Khan', value: 'Talha Khan'},
        {label: 'Usman IIam Din', value: 'Usman LLam Din'},
        {label: 'Asher Khan', value: 'Asher Khan'},
    ];

    return (
        <>
            <Sidebar project={project}/>
            <NavBar/>
            <PermissionsContainer>
                <Heading>Allowed Users</Heading>
                <AddPermissionContainer>
                    <InputWrapper>
                        <Select
                            value={userName}
                            options={UserNames}
                            style={{width: '190px'}}
                            onChange={(value) => setUserName(value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Select
                            value={role}
                            options={items}
                            style={{width: '190px'}}
                            onChange={(value) => setRole(value)}
                        />
                    </InputWrapper>
                    <Button type="primary" onClick={handleAddPermission}>
                        Add
                    </Button>
                </AddPermissionContainer>
                <PermissionsTable
                    dataSource={permissions}
                    columns={columns}
                    pagination={false}
                />
            </PermissionsContainer>
        </>
    );
};

export default Permissions;
