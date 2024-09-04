function runOnStart(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;
    const targetElement = document.querySelector(selector);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: behavior }); // or smooth
				sessionStorage.removeItem("rememberedVariant");
    }
  }
}

if (document.readyState != 'loading') {
    runOnStart("auto");
} else {
    document.addEventListener('DOMContentLoaded', () => runOnStart("auto"));
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    if (window.scrollY > 0) {
			runOnStart("smooth");
		} else {
		runOnStart("auto");
		}
  }
});