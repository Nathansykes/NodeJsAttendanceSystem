<template>
    <div id="app">

    </div>
<body>
    <header>
        <h1>Login Portal</h1>
    </header>
    <main>
        <div id="login_form" class = "form_class">
        <!-- <form id="login_form" class="form_class">  -->
            <div class="form_div">
                <label>Login:</label>
                <input class="field_class" name="Id" type="text" placeholder="Username" autofocus>
                <label>Password:</label>
                <input id="pass" class="field_class" name="Password" type="password" placeholder="Password here">
                <button class="submit_class" type="submit" form="login_form" @click="login()">Submit</button>
            </div>
            <div class="info_div">
                <p>Need to register? <a href="">Click Me!</a></p>
            </div>
        <!-- </form> -->
    </div>
    </main>

</body>

</template>
<script>

// document.getElementsByClassName('submit-class').addEventListener('click', login());

import UserDataService from '../services/user.data.service';


export default{
    
    name:"app",
    methods: {
        login()  {
            
            let UserName = "111111111111"
            let Password = "testpassword"
            let data = {
                    Id:UserName,
                    Password:Password
                }
            UserDataService.login(data)
            console.log(data)
            .then(res =>{
            console.log(res)
            })
            
        }
        
    }
    
}








</script>

<style>
* {
    padding: 0px;
    margin: 0px;
}
body {
    background-color: rgb(10, 139, 232);
}
header {
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
    box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
}
h1 {
    letter-spacing: 1.5vw;
    font-family: 'system-ui';
    text-transform: uppercase;
    text-align: center;
}
main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75vh;
    width: 100%;
    background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png) no-repeat center center;
    background-size: cover;
}
.form_class {
    width: 500px;
    padding: 40px;
    border-radius: 8px;
    background-color: white;
    font-family: 'system-ui';
    box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
}
.form_div {
    text-transform: uppercase;
}
.form_div > label {
    letter-spacing: 3px;
    font-size: 1rem;
}
.info_div {
    text-align: center;
    margin-top: 20px;
}
.info_div {
    letter-spacing: 1px;
}
.field_class {
    width: 100%;
    border-radius: 6px;
    border-style: solid;
    border-width: 1px;
    padding: 5px 0px;
    text-indent: 6px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: 'system-ui';
    font-size: 0.9rem;
    letter-spacing: 2px;
}
.submit_class {
    border-style: none;
    border-radius: 5px;
    background-color: #FFE6D4;
    padding: 8px 20px;
    font-family: 'system-ui';
    text-transform: uppercase;
    letter-spacing: .8px;
    display: block;
    margin: auto;
    margin-top: 10px;
    box-shadow: 2px 2px 5px rgb(0,0,0,0.2);
    cursor: pointer;
}
</style>