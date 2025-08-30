document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换 Navigation Menu Toggle
    const navLinks = document.getElementById('navLinks');
    const showMenu = document.getElementById('showMenu');
    const hideMenu = document.getElementById('hideMenu');

    if (showMenu) {
        showMenu.addEventListener('click', function() {
            navLinks.classList.add('active');
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    if (hideMenu) {
        hideMenu.addEventListener('click', function() {
            navLinks.classList.remove('active');
            // 添加点击反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // 导航链接点击反馈 Navigation Link Click Feedback
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // 添加点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 语言切换 Language Toggle
    const langToggle = document.getElementById('langToggle');
    const enElements = document.querySelectorAll('.en');
    const yueElements = document.querySelectorAll('.yue');
    let currentLang = 'zh'; // 'zh', 'en', 'yue'

    if (langToggle) {
        langToggle.addEventListener('click', function() {
            if (currentLang === 'zh') {
                // 切换到英文 Switch to English
                currentLang = 'en';
                document.querySelectorAll('.en').forEach(el => {
                    el.style.display = 'block';
                });
                document.querySelectorAll('.yue').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('p:not(.en):not(.yue), h1:not(.en):not(.yue), h2:not(.en):not(.yue), h3:not(.en):not(.yue)').forEach(el => {
                    if (!el.classList.contains('en') && !el.classList.contains('yue') && el.nextElementSibling && (el.nextElementSibling.classList.contains('en') || el.nextElementSibling.classList.contains('yue'))) {
                        el.style.display = 'none';
                    }
                });
                langToggle.textContent = 'EN | 中文 | 粵語';
            } else if (currentLang === 'en') {
                // 切换到粤语 Switch to Cantonese
                currentLang = 'yue';
                document.querySelectorAll('.en').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.yue').forEach(el => {
                    el.style.display = 'block';
                });
                document.querySelectorAll('p:not(.en):not(.yue), h1:not(.en):not(.yue), h2:not(.en):not(.yue), h3:not(.en):not(.yue)').forEach(el => {
                    if (!el.classList.contains('en') && !el.classList.contains('yue') && el.nextElementSibling && (el.nextElementSibling.classList.contains('en') || el.nextElementSibling.classList.contains('yue'))) {
                        el.style.display = 'none';
                    }
                });
                langToggle.textContent = '粵語 | EN | 中文';
            } else {
                // 切换到中文 Switch to Chinese
                currentLang = 'zh';
                document.querySelectorAll('.en').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.yue').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('p, h1, h2, h3').forEach(el => {
                    if (!el.classList.contains('en') && !el.classList.contains('yue')) {
                        el.style.display = 'block';
                    }
                });
                langToggle.textContent = 'EN | 中文 | 粵語';
            }
        });
    }

    // 滚动效果 Scroll Effects
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(78, 84, 200, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            navbar.style.boxShadow = 'none';
        }
    });

    // 简单的轮播效果 Simple Carousel Effect
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    if (testimonials.length > 1) {
        // 初始化 Initialize
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // 设置轮播间隔 Set carousel interval
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }

    // 动态更新竞赛截止日期 Dynamically update competition deadlines
    const deadlines = document.querySelectorAll('.deadline');
    deadlines.forEach(deadline => {
        const deadlineDate = new Date(deadline.textContent);
        const now = new Date();
        const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysLeft < 0) {
            deadline.textContent = '已截止 Closed';
            deadline.style.color = '#999';
        } else if (daysLeft <= 7) {
            deadline.textContent = `${deadline.textContent} (剩余 ${daysLeft} 天 days)`;
            deadline.style.color = '#ff0000';
        }
    });

    // 表单验证 Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // 创建或更新错误消息 Create or update error message
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                    
                    errorMsg.textContent = '此字段为必填项 This field is required';
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // 添加平滑滚动效果 Add smooth scrolling effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});