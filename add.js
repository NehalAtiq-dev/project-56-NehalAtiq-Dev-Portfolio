     // Initialize AOS Animation Library
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic',
        });

        // Mobile Menu Logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.replace('py-4', 'py-2');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.replace('py-2', 'py-4');
            }
        });

        // Counter Animation Logic
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        };

        // Skill Bar Animation Logic
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        };

        // Intersection Observer for triggering animations when in view
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'about') {
                        animateCounters();
                    }
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const aboutSection = document.getElementById('about');
        const skillsSection = document.getElementById('skills');
        
        if (aboutSection) observer.observe(aboutSection);
        if (skillsSection) observer.observe(skillsSection);

        // Load More Projects Logic
        const loadMoreBtn = document.getElementById('load-more-btn');
        const hiddenProjects = document.querySelectorAll('.portfolio-hidden');
        let isExpanded = false;

        loadMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                hiddenProjects.forEach(project => {
                    project.classList.remove('portfolio-hidden');
                    project.classList.add('portfolio-visible');
                });
                loadMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up ml-2"></i>';
                isExpanded = true;
            } else {
                hiddenProjects.forEach(project => {
                    project.classList.add('portfolio-hidden');
                    project.classList.remove('portfolio-visible');
                });
                loadMoreBtn.innerHTML = 'Explore All Projects <i class="fas fa-chevron-down ml-2"></i>';
                isExpanded = false;
                
                // Scroll back to portfolio section top smoothly
                document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
            }
        });
