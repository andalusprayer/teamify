/**
 * 聊天系统JavaScript功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化聊天系统
    initChatSystem();
    
    // 初始化通知系统
    initNotificationSystem();
});

/**
 * 初始化聊天系统
 */
function initChatSystem() {
    // 聊天侧边栏功能
    initChatSidebar();
    
    // 聊天主区域功能
    initChatMain();
    
    // 聊天信息面板功能
    initChatInfoPanel();
    
    // 新建对话模态框功能
    initNewChatModal();
}

/**
 * 初始化聊天侧边栏功能
 */
function initChatSidebar() {
    // 切换聊天标签页
    const chatTabs = document.querySelectorAll('.chat-tab');
    const chatLists = document.querySelectorAll('.chat-list');
    
    chatTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签页的active类
            chatTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签页添加active类
            this.classList.add('active');
            
            // 获取当前标签页的数据类型
            const type = this.getAttribute('data-type');
            
            // 隐藏所有聊天列表
            chatLists.forEach(list => list.classList.remove('active'));
            
            // 显示对应的聊天列表
            document.querySelector(`.chat-list[data-type="${type}"]`).classList.add('active');
        });
    });
    
    // 聊天项点击事件
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有聊天项的active类
            chatItems.forEach(i => i.classList.remove('active'));
            // 给当前点击的聊天项添加active类
            this.classList.add('active');
            
            // 获取聊天信息
            const chatId = this.getAttribute('data-id');
            const chatName = this.querySelector('.chat-info h4').textContent;
            const chatAvatar = this.querySelector('.chat-avatar img').getAttribute('src');
            const isGroup = this.hasAttribute('data-group');
            
            // 加载聊天内容
            loadChatContent(chatId, chatName, chatAvatar, isGroup);
            
            // 在移动设备上，点击聊天项后隐藏侧边栏，显示聊天主区域
            if (window.innerWidth <= 576) {
                document.querySelector('.chat-sidebar').style.display = 'none';
                document.querySelector('.chat-main').style.display = 'flex';
            }
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.chat-search input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // 获取当前活动的聊天列表
        const activeList = document.querySelector('.chat-list.active');
        const chatItems = activeList.querySelectorAll('.chat-item');
        
        chatItems.forEach(item => {
            const chatName = item.querySelector('.chat-info h4').textContent.toLowerCase();
            const lastMessage = item.querySelector('.chat-info .last-message').textContent.toLowerCase();
            
            if (chatName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // 新建聊天按钮点击事件
    const newChatButton = document.querySelector('.new-chat-button button');
    
    newChatButton.addEventListener('click', function() {
        // 显示新建对话模态框
        document.getElementById('newChatModal').classList.add('active');
    });
}

/**
 * 初始化聊天主区域功能
 */
function initChatMain() {
    // 发送消息功能
    const sendButton = document.getElementById('send-message');
    const messageInput = document.querySelector('.chat-input textarea');
    
    // 发送消息事件
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
    
    // 按下Enter键发送消息
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 自动调整文本区域高度
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // 限制最大高度
        if (this.scrollHeight > 120) {
            this.style.height = '120px';
        }
    });
    
    // 聊天头部操作按钮
    const headerActions = document.querySelectorAll('.chat-header-actions .chat-action');
    
    headerActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.getAttribute('data-action');
            
            switch (actionType) {
                case 'call':
                    // 实现语音通话功能
                    showNotification('语音通话功能即将推出', 'info');
                    break;
                case 'video':
                    // 实现视频通话功能
                    showNotification('视频通话功能即将推出', 'info');
                    break;
                case 'info':
                    // 显示/隐藏聊天信息面板
                    toggleChatInfoPanel();
                    break;
            }
        });
    });
    
    // 聊天输入区域操作按钮
    const inputActions = document.querySelectorAll('.chat-input-actions .chat-input-action');
    
    inputActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.getAttribute('data-action');
            
            switch (actionType) {
                case 'emoji':
                    // 实现表情选择功能
                    showNotification('表情选择功能即将推出', 'info');
                    break;
                case 'attachment':
                    // 实现附件上传功能
                    showNotification('附件上传功能即将推出', 'info');
                    break;
                case 'image':
                    // 实现图片上传功能
                    showNotification('图片上传功能即将推出', 'info');
                    break;
            }
        });
    });
}

