document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('#back-button');
    backButton.addEventListener('click', function () {
        window.location.href = 'https://tinyurl.com/ddevilwood';
    });
});
    const images = document.querySelectorAll("section img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.getElementById("close");

    images.forEach(image => {
        image.addEventListener("click", () => {
            lightboxImage.src = image.src;
            lightboxImage.classList.add("zoomed");
            lightbox.style.display = "flex";
        });
    });

    closeButton.addEventListener("click", () => {
        lightboxImage.classList.remove("zoomed");
        lightbox.style.display = "none";
    });

