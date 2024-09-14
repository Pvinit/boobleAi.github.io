let lastScrollTop = 0;

const header = document.querySelector("header");
const setSection = document.querySelector("section");




// keyboard platform

// document.addEventListener("DOMContentLoaded", function () {
//   const videos = document.querySelectorAll(".video");
//   const section = document.querySelector(".keyboard-platform");
//   let hasPlayed = false;
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting && !hasPlayed) {
//           videos.forEach((video) => {
//             video.currentTime = 0;
//             video.play();
//           });
//           hasPlayed = true;
//         }
//       });
//     },
//     {
//       threshold: 0.5,
//     }
//   );
//   observer.observe(section);
//   videos.forEach((video) => {
//     video.closest("li").addEventListener("mouseover", function () {
//       video.play();
//     });

//     video.closest("li").addEventListener("mouseleave", function () {
//       video.pause();
//     });
//   });
// });

// paatent & reserch




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

// document.addEventListener("DOMContentLoaded", () => {
//   const isMobileDevice = () => window.innerWidth <= 768;
//   const container = document.querySelector(".main-container");
//   // const sectionSqus = document.querySelectorAll('.section-squ');
//   // const windowHeight = window.innerHeight;
//   let lastScrollTop = 0; // To keep track of the last scroll position

//   function handleScroll(event) {
//     const scrollPosition = container.scrollTop;

//     // Determine if user is scrolling up or down
//     const isScrollingDown = scrollPosition > lastScrollTop;

//     // Handle different actions based on scroll direction
//     // if (!isMobileDevice()) {
//     if (isScrollingDown) {
//       // Logic for scrolling down
//       headerScrollTopNav(false);
//     } else {
//       // Logic for scrolling up
//       headerScrollTopNav(true);
//     }
//     // }
//     // Update the last scroll position
//     lastScrollTop = scrollPosition <= 564 ? 564 : scrollPosition;
//   }

//   // Attach the scroll event to the main container
//   container.addEventListener("scroll", handleScroll);
//   window.addEventListener("load", () => {
//     headerScrollTopNav(true);
//     // Code that needs all resources to be fully loaded
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const scrollLink = document.querySelector("a[href='#section0']");
//   const section0 = document.getElementById("section0");

//   scrollLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     section0.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   });
// });

// const foregroundImages = [
//   document.getElementById("img1"),
//   document.getElementById("img2"),
//   document.getElementById("img3"),
// ];

// let currentImageIndex = 0;

// function showNextImage() {
//   // Hide all foreground images
//   foregroundImages.forEach((img) => img.classList.remove("active"));

//   // Show the next foreground image
//   currentImageIndex = (currentImageIndex + 1) % foregroundImages.length;
//   foregroundImages[currentImageIndex].classList.add("active");
// }

// Change the foreground image every 3 seconds
// setInterval(showNextImage, 3000);

// Initialize the first image as active
// foregroundImages[0].classList.add("active");

// const images = document.querySelectorAll(".category2-img img");

// let currentIndex = 0;

// function changeImage() {
//   images[currentIndex].classList.remove("active");
//   images[currentIndex].classList.add("hidden");
//   currentIndex = (currentIndex + 1) % images.length;
//   images[currentIndex].classList.add("active");
//   images[currentIndex].classList.remove("hidden");
// }

// images[currentIndex].classList.add("active");

// setInterval(changeImage, 2500);
