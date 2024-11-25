document.getElementById('year').textContent = new Date().getFullYear();

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement; // The element where text will be displayed
    this.words = words; // Array of words to type
    this.txt = ''; // The current text being typed
    this.wordIndex = 0; // The index of the current word
    this.wait = parseInt(wait, 10); // Wait time before starting to delete or type a new word
    this.isDeleting = false; // State to track if currently deleting text
    this.type(); // Start typing immediately
  }

  // The typing method handles adding and deleting text
  type = () => {
    const current = this.wordIndex % this.words.length; // Get the current word index
    const fullTxt = this.words[current]; // The full text of the current word

    // Adjust the text: add or remove characters
    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1) // Remove characters if deleting
      : fullTxt.substring(0, this.txt.length + 1); // Add characters if typing

    // Insert the text into the target element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Set typing speed
    let typeSpeed = this.isDeleting ? 150 : 300;

    // If the word is fully typed
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait; // Pause before deleting
      this.isDeleting = true; // Switch to deleting mode
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false; // Switch back to typing mode
      this.wordIndex++; // Move to the next word
      typeSpeed = 500; // Pause briefly before starting to type again
    }

    // Call type() again after the specified speed
    setTimeout(this.type, typeSpeed);
  };
}

// Initialize the typewriter effect on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const txtElement = document.querySelector('.txt-type'); // The target element for typing
  const words = JSON.parse(txtElement.getAttribute('data-words')); // Words array from data attribute
  const wait = txtElement.getAttribute('data-wait'); // Wait time from data attribute
  new TypeWriter(txtElement, words, wait); // Initialize the TypeWriter class
});

// Scroll event handler for the navbar
const navbar = document.getElementById('main-nav'); // Get the navbar element
let scrolled = false; // Track if the navbar has already scrolled

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    navbar.classList.add('top'); // Add class when scrolled past 100px
    if (!scrolled) {
      navbar.style.transform = 'translateY(-70px)'; // Slide navbar up initially
    }
    setTimeout(() => {
      navbar.style.transform = 'translateY(0)'; // Reset navbar position
      scrolled = true; // Set the scrolled state
    }, 200);
  } else {
    navbar.classList.remove('top'); // Remove class when scrolled back up
    scrolled = false; // Reset the scrolled state
  }
});
