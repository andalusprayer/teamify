document.addEventListener('DOMContentLoaded', function() {
    // 密码可见性切换 Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // 密码强度检测 Password strength checker
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            strengthMeter.setAttribute('data-strength', strength.score);
            
            // 更新强度文本 Update strength text
            if (password.length === 0) {
                strengthText.textContent = '密码强度 Password Strength';
            } else {
                const strengthLabels = {
                    0: '非常弱 Very Weak',
                    1: '弱 Weak',
                    2: '中等 Medium',
                    3: '强 Strong',
                    4: '非常强 Very Strong'
                };
                strengthText.textContent = strengthLabels[strength.score];
            }
        });
    }

    // 检查密码强度 Check password strength
    function checkPasswordStrength(password) {
        let score = 0;
        const feedback = [];

        if (password.length === 0) {
            return { score, feedback };
        }

        // 长度检查 Length check
        if (password.length > 8) score += 1;
        if (password.length > 12) score += 1;

        // 复杂度检查 Complexity checks
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        // 调整最终分数 Adjust final score
        score = Math.min(4, Math.floor(score / 2));

        return { score, feedback };
    }

    // 添加/删除语言 Add/remove languages
    const addLanguageBtn = document.querySelector('.btn-add-language');
    if (addLanguageBtn) {
        addLanguageBtn.addEventListener('click', function() {
            const languageInputs = document.querySelector('.language-inputs');
            const newLanguageInput = document.createElement('div');
            newLanguageInput.className = 'language-input';
            newLanguageInput.innerHTML = `
                <input type="text" placeholder="语言 Language" class="language-name">
                <select class="language-level">
                    <option value="">熟练度 Proficiency</option>
                    <option value="native">母语 Native</option>
                    <option value="fluent">流利 Fluent</option>
                    <option value="advanced">高级 Advanced</option>
                    <option value="intermediate">中级 Intermediate</option>
                    <option value="basic">基础 Basic</option>
                </select>
                <button type="button" class="btn-remove-language"><i class="fas fa-times"></i></button>
            `;
            languageInputs.appendChild(newLanguageInput);
            
            // 添加删除按钮事件 Add remove button event
            const removeBtn = newLanguageInput.querySelector('.btn-remove-language');
            removeBtn.addEventListener('click', function() {
                this.closest('.language-input').remove();
            });
        });
    }

    // 为初始的删除语言按钮添加事件 Add event for initial remove language buttons
    document.querySelectorAll('.btn-remove-language').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.language-input').remove();
        });
    });

    // 表单验证 Form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // 验证所有必填字段 Validate all required fields
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, '此字段为必填项 This field is required');
                } else {
                    clearError(field);
                }
            });
            
            // 验证邮箱格式 Validate email format
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    showError(emailField, '请输入有效的电子邮箱地址 Please enter a valid email address');
                }
            }
            
            // 验证密码匹配 Validate password match
            const passwordField = document.getElementById('password');
            const confirmPasswordField = document.getElementById('confirmPassword');
            if (passwordField && confirmPasswordField && 
                passwordField.value && confirmPasswordField.value) {
                if (passwordField.value !== confirmPasswordField.value) {
                    isValid = false;
                    showError(confirmPasswordField, '两次输入的密码不匹配 Passwords do not match');
                }
            }
            
            // 验证密码强度 Validate password strength
            if (passwordField && passwordField.value) {
                const strength = checkPasswordStrength(passwordField.value);
                if (strength.score < 2) {
                    isValid = false;
                    showError(passwordField, '密码强度太弱，请使用更复杂的密码 Password is too weak, please use a more complex password');
                }
            }
            
            // 如果验证通过，提交表单 If validation passes, submit the form
            if (isValid) {
                // 在实际应用中，这里会发送AJAX请求到服务器 In a real application, this would send an AJAX request to the server
                alert('注册成功！Registration successful!');
                this.reset();
                // 重定向到登录页面 Redirect to login page
                // window.location.href = 'login.html';
            }
        });
    }

    // 显示错误消息 Show error message
    function showError(field, message) {
        field.classList.add('error');
        
        // 检查是否已存在错误消息 Check if error message already exists
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextElementSibling);
        }
        
        errorElement.textContent = message;
    }

    // 清除错误消息 Clear error message
    function clearError(field) {
        field.classList.remove('error');
        
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
});