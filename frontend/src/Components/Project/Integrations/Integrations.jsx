import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import Sidebar from "../../Dashboard/Sidebar";
import { AiFillSlackCircle } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { color } from "../../Dashboard/Sidebar/utils/styles";
import { ToastContainer, toast } from 'react-toastify';
import { Input, Button, Form, Switch } from 'antd';
import { useParams } from "react-router-dom";
import apiRequest from '../../../Utils/apiRequest';
import { AuthContext } from '../../../Utils/AuthContext';


const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SummaryHeading = styled.p`
  font-size: 26px;
  color: black;
  margin-left: 40px;
  font-weight: bolder;
  margin-top: 70px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const SubHeadingForNotificationMethods = styled.p`
  margin-left: 10px;
  font-size: 16px;
  color: black;
  font-weight: bolder;
  width: 250px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  padding: 0px 20px 0px 20px;
  margin-left: 200px;
  margin-bottom: -10px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HeadingWrapper = styled.div`
  width: 100%;
`;

const IconWrapperDiv = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

const IconName = styled.p`
  margin-left: 43px;
  margin-top: -40px;
  font-size: 21px;
  width: 200px;
`;

const NotificationContainerForSlack = styled.div`
  margin-top: 25px;
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 335px;
  width: 100%;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

const NotificationContainerForGmail = styled.div`
  margin-top: 25px;
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 475px;
  width: 100%;
  box-shadow: var(--ds-shadow-raised, 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px 1px rgba(9, 30, 66, 0.13));

  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

const NotificationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

const StyledFormItem = styled( Form.Item )`
  float: right;
  margin-top: -56px;
  margin-right: 230px;
`;

const Divider = styled.div`
  margin-top: 17px;
  border-top: 1px solid ${color.borderLight};
`;

const InnerNotificationWrapper = styled.div`
  margin: 10px;
  border-radius: 5px;
  width: 98%;
  height: 80%;
`;

const FormWrapper = styled.div`
  height: 155px;
  width: 400px;
`;

const ParagraphNote = styled.p`
  font-size: 10px;
  margin-top: -25px;
  margin-left: 140px
`;

