import React, {useEffect, useState} from 'react';
import * as IntegrationsComponents from './Style';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiFillSlackCircle} from 'react-icons/ai';
import {Input, Button, Form, Switch} from 'antd';
import {useParams} from "react-router-dom";
import apiRequest from '../../../Utils/apiRequest';
import ToastContainer from '../../../Shared/Components/Toast';
import {displayErrorMessage, displaySuccessMessage} from '../../../Shared/notify';
import {useSelector} from "react-redux";
import ErrorPage from "../../Error/ErrorPage";

function Integrations() {

    const [slackForm] = Form.useForm();
    const {projectId} = useParams();

    const [isSlackUpdating, setSlackIsUpdating] = useState(false);
    const [initialSlackValues, setInitialSlackValues] = useState({id: undefined, project: projectId});

    let authToken = localStorage.getItem('auth_token');
    const currentUserProfileData = useSelector((state) => state.DataSyncer.userProfileData);
    const IsAdminOrStaffUser = currentUserProfileData?.user?.is_staff || currentUserProfileData?.user?.is_superuser

    const updateSlackIntegrationForm = (response) => {
        let responseData;
        if (response.data.length === 0) {
            setInitialSlackValues({
                id: undefined,
                project: projectId,
            });
            setSlackIsUpdating(false);
            return;
        }
        if (typeof response.data === 'object') {
            responseData = response.data;
        }
        if (Array.isArray(response.data)) {
            responseData = response.data[0];
        }
        const {id, project, is_active, global_status, webhook_url, webhook_channel} = responseData;
        setInitialSlackValues({
            id: id,
            project: project,
        });
        setSlackIsUpdating(true);
        slackForm.setFieldsValue({
            slackChannelGroupUser: webhook_channel,
            slackNotificationStatus: is_active,
            slackWebhookUrl: webhook_url,
            slackGlobalConfigStatus: global_status
        });
    }


    const fetchSlackIntegrationsData = async () => {
        return await apiRequest.get(`/api/project_slack_webhook/`, {
            params: {project: projectId,},
            headers: {"Authorization": `Token ${authToken}`}
        })
    }

    const createSlackIntegrationsData = async (values) => {
        const {slackNotificationStatus, slackGlobalConfigStatus, slackChannelGroupUser, slackWebhookUrl} = values
        return await apiRequest
            .post(`/api/project_slack_webhook/`, {
                project: projectId,
                is_active: slackNotificationStatus,
                global_status: slackGlobalConfigStatus,
                webhook_channel: slackChannelGroupUser,
                webhook_url: slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
    }


    const patchSlackIntegrationsData = async (values) => {
        const {id} = initialSlackValues
        const {slackNotificationStatus, slackGlobalConfigStatus, slackChannelGroupUser, slackWebhookUrl} = values
        return await apiRequest
            .patch(`/api/project_slack_webhook/${id}/`, {
                project: projectId,
                is_active: slackNotificationStatus,
                global_status: slackGlobalConfigStatus,
                webhook_channel: slackChannelGroupUser,
                webhook_url: slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
    }

    useEffect(() => {
        if (projectId !== undefined) {
            fetchSlackIntegrationsData()
                .then(response => {
                    updateSlackIntegrationForm(response)
                })
                .catch(error => {
                    displayErrorMessage(error.message)
                })
        }
    }, []);

    const handleSlackSaveOrUpdateForm = (values) => {
        if (isSlackUpdating) {
            patchSlackIntegrationsData(values)
                .then(response => {
                    displaySuccessMessage(`Successfully update the Slack Configurations`);
                    updateSlackIntegrationForm(response);
                })
                .catch(error => {
                    displayErrorMessage(error.message)
                })
        } else {
            createSlackIntegrationsData(values)
                .then(response => {
                    displaySuccessMessage(`Successfully Save the Slack Configurations`);
                    updateSlackIntegrationForm(response);
                })
                .catch(error => {
                    displayErrorMessage(error.message)
                });
        }

    };
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
        <div>
            <IntegrationsComponents.PageContainer>
                <ProjectSidebar/>
                <NavBar/>
                <ToastContainer/>
                <IntegrationsComponents.ContentWrapper>
                    <IntegrationsComponents.HeadingWrapper>
                        <IntegrationsComponents.SummaryHeading>Integration with third-party
                            services</IntegrationsComponents.SummaryHeading>
                    </IntegrationsComponents.HeadingWrapper>
                    <IntegrationsComponents.Divider/>
                    <IntegrationsComponents.NotificationContainerForSlack>
                        <IntegrationsComponents.NotificationWrapper>
                            <IntegrationsComponents.InnerNotificationWrapper>
                                <IntegrationsComponents.HeadingWrapper>
                                    <IntegrationsComponents.IconWrapperDiv>
                                        <AiFillSlackCircle fontSize={"28px"}/>
                                    </IntegrationsComponents.IconWrapperDiv>
                                    <IntegrationsComponents.IconName>Slack
                                        Configuration</IntegrationsComponents.IconName>
                                    <IntegrationsComponents.FormWrapper>
                                        <Form layout="vertical" form={slackForm} onFinish={handleSlackSaveOrUpdateForm}>
                                            <Form.Item
                                                name="slackWebhookUrl"
                                                label="Webhook URL"
                                                rules={[{required: true, message: 'Please enter the webhook URL'}]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="slackChannelGroupUser"
                                                label="Channel/Group/User"
                                                rules={[{
                                                    required: false,
                                                    message: 'Please enter the Channel/Group/User'
                                                }]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <IntegrationsComponents.StyledStatusDev>
                                                <Form.Item
                                                    name="slackNotificationStatus"
                                                    label="Enable"
                                                    valuePropName="checked"
                                                    style={{marginRight: '16px'}}
                                                >
                                                    <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                                </Form.Item>
                                                <Form.Item
                                                    name="slackGlobalConfigStatus"
                                                    label="Use Global Setting"
                                                    valuePropName="checked"
                                                    style={{marginLeft: '16px'}}
                                                >
                                                    <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                                </Form.Item>
                                            </IntegrationsComponents.StyledStatusDev>
                                            {isSlackUpdating ?
                                                <Form.Item>
                                                    <Button type="primary" htmlType="update">Update</Button>
                                                </Form.Item> :
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Save</Button>
                                                </Form.Item>
                                            }
                                        </Form>
                                    </IntegrationsComponents.FormWrapper>
                                </IntegrationsComponents.HeadingWrapper>
                            </IntegrationsComponents.InnerNotificationWrapper>
                        </IntegrationsComponents.NotificationWrapper>
                    </IntegrationsComponents.NotificationContainerForSlack>
                </IntegrationsComponents.ContentWrapper>
            </IntegrationsComponents.PageContainer>
        </div>
    );
}

export default Integrations;





