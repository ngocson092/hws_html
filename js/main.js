document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const menuClose = document.getElementById("menuClose")
  const menuOverlay = document.getElementById("menuOverlay")

  // Open menu
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active")
    menuToggle.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  // Close menu
  function closeMenu() {
    menuOverlay.classList.remove("active")
    menuToggle.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  menuClose.addEventListener("click", closeMenu)

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
  })
})
