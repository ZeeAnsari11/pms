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


export const updateUser = async (userId, formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.patch(
            `/users_list/${userId}/`,
            formData,
            config,
        )
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message
        } else {
            throw error.message
        }
    }
}



export const deleteUser = async (userId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.delete(
            `/users_list/${userId}/`,
            config,
        )
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw error.response.data.message
        } else {
            throw error.message
        }
    }
}