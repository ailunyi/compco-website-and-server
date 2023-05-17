<script setup>
    import { onUnmounted, onMounted } from 'vue'
    import common from "../assets/common"
    import footerVue from '../components/footerVue.vue'
    
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

        <div class="mainContent" style="min-height: 50vh;" >
            <div class="title">Create Activity</div>
            <form id="area1" @submit.prevent="handleSubmit()" v-if="showArea==1">
                <div id="form_message_box" class="form__message form__message--success"></div>

                <div class="inputLabel">Activity Name <label class="star">*</label></div>
                <input class="inputArea" id="name" type="text" placeholder="Activity Name" />

                <div class="inputLabel">Activity Type <label class="star">*</label></div>
                <select id="type">
                    <option value="None">Choose Type</option>
                    <option value="Competition">Competition</option>
                    <option value="Event">Club/Event</option>
                    <option value="Summer">Summer/Winter Program</option>
                    <option value="Internship">Internship/Job</option>
                </select>


                <div class="inputLabel">Location <label class="star">*</label></div>
                <input class="inputArea" id="location" type="text" placeholder="Location" />

                <div class="inputLabel">Sign Up Location <label class="star">*</label></div>
                <input class="inputArea" id="signUpLocation" type="text" placeholder="Website link, wechat, etc." />

                <div class="inputLabel">Registration Deadline <label class="star">*</label></div>
                <input class="inputArea date" style="width:45%; " id="date1" type="date" value="2018-07-22" min="2018-01-01" />
                <input class="inputArea" style="width:45%; float:right; " id="time1" type="text" placeholder="Specific Time" />

                <div class="inputLabel">Activity Start Date <label class="star">*</label></div>
                <input class="inputArea date" style="width:45%; " id="date2" type="date" value="2018-07-22" min="2018-01-01" />
                <input class="inputArea" style="width:45%; float:right; " id="time2" type="text" placeholder="Specific Time" />


                <div class="inputLabel">Activity End Date <label class="star">*</label></div>
                <input class="inputArea date" style="width:45%; " id="date3" type="date" value="2018-07-22" min="2018-01-01" />
                <input class="inputArea" style="width:45%; float:right; " id="time3" type="text" placeholder="Specific Time" />



                <div class="inputLabel">Difficulty <label class="star">*</label></div>
                <select id="difficulty">
                    <option value="None">Choose Difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All">All skill levels</option>
                </select>


                <div class="inputLabel">Description <label class="star">*</label></div>
                <textarea @input="auto_grow($event)" id="description" placeholder="Description (20 letters minimum)"></textarea>

                <div class="inputLabel">Thumbnail/logo <label class="star">*</label></div>

                <div class="picArea" id="drop1" @click="triggerImageSelection('preview1') " @drop="dropImage()" @dragover="startDrag('preview1')" @dragleave="dragleave('preview2')" :class="{'dragging':dragging1}">
                    <div>Click Or Drag In Image/Gif</div>
                    <img hidden id="logo" src="#" alt="cropping image..." />
                </div>
                <input ref="preview1" class="inputfile" id="preview1" type="file" accept="image/*" @change="selectImage($event,'logo')" />

                <div class="inputLabel">Images (Multiple) <label class="star">*</label></div>
                <div class="picArea" id="drop2" @click="triggerImageSelection('preview2') " @drop="dropImage()" @dragover="startDrag('preview2')" @dragleave="dragleave('preview2')" :class="{'dragging':dragging2}">
                    <div>Click Or Drag To Add Image/Gif</div>   
                    <img v-for="image in compImagesPics" class="compImage"
                    @mouseover="clearDropshadow($event)" @mouseleave="unclearDropshadow($event)" 
                        :key="image" :src="image" @click="removeCompImage($event)" alt="cropping image..."/>
                </div>
                <input ref="preview2" class="inputfile" id="preview2" type="file" accept="image/*" @change="selectImage($event,'image')" />


        
                <div class="inputLabel">Contact</div>
                <input class="inputArea" id="contact" type="text" placeholder="Contact Information (website, wechat, etc.)" />

                <div class="inputLabel">Requirements</div>
                <input class="inputArea" id="requirements" type="text" placeholder="Requirements for participation" />
                
                <div class="inputLabel">Fee</div>
                <input class="inputArea" id="fee" type="text" placeholder="Cost for participation (leave blank if free)" />

                <div class="inputLabel">Prize</div>
                <input class="inputArea" id="prize" type="text" placeholder="Prize" />

                <div class="inputLabel">Organization</div>
                <input class="inputArea" id="organization" type="text" placeholder="Organization/Club Name" />
                

                <div class="inputLabel">Category <label class="star">*</label></div>
                <select id="mainCategories">
                    <option value="None">Choose Category</option>
                    <option value="Subject">Subject</option>
                    <option value="Sports">Sports</option>
                    <option value="Hobbies">Hobbies</option>
                    <option value="Other">Other</option>
                </select>

                <select id="subject" hidden>
                    <option value="None">Choose Subject</option>
                    <option value="Math">Math</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Economics">Economics</option>
                    <option value="Business">Business</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Chinese">Chinese</option>
                    <option value="History">History</option>
                    <option value="English">English</option>
                    <option value="Innovation">Innovation/Science Fair</option>
                    <option value="Debate">Debate</option>
                    <option value="Other">Other</option>
                </select>

                <select id="sports" hidden>
                    <option value="None">Choose Sport</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Hockey">Hockey</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Table Tennis">Table Tennis</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Other">Other</option>
                </select>

                <select id="hobbies" hidden>
                    <option value="None">Choose Hobby</option>
                    <option value="Game Jam">Game Jam</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Eating">Eating</option>
                    <option value="Other">Other</option>
                </select>
                <!--<div>Once you submit, your competition will be avaliable once we approve it.</div>-->
                <button type="submit">Submit</button>
            </form>
            <transition>
                <form id="area2" v-if="showArea==2" >
                    <div class="submittionInfo">Congrats! Your competition is now under review.</div>
                    <!--<button type="submit" id="submit" value="next">Submit</button>
                    <button type="submit" id="back" value="back">Back</button>-->
                </form>    
            </transition>
            
        </div>
        <footerVue></footerVue>
    </main>
