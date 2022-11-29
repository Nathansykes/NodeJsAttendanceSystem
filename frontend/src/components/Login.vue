<template>
    <div id="login">
        <body>
            <header>
                <h1>Login Portal</h1>
            </header>
            <main>
                <div id="login_form" class="form_class">
                    <div class="form_div">
                        <i>Id: 1000, Password: password</i>
                        <form>
                            <label>Login:</label>
                            <input v-model="userId" class="field_class" name="Id" type="text" placeholder="Id" autofocus>
                            <label>Password:</label>
                            <input v-model="userPassword" id="pass" class="field_class" name="Password" type="password" placeholder="Password here">
                            <button class="submit_class" type="button" @click="login()">Login</button>
                        </form>
                    </div>
                    <p style="margin-top: 10%;" v-if="errorMessage">{{errorMessage}}</p>
                </div>
            </main>
        </body>
    </div>
</template>
<script>
import Authentication from '../services/authentication.data.service';
import ErrorHandlerService from '@/services/error.handler.service';
import HTTPCommonDataService from '../services/http-common.data.service'

export default{
    
    name:"app",
    data(){
        return{
            errorMessage: "",
        }
    },
    methods: {
        login() 
        {
            Authentication.login({Id: this.userId, Password : this.userPassword}).then(response => 
            {
                var token = (JSON.parse(response.data)).Token;
                HTTPCommonDataService.setCookie("access_token", token, 1);
                document.cookie=`access_token=${token}`;
                this.$router.push('/home')
                window.location.href= '/home';
            })
            .catch(error => this.errorMessage = ErrorHandlerService.handlerError(error));
        }
    }
}
</script>
