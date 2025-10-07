import axios from 'axios';
import { toast } from 'react-toastify';

const linkedInScraperApi = axios.create({
    baseURL: import.meta.env.VITE_API_LINKEDINSCRAPER,
});

const formDataURL = ['user/user-profile/change-avatar'];

linkedInScraperApi.interceptors.request.use((req) => {
    let userTokenData;
    try {
        userTokenData = JSON.parse(sessionStorage.getItem('hiringeye_admin_token'));
    } catch (error) {
        userTokenData = null;
    }

    let token = userTokenData && userTokenData.token ? userTokenData.token : null;

    // Default Content-Type
    req.headers['Content-Type'] = 'application/json';

    // If formData endpoint
    if (formDataURL.includes(req.url)) {
        req.headers['Content-Type'] = 'multipart/form-data';
    }

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    req.headers['x-api-key'] = import.meta.env.VITE_API_KEY;

    return req;
});

linkedInScraperApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            sessionStorage.removeItem('linkedInScraperToken');
            toast.error("You have been logged out, please login again.");
        }
        return Promise.reject(error);
    }
);

export default linkedInScraperApi;
