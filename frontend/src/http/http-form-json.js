import axios from "axios";
import httpCommonDataService from "../services/http-common.data.service";
import errorHandlerService from "@/services/error.handler.service";

var apiBackend = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${httpCommonDataService.getCookie("access_token")}`
  }
});

apiBackend.interceptors.response.use((response) => response, (error) => errorHandlerService.handlerError(error));

export default apiBackend;