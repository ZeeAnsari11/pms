import React from 'react';
import styled from 'styled-components';
import NavBar from "../../Dashboard/Navbar";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import {Link} from 'react-router-dom';
import Selector from "../../../Shared/Components/Select";


const PersonalSetting = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  padding: 40px 20% 0 14%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 20px 0;
`;

const Details = styled.h1`
  margin: 0;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 60%;
  //padding-bottom: 5px;
`;

const CardInfoBoxTitle = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
`;

const TaskList = styled.div`
  margin: 8px 0 15px;
`;

const ConfigureMessage = styled.p`
  margin-top: -5px;
  font-size: 0.9rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: -5px;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 7px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;


const SaveButton = styled.button`
  background-color: #0062FF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: fit-content;
  margin-bottom: 15px;

  &:hover {
    background-color: #3e81ed;
  }
`;

const issues = [
    {value: 'option1', label: 'Enabled'},
    {value: 'option2', label: 'Disabled'},
    {value: 'option3', label: 'Inherit from global settings'},
];

const homepage = [
    {value: 'option1', label: 'Your work'},
    {value: 'option2', label: 'Projects directory'},
    {value: 'option3', label: 'Dashboards'},
];

const email = [
    {value: 'option1', label: 'Send me email notifications'},
    {value: 'option2', label: 'Do not send me email notifications'},
];

const notificationFormat = [
    {value: 'option1', label: 'HTML'},
    {value: 'option2', label: 'Text'},
];

function ProjectSettingPage() {

    return (
        <PersonalSetting>
            <NavBar/>
            <PageWrapper>
                <Header>
                    <Details>Personal Settings</Details>
                </Header>
                <FormWrapper>
                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Your time zone
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"Asia/Karachi"}
                            isDisabled={true}/>
                    </TaskList>
                </CardInfoBox>
                <ConfigureMessage>Configure your timezone settings in your <Link to="/profile">profile settings
                    page</Link></ConfigureMessage>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Language
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"English (United Kingdom)"}
                            isDisabled={true}/>
                    </TaskList>
                </CardInfoBox>
                <ConfigureMessage>Configure your language settings in your <Link to="/profile">profile settings
                    page</Link></ConfigureMessage>


                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Watch your issues
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"Inherit from global settings"}/>
                    </TaskList>
                </CardInfoBox>
                <ConfigureMessage>If you select enabled, you will automatically 'watch' the issues you interact
                    with.</ConfigureMessage>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Your Jira homepage
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={homepage}
                            isMultiple={false}
                            defaultValue={"Your work"}/>
                    </TaskList>
                </CardInfoBox>
                <ConfigureMessage>You'll see this page when you log in or select the Jira logo.</ConfigureMessage>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Email notification for issue activity
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={email}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={"Send me email notifications"}/>
                    </TaskList>
                    <ConfigureMessage>Get email updates for issue activity when:</ConfigureMessage>
                    <CheckboxWrapper>
                        <CheckboxLabel htmlFor="watching">
                            <input type="checkbox" defaultChecked={true} id="watching"/>
                            You're <strong>watching</strong> the issue
                        </CheckboxLabel>

                        <CheckboxLabel htmlFor="reporter">
                            <input type="checkbox" defaultChecked={true} id="reporter"/>
                            You're the <strong>reporter</strong>
                        </CheckboxLabel>

                        <CheckboxLabel htmlFor="assignee">
                            <input type="checkbox" defaultChecked={true} id="assignee"/>
                            You're the <strong>assignee</strong> for the issue
                        </CheckboxLabel>

                        <CheckboxLabel htmlFor="mention">
                            <input type="checkbox" defaultChecked={true} id="mention"/>
                            Someone <strong>mentions</strong> you
                        </CheckboxLabel>

                        <CheckboxLabel htmlFor="changes">
                            <input type="checkbox" id="changes"/>
                            You <strong>make changes</strong> to the issue
                        </CheckboxLabel>
                    </CheckboxWrapper>
                    <ConfigureMessage>You may also receive other email notifications like those configured by your Jira
                        admin and updates for filter subscriptions.</ConfigureMessage>
                    <ConfigureMessage><Link to="/profile">Learn more about email notifications</Link></ConfigureMessage>
                </CardInfoBox>

                <CardInfoBox>
                    <CardInfoBoxTitle>
                        Email notifications format
                    </CardInfoBoxTitle>
                    <TaskList>
                        <GenericSelectField
                            options={notificationFormat}
                            isMultiple={false}
                            defaultValue={"HTML"}/>
                    </TaskList>
                </CardInfoBox>
                <SaveButton>Save Changes</SaveButton>
            </FormWrapper>

            </PageWrapper>
        </PersonalSetting>
    );
}


export default ProjectSettingPage;