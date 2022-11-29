import axios from "axios";
import httpCommonDataService from "../services/http-common.data.service";
import errorHandlerService from "@/services/error.handler.service";

var apiBackend = axios.create({
  baseURL: process.env.VUE_APP_API_BACKEND_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${httpCommonDataService.getCookie("access_token")}`
  }
});

apiBackend.interceptors.response.use((response) => response, (error) => errorHandlerService.handlerError(error));

export default apiBackend;