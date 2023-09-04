<script setup>

    import common from "../../assets/common"
    import Post from "../../components/post.vue"
    import popup from '../../components/popup.vue'
</script>

<template>
    <main>
        <div v-if="posts[0] != null" class="postsFeed">
            <div class="sortingArea"></div>
            <Post v-for="post in posts" :key="post" :username="post.username" :caption="post.caption" :images="post.images" :communities="post.communities" />     
        </div>
        <div v-else class="postsFeed">
            <div class="sortingArea"></div>
            <Post v-for="post in posts" :key="post"/>     
        </div>

        <div>
            <div class="communityIntro" v-if="isCommunity">
                <div style="font-size: 18px;">{{ communityName }}</div>
                <div class="aboutCommunity skeleton"></div>
                <hr>
                <div class="aboutCommunity skeleton"></div>
                <button class="postButton">post</button>
            </div>
            <div class="chatArea" v-if="isCommunity">

            </div>
        </div>
        
    </main>
</template>

<style scoped>
main{
    margin-left:260px;
    width:calc(100vw - 270px);
    height: calc(100vh - 60px); 
    margin-top: 60px;
    padding-bottom: 30px;
    overflow-y: scroll;

    display: flex;
    justify-content: center;
    gap:30px;
}

.communityIntro hr{
    margin-top: 10px;
    height:1px;
    border:none;
    border-radius: 5px;
    background-color:rgba(0,0,0,0.4);
}
.sortingArea{
    margin-top: 20px;
    border-radius: 10px;
    width:100%;
    height:50px;
    background-color:var(--main-panel-color);
}
.aboutCommunity{
    width:100%;
    word-wrap: break-word;
    min-height: 200px;
    border-radius: 10px;
    margin-top:10px;
}
.communityIntro{
    margin-top: 60px;
    border-radius: 10px;
    width:400px;
    background-color: var(--main-panel-color);
    padding:10px;
    font-family: Montserrat-SemiBold;
}

.postButton{
    width:100%;
    background-color: var(--main-panel-color);
    color:var(--main-bg-color);
    border-radius: 10px;
    height:40px;
    font-size: 18px;
    margin-top: 20px;
}

.postButton:hover{
    background-color: var(--main-text-color);
}
.chatArea{
    margin-top: 30px;
    border-radius: 10px;
    height:400px;
    width:400px;
    background-color: var(--main-panel-color);
}

.postsFeed{
    height:100%;
    width:1000px;
}

</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    
    setup() {
    },
    data(){
        return {
            posts: new Array(10),
            isCommunity:false,
            communityName:""
        }
    },
    mounted(){
        
        if (this.$route.params.community){
            this.$emit('page', 'community/'+this.$route.params.community);
            this.isCommunity = true;
            this.communityName = this.$route.params.community + " Community";
        }
        else
            this.getCommunityPosts();
    },
    methods:{
        getCommunityPosts() {
            let that = this;
            fetch(common.serverAddress + "/communities/explore").then((Response) => {
                return Response.json()
            }).then((data) => {
                console.log(JSON.parse(data));
                that.posts = JSON.parse(data);
            })
        }
    }

    
})
</script>
