import axios from "axios";
import httpCommonDataService from "../services/http-common.data.service";

export default axios.create({
  baseURL: process.env.VUE_APP_API_BACKEND_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${httpCommonDataService.getCookie("access_token")}`
  }
});