/**
 * 个人资料页面脚本 - Profile Page Script
 * 实现标签页切换、技能进度条动画、编辑功能等
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签页切换功能
    initTabs();
    
    // 初始化技能进度条动画
    initSkillBars();
    
    // 初始化编辑功能
    initEditButtons();
    
    // 初始化团队邀请功能
    initInvitations();
    
    // 初始化设置表单
    initSettingsForm();
});

/**
 * 初始化标签页切换功能
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签按钮的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 移除所有标签内容的活动状态
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 添加当前标签按钮的活动状态
            this.classList.add('active');
            
            // 获取目标标签内容并添加活动状态
            const target = this.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
            
            // 保存用户的标签选择到本地存储
            localStorage.setItem('activeProfileTab', target);
        });
    });
    
    // 检查本地存储中是否有保存的标签选择
    const savedTab = localStorage.getItem('activeProfileTab');
    if (savedTab) {
        // 找到对应的标签按钮并触发点击事件
        const savedButton = document.querySelector(`.tab-btn[data-tab="${savedTab}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }
}

/**
 * 初始化技能进度条动画
 */
function initSkillBars() {
    // 检查元素是否在视口中
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 动画技能进度条
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress .progress');
        
        skillBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.classList.contains('animated')) {
                // 获取进度值
                const width = bar.style.width;
                
                // 先将宽度设为0
                bar.style.width = '0';
                
                // 添加已动画标记
                bar.classList.add('animated');
                
                // 延迟一下再执行动画，以便看到效果
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }
    
    // 初始执行一次
    animateSkillBars();
    
    // 滚动时检查并执行动画
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * 初始化编辑功能
 */
function initEditButtons() {
    // 个人资料编辑按钮
    const editProfileBtn = document.querySelector('.profile-actions .btn-primary');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showNotification('编辑个人资料功能即将上线！Edit profile feature coming soon!');
        });
    }
    
    // 各部分编辑按钮
    const editSectionBtns = document.querySelectorAll('.edit-section');
    editSectionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionTitle = this.closest('.section-header').querySelector('h2').textContent;
            showNotification(`编辑${sectionTitle}功能即将上线！Edit feature coming soon!`);
        });
    });
    
    // 添加竞赛按钮
    const addCompetitionBtn = document.querySelector('.add-competition');
    if (addCompetitionBtn) {
        addCompetitionBtn.addEventListener('click', function() {
            showNotification('添加竞赛经历功能即将上线！Add competition feature coming soon!');
        });
    }
    
    // 创建团队按钮
    const createTeamBtn = document.querySelector('.create-team');
    if (createTeamBtn) {
        createTeamBtn.addEventListener('click', function() {
            showNotification('创建团队功能即将上线！Create team feature coming soon!');
        });
    }
    
    // 头像和封面编辑按钮
    const editAvatarBtn = document.querySelector('.edit-avatar .btn-icon');
    const editCoverBtn = document.querySelector('.edit-cover .btn-icon');
    
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            showNotification('更换头像功能即将上线！Change avatar feature coming soon!');
        });
    }
    
    if (editCoverBtn) {
        editCoverBtn.addEventListener('click', function() {
            showNotification('更换封面功能即将上线！Change cover feature coming soon!');
        });
    }
}

/**
 * 初始化团队邀请功能
 */
function initInvitations() {
    // 接受邀请按钮
    const acceptBtns = document.querySelectorAll('.accept-invitation');
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const invitationItem = this.closest('.invitation-item');
            const teamName = invitationItem.querySelector('.invitation-info p').textContent;
            
            // 显示接受邀请的成功消息
            showNotification(`您已成功接受加入「${teamName}」的邀请！You have successfully accepted the invitation to join "${teamName}"!`, 'success');
            
            // 移除邀请项
            setTimeout(() => {
                invitationItem.style.opacity = '0';
                setTimeout(() => {
                    invitationItem.remove();
                    
                    // 检查是否还有邀请
                    const remainingInvitations = document.querySelectorAll('.invitation-item');
                    if (remainingInvitations.length === 0) {
                        const container = document.querySelector('.invitations-container');
                        container.innerHTML = '<p>当前没有团队邀请。No team invitations at the moment.</p>';
                    }
                }, 300);
            }, 1000);
        });
    });
    
    // 拒绝邀请按钮
    const declineBtns = document.querySelectorAll('.decline-invitation');
    declineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const invitationItem = this.closest('.invitation-item');
            const teamName = invitationItem.querySelector('.invitation-info p').textContent;
            
            // 显示拒绝邀请的消息
            showNotification(`您已婉拒加入「${teamName}」的邀请。You have declined the invitation to join "${teamName}".`);
            
            // 移除邀请项
            setTimeout(() => {
                invitationItem.style.opacity = '0';
                setTimeout(() => {
                    invitationItem.remove();
                    
                    // 检查是否还有邀请
                    const remainingInvitations = document.querySelectorAll('.invitation-item');
                    if (remainingInvitations.length === 0) {
                        const container = document.querySelector('.invitations-container');
                        container.innerHTML = '<p>当前没有团队邀请。No team invitations at the moment.</p>';
                    }
                }, 300);
            }, 1000);
        });
    });
}

/**
 * 初始化设置表单
 */
function initSettingsForm() {
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('设置已成功保存！Settings saved successfully!', 'success');
        });
    }
    
    // 更改邮箱按钮
    const changeEmailBtn = document.querySelector('.change-email');
    if (changeEmailBtn) {
        changeEmailBtn.addEventListener('click', function() {
            showNotification('更改邮箱功能即将上线！Change email feature coming soon!');
        });
    }
    
    // 更改密码按钮
    const changePasswordBtn = document.querySelector('.change-password');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            showNotification('更改密码功能即将上线！Change password feature coming soon!');
        });
    }
    
    // 停用账户按钮
    const deactivateBtn = document.querySelector('.btn-warning');
    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('您确定要停用账户吗？此操作可以随时撤销。\nAre you sure you want to deactivate your account? This action can be reversed at any time.')) {
                showNotification('账户停用功能即将上线！Account deactivation feature coming soon!');
            }
        });
    }
    
    // 删除账户按钮
    const deleteBtn = document.querySelector('.btn-danger');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('您确定要永久删除账户吗？此操作无法撤销，所有数据将被永久删除。\nAre you sure you want to permanently delete your account? This action cannot be undone and all your data will be permanently deleted.')) {
                showNotification('账户删除功能即将上线！Account deletion feature coming soon!', 'error');
            }
        });
    }
}

/**
 * 显示通知消息
 * @param {string} message - 通知消息内容
 * @param {string} type - 通知类型（success, error, info）
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 添加样式
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 350px;
                background-color: #fff;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                overflow: hidden;
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 15px;
            }
            
            .notification-message {
                flex: 1;
                margin-right: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
                color: #666;
            }
            
            .notification.success {
                border-left: 4px solid #10b981;
            }
            
            .notification.error {
                border-left: 4px solid #ef4444;
            }
            
            .notification.info {
                border-left: 4px solid #3b82f6;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 添加关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // 自动关闭通知
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

/**
 * 关闭通知
 * @param {HTMLElement} notification - 通知元素
 */
function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}