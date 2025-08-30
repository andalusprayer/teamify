// 注册页面功能
class RegisterForm {
    constructor() {
        this.currentTab = 0;
        this.totalTabs = 4;
        this.formData = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgressBar();
    }

    bindEvents() {
        // 标签页切换
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => this.switchTab(index));
        });

        // 导航按钮
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');

        if (nextBtn) nextBtn.addEventListener('click', () => this.nextTab());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevTab());
        if (submitBtn) submitBtn.addEventListener('click', (e) => this.submitForm(e));

        // 表单输入监听
        this.setupInputListeners();
        
        // 技能选择监听
        this.setupSkillSelection();
        
        // 竞赛类型选择监听
        this.setupCompetitionSelection();
    }

    switchTab(tabIndex) {
        if (tabIndex < 0 || tabIndex >= this.totalTabs) return;
        
        // 验证当前标签页
        if (!this.validateCurrentTab()) {
            this.showTabError();
            return;
        }

        // 保存当前标签页数据
        this.saveCurrentTabData();

        // 更新标签页状态
        this.currentTab = tabIndex;
        this.updateTabDisplay();
        this.updateProgressBar();
        this.updateNavigationButtons();

        // 添加切换动画
        this.animateTabTransition();
    }

    nextTab() {
        this.switchTab(this.currentTab + 1);
    }

    prevTab() {
        this.switchTab(this.currentTab - 1);
    }

    updateTabDisplay() {
        // 更新标签页按钮状态
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentTab);
        });

        // 更新标签页内容
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach((content, index) => {
            content.classList.toggle('active', index === this.currentTab);
        });

        // 更新标签页标题
        this.updateTabTitle();
    }

    updateTabTitle() {
        const titles = [
            '基本信息 Basic Information',
            '学术背景 Academic Background',
            '竞赛兴趣 Competition Interests',
            '团队偏好 Team Preferences'
        ];
        
        const currentTitle = document.querySelector('.tab-content.active h2');
        if (currentTitle) {
            currentTitle.textContent = titles[this.currentTab];
        }
    }

    updateProgressBar() {
        const progress = ((this.currentTab + 1) / this.totalTabs) * 100;
        
        // 创建或更新进度条
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            document.querySelector('.register-container').appendChild(progressBar);
        }
        
        progressBar.style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const submitBtn = document.getElementById('submitBtn');

        // 显示/隐藏按钮
        if (prevBtn) {
            prevBtn.style.display = this.currentTab === 0 ? 'none' : 'inline-flex';
        }

        if (nextBtn) {
            nextBtn.style.display = this.currentTab === this.totalTabs - 1 ? 'none' : 'inline-flex';
        }

        if (submitBtn) {
            submitBtn.style.display = this.currentTab === this.totalTabs - 1 ? 'inline-flex' : 'none';
        }

        // 更新按钮文本
        if (nextBtn) {
            nextBtn.innerHTML = this.currentTab === this.totalTabs - 2 
                ? '最后一步 Final Step <i class="fas fa-arrow-right"></i>'
                : '下一步 Next <i class="fas fa-arrow-right"></i>';
        }
    }

    animateTabTransition() {
        const activeContent = document.querySelector('.tab-content.active');
        activeContent.style.animation = 'none';
        activeContent.offsetHeight; // 触发重排
        activeContent.style.animation = 'fadeInUp 0.5s ease';
    }

    validateCurrentTab() {
        const currentContent = document.querySelector('.tab-content.active');
        const requiredFields = currentContent.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
                this.showFieldError(field);
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;

        // 必填字段验证
        if (field.hasAttribute('required') && !value) {
            return false;
        }

        // 邮箱验证
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return false;
            }
        }

        // 密码验证
        if (name === 'password' && value) {
            if (value.length < 8) return false;
            if (!/[a-zA-Z]/.test(value)) return false;
            if (!/\d/.test(value)) return false;
        }

        // 密码确认验证
        if (name === 'confirmPassword' && value) {
            const password = document.getElementById('password').value;
            if (value !== password) return false;
        }

        // 日期验证
        if (type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - selectedDate.getFullYear();
            if (age < 13 || age > 25) return false;
        }

        return true;
    }

    showFieldError(field) {
        field.classList.add('error');
        this.removeFieldMessage(field);
        
        const message = document.createElement('div');
        message.className = 'error-message';
        message.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${this.getErrorMessage(field)}`;
        
        field.parentNode.appendChild(message);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        this.removeFieldMessage(field);
    }

    removeFieldMessage(field) {
        const existingMessage = field.parentNode.querySelector('.error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    getErrorMessage(field) {
        const type = field.type;
        const name = field.name;

        if (field.hasAttribute('required') && !field.value.trim()) {
            return '此字段为必填项';
        }

        switch (type) {
            case 'email':
                return '请输入有效的邮箱地址';
            case 'date':
                return '请选择有效的出生日期（13-25岁）';
            default:
                if (name === 'password') return '密码至少8位，包含字母和数字';
                if (name === 'confirmPassword') return '两次输入的密码不一致';
                return '请输入有效信息';
        }
    }

    showTabError() {
        const activeContent = document.querySelector('.tab-content.active');
        activeContent.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            activeContent.style.animation = '';
        }, 500);
    }

    saveCurrentTabData() {
        const currentContent = document.querySelector('.tab-content.active');
        const formFields = currentContent.querySelectorAll('input, select, textarea');
        
        formFields.forEach(field => {
            if (field.name) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (field.checked) {
                        if (field.type === 'checkbox') {
                            if (!this.formData[field.name]) {
                                this.formData[field.name] = [];
                            }
                            this.formData[field.name].push(field.value);
                        } else {
                            this.formData[field.name] = field.value;
                        }
                    }
                } else {
                    this.formData[field.name] = field.value;
                }
            }
        });
    }

    setupInputListeners() {
        // 实时验证
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') || input.value.trim()) {
                    this.validateField(input) ? this.clearFieldError(input) : this.showFieldError(input);
                }
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearFieldError(input);
                }
            });
        });

        // 密码强度检测
        const passwordField = document.getElementById('password');
        if (passwordField) {
            passwordField.addEventListener('input', () => this.checkPasswordStrength());
        }

        // 密码确认实时验证
        const confirmPasswordField = document.getElementById('confirmPassword');
        if (confirmPasswordField) {
            confirmPasswordField.addEventListener('input', () => {
                const password = passwordField.value;
                const confirmPassword = confirmPasswordField.value;
                
                if (confirmPassword && password !== confirmPassword) {
                    this.showFieldError(confirmPasswordField);
                } else if (confirmPassword) {
                    this.clearFieldError(confirmPasswordField);
                }
            });
        }
    }

    setupSkillSelection() {
        const skillOptions = document.querySelectorAll('.skill-option');
        skillOptions.forEach(option => {
            option.addEventListener('click', () => {
                const radio = option.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // 添加选中动画
                option.classList.add('success-animation');
                setTimeout(() => {
                    option.classList.remove('success-animation');
                }, 600);
            });
        });
    }

    setupCompetitionSelection() {
        const competitionOptions = document.querySelectorAll('.competition-types .checkbox-option');
        competitionOptions.forEach(option => {
            option.addEventListener('click', () => {
                const checkbox = option.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                
                // 添加选中动画
                option.classList.add('success-animation');
                setTimeout(() => {
                    option.classList.remove('success-animation');
                }, 600);
            });
        });
    }

    checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthIndicator = this.getOrCreateStrengthIndicator();
        
        let strength = 0;
        let strengthText = '';
        let strengthClass = '';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        switch (strength) {
            case 0:
            case 1:
                strengthText = '很弱 Very Weak';
                strengthClass = 'very-weak';
                break;
            case 2:
                strengthText = '弱 Weak';
                strengthClass = 'weak';
                break;
            case 3:
                strengthText = '中等 Medium';
                strengthClass = 'medium';
                break;
            case 4:
                strengthText = '强 Strong';
                strengthClass = 'strong';
                break;
            case 5:
                strengthText = '很强 Very Strong';
                strengthClass = 'very-strong';
                break;
        }

        strengthIndicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill ${strengthClass}" style="width: ${(strength / 5) * 100}%"></div>
            </div>
            <div class="strength-text">${strengthText}</div>
        `;
    }

    getOrCreateStrengthIndicator() {
        let indicator = document.querySelector('.password-strength');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength';
            const passwordField = document.getElementById('password');
            passwordField.parentNode.appendChild(indicator);
        }
        return indicator;
    }

    async submitForm(e) {
        e.preventDefault();
        
        // 验证所有标签页
        if (!this.validateAllTabs()) {
            this.showTabError();
            return;
        }

        // 保存所有数据
        this.saveAllData();

        // 显示提交状态
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
        submitBtn.disabled = true;

        try {
            // 模拟API调用
            await this.simulateSubmission();
            
            // 显示成功消息
            this.showSuccessMessage();
            
        } catch (error) {
            // 显示错误消息
            this.showErrorMessage(error);
            
            // 恢复按钮状态
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateAllTabs() {
        for (let i = 0; i < this.totalTabs; i++) {
            this.currentTab = i;
            this.updateTabDisplay();
            if (!this.validateCurrentTab()) {
                return false;
            }
        }
        return true;
    }

    saveAllData() {
        // 保存当前标签页数据
        this.saveCurrentTabData();
        
        // 添加提交时间戳
        this.formData.submittedAt = new Date().toISOString();
        
        console.log('Form Data:', this.formData);
    }

    async simulateSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟90%成功率
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('网络错误，请重试'));
                }
            }, 2000);
        });
    }

    showSuccessMessage() {
        const container = document.querySelector('.register-container');
        container.innerHTML = `
            <div class="success-container" style="text-align: center; padding: 4rem 2rem;">
                <div class="success-icon" style="font-size: 4rem; color: #28a745; margin-bottom: 2rem;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2 style="color: #28a745; margin-bottom: 1rem;">注册成功！</h2>
                <h2 class="en" style="color: #28a745; margin-bottom: 2rem;">Registration Successful!</h2>
                <p style="color: #6c757d; margin-bottom: 2rem;">欢迎加入全球竞赛社区！我们已向您的邮箱发送了确认邮件。</p>
                <p class="en" style="color: #6c757d; margin-bottom: 3rem;">Welcome to the global competition community! We have sent a confirmation email to your inbox.</p>
                <div class="success-actions">
                    <a href="index.html" class="btn btn-primary">返回首页 Home</a>
                    <a href="find-teammates.html" class="btn btn-outline">寻找队友 Find Teammates</a>
                </div>
            </div>
        `;
    }

    showErrorMessage(error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #dc3545; color: white; padding: 1rem; border-radius: 8px; z-index: 1000;';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message}`;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .password-strength {
        margin-top: 1rem;
    }
    
    .strength-bar {
        width: 100%;
        height: 6px;
        background: #e9ecef;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    
    .strength-fill {
        height: 100%;
        transition: all 0.3s ease;
        border-radius: 3px;
    }
    
    .strength-fill.very-weak { background: #dc3545; }
    .strength-fill.weak { background: #fd7e14; }
    .strength-fill.medium { background: #ffc107; }
    .strength-fill.strong { background: #28a745; }
    .strength-fill.very-strong { background: #20c997; }
    
    .strength-text {
        font-size: 0.85rem;
        color: #6c757d;
        text-align: center;
    }
    
    .success-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .success-actions .btn {
        min-width: 150px;
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new RegisterForm();
});
