import httpCommonDataService from "./http-common.data.service";

class ErrorHandlerService {

    handlerError(error) {     
           
        if (error.code === 'ERR_NETWORK') {
            window.location.href = `/error/network_error`;
        }
        
        switch(error?.response?.status) {
            case 400:
                return error;// if its a 400 the user has done something wrong, so we return the whole error containing any info
            case 401:
                httpCommonDataService.deleteCookie("access_token");
                break;
            case 404:
            case 408:
            case 500:
            case 502:
            case 503:
            case 504:
                window.location.href = `/error/${error}`;
                break;
            case 'ERR_NETWORK':
            case "NETWORK_ERROR":
            case "AxiosError: Network Error":
                window.location.href = `/error/network_error`;
                break;
            default:
                var errorMessage = "Something went wrong. Please try again later.";
                break;
        }

        return error?.response?.data?.message ?? errorMessage;
    }
}

export default new ErrorHandlerService();