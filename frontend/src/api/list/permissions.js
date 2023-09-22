import apiRequest from "../../Utils/apiRequest";

export const fetchPermissionsList = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.get(
            `/user_permissions/`,
            config
        )
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message
        } else {
            throw error.message
        }
    }
}

