function toggleSection(section) {

	clickedSection = document.querySelector(`#header__subsection-${section}`);
	// If the section is already open, close it and return
	if (!clickedSection.classList.contains('collapsed')) {
		clickedSection.classList.add('collapsed');
		return;
	}

	// Hide all sections
	document.querySelectorAll('.header__subsection').forEach(section => {
		section.classList.add('collapsed');
	});
	// Show the selected section
	sectionToShow = document.querySelector(`#header__subsection-${section}`);
	console.log(sectionToShow);
	sectionToShow.classList.remove('collapsed');
}