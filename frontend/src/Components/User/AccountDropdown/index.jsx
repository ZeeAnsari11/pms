import React from "react";
import Avatar from "react-avatar";
import * as AccountComponents from "./Style"
import {useCurrentUserProfileData} from "../../../Store/Selector/Selector";


const AccountDropdown = () => {
    const currentUserProfileData = useCurrentUserProfileData();

    return (
        <>
            <strong>ACCOUNT</strong>
            <div>
                <Avatar
                    name={currentUserProfileData?.user?.username}
                    src={`${process.env.REACT_APP_HOST}/${currentUserProfileData?.image}`}
                    size={30}
                    round={true}
                    title={currentUserProfileData?.user?.username}
                    color="#DE350B"
                    style={{marginRight: '10px', marginTop: '8px'}}
                />
                <AccountComponents.Username>{currentUserProfileData?.user?.username}</AccountComponents.Username>
                {currentUserProfileData?.user?.email && (
                    <AccountComponents.Email>{currentUserProfileData?.user?.email}</AccountComponents.Email>
                )}
            </div>
        </>
    );
};

export default AccountDropdown;