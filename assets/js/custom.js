///// Test new
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
let last_scroll_val = 0;

const isElementXPercentInViewport = function(el, percentVisible) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

const customScrollSpeed = (pos, time) => {
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

let scrolled = false;
let section_scroll_completed = false;
let scroll_function = function(event){
    if(!section_scroll_completed){
        console.log("scroll");
        if(scrolled){
            return;
        }

        scrolled = true;
        document.body.classList.add("stop-scrolling");


        event.preventDefault();

        let new_scroll_val = window.pageYOffset;
        let scroll_dir = null;

        if(last_scroll_val - new_scroll_val < 0){
            scroll_dir = "up";
        } else if(last_scroll_val - new_scroll_val > 0){
            scroll_dir = "down";
        }

        last_scroll_val = new_scroll_val;

        console.log("scroll_dir", scroll_dir);
        if(scroll_dir == "up"){
            // scrolled = true;
            // document.removeEventListener("scroll", scroll_function);

            let gatewayUpperSideSection = document.getElementById("gatewayUpperSide");
            let categorySection = document.getElementById("category");


            if(isElementXPercentInViewport(gatewayUpperSideSection, 90)){
                // document.body.classList.add("stop-scrolling");
                // categorySection.scrollIntoView({ behavior: 'smooth' })
                customScrollSpeed(categorySection.offsetTop - 108, 2);
                let first_video_section_elm = categorySection.querySelectorAll("li.video-section")[0];

                first_video_section_elm.classList.add("active-disc");
                first_video_section_elm.querySelector(".video-link").classList.add("active-link");
                setTimeout(function(){
                // document.addEventListener("scrollend", function(){
                    scrolled = false;
                    document.body.classList.remove("stop-scrolling");
                // });
                },1500);
            }

            if(isElementFullyVisible(categorySection)){
                // document.body.classList.add("stop-scrolling");
                let current_video_section_elm = categorySection.querySelector("li.video-section.active-disc");
                let next_video_section_elm = current_video_section_elm.nextElementSibling;
                if(next_video_section_elm){
                    current_video_section_elm.classList.remove("active-disc");
                    current_video_section_elm.querySelector(".video-link").classList.remove("active-link");
                    
                    next_video_section_elm.classList.add("active-disc");
                    next_video_section_elm.querySelector(".video-link").classList.add("active-link");

                    categorySection.querySelector("#main-video").src = next_video_section_elm.getAttribute("data-video");
                    document.addEventListener("scrollend", function(){
                        scrolled = false;
                        document.body.classList.remove("stop-scrolling");
                    });
                } else {
                    section_scroll_completed = true;
                    scrolled = false;
                    document.body.classList.remove("stop-scrolling");
                }

                
                // setTimeout(function(){
                //     scrolled = false;
                //     document.body.classList.remove("stop-scrolling");
                // },1000);
                
            }

        }
    }

};


document.addEventListener("scroll", scroll_function);


//// Test new end



// for nav bar scroll effect

let lastScrollTop = 0;
const header = document.querySelector('header');

// window.addEventListener('scroll', function() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         header.style.top = '-100px'; // Adjust this value to hide the header smoothly
//     } else {
//         // Scrolling up
//         header.style.top = '0';
//     }

//     lastScrollTop = scrollTop;
// });



// Scroll transition for Keyboard as-a-platform

const scrollSection = document.getElementById('scroll-section');

// window.addEventListener('scroll', () => {
//     const scrollPosition = window.scrollY;
//     const sectionOffset = scrollSection.offsetTop;

//     // Adjust the threshold value to control when the section disappears
//     if (scrollPosition > sectionOffset + 150) {
//         scrollSection.style.transform = 'translateY(50%) scale(0.5)'; // Squeeze and move down
//         scrollSection.style.opacity = '0'; // Fade out section
//     } else {
//         scrollSection.style.transform = 'translateY(0) scale(1)'; // Reset position and size
//         scrollSection.style.opacity = '1'; // Reset opacity
//     }
// });




//   catogory 

// const videoSections = document.querySelectorAll('.video-section');
// const mainVideo = document.getElementById('main-video');
// let currentIndex = 0;
// let isScrolling = false;

// // Helper function to check if an element is fully (100%) visible in the viewport
function isElementFullyVisible(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Ensure the top is at the top of the viewport and the bottom is at the bottom of the viewport
    return rect.top >= 0 && rect.bottom <= windowHeight;
}

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


document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.video');
    const section = document.querySelector('.keyboard-platform');
    let hasPlayed = false; 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayed) {
                videos.forEach(video => {
                    video.currentTime = 0; 
                    video.play();
                });
                hasPlayed = true; 
            }
        });
    }, {
        threshold: 0.5
    });
    observer.observe(section);
    videos.forEach(video => {
        video.closest('li').addEventListener('mouseover', function () {
            video.play();
        });

        video.closest('li').addEventListener('mouseleave', function () {
            video.pause();
        });
    });
});



// paatent & reserch 

// Function to toggle the display of items and adjust the height of .patents-research for card-left only
function toggleListDisplay(listClass, countClass, cardClass, isLeftCard) {
  let list = document.querySelector(listClass);
  let hiddenItems = list.querySelectorAll('li:nth-child(n+5)');
  let card = document.querySelector(cardClass);
  let patentsResearch = document.querySelector('.patents-research');

  if (hiddenItems[0].style.display === 'list-item') {
      hiddenItems.forEach(item => item.style.display = 'none');
      card.style.height = ''; // Reset height to original
      if (isLeftCard) {
          patentsResearch.style.height = '50vh'; // Reset height to 50vh only for card-left
      }
  } else {
      hiddenItems.forEach(item => item.style.display = 'list-item');
      card.style.height = 'auto'; // Adjust height based on content
      if (isLeftCard) {
          patentsResearch.style.height = '110vh'; // Expand height to 100vh only for card-left
      }
  }
}

// Event listener for Patents (card-left section)
document.querySelector('.Patent-count img').addEventListener('click', function() {
  toggleListDisplay('.Patents', '.Patent-count', '.card-left', true);
});

// Event listener for Research Papers (card-right section)
document.querySelector('.reserch-count img').addEventListener('click', function() {
  toggleListDisplay('.reserch', '.reserch-count', '.card-right', false);
});



// Gateway 


document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#gateway');
    
    // Add 'no-animation' class initially to prevent animations
    section.classList.add('no-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When section is visible, remove 'no-animation' class
                entry.target.classList.remove('no-animation');
                // Stop observing the section if you only want to trigger the animations once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Start observing the section
    observer.observe(section);
});
  
  
  
  


