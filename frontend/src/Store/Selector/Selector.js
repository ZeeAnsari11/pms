import {useSelector} from "react-redux";

export const useIsDataSyncerLoading = () => {
    return false;
};

export const useIsLogInPending = () => {
    return false
};

export const useIsUserAuthenticated = () => {
    return useSelector((state) => state.login.isAuthenticated);
};

export const useIsSingUpPending = () => {
    return false
};

export const useCurrentIssueData = () => {
    return {}
};

export const useCurrentUserProfileData = () => {
    return useSelector((state) => state.auth.userInfo);
};

export const useIsAdminOrStaffUser = () => {
    const currentUserProfileData = useCurrentUserProfileData();
    return currentUserProfileData?.user?.is_staff || currentUserProfileData?.user?.is_superuser;
};

