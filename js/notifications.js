/**
 * 通知系统JavaScript功能
 */

// 通知系统类
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.maxNotifications = 5;
        this.autoCloseTime = 5000; // 5秒后自动关闭
        this.init();
    }

    // 初始化通知系统
    init() {
        // 创建通知容器
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);

        // 初始化导航栏通知图标
        this.initNavNotifications();
    }

    // 初始化导航栏通知图标
    initNavNotifications() {
        const navNotificationIcon = document.querySelector('.nav-notification-icon');
        if (!navNotificationIcon) return;

        const notificationDropdown = document.querySelector('.notification-dropdown');
        const notificationBadge = document.querySelector('.notification-badge');

        // 点击通知图标显示/隐藏下拉菜单
        navNotificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // 点击其他区域关闭下拉菜单
        document.addEventListener('click', () => {
            if (notificationDropdown) {
                notificationDropdown.style.display = 'none';
            }
        });

        // 阻止下拉菜单内部点击事件冒泡
        if (notificationDropdown) {
            notificationDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // 标记所有通知为已读
            const markAllReadButton = notificationDropdown.querySelector('.mark-all-read');
            if (markAllReadButton) {
                markAllReadButton.addEventListener('click', () => {
                    this.markAllAsRead();
                });
            }

            // 通知操作按钮
            const notificationActions = notificationDropdown.querySelectorAll('.notification-actions button');
            notificationActions.forEach(action => {
                action.addEventListener('click', () => {
                    const actionType = action.classList.contains('accept') ? 'accept' : 
                                      action.classList.contains('decline') ? 'decline' : 'view';
                    const notification = action.closest('li');
                    const notificationId = notification.getAttribute('data-id');
                    const notificationType = notification.getAttribute('data-type');

                    this.handleNotificationAction(notificationId, notificationType, actionType);
                });
            });
        }

        // 更新通知徽章
        this.updateNotificationBadge();
    }

    // 显示通知
    show(message, type = 'info', autoClose = true, actions = null) {
        // 生成唯一ID
        const id = 'notification-' + Date.now();

        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('data-id', id);

        // 设置通知内容
        let iconClass = '';
        switch (type) {
            case 'success':
                iconClass = 'fas fa-check-circle';
                break;
            case 'error':
                iconClass = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                iconClass = 'fas fa-exclamation-triangle';
                break;
            case 'info':
            default:
                iconClass = 'fas fa-info-circle';
                break;
        }

        // 构建通知HTML
        let actionsHtml = '';
        if (actions) {
            actionsHtml = '<div class="notification-actions">';
            actions.forEach(action => {
                actionsHtml += `<button class="${action.class}" data-action="${action.action}">${action.text}</button>`;
            });
            actionsHtml += '</div>';
        }

        notification.innerHTML = `
            <div class="notification-icon"><i class="${iconClass}"></i></div>
            <div class="notification-content">
                <p>${message}</p>
                ${actionsHtml}
            </div>
            <button class="notification-close">&times;</button>
        `;

        // 添加到通知容器
        this.container.appendChild(notification);

        // 添加到通知数组
        this.notifications.push({
            id,
            element: notification,
            type,
            message,
            timestamp: Date.now()
        });

        // 限制最大通知数量
        this.limitNotifications();

        // 绑定关闭事件
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(id);
        });

        // 绑定操作按钮事件
        if (actions) {
            const actionButtons = notification.querySelectorAll('.notification-actions button');
            actionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = button.getAttribute('data-action');
                    this.handleAction(id, action);
                });
            });
        }

        // 点击通知本身
        notification.addEventListener('click', () => {
            this.close(id);
        });

        // 自动关闭
        if (autoClose) {
            setTimeout(() => {
                this.close(id);
            }, this.autoCloseTime);
        }

        return id;
    }

    // 关闭通知
    close(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;

        const element = notification.element;
        element.classList.add('hide');

        // 动画结束后移除元素
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            this.notifications = this.notifications.filter(n => n.id !== id);
        }, 300);
    }

    // 限制最大通知数量
    limitNotifications() {
        if (this.notifications.length > this.maxNotifications) {
            // 移除最早的通知
            const oldestNotification = this.notifications[0];
            this.close(oldestNotification.id);
        }
    }

    // 处理通知操作按钮
    handleAction(id, action) {
        // 这里可以根据不同的操作类型执行不同的逻辑
        console.log(`Notification ${id} action: ${action}`);

        // 关闭通知
        this.close(id);

        // 触发自定义事件
        const event = new CustomEvent('notification:action', {
            detail: { id, action }
        });
        document.dispatchEvent(event);
    }

    // 更新导航栏通知徽章
    updateNotificationBadge() {
        const notificationBadge = document.querySelector('.notification-badge');
        if (!notificationBadge) return;

        const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
        const count = unreadNotifications.length;

        if (count > 0) {
            notificationBadge.textContent = count;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }

    // 标记所有通知为已读
    markAllAsRead() {
        const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });

        // 更新通知徽章
        this.updateNotificationBadge();

        // 显示成功通知
        this.show('已将所有通知标记为已读', 'success');

        // 触发自定义事件
        const event = new CustomEvent('notifications:allread');
        document.dispatchEvent(event);
    }

    // 处理导航栏通知操作
    handleNotificationAction(notificationId, notificationType, actionType) {
        // 获取通知元素
        const notification = document.querySelector(`.notification-list li[data-id="${notificationId}"]`);
        if (!notification) return;

        // 根据操作类型和通知类型执行不同的逻辑
        switch (actionType) {
            case 'accept':
                if (notificationType === 'team_invite') {
                    this.show('已接受团队邀请', 'success');
                } else if (notificationType === 'friend_request') {
                    this.show('已接受好友请求', 'success');
                }
                notification.remove();
                break;
            case 'decline':
                if (notificationType === 'team_invite') {
                    this.show('已拒绝团队邀请', 'info');
                } else if (notificationType === 'friend_request') {
                    this.show('已拒绝好友请求', 'info');
                }
                notification.remove();
                break;
            case 'view':
                if (notificationType === 'competition') {
                    window.location.href = 'competitions.html';
                } else if (notificationType === 'team_update') {
                    window.location.href = 'find-teammates.html';
                } else if (notificationType === 'system') {
                    this.show('查看系统通知', 'info');
                }
                break;
        }

        // 更新通知徽章
        this.updateNotificationBadge();

        // 触发自定义事件
        const event = new CustomEvent('notification:action', {
            detail: { id: notificationId, type: notificationType, action: actionType }
        });
        document.dispatchEvent(event);
    }
}

