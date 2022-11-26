<template>
    <div class="alert alert-dismissible alert-danger">
        <h4 class="alert-heading">{{this.error ?? "Error"}}</h4>
        <strong>Oh snap!</strong> {{this.errorMessage}} <router-link :to="this.$router.options.history.state.back ?? '/home'" class="alert-link">Try refreshing.</router-link>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            error: null,
            errorMessage: "",
        }
    },
    methods: {
        getErrorMessage() 
        {
            switch(this.error) {
                case 401:
                    this.errorMessage = "You are not authorized to view this page.";
                    break;
                case 404:
                    this.errorMessage = "The page you are looking for does not exist.";
                    break;
                case 408:
                    this.errorMessage = "The request timed out.";
                    break;
                case 500:
                    this.errorMessage = "Something went wrong on our end. Please try again later.";
                    break;
                case 502:
                case 503:
                case 504:
                    this.errorMessage = "The server is currently unavailable.";
                    break;
                case "NETWORK_ERROR":
                case "AxiosError: Network Error":
                    this.errorMessage = "There was a problem connecting to the server. Please try again later.";
                    break;
                default:
                    this.errorMessage = "Something went wrong. Please try again later.";
                    break;
            }
        }
    },
    mounted() 
    {
        this.error = this.$route.params.error
        this.getErrorMessage();
    }
}
</script>