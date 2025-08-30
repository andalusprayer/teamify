/**
 * 队友匹配页面JavaScript功能
 * Teammates Page JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化搜索过滤功能
    initSearchFilter();
    
    // 初始化团队表单功能
    initTeamForm();
    
    // 初始化发送邀请功能
    initSendInvite();
    
    // 初始化申请加入功能
    initApplyTeam();
    
    // 初始化分页功能
    initPagination();
});

/**
 * 初始化搜索过滤功能
 * Initialize search and filter functionality
 */
function initSearchFilter() {
    const searchInput = document.querySelector('.search-box input');
    const competitionFilter = document.getElementById('competitionFilter');
    const skillFilter = document.getElementById('skillFilter');
    const languageFilter = document.getElementById('languageFilter');
    
    // 搜索框输入事件
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTeammates();
        });
    }
    
    // 竞赛类型筛选事件
    if (competitionFilter) {
        competitionFilter.addEventListener('change', function() {
            filterTeammates();
        });
    }
    
    // 技能筛选事件
    if (skillFilter) {
        skillFilter.addEventListener('change', function() {
            filterTeammates();
        });
    }
    
    // 语言筛选事件
    if (languageFilter) {
        languageFilter.addEventListener('change', function() {
            filterTeammates();
        });
    }
}

/**
 * 根据筛选条件过滤队友卡片
 * Filter teammate cards based on filter criteria
 */
function filterTeammates() {
    const searchInput = document.querySelector('.search-box input');
    const competitionFilter = document.getElementById('competitionFilter');
    const skillFilter = document.getElementById('skillFilter');
    const languageFilter = document.getElementById('languageFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const competitionValue = competitionFilter ? competitionFilter.value : 'all';
    const skillValue = skillFilter ? skillFilter.value : 'all';
    const languageValue = languageFilter ? languageFilter.value : 'all';
    
    const teammateCards = document.querySelectorAll('.teammate-card');
    
    let visibleCount = 0;
    
    teammateCards.forEach(card => {
        // 获取卡片内容
        const cardText = card.textContent.toLowerCase();
        const competitions = Array.from(card.querySelectorAll('.teammate-competitions .tags span'))
            .map(span => span.textContent.toLowerCase());
        const skills = Array.from(card.querySelectorAll('.teammate-skills .tags span'))
            .map(span => span.textContent.toLowerCase());
        const languages = Array.from(card.querySelectorAll('.teammate-languages .tags span'))
            .map(span => span.textContent.toLowerCase());
        
        // 应用筛选条件
        let matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
        let matchesCompetition = competitionValue === 'all' || competitions.some(comp => comp.includes(competitionValue));
        let matchesSkill = skillValue === 'all' || skills.some(skill => skill.includes(skillValue));
        let matchesLanguage = languageValue === 'all' || languages.some(lang => lang.includes(languageValue));
        
        // 显示或隐藏卡片
        if (matchesSearch && matchesCompetition && matchesSkill && matchesLanguage) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 更新结果数量
    updateResultCount(visibleCount);
}

/**
 * 更新结果数量
 * Update result count
 */
function updateResultCount(count) {
    const teammatesSection = document.getElementById('teammates');
    if (teammatesSection) {
        const heading = teammatesSection.querySelector('h2');
        if (heading) {
            // 更新标题显示结果数量
            const baseText = '推荐队友 Recommended Teammates';
            heading.textContent = `${baseText} (${count})`;
        }
    }
}

/**
 * 初始化团队表单功能
 * Initialize team form functionality
 */
function initTeamForm() {
    const createTeamForm = document.getElementById('createTeamForm');
    const competitionSelect = document.getElementById('competition');
    const otherCompetitionGroup = document.getElementById('otherCompetitionGroup');
    
    // 设置日期选择器最小日期为今天
    const deadlineInput = document.getElementById('deadline');
    if (deadlineInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        deadlineInput.min = todayString;
    }
    
    // 竞赛选择变化事件
    if (competitionSelect && otherCompetitionGroup) {
        competitionSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherCompetitionGroup.style.display = 'block';
                document.getElementById('otherCompetition').setAttribute('required', 'required');
            } else {
                otherCompetitionGroup.style.display = 'none';
                document.getElementById('otherCompetition').removeAttribute('required');
            }
        });
    }
    
    // 表单提交事件
    if (createTeamForm) {
        createTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 表单验证
            if (validateTeamForm()) {
                // 模拟表单提交成功
                showNotification('团队创建成功！Team created successfully!', 'success');
                this.reset();
                
                // 滚动到团队招募帖区域
                setTimeout(() => {
                    const teamPostsSection = document.querySelector('.team-posts');
                    if (teamPostsSection) {
                        teamPostsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1500);
            }
        });
    }
}

