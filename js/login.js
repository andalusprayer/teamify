// 登录页面功能
class LoginForm {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupFormValidation();
    }

    bindEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 社交登录按钮
        const socialButtons = document.querySelectorAll('.btn-social');
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSocialLogin(e));
        });

        // 忘记密码链接
        const forgotPasswordLink = document.querySelector('.forgot-password');
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        }
    }

    setupPasswordToggle() {
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordField = document.getElementById('password');

        if (passwordToggle && passwordField) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                
                const icon = passwordToggle.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
        }
    }

    setupFormValidation() {
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');

        if (emailField) {
            emailField.addEventListener('blur', () => this.validateEmail(emailField));
            emailField.addEventListener('input', () => this.clearFieldError(emailField));
        }

        if (passwordField) {
            passwordField.addEventListener('blur', () => this.validatePassword(passwordField));
            passwordField.addEventListener('input', () => this.clearFieldError(passwordField));
        }
    }

    validateEmail(field) {
        const value = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            this.showFieldError(field, '请输入邮箱地址');
            return false;
        }

        if (!emailRegex.test(value)) {
            this.showFieldError(field, '请输入有效的邮箱地址');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    validatePassword(field) {
        const value = field.value.trim();

        if (!value) {
            this.showFieldError(field, '请输入密码');
            return false;
        }

        if (value.length < 6) {
            this.showFieldError(field, '密码至少6位');
            return false;
        }

        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        this.removeFieldMessage(field);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentNode.appendChild(messageDiv);
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

    async handleLogin(e) {
        e.preventDefault();
        
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const submitBtn = document.querySelector('.btn-full');
        
        // 验证表单
        const isEmailValid = this.validateEmail(emailField);
        const isPasswordValid = this.validatePassword(passwordField);
        
        if (!isEmailValid || !isPasswordValid) {
            this.showFormError('请填写所有必填字段');
            return;
        }

        // 显示加载状态
        this.showLoadingState(submitBtn);
        
        try {
            // 模拟登录API调用
            const loginData = {
                email: emailField.value.trim(),
                password: passwordField.value,
                rememberMe: document.getElementById('rememberMe').checked
            };
            
            await this.simulateLogin(loginData);
            
            // 登录成功
            this.showSuccessMessage();
            
            // 模拟重定向到首页
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } catch (error) {
            // 登录失败
            this.showFormError(error.message);
            this.hideLoadingState(submitBtn);
        }
    }

    async simulateLogin(loginData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟登录验证
                if (loginData.email === 'demo@example.com' && loginData.password === 'password123') {
                    resolve({ success: true, user: { email: loginData.email, name: 'Demo User' } });
                } else {
                    reject(new Error('邮箱或密码错误，请重试'));
                }
            }, 1500);
        });
    }

    showLoadingState(button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'block';
        
        button.disabled = true;
        button.classList.add('loading');
    }

    hideLoadingState(button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        if (btnText) btnText.style.display = 'block';
        if (btnLoading) btnLoading.style.display = 'none';
        
        button.disabled = false;
        button.classList.remove('loading');
    }

    showFormError(message) {
        this.removeFormMessage();
        
        const form = document.getElementById('loginForm');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // 添加错误动画
        form.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }

    showSuccessMessage() {
        this.removeFormMessage();
        
        const form = document.getElementById('loginForm');
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> 登录成功！正在跳转...`;
        
        form.insertBefore(successDiv, form.firstChild);
    }

    removeFormMessage() {
        const existingError = document.querySelector('.form-error-message');
        const existingSuccess = document.querySelector('.form-success-message');
        
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();
    }

    handleSocialLogin(e) {
        e.preventDefault();
        const provider = e.currentTarget.classList.contains('btn-google') ? 'Google' :
                        e.currentTarget.classList.contains('btn-facebook') ? 'Facebook' : 'WeChat';
        
        // 显示社交登录提示
        this.showSocialLoginPrompt(provider);
    }

    showSocialLoginPrompt(provider) {
        const message = `正在跳转到${provider}登录页面...`;
        this.showFormError(message);
        
        // 模拟社交登录跳转
        setTimeout(() => {
            this.showFormError(`${provider}登录功能正在开发中，请使用邮箱登录`);
        }, 1000);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        this.showFormError('忘记密码功能正在开发中，请联系管理员');
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .login-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem 0;
    }

    .login-header {
        text-align: center;
        color: white;
        margin-bottom: 3rem;
    }

    .login-header h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .login-header h1.en {
        font-size: 2rem;
        opacity: 0.9;
        margin-bottom: 1.5rem;
    }

    .login-header p {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-bottom: 0.5rem;
    }

    .login-header p.en {
        font-size: 1rem;
        opacity: 0.8;
    }

    .login-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: start;
    }

    .login-form-container {
        background: white;
        border-radius: 20px;
        padding: 2.5rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }

    .login-form {
        margin-bottom: 2rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.75rem;
        color: #2c3e50;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input-wrapper i {
        position: absolute;
        left: 1rem;
        color: #6c757d;
        font-size: 1.1rem;
        z-index: 2;
    }

    .input-wrapper input {
        width: 100%;
        padding: 1rem 1rem 1rem 3rem;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: #f8f9fa;
        color: #2c3e50;
    }

    .input-wrapper input:focus {
        outline: none;
        border-color: #667eea;
        background: white;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        transform: translateY(-2px);
    }

    .input-wrapper input.error {
        border-color: #dc3545;
        background: rgba(220, 53, 69, 0.05);
    }

    .password-toggle {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        font-size: 1.1rem;
        padding: 0;
        z-index: 2;
        transition: color 0.3s ease;
    }

    .password-toggle:hover {
        color: #667eea;
    }

    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1.5rem 0;
    }

    .checkbox-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .checkbox-wrapper input[type="checkbox"] {
        display: none;
    }

    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-radius: 4px;
        margin-right: 0.75rem;
        position: relative;
        transition: all 0.3s ease;
        background: white;
        flex-shrink: 0;
    }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkmark {
        background: #667eea;
        border-color: #667eea;
    }

    .checkbox-wrapper input[type="checkbox"]:checked + .checkmark::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    .forgot-password {
        color: #667eea;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
    }

    .forgot-password:hover {
        color: #764ba2;
        text-decoration: underline;
    }

    .btn-full {
        width: 100%;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 1rem;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .btn-full:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }

    .btn-full:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    .btn-loading {
        display: none;
    }

    .social-login {
        text-align: center;
        padding: 2rem 0;
        border-top: 1px solid #e9ecef;
        border-bottom: 1px solid #e9ecef;
        margin: 2rem 0;
    }

    .social-login p {
        margin-bottom: 1.5rem;
        color: #6c757d;
        font-size: 0.95rem;
    }

    .social-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-social {
        flex: 1;
        min-width: 120px;
        padding: 0.75rem 1rem;
        border: 2px solid #e9ecef;
        background: white;
        color: #2c3e50;
        font-weight: 500;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .btn-social:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .btn-google:hover {
        border-color: #db4437;
        color: #db4437;
    }

    .btn-facebook:hover {
        border-color: #4267B2;
        color: #4267B2;
    }

    .btn-wechat:hover {
        border-color: #07C160;
        color: #07C160;
    }

    .auth-footer {
        text-align: center;
        padding: 1.5rem 0 0;
    }

    .auth-footer p {
        margin: 0.5rem 0;
        color: #6c757d;
        font-size: 0.95rem;
    }

    .auth-footer a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
    }

    .auth-footer a:hover {
        color: #764ba2;
        text-decoration: underline;
    }

    .login-features {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        color: white;
    }

    .feature-item {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }

    .feature-item:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.9);
    }

    .feature-item h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: white;
    }

    .feature-item h3.en {
        font-size: 1.1rem;
        opacity: 0.8;
        margin-bottom: 1rem;
    }

    .feature-item p {
        font-size: 0.95rem;
        opacity: 0.9;
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }

    .feature-item p.en {
        font-size: 0.85rem;
        opacity: 0.7;
    }

    .form-error-message,
    .form-success-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
    }

    .form-error-message {
        background: rgba(220, 53, 69, 0.1);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.2);
    }

    .form-success-message {
        background: rgba(40, 167, 69, 0.1);
        color: #28a745;
        border: 1px solid rgba(40, 167, 69, 0.2);
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @media (max-width: 768px) {
        .login-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .login-header h1 {
            font-size: 2rem;
        }

        .login-header h1.en {
            font-size: 1.5rem;
        }

        .login-form-container {
            padding: 2rem;
        }

        .social-buttons {
            flex-direction: column;
        }

        .btn-social {
            min-width: auto;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});
