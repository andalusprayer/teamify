// 寻找队友页面功能 Find Teammates Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态 Check user authentication status
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // 初始化页面功能 Initialize page functionality
    initFindTeammatesPage();
    initSearchFilters();
    initViewOptions();
    loadMockTeammates();
});

// 初始化寻找队友页面 Initialize find teammates page
function initFindTeammatesPage() {
    updateAuthUI();
}

// 初始化搜索筛选器 Initialize search filters
function initSearchFilters() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // 实时搜索 Real-time search
    const searchInputs = document.querySelectorAll('#competitionType, #country, #skills');
    searchInputs.forEach(input => {
        input.addEventListener('change', performSearch);
        if (input.type === 'text') {
            input.addEventListener('input', debounce(performSearch, 500));
        }
    });
}

// 初始化视图选项 Initialize view options
function initViewOptions() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const teammatesGrid = document.getElementById('teammatesGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // 更新按钮状态 Update button states
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新网格视图 Update grid view
            if (teammatesGrid) {
                teammatesGrid.className = `teammates-grid ${view === 'list' ? 'list-view' : ''}`;
            }
        });
    });
}

// 执行搜索 Perform search
function performSearch() {
    const competitionType = document.getElementById('competitionType').value;
    const country = document.getElementById('country').value;
    const skills = document.getElementById('skills').value;
    
    // 显示加载状态 Show loading state
    showLoadingState();
    
    // 模拟搜索延迟 Simulate search delay
    setTimeout(() => {
        const filteredTeammates = filterTeammates(competitionType, country, skills);
        displayTeammates(filteredTeammates);
        hideLoadingState();
    }, 1000);
}

// 筛选队友 Filter teammates
function filterTeammates(competitionType, country, skills) {
    const allTeammates = getMockTeammates();
    let filtered = allTeammates;
    
    // 按竞赛类型筛选 Filter by competition type
    if (competitionType) {
        filtered = filtered.filter(teammate => 
            teammate.interests.includes(competitionType)
        );
    }
    
    // 按国家筛选 Filter by country
    if (country) {
        filtered = filtered.filter(teammate => 
            teammate.country === country
        );
    }
    
    // 按技能筛选 Filter by skills
    if (skills) {
        const skillKeywords = skills.toLowerCase().split(',').map(s => s.trim());
        filtered = filtered.filter(teammate => 
            skillKeywords.some(keyword => 
                teammate.skills.toLowerCase().includes(keyword)
            )
        );
    }
    
    return filtered;
}