/**
 * 初始化聊天信息面板功能
 */
function initChatInfoPanel() {
    // 关闭信息面板按钮
    const closeInfoPanelButton = document.querySelector('.close-info-panel');
    
    closeInfoPanelButton.addEventListener('click', function() {
        toggleChatInfoPanel();
    });
    
    // 个人资料操作按钮
    const profileActions = document.querySelectorAll('.profile-action');
    
    profileActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.getAttribute('data-action');
            
            switch (actionType) {
                case 'view-profile':
                    // 查看完整个人资料
                    window.location.href = 'profile.html';
                    break;
                case 'mute':
                    // 静音通知
                    this.classList.toggle('active');
                    const isMuted = this.classList.contains('active');
                    this.innerHTML = `<i class="fas ${isMuted ? 'fa-bell-slash' : 'fa-bell'}"></i> ${isMuted ? '取消静音' : '静音通知'}`;
                    showNotification(`已${isMuted ? '静音' : '取消静音'}该聊天的通知`, 'success');
                    break;
                case 'block':
                    // 屏蔽用户
                    if (confirm('确定要屏蔽该用户吗？')) {
                        showNotification('已屏蔽该用户', 'success');
                    }
                    break;
                case 'report':
                    // 举报用户
                    if (confirm('确定要举报该用户吗？')) {
                        showNotification('举报已提交，我们会尽快处理', 'success');
                    }
                    break;
            }
        });
    });
    
    // 媒体标签页切换
    const mediaTabs = document.querySelectorAll('.media-tab');
    const mediaContents = document.querySelectorAll('.media-content');
    
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签页的active类
            mediaTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签页添加active类
            this.classList.add('active');
            
            // 获取当前标签页的数据类型
            const type = this.getAttribute('data-type');
            
            // 隐藏所有媒体内容
            mediaContents.forEach(content => content.classList.remove('active'));
            
            // 显示对应的媒体内容
            document.querySelector(`.media-content[data-type="${type}"]`).classList.add('active');
        });
    });
}

/**
 * 初始化新建对话模态框功能
 */
