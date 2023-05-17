<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
    
</script>

<template>
    <main>
        <div v-if="signIn" class="signinBox">
            <div class="title"> Sign in</div>
            <form  id="signinForm" v-on:submit.prevent="handleSubmit">
                <div id="form_message_box" class="form__message form__message--error">{{ errorMessage }}</div>
                <input v-model="email" id="name" type="text" placeholder="Username / Email" />

                <input v-model="password" id="password" type="password" placeholder="Password" />
                <button  type="submit">sign in</button>

                <div style="text-align: center;margin-top: 10px; ">
                    <router-link  to="/register" class="signinRegisterToggle">Create Account</router-link>
                    
                </div>
            </form>
            
        </div>
        <div v-else class="signinBox">
            <div class="title"> Register    </div>
            <form  id="signinForm" v-on:submit.prevent="handleSubmit">
                <div id="form_message_box" class="form__message form__message--error">{{ errorMessage }}</div>
              
                <input v-model="firstName" style="width:235px" type="text" placeholder="First Name (optional)" />
                <input v-model="lastName" style="width:240px;margin-left:25px" type="text" placeholder="Last Name" />
                <input v-model="email" id="name" type="email" placeholder="Email Address *" />
            
                <input v-model="username" id="password" type="text" placeholder="Username (3+ characters) *" />
                <input v-model="password" id="password" type="password" placeholder="Password (3+ characters) *" />
                <div style="text-align:center; margin-top:10px">(passwords are hashed and secure)</div>
                <button type="submit">register</button>
                <div style="text-align: center;margin-top: 10px; ">
                    <router-link  to="/signin" class="signinRegisterToggle">Have An Account?</router-link>
                </div>
            </form>
            
        </div>
    </main>
</template>

<style scoped>

main {
    background-image: url("/background.jpg");
}

.title {
    font-family: Montserrat-Bold;
    font-size: 35px;
    text-align: center;
    margin-top: 40px;
}

.signinBox {
    padding-top: 1px;
    padding-bottom: 20px;
    margin-top: 200px;
    margin-left: calc((100vw - 600px)/2);
    margin-bottom:100px;
    width: 600px;
    background-color: white;
    color:black;
    border-radius: 10px;
    
    min-height: 500px;
}

.signinRegisterToggle {
    text-decoration: none;
    color: #3175fa;
    margin-top:20px;
}

.signinBox input {
    width: 500px;
    margin-left: 50px;
    margin-top: 5px;
    height: 70px;
    font-size: 15px;
    background-color: #E8E8E8;
    border: none;
    margin-top: 20px;
    padding-left: 10px;
    font-family: Montserrat-Bold;
}


.signinBox input:hover {
    background-color: #D3D3D3;
}


.form__message {
    text-align: center;
    margin-top:10px;
    font-size: 20px;
    font-family: Montserrat-Bold;
}

.form__message--success {
    color: green;
}

.form__message--error {
    color: red;
}

.signinBox button {
    padding: 20px;
    width: 150px;
    font-size: 20px;
    font-family: Montserrat-Bold;
    color: white;
    background-color: #3175fa;
    border: none;
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: calc((100% - 150px)/2);
}


.inputTitle {
    margin-left: 10%;
    margin-top: 20px;
    color: grey;
    font-family: Arial;
}

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:['signIn'],
    setup() {
        
    },
    mounted(){
        if (common.sessionID != -1)
            window.location.href = '/';
    },
    data(){
        return {
            username:'',
            email:'',
            password:'',
            errorMessage:"",
            firstName:"",
            lastName:""
        }
    },
    methods:{
            ValidateEmail(input) {

                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                if (input.match(validRegex)) return true;
                return false;
            },
            handleSubmit(event){
                
                this.errorMessage = "";
               
                    if (this.signIn){
                        if (this.email==""){
                        this.errorMessage = "please enter your email";
                        return;
                    }
                    if (this.password == ""){
                        this.errorMessage = "please enter your password";
                        return;
                    }

                    this.$Progress.start();
                    console.log("logging in..");
                    this.login(this.email,this.password).then(loginData =>{
                        if (loginData.login == 2){
                            common.writeCookie("SESSIONID",loginData.SESSIONID,3);
                            common.refreshSession();
                            //this.$router.push({path:"/"});
                            window.location.href = '/'
                            
                            this.$Progress.finish();
                            return;
                        }else if (loginData.login == 1){
                            this.errorMessage = "Incorrect username or password";
                        }else if (loginData.login == 0){
                            this.errorMessage = "User not found";
                        }
                        this.$Progress.fail();
                    });
                }else{ // register
                    if (this.username.length==""){
                        this.errorMessage = "please enter your username";
                        return;
                    }
                    if (!this.ValidateEmail(this.email) || this.email.length < 5){
                        this.errorMessage = "email is invalid";
                        return;
                    }
                    if (this.password.length<3){
                        this.errorMessage = "password length too short";
                        return;
                    }
                    
                    this.$Progress.start();
                    console.log("registering..");
                    this.register(this.firstName,this.lastName,this.username,this.password,this.email).then(loginData =>{
                        if (loginData.login == 2){
                            this.$Progress.finish();
                            this.$Progress.start();
                            common.writeCookie("SESSIONID",loginData.SESSIONID,3);
                            common.refreshSession();
                            //this.$router.push({path:"/"});
                            window.location.href = '/'
                            return;
                        }else if (loginData.login == 0){
                            this.errorMessage = "Invalid username/password";
                        }else if (loginData.login == 3){
                            this.errorMessage = "Email Taken";
                        }else if (loginData.login == 4) {
                            this.errorMessage = "Invalid email address";
                        }
                        this.$Progress.fail();
                    });
                }
            },
            login(email, password) {
                return fetch(common.serverAddress + "/login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({ email: email, password: password })
                })
                .then((res) =>  res.json()).then((data) => {
                    // Handle response 
                    console.log('Response: ', data);
                    return data;
                })
                .catch(err => {
                    // Handle error 
                    console.log('Error message: ', err);
                });

            },
            register(firstName,lastName,username, password, email) {

                    return fetch(common.serverAddress + "/register", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'

                        },
                        body: JSON.stringify({ firstName: firstName, lastName: lastName, username: username, password: password, email: email })
                    })
                    .then((res) =>  res.json()).then((data) => {
                        // Handle response 
                        console.log('Response: ', data);
                        return data;
                    })
                    .catch(err => {
                        // Handle error 
                        console.log('Error message: ', err);
                    });

                }
        }
})
</script>
