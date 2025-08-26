document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const menuOverlay = document.getElementById("menuOverlay")

  // Toggle menu
  function openMenu() {
    menuOverlay.classList.add("active")
    menuToggle.classList.add("active")
    document.body.style.overflow = "hidden"
    document.body.classList.add("menu-open")
  }

  function closeMenu() {
    menuOverlay.classList.remove("active")
    menuToggle.classList.remove("active")
    document.body.style.overflow = "auto"
    document.body.classList.remove("menu-open")
  }

  function toggleMenu() {
    if (menuOverlay.classList.contains("active")) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  menuToggle.addEventListener("click", toggleMenu)

  // no separate close button anymore

  // Close menu when clicking outside content
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      closeMenu()
    }
  })

  // Close menu with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay.classList.contains("active")) {
      closeMenu()
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
      })
  
  // Scroll animations for all sections
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      }
    })
  }, observerOptions)
  
  // Observe all sections
  const sections = [
    '.hero',
    '.services',
    '.service-selection',
    '.pain-free',
    '.membership',
    '.testimonials',
    '.careers',
    '.booking'
  ]
  
  sections.forEach(selector => {
    const element = document.querySelector(selector)
    if (element) observer.observe(element)
  })
  
  // Observe pain-free elements
  const painFreeText = document.querySelector('.pain-free-text')
  const painFreeImage = document.querySelector('.pain-free-image')
  
  if (painFreeText) observer.observe(painFreeText)
  if (painFreeImage) observer.observe(painFreeImage)

  // Initialize Swiper for testimonials
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  })
})

  // Mobile slide menu logic
  const mobileMenu = document.querySelector('.menu-mobile')
  if (mobileMenu) {
    const panels = Array.from(mobileMenu.querySelectorAll('.menu-panel'))
    const rootPanel = mobileMenu.querySelector('#panel-root')
    function openPanel(targetId) {
      panels.forEach((p) => p.classList.remove('is-active', 'is-prev'))
      const target = mobileMenu.querySelector(`#${targetId}`)
      if (target && rootPanel) {
        rootPanel.classList.add('is-prev')
        target.classList.add('is-active')
      }
    }
    function backToRoot(current) {
      panels.forEach((p) => p.classList.remove('is-active', 'is-prev'))
      if (rootPanel) rootPanel.classList.add('is-active')
    }
    mobileMenu.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-link.has-children')
      if (btn) {
        const targetId = btn.getAttribute('data-target')
        if (targetId) openPanel(targetId)
      }
      const back = e.target.closest('.panel-back')
      if (back) {
        backToRoot()
      }
    })
  }

  // Service Selection Tab Functionality
  const serviceTabs = document.querySelectorAll('.service-tab')
  const serviceCategories = document.querySelectorAll('.service-category')

  function switchServiceCategory(category) {
    // Remove active class from all tabs and categories
    serviceTabs.forEach(tab => tab.classList.remove('active'))
    serviceCategories.forEach(cat => cat.classList.remove('active'))

    // Add active class to selected tab and category
    const activeTab = document.querySelector(`[data-category="${category}"]`)
    const activeCategory = document.querySelector(`.service-category[data-category="${category}"]`)
    
    if (activeTab) activeTab.classList.add('active')
    if (activeCategory) activeCategory.classList.add('active')
  }

  // Add click event listeners to tabs
  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category')
      switchServiceCategory(category)
    })
  })

  // Service Slide Functionality
  const serviceGridView = document.getElementById('serviceGridView')
  const serviceDetailView = document.getElementById('serviceDetailView')
  const servicePricingView = document.getElementById('servicePricingView')
  const backBtn = document.getElementById('backBtn')
  const backToDetailBtn = document.getElementById('backToDetailBtn')

  function openServiceDetail() {
    serviceGridView.classList.remove('active')
    serviceDetailView.classList.add('active')
  }

  function closeServiceDetail() {
    serviceDetailView.classList.remove('active')
    serviceGridView.classList.add('active')
  }

  function openServicePricing() {
    serviceDetailView.classList.remove('active')
    servicePricingView.classList.add('active')
  }

  function closeServicePricing() {
    servicePricingView.classList.remove('active')
    serviceDetailView.classList.add('active')
  }

  // Add click event listeners to service items
  const serviceItems = document.querySelectorAll('.service-item')
  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      openServiceDetail()
    })
  })

  // Add click event listeners to detail service cards
  const detailServiceCards = document.querySelectorAll('.detail-service-card')
  detailServiceCards.forEach(card => {
    card.addEventListener('click', () => {
      openServicePricing()
    })
  })

  // Close view when clicking back button
  backBtn.addEventListener('click', closeServiceDetail)

  // Close pricing view when clicking back button
  backToDetailBtn.addEventListener('click', closeServicePricing)

  // Close view with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (serviceDetailView.classList.contains('active')) {
        closeServiceDetail()
      } else if (servicePricingView.classList.contains('active')) {
        closeServicePricing()
      }
    }
  })
})
