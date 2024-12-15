//Mouse circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

let mouseCircleBool = true;

const mouseCircleFn = (x, y) => {
  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`);

  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity:1`;
};

// End of Mouse Circle

// Animated circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");
let mX = 0;
let mY = 0;
const z = 100;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated circles

let hoveredEIPosition = [];

const stickyElement = (x, y, hoveredEI) => {
  // STICKY ELEMENT

  if (hoveredEI.classList.contains("sticky")) {
    hoveredEIPosition.length < 1 &&
      (hoveredEIPosition = [hoveredEI.offsetTop, hoveredEI.offsetLeft]);

    hoveredEI.style.cssText = `top: ${y}px; left:${x}px`;

    if (
      hoveredEI.offsetTop <= hoveredEIPosition[0] - 100 ||
      hoveredEI.offsetTop >= hoveredEIPosition[0] + 100 ||
      hoveredEI.offsetLeft <= hoveredEIPosition[1] - 100 ||
      hoveredEI.offsetLeft >= hoveredEIPosition[1] + 100
    ) {
      hoveredEI.style.cssText = "";
      hoveredEIPosition = [];
    }

    hoveredEI.onmouseleave = () => {
      hoveredEI.style.cssText = "";
      hoveredEIPosition = [];
    };
  }
  // END OF STICKY ELEMENT
};

// MOUSE CIRCLE TRANSFORm
const mouseCircleTransform = (hoveredEI) => {
  if (hoveredEI.classList.contains("pointer-enter")) {
    hoveredEI.onmousemove = () => {
      mouseCircleBool = false;
      mouseCircle.style.cssText = `
            width: ${hoveredEI.getBoundingClientRect().width}px;
            height: ${hoveredEI.getBoundingClientRect().height}px;
            top: ${hoveredEI.getBoundingClientRect().top}px;
            left: ${hoveredEI.getBoundingClientRect().left}px;
            opacity: 1;
            transform: translate(0, 0);
            animation: none;
            border-radius: ${
              getComputedStyle(hoveredEI).borderBottomLeftRadius
            };
            transition: width 0.5s, height 0.5s, top 0.5s, left 0.5s, transform 0.5s, border-radius 0.5s; 
            `;
    };

    hoveredEI.onmouseleave = () => {
      mouseCircleBool = true;
    };

    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredEI.getBoundingClientRect().top}px`;
      }
    };
  }
};
// END OF MOUSE CIRCLE TRANSFORM

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);

  const hoveredEI = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEI);

  mouseCircleTransform(hoveredEI);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});
// end of Mouse circle

// Main Button
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});

// End of main button
// End of main button
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const arrow = document.querySelector(".progress-bar-circle");

let isAtBottom = false;

const progressBarFn = () => {
  const pageHeight = document.documentElement.scrollHeight;
  const scrolledPortion = window.pageYOffset;
  const pageViewportHeight = window.innerHeight;

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;
  });

  if (scrolledPortionDegree >= 180) {
    halfCircles[0].style.transform = "rotate(180deg)";
    halfCircleTop.style.opacity = "0";
  } else {
    halfCircleTop.style.opacity = "1";
  }

  // Detect if the user is at the last section
  const lastSectionPosition = sections[sections.length - 1].offsetTop;
  const atLastSection =
    scrolledPortion + pageViewportHeight >= lastSectionPosition;

  if (atLastSection && !isAtBottom) {
    arrow.style.transform = "rotate(180deg)";
    isAtBottom = true;
  } else if (!atLastSection && isAtBottom) {
    arrow.style.transform = "rotate(0deg)";
    isAtBottom = false;
  }
};

window.addEventListener("scroll", progressBarFn);

progressBar.onclick = (e) => {
  e.preventDefault();
  const scrolledPortion = window.pageYOffset;
  const pageViewportHeight = window.innerHeight;

  // Find the next section to scroll to
  const sectionPositions = Array.from(sections).map(
    (section) => section.offsetTop
  );
  const nextSectionPosition = sectionPositions.find(
    (position) => position > scrolledPortion
  );

  if (nextSectionPosition !== undefined) {
    window.scrollTo({ top: nextSectionPosition, behavior: "smooth" });
    console.log("Scrolling to next section at position:", nextSectionPosition);
  } else {
    // If already at the last section, scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Scrolling to the top.");
  }
};

// NAVIGATION
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

document.addEventListener("scroll", () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }
});

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
//END OF NAVIGATION

// about me text///
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "I’m Cleavon, a Python Backend Developer passionate about building efficient web solutions. 🚀";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span"); // Correcting the creation of the span element
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});

// end of about me text///

// PROJECT
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });
  // BIG PROJECT IMAGE
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    console.log(imgPath);
    bigImg.setAttribute("src", `${imgPath}.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";

    mouseCircle.style.opacity = 0;

    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";
    };
  });

  // END OF BIG PROJECT IMAGE
  i >= 6 && (project.style.cssText = "display: none; opacity: 0");
});

// PROJECTS BUTTON
const section3 = document.querySelector(".section-3");
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");

let showHideBool = true;



const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);
  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);

  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  showHideBool
    ? (projectsBtnText.textContent = "Show Less")
    : (projectsBtnText.textContent = "Show More");

  projects.forEach((project, i) => {
    i >= 6 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, 1));
  });
  showHideBool = !showHideBool;
});
// END OF PROJECTs BUTTON

// SECTION 4
document.querySelectorAll(".service-btn").forEach((service) => {
  // Show the service text on hover
  service.addEventListener("mouseover", () => {
    const serviceText = service.nextElementSibling;

    // Add the "change" class to show the text
    serviceText.classList.add("change");

    // Calculate the right position to align the text
    const rightPosition = `calc(100% - ${
      getComputedStyle(service.firstElementChild).width
    })`;

    // Apply the calculated right position to the first child element of the service button
    service.firstElementChild.style.right = rightPosition;
  });

  // Hide the service text on mouse leave
  service.addEventListener("mouseleave", () => {
    const serviceText = service.nextElementSibling;

    // Remove the "change" class to hide the text
    serviceText.classList.remove("change");

    // Reset the right position of the first child element of the service button
    service.firstElementChild.style.right = 0;
  });
});

// END OF SECTION 4

// SECTION 5
// FORM
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });
});

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let's Talk";
      formHeading.style.opacity = "1";
    }, 300);
  });
});
// END OF FORM
// SLIDESHOW
const slideshow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon = slideshow.children[3];

  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);

    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);
// END OF SLIDESHOW
// END OF SECTION OF 5

// FORM VALIDATION
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");
const error = (input, message) => {
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const success = (input) => {
  input.nextElementSibling.classList.remove("error");
  // input.nextElementSibling.textContent = "";
};

const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${input.id} is required`);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id} must be at least ${min} characters long`);
  } else {
    success(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "Email is not valid");
  }
};

form.addEventListener("submit", (e) => {
  checkLength(username, 2);
  checkLength(subject, 2);
  checkLength(message, 5);
  checkEmail(email);
  checkRequiredFields([username, email, subject, message]);

  const notValid = Array.from(messages).find(message => {
    return message.classList.contains("error")
  });

  notValid && e.preventDefault()

});

// END OF PROJECT
