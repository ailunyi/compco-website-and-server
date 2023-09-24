<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
</script>
<template>
    
    <main>
        <div hidden id="sectionResize">
            <div class="overlay"> </div>
            <div class="imageCropper" id="imageResize"></div>
            <button @click="handleImageCrop()" class="cropImageButton" id="crop"><span class='fa fa-crop'></span> Crop</button>
        </div>
        <section class="hidden" id="sectionResize">
            <div class="image-resize" id="imageResize"></div>
            <button class="btn" id="crop"><span class='fa fa-crop'></span> Crop</button>
        </section>
        <div id="nav-placeholder"></div>

        <div @click="closeOverlay()" class="overlay"></div>
        <div class="popup">
            <form id="area1" @submit.prevent="handleSubmit()">

                <div class="font-franklin text-2xl mt-5 ml-10">Basic Info<label class="text-red-600 text-xl">*</label></div>
                <div class="flex">
                    <input class="inputArea" id="name" v-model="name" type="text" placeholder="Club Name..."/>
                    <button type="button" v-if="extras()" @click="showExtras=!showExtras" class="dropdownButton" :class="{flip180: showExtras}">V</button>
                </div>
                <div id="extras" v-if="this.showExtras" class="absolute z-50 bg-[--main-bg-color] w-full">
                    <input class="inputArea" id="leader" v-model="leader" type="text" placeholder="Your leader(s): (optional)"/>
                    <input class="inputArea" id="admin" v-model="admin" type="text" placeholder="Your admin(s): (optional)"/>
                </div>

                <div class="font-franklin text-2xl mt-3 ml-10">Category<label class="text-red-600 text-xl">*</label></div>
                <div class="flex"> <!--categories-->
                    <div class="app flex flex-col w-3/6 min-w-fit max-w-full pl-10 pr-5 mt-[5px] cursor-pointer" @click="this.cat1Open=!this.cat1Open">
                        <section class="w-full bg-[#e8e8e8] rounded-lg font-montserrat">
                            <div class="p-2 py-6 text-[#9ca3af]">{{this.cat1Placeholder}}</div>
                            <div v-if="this.cat1Open">
                                <ul class="rounded-lg border shadow list-reset w-full mt-1 absolute z-20 bg-[#e8e8e8]">
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat1('None','Choose Category')">Choose Category</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat1('Subject','Subject')">Subject</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat1('Sports','Sports')">Sports</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat1('Hobbies','Hobbies')">Hobbies</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat1('Other','Other')">Other</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div v-if="this.cat1==='Subject'" class="app flex flex-col w-3/6 min-w-fit max-w-full pl-5 pr-10 mt-[5px] cursor-pointer" @click="this.cat2Open=!this.cat2Open">
                        <section class="w-full bg-[#e8e8e8] rounded-lg font-montserrat">
                            <div class="pl-2 py-6 text-[#9ca3af]">{{this.cat2PlaceHolder}}</div>
                            <div v-if="this.cat2Open">
                                <ul class="rounded-lg border shadow list-reset w-full mt-1 absolute z-20 bg-[#e8e8e8]">
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('None','Choose Category')">Choose Category</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Math','Math')">Math</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Chemistry','Chemistry')">Chemistry</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Economics','Economics')">Economics</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Business','Business')">Business</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Physics','Physics')">Physics</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Computer Science','Computer Science')">Computer Science</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Chinese','Chinese')">Chinese</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('History','History')">History</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Biology','Biology')">Biology</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('English','English')">English</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Innovation','Innovation/Science Fair')">Innovation/Science Fair</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Debate','Debate')">Debate</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Other','Other')">Other</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div v-if="this.cat1==='Sports'" class="app flex flex-col w-3/6 min-w-fit max-w-full pl-5 pr-10 mt-[5px] cursor-pointer" @click="this.cat2Open=!this.cat2Open">
                        <section class="w-full bg-[#e8e8e8] rounded-lg font-montserrat">
                            <div class="pl-2 py-6 text-[#9ca3af]">{{this.cat2PlaceHolder}}</div>
                            <div v-if="this.cat2Open">
                                <ul class="rounded-lg border shadow list-reset w-full mt-1 absolute z-20 bg-[#e8e8e8]">
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('None','Choose Category')">Choose Category</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Tennis','Tennis')">Tennis</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Basketball','Basketball')">Basketball</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Volleyball','Volleyball')">Volleyball</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Hockey','Hockey')">Hockey</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Badminton','Badminton')">Badminton</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Table Tennis','Table Tennis')">Table Tennis</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Soccer','Soccer')">Soccer</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Other','Other')">Other</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div v-if="this.cat1==='Hobbies'" class="app flex flex-col w-3/6 min-w-fit max-w-full pl-5 pr-10 mt-[5px] cursor-pointer" @click="this.cat2Open=!this.cat2Open">
                        <section class="w-full bg-[#e8e8e8] rounded-lg font-montserrat">
                            <div class="pl-2 py-6 text-[#9ca3af]">{{this.cat2PlaceHolder}}</div>
                            <div v-if="this.cat2Open">
                                <ul class="rounded-lg border shadow list-reset w-full mt-1 absolute z-20 bg-[#e8e8e8]">
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('None','Choose Category')">Choose Category</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Game Jam','Game Jam')">Game Jam</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Gaming','Gaming')">Gaming</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Eating','Eating')">Eating</li>
                                    <li class="list-reset m-0 p-2 border-b text-[#9ca3af] hover:bg-blue-500 hover:text-black" @click="changecat2('Other','Other')">Other</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="font-franklin text-2xl mt-3 ml-10">School</div>
                <div class="app flex-col w-4/5 min-w-fit max-w-full pl-10 mt-[5px]">
                    <section class="w-full bg-[#e8e8e8] rounded-lg">
                        <input id="school" type="text" class="  py-5 px-2 w-full font-montserrat" v-model="schoolFilter" :placeholder="schoolPlaceholder"/>
                        <div v-if="filteredItems && schoolFilter">
                            <ul class="absolute z-50 bg-[#e8e8e8] overflow-y-scroll max-h-48 rounded border shadow list-reset w-full mt-1">
                            <li class="list-reset m-0 p-2 border-b text-gray-500" @click="setSchool('None')" style="cursor:pointer;">None</li>
                            <li v-for="item in filteredItems()" class="list-reset m-0 p-2 border-b text-gray-500" @click="setSchool(item)" style="cursor:pointer;">{{item}}</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div class="font-franklin text-2xl mt-3 ml-10">Description<label class="text-red-600 text-xl">*</label></div>
                <textarea maxlength="1000" @input="" id="description" v-model="description" placeholder="Tell us about yourselves..."></textarea>







                <div class="font-franklin text-2xl mt-3 ml-10">Club Banner<label class="text-red-600 text-xl">*</label></div>
                <div class="flex">
                    <div class="picArea" id="drop1" @click="triggerImageSelection('preview1') " @drop="dropImage()" @dragover="startDrag('preview1')" @dragleave="dragleave('preview2')" :class="{'dragging':dragging1}">
                        <div>Click Or Drag In Image/Gif</div>
                        <img hidden id="logo" src="#" alt="cropping image..." />
                    </div>
                    <input hidden ref="preview1" class="inputfile" id="preview1" type="file" accept="image/*" @change="selectImage($event,'logo')" />
                
                
                
                    <div class="font-montserrat text-5xl self-center py-8 ml-[5%] mb-[2.5%]">
                    <button type="submit" class="bg-gray-700 p-5 rounded-lg">Create Club</button>
                    <div id="form_message_box" class="form__message form__message--success"></div>
                    </div>
                </div>
            
            
            
            </form>
        </div>
    </main>
