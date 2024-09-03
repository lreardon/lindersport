function runOnStart() {
  const rememberedVariant = localStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;

    const targetElement = document.querySelector(selector);
    console.log(`[TARGET] ${targetElement}`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "auto" }); // or smooth
				console.log(`[SCROLLED TO] ${targetElement}`);
    } else {
			console.warn(`[TARGET] ${selector} not found`);
		}
  }
}

if(document.readyState !== 'loading') {
    runOnStart();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        runOnStart()
    });
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    console.log('Page became visible');
    runOnStart();
  }
});