function initNewChatModal() {
    // 关闭模态框按钮
    const closeModalButton = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancel-button');
    
    closeModalButton.addEventListener('click', function() {
        document.getElementById('newChatModal').classList.remove('active');
    });
    
    cancelButton.addEventListener('click', function() {
        document.getElementById('newChatModal').classList.remove('active');
    });
    
    // 模态框标签页切换
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签页的active类
            modalTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签页添加active类
            this.classList.add('active');
            
            // 获取当前标签页的数据类型
            const type = this.getAttribute('data-type');
            
            // 隐藏所有标签页内容
            modalTabContents.forEach(content => content.classList.remove('active'));
            
            // 显示对应的标签页内容
            document.querySelector(`.modal-tab-content[data-type="${type}"]`).classList.add('active');
        });
    });
    
    // 搜索联系人功能
    const searchContactsInput = document.querySelector('.search-contacts input');
    
    searchContactsInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            const contactName = item.querySelector('h4').textContent.toLowerCase();
            
            if (contactName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // 选择联系人功能
    const contactCheckboxes = document.querySelectorAll('.contact-checkbox input');
    const selectedAvatars = document.querySelector('.selected-avatars');
    const createChatButton = document.querySelector('.create-chat-button');
    
    contactCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const contactItem = this.closest('.contact-item');
            const contactId = contactItem.getAttribute('data-id');
            const contactName = contactItem.querySelector('h4').textContent;
            const contactAvatar = contactItem.querySelector('img').getAttribute('src');
            
            if (this.checked) {
                // 如果是单聊模式，取消选中其他联系人
                if (this.type === 'radio') {
                    selectedAvatars.innerHTML = '';
                }
                
                // 添加到已选联系人
                const selectedAvatar = document.createElement('div');
                selectedAvatar.className = 'selected-avatar';
                selectedAvatar.setAttribute('data-id', contactId);
                selectedAvatar.innerHTML = `
                    <img src="${contactAvatar}" alt="${contactName}">
                    <span class="remove-selected"><i class="fas fa-times"></i></span>
                `;
                
                selectedAvatars.appendChild(selectedAvatar);
                
                // 添加移除已选联系人的事件
                selectedAvatar.querySelector('.remove-selected').addEventListener('click', function() {
                    selectedAvatar.remove();
                    checkbox.checked = false;
                    updateCreateButtonState();
                });
            } else {
                // 从已选联系人中移除
                const existingAvatar = selectedAvatars.querySelector(`.selected-avatar[data-id="${contactId}"]`);
                if (existingAvatar) {
                    existingAvatar.remove();
                }
            }
            
            updateCreateButtonState();
        });
    });
    
    // 创建聊天按钮点击事件
    createChatButton.addEventListener('click', function() {
        const selectedContacts = document.querySelectorAll('.selected-avatar');
        const activeTab = document.querySelector('.modal-tab.active').getAttribute('data-type');
        
        if (selectedContacts.length === 0) {
            showNotification('请选择至少一个联系人', 'error');
            return;
        }
        
        if (activeTab === 'group') {
            const groupNameInput = document.querySelector('.group-name-input input');
            const groupName = groupNameInput.value.trim();
            
            if (groupName === '') {
                showNotification('请输入群组名称', 'error');
                return;
            }
            
            // 创建群聊
            createGroupChat(groupName, selectedContacts);
        } else {
            // 创建单聊
            createPrivateChat(selectedContacts[0]);
        }
        
        // 关闭模态框
        document.getElementById('newChatModal').classList.remove('active');
    });
    
    // 更新创建按钮状态
    function updateCreateButtonState() {
        const selectedContacts = document.querySelectorAll('.selected-avatar');
        const activeTab = document.querySelector('.modal-tab.active').getAttribute('data-type');
        
        if (selectedContacts.length > 0) {
            if (activeTab === 'group') {
                createChatButton.textContent = `创建群聊 (${selectedContacts.length})`;
            } else {
                createChatButton.textContent = '开始聊天';
            }
            createChatButton.disabled = false;
        } else {
            createChatButton.textContent = activeTab === 'group' ? '创建群聊' : '开始聊天';
            createChatButton.disabled = true;
        }
    }
}

/**
 * 初始化通知系统
 */
function initNotificationSystem() {
    // 通知图标点击事件
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    notificationIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // 点击其他区域关闭通知下拉菜单
    document.addEventListener('click', function() {
        notificationDropdown.style.display = 'none';
    });
    
    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 标记所有通知为已读
    const markAllReadButton = document.querySelector('.mark-all-read');
    
    markAllReadButton.addEventListener('click', function() {
        const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
        
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        // 更新通知徽章
        updateNotificationBadge();
        
        showNotification('已将所有通知标记为已读', 'success');
    });
    
    // 通知操作按钮
    const notificationActions = document.querySelectorAll('.notification-actions button');
    
    notificationActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.classList.contains('accept') ? 'accept' : 
                              this.classList.contains('decline') ? 'decline' : 'view';
            const notification = this.closest('li');
            const notificationType = notification.getAttribute('data-type');
            
            switch (actionType) {
                case 'accept':
                    if (notificationType === 'team_invite') {
                        showNotification('已接受团队邀请', 'success');
                    } else if (notificationType === 'friend_request') {
                        showNotification('已接受好友请求', 'success');
                    }
                    notification.remove();
                    break;
                case 'decline':
                    if (notificationType === 'team_invite') {
                        showNotification('已拒绝团队邀请', 'info');
                    } else if (notificationType === 'friend_request') {
                        showNotification('已拒绝好友请求', 'info');
                    }
                    notification.remove();
                    break;
                case 'view':
                    if (notificationType === 'competition') {
                        window.location.href = 'competitions.html';
                    } else if (notificationType === 'team_update') {
                        window.location.href = 'find-teammates.html';
                    } else if (notificationType === 'system') {
                        showNotification('查看系统通知', 'info');
                    }
                    break;
            }
            
            // 更新通知徽章
            updateNotificationBadge();
        });
    });
    
    // 更新通知徽章
    updateNotificationBadge();
}

