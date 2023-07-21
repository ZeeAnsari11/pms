import React from 'react';
import * as GeneralSettingsComponents from './GeneralSettingsStyle';
import NavBar from "../../Dashboard/Navbar";
import UserSidebar from "../../Dashboard/Sidebar/UserSidebar";
import GenericSelectField from "../../Dashboard/SelectFields/GenericSelectField";
import {Link} from 'react-router-dom';


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

function GeneralSettings() {

    return (
        <GeneralSettingsComponents.PersonalSetting>
            <NavBar/>
            <UserSidebar/>
            <GeneralSettingsComponents.PageWrapper>
                <GeneralSettingsComponents.Header>
                    <GeneralSettingsComponents.Details>Personal Settings</GeneralSettingsComponents.Details>
                </GeneralSettingsComponents.Header>
                <GeneralSettingsComponents.FormWrapper>
                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Your time zone
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"Asia/Karachi"}
                            isDisabled={true}/>
                    </GeneralSettingsComponents.TaskList>
                </GeneralSettingsComponents.CardInfoBox>
                <GeneralSettingsComponents.ConfigureMessage>Configure your timezone settings in your <Link to="/profile">profile settings
                    page</Link></GeneralSettingsComponents.ConfigureMessage>

                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Language
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"English (United Kingdom)"}
                            isDisabled={true}/>
                    </GeneralSettingsComponents.TaskList>
                </GeneralSettingsComponents.CardInfoBox>
                <GeneralSettingsComponents.ConfigureMessage>Configure your language settings in your <Link to="/profile">profile settings
                    page</Link></GeneralSettingsComponents.ConfigureMessage>


                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Watch your issues
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={issues}
                            isMultiple={false}
                            defaultValue={"Inherit from global settings"}/>
                    </GeneralSettingsComponents.TaskList>
                </GeneralSettingsComponents.CardInfoBox>
                <GeneralSettingsComponents.ConfigureMessage>If you select enabled, you will automatically 'watch' the issues you interact
                    with.</GeneralSettingsComponents.ConfigureMessage>

                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Your Jira homepage
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={homepage}
                            isMultiple={false}
                            defaultValue={"Your work"}/>
                    </GeneralSettingsComponents.TaskList>
                </GeneralSettingsComponents.CardInfoBox>
                <GeneralSettingsComponents.ConfigureMessage>You'll see this page when you log in or select the Jira logo.</GeneralSettingsComponents.ConfigureMessage>

                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Email notification for issue activity
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={email}
                            isMultiple={false}
                            placeholder={"Unassigned"}
                            defaultValue={"Send me email notifications"}/>
                    </GeneralSettingsComponents.TaskList>
                    <GeneralSettingsComponents.ConfigureMessage>Get email updates for issue activity when:</GeneralSettingsComponents.ConfigureMessage>
                    <GeneralSettingsComponents.CheckboxWrapper>
                        <GeneralSettingsComponents.CheckboxLabel htmlFor="watching">
                            <input type="checkbox" defaultChecked={true} id="watching"/>
                            You're <strong>watching</strong> the issue
                        </GeneralSettingsComponents.CheckboxLabel>

                        <GeneralSettingsComponents.CheckboxLabel htmlFor="reporter">
                            <input type="checkbox" defaultChecked={true} id="reporter"/>
                            You're the <strong>reporter</strong>
                        </GeneralSettingsComponents.CheckboxLabel>

                        <GeneralSettingsComponents.CheckboxLabel htmlFor="assignee">
                            <input type="checkbox" defaultChecked={true} id="assignee"/>
                            You're the <strong>assignee</strong> for the issue
                        </GeneralSettingsComponents.CheckboxLabel>

                        <GeneralSettingsComponents.CheckboxLabel htmlFor="mention">
                            <input type="checkbox" defaultChecked={true} id="mention"/>
                            Someone <strong>mentions</strong> you
                        </GeneralSettingsComponents.CheckboxLabel>

                        <GeneralSettingsComponents.CheckboxLabel htmlFor="changes">
                            <input type="checkbox" id="changes"/>
                            You <strong>make changes</strong> to the issue
                        </GeneralSettingsComponents.CheckboxLabel>
                    </GeneralSettingsComponents.CheckboxWrapper>
                    <GeneralSettingsComponents.ConfigureMessage>You may also receive other email notifications like those configured by your Jira
                        admin and updates for filter subscriptions.</GeneralSettingsComponents.ConfigureMessage>
                    <GeneralSettingsComponents.ConfigureMessage><Link to="/profile">Learn more about email notifications</Link></GeneralSettingsComponents.ConfigureMessage>
                </GeneralSettingsComponents.CardInfoBox>

                <GeneralSettingsComponents.CardInfoBox>
                    <GeneralSettingsComponents.CardInfoBoxTitle>
                        Email notifications format
                    </GeneralSettingsComponents.CardInfoBoxTitle>
                    <GeneralSettingsComponents.TaskList>
                        <GenericSelectField
                            options={notificationFormat}
                            isMultiple={false}
                            defaultValue={"HTML"}/>
                    </GeneralSettingsComponents.TaskList>
                </GeneralSettingsComponents.CardInfoBox>
                <GeneralSettingsComponents.SaveButton>Save Changes</GeneralSettingsComponents.SaveButton>
            </GeneralSettingsComponents.FormWrapper>

            </GeneralSettingsComponents.PageWrapper>
        </GeneralSettingsComponents.PersonalSetting>
    );
}


export default GeneralSettings;