</template>
    
  
<style scoped>
main{
    position: fixed;
    z-index: 3;
    display: flex;
    width:100vw;
    height:100vh;
    align-items: center;
    justify-content: center;
}

.popup{
    width:1000px;
    height:800px;
    margin: 50px;
    border-radius: 10px;
    background-color:var(--main-bg-color);
}

.overlay{
    position: fixed;
    height:100vh;
    width:100vw;
    background-color: rgba(0,0,0,0.5);

}

.dropdownButton{
    font-family: Montserrat-Bold;
    font-size: 20px;
    background-color:#e8e8e8;
    color: #151515;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 4px;
    height: 50%;
    align-self: center;
    transform: rotate(0deg);
    transition: 0.3s ease;
}
.flip180 {
  transform: rotate(180deg);
  transition: 0.3s ease;
}
.dropdownButton:active{
    transform: rotate(180deg);
    transition: 0.5s;
}

.form__message {
    font-size: 20px;
    margin-top: 10px;
    font-family: Montserrat-Bold;
}

.form__message--success {
    color: green;
}

.form__message--error {
    color: red;
}

.inputArea {
    width: 80%;
    margin-left: 40px;
    margin-right: 5px;
    height: 70px;
    font-size: 15px;
    background-color: #e8e8e8;
    border:solid;
    padding-left: 10px;
    font-family: Montserrat-Bold;
    color: #000;
    border-radius: 8px;
    border-color: #000;
    outline: none;
}

