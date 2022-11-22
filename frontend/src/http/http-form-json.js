import axios from "axios";
import httpCommonDataService from "../services/http-common.data.service";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${httpCommonDataService.getCookie("access_token")}`
  }
});