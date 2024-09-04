window.addEventListener('popstate', function(event) {
  // Check if the URL doesn't already have a hash
  if (!window.location.hash) {
    // Add #variant to the URL without triggering a page reload
    history.replaceState(null, '', window.location.pathname + window.location.search + '#variant');
  }
});