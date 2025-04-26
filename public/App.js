
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

function previewImagesListener(){
    const images = document.querySelectorAll('.previewImage');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            previewImages(index+1);
        });
    });
}

function previewImages(index){
    const images = document.querySelectorAll('.previewImage');
    alert(`<image src="${images[index].src}" alt="load"/>`);
}