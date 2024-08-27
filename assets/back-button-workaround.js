// Function to handle URL updates
function updateUrl(section) {
    if (section) {
        const currentHash = window.location.hash.slice(1);
        if (section !== currentHash) {
            const newUrl = window.location.origin + window.location.pathname + '#' + section;
            console.log("[URL] New URL:", newUrl);
            window.history.replaceState(null, '', newUrl);
        } else {
            console.log("[URL] No update needed, current hash matches section:", section);
        }
    }
}

// Function to update URL based on localStorage
function updateUrlFromStorage() {
    try {
        const currentSection = localStorage.getItem('currentSection');
        console.log("[STORAGE] Current section from localStorage:", currentSection);
        if (currentSection) {
            updateUrl(currentSection);
            return true; // Indicate that we updated from storage
        }
    } catch (error) {
        console.error("[ERROR] Failed to get item from localStorage:", error);
    }
    return false; // Indicate that we didn't update from storage
}

// Event listener for currentSectionChanged
window.addEventListener('currentSectionChanged', (event) => {
    console.log('[CHANGE] Current section changed to:', event.detail);
    try {
        localStorage.setItem('currentSection', event.detail);
        console.log('[STORAGE] Updated localStorage, current value:', localStorage.getItem('currentSection'));
    } catch (error) {
        console.error("[ERROR] Failed to set item in localStorage:", error);
    }
    updateUrl(event.detail);
});

// Function to handle initial page load
function handleInitialLoad() {
    console.log("[LOAD] Handling initial load");
    if (!updateUrlFromStorage()) {
        // If we didn't update from storage, wait for the first Intersection Observer update
        const initialIntersectionHandler = (event) => {
            if (event.detail) {
                console.log("[INITIAL] First section detected:", event.detail);
                updateUrl(event.detail);
                window.removeEventListener('currentSectionChanged', initialIntersectionHandler);
            }
        };
        window.addEventListener('currentSectionChanged', initialIntersectionHandler);
    }
}

// Event listener for DOMContentLoaded
// 

// Listen for page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('[VISIBILITY] Page became visible');
        updateUrlFromStorage();
    }
});
// unction doSomething() {
//   if (document.readyState === "loading") {
//     // Document still loading, wait for it
//     document.addEventListener("DOMContentLoaded", doSomething);
//     return;
//   }
//   // Document is ready, do your stuff
//   console.log("Document is ready!");
// }

// doSomething();

// Update URL when page is loaded or becomes visible
function initialLoadTrial (){
  if (document.readyState === 'loading') {
    console.log('/~/~/~?~/~/WERE LOADING BIATCH /~/~?~?~')
    document.addEventListener('DOMContentLoaded', initialLoadTrial);
} else {
    console.log('WEVE LOADED IN')
    handleInitialLoad
   
}

}
initialLoadTrial();