function Integrations() {

    const [ slackForm ] = Form.useForm();
    const { projectId } = useParams();
    const [ isSlackUpdating, setSlackIsUpdating ] = useState( false );
    const [ isSMTPUpdating, setSMTPIsUpdating ] = useState( false );
    const [ initialSlackValues, setInitialSlackValues ] = useState( { id: undefined, project: projectId } );

    const { authToken } = useContext(AuthContext);

    const updateSlackIntegrationForm = ( response ) => {
        if ( response.status === 200 ) {
            displaySuccessMessage();
            let responseData;
            responseData = response.data;
            if ( typeof responseData === 'object' ) {
                responseData = response.data;
            }
            if ( Array.isArray( response.data ) ) {
                responseData = response.data[ 0 ];
            }
            const { id, project, slack_notification_status, slack_webhook_url, slack_webhook_channel } = responseData;
            setInitialSlackValues( {
                id: id,
                project: project,
            } );
            slackForm.setFieldsValue( {
                slackChannelGroupUser: slack_webhook_channel,
                slackNotificationStatus: slack_notification_status,
                slackWebhookUrl: slack_webhook_url,
            } );
        }
    }


    const fetchSlackIntegrationsData = () => {
        apiRequest
            .get( `/api/project_slack_webhook/`,
                {
                    params: {
                        project: projectId,
                    }, headers: {
                        "Authorization": `Token ${authToken}`
                    }
                } )
            .then( response => {
                updateSlackIntegrationForm( response );
            } )
            .catch( error => {
                console.error( error )
            } );
    }

    const createSlackIntegrationsData = ( values ) => {
        const { slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl } = values
        apiRequest
            .post( `/api/project_slack_webhook/`, {
                project: projectId,
                slack_notification_status: slackNotificationStatus,
                slack_webhook_channel: slackChannelGroupUser,
                slack_webhook_url: slackWebhookUrl,
            } ,{
                headers:
                    { "Authorization": `Token ${authToken}` }
            } )
            .then( response => {
                updateSlackIntegrationForm( response );
            } )
            .catch( error => {
                console.error( error )
            } );
    }


    const patchSlackIntegrationsData = ( values ) => {
        const { id } = initialSlackValues
        if ( id === undefined ) {
            displayInfoMessage();
            return;
        }
        const { slackNotificationStatus, slackChannelGroupUser, slackWebhookUrl } = values
        apiRequest
            .patch( `/api/project_slack_webhook/${id}/`, {
                project: projectId,
                slack_notification_status: slackNotificationStatus,
                slack_webhook_channel: slackChannelGroupUser,
                slack_webhook_url: slackWebhookUrl,
            },{
                headers:
                    { "Authorization": `Token ${authToken}` }
            } )
            .then( response => {
                console.info( 'response is here', response );
                updateSlackIntegrationForm( response );
            } )
            .catch( error => {
                console.error( error )
            } );
    }

    const displayInfoMessage = () => {
        toast.info( 'Please save the configuration first!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        } );
    }

    const displaySuccessMessage = () => {
        toast.success( <><AiFillSlackCircle/> Slack Webhook is Integrated</>, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        } );
    }


    useEffect( () => {
        if ( projectId !== undefined ) {
            fetchSlackIntegrationsData();
        }
    }, [] );

    const items = [
        { icon: <><AiFillSlackCircle style={{ fontSize: '15px' }}/> </>, label: 'Slack', value: 'Slack' },
        { icon: <><FcGoogle/></>, label: 'Gmail', value: 'Gmail' },
    ];

    const project = {
        name: 'Project Name',
        category: 'Project Setting'
    };

    const handleSlackSaveOrUpdateForm = ( values ) => {
        const { id } = initialSlackValues;
        if ( isSlackUpdating ) {
            patchSlackIntegrationsData( values )
        } else {
            createSlackIntegrationsData( values );
        }

    };

    const handleGmailSaveOrUpdateForm = () => {
        toast.success( <><FcGoogle/> Gmail is Integrated</>, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        } );
    };


    return (
        <div>
            <PageContainer>
                <Sidebar project={project}/>
                <NavBar/>
                <ContentWrapper>
                    <HeadingWrapper>
                        <SummaryHeading>Integrations</SummaryHeading>
                    </HeadingWrapper>
                    <Divider/>
                    <NotificationContainerForSlack>
                        <NotificationWrapper>
                            <InnerNotificationWrapper>
                                <HeadingWrapper>
                                    <SubHeadingForNotificationMethods>Integration
                                        Method</SubHeadingForNotificationMethods>
                                </HeadingWrapper>

                                <HeadingWrapper>
                                    <IconWrapperDiv>
                                        <AiFillSlackCircle fontSize={"28px"}/>
                                    </IconWrapperDiv>
                                    <IconName>Slack Configuration</IconName>
                                    <FormWrapper>
                                        <Form form={slackForm} onFinish={handleSlackSaveOrUpdateForm}>
                                            <Form.Item
                                                name="slackWebhookUrl"
                                                label="Webhook URL"
                                                rules={[ { required: true, message: 'Please enter the webhook URL' } ]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="slackChannelGroupUser"
                                                label="Channel/Group/User"
                                                rules={[ {
                                                    required: false,
                                                    message: 'Please enter the Channel/Group/User'
                                                } ]}
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
                                                        onClick={() => setSlackIsUpdating( false )}>Save</Button>
                                            </Form.Item>
                                            <StyledFormItem>
                                                <Button type="primary" htmlType="update"
                                                        onClick={() => setSlackIsUpdating( true )}>Update</Button>
                                            </StyledFormItem>
                                        </Form>
                                    </FormWrapper>
                                </HeadingWrapper>
                            </InnerNotificationWrapper>
                        </NotificationWrapper>
                    </NotificationContainerForSlack>
                    <NotificationContainerForGmail>
                        <NotificationWrapper>
                            <InnerNotificationWrapper>
                                <HeadingWrapper>
                                    <SubHeadingForNotificationMethods>Integration
                                        Method</SubHeadingForNotificationMethods>
                                </HeadingWrapper>

                                <HeadingWrapper>
                                    <IconWrapperDiv>
                                        <FcGoogle fontSize={"28px"}/>
                                    </IconWrapperDiv>
                                    <IconName>Gmail Configuration</IconName>
                                    <FormWrapper>
                                        <Form onFinish={handleGmailSaveOrUpdateForm}>
                                            <Form.Item
                                                name="hostName"
                                                label="Hostname"
                                                rules={[ { required: true, message: 'Please input a hostname!' } ]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="port"
                                                label="Port"
                                                rules={[ { required: true, message: 'Please input a port!' } ]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="userName"
                                                label="Username"
                                                rules={[ { required: true, message: 'Please input a username!' } ]}
                                            ><Input/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[ { required: true, message: 'Please input a password!' } ]}
                                            ><Input.Password/>
                                            </Form.Item>
                                            <Form.Item
                                                name="securityProtocol"
                                                label="Security protocol"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select a security protocol!',
                                                        validator: ( rule, value ) => {
                                                            const pattern = /^(SSL|TLS)$/i;
                                                            if ( !value || pattern.test( value ) ) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject( 'Please enter a valid security protocol (SSL or TLS)' );
                                                        },
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <ParagraphNote>Please enter security protocol SSL or TLS </ParagraphNote>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit"
                                                        onClick={() => setSMTPIsUpdating( false )}>Save</Button>
                                            </Form.Item>
                                            <StyledFormItem>
                                                <Button type="primary" htmlType="update"
                                                        onClick={() => setSMTPIsUpdating( true )}>Update</Button>
                                            </StyledFormItem>
                                        </Form>
                                    </FormWrapper>
                                </HeadingWrapper>
                            </InnerNotificationWrapper>
                        </NotificationWrapper>
                    </NotificationContainerForGmail>
                </ContentWrapper>
            </PageContainer>
            <ToastContainer
                position="bottom-left"
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
        </div>
    );
}

export default Integrations;





