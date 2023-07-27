import React, {useEffect, useState} from 'react';
import * as GlobalIntegrationsComponents from './GlobalIntegrationsStyle';
import NavBar from "../../Dashboard/Navbar/index";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import {AiFillSlackCircle} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {Input, Button, Form, Switch} from 'antd';
import apiRequest from '../../../Utils/apiRequest';
import ToastContainer from '../../../Shared/Components/Toast';
import {displayErrorMessage, displaySuccessMessage, displayInfoMessage} from '../../../Shared/notify';

function GlobalIntegrations() {

    const [slackForm] = Form.useForm();

    const [isSlackUpdating, setSlackIsUpdating] = useState(false);
    const [isSMTPUpdating, setSMTPIsUpdating] = useState(false);
    const [slackConfigId, setSlackConfigId] = useState(null);

    let authToken = localStorage.getItem('auth_token');

    const updateSlackIntegrationForm = (response) => {
        let responseData;
        if(response.data.length === 0){
            setSlackConfigId(null);
            setSlackIsUpdating(false);
            return;
        }
        if (typeof response.data === 'object') {
            responseData = response.data;
        }
        if (Array.isArray(response.data)) {
            responseData = response.data[0];
        }
        const {id, webhook_url, webhook_channel, global_status} = responseData;
        setSlackIsUpdating(true);
        setSlackConfigId(id);

        slackForm.setFieldsValue({
            slackChannelGroupUser : webhook_channel,
            slackNotificationStatus : global_status,
            slackWebhookUrl : webhook_url,
        });
    }


    const fetchGlobalSlackConfig = async () => {
        return await apiRequest.get(`/api/global_slack_webhook/`, {
            headers: { "Authorization": `Token ${authToken}` }
        })
    }

    const createSlackIntegrationsData = async (values) => {
        const {slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl} = values
        return await apiRequest
            .post(`/api/global_slack_webhook/`, {
                global_status: slackNotificationStatus,
                webhook_channel: slackChannelGroupUser,
                webhook_url: slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
    }


    const patchSlackIntegrationsData = async (values) => {
        const {slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl} = values
        return await apiRequest
            .patch(`/api/global_slack_webhook/${slackConfigId}/`, {
                global_status : slackNotificationStatus,
                webhook_channel : slackChannelGroupUser,
                webhook_url : slackWebhookUrl,
            }, {
                headers:
                    {"Authorization": `Token ${authToken}`}
            })
    }

    useEffect(() => {
        fetchGlobalSlackConfig()
            .then( response => { updateSlackIntegrationForm(response) } )
            .catch( error => { displayErrorMessage(error.message) })
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
                .then( response => {
                    displaySuccessMessage(`Successfully Save the Slack Configurations`);
                    updateSlackIntegrationForm(response);
                })
                .catch(error => {
                    displayErrorMessage(error.message)
            });
        }

    };

    const validateUrl = (rule, value, callback) => {
    if (value) {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(value)) {
            callback('Please enter a valid URL.');
        }
    }
    callback();
    };

    return (
        <div>
            <GlobalIntegrationsComponents.PageContainer>
                <UserSidebar/>
                <NavBar/>
                <ToastContainer/>
                <GlobalIntegrationsComponents.ContentWrapper>
                    <GlobalIntegrationsComponents.HeadingWrapper>
                        <GlobalIntegrationsComponents.SummaryHeading>Global Integration with third-party services</GlobalIntegrationsComponents.SummaryHeading>
                    </GlobalIntegrationsComponents.HeadingWrapper>
                    <GlobalIntegrationsComponents.Divider/>
                    <GlobalIntegrationsComponents.NotificationContainerForSlack>
                        <GlobalIntegrationsComponents.NotificationWrapper>
                            <GlobalIntegrationsComponents.InnerNotificationWrapper>
                                <GlobalIntegrationsComponents.HeadingWrapper>
                                    <GlobalIntegrationsComponents.IconWrapperDiv>
                                        <AiFillSlackCircle fontSize={"28px"}/>
                                    </GlobalIntegrationsComponents.IconWrapperDiv>
                                    <GlobalIntegrationsComponents.IconName>Slack Configuration</GlobalIntegrationsComponents.IconName>
                                    <GlobalIntegrationsComponents.FormWrapper>
                                        <Form layout="vertical" form={slackForm} onFinish={handleSlackSaveOrUpdateForm}>
                                            <Form.Item
                                                name="slackWebhookUrl"
                                                label="Webhook URL"
                                                rules={[
                                                    {required: true, message: 'Please enter the webhook URL'},
                                                    { validator: validateUrl }
                                                ]}
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
                                            { isSlackUpdating ?
                                                <Form.Item>
                                                    <Button type="primary" htmlType="update">Update</Button>
                                                </Form.Item> :
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Save</Button>
                                                </Form.Item>
                                            }
                                        </Form>
                                    </GlobalIntegrationsComponents.FormWrapper>
                                </GlobalIntegrationsComponents.HeadingWrapper>
                            </GlobalIntegrationsComponents.InnerNotificationWrapper>
                        </GlobalIntegrationsComponents.NotificationWrapper>
                    </GlobalIntegrationsComponents.NotificationContainerForSlack>
                    <GlobalIntegrationsComponents.NotificationContainerForGmail>
                        <GlobalIntegrationsComponents.NotificationWrapper>
                            <GlobalIntegrationsComponents.InnerNotificationWrapper>
                                <GlobalIntegrationsComponents.HeadingWrapper>
                                    <GlobalIntegrationsComponents.IconWrapperDiv>
                                        <FcGoogle fontSize={"28px"}/>
                                    </GlobalIntegrationsComponents.IconWrapperDiv>
                                    <GlobalIntegrationsComponents.IconName>Gmail Configuration</GlobalIntegrationsComponents.IconName>
                                    <GlobalIntegrationsComponents.FormWrapper>
                                        <Form layout="vertical" onFinish={() => (displayInfoMessage(<><FcGoogle/> Gmail SMTP is Integrated</>))}>
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
                                            <GlobalIntegrationsComponents.ParagraphNote>Please enter security protocol SSL or TLS </GlobalIntegrationsComponents.ParagraphNote>
                                            <GlobalIntegrationsComponents.StyledStatusDev>
                                                <Form.Item
                                                    name="SMPTNotificationStatus"
                                                    label="Enable"
                                                    valuePropName="checked"
                                                    style={{ marginRight: '16px' }}
                                                >
                                                    <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                                </Form.Item>
                                                <Form.Item
                                                    name="SMPTGlobalNotificationStatus"
                                                    label="Use Global Setting"
                                                    valuePropName="checked"
                                                    style={{ marginLeft: '16px' }}
                                                >
                                                    <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                                </Form.Item>
                                            </GlobalIntegrationsComponents.StyledStatusDev>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit"
                                                        onClick={() => setSMTPIsUpdating(false)}>Save</Button>
                                            </Form.Item>
                                            <GlobalIntegrationsComponents.StyledFormItem>
                                                <Button type="primary" htmlType="update"
                                                        onClick={() => setSMTPIsUpdating(true)}>Update</Button>
                                            </GlobalIntegrationsComponents.StyledFormItem>
                                        </Form>
                                    </GlobalIntegrationsComponents.FormWrapper>
                                </GlobalIntegrationsComponents.HeadingWrapper>
                            </GlobalIntegrationsComponents.InnerNotificationWrapper>
                        </GlobalIntegrationsComponents.NotificationWrapper>
                    </GlobalIntegrationsComponents.NotificationContainerForGmail>
                </GlobalIntegrationsComponents.ContentWrapper>
            </GlobalIntegrationsComponents.PageContainer>
        </div>
    );
}

export default GlobalIntegrations;