//var serverAdress = "http://localhost:8000/createCompetition"


function setFormMessage(type, message) {
    const messageElement = document.getElementById("form_message_box");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    console.log(`form__message--${type}`);
    messageElement.classList.add(`form__message--${type}`);
}

// need serverside
function validate(name, location, date, time, description, logo, images, prize, chosenCategory1, chosenCategory2, sessionId, contact) {
    //session
    if (sessionId == null) {
        setFormMessage("error","Not logged in");
        return false;
    }
    
    //lengths
    if (name.length < 3) {
        setFormMessage("error", "name length too short");
        return false;
    }
    if (location.length < 5) {
        setFormMessage("error", "location length too short");
        return false;
    }
    if (time.length < 4) {
        setFormMessage("error", "time too short");
        return false;
    }
    if (description.length < 20) {
        setFormMessage("error", "description too short");
        return false;
    }

    // images
    if (images.length < 1 || logo == null) {
        setFormMessage("error","Please select logo and images");
        return false;
    }

    if (contact.length < 5) {
        setFormMessage("error", "contact info too short");
        return false;
    }


    // categories
    if (chosenCategory1 == "None" || chosenCategory1 == undefined || ((chosenCategory2 == "None" || chosenCategory2 == undefined) && chosenCategory1 != "Other")) {
       
        setFormMessage("error","Please choose category");
        return false;
    }


    
   
    return true;
}

//need serverside
function setDate() {
    // set min date to current date + 1

    var newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let day = newDate.getDate() ;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    if (month < 10)
        month = "0" + month;
    let tmrDate = `${year}-${month}-${day}`;
    console.log(tmrDate); 
    var elements =  document.getElementsByClassName("date");
    for (var i = 0; i < elements.length; i++){
        if (elements[i] != null){

            elements[i].min = tmrDate;
            elements[i].value = tmrDate;
        }
    }

}
setDate();


function triggerImageSelection(previewID) {
    $(previewID).trigger('click');
}

// drag effects
$('#fileUpload').on('change', function (e) {
    addImage(e.target);
});

$("#drop1").on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragging');
});

$("#drop1").on("dragleave", function (e) {
    $(this).removeClass('dragging');
});

$("#drop1").on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    $(this).removeClass('dragging');
    var data = e.dataTransfer || e.originalEvent.dataTransfer;
    selectImage(data,"logo");
});
$("#drop2").on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragging');
});

$("#drop2").on("dragleave", function (e) {
    $(this).removeClass('dragging');
});

$("#drop2").on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass('dragging');
    var data = e.dataTransfer || e.originalEvent.dataTransfer;
    selectImage(data, "image");
});

// crop image
var cropper, fileType, previewID2, file2;
function selectImage(input, previewID) {
    $('body').addClass('stop-scrolling');
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
                if (img.width < 200 || img.height < 200) {
                    alert('Sorry, the image you uploaded is not large enough.');
                    return false;
                }
                fileType = file.type;
                previewID2 = previewID;
                file2 = file;
                cropImage(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);

    }

    input.value = "";
}

function cropImage(originalImage) {

    $(originalImage).attr('id', 'fullImage');
    $(originalImage).addClass("croppingImage");
    $('#imageResize').html(originalImage);
    $('#sectionResize').removeAttr('hidden');
    var apR = 0;
    console.log(previewID2);
    if (previewID2 == "logo")
        apR = 3/2;
    else
        apR = 16 / 9;
    
    cropper = new Cropper(originalImage, {
        dragMode: 'move',
        aspectRatio: apR,
        autoCrop: true,
        autoCropArea: 1,
        cropBoxResizable: true,
        viewMode:1,
        cropBoxMovable: true,
        movable: (fileType == "image/gif") ? false : true,
        zoomable: (fileType == "image/gif") ? false : true,
        ready: function () {
        }
    });
    //var newImage = new imageCrop('#fullImage', 200, 200);

}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function removeCompImage(el) {
    var element = el;
    element.remove();
    document.getElementById("drop2").style.boxShadow = "0px 0px 3px 1px var(--main-text-color)";
    delay(10).then(() =>document.getElementById("drop2").setAttribute("onClick", "triggerImageSelection('#preview2')"));
    document.getElementById("drop2").onmouseout = function () {
        document.getElementById("drop2").style.boxShadow = "";
    }
}
var compImages = []
var logo;
var uploadedCount = 0;
$('#crop').on('click', function () {
    // Get a string base 64 data url

    $('body').removeClass('stop-scrolling');

    var croppedImg = cropper.getCroppedCanvas({ maxWidth: 1920, maxHeight: 1080 }).toDataURL("image/png");
    var img;
    if (previewID2 == "logo") {
        $('#' + previewID2).removeAttr("hidden");
    } else {

        img = document.createElement("img");
        img.className = "compImage";
        img.id = "images-" + uploadedCount;
        previewID2 = "images-" + uploadedCount;
        uploadedCount += 1;
        img.onmouseover = function (e) {
            e.stopPropagation();
            document.getElementById("drop2").style.boxShadow = "none";
            document.getElementById("drop2").onclick = "";
        }
        img.onmouseout = function () {
            document.getElementById("drop2").style.boxShadow = "0px 0px 3px 1px var(--main-text-color)";
            document.getElementById("drop2").setAttribute("onClick", "triggerImageSelection('#preview2')");
            document.getElementById("drop2").onmouseout = function () {
                document.getElementById("drop2").style.boxShadow = "";
            }
        }
        img.setAttribute("onClick", "removeCompImage(this)");
        img.alt = "cropping image...";

        document.getElementById("drop2").appendChild(img);
    }

    // if gif then post to server
    if (fileType == "image/gif") {
        const formData = new FormData();
        var zoomRatio = cropper.getImageData().naturalWidth / cropper.getImageData().width;
        //var zoomRatioH = cropper.getImageData().height / cropper.getImageData().naturalHeight;
        console.log(zoomRatio);
        
        var cropData = cropper.getData();
        var cropDataString = JSON.stringify({
            left: cropData.x /*+ (zoomRatio - 0.75) * cropData.width*/,
            upper: cropData.y /*+ (zoomRatio - 0.75) * cropData.height*/,
            right: cropData.x + cropData.width,
            lower: cropData.y + cropData.height
        });
        

        $('#sectionResize').attr('hidden', 'hidden');
        formData.append('file', file2);

        formData.append("content", cropDataString);

        fetch(serverAddress + "/cropGif", {
            method: 'POST',
            body: formData
        })
        .then((res) => res.blob()).then(function (data) {
        // Handle response 
            console.log('Response: ', data);
            var cropped = URL.createObjectURL(data);
            console.log('cropped: ', cropped);
            $('#' + previewID2).removeAttr("hidden");
            $('#' + previewID2).attr('src', cropped);
            if (previewID2 != "logo") {
                compImages.push(data);
            } else {
                logo = data;
            }
            return data;
        })
        .catch(err => {
            // Handle error 
            console.log('Error message: ', err);
        });

    } else {

        $('#' + previewID2).attr('src', croppedImg);
        $('#sectionResize').attr('hidden', 'hidden');
        if (previewID2 != "logo") {
            compImages.push(croppedImg);
        } else {
            logo = croppedImg;
        }
    }

});


