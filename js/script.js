const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const typedRole = document.querySelector("#typed-role");

const roles = [
  "building backend systems",
  "securing web applications",
  "developing REST APIs",
  "learning vulnerability testing",
  "designing reliable systems"
];
let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const closeMobileMenu = () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
};

const updateHeader = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 18);
};

const highlightActiveLink = () => {
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
};

const typeRole = () => {
    const currentRole = roles[roleIndex];

    typedRole.textContent = currentRole.slice(0, characterIndex);

    if (!isDeleting && characterIndex < currentRole.length) {
        characterIndex += 1;
        setTimeout(typeRole, 82);
        return;
    }

    if (!isDeleting && characterIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 1300);
        return;
    }

    if (isDeleting && characterIndex > 0) {
        characterIndex -= 1;
        setTimeout(typeRole, 42);
        return;
    }

    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 360);
};

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.16,
        rootMargin: "0px 0px -40px 0px",
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("scroll", () => {
    updateHeader();
    highlightActiveLink();
});

window.addEventListener("load", () => {
    updateHeader();
    highlightActiveLink();
    typeRole();
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Message ready. Connect this form to a backend or email service when you are ready.";
    contactForm.reset();
});
