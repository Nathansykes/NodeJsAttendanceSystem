import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${localStorage.getItem("user")}`
  }
});