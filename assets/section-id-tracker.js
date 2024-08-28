
if (typeof window.sectionTrackerInitialized === 'undefined') {
    window.sectionTrackerInitialized = true;

    let currentSection = localStorage.getItem('currentSection') || null;
    let sectionVisibility = {};
    let observer;
    let lastSection;
    console.log('__Section-Tracker Previous Section: ' + lastSection);
 const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const debouncedHandlePageTransition = debounce(handlePageTransition, 300);

    const gazer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                console.log('Relevant DOM changed, reinitializing section tracker');
                debouncedHandlePageTransition()
                handlePageTransition();
              
            }
        });
    });

    // Select the specific container where your dynamic content changes occur
    const dynamicContentContainers = document.querySelectorAll('.category');

    if (dynamicContentContainers.length > 0) {
        dynamicContentContainers.forEach(container => {
            gazer.observe(container, { childList: true, subtree: true });
        });
    } else {
        console.warn('Dynamic content container not found. Falling back to observing body.');
        gazer.observe(document.body, { childList: true, subtree: true });
    }

    function initializeObserver() {
        observer = new IntersectionObserver((entries) => {
            console.log('observer active');
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                if (entry.isIntersecting) {
                    sectionVisibility[sectionId] = entry.intersectionRatio;
                } else {
                    delete sectionVisibility[sectionId];
                }

                updateCurrentSection();
            });
        }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
    }

function updateCurrentSection() {
    const mostVisibleSection = Object.entries(sectionVisibility).reduce((max, [id, ratio]) => {
        return ratio > max.ratio ? { id, ratio } : max;
    }, { id: null, ratio: 0 });

    if (mostVisibleSection.id !== currentSection) {
        if (mostVisibleSection.id !== null) {
            currentSection = mostVisibleSection.id;
            // Store the current section in localStorage
            localStorage.setItem('currentSection', currentSection);
            
            // Dispatch the event with the new current section
            window.dispatchEvent(new CustomEvent('currentSectionChanged', { detail: currentSection }));
            window.addEventListener('currentSectionChanged', (event) => {
    console.log('~~~~Current section changed to:', event.detail);
    // Perform any necessary actions here
});

        } else {
            console.log('No section currently visible');
            // Don't update localStorage here
        }
    }
}

function updateTrackedProduct(product) {
	console.log(`[TRACK] ${product}`);
}

    function handlePageTransition() {
        console.log('handlePageTransition Called');
        // Store the current section before navigation
        console.log('__Observer-Page-Transition Current Section:' + currentSection);
        console.log('__Observer-Page-Transition Last Section:' + localStorage.getItem('currentSection'));
        lastSection = currentSection || localStorage.getItem('currentSection');
        console.log(`Handling page transition to:  ${lastSection}`);
        cleanupObserver();
    }

    function cleanupObserver() {
        // console.log('clean observer called');
        if (observer) {
            observer.disconnect();
            observer = null;
            sectionVisibility = {};
        }
    }

    const allowedPaths = ['/', '/#home', '/#tees', '/#sweaters', '/#bags', '/'];

    function initializeSectionTracker() {
        const currentPath = window.location.pathname;
        const currentHostname = window.location.hostname;
        
        // Check if the current page is the root path
        if (allowedPaths.includes(currentPath) && currentHostname === window.location.hostname) {

            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section.id) {
                    console.log(`+++Observing section: ${section.id}`);
                    observer.observe(section);
                } else {
                    console.warn('Found a section without an id attribute');
                }
            });
        } else {
            console.log('Section tracker is not initialized on this page.');
        }
    }

    window.addEventListener('load', () => {
        initializeObserver();
        initializeSectionTracker();
    });
   
}