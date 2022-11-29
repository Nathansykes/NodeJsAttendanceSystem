<template>
    <div id="login">
        <body>
            <header>
                <h1>Login Portal</h1>
            </header>
            <main>
                <div id="login_form" class="form_class">
                    <div class="form_div">
                        <form>
                            <label>Login:</label>
                            <input v-model="userId" class="field_class" name="Id" placeholder="User Id" autofocus 
                             maxlength="4" input type='text' @keypress='this.validate(event)'  title="Four number username please">
                            <label>Password:</label>
                            <input v-model="userPassword" id="pass" class="field_class" name="Password" type="password" placeholder="Password">
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
                this.$router.push('/home')
                window.location.href= '/home';
            })
            .catch(error => this.errorMessage = ErrorHandlerService.handlerError(error));
        },
        validate(evt) {
            var theEvent = evt || window.event;

            // Handle paste
            if (theEvent.type === 'paste') {
                key = event.clipboardData.getData('text/plain');
            } else {
                // Handle key press
                var key = theEvent.keyCode || theEvent.which;
                key = String.fromCharCode(key);
            }
            var regex = /[0-9]|\./;
            if (!regex.test(key)) {
                theEvent.returnValue = false;
                if (theEvent.preventDefault) theEvent.preventDefault();
            }
        }
    }
}
</script>