<template>
    <div class="alert alert-dismissible alert-danger">
        <h4 class="alert-heading">{{this.error ?? "Error"}}</h4>
        <p>
            <strong>Oh snap!</strong> {{this.errorMessage}} 
        </p>
    </div>
</template>

<script>
import ModelDataService from '../services/models.data.service';

export default {
    name: "app",
    data() {
        return {
            error: null,
            errorMessage: "",
        }
    },
    methods: {
        getError() {
            this.error = this.$route.params.error
            if (this.error == "network_error") {
                this.error = "Network Error";
            }
        },
        retryConnection() {
            setInterval(function(){
                console.log("retrying connection");
                ModelDataService.HTTPCommonDataService.testConnection().then(response => {
                    window.location.href = this.$router.options.history.state.back ?? "/home";                    
                }).catch(error => {
                    if(error.response){
                        window.location.href = "/login";
                    }
                })
            },5000)
        },
        getErrorMessage() 
        {
            switch(this.$route.params.error) {
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
                case "network_error":
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
        this.getError()
        this.getErrorMessage();
        this.retryConnection();
    }
}
</script>