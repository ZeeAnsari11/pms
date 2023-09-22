import apiRequest from "../../Utils/apiRequest";

export const fetchSlackConfigurations = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.get(
            `/global_slack_webhook/`,
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


export const createSlackConfigurations = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.post(
            `/global_slack_webhook/`,
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

export const updateSlackConfigurations = async (configId, formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            },
        }
        return await apiRequest.patch(
            `/global_slack_webhook/${configId}/`,
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