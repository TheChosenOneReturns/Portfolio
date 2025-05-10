const bg = document.getElementById("bg")
const logo = document.getElementById("logo")
const mountain = document.getElementById("mountain")
const road = document.getElementById("road")
const textPresentacion = document.getElementById("textPresentacion")
const nav = document.getElementById("mainNav")
const aboutSection = document.querySelector(".about-section")

//Accionar Nav
window.addEventListener("scroll", () => {
  const sectionTop = aboutSection.getBoundingClientRect().top

  if (sectionTop <= window.innerHeight * 0.5) {
    nav.classList.remove("hidden")
    nav.classList.add("visible")
  } else {
    nav.classList.remove("visible")
    nav.classList.add("hidden")
  }
})

// Comprobar si los elementos existen antes de realizar operaciones
function checkElements() {
  return bg && logo && mountain && road && textPresentacion
}

// Función para el efecto parallax
function handleScroll() {
  if (!checkElements()) return

  const value = window.scrollY
  requestAnimationFrame(() => {
    bg.style.transform = `translateY(${-value * 0.2}px)`
    logo.style.transform = `translateY(${value * 0.7}px)`
    mountain.style.transform = `translateY(${value * 0.5}px)`
    road.style.transform = `translateY(${value * 0.3}px)`
    textPresentacion.style.transform = `translateY(${value * 1}px)`
  })
}

// Verificar cuando las imágenes se han cargado
window.addEventListener("load", () => {
  // Añadir efecto de parallax al hacer scroll
  window.addEventListener("scroll", handleScroll)

  // Añadir efecto de aparición para elementos en la sección "Sobre mí"
  setupScrollAnimation()
})

// Función para ajustar el tamaño del texto según el ancho de la pantalla
function adjustTextSize() {
  if (!checkElements()) return

  const viewportWidth = window.innerWidth

  if (viewportWidth < 480) {
    // Móvil pequeño
    textPresentacion.style.fontSize = "3em"
  } else if (viewportWidth < 768) {
    // Móvil/Tablet
    textPresentacion.style.fontSize = "5em"
  } else if (viewportWidth < 1024) {
    // Tablet/Laptop pequeño
    textPresentacion.style.fontSize = "7em"
  } else {
    // Laptop/Desktop
    textPresentacion.style.fontSize = "10em"
  }
}

// Función para animar elementos al hacer scroll
function setupScrollAnimation() {
  const aboutSection = document.querySelector(".about-section")
  const aboutElements = document.querySelectorAll(".about-text h2, .about-text p, .skills, .about-image")

  // Observador de intersección para detectar cuando los elementos son visibles
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Añadir animación con un retraso escalonado
          aboutElements.forEach((element, index) => {
            setTimeout(() => {
              element.style.opacity = "1"
              element.style.transform = "translateY(0)"
            }, 200 * index)
          })
          // Dejar de observar una vez que se ha aplicado la animación
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.2, // Porcentaje de visibilidad necesario para activar
    },
  )

  // Observar la sección "Sobre mí"
  if (aboutSection) {
    observer.observe(aboutSection)

    // Aplicar estilos iniciales para la animación
    aboutElements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  }
}

// Función para activar el navbar responsive
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("navToggle")
  const menu = document.getElementById("navMenu")
  const overlay = document.getElementById("menuOverlay")
  const menuLinks = document.querySelectorAll("#navMenu a")

  if (toggleBtn && menu) {
    // Toggle menu cuando se hace clic en el botón hamburguesa
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("show")
      if (overlay) {
        overlay.classList.toggle("active")
      }

      // Cambiar el ícono del botón hamburguesa
      if (menu.classList.contains("show")) {
        toggleBtn.innerHTML = "&#10005;" // X
      } else {
        toggleBtn.innerHTML = "&#9776;" // Hamburguesa
      }
    })

    // Cerrar menú cuando se hace clic en un enlace
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("show")
        if (overlay) {
          overlay.classList.remove("active")
        }
        toggleBtn.innerHTML = "&#9776;"
      })
    })

    // Cerrar menú cuando se hace clic en el overlay
    if (overlay) {
      overlay.addEventListener("click", () => {
        menu.classList.remove("show")
        overlay.classList.remove("active")
        toggleBtn.innerHTML = "&#9776;"
      })
    }
  }

  // Ajustar el navbar en resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && menu) {
      menu.classList.remove("show")
      if (overlay) {
        overlay.classList.remove("active")
      }
      if (toggleBtn) {
        toggleBtn.innerHTML = "&#9776;"
      }
    }
  })

  window.addEventListener("scroll", () => {
    const section = document.getElementById("projects")
    const bg1 = document.querySelector(".bg1") // fondo
    const bg2 = document.querySelector(".bg2") // PNG

    if (!section || !bg1 || !bg2) return

    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight + 200) {
      const relativeScroll = scrollY + windowHeight - sectionTop

      // Invertimos el movimiento para el PNG
      bg1.style.transform = `translateY(${relativeScroll * 0.3}px)` // se mueve hacia abajo
      bg2.style.transform = `translateY(${-relativeScroll * 0.3}px)` // se mueve hacia arriba
    }
  })

  // Llamar a adjustTextSize al cargar y al cambiar el tamaño de la ventana
  adjustTextSize()
  window.addEventListener("resize", adjustTextSize)

  // Añadir animación para la sección de contacto y footer
  const contactSection = document.getElementById("contact")
  const contactElements = document.querySelectorAll(
    ".contact-container h2, .contact-container p, .contact-info, .contact-container form",
  )
  const footer = document.querySelector(".footer")
  const footerElements = document.querySelectorAll(".footer-logo, .social-icons, .footer-links, .copyright")

  // Función para animar elementos cuando son visibles
  function animateOnScroll(section, elements) {
    if (!section || !elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.style.opacity = "1"
                element.style.transform = "translateY(0)"
              }, 200 * index)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(section)

    // Aplicar estilos iniciales para la animación
    elements.forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  }

  // Iniciar animaciones
  if (contactSection) {
    animateOnScroll(contactSection, contactElements)
  }

  if (footer) {
    animateOnScroll(footer, footerElements)
  }

  // Añadir efecto hover a los iconos sociales
  const socialIcons = document.querySelectorAll(".social-icon")
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-5px) scale(1.1)"
    })

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "translateY(0) scale(1)"
    })
  })
})
