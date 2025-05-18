document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav.page-navigation a');
    const sections = document.querySelectorAll('section');
    const mainContent = document.querySelector('main');

    function updateActiveNavLink(currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    function handleScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (mainContent.scrollTop >= sectionTop - 100 && mainContent.scrollTop < sectionTop + sectionHeight - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        updateActiveNavLink(currentSectionId);
    }

    mainContent.addEventListener('scroll', handleScroll);

    // Sets link active on load
    if (sections.length > 0) {
        updateActiveNavLink(sections[0].getAttribute('id'));
    }

    // Adds smooth scrolling to links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {

            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute('href').slice(1); // Get the target section's ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                mainContent.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