/**
 * 加载聊天内容
 * @param {string} chatId - 聊天ID
 * @param {string} chatName - 聊天名称
 * @param {string} chatAvatar - 聊天头像
 * @param {boolean} isGroup - 是否为群聊
 */
function loadChatContent(chatId, chatName, chatAvatar, isGroup) {
    // 更新聊天头部信息
    const chatHeader = document.querySelector('.chat-header-info');
    chatHeader.innerHTML = `
        <div class="chat-avatar">
            <img src="${chatAvatar}" alt="${chatName}">
        </div>
        <div class="chat-user-info">
            <h3>${chatName}</h3>
            <p>${isGroup ? '群聊 · 在线成员 3/5' : '在线 · 最后活跃于 10 分钟前'}</p>
        </div>
    `;
    
    // 清空聊天消息区域
    const chatMessages = document.querySelector('.chat-messages');
    
    // 模拟加载聊天记录
    // 这里应该是从服务器获取聊天记录的代码
    // 为了演示，我们使用模拟数据
    
    // 清空现有消息
    chatMessages.innerHTML = '';
    
    // 添加日期分隔线
    const dateDivider = document.createElement('div');
    dateDivider.className = 'chat-date-divider';
    dateDivider.innerHTML = '<span>今天</span>';
    chatMessages.appendChild(dateDivider);
    
    // 模拟消息数据
    const messages = [
        {
            id: 1,
            sender: {
                id: 'user2',
                name: chatName,
                avatar: chatAvatar
            },
            content: '你好！我看到你也对科技创新竞赛感兴趣。',
            time: '09:30',
            type: 'text',
            status: 'read',
            isSent: false
        },
        {
            id: 2,
            sender: {
                id: 'user1',
                name: '我',
                avatar: '../images/avatars/user1.jpg'
            },
            content: '是的，我正在寻找队友参加下个月的AI创新挑战赛。',
            time: '09:32',
            type: 'text',
            status: 'read',
            isSent: true
        },
        {
            id: 3,
            sender: {
                id: 'user2',
                name: chatName,
                avatar: chatAvatar
            },
            content: '太巧了！我也想参加那个比赛。你有什么特长或者技能吗？',
            time: '09:35',
            type: 'text',
            status: 'read',
            isSent: false
        },
        {
            id: 4,
            sender: {
                id: 'user1',
                name: '我',
                avatar: '../images/avatars/user1.jpg'
            },
            content: '我主要负责算法开发和模型训练，有一些NLP和计算机视觉的项目经验。你呢？',
            time: '09:40',
            type: 'text',
            status: 'read',
            isSent: true
        },
        {
            id: 5,
            sender: {
                id: 'user2',
                name: chatName,
                avatar: chatAvatar
            },
            content: '我擅长前端开发和UI设计，之前参加过几次黑客马拉松。我觉得我们的技能很互补！',
            time: '09:42',
            type: 'text',
            status: 'read',
            isSent: false
        },
        {
            id: 6,
            sender: {
                id: 'user2',
                name: chatName,
                avatar: chatAvatar
            },
            content: '这是我之前做的一个项目的演示文档，你可以看看。',
            time: '09:45',
            type: 'file',
            fileInfo: {
                name: 'AI_Project_Demo.pdf',
                size: '2.4 MB',
                type: 'pdf'
            },
            status: 'read',
            isSent: false
        },
        {
            id: 7,
            sender: {
                id: 'user1',
                name: '我',
                avatar: '../images/avatars/user1.jpg'
            },
            content: '看起来很不错！我们可以组队参加比赛。你有其他队友吗？',
            time: '09:50',
            type: 'text',
            status: 'delivered',
            isSent: true
        }
    ];
    
    // 渲染消息
    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
    });
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 更新聊天信息面板
    updateChatInfoPanel(chatId, chatName, chatAvatar, isGroup);
}

