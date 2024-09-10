document.addEventListener("DOMContentLoaded", function () {
  // const slides = document.querySelectorAll(".slides");

  const container = document.querySelector('.main-container');
  const slides = document.querySelectorAll('.slides');


  const slide0 = document.querySelector(".slide1");

  // Intersection Observer callback function
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Slide0 is in view, add 'view' class and remove 'active' class
        // entry.target.classList.add("inactive");
        // entry.target.classList.remove("active");
        container.style.scrollSnapType = 'unset';
        // Call this function on relevant events, such as scroll or slide activation
        // updateScrollSnap();
      } else {
        // Slide0 is out of view, remove 'view' class 
        // entry.target.classList.add("active");
        // entry.target.classList.remove("inactive");
        container.style.scrollSnapType = 'y mandatory'; // Enable snapping if there's an active slide

        // Call this function on relevant events, such as scroll or slide activation
        // updateScrollSnap();
      }
    });
  };

  // Create Intersection Observer
  const observerOptions = {
    root: null, // Use the viewport as the container
    threshold: 0.5, // Element is in view when 50% or more of it is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe slide0
  observer.observe(slide0);
});

let lastScrollTop = 0;
const header = document.querySelector("header");
const setSection = document.querySelector("section");

const allSections = [...document.querySelectorAll(".section")];
const headerScrollTop = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // if (scrollTop > lastScrollTop) {
  //   // Scrolling down
  //   header.style.top = "-100px"; // Adjust this value to hide the header smoothly
  //   setSection.style.top = "0"

  // } else {
  //   // Scrolling up
  //   header.style.top = "0";
  //   setSection.style.top = "100"
  // }

  lastScrollTop = scrollTop;
}


