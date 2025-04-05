document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1000);

    // Theme switcher functionality
    const themeSwitcher = document.getElementById('theme-switcher');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Form step navigation
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = document.querySelector('.form-step.active');
                const nextStep = button.dataset.next;
                
                // Validate current step before proceeding
                const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.style.borderColor = 'var(--color-danger)';
                        isValid = false;
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    return;
                }
                
                // Proceed to next step
                currentStep.classList.remove('active');
                document.querySelector(`.form-step[data-step="${nextStep}"]`).classList.add('active');
                
                // Update progress bar
                progressSteps.forEach(step => {
                    if (parseInt(step.dataset.step) <= parseInt(nextStep)) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Scroll to top of form
                document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }
    
    if (prevButtons.length > 0) {
        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = document.querySelector('.form-step.active');
                const prevStep = button.dataset.prev;
                
                currentStep.classList.remove('active');
                document.querySelector(`.form-step[data-step="${prevStep}"]`).classList.add('active');
                
                // Update progress bar
                progressSteps.forEach(step => {
                    if (parseInt(step.dataset.step) <= parseInt(prevStep)) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Scroll to top of form
                document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }
    
    // Show/hide criminal details based on radio selection
    const criminalRecordRadios = document.querySelectorAll('input[name="criminal-record"]');
    const criminalDetails = document.getElementById('criminal-details');
    
    if (criminalRecordRadios.length > 0) {
        criminalRecordRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'yes') {
                    criminalDetails.style.display = 'block';
                } else {
                    criminalDetails.style.display = 'none';
                }
            });
        });
    }
    
    // Generate random reference number on form success
    const form = document.getElementById('citizenship-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the success message
            
            // Hide form and show success message
            form.style.display = 'none';
            document.querySelector('.form-success').style.display = 'block';
            
            // Generate random reference number
            const refNumber = 'MRD-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
            document.getElementById('reference-number').textContent = refNumber;
            
            // Scroll to success message
            document.querySelector('.form-success').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Play national anthem
    const playAnthemBtn = document.querySelector('.play-anthem');
    if (playAnthemBtn) {
        playAnthemBtn.addEventListener('click', () => {
            alert('Playing national anthem...');
            // In a real implementation, you would play audio here
        });
    }
});
