import jwt from 'jwt-decode';
import axios from "axios";

class HTTPCommonDataService {

    setCookie(cname, cvalue, exHours) {

        var cookieString = cname + "=" + cvalue + ";";
        if(exHours){
            var d = new Date();
            d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
            var expires = "expires="+ d.toUTCString();
            cookieString += expires + ";";
        }
        document.cookie = cookieString += " path=/; SameSite=Strict; Secure";
    }

    getCookie = (name) => 
    {
        let value = "; " + document.cookie;
        let parts = value.split(`; ${name}=`);
        if (parts.length == 2) 
        {
            return parts.pop().split(";").shift();
        }

        return null;
      }

    deleteCookie = (name) => 
    {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    getApplicationUser = () =>
    {
        let token = this.getCookie("access_token");
        if (token) {
            return jwt(token);
        }
        return null;
    }

    testConnection = () =>
    {
        return axios.get(`${process.env.VUE_APP_API_BACKEND_URL}/verifyToken`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${this.getCookie("access_token")}`
            }
        });
    }
}

export default new HTTPCommonDataService();
