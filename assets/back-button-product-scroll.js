function runOnStart(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;
    const targetElement = document.querySelector(selector);

    if (targetElement) {
			console.log(targetElement.getBoundingClientRect().top);
			switch (behavior) {
				case "smooth":
					targetElement.scrollIntoView({ behavior: behavior });
					break;
				default:
					requestAnimationFrame(() => {
						targetElement.scrollIntoView({ behavior: behavior });
					});
					break;
			}
			sessionStorage.removeItem("rememberedVariant");
    }
  }
}

if (document.readyState != 'loading') {
		console.log('case 1');
    runOnStart("auto");
} else {
		console.log('case 2');
    document.addEventListener('DOMContentLoaded', () => runOnStart("auto"));
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    if (window.scrollY > 0) {
			console.log('case 3');
			runOnStart("smooth");
		} else {
			console.log('case 4');
		runOnStart("auto");
		}
  }
});