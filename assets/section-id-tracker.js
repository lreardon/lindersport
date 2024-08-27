if (typeof window.sectionTrackerInitialized === 'undefined') {
    window.sectionTrackerInitialized = true;

    let currentSection = localStorage.getItem('currentSection') || null;
    let sectionVisibility = {};
    let observer = null;  // ensure single observer instance
    let lastSection;

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
                debouncedHandlePageTransition();
                handlePageTransition();
            }
        });
    });

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
        if (observer) return;  // prevent reinitialization
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
        }, { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) });
    }

    function updateCurrentSection() {
        const mostVisibleSection = Object.entries(sectionVisibility).reduce((max, [id, ratio]) => {
            return ratio > max.ratio ? { id, ratio } : max;
        }, { id: null, ratio: 0 });

        if (mostVisibleSection.id !== currentSection) {
            if (mostVisibleSection.id !== null) {
                currentSection = mostVisibleSection.id;
                localStorage.setItem('currentSection', currentSection);
                window.dispatchEvent(new CustomEvent('currentSectionChanged', { detail: currentSection }));
            } else {
                console.log('No section currently visible');
            }
        }
    }

    function handlePageTransition() {
        console.log('handlePageTransition Called');
        lastSection = currentSection || localStorage.getItem('currentSection');
        cleanupObserver();
    }

    function cleanupObserver() {
        console.log('clean observer called');
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

        if (allowedPaths.includes(currentPath) && currentHostname === window.location.hostname) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section.id) {
                    observer.observe(section);
                } else {
                    console.warn('Found a section without an id attribute');
                }
            });
        } else {
            console.log('Section tracker is not initialized on this page.');
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        initializeObserver();
        initializeSectionTracker();
    });
}
