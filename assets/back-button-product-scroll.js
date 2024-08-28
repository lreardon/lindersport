document.addEventListener('DOMContentLoaded', () => {
  const rememberedVariant = localStorage.getItem('rememberedVariant');
	console.log('rememberedVariant:', rememberedVariant);
  // const pollForElement = (selector, interval = 100, maxAttempts = 50) => {
  //   let attempts = 0;

  //   const poller = setInterval(() => {
  //     const targetElement = document.getElementById(selector);
  //     attempts++;
  //     console.log('attempts' + attempts)
  //     if (targetElement) {
  //       targetElement.scrollIntoView({ behavior: 'smooth' });
  //       clearInterval(poller); // Stop polling once the element is found
  //     }

  //     if (attempts >= maxAttempts) {
  //       clearInterval(poller); // Stop polling after max attempts
  //     }
  //   }, interval);
  // };

  // const handleHashNavigation = () => {
  //   const targetHash = window.location.hash; // e.g., '#targetId'
  //   const targetId = targetHash ? targetHash.substring(1) : null;
  //   console.log('targetHash found:'  + targetHash)
  //   if (targetId) {
  //     pollForElement(targetId); // Start polling for the target element
  //   }
  // };

  // handleHashNavigation(); // Run on page load
  // window.addEventListener('hashchange', handleHashNavigation); // Run on hash change
});