document.addEventListener("DOMContentLoaded", () => {
  // Reveal elements on scroll
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("visible");
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0 },
  );

  // Observe sections and individual project items
  document
    .querySelectorAll("section, .project-list li")
    .forEach((el) => revealObserver.observe(el));

  // Theme toggle functionality
  const themeToggle = document.createElement("button");
  themeToggle.classList.add("theme-toggle");
  themeToggle.setAttribute("aria-label", "Toggle dark mode");
  themeToggle.innerHTML = getSVGIcon("sun");
  document.body.appendChild(themeToggle);

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = getSVGIcon("moon");
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Animate icon during switch
    themeToggle.style.transform = "rotate(180deg)";

    setTimeout(() => {
      themeToggle.innerHTML = getSVGIcon(newTheme === "light" ? "sun" : "moon");
      themeToggle.style.transform = "rotate(0deg)";
    }, 250);
  });

  // Initialize typing effect for articles section
  initTypingEffect();
});

// Helper function for theme icons
function getSVGIcon(type) {
  if (type === "sun") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;
  } else {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;
  }
}

// Initialize typing effect for the articles section
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text");
  const phrases = [
    "Building a fuzzy finder for programming blogs...",
    "Until then, these are some of my favorite articles..."
    // "Instantly search thousands of dev articles...",
    // "Your personal search engine for tech content...",
    // "Type a keyword to find what you need...",
    // "Matching your query to the best resources..."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let delayAfterPhrase = 1500;
  let delayBeforeDelete = 1000;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Delete character
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Type character
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // If completed typing the current phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = false;
      typingSpeed = delayBeforeDelete; // Pause before deleting
      setTimeout(() => {
        isDeleting = true;
      }, delayBeforeDelete);
    }

    // If deleted the entire phrase
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing effect with a slight delay
  setTimeout(type, 1000);
}