/**
 * 验证团队表单
 * Validate team form
 */
function validateTeamForm() {
    const teamName = document.getElementById('teamName');
    const competition = document.getElementById('competition');
    const otherCompetition = document.getElementById('otherCompetition');
    const teamDescription = document.getElementById('teamDescription');
    const requiredSkills = document.getElementById('requiredSkills');
    const deadline = document.getElementById('deadline');
    
    let isValid = true;
    
    // 验证团队名称
    if (!teamName.value.trim()) {
        showInputError(teamName, '请输入团队名称 Please enter team name');
        isValid = false;
    } else {
        clearInputError(teamName);
    }
    
    // 验证竞赛选择
    if (!competition.value) {
        showInputError(competition, '请选择竞赛 Please select competition');
        isValid = false;
    } else if (competition.value === 'other' && !otherCompetition.value.trim()) {
        showInputError(otherCompetition, '请输入竞赛名称 Please enter competition name');
        isValid = false;
    } else {
        clearInputError(competition);
        clearInputError(otherCompetition);
    }
    
    // 验证团队描述
    if (!teamDescription.value.trim()) {
        showInputError(teamDescription, '请输入团队描述 Please enter team description');
        isValid = false;
    } else {
        clearInputError(teamDescription);
    }
    
    // 验证所需技能
    if (!requiredSkills.value.trim()) {
        showInputError(requiredSkills, '请输入所需技能 Please enter required skills');
        isValid = false;
    } else {
        clearInputError(requiredSkills);
    }
    
    // 验证截止日期
    if (!deadline.value) {
        showInputError(deadline, '请选择截止日期 Please select deadline');
        isValid = false;
    } else {
        clearInputError(deadline);
    }
    
    return isValid;
}

/**
 * 显示输入错误
 * Show input error
 */
function showInputError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    // 检查是否已存在错误消息
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
}

/**
 * 清除输入错误
 * Clear input error
 */
function clearInputError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * 初始化发送邀请功能
 * Initialize send invite functionality
 */
function initSendInvite() {
    const sendInviteButtons = document.querySelectorAll('.send-invite');
    
    sendInviteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取队友名称
            const teammateCard = this.closest('.teammate-card');
            const teammateName = teammateCard.querySelector('h3').textContent;
            
            // 显示确认对话框
            if (confirm(`确定要向 ${teammateName} 发送邀请吗？\nAre you sure you want to send an invitation to ${teammateName}?`)) {
                // 模拟发送邀请成功
                this.textContent = '已发送 Sent';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.disabled = true;
                
                showNotification(`邀请已发送给 ${teammateName}！Invitation sent to ${teammateName}!`, 'success');
            }
        });
    });
}

/**
 * 初始化申请加入功能
 * Initialize apply team functionality
 */
function initApplyTeam() {
    const applyTeamButtons = document.querySelectorAll('.apply-team');
    
    applyTeamButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取团队名称
            const teamPostCard = this.closest('.team-post-card');
            const teamName = teamPostCard.querySelector('h3').textContent;
            
            // 显示确认对话框
            if (confirm(`确定要申请加入 ${teamName} 吗？\nAre you sure you want to apply to join ${teamName}?`)) {
                // 模拟申请加入成功
                this.textContent = '已申请 Applied';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.disabled = true;
                
                showNotification(`已成功申请加入 ${teamName}！Successfully applied to join ${teamName}!`, 'success');
            }
        });
    });
}

/**
 * 初始化分页功能
 * Initialize pagination functionality
 */
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        if (!button.classList.contains('active')) {
            button.addEventListener('click', function() {
                // 移除所有按钮的活动状态
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // 添加当前按钮的活动状态
                this.classList.add('active');
                
                // 模拟页面切换效果
                const section = this.closest('section');
                const cards = section.querySelectorAll('.teammate-card, .team-post-card');
                
                // 添加淡出效果
                cards.forEach(card => {
                    card.style.opacity = '0';
                });
                
                // 延迟后添加淡入效果
                setTimeout(() => {
                    cards.forEach(card => {
                        card.style.opacity = '1';
                    });
                }, 300);
                
                // 滚动到区域顶部
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    });
}

/**
 * 显示通知消息
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 自动关闭通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 添加通知样式
addNotificationStyles();

/**
 * 添加通知样式
 * Add notification styles
 */
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #fff;
            color: #333;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: #4CAF50;
            color: white;
        }
        
        .notification.error {
            background-color: #F44336;
            color: white;
        }
        
        .notification.info {
            background-color: #2196F3;
            color: white;
        }
        
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #F44336;
        }
        
        .error-message {
            color: #F44336;
            font-size: 0.85rem;
            margin-top: 5px;
            text-align: left;
        }
    `;
    
    document.head.appendChild(style);
}