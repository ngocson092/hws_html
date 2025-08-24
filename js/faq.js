// FAQ Page JavaScript

// FAQ Accordion Functionality
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const icon = button.querySelector('.faq-icon');
  
  // Close all other FAQ items
  const allFaqItems = document.querySelectorAll('.faq-item');
  allFaqItems.forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current FAQ item
  faqItem.classList.toggle('active');
  
  // Update icon
  if (faqItem.classList.contains('active')) {
    icon.textContent = '−';
  } else {
    icon.textContent = '+';
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add keyboard navigation for FAQ items
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(this);
      }
    });
  });
  
  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe FAQ items for animation
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    observer.observe(item);
  });
});

// Add loading animation for page
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.faq-hero');
  
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add hover effects for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.faq-cta-primary, .faq-cta-secondary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Add search functionality (optional)
function searchFAQ(query) {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchTerm = query.toLowerCase();
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question span').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = 'block';
      item.style.opacity = '1';
    } else {
      item.style.display = 'none';
      item.style.opacity = '0';
    }
  });
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach((question, index) => {
    // Add ARIA attributes
    const answer = question.nextElementSibling;
    const questionId = `faq-question-${index + 1}`;
    const answerId = `faq-answer-${index + 1}`;
    
    question.setAttribute('id', questionId);
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', answerId);
    
    answer.setAttribute('id', answerId);
    answer.setAttribute('aria-labelledby', questionId);
    
    // Update ARIA attributes on toggle
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });
});
