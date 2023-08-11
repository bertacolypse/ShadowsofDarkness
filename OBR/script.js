// Get references to page divs and page count
const pages = document.querySelectorAll('.page');
const pageCount = pages.length;

// Current page index
let currentPage = 0;

// Function to show the current page
function showPage(index) {
    pages.forEach(page => {
      page.style.display = 'none';
    });
  
    if (index >= 0 && index < pageCount) {
      pages[index].style.display = 'block';
    }
  }
  

// Initial page display
showPage(currentPage);

// Function to turn to the next page
function nextPage() {
  if (currentPage < pageCount - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

// Function to turn to the previous page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

// Event listeners for next and previous buttons
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', nextPage);

const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', prevPage);

// Get references to the table of contents links
const tocLinks = document.querySelectorAll('.table-of-contents a');

// Add click event listeners to each link
tocLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetPageId = link.getAttribute('href');
    const targetPage = document.querySelector(targetPageId);
    const targetPageIndex = Array.from(pages).indexOf(targetPage);
    
    if (targetPageIndex !== -1) {
      currentPage = targetPageIndex;
      showPage(currentPage);
    }
  });
});

// Function to read aloud the content of a page
function readPageAloud(pageIndex) {
  const pageContent = pages[pageIndex].textContent;
  const utterance = new SpeechSynthesisUtterance(pageContent);
  speechSynthesis.speak(utterance);
}

// Add click event listeners to read-aloud buttons
const readAloudButtons = document.querySelectorAll('.read-aloud-button');
readAloudButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    readPageAloud(index);
  });
});

// Fetch content from JSON file
fetch('book-content.json')
  .then(response => response.json())
  .then(data => {
    // Populate the book reader with the fetched content
    data.chapters.forEach((chapter, chapterIndex) => {
      const chapterDiv = document.createElement('div');
      chapterDiv.classList.add('page');

      const chapterTitle = document.createElement('h2');
      chapterTitle.textContent = chapter.title;
      chapterDiv.appendChild(chapterTitle);

      chapter.pages.forEach((pageContent, pageIndex) => {
        const pageDiv = document.createElement('div');
        pageContent.split('\n\n').forEach(paragraph => {
          const paragraphElement = document.createElement('p');
          paragraphElement.textContent = paragraph.trim();
          pageDiv.appendChild(paragraphElement);
        });
        pageDiv.id = `page${chapterIndex + 1}-${pageIndex + 1}`;
        chapterDiv.appendChild(pageDiv);
      });
      
      document.querySelector('.book-content').appendChild(chapterDiv);
    });
  })
  .catch(error => {
    console.error('Error loading content:', error);
  });
