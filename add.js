     // Performance: Use requestAnimationFrame for scroll events
        let ticking = false;
        
        // Initialize AOS Animation Library
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic',
        });

        // Mobile Menu Logic - Optimized with event delegation
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close mobile menu when clicking a link - Event delegation
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });

        // Navbar Scroll Effect - Throttled with requestAnimationFrame
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const navbar = document.getElementById('navbar');
                    if (window.scrollY > 50) {
                        navbar.classList.add('shadow-md');
                        navbar.classList.replace('py-4', 'py-2');
                    } else {
                        navbar.classList.remove('shadow-md');
                        navbar.classList.replace('py-2', 'py-4');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Counter Animation Logic - Optimized with requestAnimationFrame
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

        // Intersection Observer for triggering animations when in view - Optimized
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '50px'
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

        // Load More Projects Logic - Debounced
        const loadMoreBtn = document.getElementById('load-more-btn');
        const hiddenProjects = document.querySelectorAll('.portfolio-hidden');
        let isExpanded = false;
        let isLoading = false;

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                if (isLoading) return;
                
                if (!isExpanded) {
                    isLoading = true;
                    hiddenProjects.forEach((project, index) => {
                        setTimeout(() => {
                            project.classList.remove('portfolio-hidden');
                            project.classList.add('portfolio-visible');
                            if (index === hiddenProjects.length - 1) {
                                isLoading = false;
                            }
                        }, index * 50);
                    });
                    loadMoreBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up ml-2"></i>';
                    isExpanded = true;
                } else {
                    isLoading = true;
                    hiddenProjects.forEach((project, index) => {
                        setTimeout(() => {
                            project.classList.add('portfolio-hidden');
                            project.classList.remove('portfolio-visible');
                            if (index === hiddenProjects.length - 1) {
                                isLoading = false;
                            }
                        }, index * 50);
                    });
                    loadMoreBtn.innerHTML = 'Explore All Projects <i class="fas fa-chevron-down ml-2"></i>';
                    isExpanded = false;
                    
                    // Scroll back to portfolio section top smoothly
                    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
