
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

function route(link){
    window.location = link;
}

let slide_image = 0;

function previewImagesListener(){
    const images = document.querySelectorAll('.previewImage');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            previewImages(index);
        });
    });
}

function previewImages(index){
    const images = document.querySelectorAll('.previewImage');
    document.querySelector('.previewImage-back').style.display = "block";
    let imageDiv = document.querySelector('.previewImage-back');
    imageDiv.childNodes[3].innerHTML = `<image src="${images[index].src}" alt="cbconcord"/>`;
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
        slide_image = document.querySelectorAll('.previewImage').length-1;
    }else{
        slide_image--;
    }
    previewImages(slide_image);
}

function rightImage(){
    if(slide_image >= document.querySelectorAll('.previewImage').length-1){
        slide_image = 0;
    }else{
        slide_image++;
    }
    previewImages(slide_image);
}