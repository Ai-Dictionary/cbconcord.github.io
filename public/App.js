
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
    if(!window.location.pathname.includes('/security/admin/confidential')){
        // adding background video
        const video = document.createElement('video');
        video.id = 'background-video';
        video.loop = true;
        video.autoplay = true;
        video.muted = true;
        video.preload = 'auto';
        const source = document.createElement('source');
        source.src = '../images/fire.mp4';
        source.type = 'video/mp4';
        video.appendChild(source);
        document.body.appendChild(video);
    }
    setTimeout(()=>{
        document.getElementById('loader').style.display = "none";
    },4000);
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
    imageDiv.childNodes[3].childNodes[5].innerHTML = access[index].innerHTML;
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

function login(id){
    document.querySelector('.login-option').style.display = "none";
    if(id==1){
        document.getElementById('back').style.display = "block";
        document.getElementById('representative').style.display = "block";
        document.getElementById('warning').style.display = "block";
        document.getElementById('loader').style.display = "block";
        if(document.getElementById('representative').innerHTML==''){
            const url = '/assets/pdf/Representatives Profile.pdf';

            const pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';

            const container = document.getElementById('representative');

            pdfjsLib.getDocument(url).promise.then(pdf => {
                container.innerHTML = '';
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(page => {
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    container.appendChild(canvas);

                    page.render({ canvasContext: context, viewport: viewport });
                });
                }
            });
        }
        setTimeout(()=>{
            document.getElementById('loader').style.display = "none";
            document.getElementById('warning').style.display = "none";
        },3000);
    }else if(id==2){
        document.getElementById('back').style.display = "block";
        document.getElementById('eventfinalist').style.display = "block";
    }else if(id==4){
        document.getElementById('back').style.display = "block";
        document.getElementById('prelimsschedule').style.display = "block";
    }else{
        alert("Sorry, this feature is under development!\ntry any other feature or wait until it done..");
        logout();
    }
}
function logout(){
    document.getElementById('back').style.display = "none";
    document.getElementById('representative').style.display = "none";
    document.getElementById('eventfinalist').style.display = "none";
    document.getElementById('prelimsschedule').style.display = "none";
    document.getElementById('warning').style.display = "none";
    document.querySelector('.login-option').style.display = "block";
}