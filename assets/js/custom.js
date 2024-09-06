// for nav bar scroll effect

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    header.style.top = "-100px"; // Adjust this value to hide the header smoothly
  } else {
    // Scrolling up
    header.style.top = "0";
  }

  lastScrollTop = scrollTop;
});

// Scroll transition for Keyboard as-a-platform

const scrollSection = document.getElementById("scroll-section");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const sectionOffset = scrollSection.offsetTop;

  // Adjust the threshold value to control when the section disappears
  if (scrollPosition > sectionOffset + 150) {
    scrollSection.style.transform = "translateY(50%) scale(0.5)"; // Squeeze and move down
    scrollSection.style.opacity = "0"; // Fade out section
  } else {
    scrollSection.style.transform = "translateY(0) scale(1)"; // Reset position and size
    scrollSection.style.opacity = "1"; // Reset opacity
  }
});

//   catogory

document.addEventListener("DOMContentLoaded", () => {
  // Initialize status variables for each section
  let sectionStatus = {
    gatewayUpperSide: false,
    category: false,
    gateway: false,
    "scroll-section": false,
    section4: false,
  };
  // Select all sections
  const sections = document.querySelectorAll(".section");
  const section0ToScroll = document.getElementById("gatewayUpperSide");
  const section1ToScroll = document.getElementById("category");
  const section2ToScroll = document.getElementById("gateway");
  const section3ToScroll = document.getElementById("scroll-section");
  // Function to handle intersection changes
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      // Check if at least 20% of the section is visible
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        if (!sectionStatus[sectionId]) {
          // Update the status to true and scroll to the section
          sectionStatus[sectionId] = true;
          entry.target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActiveSection(sectionId); // Set active section
        }
      } else {
        // Reset status when not intersecting
        sectionStatus[sectionId] = false;
        removeActiveSection(sectionId); // Remove active state
      }
    });
  };
  // Create an IntersectionObserver with a threshold of 0.2
  const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    threshold: 0.5, // Trigger when 20% of the section is visible
  });
  // Observe each section
  sections.forEach((section) => observer.observe(section));
  // Function to set the active section
  const setActiveSection = (sectionId) => {
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.add("active"); // Add 'active' class to the current section
      } else {
        section.classList.remove("active"); // Remove 'active' class from other sections
      }
    });
  };
  // Function to remove the active state
  const removeActiveSection = (sectionId) => {
    document.getElementById(sectionId).classList.remove("active");
  };
  const container = document.querySelector(".container");
  const points = document.querySelectorAll(".points li");
  const mainVideo = document.getElementById("main-video");
  let currentIndex = 0;
  let isScrolling = false;
  // Set active point and image
  function setActive(index) {
    points.forEach((point, i) => {
      point.classList.toggle("active-disc", i === index);
    });
    // Change video source smoothly
    const videoSrc = points[index].dataset.video;
    mainVideo.querySelector("source").src = videoSrc;
    mainVideo.load(); // Reload the video with the new source
    currentIndex = index;
  }
  var section1ScrollStatus = true;
  section0ToScroll.addEventListener("wheel", (event) => {
    console.log(
      { sectionStatus: sectionStatus["category"], deltaY: event.deltaY },
      "section0ToScroll"
    );

    if (event.deltaY > 0 && sectionStatus["category"]) {
      section1ToScroll.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
  section1ToScroll.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (sectionStatus["category"]) {
      if (section1ScrollStatus) {
        section1ToScroll.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // section1ScrollStatus=false
        setTimeout(() => {
          section1ScrollStatus = false;
        }, 800);
      } else {
        if (isScrolling) return;
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
        if (currentIndex >= points.length - 1 && event.deltaY > 0) {
          section2ToScroll.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        if (currentIndex == 0 && event.deltaY < 0) {
          section0ToScroll.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        if (event.deltaY > 0 && currentIndex < points.length - 1) {
          setActive(currentIndex + 1);
        } else if (event.deltaY < 0 && currentIndex > 0) {
          setActive(currentIndex - 1);
        }
        if (currentIndex >= points.length - 1 && event.deltaY < 0) {
          currentIndex = points.length - 2;
          section1ToScroll.scrollTo({
            behavior: "smooth",
          });
        }
      }
    }
  });
  section2ToScroll.addEventListener("wheel", (event) => {
    if (sectionStatus["gateway"]) {
      section1ScrollStatus = true;
    }
  });
  // Handle point click
  points.forEach((point) => {
    point.addEventListener("click", () => {
      const index = parseInt(point.dataset.index);
      setActive(index);
    });
  });
  // Initialize the first point and image as active
  setActive(0);
});

// function setActive(index) {
//     videoSections.forEach((section, i) => {
//         const videoLink = section.querySelector('.video-link');
//         if (i === index) {
//             section.classList.add('active-disc');
//             videoLink.classList.add('active-link');
//         } else {
//             section.classList.remove('active-disc');
//             videoLink.classList.remove('active-link');
//         }
//     });

//     // Change video source smoothly
//     const videoSrc = videoSections[index].dataset.video;
//     mainVideo.querySelector('source').src = videoSrc;
//     mainVideo.load(); // Reload the video with the new source
// }

// function handleScroll(event) {
//     // Ensure scrolling only works when the current section is 100% visible
//     if (isScrolling || !isElementFullyVisible(videoSections[currentIndex])) return;

//     isScrolling = true;
//     setTimeout(() => { isScrolling = false; }, 300); // Throttle scroll events

//     if (event.deltaY > 0) { // Scrolling down
//         if (currentIndex < videoSections.length - 1) {
//             currentIndex++;
//             setActive(currentIndex);
//             videoSections[currentIndex].scrollIntoView({ behavior: 'smooth' });
//         }
//     } else if (event.deltaY < 0) { // Scrolling up
//         if (currentIndex > 0) {
//             currentIndex--;
//             setActive(currentIndex);
//             videoSections[currentIndex].scrollIntoView({ behavior: 'smooth' });
//         }
//     }

//     // Prevent default scrolling behavior
//     event.preventDefault();
// }

// function handleKeyNavigation(event) {
//     // Ensure scrolling only works when the current section is 100% visible
//     if (isScrolling || !isElementFullyVisible(videoSections[currentIndex])) return;

//     if (event.key === 'ArrowDown') {
//         if (currentIndex < videoSections.length - 1) {
//             currentIndex++;
//             setActive(currentIndex);
//             videoSections[currentIndex].scrollIntoView({ behavior: 'smooth' });
//         }
//     } else if (event.key === 'ArrowUp') {
//         if (currentIndex > 0) {
//             currentIndex--;
//             setActive(currentIndex);
//             videoSections[currentIndex].scrollIntoView({ behavior: 'smooth' });
//         }
//     }
// }

// // Initialize the first item as active
// setActive(0);

// // Event listeners for mouse scrolling and keyboard navigation
// document.addEventListener('wheel', handleScroll);
// document.addEventListener('keydown', handleKeyNavigation);

// keyboard platform

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video");
  const section = document.querySelector(".keyboard-platform");
  let hasPlayed = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          videos.forEach((video) => {
            video.currentTime = 0;
            video.play();
          });
          hasPlayed = true;
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  observer.observe(section);
  videos.forEach((video) => {
    video.closest("li").addEventListener("mouseover", function () {
      video.play();
    });

    video.closest("li").addEventListener("mouseleave", function () {
      video.pause();
    });
  });
});

