// Theme Management
const themes = ['blue', 'red', 'green', 'purple', 'dark'];
let currentThemeIndex = 0;

function cycleTheme() {
  // Remove current theme class
  document.body.classList.remove(`theme-${themes[currentThemeIndex]}`);
  
  // Increment index
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  
  // Add new theme class
  document.body.classList.add(`theme-${themes[currentThemeIndex]}`);
  
  // Save to localStorage
  localStorage.setItem('theme', themes[currentThemeIndex]);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const darkMode = localStorage.getItem('darkMode') === 'true';
  
  if (savedTheme) {
    currentThemeIndex = themes.indexOf(savedTheme);
    if (currentThemeIndex === -1) currentThemeIndex = 0;
    document.body.classList.add(`theme-${themes[currentThemeIndex]}`);
  }
  
  if (darkMode) {
    document.body.classList.add('dark');
  }
}

// Initialize on load
initTheme();
