import axios from "axios";
import { baseUrl } from '../../baseURL'

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}



export const loginUser = async (body) => {
    try {
        const data = await axios.post(`${baseUrl}/api/login`, body);
        console.log("🚀 => data:", data);
        return data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getUsersList = async (body) => {
    try {
        if (token) {
            const data = await axios.get(`${baseUrl}/api/users`,
                {
                    headers,
                    params: body
                }
            );
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editUser = async (body) => {
    try {
        const data = await axios.put(`${baseUrl}/api/users/${body.id}`, body);
        return data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const deleteUser = async (body) => {
    try {
        const data = await axios.delete(`${baseUrl}/api/users/${body.id}`, {
            headers,
            data: { id: body.id }
        });
        return data.status === 204 ? { success: true, message: 'User deleted successfully' } : data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}