function runOnStart(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;
    const targetElement = document.querySelector(selector);

    if (targetElement) {
			console.log(targetElement.getBoundingClientRect().top);
			if (behavior == "smooth") {
			requestAnimationFrame(() => {
						targetElement.scrollIntoView({ behavior: behavior });
						sessionStorage.removeItem("rememberedVariant");
					});
			} else if (behavior == "auto") {
				targetElement.scrollIntoView({ behavior: behavior });
				sessionStorage.removeItem("rememberedVariant");
			}
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