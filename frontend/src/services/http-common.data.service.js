const jwt = require('jsonwebtoken');
var ApplicationUser = require("../../../shared/ApplicationUser");

class HTTPCommonDataService {

    setCookie(name, value, timeMilliseconds) {
        var expires = "";
        if (timeMilliseconds) {
            var date = new Date();
            date.setTime(date.getTime() + timeMilliseconds);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
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

    ApplicationUser = () =>
    {
        var token = this.getCookie("ApplicationUser");
        var result = jwt.verify(token, '6987beea-c26c-4193-b4d7-a27ed1ee4069');
        if (result) {
            var t = new ApplicationUser()(result);
            console.log(result);
            console.log(t);
        }
        return null;
    }

}

export default new HTTPCommonDataService();
