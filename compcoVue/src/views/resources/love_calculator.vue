<script setup>

    import footerVue from '../../components/footerVue.vue'
</script>

<template>
    <main>
        <div class="mainContent">
        <form id="loveForm" class="loveForm" @submit.prevent="handleSubmit()">
            <div class="title">? ♥ LOVE ♥ ?</div>
            <div>calculate your love compatibility with ur crush</div>
            <input v-model="p1" style="background-color:#018D93" placeholder="your name" />
            <input v-model="p2" id="crush-field" style="background-color:#B20115" :type="inputStatus" placeholder="crush's name" />
            <div @click="toggleVisibility()" style="cursor: pointer;">{{wordStatus}}</div>
            <!-- <span toggle="#crush-field" class="fa fa-fw fa-eye-slash field-icon toggle-password"></span>
            <font-awesome-icon icon="eye-slash"></font-awesome-icon> -->
            <!--<div>names are not sent to server</div>-->
            <button type="submit">calculate</button>
        </form>
        <div class="predictionArea">
            <div class="score" id="score">???</div>
            <div class="description" style="font-size:20px" id="description"><div>enter some names :)</div> <div>(full names for extra accuracy)</div></div>
            <div id="heart" hidden></div>
            <div class="description" style="position:absolute; bottom:5px;">*also no data is sent to the server*</div>
            <div class="description" style="position:absolute; bottom:30px;">*don't take these results too seriously, they are just for fun*</div>
        </div>
    </div>
    </main>
</template>

<style scoped>
.mainContent {
    position:relative;
    margin-top: 100px;
    width: 1400px;
    margin-left: calc((100% - 1400px)/2);
    margin-bottom:50px;
    min-height: calc(100vh - 600px);
}

.title {
    margin-top:30px;
    text-align: center;
    font-size: 40px;
    font-family: Montserrat-Bold;
    margin-bottom: 20px;
}

.loveForm {
    margin-top: 50px;
    margin-bottom: 30px;
    float: left;
    margin-left: calc((100% - 1000px)/2);
    width: 400px;
    text-align: center;
}

.predictionArea {
    position:relative;
    margin-top: 50px;
    float: left;
    margin-left: 100px;
    width: 500px;
    min-height: 500px;
    margin-bottom:30px;
    background-color:var(--main-panel-color);
    border-radius:10px;
}
.loveForm span {
    float:right;
    position:relative;
    cursor:pointer;
    margin-top:-38px;
    margin-left:-25px;
    z-index:2;
}
.score {
    text-align: center;
    width: 100px;
    margin-left: calc((100% - 100px)/2);
    margin-top: 30px;
    background-color: pink;
    height: 100px;
    padding-top: 25px;
    font-size: 30px;
    color: black;
    border-radius: 50px;
    border: solid black 1px;
}

.description {
    width:100%;
    text-align:center;
    margin-top:20px;
}

.loading {
    font-size: 15px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
.loveForm button {
    padding: 20px;
    width: 150px;
    font-size: 20px;
    font-family: Montserrat-Bold;
    color: white;
    background-color: #975ECC;
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    cursor: pointer;
}
.loveForm input {
    font-family: Arial;
    font-size: 30px;
    color: white;
    margin-top: 30px;
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 5px;
    outline: none;
}


.loveForm input::-webkit-input-placeholder {
    font-family: 'French Script MT';
    color: white;
}

.loveForm input::-moz-placeholder {
    font-family: 'French Script MT';
    color: white;
}

.loveForm input::-ms-placeholder {
    font-family: 'French Script MT';
    color: white;
}

.loveForm input::placeholder {
    font-family: 'French Script MT';
    color: white;
}
#heart {
    position: relative;
    width: 100px;
    height: 90px;
    margin: 0 auto;
}

.beat1 {
    animation: heartbeat 1s infinite;
}