/**
 * 创建消息元素
 * @param {Object} message - 消息对象
 * @returns {HTMLElement} - 消息元素
 */
function createMessageElement(message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.isSent ? 'sent' : 'received'}`;
    messageElement.setAttribute('data-id', message.id);
    
    let messageContent = '';
    
    if (message.type === 'text') {
        messageContent = `<p>${message.content}</p>`;
    } else if (message.type === 'file') {
        messageContent = `
            <div class="file-attachment">
                <i class="fas fa-file-pdf"></i>
                <div class="file-info">
                    <span class="file-name">${message.fileInfo.name}</span>
                    <span class="file-size">${message.fileInfo.size}</span>
                </div>
                <button class="file-download"><i class="fas fa-download"></i></button>
            </div>
        `;
    }
    
    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="${message.sender.avatar}" alt="${message.sender.name}">
        </div>
        <div class="message-content">
            <div class="message-info">
                <span class="message-sender">${message.isSent ? '' : message.sender.name}</span>
                <span class="message-time">${message.time}</span>
                ${message.isSent ? `<span class="message-status"><i class="fas ${message.status === 'read' ? 'fa-check-double' : 'fa-check'}"></i></span>` : ''}
            </div>
            <div class="message-bubble ${message.type === 'file' ? 'file-message' : ''}">
                ${messageContent}
            </div>
        </div>
    `;
    
    return messageElement;
}

/**
 * 发送消息
 */
function sendMessage() {
    const messageInput = document.querySelector('.chat-input textarea');
    const content = messageInput.value.trim();
    
    if (content === '') {
        return;
    }
    
    // 获取当前聊天信息
    const chatName = document.querySelector('.chat-user-info h3').textContent;
    
    // 创建新消息对象
    const newMessage = {
        id: Date.now(),
        sender: {
            id: 'user1',
            name: '我',
            avatar: '../images/avatars/user1.jpg'
        },
        content: content,
        time: getCurrentTime(),
        type: 'text',
        status: 'sent',
        isSent: true
    };
    
    // 创建消息元素
    const messageElement = createMessageElement(newMessage);
    
    // 添加到聊天消息区域
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.appendChild(messageElement);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 清空输入框
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // 模拟消息发送状态变化
    setTimeout(() => {
        const messageSentStatus = messageElement.querySelector('.message-status i');
        messageSentStatus.className = 'fas fa-check';
        newMessage.status = 'delivered';
    }, 1000);
    
    // 模拟对方已读
    setTimeout(() => {
        const messageSentStatus = messageElement.querySelector('.message-status i');
        messageSentStatus.className = 'fas fa-check-double';
        newMessage.status = 'read';
    }, 2000);
    
    // 模拟对方回复
    if (Math.random() > 0.3) { // 70%的概率会收到回复
        setTimeout(() => {
            // 显示对方正在输入
            showTypingIndicator(chatName);
            
            // 随机回复时间，1-3秒
            const replyTime = 1000 + Math.random() * 2000;
            
            setTimeout(() => {
                // 隐藏对方正在输入
                hideTypingIndicator();
                
                // 随机回复内容
                const replies = [
                    '好的，我明白了。',
                    '这个想法很不错！',
                    '我们可以进一步讨论这个问题。',
                    '你说得对，我同意你的观点。',
                    '这个方案可行，我们可以试试。',
                    '我需要再考虑一下这个问题。',
                    '你能详细解释一下吗？',
                    '我们什么时候开始？',
                    '我已经准备好了，随时可以开始。',
                    '这个周末你有空吗？我们可以讨论一下项目细节。'
                ];
                
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                
                // 创建回复消息对象
                const replyMessage = {
                    id: Date.now(),
                    sender: {
                        id: 'user2',
                        name: chatName,
                        avatar: document.querySelector('.chat-header-info .chat-avatar img').getAttribute('src')
                    },
                    content: randomReply,
                    time: getCurrentTime(),
                    type: 'text',
                    status: 'read',
                    isSent: false
                };
                
                // 创建回复消息元素
                const replyElement = createMessageElement(replyMessage);
                
                // 添加到聊天消息区域
                chatMessages.appendChild(replyElement);
                
                // 滚动到底部
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // 更新最后一条消息
                updateLastMessage(chatName, randomReply);
            }, replyTime);
        }, 500);
    }
    
    // 更新最后一条消息
    updateLastMessage(chatName, content, true);
}

