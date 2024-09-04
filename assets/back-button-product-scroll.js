function runOnStart(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;

    const targetElement = document.querySelector(selector);
    console.log(`[TARGET] ${targetElement}`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "auto" }); // or smooth
				console.log(`[SCROLLED TO] ${targetElement}`);
				sessionStorage.removeItem("rememberedVariant");
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
    if (window.scrollY > 0) {
			runOnStart("smooth");
		} else {
		runOnStart("auto");
		}
  }
});