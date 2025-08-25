// FAQ Page JavaScript

// FAQ Accordion Functionality
function toggleFAQ(target) {
  // Support both old structure (.faq-item > .faq-question) and new rows (.faq-row)
  const isRow = target.classList.contains('faq-row');
  const container = isRow ? target : target.parentElement;
  const selector = isRow ? '.faq-row' : '.faq-item';

  // Close all others of the same type
  const allItems = document.querySelectorAll(selector);
  allItems.forEach(item => {
    if (item !== container) {
      item.classList.remove('active');
    }
  });

  // Toggle current
  container.classList.toggle('active');

  // Update plus/minus icon for old structure if present
  const icon = isRow ? null : target.querySelector('.faq-icon');
  if (icon) {
    icon.textContent = container.classList.contains('active') ? '−' : '+';
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
  
  // Add keyboard navigation for old + new items
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(this);
      }
    });
  });

  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    row.addEventListener('keydown', function(e) {
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
