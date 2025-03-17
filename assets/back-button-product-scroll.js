function scrollToRememberedVariant(behavior) {
  const rememberedVariant = sessionStorage.getItem("rememberedVariant");
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;
    const targetElement = document.querySelector(selector);

    if (targetElement) {
			// console.log(targetElement.getBoundingClientRect().top);
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




// Independent implementation

function scrollToHashElement(behavior) {
	const targetId = window.location.hash.substring(1);
	const targetElement = document.getElementById(targetId);
	if (targetElement) {
		// Use requestAnimationFrame to ensure the scroll happens after the page is fully loaded
		requestAnimationFrame(() => {
			targetElement.scrollIntoView({ behavior: behavior });
		});
	}
}

if (document.readyState != 'loading') {
		// console.log(window.location);
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