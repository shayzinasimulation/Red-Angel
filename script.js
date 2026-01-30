// ============================================
// RED ANGEL - ULTRA PREMIUM WEBSITE SCRIPTS
// Maximum Polish • Smooth • Perfect
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursorGlow();
    initParticles();
    initScrollProgress();
    initNavigation();
    initMobileMenu();
    initMagneticButtons();
    initTypewriter();
    initCounters();
    initIosGallery();
    initScrollAnimations();
    initTiltCards();
    initScreenshotTabs();
    initFAQ();
    initLightbox();
    initBackToTop();
    initSmoothScroll();
});

// ============================================
// CINEMATIC LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    const circleProgress = document.getElementById('circleProgress');
    const barFill = document.getElementById('loaderBar');
    const statusText = document.getElementById('loaderStatus');
    
    if (!loader) return;
    
    const statuses = [
        'Initializing',
        'Loading Assets',
        'Preparing Interface',
        'Almost Ready',
        'Welcome'
    ];
    
    let progress = 0;
    let statusIndex = 0;
    const circumference = 289; // 2 * PI * 46
    
    const updateProgress = () => {
        // Smooth progress increment
        const increment = Math.random() * 15 + 5;
        progress = Math.min(progress + increment, 100);
        
        // Update circle
        if (circleProgress) {
            const offset = circumference - (progress / 100) * circumference;
            circleProgress.style.strokeDashoffset = offset;
        }
        
        // Update bar
        if (barFill) {
            barFill.style.width = `${progress}%`;
        }
        
        // Update status text
        const newStatusIndex = Math.floor((progress / 100) * (statuses.length - 1));
        if (newStatusIndex !== statusIndex && statusText) {
            statusIndex = newStatusIndex;
            statusText.style.opacity = 0;
            setTimeout(() => {
                statusText.textContent = statuses[statusIndex];
                statusText.style.opacity = 1;
            }, 150);
        }
        
        if (progress < 100) {
            const delay = 150 + Math.random() * 100;
            setTimeout(updateProgress, delay);
        } else {
            // Complete
            setTimeout(() => {
                if (statusText) {
                    statusText.textContent = 'Welcome';
                }
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }, 400);
            }, 300);
        }
    };
    
    // Start loading
    setTimeout(updateProgress, 300);
    
    // Fallback
    setTimeout(() => {
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    }, 5000);
}

