let lastScrollTop = 0;

const header = document.querySelector("header");
const setSection = document.querySelector("section");

const allSections = [...document.querySelectorAll(".section")];
const headerScrollTopNav = (status) => {
  if (!status) {
    // Scrolling down
    header.style.top = "-100px"; // Adjust this value to hide the header smoothly
  } else {
    // Scrolling up
    header.style.top = "0";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const isMobileDevice = () => window.innerWidth <= 768;
  const sections = [...document.querySelectorAll(".section")].slice(0, 5);
  const points = [...document.querySelectorAll(".points li")];
  const mainVideo = document.getElementById("main-video");

  // const points = [...document.querySelectorAll(".points li")];
  // const mainVideo = document.getElementById("main-video");
  let currentIndex = 0;
  let autoRunInterval;

  // Function to set the active video and point
  function setActive(index) {
    points.forEach((point, i) =>
      point.classList.toggle("active-disc", i === index)
    );
    const videoSrc = points[index].dataset.video;
    mainVideo.querySelector("source").src = videoSrc;
    mainVideo.load();
    // Reset and trigger the animation
    mainVideo.style.animation = "none"; // Reset animation
    mainVideo.offsetHeight; // Trigger reflow to restart the animation
    if (currentIndex < index) {
      mainVideo.style.animation = "videoSlideLeft 1s ease-out"; // Re-apply the animation
    } else {
      mainVideo.style.animation = "videoSlideRight 1s ease-out"; // Re-apply the animation
    }
    currentIndex = index;
  }

  // Function to start the auto-run slider
  function startAutoRun() {
    autoRunInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % points.length; // Cycle through points
      setActive(currentIndex);
    }, 5000); // Change video every 5 seconds
  }

  // Function to stop the auto-run slider
  function stopAutoRun() {
    clearInterval(autoRunInterval);
  }

  // Event listeners for mouse events to stop/start auto-run
  points.forEach((point) => {
    point.addEventListener("click", () => {
      setActive(parseInt(point.dataset.index));
      stopAutoRun(); // Stop auto-run on manual selection
    });
  });

  // Start the auto-run slider
  setActive(0);
  startAutoRun();

  // Optional: Stop auto-run on hover or touch (mobile-friendly)
  const container = document.querySelector(".category");
  container.addEventListener("mouseenter", stopAutoRun); // Stop on mouse hover
  container.addEventListener("mouseleave", startAutoRun); // Restart on mouse leave
  container.addEventListener("touchstart", stopAutoRun); // Stop on mobile touch
  container.addEventListener("touchend", startAutoRun); // Restart after touch ends
});

// Gateway Mobile View Slider
document.addEventListener("DOMContentLoaded", function () {
  const points = [...document.querySelectorAll(".gateway-list li")];
  let currentIndex = 0;
  let autoRunInterval;

  // Function to set the active video and point
  function setActive(index) {
    points.forEach((point, i) =>
      point.classList.toggle("active-disc", i === index)
    );

    currentIndex = index;
  }

  // Function to start the auto-run slider
  function startAutoRun() {
    autoRunInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % points.length; // Cycle through points
      setActive(currentIndex);
    }, 5000); // Change video every 5 seconds
  }

  // Function to stop the auto-run slider
  function stopAutoRun() {
    clearInterval(autoRunInterval);
  }

  // Event listeners for mouse events to stop/start auto-run
  points.forEach((point) => {
    point.addEventListener("click", () => {
      setActive(parseInt(point.dataset.index));
      stopAutoRun(); // Stop auto-run on manual selection
    });
  });

  // Start the auto-run slider
  setActive(0);
  startAutoRun();

  // Optional: Stop auto-run on hover or touch (mobile-friendly)
  const container = document.querySelector(".gateway-list");
  container.addEventListener("mouseenter", stopAutoRun); // Stop on mouse hover
  container.addEventListener("mouseleave", startAutoRun); // Restart on mouse leave
  container.addEventListener("touchstart", stopAutoRun); // Stop on mobile touch
  container.addEventListener("touchend", startAutoRun); // Restart after touch ends
});

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

