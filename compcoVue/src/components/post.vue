<template>
  <div class="main">
    <div class="post">
      <div class="postInfoArea">
        <div v-if="caption!=null" class="caption">{{ caption }}</div>
        <div v-if="username!=null" class="username">{{ username }}</div>
        <div v-if="communities!=null" class="username"></div>
      </div>
      <div v-if="images!=null" class="imageArea">
        <img v-for="image in images" :key="image" :src="image" alt="image">
      </div>
    </div>
    <div class="sideButtons">
      <button>Like</button>
      <button>Share</button>
    </div>
  </div>
    
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props:["caption","username","images","communities"],
    setup() {
      
    },
  })
  </script>
  

<style scoped>
.main{
  display: flex;
  flex-direction: row;
  font-family: Montserrat-semibold;
}
.sideButtons{
  height:150px;
  width:100px;
  margin-top: auto;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sideButtons button{
  width:60px;
  height: 60px;
  background-color: var(--main-panel-color);
  border-radius: 30px;
  margin-top: auto;
}
.username{
  color:var(--main-button-color)
}
.caption{
  font-size: 30px;
}
.postInfoArea{
  min-height: 100px;
  padding: 10px;
}
.imageArea{
  height:400px;
}
.post{
  margin-left:calc((100% - 800px)/2);
  width:800px;
  min-height:500px;
  margin-top: 20px;
  background-color: var(--main-panel-color);
  border-radius: 10px;
  cursor: pointer;
}

.post img{
  width:100%;
  height: 100%;
  border-radius: 1%;
}

.post:hover{
  outline: 1px solid var(--main-text-color);
}
/* Post styles here */
</style>