// paatent & reserch

// Function to toggle the display of items and adjust the height of .patents-research for card-left only
function toggleListDisplay(listClass, countClass, cardClass, isLeftCard) {
  let list = document.querySelector(listClass);
  let hiddenItems = list.querySelectorAll("li:nth-child(n+5)");
  let card = document.querySelector(cardClass);
  let patentsResearch = document.querySelector(".patents-research");

  if (hiddenItems[0].style.display === "list-item") {
    hiddenItems.forEach((item) => (item.style.display = "none"));
    card.style.height = ""; // Reset height to original
    if (isLeftCard) {
      patentsResearch.style.height = "50vh"; // Reset height to 50vh only for card-left
    }
  } else {
    hiddenItems.forEach((item) => (item.style.display = "list-item"));
    card.style.height = "auto"; // Adjust height based on content
    if (isLeftCard) {
      patentsResearch.style.height = "110vh"; // Expand height to 100vh only for card-left
    }
  }
}

// Event listener for Patents (card-left section)
document.querySelector(".Patent-count img").addEventListener("click", function () {
  toggleListDisplay(".Patents", ".Patent-count", ".card-left", true);
});

// Event listener for Research Papers (card-right section)
document.querySelector(".reserch-count img").addEventListener("click", function () {
  toggleListDisplay(".reserch", ".reserch-count", ".card-right", false);
});

// Gateway

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#gateway");

  // Add 'no-animation' class initially to prevent animations
  section.classList.add("no-animation");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When section is visible, remove 'no-animation' class
          entry.target.classList.remove("no-animation");
          // Stop observing the section if you only want to trigger the animations once
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  ); // Adjust threshold as needed

  // Start observing the section
  observer.observe(section);
});
