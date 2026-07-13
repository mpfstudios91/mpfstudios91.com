// Handle Page Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 1000);
  }
});

// Handle Mobile Navigation
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.add("is-open");
  });
}

if (navClose && mainNav) {
  navClose.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
  });
}

// Handle Scroll Effects
const header = document.querySelector(".site-header");
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    backToTopBtn?.classList.add("visible");
  } else {
    backToTopBtn?.classList.remove("visible");
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href === "#") return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      mainNav?.classList.remove("is-open");

      const headerHeight = header?.offsetHeight || 80;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Web3Forms submission
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalLabel = submitButton?.textContent || "Send Message";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status is-loading";

    const formData = new FormData(contactForm);
    const payload = {
      access_key: formData.get("access_key") || "6d1fb092-eec0-4d0a-b425-1f4ef620e8da",
      subject: formData.get("subject") || "New message from MPFSTUDIOS91 website",
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      service: formData.get("service") || "",
      message: formData.get("message") || "",
      botcheck: formData.get("botcheck") || "",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success !== false) {
        formStatus.textContent = data.message || "Your message has been sent successfully.";
        formStatus.className = "form-status is-success";
        contactForm.reset();
      } else {
        formStatus.textContent = data.message || "Unable to send your message right now.";
        formStatus.className = "form-status is-error";
      }
    } catch (error) {
      console.error(error);
      formStatus.textContent = "Something went wrong. Please try again later.";
      formStatus.className = "form-status is-error";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}