// 创建全局通知系统实例
let notificationSystem;

document.addEventListener('DOMContentLoaded', () => {
    notificationSystem = new NotificationSystem();

    // 将通知系统实例添加到全局对象
    window.notificationSystem = notificationSystem;
});

/**
 * 显示通知的全局函数
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型（success, error, info, warning）
 * @param {boolean} autoClose - 是否自动关闭
 * @param {Array} actions - 操作按钮数组
 * @returns {string} 通知ID
 */
function showNotification(message, type = 'info', autoClose = true, actions = null) {
    if (notificationSystem) {
        return notificationSystem.show(message, type, autoClose, actions);
    } else {
        console.error('通知系统尚未初始化');
        return null;
    }
}

/**
 * 关闭通知的全局函数
 * @param {string} id - 通知ID
 */
function closeNotification(id) {
    if (notificationSystem) {
        notificationSystem.close(id);
    } else {
        console.error('通知系统尚未初始化');
    }
}

/**
 * 添加导航栏通知的函数
 * @param {Object} notification - 通知对象
 */
function addNavNotification(notification) {
    // 获取通知列表
    const notificationList = document.querySelector('.notification-list');
    if (!notificationList) return;

    // 检查是否存在空通知状态
    const emptyNotifications = notificationList.querySelector('.empty-notifications');
    if (emptyNotifications) {
        emptyNotifications.remove();
    }

    // 创建通知项
    const notificationItem = document.createElement('li');
    notificationItem.className = notification.unread ? 'unread' : '';
    notificationItem.setAttribute('data-id', notification.id);
    notificationItem.setAttribute('data-type', notification.type);

    // 构建通知HTML
    let actionsHtml = '';
    if (notification.actions) {
        actionsHtml = '<div class="notification-actions">';
        notification.actions.forEach(action => {
            actionsHtml += `<button class="${action.class}">${action.text}</button>`;
        });
        actionsHtml += '</div>';
    }

    notificationItem.innerHTML = `
        <div class="notification-avatar">
            <img src="${notification.avatar}" alt="${notification.sender}">
        </div>
        <div class="notification-content">
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
            ${actionsHtml}
        </div>
    `;

    // 添加到通知列表顶部
    notificationList.insertBefore(notificationItem, notificationList.firstChild);

    // 更新通知徽章
    if (notificationSystem) {
        notificationSystem.updateNotificationBadge();
    }

    // 绑定通知操作按钮事件
    const actionButtons = notificationItem.querySelectorAll('.notification-actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const actionType = button.classList.contains('accept') ? 'accept' : 
                              button.classList.contains('decline') ? 'decline' : 'view';
            
            if (notificationSystem) {
                notificationSystem.handleNotificationAction(notification.id, notification.type, actionType);
            }
        });
    });

    // 点击通知项标记为已读
    notificationItem.addEventListener('click', () => {
        if (notificationItem.classList.contains('unread')) {
            notificationItem.classList.remove('unread');
            
            // 更新通知徽章
            if (notificationSystem) {
                notificationSystem.updateNotificationBadge();
            }
        }
    });
}

