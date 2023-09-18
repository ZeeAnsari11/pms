import apiRequest from "../../Utils/apiRequest";

export const fetchUsersList = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.get(
            `/users_list/`,
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