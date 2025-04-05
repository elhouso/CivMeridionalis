// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page
  initPage();
  
  // Set up event listeners
  setupEventListeners();
  
  // Check for prefers-color-scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  }
});

function initPage() {
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-section') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Load content if this is index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    loadContent('home');
  }
}

function setupEventListeners() {
  // Navigation clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      navigateTo(section);
    });
  });
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const sections = ['home', 'citizenship', 'news', 'constitution', 'laws', 'leaders', 'stats', 'map', 'military', 'government'];
    
    for (const section of sections) {
      if (section.includes(query)) {
        navigateTo(section);
        break;
      }
    }
  });
  
  // Form submission
  const form = document.getElementById('citizenshipForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function navigateTo(section) {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    // Load content dynamically
    loadContent(section);
    history.pushState({ section }, null, `#${section}`);
  } else {
    // Navigate to separate page
    window.location.href = `${section}.html`;
  }
}

function loadContent(section) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<div class="loader"><div class="loader-spinner"></div></div>';
  
  // Simulate loading (in a real app, you'd fetch content here)
  setTimeout(() => {
    let content = '';
    
    switch(section) {
      case 'home':
        content = `
          <section class="section">
            <h2>Welcome to <span class="highlight">Meridionalis</span></h2>
            <p>Meridionalis is a proud Minecraft nation under the Civ+ server. Join us as we build a new world together.</p>
            <div class="cta-container">
              <a href="citizenship.html" class="btn btn-accent">Become a Citizen</a>
            </div>
          </section>
        `;
        break;
      // Other cases would be handled in their respective HTML files
      default:
        content = `<section class="section"><h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2></section>`;
    }
    
    mainContent.innerHTML = content;
    document.querySelector('.section').classList.add('fade-in');
  }, 500);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Replace with your actual Discord webhook URL
  const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
  
  const formData = new FormData(e.target);
  const data = {
    content: '**New Citizenship Application**',
    embeds: [{
      title: 'Application Details',
      fields: [
        { name: 'Full Name', value: formData.get('name') },
        { name: 'Age', value: formData.get('age') },
        { name: 'Minecraft Username', value: formData.get('minecraftName') },
        { name: 'Discord Username', value: formData.get('discordName') },
        { name: 'Reason for Joining', value: formData.get('reason') }
      ],
      timestamp: new Date().toISOString()
    }]
  };
  
  // Send to Discord webhook
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      showSuccessMessage();
      e.target.reset();
    } else {
      showErrorMessage();
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showErrorMessage();
  });
}

function showSuccessMessage() {
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.innerHTML = '✅ Application submitted successfully!';
  document.body.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.classList.add('fade-out');
    setTimeout(() => successMsg.remove(), 500);
  }, 3000);
}

function showErrorMessage() {
  const errorMsg = document.createElement('div');
  errorMsg.className = 'error-message';
  errorMsg.innerHTML = '❌ Error submitting form. Please try again.';
  document.body.appendChild(errorMsg);
  
  setTimeout(() => {
    errorMsg.classList.add('fade-out');
    setTimeout(() => errorMsg.remove(), 500);
  }, 3000);
}

function toggleSearch() {
  const input = document.getElementById('searchInput');
  input.style.display = input.style.display === 'block' ? 'none' : 'block';
  if (input.style.display === 'block') {
    input.focus();
  }
}

// Handle back/forward navigation
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.section) {
    loadContent(event.state.section);
  }
});
