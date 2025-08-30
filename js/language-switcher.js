/**
 * 多语言切换模块
 * Multilingual language switcher module
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言切换器
    initLanguageSwitcher();
});

/**
 * 初始化语言切换器
 */
function initLanguageSwitcher() {
    // 获取语言切换按钮容器
    const langSwitchContainer = document.querySelector('.language-switch');
    if (!langSwitchContainer) return;
    
    // 清空原有内容
    langSwitchContainer.innerHTML = '';
    
    // 创建语言选择下拉菜单
    const langDropdown = document.createElement('div');
    langDropdown.className = 'lang-dropdown';
    
    // 创建当前语言显示按钮
    const currentLang = document.createElement('button');
    currentLang.id = 'currentLang';
    currentLang.innerHTML = '<span>中文</span> <i class="fas fa-chevron-down"></i>';
    langDropdown.appendChild(currentLang);
    
    // 创建语言选项列表
    const langOptions = document.createElement('div');
    langOptions.className = 'lang-options';
    
    // 添加支持的语言选项
    const languages = [
        { code: 'zh', name: '中文' },
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
        { code: 'fr', name: 'Français' }
    ];
    
    languages.forEach(lang => {
        const option = document.createElement('div');
        option.className = 'lang-option';
        option.dataset.lang = lang.code;
        option.textContent = lang.name;
        option.addEventListener('click', function() {
            switchLanguage(lang.code);
            currentLang.querySelector('span').textContent = lang.name;
            langOptions.classList.remove('show');
        });
        langOptions.appendChild(option);
    });
    
    langDropdown.appendChild(langOptions);
    langSwitchContainer.appendChild(langDropdown);
    
    // 点击当前语言按钮时显示/隐藏选项
    currentLang.addEventListener('click', function(e) {
        e.stopPropagation();
        langOptions.classList.toggle('show');
    });
    
    // 点击页面其他地方时隐藏语言选项
    document.addEventListener('click', function() {
        langOptions.classList.remove('show');
    });
    
    // 从本地存储中获取上次选择的语言
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        // 设置保存的语言
        switchLanguage(savedLang);
        // 更新当前语言显示
        const langName = languages.find(l => l.code === savedLang)?.name || '中文';
        currentLang.querySelector('span').textContent = langName;
    }
}

/**
 * 切换语言
 * @param {string} langCode - 语言代码 ('zh', 'en', 'de', 'fr')
 */
function switchLanguage(langCode) {
    // 保存语言选择到本地存储
    localStorage.setItem('preferredLanguage', langCode);
    
    // 应用翻译到页面元素
    applyTranslations(langCode);
    
    // 触发自定义事件，通知其他可能需要知道语言变化的组件
    const event = new CustomEvent('languageChanged', { detail: { language: langCode } });
    document.dispatchEvent(event);
}

/**
 * 应用翻译到页面元素
 * @param {string} langCode - 语言代码
 */
function applyTranslations(langCode) {
    // 确保translations对象存在
    if (typeof translations === 'undefined' || !translations[langCode]) {
        console.error('Translation not found for language:', langCode);
        return;
    }
    
    // 获取当前语言的翻译
    const currentTranslations = translations[langCode];
    
    // 查找所有带有data-i18n属性的元素
    const elements = document.querySelectorAll('[data-i18n]');
    
    // 应用翻译
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentTranslations[key]) {
            // 如果元素是输入框或文本区域
            if (element.tagName === 'INPUT' && element.type !== 'button' && element.type !== 'submit') {
                element.placeholder = currentTranslations[key];
            } 
            // 如果元素是按钮或提交按钮
            else if ((element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) || element.tagName === 'BUTTON') {
                element.value = currentTranslations[key];
            } 
            // 其他元素
            else {
                element.textContent = currentTranslations[key];
            }
        }
    });
    
    // 处理特殊情况：页面标题
            document.title = document.title.replace(/^[^|]+/, '') + ' - teamify';
    
    // 处理特殊情况：占位符文本
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (currentTranslations[key]) {
            element.placeholder = currentTranslations[key];
        }
    });
}

/**
 * 获取当前语言代码
 * @returns {string} 当前语言代码
 */
function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || 'zh';
}

/**
 * 获取翻译文本
 * @param {string} key - 翻译键
 * @returns {string} 翻译后的文本
 */
function getTranslation(key) {
    const langCode = getCurrentLanguage();
    if (translations[langCode] && translations[langCode][key]) {
        return translations[langCode][key];
    }
    // 如果找不到翻译，返回中文翻译或键名
    return translations['zh'][key] || key;
}