textarea {
    width: calc(80% - 10px);
    margin-top: 5px;
    margin-left: 40px;
    min-height: 100px;
    font-size: 15px;
    background-color: #e8e8e8;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: Montserrat-Bold;
    resize:vertical;
    border-radius: 8px;
}


.picArea {
    margin-top: 10px;
    margin-left: 40px;
    margin-bottom: 40px;
    text-align: center;
    min-height: 200px;
    font-size: 15px;
    display: inline-block;
    width: 50%;
    background-color: #e8e8e8;
    border: none;
    padding-top: 10px;
    font-family: Montserrat-Bold;
    border-radius: 8px;
    cursor: pointer;
    padding-right: 30px;
    padding-left: 30px;
}
.picArea img {
    margin-top: 10px;
    margin-bottom: 10px;
    height:200px;
    width:300px;
    object-fit: contain;
    /*
    height:200px;
    width:200px;*/
}
.compImage {
    float:left;
    margin-left:20%;

    height: auto !important;
    width: 60% !important;

    min-height: 300px;
    max-height: 500px;

    
    background-color: black;
    color:white;
}
.compImage:hover {
    filter: grayscale(0.6);
    box-shadow:0px 0px 3px 1px red;
}
.imageCropper {
    z-index: 3;
    position: fixed;
    top: 50px;
    background-color: var(--main-bg-color);
    height: 600px;
    width: 600px;
    top: calc((100vh - 600px)/2);
    left: calc((100vw - 600px)/2);
    border-radius: 10px;
}
.picArea:hover {
    box-shadow: 0px 0px 3px 1px var(--main-text-color);
}
.dragging {
    border: dashed var(--main-text-color) 2px;
}
.hidden {
    display: none;
}

.croppingImage{
    max-width:100%;
    max-height:500px;
}

