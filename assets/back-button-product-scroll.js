function runOnStart(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;

    const targetElement = document.querySelector(selector);
    console.log(`[TARGET] ${targetElement}`);

    if (targetElement) {
			// const rect = targetElement.getBoundingClientRect();
			
			// // Calculate the scroll position
			// const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			// const targetTop = rect.top + scrollTop;

			// // Perform the scroll immediately
			// window.scrollTo(0, targetTop);
      targetElement.scrollIntoView({ behavior: behavior }); // or smooth
			console.log(`[SCROLLED TO] ${targetElement}`);
    } else {
			console.warn(`[TARGET] ${selector} not found`);
		}
  }
}

if (document.readyState != 'loading') {
    runOnStart("auto");
} else {
    document.addEventListener('DOMContentLoaded', () => runOnStart("auto"));
}

// // function handlePageShow(event) {
// //     if (event.persisted) {
// //         console.log('Page was restored from bfcache (back navigation)');
// //         hasRun = false;
// //     }
// //     runOnStart("smooth");
// // }

// // window.addEventListener('pageshow', handlePageShow);

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    runOnStart("smooth");
  }
});