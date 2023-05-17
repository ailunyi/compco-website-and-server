<script setup>

    import common from "../../assets/common"
</script>

<template>
    <main>
        <div id="receiveArea" class="receiveArea">       
            <h1>Welcome to the Live Student Chat Room!</h1>
            <h2>Talk about school, rant about hw, gossip about love, or whatever but no hate speech allowed</h2>
            <div>Active Users <label style="color:var(--main-button-color)">{{ userCount }}</label></div>
            <h1 v-if="joining" style="text-align: center;">JOINING...</h1>
            <div :id="'messages-'+index" class="message" :class="{curUserMessage: message.username == name}" v-for="(message, index) in messages" :key="message">
               <img :src="message.profilePic" :alt="message.username">
               <div :class="{curUserMessage: message.username == name}" class="messageInfo" >
                    <div :class="{curUserMessage: message.username == name}" class="messageSender">
                        <a v-if="message.signedIn == true" :href="'/profile/'+message.username" target="_blank" :style="{'cursor':'pointer', 'color':'#'+ message.color,'text-decoration':'none' }">{{ message.username }}</a>
                        <label :style="{ 'color':'#'+ message.color,'text-decoration':'none' }" v-else>{{ message.username }}</label>
                        <label>{{ message.time }}</label>
                    </div>
                    
                    <div class="messageContent" :class="{curUserMessage: message.username == name}">{{ message.content }}</div>
               </div>
            </div>
        </div>
        <form class="sendArea" @submit.prevent="sendMessage">
            <input  placeholder="Say something nice..." v-model="messageToSend">
            <button type="submit">Send</button>
        </form>
    </main>
</template>

<style scoped>
main{
    margin-left:260px;
    width:calc(100vw - 260px);
    height: calc(100vh - 60px); 
    margin-top: 60px;
}

.receiveArea{
    width:100%;
    padding: 10px;
    height: calc(100% - 80px);
    overflow-y: auto;
    padding-bottom: 40px;
}

h1{
    
    font-family: montserrat-bold;
}

.message{
    display: flex;
    gap:10px;
    margin-top: 20px;
    margin-left:20px;
    margin-right: 20px;
}

.curUserMessage{
    flex-direction: row-reverse;
    text-align: right;
}

.messageInfo div{
    display: flex;
    gap:10px;
}

.messageSender{
    font-family: montserrat-bold;
    font-size: 18px;
}

.messageContent{
    font-family: montserrat-semiBold;
    font-size: 18px;
    word-break: break-word;
    display: inline-block;
    width:800px;
}

.message img{
    width:60px;
    height:60px;
    border-radius: 30px;
}
.sendArea{
    position: absolute;
    width:100%;
    font-size: 25px;
    bottom:0px;
    display: flex;
    gap:10px;
}
.sendArea input{
    width:calc(100% - 120px);
    margin-left:10px;
    margin-bottom:10px;
    font-size: 20px;
    padding:15px;
    border-radius: 10px;
    background-color: var(--main-panel-color);
    border:none;
    
    color:var(--main-text-color);
}

.sendArea button{
    height:55px;
    width:80px;
    border-radius: 10px;
    background-color:var(--main-text-color);
    cursor: pointer;
    font-family: montserrat-bold;
    font-size: 17px;
    
    color:var(--main-bg-color);
}
</style>

<script>
import { defineComponent } from 'vue'
var socket = null;

export default defineComponent({
    
    setup() {
    },
    data(){
        return {
            messageToSend:"",
            messages:[],
            userCount:'...',
            name: "",
            profilePicture: "",
            signedIn: false,
            color:0,
            joining:true
        }
    },
    mounted(){
        socket = new WebSocket('ws://localhost:8000/chat');
        let that = this;
        if (common.sessionID == -1){
            this.name = "anonymous" + Math.floor(Math.random() * 1000);
            this.profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        }else{
            this.name = common.username;
            this.profilePicture = common.profilePicture;
            this.signedIn = true;
        }

        this.color = Math.floor(Math.random()*16777215).toString(16);

        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({"type": "info", "username": that.name}));
            that.joining = false;
        });

        socket.addEventListener('message', function (event) {
            let message = JSON.parse(event.data);
            if (message.type == "connect"){
                that.userCount = message.users;
            }
            
            if (message.type == "disconnected"){
                that.userCount--;
            }

            if (message.type == "message"){
                
                that.messages.push(message);
                setTimeout(() => {
                        
                    var lastMessage = document.getElementById("messages-"+(that.messages.length-1).toString());
                    lastMessage.scrollIntoView({behavior: 'smooth'});
                }, 10);
            }
            
        });
    },
    unmounted(){
        socket.close();
    },
    methods:{
        parseMessage(){
            
        },
        sendMessage(){
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            
            socket.send(JSON.stringify({"type":"message","content":this.messageToSend, "username": this.name,
             "profilePic": this.profilePicture, "signedIn":this.signedIn, "time":time, "color":this.color}));
           
            this.messageToSend = "";
        }
    }

    
})
</script>
