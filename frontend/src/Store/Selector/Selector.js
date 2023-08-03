import {useSelector} from "react-redux";

export const useIsDataSyncerLoading = () => {
    return useSelector((state) => state.DataSyncer.loading);
};

export const useIsLogInPending = () => {
    return useSelector((state) => state.login.loading);
};

export const useIsSingUpPending = () => {
    return useSelector((state) => state.signUp.loading);
};

export const useCurrentIssueData = () => {
    return useSelector((state) => state.issueData.issueData);
};

export const useCurrentUserProfileData = () => {
    return useSelector((state) => state.DataSyncer.userProfileData);
};

export const useIsAdminOrStaffUser = () => {
    const currentUserProfileData = useCurrentUserProfileData();
    return currentUserProfileData?.user?.is_staff || currentUserProfileData?.user?.is_superuser;
};