</template>

<style scoped>
@import '../assets/imageCrop/imageCrop.css';
@import "https://cdn.bootcss.com/cropperjs/1.5.1/cropper.min.css";
body {
    background-repeat: no-repeat;
    background-size: cover;
}

.fade{
    opacity: 0;
    Transition: opacity 3s;
}

.inputArea {
    width: calc(80% - 10px);
    margin-top: 10px;
    height: 70px;
    font-size: 15px;
    background-color: #E8E8E8;
    border: none;
    padding-left: 10px;
    font-family: Montserrat-Bold;
    border-radius: 12px;
    outline: none;
}

.inputArea:focus {
    box-shadow: 0px 0px 4px 1px var(--main-text-color);
}

.picArea {
    margin-top: 10px;
    text-align: center;
    min-height: 200px;
    font-size: 15px;
    display: inline-block;
    min-width: 70%;
    background-color: #E8E8E8;
    border: none;
    padding-top: 10px;
    font-family: Montserrat-Bold;
    border-radius: 12px;
    cursor: pointer;
    padding-right: 30px;
    padding-left: 30px;
}

input[type="file"] {
    display: none;
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


.mainContent select {
    width: 60%;
    margin-top: 15px;
    height: 70px;
    font-size: 15px;
    background-color: #E8E8E8;
    border: none;
    padding-left: 10px;
    font-family: Montserrat-Bold;
    cursor: pointer;
    border-radius: 12px;
}

.inputFile {
}

.submittionInfo{
    text-align:center;
    width:100%;
    font-size:20px;
}


.title {
    font-family: Montserrat-Bold;
    font-size: 45px;
    margin-bottom: 40px;
}

.mainContent textarea {
    width: calc(80% - 10px);
    margin-top: 10px;
    min-height: 100px;
    font-size: 15px;
    background-color: #E8E8E8;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: Montserrat-Bold;
    resize:vertical;
    border-radius: 12px;
}


.mainContent button {
    padding: 20px;
    width: 150px;
    font-size: 20px;
    font-family: Montserrat-Bold;
    color: white;
    background-color: var(--main-button-color);
    border: none;
    margin-top: 40px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: calc((100% - 150px)/2);
}


.form__message {
    font-size: 20px;
    font-family: Montserrat-Bold;
}

.form__message--success {
    color: green;
}

.form__message--error {
    color: red;
}

.inputLabel {
    margin-top:50px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.star{
    color:red;
}

.overlay {
    z-index: 2;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: var(--main-panel-color);
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
    color: #fff;
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

@media only screen and (max-width: 900px) {
    
    .mainContent textarea {
        width: calc(100% - 10px);
    }

        
    .inputArea {
        width: calc(100% - 10px);
    }

    
    .compImage {
        min-height: 100px;
    }

}
</style>


<script>
import { defineComponent } from 'vue'
import Cropper from 'cropperjs'

export default defineComponent({
    mounted() {
        let externalScript = document.createElement('script');
        externalScript.setAttribute('src', "https://cdn.bootcss.com/cropperjs/1.5.1/cropper.min.js");
        document.head.appendChild(externalScript);
        externalScript.setAttribute('src',"https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.min.js");
        document.head.appendChild(externalScript);
        externalScript.setAttribute('src',"../assets/imageCrop/imageCrop.js");
        document.head.appendChild(externalScript);

        if (common.sessionID == -1)
            window.location.href = '/';
            
        this.setDate();

        const type = document.getElementById("type");

        
        let that = this;
        this.chosenType = "None";
        type.addEventListener("change", function () {
            that.chosenType = type.value;
        })

        const difficulty = document.getElementById("difficulty");
        difficulty.addEventListener("change", function () {
            that.chosenDifficulty = difficulty.value;
        })
        
        const category1 = document.getElementById("mainCategories");
        const categorySports = document.getElementById("sports");
        const categoryHobbies = document.getElementById("hobbies");
        const categorySubject = document.getElementById("subject");

        category1.addEventListener("change", function () {
            that.chosenCategory1 = category1.value;
            that.chosenCategory2 = "None";
            categorySports.value = "None";
            categoryHobbies.value = "None";
            categorySubject.value = "None";
            if (category1.value == "Subject") {
                document.getElementById("subject").hidden = "";
                document.getElementById("sports").hidden = "hidden";
                document.getElementById("hobbies").hidden = "hidden";
            }
            else if (category1.value == "Sports") {
                document.getElementById("subject").hidden = "hidden";
                document.getElementById("sports").hidden = "";
                document.getElementById("hobbies").hidden = "hidden";
            }
            else if (category1.value == "Hobbies") {
                document.getElementById("subject").hidden = "hidden";
                document.getElementById("sports").hidden = "hidden";
                document.getElementById("hobbies").hidden = "";
            } else {
                document.getElementById("subject").hidden = "hidden";
                document.getElementById("sports").hidden = "hidden";
                document.getElementById("hobbies").hidden = "hidden";
            }
        })
        categorySports.addEventListener("change", function () {
            that.chosenCategory2 = categorySports.value;
        })
        categoryHobbies.addEventListener("change", function () {
            that.chosenCategory2 = categoryHobbies.value;
        })
        categorySubject.addEventListener("change", function () {
            that.chosenCategory2 = categorySubject.value;
        })
    },
    data(){
        return {
            dragging1:false,
            dragging2:false,
            cropper: null,
            fileType: null,
            previewID2: null,
            file2: null,     
            compImages: [],
            croppedDetails: [],
            croppedImagesId: [],
            croppedLogo: null,
            croppedLogoDetails: null,
            uploadedCount: 0,
            compImagesPics:[],
            chooseImage:true,
            chosenType:"None",
            chosenDifficulty:"None",
            chosenCategory1: null,
            chosenCategory2:null,
            showArea:1
        }
    },
    methods:{
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
                    
                    if (that.previewID2 == "logo") {
                        document.getElementById(that.previewID2).removeAttribute("hidden");
                        that.croppedLogo = that.file2;
                        that.croppedLogoDetails = cropData;
                        document.getElementById(that.previewID2).setAttribute("src",cropped);
                    } else {
                        that.croppedImagesId.push(that.previewID2);
                        that.compImages.push(that.file2);
                        that.croppedDetails.push(cropData);
                        that.compImagesPics.push(cropped);
                    }
                    return data;
                })
                .catch(err => {
                    // Handle error 
                    console.log('Error message: ', err);
                });

            } else {
                
                if (this.previewID2 != "logo") {
                    this.croppedImagesId.push(this.previewID2);
                    this.compImages.push(this.file2);
                    this.croppedDetails.push(cropData);
                    
                    this.compImagesPics.push(croppedImg);
                } else {
                    this.croppedLogo = this.file2;
                    this.croppedLogoDetails = cropData;
                    document.getElementById("logo").src = croppedImg;
                }

                document.getElementById('sectionResize').setAttribute('hidden','hidden');
            }
            
            document.getElementById('imageResize').innerHTML = "";
            this.cropper.destroy();
        },
        //need serverside
        setDate() {
            // set min date to current date + 1

            var newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            let day = newDate.getDate() ;
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            if (month < 10)
                month = "0" + month;
            if (day < 10)
                day = "0"+day;
            let tmrDate = `${year}-${month}-${day}`;
            var elements =  document.getElementsByClassName("date");
            
            for (var i = 0; i < elements.length; i++){
                if (elements[i] != null){
                    elements[i].min = tmrDate;
                    elements[i].value = tmrDate;
                }
            }

        },
        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
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
        setFormMessage(type, message) {
            const messageElement = document.getElementById("form_message_box");

            messageElement.textContent = message;
            messageElement.classList.remove("form__message--success", "form__message--error");
            console.log(`form__message--${type}`);
            messageElement.classList.add(`form__message--${type}`);
        },
        auto_grow(element) {
            element = element.target;
            element.style.height = "5px";
            element.style.height = (element.scrollHeight + 10)+"px";
        },
        // need serverside
        validate(details,pics) {
            //session
            if (details.sessionId == null) {
                this.setFormMessage("error","Not logged in");
                return false;
            }
            
            //lengths
            if (details.name.length < 3) {
                this.setFormMessage("error", "name length too short");
                return false;
            }
            if (details.location.length < 5) {
                this.setFormMessage("error", "location length too short");
                return false;
            }
            if (details.description.length < 20) {
                this.setFormMessage("error", "description too short");
                return false;
            }

            // images
            if (pics.images.length < 1 || pics.logo == null) {
                this.setFormMessage("error","Please select logo and images");
                return false;
            }

            if (details.signUpLocation.length < 3) {
                this.setFormMessage("error", "sign up location too short");
                return false;
            }

            

            if (details.chosenType == "None"){
                this.setFormMessage("error","Please choose activity type");
                return false;
            }
            if (details.chosenDifficulty == "None"){
                this.setFormMessage("error","Please choose difficulty");
                return false;
            }

            // categories
            if (details.chosenCategory1 == "None" || details.chosenCategory1 == undefined || ((details.chosenCategory2 == "None" || details.chosenCategory2 == undefined) && details.chosenCategory1 != "Other")) {
                
                this.setFormMessage("error","Please choose category");
                return false;
            }
                
        
            return true;
        },

        // create competition
        createCompetition(details,pics) {
            const formData = new FormData();

            console.log(pics.logo)
            formData.append('files', pics.logo);
            for (var i = 0; i < pics.images.length; i++) {
                formData.append('files', pics.images[i]);
            }

            var compInfo = JSON.stringify({details});

            //console.log(compInfo);
            formData.append("content", compInfo );
            let that =this;
            fetch(common.serverAddress + "/createCompetition", {
                method: 'POST',
                body: formData
            })
            .then((res) => res.json()).then((data) => {
                // Handle response 
                console.log('Response: ', data);
                that.showArea = 2;
                return data;
            })
            .catch(err => {
                // Handle error 
                console.log('Error message: ', err);
                
                that.setFormMessage("error", "unkown server error, please try again later");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });


        },
        handleSubmit(){
            const details = new Object();
            const pics = new Object();
            
            pics.logo = this.croppedLogo;
            pics.images = this.compImages;
            details.croppedLogoDetails = this.croppedLogoDetails;
            details.croppedDetails = this.croppedDetails;

            details.name = document.querySelector("#name").value;
            details.location = document.querySelector("#location").value;
            details.signUpLocation = document.querySelector("#signUpLocation").value;

            details.dateRegister = document.querySelector("#date1").value;
            details.timeRegister = document.querySelector("#time1").value;
            details.dateStart = document.querySelector("#date2").value;
            details.timeStart = document.querySelector("#time2").value;
            details.dateEnd = document.querySelector("#date3").value;
            details.timeEnd = document.querySelector("#time3").value;

            details.description = document.querySelector("#description").value;
            details.contact = document.querySelector("#contact").value;
            
            details.requirements = document.querySelector("#requirements").value;
            details.organization = document.querySelector("#organization").value;
            details.fee = document.querySelector("#fee").value;
            details.prize = document.querySelector("#prize").value;

            details.sessionId = common.sessionID;
            
            details.chosenCategory1 = this.chosenCategory1;
            details.chosenCategory2 = this.chosenCategory2;

            details.chosenDifficulty = this.chosenDifficulty;
            details.chosenType = this.chosenType;
            // validate
            if (this.validate(details,pics)) {

                this.createCompetition(details,pics)
                    
                this.setFormMessage("success", "loading, please wait...");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // toggleVisibilityNoFade("area1");
                // toggleVisibility("area2");
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
})
</script>
