import httpCommonDataService from "./http-common.data.service";

class ErrorHandlerService {

    handlerError(error) {

        console.log(error);

        if (error.code === 'ERR_NETWORK') {
            window.location.href = `/error/${error}`;
        }

        switch(error?.response?.staus) {
            case 401:
                httpCommonDataService.removeCookie("access_token");
                window.location.href = "/login";
                break;
            case 404:
            case 408:
            case 500:
            case 502:
            case 503:
            case 504:
            case 'ERR_NETWORK':
            case "NETWORK_ERROR":
            case "AxiosError: Network Error":
                window.location.href = `/error/${error}`;
                break;
            default:
                var errorMessage = "Something went wrong. Please try again later.";
                break;
        }

        return error?.response?.data?.message ?? errorMessage;
    }
}

export default new ErrorHandlerService();