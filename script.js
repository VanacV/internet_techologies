// Плавная прокрутка
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдатель для анимации статистики
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBars = entry.target.querySelectorAll('.stat-progress');
            statBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация элементов при скролле
    const animateElements = document.querySelectorAll('.tech-item, .feature-card, .case-card, .conclusion-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Анимация статистики
    const statsSection = document.querySelector('.stats-card');
    if (statsSection) {
        statObserver.observe(statsSection);
    }

    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Изменение навигации при скролле
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Анимация для индустрии 4.0
    const industrySection = document.getElementById('industry');
    if (industrySection) {
        const industryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const factory = entry.target.querySelector('.smart-factory');
                    if (factory) {
                        factory.classList.add('animate');
                    }
                }
            });
        }, observerOptions);
        
        industryObserver.observe(industrySection);
    }

    // Добавление CSS для анимации фабрики
    const style = document.createElement('style');
    style.textContent = `
        .smart-factory {
            position: relative;
            height: 300px;
            background: linear-gradient(45deg, #f8fafc, #e2e8f0);
            border-radius: 15px;
            overflow: hidden;
        }
        
        .factory-layer {
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        .machine, .conveyor, .sensor, .robot {
            position: absolute;
            background: var(--primary);
            border-radius: 5px;
        }
        
        .machine {
            width: 60px;
            height: 40px;
            bottom: 50px;
            left: 50px;
        }
        
        .conveyor {
            width: 200px;
            height: 10px;
            bottom: 30px;
            left: 120px;
            background: var(--text-light);
        }
        
        .sensor {
            width: 20px;
            height: 20px;
            top: 80px;
            right: 100px;
            background: var(--accent);
            border-radius: 50%;
        }
        
        .robot {
            width: 40px;
            height: 60px;
            bottom: 50px;
            right: 50px;
        }
        
        .data-flow {
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(37, 99, 235, 0.1) 10px,
                rgba(37, 99, 235, 0.1) 20px
            );
            animation: flow 3s linear infinite;
        }
        
        @keyframes flow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .smart-factory.animate .machine {
            animation: machineWork 2s ease-in-out infinite;
        }
        
        @keyframes machineWork {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                padding: 1rem 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Обработка внешних ссылок
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="http"]')) {
        const link = e.target.closest('a');
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    }
});

// Дополнительные интерактивные функции
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Загрузка предпочтений темы
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Анимация счетчиков для статистики
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Запуск анимации счетчиков при появлении в viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
        }
    });
}, observerOptions);

// Добавление data-count атрибутов к элементам статистики
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach(card => {
        const text = card.textContent;
        const number = text.replace(/[^\d]/g, '');
        if (number) {
            card.setAttribute('data-count', number);
            card.textContent = '0';
        }
    });
    
    const statsSection = document.querySelector('.finance-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});