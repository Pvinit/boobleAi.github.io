
// for nav bar scroll effect

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.top = '-100px'; // Adjust this value to hide the header smoothly
    } else {
        // Scrolling up
        header.style.top = '0';
    }

    lastScrollTop = scrollTop;
});



// Scroll transition for Keyboard as-a-platform

const scrollSection = document.getElementById('scroll-section');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sectionOffset = scrollSection.offsetTop;

    // Adjust the threshold value to control when the section disappears
    if (scrollPosition > sectionOffset + 150) {
        scrollSection.style.transform = 'translateY(50%) scale(0.5)'; // Squeeze and move down
        scrollSection.style.opacity = '0'; // Fade out section
    } else {
        scrollSection.style.transform = 'translateY(0) scale(1)'; // Reset position and size
        scrollSection.style.opacity = '1'; // Reset opacity
    }
});




//   catogory 

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('main-video');
    const sourceElement = video.querySelector('source');
    const videoSections = Array.from(document.querySelectorAll('.video-section'));
    const discItems = Array.from(document.querySelectorAll('.custom-list li'));
    const gatewaySection = document.getElementById('gateway');
    const categorySection = document.querySelector('.category');
    const gatewayUpperSection = document.getElementById('gatewayUpperSide');
    let activeSectionIndex = 0;
    let currentListItemIndex = 0;
    let isCategoryFullyVisible = false;
  
    const isMobileDevice = () => window.innerWidth <= 768;
  
    // Set and play the video for a given section index
    const setVideoForSection = (index) => {
        const section = videoSections[index];
        const newSource = section.getAttribute('data-video');
        if (sourceElement.getAttribute('src') !== newSource) {
            sourceElement.setAttribute('src', newSource);
            video.load();
            video.play().catch(error => console.warn('Play error:', error));
        }
    };
  
    // Highlight the active section and disc item
    const highlightActiveItems = (index) => {
        document.querySelector('.video-link.active-link')?.classList.remove('active-link');
        discItems.forEach(item => item.classList.remove('active-disc'));
        videoSections[index].querySelector('.video-link').classList.add('active-link');
        discItems[index]?.classList.add('active-disc');
    };
  
    // Initialize video playback and highlight for the initial section
    const initializeVideoPlayback = () => {
        setVideoForSection(activeSectionIndex);
        highlightActiveItems(activeSectionIndex);
    };
  
    // Scroll event handler to update video and highlight
    const handleScrollEvent = (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
            activeSectionIndex = videoSections.indexOf(visibleEntry.target);
            setVideoForSection(activeSectionIndex);
            highlightActiveItems(activeSectionIndex);
        }
    };
  
    // Add event listeners for desktop interactions
    const initializeDesktopInteractions = () => {
        const observerOptions = { root: null, threshold: [1.0] };
        const observer = new IntersectionObserver(handleScrollEvent, observerOptions);
        videoSections.forEach(section => observer.observe(section));
  
        // Handle wheel scrolling to navigate through list items and sections
        document.addEventListener('wheel', (event) => {
            if (isCategoryFullyVisible) {
                if (event.deltaY > 0) {
                    // Scrolling down
                    if (currentListItemIndex < discItems.length - 1) {
                        currentListItemIndex++;
                        discItems[currentListItemIndex].scrollIntoView({ behavior: "smooth", block: "center" });
                        discItems[currentListItemIndex].classList.add("active-disc");
                        discItems[currentListItemIndex - 1]?.classList.remove("active-disc");
                    } else {
                        // If at the last list item, move to the gateway section
                        gatewaySection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    // Scrolling up
                    if (currentListItemIndex > 0) {
                        currentListItemIndex--;
                        discItems[currentListItemIndex].scrollIntoView({ behavior: "smooth", block: "center" });
                        discItems[currentListItemIndex].classList.add("active-disc");
                        discItems[currentListItemIndex + 1]?.classList.remove("active-disc");
                    } else {
                        // Scroll back to the previous section if scrolling up from the first item
                        gatewayUpperSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
                event.preventDefault(); // Prevent default scroll behavior
            } else {
                // Handle section scrolling
                if (event.deltaY > 0) {
                    if (activeSectionIndex < videoSections.length - 1) {
                        activeSectionIndex++;
                        setVideoForSection(activeSectionIndex);
                        highlightActiveItems(activeSectionIndex);
                        videoSections[activeSectionIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    if (activeSectionIndex > 0) {
                        activeSectionIndex--;
                        setVideoForSection(activeSectionIndex);
                        highlightActiveItems(activeSectionIndex);
                        videoSections[activeSectionIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
                event.preventDefault(); // Prevent default scroll behavior
            }
        });
  
        // Handle keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
                event.preventDefault();
                if (event.key === 'ArrowDown') {
                    if (isCategoryFullyVisible && currentListItemIndex < discItems.length - 1) {
                        currentListItemIndex++;
                        discItems[currentListItemIndex].scrollIntoView({ behavior: "smooth", block: "center" });
                        discItems[currentListItemIndex].classList.add("active-disc");
                        discItems[currentListItemIndex - 1]?.classList.remove("active-disc");
                    } else if (activeSectionIndex < videoSections.length - 1) {
                        activeSectionIndex++;
                        setVideoForSection(activeSectionIndex);
                        highlightActiveItems(activeSectionIndex);
                        videoSections[activeSectionIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else if (event.key === 'ArrowUp') {
                    if (isCategoryFullyVisible && currentListItemIndex > 0) {
                        currentListItemIndex--;
                        discItems[currentListItemIndex].scrollIntoView({ behavior: "smooth", block: "center" });
                        discItems[currentListItemIndex].classList.add("active-disc");
                        discItems[currentListItemIndex + 1]?.classList.remove("active-disc");
                    } else if (activeSectionIndex > 0) {
                        activeSectionIndex--;
                        setVideoForSection(activeSectionIndex);
                        highlightActiveItems(activeSectionIndex);
                        videoSections[activeSectionIndex].scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }
            }
        });
    };
  
    // Handle visibility changes (tab switching)
    document.addEventListener('visibilitychange', () => {
        document.visibilityState === 'visible' ? video.play().catch(console.warn) : video.pause();
    });
  
    // Initialize based on device type
    initializeVideoPlayback();
    if (!isMobileDevice()) initializeDesktopInteractions();
  
    // Reinitialize on window resize
    window.addEventListener('resize', () => {
        location.reload(); // Refresh on resize to reapply appropriate settings
    });
  });



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