document.addEventListener("DOMContentLoaded", () => {

  const isMobileDevice = () => window.innerWidth <= 768;
  const sections = [...document.querySelectorAll(".section")].slice(0, 3);
  const points = [...document.querySelectorAll(".points li")];
  const mainVideo = document.getElementById("main-video");



  if (!isMobileDevice()) {

    const sectionElements = {
      section0: document.getElementById("section0"),
      section1: document.getElementById("section1"),
      section2: document.getElementById("section2"),
      // section3: document.getElementById("section3"),
    };

    let currentIndex = 0;
    let isScrolling = false;
    let sectionScrollStatus = { section0: false, section1: false, section2: false, section3: false };
    let section1ScrollAllowed = true;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.3,
    });

    sections.forEach((section) => observer.observe(section));
    points.forEach((point) => point.addEventListener("click", () => setActive(parseInt(point.dataset.index))));

    setActive(0);

    // Add event listener for arrow key presses
    document.addEventListener("keydown", handleKeyNavigation);

    function handleIntersection(entries) {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        const sectionId = target.id;
        console.log({ sectionId, isIntersecting, intersectionRatio })
        if (isIntersecting && intersectionRatio >= 0.2 && ["section0", "section1", "section2"].includes(sectionId)) {
          if (!sectionScrollStatus[sectionId]) {
            sectionScrollStatus[sectionId] = true;
            // target.scrollIntoView({ behavior: "smooth", block: "start" });

            // Immediately correct the scroll position to the exact top 
            window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
            setActiveSection(sectionId);
          }
        } else {
          sectionScrollStatus[sectionId] = false;
          removeActiveSection(sectionId);
        }
      });
    }

    function setActive(index) {
      points.forEach((point, i) => point.classList.toggle("active-disc", i === index));
      const videoSrc = points[index].dataset.video;
      mainVideo.querySelector("source").src = videoSrc;
      mainVideo.load();
      // Reset and trigger the animation
      mainVideo.style.animation = 'none'; // Reset animation
      mainVideo.offsetHeight; // Trigger reflow to restart the animation
      // mainVideo.style.animation = 'slideUp 1s ease-out'; // Re-apply the animation
      if (currentIndex < index) {
        mainVideo.style.animation = 'slideUp 1s ease-out'; // Re-apply the animation
      } else {
        mainVideo.style.animation = 'slideDown 1s ease-out'; // Re-apply the animation
      }

      currentIndex = index;
    }

    function setActiveSection(sectionId) {
      sections.forEach((section) => section.classList.toggle("active", section.id === sectionId));
    }

    function removeActiveSection(sectionId) {
      document.getElementById(sectionId)?.classList?.remove("active");
    }

    // sectionElements.section0.addEventListener("wheel", handleScroll.bind(null, "section0", "section1", "section0", 0, 0));
    sectionElements.section1.addEventListener("wheel", handleScroll.bind(null, "section1", "section2", "section0", 1, currentIndex));
    // sectionElements.section2.addEventListener("wheel", handleScroll.bind(null, "section2", "section3", "section1", 2, points.length - 1));
    // sectionElements.section3.addEventListener("wheel", handleScroll.bind(null, "section3", "section4", "section2", 3, points.length - 1));
    // sectionElements.section4.addEventListener("wheel", handleScroll.bind(null, "section4", "section5", "section3", 4, points.length - 1));
    // sectionElements.section5.addEventListener("wheel", handleScroll.bind(null, "section5", "section6", "section4", 5, points.length - 1));
    // sectionElements.section6.addEventListener("wheel", handleScroll.bind(null, "section6", "section7", "section5", 6, points.length - 1));
    // sectionElements.section7.addEventListener("wheel", handleScroll.bind(null, "section7", "section8", "section6", 7, points.length - 1));
    // sectionElements.section8.addEventListener("wheel", handleScroll.bind(null, "section8", "section8", "section7", 8, points.length - 1));

    var scrollCount = false;
    function handleScroll(currentSection, nextSection, pvrSection, sectionIndex, cIndex, event) {
      event.preventDefault();
      const deltaY = event.deltaY;
      if (deltaY < 0) { headerScrollTop(); }

      if (sectionScrollStatus[currentSection]) {
        if (currentSection === "section1" && section1ScrollAllowed) {
          section1ScrollAllowed = false;
          setTimeout(() => (section1ScrollAllowed = true), 800);
          return;
        }

        if (isScrolling) return;
        isScrolling = true;
        setTimeout(() => (isScrolling = false), 800);
        // console.log({ currentIndex, currentSection, nextSection, length: points.length, deltaY })
        if (deltaY > 0 && currentIndex < points.length - 1 && currentSection === "section1") {
          setActive(currentIndex + 1);
        } else if (deltaY < 0 && currentIndex > 0 && currentSection === "section1") {
          setActive(currentIndex - 1);
        } else if (currentIndex === 0 && deltaY < 0 && nextSection !== "section1") {
          setActive(cIndex);
          sectionElements.section0.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (currentIndex >= points.length - 1 && deltaY > 0) {
          setActive(points.length - 1);
          sectionElements[nextSection].scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          if (scrollCount) {
            setActive(cIndex);
            if (deltaY > 0) {
              sectionElements[nextSection].scrollIntoView({ block: "start" });
            } else {
              sectionElements[pvrSection].scrollIntoView({ block: "start" });
            }
            scrollCount = false
          } else {
            setTimeout(() => (scrollCount = true), 500);
          }
        }
      }
    }

    // Function to handle arrow key navigation
    function handleKeyNavigation(event) {
      if (!sectionScrollStatus["section1"]) {
        return;
      }
      switch (event.key) {
        case "ArrowUp":
          handleScrollKey(-1); // Scroll up
          break;
        case "ArrowDown":
          handleScrollKey(1); // Scroll down
          break;
        default:
          break;
      }
    }

    function handleScrollKey(direction) {
      if (isScrolling) return;
      isScrolling = true;
      setTimeout(() => (isScrolling = false), 800);
      // console.log({ currentIndex, length: points.length, direction })
      if (direction > 0 && currentIndex < points.length - 1) {
        setActive(currentIndex + 1);
      } else if (direction < 0 && currentIndex > 0) {
        setActive(currentIndex - 1);
      } else if (currentIndex === 0 && direction < 0) {
        sectionElements.section0.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (currentIndex >= points.length - 1 && direction > 0) {
        sectionElements[`section2`]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  } else {
    // const points = [...document.querySelectorAll(".points li")];
    // const mainVideo = document.getElementById("main-video");
    let currentIndex = 0;
    let autoRunInterval;

    // Function to set the active video and point
    function setActive(index) {
      points.forEach((point, i) => point.classList.toggle("active-disc", i === index));
      const videoSrc = points[index].dataset.video;
      mainVideo.querySelector("source").src = videoSrc;
      mainVideo.load();
      // Reset and trigger the animation
      mainVideo.style.animation = 'none'; // Reset animation
      mainVideo.offsetHeight; // Trigger reflow to restart the animation
      if (currentIndex < index) {
        mainVideo.style.animation = 'slideUp 1s ease-out'; // Re-apply the animation
      } else {
        mainVideo.style.animation = 'slideDown 1s ease-out'; // Re-apply the animation
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
    container.addEventListener("touchend", startAutoRun);  // Restart after touch ends

  }

});



// Gateway Mobile View Slider
document.addEventListener('DOMContentLoaded', function () {
  const points = [...document.querySelectorAll(".gateway-list li")];
  let currentIndex = 0;
  let autoRunInterval;

  // Function to set the active video and point
  function setActive(index) {
    points.forEach((point, i) => point.classList.toggle("active-disc", i === index));

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
  container.addEventListener("touchend", startAutoRun);  // Restart after touch ends 
});

// Scroll transition for Keyboard as-a-platform

// const scrollSection = document.getElementById("section3");
// window.addEventListener("scroll", () => {
//   const scrollPosition = window.scrollY;
//   if (!scrollSection?.offsetTop) return;
//   const sectionOffset = scrollSection.offsetTop;
//   const isMobileDevice = () => window.innerWidth <= 768;

//   const setSectionOffset = isMobileDevice() ? sectionOffset + 500 : sectionOffset + 150;
//   // Adjust the threshold value to control when the section disappears
//   if (scrollPosition > setSectionOffset) {
//     scrollSection.style.transform = "translateY(50%) scale(0.5)"; // Squeeze and move down
//     scrollSection.style.opacity = "0"; // Fade out section
//   } else {
//     scrollSection.style.transform = "translateY(0) scale(1)"; // Reset position and size
//     scrollSection.style.opacity = "1"; // Reset opacity
//   }
// });


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
    card.style.height = "230px"; // Reset height to original
    card.style.overflowY = "hidden"; // Hide overflow
    if (isLeftCard) {
      //patentsResearch.style.height = "50vh"; // Reset height to 50vh only for card-left
    }
  } else {
    hiddenItems.forEach((item) => (item.style.display = "list-item"));
    card.style.height = "300px"; // Set a fixed height when expanded
    card.style.overflowY = "auto";  // Enable scrolling within the fixed height
    if (isLeftCard) {
      // patentsResearch.style.height = "50vh"; // Keep height to 50vh for the section
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
