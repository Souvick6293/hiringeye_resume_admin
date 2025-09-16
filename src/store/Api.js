import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
let domain = window.location.origin
const formDataURL = ['product/add-product-images', '/user/update-profile', '/admin/update-subscripiton-plans', '/operation-head/coach/add-coach', '/admin/course/add-course-step-one', '/admin/course/add-course-step-two', '/oparational-head/batch/add-batch-banner', 'https://audiobookpython.bestworks.cloud/process_pdf_narrator', 'https://audiobookpython.bestworks.cloud/process_pdf'];
api.interceptors.request.use((req) => {
  let userTokenData;
  try {
    userTokenData = JSON.parse(sessionStorage.getItem('hiringeye_admin_token'));
    // console.log("UserTokenData", userTokenData);
  } catch (error) {
    userTokenData = null;
  }
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;
  // console.log("Req: ", req.url);
  req.headers['Content-Type'] = 'application/json';
  if (formDataURL.includes(req.url)) {
    req.headers['Content-Type'] = 'multipart/form-data';
  }
   if (domain) {
    req.headers['Domain'] = domain;
  }
  req.headers['x-api-key'] = import.meta.env.VITE_API_KEY;
  if(token){
    req.headers.Authorization = `Bearer ${token}`
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      sessionStorage.removeItem('hiringeye_admin_token');
    }
    return Promise.reject(error);
  }
);

export default api;