/**
 * 显示对方正在输入
 * @param {string} name - 对方名称
 */
function showTypingIndicator(name) {
    const chatMessages = document.querySelector('.chat-messages');
    
    // 检查是否已存在输入指示器
    if (document.querySelector('.typing-indicator')) {
        return;
    }
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">
            <img src="${document.querySelector('.chat-header-info .chat-avatar img').getAttribute('src')}" alt="${name}">
        </div>
        <div class="message-bubble">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingIndicator);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 隐藏对方正在输入
 */
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * 更新最后一条消息
 * @param {string} chatName - 聊天名称
 * @param {string} content - 消息内容
 * @param {boolean} isSent - 是否为发送的消息
 */
function updateLastMessage(chatName, content, isSent = false) {
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
        const itemName = item.querySelector('.chat-info h4').textContent;
        
        if (itemName === chatName) {
            const lastMessage = item.querySelector('.last-message');
            const chatTime = item.querySelector('.chat-time');
            
            lastMessage.textContent = isSent ? `你: ${content}` : content;
            chatTime.textContent = getCurrentTime();
            
            // 将该聊天项移到列表顶部
            const parent = item.parentNode;
            parent.insertBefore(item, parent.firstChild);
            
            // 如果不是当前用户发送的消息，则标记为未读
            if (!isSent) {
                item.classList.add('unread');
                
                // 添加或更新未读计数
                let unreadCount = item.querySelector('.unread-count');
                
                if (!unreadCount) {
                    unreadCount = document.createElement('div');
                    unreadCount.className = 'unread-count';
                    item.querySelector('.chat-info').appendChild(unreadCount);
                }
                
                const currentCount = parseInt(unreadCount.textContent) || 0;
                unreadCount.textContent = currentCount + 1;
            }
        }
    });
}

/**
 * 更新聊天信息面板
 * @param {string} chatId - 聊天ID
 * @param {string} chatName - 聊天名称
 * @param {string} chatAvatar - 聊天头像
 * @param {boolean} isGroup - 是否为群聊
 */
function updateChatInfoPanel(chatId, chatName, chatAvatar, isGroup) {
    const userProfileInfo = document.querySelector('.user-profile-info');
    
    userProfileInfo.innerHTML = `
        <div class="profile-avatar">
            <img src="${chatAvatar}" alt="${chatName}">
        </div>
        <h3 class="profile-name">${chatName}</h3>
        <p class="profile-status">${isGroup ? '5 位成员' : '在线'}</p>
        <div class="profile-actions">
            <button class="profile-action" data-action="view-profile"><i class="fas fa-user"></i> 查看个人资料</button>
            <button class="profile-action" data-action="mute"><i class="fas fa-bell"></i> 静音通知</button>
            <button class="profile-action" data-action="block"><i class="fas fa-ban"></i> 屏蔽用户</button>
            <button class="profile-action" data-action="report"><i class="fas fa-flag"></i> 举报</button>
        </div>
    `;
    
    // 重新绑定个人资料操作按钮事件
    initChatInfoPanel();
}

