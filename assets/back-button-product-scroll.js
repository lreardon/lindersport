function runOnStart() {
  const rememberedVariant = localStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;

    const targetElement = document.querySelector(selector);
    console.log(`[TARGET] ${targetElement}`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // or smooth
				console.log(`[SCROLLED TO] ${targetElement}`);
    } else {
			console.warn(`[TARGET] ${selector} not found`);
		}
  }
}

if (document.readyState === 'loading') {
    document.addEventListener('load', runOnStart);
} else {
    runOnStart();
}

// function handlePageShow(event) {
//     if (event.persisted) {
//         console.log('Page was restored from bfcache (back navigation)');
//         hasRun = false;
//     }
//     runOnStart();
// }

// window.addEventListener('pageshow', handlePageShow);

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    console.log('Page became visible');
    runOnStart();
  }
});