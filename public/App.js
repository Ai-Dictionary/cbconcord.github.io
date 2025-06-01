
$(document).ready(function () {
    $(".menu-close").hide();

    $(".menu").click(function () {
        $(".menu-panel").toggleClass("show");
        $(".menu-background").toggleClass("show");
        $(".menu").hide();
        $(".menu-close").show();
    });
    $(".menu-close").click(function () {
        $(".menu-panel").removeClass("show");
        $(".menu-background").removeClass("show");
        $(".menu").show();
        $(".menu-close").hide();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML += `
    <video id="background-video" loop autoplay muted preload="auto">
        <source src="../images/fire.mp4" type="video/mp4">
    </video>`;
    document.getElementById('loader').style.display = "none";
});

function route(link){
    window.location = link;
}

let slide_image = 0;

function previewImagesListener(){
    const images = document.querySelectorAll('.crop-image');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            previewImages(index);
        });
    });
}

function previewImages(index){
    const images = document.querySelectorAll('.crop-image');
    document.querySelector('.previewImage-back').style.display = "block";
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].innerHTML = `<image src="${images[index].getAttribute('data-background-image').replaceAll(' ','%20')}" alt="cbconcord"/>`;
    document.querySelector('#slide-length').textContent = `${index+1}/${document.querySelectorAll('.previewImage').length}`;
    slide_image = index;
}
function previewImagesClose(){
    document.querySelector('.previewImage-back').style.display = "none";
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].innerHTML = '';
}

function leftImage(){
    if(slide_image <= 0){
        slide_image = document.querySelectorAll('.crop-image').length-1;
    }else{
        slide_image--;
    }
    previewImages(slide_image);
}

function rightImage(){
    if(slide_image >= document.querySelectorAll('.crop-image').length-1){
        slide_image = 0;
    }else{
        slide_image++;
    }
    previewImages(slide_image);
}

let zoom_range;
function zoomIn(){
    let imageDiv = document.querySelector('.previewImage-back');
    zoom_range = imageDiv.childNodes[3].style.width;
    imageDiv.childNodes[3].style.width = "100%";
    imageDiv.childNodes[3].style.height = "750px";
    imageDiv.childNodes[3].childNodes[0].style.width = "100%";
}

function zoomOut(){
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].style.width = zoom_range;
    // imageDiv.childNodes[3].style.width = "100%";
    imageDiv.childNodes[3].style.height = "600px";
    imageDiv.childNodes[3].childNodes[0].style.width = "fit-content";
}

function imageIdCopy(){
    const textToCopy = new URL(window.location.origin+window.location.pathname+"?imageReview="+slide_image);
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("URL has been copied to the clipboard!");
}

function downloadImage(){
    const image = document.querySelectorAll('.crop-image')[slide_image];
    const fileName = 'cbsconcord.png';
    const link = document.createElement("a");
    link.href = image.src;
    link.download = fileName;
    link.click();
}

function openFullscreen(){
    var elem = document.documentElement;
    if(elem.requestFullscreen){
    elem.requestFullscreen();
    }else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }
}

function closeFullscreen(){
    var elem = document.documentElement;
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
}

function unfoldeEvent(index){
    let id = "elementor-tab-content-608";
    for(let i=0; i<3; i++){
        document.getElementById(id+(i+1)).style.display = "none";
    }
    document.getElementById(id+index).style.display = "block";
}

function previewSponsoreListener(){
    const images = document.querySelectorAll('.previewImage');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            previewSponsore(index);
        });
    });
}

function previewSponsore(index){
    const images = document.querySelectorAll('.previewImage');
    const about = document.querySelectorAll('.about-sponsor');
    const access = document.querySelectorAll('.access-sponsor');
    document.querySelector('.previewImage-back').style.display = "block";
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].childNodes[1].innerHTML = `<image src="${images[index].src}" alt="cbconcord"/>`;
    imageDiv.childNodes[3].childNodes[3].textContent = about[index].textContent;
    imageDiv.childNodes[3].childNodes[5].textContent = access[index].textContent;
    document.querySelector('#slide-length').textContent = `${index+1}/${document.querySelectorAll('.previewImage').length}`;
    slide_image = index;
}
function previewSponsoreClose(){
    document.querySelector('.previewImage-back').style.display = "none";
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].childNodes[1].innerHTML = '';
    imageDiv.childNodes[3].childNodes[3].textContent = '';
    imageDiv.childNodes[3].childNodes[5].textContent = '';
}