// 显示队友 Display teammates
function displayTeammates(teammates) {
    const teammatesGrid = document.getElementById('teammatesGrid');
    if (!teammatesGrid) return;
    
    if (teammates.length === 0) {
        teammatesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>未找到匹配的队友 No Matching Teammates Found</h3>
                <p>请尝试调整搜索条件或稍后再试</p>
            </div>
        `;
        return;
    }
    
    const teammatesHtml = teammates.map(teammate => 
        createTeammateCard(teammate)
    ).join('');
    
    teammatesGrid.innerHTML = teammatesHtml;
    
    // 重新绑定事件 Re-bind events
    bindTeammateCardEvents();
}

// 创建队友卡片 Create teammate card
function createTeammateCard(teammate) {
    const interestsMap = {
        'math-modeling': '数学建模 Math Modeling',
        'business-case': '商业案例 Business Case',
        'hackathon': '编程竞赛 Programming',
        'debate': '辩论赛 Debate',
        'innovation': '科技创新 Innovation',
        'other': '其他 Other'
    };
    
    const countryMap = {
        'china': '中国 China',
        'usa': '美国 United States',
        'uk': '英国 United Kingdom',
        'canada': '加拿大 Canada',
        'australia': '澳大利亚 Australia',
        'germany': '德国 Germany',
        'france': '法国 France',
        'japan': '日本 Japan',
        'korea': '韩国 South Korea',
        'singapore': '新加坡 Singapore',
        'india': '印度 India',
        'other': '其他 Other'
    };
    
    const gradeMap = {
        'freshman': '大一 Freshman',
        'sophomore': '大二 Sophomore',
        'junior': '大三 Junior',
        'senior': '大四 Senior',
        'graduate': '研究生 Graduate',
        'phd': '博士生 PhD',
        'other': '其他 Other'
    };
    
    const interestTags = teammate.interests.map(interest => 
        `<span class="skill-tag">${interestsMap[interest]}</span>`
    ).join('');
    
    const skillTags = teammate.skills.split(',').map(skill => 
        `<span class="skill-tag">${skill.trim()}</span>`
    ).join('');
    
    return `
        <div class="teammate-card" data-teammate-id="${teammate.id}">
            <div class="teammate-header">
                <div class="teammate-avatar">
                    ${teammate.firstName.charAt(0)}${teammate.lastName.charAt(0)}
                </div>
                <div class="teammate-info">
                    <h3>${teammate.firstName} ${teammate.lastName}</h3>
                    <p>${teammate.university} · ${teammate.major}</p>
                </div>
            </div>
            
            <div class="teammate-details">
                <div class="detail-item">
                    <span class="detail-label">年级 Grade:</span>
                    <span class="detail-value">${gradeMap[teammate.grade] || '未选择'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">国家 Country:</span>
                    <span class="detail-value">${countryMap[teammate.country] || '未选择'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">竞赛经验 Experience:</span>
                    <span class="detail-value">${teammate.experience ? '有经验 Has Experience' : '新手 Beginner'}</span>
                </div>
            </div>
            
            <div class="teammate-skills">
                <div class="skills-title">竞赛兴趣 Competition Interests:</div>
                <div class="skills-tags">
                    ${interestTags}
                </div>
            </div>
            
            <div class="teammate-skills">
                <div class="skills-title">技能专长 Skills:</div>
                <div class="skills-tags">
                    ${skillTags}
                </div>
            </div>
            
            <div class="teammate-actions">
                <button class="action-btn btn-view" onclick="viewTeammateDetails(${teammate.id})">
                    <i class="fas fa-eye"></i> 查看详情 View Details
                </button>
                <button class="action-btn btn-invite" onclick="sendTeamInvitation(${teammate.id})">
                    <i class="fas fa-user-plus"></i> 邀请组队 Invite
                </button>
            </div>
        </div>
    `;
}

// 绑定队友卡片事件 Bind teammate card events
function bindTeammateCardEvents() {
    const teammateCards = document.querySelectorAll('.teammate-card');
    teammateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发卡片点击事件
            if (e.target.closest('.teammate-actions')) {
                return;
            }
            
            const teammateId = this.getAttribute('data-teammate-id');
            viewTeammateDetails(parseInt(teammateId));
        });
    });
}

// 查看队友详情 View teammate details
function viewTeammateDetails(teammateId) {
    const teammate = getMockTeammates().find(t => t.id === teammateId);
    if (!teammate) return;
    
    const modal = document.getElementById('teammateModal');
    const modalTitle = document.getElementById('teammateModalTitle');
    const teammateDetails = document.getElementById('teammateDetails');
    
    if (!modal || !modalTitle || !teammateDetails) return;
    
    modalTitle.textContent = `${teammate.firstName} ${teammate.lastName} - 队友详情 Teammate Details`;
    
    const detailsHtml = createTeammateDetailsHtml(teammate);
    teammateDetails.innerHTML = detailsHtml;
    
    // 显示模态框 Show modal
    modal.style.display = 'flex';
    modal.classList.add('show');
}

// 创建队友详情HTML Create teammate details HTML
function createTeammateDetailsHtml(teammate) {
    const interestsMap = {
        'math-modeling': '数学建模 Math Modeling',
        'business-case': '商业案例 Business Case',
        'hackathon': '编程竞赛 Programming',
        'debate': '辩论赛 Debate',
        'innovation': '科技创新 Innovation',
        'other': '其他 Other'
    };
    
    const countryMap = {
        'china': '中国 China',
        'usa': '美国 United States',
        'uk': '英国 United Kingdom',
        'canada': '加拿大 Canada',
        'australia': '澳大利亚 Australia',
        'germany': '德国 Germany',
        'france': '法国 France',
        'japan': '日本 Japan',
        'korea': '韩国 South Korea',
        'singapore': '新加坡 Singapore',
        'india': '印度 India',
        'other': '其他 Other'
    };
    
    const gradeMap = {
        'freshman': '大一 Freshman',
        'sophomore': '大二 Sophomore',
        'junior': '大三 Junior',
        'senior': '大四 Senior',
        'graduate': '研究生 Graduate',
        'phd': '博士生 PhD',
        'other': '其他 Other'
    };
    
    const interestTags = teammate.interests.map(interest => 
        `<span class="info-tag">${interestsMap[interest]}</span>`
    ).join('');
    
    return `
        <div class="teammate-details-modal">
            <div class="detail-section">
                <h4><i class="fas fa-user"></i> 基本信息 Basic Information</h4>
                <div class="detail-row">
                    <span class="detail-label">姓名 Name:</span>
                    <span class="detail-value">${teammate.firstName} ${teammate.lastName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">用户名 Username:</span>
                    <span class="detail-value">${teammate.username}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">邮箱 Email:</span>
                    <span class="detail-value">${teammate.email}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-graduation-cap"></i> 教育背景 Education</h4>
                <div class="detail-row">
                    <span class="detail-label">大学 University:</span>
                    <span class="detail-value">${teammate.university}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">专业 Major:</span>
                    <span class="detail-value">${teammate.major}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">年级 Grade:</span>
                    <span class="detail-value">${gradeMap[teammate.grade] || '未选择'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">国家/地区 Country:</span>
                    <span class="detail-value">${countryMap[teammate.country] || '未选择'}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-tools"></i> 技能与经验 Skills & Experience</h4>
                <div class="detail-row">
                    <span class="detail-label">技能专长 Skills:</span>
                    <span class="detail-value">${teammate.skills}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">竞赛经验 Experience:</span>
                    <span class="detail-value">${teammate.experience || '暂无经验 No experience yet'}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-puzzle-piece"></i> 竞赛兴趣 Competition Interests</h4>
                <div class="detail-interests">
                    ${interestTags}
                </div>
            </div>
        </div>
    `;
}

// 发送团队邀请 Send team invitation
function sendTeamInvitation(teammateId) {
    const teammate = getMockTeammates().find(t => t.id === teammateId);
    if (!teammate) return;
    
    // 显示邀请消息 Show invitation message
    if (typeof showSuccessMessage === 'function') {
        showSuccessMessage(`已向 ${teammate.firstName} ${teammate.lastName} 发送组队邀请！Team invitation sent to ${teammate.firstName} ${teammate.lastName}!`);
    } else {
        alert(`已向 ${teammate.firstName} ${teammate.lastName} 发送组队邀请！`);
    }
    
    // 关闭模态框 Close modal
    closeTeammateModal();
}

// 关闭队友模态框 Close teammate modal
function closeTeammateModal() {
    const modal = document.getElementById('teammateModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// 加载模拟队友数据 Load mock teammates data
function loadMockTeammates() {
    const teammates = getMockTeammates();
    displayTeammates(teammates);
}

// 获取模拟队友数据 Get mock teammates data
function getMockTeammates() {
    return [
        {
            id: 1,
            firstName: '张',
            lastName: '小明',
            username: 'zhangxiaoming',
            email: 'zhang@example.com',
            university: '北京大学',
            major: '计算机科学与技术',
            grade: 'junior',
            country: 'china',
            skills: 'Python, JavaScript, 机器学习, 算法设计',
            experience: '参加过ACM程序设计竞赛，获得省级二等奖',
            interests: ['math-modeling', 'hackathon', 'innovation']
        },
        {
            id: 2,
            firstName: '李',
            lastName: '小红',
            username: 'lixiaohong',
            email: 'li@example.com',
            university: '清华大学',
            major: '数学与应用数学',
            grade: 'senior',
            country: 'china',
            skills: '数学建模, 统计分析, MATLAB, 运筹学',
            experience: '参加过全国大学生数学建模竞赛，获得国家级一等奖',
            interests: ['math-modeling', 'business-case']
        },
        {
            id: 3,
            firstName: '王',
            lastName: '小华',
            username: 'wangxiaohua',
            email: 'wang@example.com',
            university: '复旦大学',
            major: '工商管理',
            grade: 'graduate',
            country: 'china',
            skills: '商业分析, 市场调研, 财务建模, 战略规划',
            experience: '参加过商业案例竞赛，有丰富的团队合作经验',
            interests: ['business-case', 'debate', 'innovation']
        },
        {
            id: 4,
            firstName: 'John',
            lastName: 'Smith',
            username: 'johnsmith',
            email: 'john@example.com',
            university: 'MIT',
            major: 'Computer Science',
            grade: 'senior',
            country: 'usa',
            skills: 'Java, C++, Data Structures, Algorithms',
            experience: 'Participated in Google Code Jam, reached Round 2',
            interests: ['hackathon', 'innovation']
        },
        {
            id: 5,
            firstName: 'Emma',
            lastName: 'Johnson',
            username: 'emmajohnson',
            email: 'emma@example.com',
            university: 'Oxford',
            major: 'Mathematics',
            grade: 'phd',
            country: 'uk',
            skills: 'Mathematical Modeling, Statistics, R, Python',
            experience: 'Published research papers in mathematical modeling',
            interests: ['math-modeling', 'innovation']
        },
        {
            id: 6,
            firstName: '田中',
            lastName: '太郎',
            username: 'tanakataro',
            email: 'tanaka@example.com',
            university: '东京大学',
            major: '经济学',
            grade: 'junior',
            country: 'japan',
            skills: '经济分析, 数据可视化, Excel, SPSS',
            experience: '参加过日本学生经济分析竞赛',
            interests: ['business-case', 'debate']
        }
    ];
}

// 显示加载状态 Show loading state
function showLoadingState() {
    const teammatesGrid = document.getElementById('teammatesGrid');
    if (teammatesGrid) {
        teammatesGrid.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>正在搜索队友... Searching for teammates...</p>
            </div>
        `;
    }
}

// 隐藏加载状态 Hide loading state
function hideLoadingState() {
    // 这个函数名有误，应该是hideLoadingState
    // 但为了保持代码一致性，我们保留这个名称
}

// 防抖函数 Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 全局函数 Global functions
window.closeTeammateModal = closeTeammateModal;
window.viewTeammateDetails = viewTeammateDetails;
window.sendTeamInvitation = sendTeamInvitation;