// ============================================
// CURSOR GLOW (Desktop Only)
// ============================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(hover: none)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });
    
    const animate = () => {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// ============================================
// PARTICLES
// ============================================
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const count = window.innerWidth < 768 ? 25 : 50;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${12 + Math.random() * 18}s`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        container.appendChild(particle);
    }
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link, .mobile-cta');
    
    if (!toggle || !menu) return;
    
    const closeMenu = () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    links.forEach(link => link.addEventListener('click', closeMenu));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;
    
    const buttons = document.querySelectorAll('.magnetic');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ============================================
// TYPEWRITER
// ============================================
function initTypewriter() {
    const element = document.getElementById('heroSubtitle');
    if (!element) return;
    
    const phrases = [
        'iOS-First. Private. Offline.',
        'On-Device MLX • No Cloud',
        'Your AI Companion, Fully Local',
        'Windows Command Center Included',
        'Zero Tracking. Ever.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let delay = isDeleting ? 25 : 60;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 3000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }
        
        setTimeout(type, delay);
    };
    
    // Start after loader
    setTimeout(type, 3500);
}

// ============================================
// COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);
            
            if (target === 0) {
                el.textContent = '0';
            } else {
                el.textContent = current + (progress >= 1 ? '+' : '');
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => animateCounter(entry.target), 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.feature-card, .why-card, .faq-item, .roadmap-item, .community-card, .socials-card, .screenshot-item, .ios-screenshot-card, .retro-card, .ios-main-card, .ios-featured-card, .ios-gallery-card, [data-aos]'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Stagger animations for grid items
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(
                    child => child.matches('.feature-card, .why-card, .screenshot-item, .ios-screenshot-card, .retro-card, .ios-main-card, .ios-featured-card, .ios-gallery-card, .socials-card')
                ) : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 80 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================
// TILT CARDS (3D Effect)
// ============================================
function initTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;
    
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// SCREENSHOT TABS
// ============================================
function initScreenshotTabs() {
    const tabs = document.querySelectorAll('.screenshots-tab');
    const panels = document.querySelectorAll('.screenshots-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            panels.forEach(panel => {
                panel.classList.toggle('active', panel.dataset.panel === targetTab);
            });
        });
    });
}

// ============================================
// iOS GALLERY (Generated)
// ============================================
function initIosGallery() {
    const galleryRoot = document.getElementById('iosGallery');
    const featuredRoot = document.getElementById('iosFeatured');
    if (!galleryRoot) return;

    const featuredShots = [
        {
            title: 'AI Chat Control Room',
            desc: 'Streaming responses, voice input, vision upload, and live context.',
            src: 'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /main chat interface ( opened for chat , voice , image text , ).png'
        },
        {
            title: 'Neural Journal Core',
            desc: 'Mood tracking with AI insights and writing improvements.',
            src: 'assets/screenshots/ios/Journal /Ai insights ( points ) , entry , mood interface.png'
        },
        {
            title: 'Decision Engine',
            desc: 'Weighted options, pros/cons, and AI recommendations.',
            src: 'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /overview ( after ai analysis ) .png'
        },
        {
            title: 'Personal Oracle',
            desc: 'Patterns, values, and growth prompts from your data.',
            src: 'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /overview ( first half ) .png'
        }
    ];

    const skinCycle = ['terminal', 'amber', 'violet', 'cyan', 'sunset'];

    const iosGallerySections = [
        {
            title: 'Interface Overview',
            items: [
                'assets/screenshots/ios/Interface ( first page ) screenshots 2 halfs /first page ( interface ) .png',
                'assets/screenshots/ios/Interface ( first page ) screenshots 2 halfs /first page ( other half ) interface .png',
                'assets/screenshots/ios/Features ( Main Interface ) /features ( capture ).png',
                'assets/screenshots/ios/Features ( Main Interface ) /features ( intelligence ).png',
                'assets/screenshots/ios/Features ( Main Interface ) /features ( productivity).png',
                'assets/screenshots/ios/Features ( Main Interface ) /features ( relationships ).png'
            ]
        },
        {
            title: 'Chat Interface',
            items: [
                'assets/screenshots/ios/Chat Interface/main overview outer section/chat interface ( main ) .png',
                'assets/screenshots/ios/Chat Interface/main overview outer section/personalities : modes ( one half ) .png',
                'assets/screenshots/ios/Chat Interface/main overview outer section/personalities : modes ( 2nd half ) .png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /main chat interface ( opened for chat , voice , image text , ).png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /a generated text.png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /context usage edit  .png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /edit section ( modes , context usage etc etc - precise , creative ) .png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /speak:voice.png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /token counter : mute : unmute ( model displayer ).png',
                'assets/screenshots/ios/Chat Interface/Inner Chat Section ( chat view ) /token usage.png'
            ]
        },
        {
            title: 'Personas',
            items: [
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Adult.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/All  ( Ai Modes ) .png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/All other half ( features that didnt come in the first half.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Chameleon.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Create Mode .png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Create your own mode .png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Creative.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Education.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/General.png",
                "assets/screenshots/ios/Intelligence ( Features Section ) /Ai Persona's/Science .png"
            ]
        },
        {
            title: 'Journal (Core)',
            items: [
                'assets/screenshots/ios/Journal /a note written .png',
                'assets/screenshots/ios/Journal /Ai Insight ( on my inputted journal ) .png',
                'assets/screenshots/ios/Journal /Ai insights ( points ) , entry , mood interface.png',
                'assets/screenshots/ios/Journal /improved writing of that note .png',
                'assets/screenshots/ios/Journal /Main Interface ( no journal written yet:empty ) .png',
                'assets/screenshots/ios/Journal /main interface ( with 2 journals written , ai analysed and indicating my current mood ) .png',
                'assets/screenshots/ios/Journal /the section where you write and select how you feel ( imrove writing : save section ) .png'
            ]
        },
        {
            title: 'Neural Journal (Capture)',
            items: [
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /a note written .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /Ai Insight ( on my inputted journal ) .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /Ai insights ( points ) , entry , mood interface.png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /improved writing of that note .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /Main Interface ( no journal written yet:empty ) .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /main interface ( with 2 journals written , ai analysed and indicating my current mood ) .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Neural Journal /the section where you write and select how you feel ( imrove writing : save section ) .png'
            ]
        },
        {
            title: 'Dream Capture',
            items: [
                'assets/screenshots/ios/Capture ( Features Section ) /Dream Capture /dream ( journal record ) .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Dream Capture /dream capture .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Dream Capture /insights.png',
                'assets/screenshots/ios/Capture ( Features Section ) /Dream Capture /patterns.png'
            ]
        },
        {
            title: 'Time Capsules',
            items: [
                'assets/screenshots/ios/Capture ( Features Section ) /Time Capsule/message to the future you ( heading ) .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Time Capsule/Time Capsule .png',
                'assets/screenshots/ios/Capture ( Features Section ) /Time Capsule/Time Capsule templates .png'
            ]
        },
        {
            title: 'Personal Oracle',
            items: [
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /ask the oracle.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /blind spots.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /Deep Analysis ( analysis the journals ) .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /growth .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /overview ( first half ) .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /overview ( other half 2 ) .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /patterns.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /personal oracle ( main interface ( empty ) ).png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /relationships.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /Screenshot 2026-01-30 at 2.07.59 AM.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Personal Oracle /values.png'
            ]
        },
        {
            title: 'Memory System',
            items: [
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/all ( ai memory section ( not empty ) ) .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/all ( approved : correct : wrong ) .png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/experience.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/fact.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/goals.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/opinion.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/preference.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Ai Memory/relationships.png'
            ]
        },
        {
            title: 'Documents & RAG',
            items: [
                'assets/screenshots/ios/Intelligence ( Features Section ) /Rag/Rag Documents.png',
                'assets/screenshots/ios/Intelligence ( Features Section ) /Rag/Screenshot 2026-01-30 at 2.17.05 AM.png'
            ]
        },
        {
            title: 'Decision Engine',
            items: [
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /decsion engine .png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /decsion engine ( written : not empty ) .png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /overview ( after ai analysis ) .png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /overview ( before ai analysis ) .png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Decision Engine /poll : options.png'
            ]
        },
        {
            title: 'Neural Sync Focus',
            items: [
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Neural Sync/focus goals.png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Neural Sync/focus mode.png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Neural Sync/neural sync ( main page ) .png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Neural Sync/neural sync main ( neaural state , ai recommendation ).png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Neural Sync/statistics.png'
            ]
        },
        {
            title: 'AI Wellness',
            items: [
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Ai Wellness/Ai Wellness.png',
                'assets/screenshots/ios/Productivity ( Features Section - Features )/Ai Wellness/recommended excersises ( based on my whole exposure to the system : data ).png'
            ]
        },
        {
            title: 'Relationships',
            items: [
                "assets/screenshots/ios/Relationship's DNA ( Featues Section Feature ) /Relationships/ai insight.png",
                "assets/screenshots/ios/Relationship's DNA ( Featues Section Feature ) /Relationships/main page ( not empty : filled ) .png",
                "assets/screenshots/ios/Relationship's DNA ( Featues Section Feature ) /Relationships/Main Page ( Overview ) .png",
                "assets/screenshots/ios/Relationship's DNA ( Featues Section Feature ) /Relationships/selecting section.png"
            ]
        },
        {
            title: 'System Setup',
            items: [
                'assets/screenshots/ios/System Setup/about section.png',
                'assets/screenshots/ios/System Setup/all models ( browse models section ) .png',
                'assets/screenshots/ios/System Setup/all voices : fine tune section.png',
                'assets/screenshots/ios/System Setup/coming soon features.png',
                'assets/screenshots/ios/System Setup/data and sync.png',
                'assets/screenshots/ios/System Setup/device and perfomance section.png',
                'assets/screenshots/ios/System Setup/generation control section.png',
                'assets/screenshots/ios/System Setup/interface edit section.png',
                'assets/screenshots/ios/System Setup/model loaded ( section ) .png',
                'assets/screenshots/ios/System Setup/model not loaded ( unloaded ) section.png',
                'assets/screenshots/ios/System Setup/open ( browse model section ) .png',
                'assets/screenshots/ios/System Setup/secuirity and privacy section.png',
                'assets/screenshots/ios/System Setup/supported models.png',
                'assets/screenshots/ios/System Setup/system setup ( model loaded ) .png',
                'assets/screenshots/ios/System Setup/Voice section - select voice ( voice modes ).png'
            ]
        },
        {
            title: 'Onboarding',
            items: [
                'assets/screenshots/ios/Onboarding Section Screenshots/100% private ( your data never leaves ) page .png',
                'assets/screenshots/ios/Onboarding Section Screenshots/ai powered features ( onboarding ) .png',
                'assets/screenshots/ios/Onboarding Section Screenshots/Loading Screen.png',
                'assets/screenshots/ios/Onboarding Section Screenshots/models ( ram size etc etc ) onboarding page.png',
                'assets/screenshots/ios/Onboarding Section Screenshots/Multiple Personalities ( onboarding ) .png',
                'assets/screenshots/ios/Onboarding Section Screenshots/powered by apple silicon page .png',
                'assets/screenshots/ios/Onboarding Section Screenshots/truly uncensored:no limitations page.png',
                'assets/screenshots/ios/Onboarding Section Screenshots/welcome page.png'
            ]
        }
    ];

    const formatShotLabel = (src) => {
        const file = src.split('/').pop() || '';
        return file.replace(/\.[^/.]+$/, '').replace(/\s+/g, ' ').trim();
    };

    if (featuredRoot) {
        featuredRoot.innerHTML = '';
        featuredShots.forEach((shot, index) => {
            const card = document.createElement('article');
            card.className = 'ios-featured-card';
            card.setAttribute('data-aos', '');
            card.dataset.skin = skinCycle[index % skinCycle.length];
            card.innerHTML = `
                <div class="ios-featured-frame">
                    <img src="${shot.src}" alt="${shot.title}" loading="lazy">
                </div>
                <h4>${shot.title}</h4>
                <p>${shot.desc}</p>
            `;
            featuredRoot.appendChild(card);
        });
    }

    galleryRoot.innerHTML = '';
    iosGallerySections.forEach((section) => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'ios-gallery-section';
        sectionEl.innerHTML = `<h4>${section.title}</h4>`;

        const grid = document.createElement('div');
        grid.className = 'ios-gallery-grid';

        section.items.forEach((src, index) => {
            const label = formatShotLabel(src);
            const card = document.createElement('figure');
            card.className = 'ios-gallery-card';
            card.setAttribute('data-aos', '');
            card.dataset.skin = skinCycle[index % skinCycle.length];
            card.innerHTML = `
                <div class="ios-gallery-frame">
                    <img src="${src}" alt="${label}" loading="lazy">
                </div>
                <figcaption>${label}</figcaption>
            `;
            grid.appendChild(card);
        });

        sectionEl.appendChild(grid);
        galleryRoot.appendChild(sectionEl);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const lists = document.querySelectorAll('.faq-list');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('.faq-item');
        
        items.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                items.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    });
}

// ============================================
// LIGHTBOX
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const screenshots = document.querySelectorAll('.screenshot-item img, .ios-phone-frame img, .retro-screen img, .ios-shot-frame img, .ios-main-frame img, .ios-featured-frame img, .ios-gallery-frame img, .iphone-screen img');
    
    if (!lightbox || !lightboxImage) return;
    
    const openLightbox = (src, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    screenshots.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const toggleVisibility = () => {
        btn.classList.toggle('visible', window.pageYOffset > 500);
    };
    
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}

// ============================================
// EASTER EGG
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(`
%c╔══════════════════════════════════════════════╗
%c║            😈  RED ANGEL  😈                 ║
%c╠══════════════════════════════════════════════╣
%c║  Private AI for Windows & iOS               ║
%c║  ─────────────────────────────────────────  ║
%c║  🔒 No Cloud  •  🚫 No Tracking  •  ⚡ Fast ║
%c╠══════════════════════════════════════════════╣
%c║  🖥️  Windows: Devil's Senate Command Center ║
%c║  📱  iOS: Personal AI Companion             ║
%c╠══════════════════════════════════════════════╣
%c║  Made with ❤️  by Shayz Productions          ║
%c╚══════════════════════════════════════════════╝

%c Try the Konami Code! ↑↑↓↓←→←→BA
`,
'color: #ff3b3b',
'color: #ff3b3b; font-weight: bold',
'color: #ff3b3b',
'color: #ffffff',
'color: #404040',
'color: #ff6b6b',
'color: #ff3b3b',
'color: #ff6b6b',
'color: #007AFF',
'color: #ff3b3b',
'color: #ffd700',
'color: #ff3b3b',
'color: #808080; font-style: italic'
);
