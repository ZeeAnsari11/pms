import React from "react";
import Avatar from "react-avatar";
import * as AccountComponents from "./Style"
import {useCurrentUserProfileData} from "../../../Store/Selector/Selector";
import {useSelector} from "react-redux";


const AccountDropdown = () => {

    const { userInfo } = useSelector((state) => state.auth)


    return (
        <>
            <strong>ACCOUNT</strong>
            <div>
                <Avatar
                    name={userInfo?.user?.username}
                    src={`${process.env.REACT_APP_DOMAIN}${userInfo?.image}`}
                    size={30}
                    round={true}
                    title={userInfo?.user?.username}
                    color="#DE350B"
                    style={{marginRight: '10px', marginTop: '8px'}}
                />
                <AccountComponents.Username>{userInfo?.user?.username}</AccountComponents.Username>
                {userInfo?.user?.email && (
                    <AccountComponents.Email>{userInfo?.user?.email}</AccountComponents.Email>
                )}
            </div>
        </>
    );
};

export default AccountDropdown;