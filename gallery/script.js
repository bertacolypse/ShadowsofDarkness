// Add the file names of your 15 pages in the "pages" array
const pages = [
  "cover.png",
  "insidecover.jpg",
  "page3.jpg",
  // Add more file names here for pages 4 to 15
  // "page4.jpg",
  // "page5.jpg",
  // ...
];

let currentPage = 0;
const comicPage = document.getElementById("current-page");
const pageNumber = document.getElementById("page-number");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

function updatePage() {
  comicPage.src = "gallery/" + pages[currentPage];
  pageNumber.textContent = `Page ${currentPage + 1}`;
}

function goToNextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  }
}

function goToPreviousPage() {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
}

nextButton.addEventListener("click", goToNextPage);
prevButton.addEventListener("click", goToPreviousPage);

// Load the first page when the page loads
updatePage();
