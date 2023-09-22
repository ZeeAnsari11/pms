import apiRequest from "../../Utils/apiRequest";

export const fetchGroupList = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.get(
            `/user_groups/`,
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


export const createGroup = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.post(
            `/user_groups/`,
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

export const updateGroup = async (groupId, formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.patch(
            `/user_groups/${groupId}/`,
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



export const deleteGroup = async (groupId) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.delete(
            `/user_groups/${groupId}/`,
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