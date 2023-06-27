import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar/index";
import ProjectSidebar from "../../Dashboard/Sidebar/ProjectSidebar";
import {AiFillSlackCircle} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {IoNotificationsSharp, IoNotificationsOff} from 'react-icons/io5';
import apiRequest from '../../../Utils/apiRequest';
import { AuthContext } from '../../../Utils/AuthContext';
import {color} from "../../Dashboard/Sidebar/utils/styles";
import {ToastContainer, toast} from 'react-toastify';
import {Switch} from 'antd';
import {useParams} from "react-router-dom";


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
  margin-left: 60px;
  margin-top: -40px;
  font-size: 20px;
  width: 70px;
`;

const SwitchButtonWrapper = styled.div`
  margin-left: 135px;
  margin-top: -43px;
`;

const NotificationContainerForSlack = styled.div`
  margin-top: 25px;
  background-color: #EBEBEB;
  border-radius: 5px;
  height: 165px;
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

const Paragraph = styled.p`
  margin-left: 10px;
  font-size: 12px;
  color: #888;
  padding: 10px;
  font-family: "Helvetica Neue", sans-serif;
`;


function Notification() {

    const [slackAPIResponse, setSlackAPIResponse] = useState([]);
    const [gmailAPIResponse, setGmailAPIResponse] = useState([]);
    const [switchValueForSlack, setSwitchValueForSlack] = useState(false);
    const [switchValueForGmail, setSwitchValueForGmail] = useState(false);

    const { authToken } = useContext(AuthContext);

    const { projectId } = useParams();


    const handleAPIResponseData = (response) => {
        console.log(response.data);
        const responseData = response.data.map((item) => {
                    const {id, project, slack_notification_status, slack_webhook_url} = item;
                    return {id, project, slack_notification_status, slack_webhook_url};
                }
            );
        if (responseData.length > 0) {
            const { slack_notification_status } = responseData[0];
            setSwitchValueForSlack(slack_notification_status);
        }
        setSlackAPIResponse(responseData);
    }

    useEffect(() => {
    apiRequest
        .get(`/api/project_slack_webhook/`,
            {
                params: {
                    project: projectId,
            }, headers: {
                    "Authorization": `Token ${authToken}`
                }
            } )
        .then(response => {
            if(response.status === 200) {
                handleAPIResponseData(response);
            }

        })
        .catch(error => {
            console.log(error)
        });
    }, [switchValueForSlack, switchValueForGmail]);


    const handleSwitchChangeForSlack = (checked) => {
        if (checked === true) {
            toast.success(<><IoNotificationsSharp/> Slack Notification is enabled</>, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error(<><IoNotificationsOff/> Slack Notification is disabled </>, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (slackAPIResponse.length > 0) {
            const { id, slack_webhook_url, project } = slackAPIResponse[0];
            const updatedData = {
                id: id,
                slack_notification_status: switchValueForSlack,
                slack_webhook_url: slack_webhook_url,
                project: project,
            };
            apiRequest
            .put(`/api/project_slack_webhook/`, {
                updatedData
            },{
                headers:{ "Authorization": `Token ${authToken}` }
            } )
            .then(response => {
            if(response.status === 200) {
                handleAPIResponseData(response);
            }
            })
            .catch(error => {
                console.log(error)
            });
        }

        setSwitchValueForSlack(checked);
    };

    const handleSwitchChangeForGmail = (checked) => {
        if (checked === true) {
            toast.success(<><IoNotificationsSharp/> Gmail Notification is enabled</>, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error(<><IoNotificationsOff/> Gmail Notification is disabled </>, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        setSwitchValueForGmail(checked);
    };


    return (
        <div>
            <PageContainer>
                <ProjectSidebar/>
                <NavBar/>
                <ContentWrapper>
                    <HeadingWrapper>
                        <SummaryHeading>Notification</SummaryHeading>
                    </HeadingWrapper>

                    <Divider/>

                   <NotificationContainerForSlack>
                                    <NotificationWrapper>
                                        <InnerNotificationWrapper>
                                            <HeadingWrapper>
                                                <SubHeadingForNotificationMethods>Notification
                                                    Method</SubHeadingForNotificationMethods>
                                            </HeadingWrapper>

                                            <HeadingWrapper>
                                                <IconWrapperDiv>
                                                    <AiFillSlackCircle fontSize={"28px"}/>
                                                </IconWrapperDiv>
                                                <IconName>Slack</IconName>
                                                <SwitchButtonWrapper><Switch checked={switchValueForSlack}
                                                                             onChange={handleSwitchChangeForSlack}/></SwitchButtonWrapper>
                                            </HeadingWrapper>
                                            <HeadingWrapper>
                                                <IconWrapperDiv>
                                                    <FcGoogle fontSize={"28px"}/>
                                                </IconWrapperDiv>
                                                <IconName>Gmail</IconName>
                                                <SwitchButtonWrapper><Switch checked={switchValueForGmail}
                                                                             onChange={handleSwitchChangeForGmail}/></SwitchButtonWrapper>
                                            </HeadingWrapper>
                                            <Paragraph></Paragraph>
                                        </InnerNotificationWrapper>
                                    </NotificationWrapper>
                                </NotificationContainerForSlack>


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

export default Notification;





