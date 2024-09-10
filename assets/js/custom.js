
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
      section3: document.getElementById("section3"),
    };

    let currentIndex = 0;
    let isScrolling = false;
    let sectionScrollStatus = { section0: false, section1: false, section2: false, };
    let section1ScrollAllowed = true;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.3,
    });
    console.log({ sections })
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
    const container = document.querySelector('.main-container');
    // sectionElements.section0.addEventListener("wheel", handleScroll.bind(null, "section0", "section1", "section0", 0, 0));
    sectionElements.section1.addEventListener("wheel", handleScroll.bind(null, "section1", "section2", "section0", 1, currentIndex));

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
        console.log({ currentIndex, currentSection, nextSection, length: points.length, deltaY })
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
      console.log({ currentIndex, length: points.length, direction })
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

document.addEventListener('scroll', () => {
  const container = document.querySelector('.main-container');
  const sections = document.querySelectorAll('.section');
  // Get the position of the fourth section
  const fourthSection = sections[3]; // index 3 for the 4th section
  const rect = fourthSection.getBoundingClientRect();

  console.log({ bottom: rect.bottom })
  // Check if the fourth section is in the viewport
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    container.classList.add('no-snap');
  } else {
    container.classList.remove('no-snap');
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

document.addEventListener('DOMContentLoaded', () => {

  const scrollSection = document.getElementById('section3');

  // Function to handle the intersection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        scrollSection.classList.remove('scale-up-view'); // Remove the fade-out state
        scrollSection.classList.add('scale-down-view'); // Add the scaling down state
      } else {
        scrollSection.classList.remove('scale-down-view'); // Remove the scaling down state
        scrollSection.classList.add('scale-up-view'); // Add the fade-out state
      }
    });
  }, {
    root: null, // Use the viewport as the root
    // rootMargin: '-50% 0px -50% 0px', // Trigger when the element is at the center
    threshold: 0.05 // Adjust the threshold to fine-tune
  });

  observer.observe(scrollSection);
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

document.addEventListener('DOMContentLoaded', () => {
  const toggleListDisplay = (listClass, countClass, cardClass, isLeftCard) => {
    const list = document.querySelector(listClass);
    const hiddenItems = list ? list.querySelectorAll("li:nth-child(n+5)") : [];
    const card = document.querySelector(cardClass);
    const patentsResearch = document.querySelector(".patents-research");

    if (hiddenItems.length === 0) return;

    const isHidden = hiddenItems[0].style.display === "list-item";
    if (isHidden) {
      hiddenItems.forEach(item => item.style.display = "none");
      card.style.height = "230px"; // Reset height to original
      card.style.overflowY = "hidden"; // Hide overflow
      if (isLeftCard && patentsResearch) {
        //patentsResearch.style.height = "50vh"; // Reset height to 50vh only for card-left
      }
    } else {
      hiddenItems.forEach(item => item.style.display = "list-item");
      card.style.height = "300px"; // Set a fixed height when expanded
      card.style.overflowY = "auto"; // Enable scrolling within the fixed height
      if (isLeftCard && patentsResearch) {
        //patentsResearch.style.height = "50vh"; // Keep height to 50vh for the section
      }
    }
  };

  const setupToggleButtons = (buttonId, containerId, listClass, countClass, cardClass, isLeftCard) => {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    if (button) {
      button.addEventListener('click', () => {
        button.style.display = 'none';
        toggleListDisplay(listClass, countClass, cardClass, isLeftCard);
      });
    }

    if (container) {
      container.addEventListener('click', (event) => {
        if (event.target !== button) {
          // button.style.display = 'block';
          if (button.style.display === 'none') {
            button.style.display = 'block'; // Show button
            toggleListDisplay(listClass, countClass, cardClass, isLeftCard);
          }
        }
      });
    }
  };

  // Setup toggle for left side
  setupToggleButtons('leftDown', 'leftUp', '.Patents', '.Patent-count', '.card-left', true);

  // Setup toggle for right side
  setupToggleButtons('rightDown', 'rightUp', '.reserch', '.reserch-count', '.card-right', false);
});
