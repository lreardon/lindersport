function showSection(section) {
	// Hide all sections
	document.querySelectorAll('.header__subsection').forEach(section => {
		section.classList.add('collapsed');
	});
	sectionToShow = document.querySelector(`#header__subsection-${section}`);
	console.log(sectionToShow);
	sectionToShow.classList.remove('collapsed');
}