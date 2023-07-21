import React, {useEffect, useState} from 'react';
import * as IntegrationsComponents from './Style';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiFillSlackCircle} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {Input, Button, Form, Switch} from 'antd';
import {useParams} from "react-router-dom";
import apiRequest from '../../../Utils/apiRequest';
import ToastContainer from '../../../Shared/Components/Toast';
import {displayErrorMessage, displaySuccessMessage, displayInfoMessage} from '../../../Shared/notify';

function Integrations() {

    const [slackForm] = Form.useForm();
    const {projectId} = useParams();
    const [isSlackUpdating, setSlackIsUpdating] = useState(false);
    const [isSMTPUpdating, setSMTPIsUpdating] = useState(false);
    const [initialSlackValues, setInitialSlackValues] = useState({id: undefined, project: projectId});

    let authToken = localStorage.getItem('auth_token');

    const updateSlackIntegrationForm = (response) => {
        if (response.status === 200) {
            displaySuccessMessage(<><AiFillSlackCircle/> Slack Webhook is Integrated</>);
            let responseData;
            responseData = response.data;
            if (typeof responseData === 'object') {
                responseData = response.data;
            }
            if (Array.isArray(response.data)) {
                responseData = response.data[0];
            }
            const {id, project, slack_notification_status, slack_webhook_url, slack_webhook_channel} = responseData;
            setInitialSlackValues({
                id: id,
                project: project,
            });
            slackForm.setFieldsValue({
                slackChannelGroupUser: slack_webhook_channel,
                slackNotificationStatus: slack_notification_status,
                slackWebhookUrl: slack_webhook_url,
            });
        }
    }


    const fetchSlackIntegrationsData = () => {
        apiRequest
            .get(`/api/project_slack_webhook/`,
                {
                    params: {
                        project: projectId,
                    }, headers: {
                        "Authorization": `Token ${authToken}`
                    }
                })
            .then(response => {
                updateSlackIntegrationForm(response);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const createSlackIntegrationsData = (values) => {
        const {slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl} = values
        apiRequest
            .post(`/api/project_slack_webhook/`, {
                project: projectId,
                slack_notification_status: slackNotificationStatus,
                slack_webhook_channel: slackChannelGroupUser,
                slack_webhook_url: slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
            .then(response => {
                updateSlackIntegrationForm(response);
            })
            .catch(error => {
                console.error(error)
            });
    }


    const patchSlackIntegrationsData = (values) => {
        const {id} = initialSlackValues
        if (id === undefined) {
            displayErrorMessage(`Please save the configuration first!'`);
            return;
        }
        const {slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl} = values
        apiRequest
            .patch(`/api/project_slack_webhook/${id}/`, {
                project: projectId,
                slack_notification_status: slackNotificationStatus,
                slack_webhook_channel: slackChannelGroupUser,
                slack_webhook_url: slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
            .then(response => {
                console.info('response is here', response);
                updateSlackIntegrationForm(response);
            })
            .catch(error => {
                console.error(error)
            });
    }

    useEffect(() => {
        if (projectId !== undefined) {
            fetchSlackIntegrationsData();
        }
    }, []);

    const handleSlackSaveOrUpdateForm = (values) => {
        const {id} = initialSlackValues;
        if (isSlackUpdating) {
            patchSlackIntegrationsData(values)
        } else {
            createSlackIntegrationsData(values);
        }

    };


    return (
        <div>
            <IntegrationsComponents.PageContainer>
                <ProjectSidebar/>
                <NavBar/>
                <ToastContainer></ToastContainer>
                <IntegrationsComponents.ContentWrapper>
                    <IntegrationsComponents.HeadingWrapper>
                        <IntegrationsComponents.SummaryHeading>Integrations</IntegrationsComponents.SummaryHeading>
                    </IntegrationsComponents.HeadingWrapper>
                    <IntegrationsComponents.Divider/>
                    <IntegrationsComponents.NotificationContainerForSlack>
                        <IntegrationsComponents.NotificationWrapper>
                            <IntegrationsComponents.InnerNotificationWrapper>
                                <IntegrationsComponents.HeadingWrapper>
                                    <IntegrationsComponents.SubHeadingForNotificationMethods>Integration
                                        Method</IntegrationsComponents.SubHeadingForNotificationMethods>
                                </IntegrationsComponents.HeadingWrapper>

                                <IntegrationsComponents.HeadingWrapper>
                                    <IntegrationsComponents.IconWrapperDiv>
                                        <AiFillSlackCircle fontSize={"28px"}/>
                                    </IntegrationsComponents.IconWrapperDiv>
                                    <IntegrationsComponents.IconName>Slack Configuration</IntegrationsComponents.IconName>
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
                                            <Form.Item
                                                name="slackNotificationStatus"
                                                label="Enable"
                                                valuePropName="checked"
                                            >
                                                <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit"
                                                        onClick={() => setSlackIsUpdating(false)}>Save</Button>
                                            </Form.Item>
                                            <IntegrationsComponents.StyledFormItem>
                                                <Button type="primary" htmlType="update"
                                                        onClick={() => setSlackIsUpdating(true)}>Update</Button>
                                            </IntegrationsComponents.StyledFormItem>
                                        </Form>
                                    </IntegrationsComponents.FormWrapper>
                                </IntegrationsComponents.HeadingWrapper>
                            </IntegrationsComponents.InnerNotificationWrapper>
                        </IntegrationsComponents.NotificationWrapper>
                    </IntegrationsComponents.NotificationContainerForSlack>
                    <IntegrationsComponents.NotificationContainerForGmail>
                        <IntegrationsComponents.NotificationWrapper>
                            <IntegrationsComponents.InnerNotificationWrapper>
                                <IntegrationsComponents.HeadingWrapper>
                                    <IntegrationsComponents.SubHeadingForNotificationMethods>Integration
                                        Method</IntegrationsComponents.SubHeadingForNotificationMethods>
                                </IntegrationsComponents.HeadingWrapper>

                                <IntegrationsComponents.HeadingWrapper>
                                    <IntegrationsComponents.IconWrapperDiv>
                                        <FcGoogle fontSize={"28px"}/>
                                    </IntegrationsComponents.IconWrapperDiv>
                                    <IntegrationsComponents.IconName>Gmail Configuration</IntegrationsComponents.IconName>
                                    <IntegrationsComponents.FormWrapper>
                                        <Form layout="vertical" onFinish={displayInfoMessage(<><FcGoogle/> Gmail SMTP is Integrated</>)}>
                                            <Form.Item
                                                name="hostName"
                                                label="Hostname"
                                                rules={[{required: true, message: 'Please input a hostname!'}]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="port"
                                                label="Port"
                                                rules={[{required: true, message: 'Please input a port!'}]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="userName"
                                                label="Username"
                                                rules={[{required: true, message: 'Please input a username!'}]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[{required: true, message: 'Please input a password!'}]}
                                            ><Input.Password/>
                                            </Form.Item>
                                            <Form.Item
                                                name="securityProtocol"
                                                label="Security protocol"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select a security protocol!',
                                                        validator: (rule, value) => {
                                                            const pattern = /^(SSL|TLS)$/i;
                                                            if (!value || pattern.test(value)) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject('Please enter a valid security protocol (SSL or TLS)');
                                                        },
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <IntegrationsComponents.ParagraphNote>Please enter security protocol SSL or TLS </IntegrationsComponents.ParagraphNote>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit"
                                                        onClick={() => setSMTPIsUpdating(false)}>Save</Button>
                                            </Form.Item>
                                            <IntegrationsComponents.StyledFormItem>
                                                <Button type="primary" htmlType="update"
                                                        onClick={() => setSMTPIsUpdating(true)}>Update</Button>
                                            </IntegrationsComponents.StyledFormItem>
                                        </Form>
                                    </IntegrationsComponents.FormWrapper>
                                </IntegrationsComponents.HeadingWrapper>
                            </IntegrationsComponents.InnerNotificationWrapper>
                        </IntegrationsComponents.NotificationWrapper>
                    </IntegrationsComponents.NotificationContainerForGmail>
                </IntegrationsComponents.ContentWrapper>
            </IntegrationsComponents.PageContainer>
        </div>
    );
}

export default Integrations;





