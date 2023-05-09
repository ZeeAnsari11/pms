import React, {useState} from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import Sidebar from "../../Project/Sidebar/index";
import GenericSelectField from '../../Dashboard/SelectFields/GenericSelectField';
import {AiFillSlackCircle} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {color} from "../../Dashboard/Sidebar/utils/styles";
import {ToastContainer, toast} from 'react-toastify';
import {Input, Button, Select, Form} from 'antd';



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

const SubHeading = styled.p`
  margin-left: 40px;
  font-size: 16px;
  color: black;
  font-weight: bolder;
  width: 250px;

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

const OptionWrapper = styled.div`
  width: 217px;
  margin-left: 281px;
  margin-top: -44px;
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
  height: 305px;
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

    const [selectedValues, setSelectedValues] = useState([]);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [channel, setChannel] = useState('');

    const handleSelect = (values) => {
        setSelectedValues(values);
    };

    const items = [
        {icon: <><AiFillSlackCircle style={{fontSize: '15px'}}/> </>, label: 'Slack', value: 'Slack'},
        {icon: <><FcGoogle/></>, label: 'Gmail', value: 'Gmail'},
    ];

    const project = {
        name: 'Project Name',
        category: 'Project Setting'
    };


    const handleWebhookUrlChange = (event) => {
        setWebhookUrl(event.target.value);
    };

    const handleChannelChange = (event) => {
        setChannel(event.target.value);
    };

    const handleSave = () => {
        // Do something with webhookUrl and channel values
        console.log(`Webhook URL: ${webhookUrl}, Channel: ${channel}`);
    };

    const onFinish = (values) => {
        toast.success(<><FcGoogle/> Gmail is Integrated</>, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
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

                    <HeadingWrapper>
                        <SubHeading>Integration methods option</SubHeading>
                        <OptionWrapper>
                            <GenericSelectField placeholder={<strong>Integration</strong>}
                                                isMultiple={true}
                                                options={items}
                                                width={"250px"}
                                                onSelect={handleSelect}
                            />
                        </OptionWrapper>
                    </HeadingWrapper>

                    <Divider/>

                    {selectedValues.map((selectedValue, index) => {
                        if (selectedValue === 'Slack') {
                            return (
                                <NotificationContainerForSlack key={index}>
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
                                                    <label style={{marginLeft: '10px'}}>Webhook URL:</label>
                                                    <Input style={{
                                                        marginTop: '10px',
                                                        marginBottom: '10px',
                                                        marginLeft: '5px'
                                                    }} value={webhookUrl} onChange={handleWebhookUrlChange}/>

                                                    <label style={{marginLeft: '10px'}}>Channel/Group/User
                                                        (optional):</label>
                                                    <Input style={{marginTop: '10px', marginLeft: '5px'}}
                                                           value={channel} onChange={handleChannelChange}/>

                                                    <Button style={{marginTop: '10px', marginLeft: '5px'}}
                                                            type="primary" onClick={handleSave}>Save</Button>

                                                </FormWrapper>
                                            </HeadingWrapper>
                                        </InnerNotificationWrapper>
                                    </NotificationWrapper>
                                </NotificationContainerForSlack>
                            );
                        } else if (selectedValue === 'Gmail') {
                            return (
                                <NotificationContainerForGmail key={index}>
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
                                                    <Form onFinish={onFinish}>
                                                        <Form.Item label="Hostname" name="hostname" rules={[{
                                                            required: true,
                                                            message: 'Please input a hostname!'
                                                        }]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item label="Port" name="port" rules={[{
                                                            required: true,
                                                            message: 'Please input a port!'
                                                        }]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item label="Username" name="username" rules={[{
                                                            required: true,
                                                            message: 'Please input a username!'
                                                        }]}>
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item label="Password" name="password" rules={[{
                                                            required: true,
                                                            message: 'Please input a password!'
                                                        }]}>
                                                            <Input.Password/>
                                                        </Form.Item>
                                                        <Form.Item label="Security protocol" name="securityProtocol"
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
                                                        <ParagraphNote>Please enter security protocol SSL or
                                                            TLS </ParagraphNote>

                                                        <Form.Item>
                                                            <Button type="primary" htmlType="submit">Save</Button>
                                                        </Form.Item>
                                                    </Form>
                                                </FormWrapper>
                                            </HeadingWrapper>
                                        </InnerNotificationWrapper>
                                    </NotificationWrapper>
                                </NotificationContainerForGmail>
                            );
                        }
                    })}
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