/**
 * 切换聊天信息面板显示状态
 */
function toggleChatInfoPanel() {
    const chatInfoPanel = document.querySelector('.chat-info-panel');
    
    if (window.innerWidth <= 992) {
        // 在小屏幕上，使用滑动效果
        if (chatInfoPanel.style.display === 'none' || chatInfoPanel.style.display === '') {
            chatInfoPanel.style.display = 'flex';
            chatInfoPanel.style.position = 'absolute';
            chatInfoPanel.style.right = '0';
            chatInfoPanel.style.top = '0';
            chatInfoPanel.style.height = '100%';
            chatInfoPanel.style.zIndex = '10';
        } else {
            chatInfoPanel.style.display = 'none';
        }
    } else {
        // 在大屏幕上，直接切换显示/隐藏
        chatInfoPanel.style.display = chatInfoPanel.style.display === 'none' ? 'flex' : 'none';
    }
}

/**
 * 创建私聊
 * @param {HTMLElement} contact - 联系人元素
 */
function createPrivateChat(contact) {
    const contactId = contact.getAttribute('data-id');
    const contactAvatar = contact.querySelector('img').getAttribute('src');
    const contactName = contact.querySelector('img').getAttribute('alt');
    
    // 检查是否已存在该聊天
    const existingChat = document.querySelector(`.chat-item[data-id="${contactId}"]`);
    
    if (existingChat) {
        // 如果已存在，则点击该聊天项
        existingChat.click();
        return;
    }
    
    // 创建新的聊天项
    const newChatItem = document.createElement('div');
    newChatItem.className = 'chat-item active';
    newChatItem.setAttribute('data-id', contactId);
    
    newChatItem.innerHTML = `
        <div class="chat-avatar">
            <img src="${contactAvatar}" alt="${contactName}">
            <span class="status-indicator online"></span>
        </div>
        <div class="chat-info">
            <h4>${contactName}</h4>
            <p class="last-message">点击开始聊天</p>
        </div>
        <div class="chat-time">刚刚</div>
    `;
    
    // 添加到私聊列表顶部
    const privateList = document.querySelector('.chat-list[data-type="private"]');
    privateList.insertBefore(newChatItem, privateList.firstChild);
    
    // 绑定点击事件
    newChatItem.addEventListener('click', function() {
        // 移除所有聊天项的active类
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        // 给当前点击的聊天项添加active类
        this.classList.add('active');
        
        // 加载聊天内容
        loadChatContent(contactId, contactName, contactAvatar, false);
        
        // 在移动设备上，点击聊天项后隐藏侧边栏，显示聊天主区域
        if (window.innerWidth <= 576) {
            document.querySelector('.chat-sidebar').style.display = 'none';
            document.querySelector('.chat-main').style.display = 'flex';
        }
    });
    
    // 模拟点击新创建的聊天项
    newChatItem.click();
    
    // 切换到私聊标签页
    document.querySelector('.chat-tab[data-type="private"]').click();
    
    showNotification(`已创建与 ${contactName} 的聊天`, 'success');
}

/**
 * 创建群聊
 * @param {string} groupName - 群组名称
 * @param {NodeList} members - 群组成员
 */
