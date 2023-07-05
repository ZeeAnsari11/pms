import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import NavBar from '../../Dashboard/Navbar/index';
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import apiRequest from '../../../Utils/apiRequest';

import { toast, ToastContainer } from "react-toastify";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import { useParams } from "react-router-dom";
import { StatusCodes } from "http-status-codes";
import { AxiosError } from "axios";


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


const PermissionsTable = styled(Table)`
    margin-top: 20px;
`;

const CustomButton = styled(Button)`
    background-color: rgb(30, 100, 209);
    margin-top: 5px;
    margin-left: 10px;
`;



const Permissions = () => {
    const [userName, setUserName] = useState([]);
    const [userNameList, setUserNameList] = useState([]);
    const [userGroup, setUserGroup] = useState([]);
    const [userGroupList, setUserGroupList] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    let authToken = localStorage.getItem('auth_token');

    const { projectId } = useParams();

        const fetchUserGroupsList = () => {
        apiRequest
            .get(`/api/user_groups/`,
                {
                    headers: { "Authorization": `Token ${authToken}` }
                } )
            .then(response => {
                if(response.data){
                    const prepareResponse = response.data.map(data => {
                    return { value: data.id, label: data.name };
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
                    headers: { "Authorization": `Token ${authToken}` }
                } )
            .then(response =>{
                if(response.data){
                    const prepareResponse = response.data.map(data => {
                        return { value: data.id, label: data.username };
                    });
                    setUserNameList(prepareResponse)
                }
            })
            .then(error => {
                displayErrorMessage(error)
            })
    }

    const fetchProjectMembershipList = () => {
        if (projectId !== undefined){
            apiRequest
                .get( `api/project_memberships`,
                    {
                        params:
                            { project: projectId },
                        headers:
                            { "Authorization": `Token ${ authToken }` }
            } ).then( response =>  {
                console.log(response);
                if(response.status === StatusCodes.OK){
                    const result = response.data.map( data => {
                        const { user, group } = data;
                        const userName = { value: user.id.toString(), label: user.username };
                        const userGroup = { value: group.id.toString(), label: group.name };
                            return { key:data.id , userName, userGroup };
                    } )
                    setPermissions(result);
                }
            }
            )
        }
    }

    const deleteFromProjectMembershipList = (index) => {
        const id = permissions[index].key;
        apiRequest
            .delete( `api/project_memberships/${ id }`,
                {
                    headers:
                        { "Authorization": `Token ${ authToken }` }
                } )
            .then( response => {
                const updatedPermissions = [ ...permissions ];
                displaySuccessMessage( `Successfully delete the project permission.` )
                updatedPermissions.splice( index, 1 );
                setPermissions( updatedPermissions );
            } )
            .catch( error => {
                displayErrorMessage( error.message )
            } )
        }

    const addIntoProjectMembershipList = (userName, userGroup) => {
        apiRequest
            .post( 'api/project_memberships/',
                {
                    "user": userName.value,
                    "project": projectId,
                    "group": userGroup.value
                },
                {
                    headers:
                        { "Authorization": `Token ${ authToken }` }
                } )
            .then( response => {
                if(response.status === StatusCodes.CREATED){
                    console.log('Response',response.data.id);
                    const newPermission = { key:response.data.id , userName, userGroup };
                    setPermissions( [ ...permissions, newPermission ] );
                }
            })
            .catch(error => {
                if(error.response.status === StatusCodes.BAD_REQUEST){
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

    const displayErrorMessage = (message) => {
        toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

    const displaySuccessMessage = (message) => {
        toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

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

    useEffect( () => {
        fetchUserList();
        fetchUserGroupsList();
        fetchProjectMembershipList()
    }, [] );

    useEffect( () => {
        const result = permissions.map(permission => ({
                key: permission.key,
                userName: permission.userName,
                userGroup: permission.userGroup,
        }));
        console.log('result array of table', result);
        setDataSource(result);
    }, [ permissions ] );


    return (
        <>
            <ProjectSidebar/>
            <NavBar/>
            <PermissionsContainer>
                <Heading>Allowed Users</Heading>
                <AddPermissionContainer>
                    <GenericSelectField
                        onSelectChange={handleUserName}
                        options={userNameList}
                        isMultiple={false}
                        placeholder={"Select User Name"}
                        width="25%"/>
                    <GenericSelectField
                        onSelectChange={handleUserGroup}
                        options={userGroupList}
                        isMultiple={false}
                        placeholder={"Select User Group"}
                        width="25%"/>
                    <CustomButton type="primary" onClick={handleAddPermission}>
                        Add
                    </CustomButton>
                </AddPermissionContainer>
                <PermissionsTable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
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
        </>
    );
};

export default Permissions;