/**
 * 模拟接收新通知
 * @param {string} type - 通知类型
 */
function simulateNewNotification(type = 'system') {
    // 通知类型和对应的消息模板
    const notificationTemplates = {
        team_invite: {
            avatar: '../images/avatars/user3.jpg',
            sender: '李明',
            message: '邀请你加入「AI创新挑战赛」团队',
            actions: [
                { class: 'accept', text: '接受' },
                { class: 'decline', text: '拒绝' }
            ]
        },
        friend_request: {
            avatar: '../images/avatars/user4.jpg',
            sender: '王芳',
            message: '请求添加你为好友',
            actions: [
                { class: 'accept', text: '接受' },
                { class: 'decline', text: '拒绝' }
            ]
        },
        competition: {
            avatar: '../images/logo.png',
            sender: 'teamify',
            message: '新的竞赛「全球创新挑战赛」已发布，点击查看详情',
            actions: [
                { class: 'view', text: '查看' }
            ]
        },
        team_update: {
            avatar: '../images/avatars/user5.jpg',
            sender: '张伟',
            message: '更新了「数据科学竞赛」团队信息',
            actions: [
                { class: 'view', text: '查看' }
            ]
        },
        system: {
            avatar: '../images/logo.png',
            sender: 'teamify',
            message: '你的账户已成功验证，现在可以使用所有功能了',
            actions: [
                { class: 'view', text: '了解更多' }
            ]
        }
    };

    // 获取指定类型的通知模板
    const template = notificationTemplates[type] || notificationTemplates.system;

    // 创建通知对象
    const notification = {
        id: 'notification-' + Date.now(),
        type: type,
        unread: true,
        avatar: template.avatar,
        sender: template.sender,
        message: template.message,
        time: '刚刚',
        actions: template.actions
    };

    // 添加到导航栏通知
    addNavNotification(notification);

    // 显示通知提醒
    showNotification(`新通知: ${template.message}`, 'info');

    // 播放通知声音
    playNotificationSound();
}

/**
 * 播放通知声音
 */
function playNotificationSound() {
    // 创建音频元素
    const audio = new Audio('../sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => {
        // 忽略自动播放限制错误
        console.log('无法播放通知声音:', error);
    });
}

// 导出函数
window.showNotification = showNotification;
window.closeNotification = closeNotification;
window.addNavNotification = addNavNotification;
window.simulateNewNotification = simulateNewNotification;