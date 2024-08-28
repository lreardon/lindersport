// window.onload = () => {
document.addEventListener('DOMContentLoaded', () => {
  const rememberedVariant = localStorage.getItem('rememberedVariant');
	console.log('rememberedVariant:', rememberedVariant);
	if (rememberedVariant) {
    // Construct the selector using the rememberedVariant
    const selector = `#variant-${rememberedVariant}.category__item`;
    
    // Scroll to the element with the constructed selector
    const targetElement = document.querySelector(selector);
		console.log(`[TARGET] ${targetElement}`);
		
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'auto' }); // or smooth
      console.log(`Scrolled to element with selector: ${selector}`);
    } else {
      console.log(`Element with selector ${selector} not found.`);
    }
  } else {
    console.log('No rememberedVariant found in localStorage.');
  }
});
// }