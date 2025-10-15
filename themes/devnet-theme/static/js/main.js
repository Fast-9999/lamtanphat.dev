// DevNet Insights - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('.newsletter__input');
            const submitButton = newsletterForm.querySelector('.newsletter__button');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNotification('Vui lòng nhập email của bạn', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Email không hợp lệ', 'error');
                return;
            }
            
            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng ký...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('Đăng ký thành công! Cảm ơn bạn đã quan tâm.', 'success');
                emailInput.value = '';
            } catch (error) {
                showNotification('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Đăng ký';
            }
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form__form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.contact-form__submit');
            const formData = new FormData(contactForm);
            
            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi tin nhắn';
            }
        });
    }

    // Post filter functionality
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            filterPosts(selectedCategory);
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchPosts(searchTerm);
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Scroll to top functionality
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Reading progress bar
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const article = document.querySelector('.post__content');
            if (article) {
                const articleHeight = article.offsetHeight;
                const articleTop = article.offsetTop;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                const progress = Math.min(
                    Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                    1
                );
                
                progressBar.style.width = `${progress * 100}%`;
            }
        });
    }

    // Copy code blocks functionality
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy code';
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            });
        });
    });

    // Table of contents generation
    generateTableOfContents();

    // Initialize tooltips
    initializeTooltips();

    // Initialize animations
    initializeAnimations();
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.posts__card');
    
    posts.forEach(post => {
        const postCategory = post.querySelector('.posts__category').textContent.toLowerCase();
        
        if (category === '' || postCategory.includes(category.toLowerCase())) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
        }
    });
}

function searchPosts(searchTerm) {
    const posts = document.querySelectorAll('.posts__card');
    
    posts.forEach(post => {
        const title = post.querySelector('.posts__card-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.posts__excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
        }
    });
}

function generateTableOfContents() {
    const content = document.querySelector('.post__content');
    if (!content) return;
    
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Mục lục</h3><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.className = `toc-${heading.tagName.toLowerCase()}`;
        
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    // Insert TOC after post header
    const postHeader = document.querySelector('.post__header');
    if (postHeader) {
        postHeader.insertAdjacentElement('afterend', toc);
    }
}

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.dataset.tooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    
    e.target.tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltip) {
        e.target.tooltip.remove();
        e.target.tooltip = null;
    }
}

function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Dark mode toggle (if needed)
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
}

// Load dark mode preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on page load
loadDarkModePreference();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        // Only replace if it's not already the default image
        if (e.target.src !== window.location.origin + '/images/default-post.jpg') {
            e.target.src = '/images/default-post.jpg';
            e.target.alt = 'Default post image';
            e.target.style.opacity = '0.8';
        }
    }
}, true);

// Preload default image
const defaultImg = new Image();
defaultImg.src = '/images/default-post.jpg';

// Console welcome message
console.log(`
🚀 DevNet Insights Blog
📚 Chia sẻ kiến thức Lập trình Mạng với Java & JavaScript
👨‍💻 Được xây dựng với Hugo và DevNet Theme
🌐 Website: https://devnet-insights.netlify.app
`);

// ===========================================
// CONTACT PAGE FUNCTIONALITY
// ===========================================

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const charCount = document.getElementById('char-count');
    const formSuccess = document.getElementById('form-success');
    const formStatus = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');

    // Character counter for message
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Change color based on character count
            if (count > 800) {
                charCount.style.color = '#dc2626';
            } else if (count > 600) {
                charCount.style.color = '#d97706';
            } else {
                charCount.style.color = '#6b7280';
            }
        });
    }

    // Real-time validation
    function validateField(field, validator, errorElement) {
        const value = field.value.trim();
        const isValid = validator(value);
        
        if (!isValid && value.length > 0) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.classList.add('show');
            }
            return false;
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            return true;
        }
    }

    // Validators
    const validators = {
        name: (value) => value.length >= 2 && /^[a-zA-ZÀ-ỹ\s]+$/.test(value),
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: (value) => value.length >= 10 && value.length <= 1000
    };

    // Error messages
    const errorMessages = {
        name: 'Tên phải có ít nhất 2 ký tự và chỉ chứa chữ cái',
        email: 'Vui lòng nhập địa chỉ email hợp lệ',
        message: 'Tin nhắn phải có từ 10 đến 1000 ký tự'
    };

    // Real-time validation for inputs
    [nameInput, emailInput, messageTextarea].forEach(input => {
        if (!input) return;
        
        const fieldName = input.id;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        input.addEventListener('blur', function() {
            validateField(this, validators[fieldName], errorElement);
            if (errorElement && !validators[fieldName](this.value.trim())) {
                errorElement.textContent = errorMessages[fieldName];
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this, validators[fieldName], errorElement);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearFormErrors();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, validators.name, document.getElementById('name-error'));
        const isEmailValid = validateField(emailInput, validators.email, document.getElementById('email-error'));
        const isMessageValid = validateField(messageTextarea, validators.message, document.getElementById('message-error'));
        
        // Set error messages
        if (!isNameValid) {
            document.getElementById('name-error').textContent = errorMessages.name;
            document.getElementById('name-error').classList.add('show');
        }
        if (!isEmailValid) {
            document.getElementById('email-error').textContent = errorMessages.email;
            document.getElementById('email-error').classList.add('show');
        }
        if (!isMessageValid) {
            document.getElementById('message-error').textContent = errorMessages.message;
            document.getElementById('message-error').classList.add('show');
        }
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showNotification('Vui lòng kiểm tra lại thông tin đã nhập.', 'error');
            return;
        }
        
        // Submit form
        submitForm();
    });

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.contact-form__error');
        errorElements.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        const inputElements = document.querySelectorAll('.contact-form__input, .contact-form__textarea, .contact-form__select');
        inputElements.forEach(input => {
            input.classList.remove('error');
        });
    }

    function submitForm() {
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show success notification
            showNotification('Tin nhắn đã được gửi thành công! Mình sẽ phản hồi sớm nhất có thể.', 'success');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth' });
            
        }, 2000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.contact-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `contact-notification contact-notification--${type}`;
    notification.innerHTML = `
        <div class="contact-notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="contact-notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Contact Page Animations
function initContactAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe contact reasons
    const contactReasons = document.querySelectorAll('.contact-reason');
    contactReasons.forEach((reason, index) => {
        reason.style.animationDelay = `${index * 0.1}s`;
        observer.observe(reason);
    });
    
    // Observe FAQ items
    const faqItems = document.querySelectorAll('.contact-faq__item');
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// FAQ Accordion (if needed)
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.contact-faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.contact-faq__question');
        const answer = item.querySelector('.contact-faq__answer');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.display = 'none';
            
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.contact-faq__answer');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                    }
                });
                
                // Toggle current item
                answer.style.display = isOpen ? 'none' : 'block';
            });
        }
    });
}

// Initialize contact page functionality
function initContactPage() {
    // Check if we're on contact page
    if (document.querySelector('.contact-page')) {
        initContactForm();
        initContactAnimations();
        initFAQAccordion();
    }
}

// Initialize contact page when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactPage);