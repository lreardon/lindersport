function scrollToRememberedVariant(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;
    const targetElement = document.querySelector(selector);

    if (targetElement) {
			switch (behavior) {
				case "smooth":
					if (typeof zenscroll !== "undefined") {
						zenscroll.to(targetElement, 0);
						break;
					}
					targetElement.scrollIntoView({ behavior: behavior });
					break;
				default:
					requestAnimationFrame(() => {
						if (typeof zenscroll !== "undefined") {
							zenscroll.to(targetElement, 0);
							return;
						}
						targetElement.scrollIntoView({ behavior: behavior });
					});
					break;
			}
			sessionStorage.removeItem("rememberedVariant");
    }
  }
}

// if (document.readyState != 'loading') {
//     runOnStart("auto");
// } else {
//     document.addEventListener('DOMContentLoaded', () => runOnStart("auto"));
// }

// document.addEventListener('visibilitychange', function() {
//   if (!document.hidden) {
//     if (window.scrollY > 0) {
// 			runOnStart("smooth");
// 		} else {
// 		runOnStart("auto");
// 		}
//   }
// });

// function ensureZenscrollIsLoadedAndSetUp() {
// 	  if (typeof zenscroll === 'undefined') {
// 	// Load zenscroll.js dynamically
// 	const script = document.createElement('script');
// 	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/zenscroll/4.0.0/zenscroll.min.js';
// 	script.onload = () => {
// 	  zenscroll.setup(100, 0);
// 	};
// }



// Independent implementation

function scrollToHashElement(behavior) {
	// ensureZenscrollIsLoadedAndSetUp();
	console.log('hash')
	const targetId = window.location.hash.substring(1);
	const targetElement = document.getElementById(targetId);
	


	if (targetElement) {
		// Use requestAnimationFrame to ensure the scroll happens after the page is fully loaded
		requestAnimationFrame(() => {
			if (typeof zenscroll !== "undefined") {
				zenscroll.to(targetElement, behavior == 'smooth' ? null : 0);
				return;
			}
			targetElement.scrollIntoView({ behavior: behavior });
		});
	}
}

if (document.readyState != 'loading') {
		if (window.location.hash) {
			scrollToHashElement("auto");
		} else {
			scrollToRememberedVariant("auto");
		}
} else {
    document.addEventListener('DOMContentLoaded', () => scrollToHashElement("auto"));
}

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    if (window.scrollY > 0) {
			scrollToRememberedVariant("smooth");
		} else {
		scrollToRememberedVariant("auto");
		}
  }
});