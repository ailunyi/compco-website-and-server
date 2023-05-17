
<template>
    <footer class="footer">
        <!-- FOOTER -->
        <div class="footerDescription">
            <img src="../assets/images/logo.png" class="bottomLogo" />
            <label>CompCo</label>
            <div>a platform for students by students</div>
        </div>
        <div class="footerLinks">
            <router-link to="" target="_blank" href="https://b23.tv/wKBqDaG">
                <div>
                    <img src="../assets/images/footer/bilibili.png" />
                </div>
            </router-link>
            <router-link to="" target="_blank" href="https://b23.tv/wKBqDaG">
                <div>
                    <img style="width:35px; margin-left:7.5px" src="../assets/images/footer/tiktok.png" />
                </div>
            </router-link>
            <router-link to="" id="wechatIcon">
                <div>
                    <img style="width:40px; margin-left:5px"  src="../assets/images/footer/wechat.svg" />
                </div>
            </router-link>
            <div id="wechatIconPopup">
                <img src="../assets/images/footer/qrCode.jpg">
            </div>
        </div>
        <div class="footerCompanyCategory">
            <label lang="en">More</label>
            <a lang="en" href="/about-us">About Us</a>
            <a lang="en" href="/about-us">Timeline</a>
            <a lang="en" href="/about-us">Privacy Policy</a>
            <a lang="en" href="/about-us">Terms & Conditions</a>
            <a lang="en" href="/about-us">Sponsors/Partners</a>

            <label v-if="language == 'zh'" lang="zh">更多</label>
            <a v-if="language == 'zh'" lang="zh" href="/about-us">关于我们</a>
            <a v-if="language == 'zh'" lang="zh" href="/about-us">时间线</a>
            <a v-if="language == 'zh'" lang="zh" href="/about-us">隐私政策</a>
            <a v-if="language == 'zh'" lang="zh" href="/about-us">条款和条件</a>
            <a v-if="language == 'zh'" lang="zh" href="/about-us">赞助商/合作伙伴</a>
        </div>
        <div class="trademarkText">
            © 2022-2023 COMPCO, All Rights Reserved
        </div>
    </footer>
</template>

<style scoped>

/*FOOTER*/
.footer {
    position: relative;
    margin-top: 100px;
    padding: 0;
    height: 260px;
    width: 100%;
    background-color: var(--secondary-bg-color);
    transition: background-color 1s;
    left: 0px;
    overflow: none;
}
.footerDescription {
    position: absolute;
    left: calc(50% - 300px);
    top:10px;

}
.footerLinks {
    position: absolute;
    left: calc(50% - 300px);
    top: 130px;
}
.footerLinks a div {
    margin-right: 10px;
    float: left;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--main-text-color);
}
.footerLinks a div:hover {
    border-radius: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--main-button-color);
}
.footerLinks a div img{
    width:50px;
    height:40px;
    margin-top:5px;
}
.footerDescription label { /*COMPCO TITLE*/

    font-family: Montserrat-Bold;
    float: left;
    font-size:25px;
    margin-left: 10px;
    margin-top: 15px;
}
.footerDescription div {
    margin-left: 10px;
    margin-top: 70px;
    font-size: 17px;
}

.footerCompanyCategory {
    margin-top:10px;
    position: absolute;
    left: calc(50% + 200px);
    top: 10px;
}

.footerCompanyCategory label {
    font-size: 22px;
    font-family: Montserrat-Bold;
    color: var(--main-text-color);
    transition: background-color 1s, color 1s;
}
.footerCompanyCategory a {
    display: block;
    margin-top: 2px;
    font-size: 15px;
    font-family: Montserrat-Medium;
    text-decoration: none;
    color: var(--main-text-color);
}
.footerCompanyCategory a:hover {
    color: var(--main-button-color);
}
.bottomLogo {
    float: left;
    height: 60px;
    width: 60px;
    position: relative;
}
.trademarkText {
    position: absolute;
    padding-top: 10px;
    height: 40px;
    bottom: 0px;
    font-size: 15px;
    color: var(--main-bg-color);
    width: 100%;
    text-align: center;
    background-color: var(--main-text-color);
    font-family: Montserrat-SemiBold;
    transition: background-color 1s, color 1s;
}
.navLogo {
    position: fixed;
    top: 5px;
    left: 10px;
    height: 60px;
}
#wechatIconPopup{
    
    display: none;
    align-items: center;
    justify-content: center;

    height:200px;
    width: 200px;
    background-color: var(--main-text-color);

    position: absolute;
    bottom:65px;
    left:50px;
}
#wechatIconPopup img{
    height:150px;
    width:150px;
}


#wechatIcon:hover + #wechatIconPopup{
    display: flex;
}
@media only screen and (max-width: 900px) {
    .footerCompanyCategory {
        display:none;
    }


    .footerLinks {
        left: 10px;
    }
    .footerDescription {
        left: 10px;
    }
}
/*FOOTER END*/
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    data(){
        return{     
            language:"eng"   
        }
    }
})
</script>