.cropImageButton {
    position: fixed;
    margin-top: 50px;
    z-index: 4;
    width: 150px;
    top: calc((100vh - 600px)/2 + 500px);
    left: calc((100vw - 150px)/2);
    padding: 8px 25px;
    font-family: "Ubuntu";
    font-size: 16px;
    color: #e8e8e8;
    background-image: linear-gradient(to bottom, #c92437 10%, #4F1118);
    border: 0;
    border-radius: 5px;
    box-shadow: 1px 1px 2px rgba(0,0,0,.3);
    cursor:pointer;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.fa:first-child {
    margin-right: 5px;
}

</style>


<script>
import { defineComponent } from 'vue';
import Cropper from 'cropperjs'
import fuzzaldrin from 'fuzzaldrin';

const schools = ['a','b','c','d','e','f',];

export default defineComponent({
    props:["caption","username","images","communities"],
    mounted() {
        let externalScript = document.createElement('script');
        externalScript.setAttribute('src', "https://cdn.bootcss.com/cropperjs/1.5.1/cropper.min.js");
        document.head.appendChild(externalScript);
        externalScript.setAttribute('src',"https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.min.js");
        document.head.appendChild(externalScript);
        externalScript.setAttribute('src',"../assets/imageCrop/imageCrop.js");
        document.head.appendChild(externalScript);
    },
    data() {
        return {
            name: '',
            showExtras: false,
            leader: '',
            admin: '',
            school: '',
            schoolFilter: '',
            schoolPlaceholder: 'Gimme a school...',
            description: '',
            cat1: 'None',
            cat1Open: false,
            cat1Placeholder: 'Choose Category',
            cat2: 'None',
            cat2Open: false,
            cat2PlaceHolder: 'Choose Category',
            dragging1:false,
            dragging2:false,
            cropper: null,
            fileType: null,
            previewID2: null,
            file2: null,     
            compImages: [],
            croppedDetails: [],
            croppedImagesId: [],
            croppedBanner: null,
            croppedBannerDetails: null,
            uploadedCount: 0,
            chooseImage:true,
        };
    },
    methods:{
        closeOverlay(){
            this.$emit('popupStatus', 'close');
        },
        auto_grow(element) {
            element = element.target;
            element.style.height = "5px";
            element.style.height = (element.scrollHeight + 10)+"px";
        },
        extras(){
            return !!this.name.trim();
        },
        filteredItems(){
        if(this.schoolFilter === "")
            return schools;
        return fuzzaldrin.filter(schools, this.schoolFilter, {});
        },
        setSchool(sch){
            this.schoolFilter = "";
            this.school = sch;
            this.schoolPlaceholder = "Selected: "+sch;
        },
        changecat1(cat,ph){
            this.cat1 = cat;
            this.cat1Placeholder = ph;
            this.cat2Open = false;
            this.changecat2("None","Choose Category");
        },
        changecat2(cat,ph){
            this.cat2 = cat;
            this.cat2PlaceHolder = ph;
        },
        startDrag(previewID){
            if (previewID == 'preview1')
                this.dragging1 = true;
            else
                this.dragging2 = true;
        },
        dragleave(previewID){
            this.dragging1 = false;
            this.dragging2 = false;
        },
        dropImage(previewID){
            this.dragleave(previewID);
            triggerImageSelection.selectImage(previewID);
        },
        triggerImageSelection(previewID) {
            if (this.chooseImage){
                const elem = this.$refs[previewID];
                elem.click();   
            }
        },
        selectImage(e, previewID) {
            document.body.classList.add('stop-scrolling');
            var input = e.target;
            let that = this;
            if (input.files && input.files[0]) {
                var file = input.files[0];
                if (file.type.indexOf('image') === -1) {
                    alert('File is not an image');
                    return false;
                }
                console.log(file);
                var reader = new FileReader();
                reader.onload = function (event) {
                    var img = new Image();
                    img.onload = function () {
                        // if (img.width < 200 || img.height < 200) {
                        //     alert('Sorry, the image you uploaded is not large enough.');
                        //     return false;
                        // }
                        that.fileType = file.type;
                        that.previewID2 = previewID;
                        that.file2 = file;
                        that.cropImage(img);
                    }
                    img.src = event.target.result;
                }
                reader.readAsDataURL(file);
            }
            input.value = "";
        },
        clearDropshadow(e){
            e.stopPropagation();
            document.getElementById("drop2").style.boxShadow = "none";
            this.chooseImage = false;
        },
        unclearDropshadow(e){
            document.getElementById("drop2").style.boxShadow = "0px 0px 3px 1px var(--main-text-color)";
            this.chooseImage = true;
            document.getElementById("drop2").onmouseout = function () {
                document.getElementById("drop2").style.boxShadow = "";
            }
        },

        setFormMessage(type, message) {
            const messageElement = document.getElementById("form_message_box");

            messageElement.textContent = message;
            messageElement.classList.remove("form__message--success", "form__message--error");
            console.log(`form__message--${type}`);
            messageElement.classList.add(`form__message--${type}`);
        },

        cropImage(originalImage) {
            originalImage.setAttribute('id', 'fullImage');
            originalImage.classList.add("croppingImage");
            console.log(originalImage);
            document.getElementById('imageResize').appendChild(originalImage);
            document.getElementById('sectionResize').removeAttribute('hidden');
            let that = this;

            var apR = 0;
            console.log(this.previewID2);
            if (this.previewID2 == "logo")
                apR = 3/2;
            else
                apR = NaN;
            
            this.cropper = new Cropper(originalImage, {
                dragMode: 'move',
                aspectRatio: apR,
                autoCrop: true,
                autoCropArea: 1,
                cropBoxResizable: true,
                viewMode:1,
                cropBoxMovable: true,
                movable: (that.fileType == "image/gif") ? false : true,
                zoomable: (that.fileType == "image/gif") ? false : true,
                ready: function () {
                }
            });
            //var newImage = new imageCrop('#fullImage', 200, 200);

        },
        handleImageCrop(){
            document.body.classList.remove('stop-scrolling');
            let that = this;
            var croppedImg = this.cropper.getCroppedCanvas({ 
                
                minWidth: (that.previewID2  == "logo") ? 300 : 500,
                minHeight: (that.previewID2  == "logo") ? 200 : 500,
                maxWidth: (that.previewID2  == "logo") ? 600 : 1920/2,
                maxHeight: (that.previewID2  == "logo") ? 400 : 1080/2,
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
                
            }).toDataURL("image/png");
            var img;
            if (this.previewID2 == "logo") {
                document.getElementById(this.previewID2).removeAttribute("hidden");
            } 

            var cropData = this.cropper.getData();
            var cropDataString = JSON.stringify({
                left: cropData.x /*+ (zoomRatio - 0.75) * cropData.width*/,
                upper: cropData.y /*+ (zoomRatio - 0.75) * cropData.height*/,
                right: cropData.x + cropData.width,
                lower: cropData.y + cropData.height
            });

            // if gif then post to server
            if (this.fileType == "image/gif") {
                const formData = new FormData();
                var zoomRatio = this.cropper.getImageData().naturalWidth / this.cropper.getImageData().width;
                //var zoomRatioH = cropper.getImageData().height / cropper.getImageData().naturalHeight;
                

                document.getElementById('sectionResize').setAttribute('hidden','hidden');
                formData.append('file', this.file2);

                formData.append("content", cropDataString);
                let that = this;
                fetch(common.serverAddress + "/cropGif", {
                    method: 'POST',
                    body: formData
                })
                .then((res) => res.blob()).then(function (data) {
                // Handle response 
                    console.log('Response: ', data);
                    var cropped = URL.createObjectURL(data);
                    console.log('cropped: ', cropped);
                    
                    document.getElementById(that.previewID2).removeAttribute("hidden");
                    that.croppedBanner = that.file2;
                    that.croppedBannerDetails = cropData;
                    document.getElementById(that.previewID2).setAttribute("src",cropped);
                    return data;
                })
                .catch(err => {
                    // Handle error 
                    console.log('Error message: ', err);
                });

            } else {
                this.croppedBanner = this.file2;
                this.croppedBannerDetails = cropData;
                document.getElementById("logo").src = croppedImg;
                document.getElementById('sectionResize').setAttribute('hidden','hidden');
            }
            
            document.getElementById('imageResize').innerHTML = "";
            this.cropper.destroy();
        },
        removeCompImage(el) {
            
            var element = el.target;
            for (var i =0; i<this.croppedImagesId.length; i++){
                if (this.croppedImagesId[i] == element.id){
                    this.croppedImagesId.splice(i,1);
                    this.croppedDetails.splice(i,1);
                    this.compImages.splice(i,1);
                }
            }
            
            element.remove();
            document.getElementById("drop2").style.boxShadow = "0px 0px 3px 1px var(--main-text-color)";
            this.delay(10).then(() =>this.chooseImage = true);
            document.getElementById("drop2").onmouseout = function () {
                document.getElementById("drop2").style.boxShadow = "";
            }
        },
        validate(details) {
            if (details.sessionId == null) {
                this.setFormMessage("error","Not logged in");
                return false;
            }
            if (details.name.length < 3) {
                this.setFormMessage("error", "Name length too short");
                return false;
            }
            if (details.cat1 == "None" || details.cat1 == undefined || ((details.cat2 == "None" || details.cat2 == undefined) && details.cat1 != "Other")) {
                this.setFormMessage("error","Please choose a category");
                return false;
            }
            if (details.school == "" || details.school == undefined) {
                this.setFormMessage("error","Please select a school");
                return false;
            }
            if (details.description.length < 20) {
                this.setFormMessage("error", "Description too short");
                return false;
            }
            if (details.logo == null) {
                this.setFormMessage("error","Please upload a banner");
                return false;
            }
                
            return true;
        },
        handleSubmit(){
            const details = new Object();
            
            details.banner = this.croppedBanner;
            details.croppedBannerDetails = this.croppedBannerDetails;
            details.croppedDetails = this.croppedDetails;

            details.name = document.querySelector("#name").value;
            // details.leader = this.leader;
            // details.admin = this.admin;
            details.school = this.school;
            details.description = this.description;
            details.cat1 = this.cat1;
            details.cat2 = this.cat2;

            details.sessionId = common.sessionID;
            
            // validate
            if (this.validate(details)) {

                this.createCompetition(details)
                    
                this.setFormMessage("success", "loading, please wait...");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // toggleVisibilityNoFade("area1");
                // toggleVisibility("area2");
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
    }
})
</script>