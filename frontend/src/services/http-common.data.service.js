import jwt from 'jwt-decode';
class HTTPCommonDataService {

    setCookie(cname, cvalue, exHours) {

        var cookieString = cname + "=" + cvalue + ";";
        if(exHours){
            var d = new Date();
            d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
            var expires = "expires="+ d.toUTCString();
            cookieString += expires + ";";
        }
        document.cookie = cookieString += "path=/;" + "SameSite=Strict;";
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
}

export default new HTTPCommonDataService();
