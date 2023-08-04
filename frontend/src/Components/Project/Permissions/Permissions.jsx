import React, {useEffect, useState} from 'react';
import {Avatar, Button, Select} from 'antd';
import * as PermissionsComponents from './Style';
import NavBar from '../../Dashboard/Navbar/index';
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import apiRequest from '../../../Utils/apiRequest';
import Toast from "../../../Shared/Components/Toast"
import {displayErrorMessage, displaySuccessMessage} from "../../../Shared/notify"
import {useParams} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import ErrorPage from "../../Error/ErrorPage";
import {useIsAdminOrStaffUser} from "../../../Store/Selector/Selector";


const Permissions = () => {
    const [userName, setUserName] = useState([]);
    const [userNameList, setUserNameList] = useState([]);
    const [userGroup, setUserGroup] = useState([]);
    const [userGroupList, setUserGroupList] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    let authToken = localStorage.getItem('auth_token');

    const IsAdminOrStaffUser = useIsAdminOrStaffUser();

    const {Option} = Select;

    const {projectId} = useParams();

    const fetchUserGroupsList = () => {
        apiRequest
            .get(`/api/user_groups/`,
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                if (response.data) {
                    const prepareResponse = response.data.map(data => {
                        return {value: data.id, label: data.name};
                    });
                    setUserGroupList(prepareResponse)
                }
            })
            .catch(error => {
                displayErrorMessage(error)
            })
    }

    const fetchUserList = () => {
        apiRequest
            .get(`/api/users_list/`,
                {
                    headers: {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                if (response.data) {
                    const prepareResponse = response.data.map(data => {
                        return {value: data.id, label: data.username, iconUrl: data.userprofile?.image};
                    });
                    setUserNameList(prepareResponse)
                }
            })
            .then(error => {
                displayErrorMessage(error)
            })
    }

    const fetchProjectMembershipList = () => {
        if (projectId !== undefined) {
            apiRequest
                .get(`api/project_memberships`,
                    {
                        params:
                            {project: projectId},
                        headers:
                            {"Authorization": `Token ${authToken}`}
                    }).then(response => {
                    console.log(response);
                    if (response.status === StatusCodes.OK) {
                        const result = response.data.map(data => {
                            const {user, group} = data;
                            const userName = {value: user.id.toString(), label: user.username};
                            const userGroup = {value: group.id.toString(), label: group.name};
                            return {key: data.id, userName, userGroup};
                        })
                        setPermissions(result);
                    }
                }
            )
        }
    }

    const deleteFromProjectMembershipList = (index) => {
        const id = permissions[index].key;
        apiRequest
            .delete(`api/project_memberships/${id}`,
                {
                    headers:
                        {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                displaySuccessMessage(`Successfully delete the project permission.`)
                const updatedPermissions = [...permissions];
                updatedPermissions.splice(index, 1);
                setPermissions(updatedPermissions);
            })
            .catch(error => {
                displayErrorMessage(error.message)
            })
    }

    const addIntoProjectMembershipList = (userName, userGroup) => {
        apiRequest
            .post('api/project_memberships/',
                {
                    "user": userName.value,
                    "project": projectId,
                    "group": userGroup.value
                },
                {
                    headers:
                        {"Authorization": `Token ${authToken}`}
                })
            .then(response => {
                if (response.status === StatusCodes.CREATED) {
                    console.log('Response', response.data.id);
                    const newPermission = {key: response.data.id, userName, userGroup};
                    setPermissions([...permissions, newPermission]);
                }
            })
            .catch(error => {
                if (error.response.status === StatusCodes.BAD_REQUEST) {
                    displayErrorMessage('Duplicate entries is not allowed!')
                }
            })
        ;
    }

    const handleAddPermission = () => {
        if (userName && userGroup) {
            addIntoProjectMembershipList(userName, userGroup);
        }
    };
    const handleRemovePermission = (index) => {
        deleteFromProjectMembershipList(index)
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => text.label
        }, {
            title: 'Group',
            dataIndex: 'userGroup',
            key: 'userGroup',
            render: (text) => text.label
        }, {
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

    const handleUserName = (value) => {
        // eslint-disable-next-line eqeqeq
        const foundUser = userNameList.find((userNameList) => userNameList.value == value);
        setUserName(foundUser)
    }

    const handleUserGroup = (value) => {
        // eslint-disable-next-line eqeqeq
        const foundGroup = userGroupList.find((userGroupList) => userGroupList.value == value);
        setUserGroup(foundGroup)
    }

    useEffect(() => {
        fetchUserList();
        fetchUserGroupsList();
        fetchProjectMembershipList()
    }, []);

    useEffect(() => {
        const result = permissions.map(permission => ({
            key: permission.key,
            userName: permission.userName,
            userGroup: permission.userGroup,
        }));
        console.log('result array of table', result);
        setDataSource(result);
    }, [permissions]);

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
        <>
            <ProjectSidebar/>
            <NavBar/>
            <Toast/>
            <PermissionsComponents.PermissionsContainer>
                <PermissionsComponents.Heading>Allowed Users</PermissionsComponents.Heading>
                <Select
                    showArrow
                    filterOption
                    onChange={handleUserName}
                    showSearch
                    optionFilterProp="label"
                    placeholder="Select User Name"
                    optionLabelProp="label"
                    style={{width: "25%", marginRight: "10px"}}
                >
                    {userNameList.map((item) => (
                        <Option key={item.value} value={item.value} label={item.label}>
                            {
                                item.iconUrl ?
                                    <div>
                                        <Avatar draggable={true} style={{background: "#10899e"}} alt={item.label}
                                                src={`${process.env.REACT_APP_HOST}/${item.iconUrl}`}/>{" "}
                                        {item.label}
                                    </div> :
                                    <div>
                                        <Avatar> {item.label}</Avatar> {" "}{item.label}
                                    </div>
                            }
                        </Option>
                    ))}
                </Select>
                <Select
                    showArrow
                    filterOption
                    showSearch
                    optionFilterProp="label"
                    onChange={handleUserGroup}
                    options={userGroupList}
                    placeholder={"Select User Group"}
                    style={{width: "25%", marginRight: "10px"}}
                />
                <PermissionsComponents.CustomButton type="primary" onClick={handleAddPermission}>
                    Add
                </PermissionsComponents.CustomButton>
                <PermissionsComponents.PermissionsTable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </PermissionsComponents.PermissionsContainer>
        </>
    );
};

export default Permissions;