.beat2 {
    animation: heartbeat 0.6s infinite;
}
.beat3 {
    animation: heartbeat 0.3s infinite;
}
#heart:before,
#heart:after {
    position: absolute;
    content: "";
    left: 45px;
    top: 50px;
    width: 90px;
    height: 140px;
    background: red;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

#heart:after {
    left: -45px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}



@keyframes heartbeat {
    0% {
        transform: scale( .75 );
    }

    20% {
        transform: scale( 1 );
    }

    40% {
        transform: scale( .75 );
    }

    60% {
        transform: scale( 1 );
    }

    80% {
        transform: scale( .75 );
    }

    100% {
        transform: scale( .75 );
    }
}

@media only screen and (max-width: 1300px) {
    .predictionArea {
        width: 400px;
        height: 500px;
        margin-left: 50px;
    }

    .loveForm {
        width: 300px;
        margin-left: calc((100% - 800px)/2);
    }
}

@media only screen and (max-width: 900px) {
    .predictionArea {
        float:left;
        margin-top:40px;
        margin-left:10px;
        width: calc(100% - 20px);
        margin-top: 20px;

    }

    .loveForm {
        width: calc(100% - 20px);
        margin-left: 10px;
    }
}
</style>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
    },
    data(){
        return {
            p1:null,
            p2:null,
            hiddenCrush:false,
            inputStatus:"",
            wordStatus: "hide name"
        }
    },
    mounted(){
    },
    methods:{
        handleSubmit(){
            this.calcLove(this.p1,this.p2);
        },
        toggleVisibility(){
            this.hiddenCrush = !this.hiddenCrush;
            if (this.hiddenCrush){
                this.inputStatus = "password"
                this.wordStatus = "unhide name";
            }else{
                this.inputStatus = "";
                
                this.wordStatus = "hide name";
            }
        },
        calcLove(p1, p2) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '1d601c5192msh028b17e22b33282p1d211fjsnbf8bda1ddc31',
                    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
                }
            };

            document.getElementById("score").innerHTML = "calculating...";
            document.getElementById("score").classList.add("loading");
            fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + p1 + '&fname=' + p2, options)
            .then((Response) => {
                return Response.json()
            }).then((response) => {
                console.log(response);

                document.getElementById("score").classList.remove("loading");
                document.getElementById("score").innerHTML = response.percentage + "%";
                if (this.hiddenCrush)
                    p2 = "\"your crush\"";

                var resultText = "";

                document.getElementById("heart").classList.remove("beat1");
                document.getElementById("heart").classList.remove("beat2");
                document.getElementById("heart").classList.remove("beat3");
                if (response.percentage < 10) {
                    document.getElementById("heart").hidden = "hidden";
                    resultText = "ain't no way. stay away from " + p2 + " :(";
                } else if (response.percentage < 20) {
                    document.getElementById("heart").hidden = "hidden";
                    resultText = "Nah, u two aren't fit";
                } else if (response.percentage < 40) {
                    document.getElementById("heart").hidden = "hidden";
                    resultText = "tbh it prob wont work out";
                } else if (response.percentage < 60) {
                    document.getElementById("heart").hidden = "hidden";
                    resultText = "you have a chance?";
                } else if (response.percentage < 80) {
                    document.getElementById("heart").hidden = "";
                    document.getElementById("heart").classList.add("beat1");
                    resultText = "sheeesh, you two are compatitible";
                } else if (response.percentage < 90) {
                    document.getElementById("heart").hidden = "";
                    document.getElementById("heart").classList.add("beat2");
                    resultText = "Ohh Yea! go ask " + p2 + " out NOW!";
                } else if (response.percentage <= 100) {
                    document.getElementById("heart").hidden = "";
                    document.getElementById("heart").classList.add("beat3");
                    resultText = "Wasai! just MARRY " + p2 + " already!!";
                }
                document.getElementById("description").innerHTML = resultText;
            })
            .catch(err => console.error(err));
        }
    }

    
})
</script>