document.addEventListener("DOMContentLoaded", () => {
  const toggleListDisplay = (listClass, countClass, cardClass, isLeftCard) => {
    const list = document.querySelector(listClass);
    const hiddenItems = list ? list.querySelectorAll("li:nth-child(n+5)") : [];
    const card = document.querySelector(cardClass);
    const patentsResearch = document.querySelector(".patents-research");

    if (hiddenItems.length === 0) return;

    // video1.classList.add('hidden');
    // video3.classList.remove('hidden');
    const isHidden = hiddenItems[0].style.display === "list-item";
    if (isHidden) {
      hiddenItems.forEach((item) => (item.style.display = "none"));
      // card.style.height = "300px"; // Reset height to original
      // card.style.overflowY = "hidden"; // Hide overflow
      card.classList.remove("more");
      if (isLeftCard && patentsResearch) {
        //patentsResearch.style.height = "50vh"; // Reset height to 50vh only for card-left
      }
    } else {
      hiddenItems.forEach((item) => (item.style.display = "list-item"));
      // card.style.height = "400px"; // Set a fixed height when expanded
      // card.style.overflowY = "auto"; // Enable scrolling within the fixed height
      card.classList.add("more");
      if (isLeftCard && patentsResearch) {
        //patentsResearch.style.height = "50vh"; // Keep height to 50vh for the section
      }
    }
  };

  const setupToggleButtons = (
    buttonId,
    containerId,
    listClass,
    countClass,
    cardClass,
    isLeftCard
  ) => {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    const list = document.querySelector(listClass + "  .list");

    if (button) {
      button.addEventListener("click", () => {
        button.style.display = "none";
        list.style.cursor = "pointer";
        toggleListDisplay(listClass, countClass, cardClass, isLeftCard);
      });
    }

    if (container) {
      container.addEventListener("click", (event) => {
        if (event.target !== button) {
          // button.style.display = 'block';
          if (button.style.display === "none") {
            button.style.display = "block"; // Show button
            list.style.cursor = "unset";
            toggleListDisplay(listClass, countClass, cardClass, isLeftCard);
          }
        }
      });
    }
  };

  // Setup toggle for left side
  setupToggleButtons(
    "leftDown",
    "leftUp",
    ".patents",
    ".view-more",
    ".card-left",
    true
  );
  setupToggleButtons(
    "readMoreLeft",
    "leftUp",
    ".patents",
    ".view-more",
    ".card-left",
    true
  );

  // Setup toggle for right side
  setupToggleButtons(
    "rightDown",
    "rightUp",
    ".reserch",
    ".view-more",
    ".card-right",
    false
  );
  setupToggleButtons(
    "readMoreRight",
    "rightUp",
    ".reserch",
    ".view-more",
    ".card-right",
    false
  );
});

//video mp4
// Get references to the video elements
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");

// Set video sources
video1.src = "./assets/images/homepage_video_1.webm"; // Set the path to your first video
video2.src = "./assets/images/homepage_video_1.webm"; // Set the path to your second video
video3.src = "./assets/images/homepage_video_1.webm"; // Set the path to your third video

// Play the first video once
video1.onended = function () {
  video1.classList.add("hidden");
  video3.classList.remove("hidden");
  video3.play(); // Start playing the third video in a loop
};

// // Hover to play the second video
// video1.addEventListener("mouseover", function () {
//   video1.classList.add("hidden");
//   video2.classList.remove("hidden");
//   video2.play();
// });

// video2.addEventListener("mouseout", function () {
//   video2.classList.add("hidden");
//   video1.classList.remove("hidden");
//   video1.play(); // Play the first video again (can be muted or looped)
// });

// Scroll down to stop the third video
// window.addEventListener("scroll", function () {
//   if (window.scrollY > 50) {
//     // If the user scrolls down more than 50px
//     video3.pause();
//   } else {
//     video3.play(); // Continue playing the third video if scrolled back up
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const isMobileDevice = () => window.innerWidth <= 768;
  const container = document.querySelector(".main-container");
  // const sectionSqus = document.querySelectorAll('.section-squ');
  // const windowHeight = window.innerHeight;
  let lastScrollTop = 0; // To keep track of the last scroll position

  function handleScroll(event) {
    const scrollPosition = container.scrollTop;

    // Determine if user is scrolling up or down
    const isScrollingDown = scrollPosition > lastScrollTop;

    // Handle different actions based on scroll direction
    // if (!isMobileDevice()) {
    if (isScrollingDown) {
      // Logic for scrolling down
      headerScrollTopNav(false);
    } else {
      // Logic for scrolling up
      headerScrollTopNav(true);
    }
    // }
    console.log({ scrollPosition });
    // Update the last scroll position
    lastScrollTop = scrollPosition <= 564 ? 564 : scrollPosition;
  }

  // Attach the scroll event to the main container
  container.addEventListener("scroll", handleScroll);
  window.addEventListener("load", () => {
    headerScrollTopNav(true);
    // Code that needs all resources to be fully loaded
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollLink = document.querySelector("a[href='#section0']");
  const section0 = document.getElementById("section0");

  scrollLink.addEventListener("click", function (e) {
    e.preventDefault();
    section0.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const foregroundImages = [
  document.getElementById("img1"),
  document.getElementById("img2"),
  document.getElementById("img3"),
];

let currentImageIndex = 0;

function showNextImage() {
  // Hide all foreground images
  foregroundImages.forEach((img) => img.classList.remove("active"));

  // Show the next foreground image
  currentImageIndex = (currentImageIndex + 1) % foregroundImages.length;
  foregroundImages[currentImageIndex].classList.add("active");
}

// Change the foreground image every 3 seconds
setInterval(showNextImage, 3000);

// Initialize the first image as active
foregroundImages[0].classList.add("active");

const images = document.querySelectorAll(".category2-img img");

let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove("active");
  images[currentIndex].classList.add("hidden");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
  images[currentIndex].classList.remove("hidden");
}

images[currentIndex].classList.add("active");

setInterval(changeImage, 2500);