function createGroupChat(groupName, members) {
    // 生成唯一ID
    const groupId = 'group_' + Date.now();
    
    // 创建新的聊天项
    const newChatItem = document.createElement('div');
    newChatItem.className = 'chat-item active';
    newChatItem.setAttribute('data-id', groupId);
    newChatItem.setAttribute('data-group', 'true');
    
    // 创建群组头像
    let groupAvatarHTML = '';
    
    if (members.length <= 3) {
        groupAvatarHTML = `
            <div class="group-avatar">
                <div class="group-avatar-container">
                    ${Array.from(members).slice(0, 3).map(member => `
                        <img src="${member.querySelector('img').getAttribute('src')}" alt="${member.querySelector('img').getAttribute('alt')}">
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        groupAvatarHTML = `
            <div class="chat-avatar">
                <img src="../images/group-avatar.png" alt="${groupName}">
            </div>
        `;
    }
    
    newChatItem.innerHTML = `
        ${groupAvatarHTML}
        <div class="chat-info">
            <h4>${groupName}</h4>
            <p class="last-message">群组已创建</p>
        </div>
        <div class="chat-time">刚刚</div>
    `;
    
    // 添加到群聊列表顶部
    const groupList = document.querySelector('.chat-list[data-type="group"]');
    groupList.insertBefore(newChatItem, groupList.firstChild);
    
    // 绑定点击事件
    newChatItem.addEventListener('click', function() {
        // 移除所有聊天项的active类
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        // 给当前点击的聊天项添加active类
        this.classList.add('active');
        
        // 加载聊天内容
        loadChatContent(groupId, groupName, '../images/group-avatar.png', true);
        
        // 在移动设备上，点击聊天项后隐藏侧边栏，显示聊天主区域
        if (window.innerWidth <= 576) {
            document.querySelector('.chat-sidebar').style.display = 'none';
            document.querySelector('.chat-main').style.display = 'flex';
        }
    });
    
    // 模拟点击新创建的聊天项
    newChatItem.click();
    
    // 切换到群聊标签页
    document.querySelector('.chat-tab[data-type="group"]').click();
    
    showNotification(`已创建群聊 ${groupName}`, 'success');
}

/**
 * 更新通知徽章
 */
function updateNotificationBadge() {
    const unreadNotifications = document.querySelectorAll('.notification-list li.unread');
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (unreadNotifications.length > 0) {
        notificationBadge.textContent = unreadNotifications.length;
        notificationBadge.style.display = 'flex';
    } else {
        notificationBadge.style.display = 'none';
    }
}

/**
 * 获取当前时间
 * @returns {string} - 格式化的当前时间（HH:MM）
 */
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * 显示通知消息
 * @param {string} message - 通知消息内容
 * @param {string} type - 通知类型（success, error, info, warning）
 */
function showNotification(message, type = 'info') {
    // 检查是否已存在通知容器
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            }
            
            .notification {
                padding: 12px 20px;
                margin-bottom: 10px;
                border-radius: 8px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards;
                cursor: pointer;
            }
            
            .notification-success {
                background-color: #d4edda;
                color: #155724;
                border-left: 4px solid #28a745;
            }
            
            .notification-error {
                background-color: #f8d7da;
                color: #721c24;
                border-left: 4px solid #dc3545;
            }
            
            .notification-info {
                background-color: #d1ecf1;
                color: #0c5460;
                border-left: 4px solid #17a2b8;
            }
            
            .notification-warning {
                background-color: #fff3cd;
                color: #856404;
                border-left: 4px solid #ffc107;
            }
            
            .notification-content {
                flex: 1;
                margin-right: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 16px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;
    
    // 添加到通知容器
    notificationContainer.appendChild(notification);
    
    // 点击关闭通知
    notification.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // 点击关闭按钮
    notification.querySelector('.notification-close').addEventListener('click', function(e) {
        e.stopPropagation();
        closeNotification(notification);
    });
    
    // 自动关闭通知
    setTimeout(() => {
        closeNotification(notification);
    }, 3000);
}

/**
 * 关闭通知
 * @param {HTMLElement} notification - 通知元素
 */
function closeNotification(notification) {
    // 如果通知已经被移除，则不执行任何操作
    if (!notification.parentElement) {
        return;
    }
    
    // 添加淡出动画
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // 动画结束后移除通知
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}