// create competition
function createCompetition(name, location, date, time, description, logo, images, prize, chosenCategory1, chosenCategory2,  sessionId, contact) {
    const formData = new FormData();

    console.log(logo)
    formData.append('files', logo);
    for (var i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
    }

    var compInfo = JSON.stringify({ name: name, location: location, description: description, prize: prize, sessionId: sessionId, category1: chosenCategory1, category2: chosenCategory2, date: date, time: time, contact: contact});
    //console.log(compInfo);
    formData.append("content", compInfo );

    fetch(serverAddress + "/createCompetition", {
        method: 'POST',
        body: formData
    })
    .then((res) => res.json()).then((data) => {
        // Handle response 
        console.log('Response: ', data);
        return data;
    })
    .catch(err => {
        // Handle error 
        console.log('Error message: ', err);
    });

    //fetch(serverAdress, {
    //    method: 'POST',
    //    headers: {
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json'

    //    },
    //    body: JSON.stringify({ name: name, location: location, description: description, prize: prize, preview: logo, creator: sessionId, category1: chosenCategory1, category2: chosenCategory2, date: date, time: time, images: images })
    //})
    //.then((res) => res.json()).then((data) => {
    //    // Handle response 
    //    console.log('Response: ', data);
    //    return data;
    //})
    //.catch(err => {
    //    // Handle error 
    //    console.log('Error message: ', err);
    //});

}

document.addEventListener("DOMContentLoaded", () => {
    const area1 = document.querySelector("#area1");
    const next = document.getElementById("next");
    const back = document.getElementById("back");
    const category1 = document.getElementById("mainCategories");

    const categorySports = document.getElementById("sports");
    const categoryHobbies = document.getElementById("hobbies");
    const categorySubject = document.getElementById("subject");

    var name, location, description, prize;
    var chosenCategory1, chosenCategory2 = null;
    category1.addEventListener("change", function () {
        chosenCategory1 = category1.value;
        chosenCategory2 = "None";
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
        chosenCategory2 = categorySports.value;
    })
    categoryHobbies.addEventListener("change", function () {
        chosenCategory2 = categoryHobbies.value;
    })
    categorySubject.addEventListener("change", function () {
        chosenCategory2 = categorySubject.value;
    })


    area1.addEventListener("submit", e => {
        e.preventDefault();
        name = document.querySelector("#name").value;
        location = document.querySelector("#location").value;

        dateRegister = document.querySelector("#date1").value;
        timeRegister = document.querySelector("#time1").value;
        dateStart = document.querySelector("#date2").value;
        timeStart = document.querySelector("#time2").value;
        dateEnd = document.querySelector("#date3").value;
        timeEnd = document.querySelector("#time3").value;

        description = document.querySelector("#description").value;
        logo = document.querySelector("#preview1").files[0];
        images = document.querySelector("#preview2").files;
        contact = document.querySelector("#name").value;
        prize = document.querySelector("#prize").value;

        var sessionId = readCookie("SESSIONID");
        
        // validate
        if (validate(name, location, dateRegister, timeRegister, description, logo, images,
             prize, chosenCategory1, chosenCategory2, sessionId, contact)) {

            createCompetition(name, location, date, time, description, logo,
                 images, prize, chosenCategory1, chosenCategory2, sessionId, contact)
                 
            toggleVisibilityNoFade("area1");
            toggleVisibility("area2");
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    //submit.addEventListener("click", e => {
    //    e.preventDefault();
    //    console.log(e);
    //});
    //back.addEventListener("click", e => {
    //    e.preventDefault();
    //    toggleVisibilityNoFade("area2");
    //    toggleVisibility("area1");
    //    console.log(e);
    //});
});