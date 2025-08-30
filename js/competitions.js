/**
 * 竞赛页面JavaScript功能
 * Competition Page JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化日历 Initialize Calendar
    initCalendar();
    
    // 初始化分页功能 Initialize Pagination
    initPagination();
});

/**
 * 初始化日历功能
 * Initialize Calendar Functionality
 */
function initCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const eventList = document.getElementById('eventList');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // 竞赛事件数据 Competition Event Data
    const events = [
        {
            id: 'mcm',
            name: '国际大学生数学建模竞赛 (MCM/ICM)',
            nameEn: 'Mathematical Contest in Modeling (MCM/ICM)',
            date: new Date(2024, 1, 8), // 2024年2月8日
            type: '数学建模 Math Modeling',
            description: '报名截止日期 Registration Deadline',
            url: 'competition-details.html?id=mcm'
        },
        {
            id: 'hgcc',
            name: '哈佛全球商业案例竞赛',
            nameEn: 'Harvard Global Case Competition',
            date: new Date(2023, 11, 15), // 2023年12月15日
            type: '商业案例 Business Case',
            description: '第一轮提交截止 First Round Submission Deadline',
            url: 'competition-details.html?id=hgcc'
        },
        {
            id: 'gsih',
            name: '全球大学生创新黑客马拉松',
            nameEn: 'Global Student Innovation Hackathon',
            date: new Date(2023, 11, 20), // 2023年12月20日
            type: '编程大赛 Coding',
            description: '早鸟报名截止 Early Bird Registration Deadline',
            url: 'competition-details.html?id=gsih'
        },
        {
            id: 'wudc',
            name: '世界大学生辩论锦标赛',
            nameEn: 'World Universities Debating Championship',
            date: new Date(2023, 11, 25), // 2023年12月25日
            type: '辩论赛 Debate',
            description: '国际队伍报名开始 International Team Registration Opens',
            url: 'competition-details.html?id=wudc'
        },
        {
            id: 'icstic',
            name: '国际大学生科技创新大赛',
            nameEn: 'International Collegiate Science & Technology Innovation Contest',
            date: new Date(2024, 0, 10), // 2024年1月10日
            type: '科技创新 Tech Innovation',
            description: '项目提案截止 Project Proposal Deadline',
            url: 'competition-details.html?id=icstic'
        }
    ];
    
    // 渲染日历 Render Calendar
    function renderCalendar() {
        // 更新当前月份显示 Update current month display
        const monthNames = ['一月 January', '二月 February', '三月 March', '四月 April', '五月 May', '六月 June', 
                           '七月 July', '八月 August', '九月 September', '十月 October', '十一月 November', '十二月 December'];
        currentMonthElement.textContent = `${currentYear}年${monthNames[currentMonth]}`;
        
        // 清空日历和事件列表 Clear calendar and event list
        calendarDays.innerHTML = '';
        eventList.innerHTML = '';
        
        // 获取当月第一天和最后一天 Get first and last day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // 获取当月第一天是星期几 Get day of week of first day (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = firstDay.getDay();
        
        // 获取上个月的最后几天 Get last few days of previous month
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        // 添加上个月的日期 Add days from previous month
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'other-month');
            dayElement.textContent = prevMonthLastDay - i;
            calendarDays.appendChild(dayElement);
        }
        
        // 添加当月的日期 Add days of current month
        const today = new Date();
        const currentMonthEvents = events.filter(event => 
            event.date.getMonth() === currentMonth && 
            event.date.getFullYear() === currentYear
        );
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = i;
            
            // 检查是否是今天 Check if it's today
            if (currentYear === today.getFullYear() && 
                currentMonth === today.getMonth() && 
                i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // 检查这一天是否有事件 Check if there are events on this day
            const dayEvents = currentMonthEvents.filter(event => event.date.getDate() === i);
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-event');
                
                // 添加点击事件 Add click event
                dayElement.addEventListener('click', () => {
                    // 显示该日期的事件 Show events for this date
                    showEventsForDate(i, dayEvents);
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // 添加下个月的日期 Add days from next month
        const totalDaysAdded = firstDayOfWeek + lastDay.getDate();
        const remainingCells = 7 - (totalDaysAdded % 7);
        if (remainingCells < 7) {
            for (let i = 1; i <= remainingCells; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day', 'other-month');
                dayElement.textContent = i;
                calendarDays.appendChild(dayElement);
            }
        }
        
        // 显示当月的所有事件 Show all events for the current month
        showMonthEvents(currentMonthEvents);
    }
    
    // 显示特定日期的事件 Show events for a specific date
    function showEventsForDate(day, dayEvents) {
        eventList.innerHTML = '';
        
        if (dayEvents.length === 0) {
            const noEventElement = document.createElement('p');
            noEventElement.textContent = '这一天没有竞赛事件 No competition events on this day';
            eventList.appendChild(noEventElement);
            return;
        }
        
        dayEvents.forEach(event => {
            createEventElement(event);
        });
    }
    
    // 显示当月的所有事件 Show all events for the current month
    function showMonthEvents(monthEvents) {
        eventList.innerHTML = '';
        
        if (monthEvents.length === 0) {
            const noEventElement = document.createElement('p');
            noEventElement.textContent = '本月没有竞赛事件 No competition events this month';
            eventList.appendChild(noEventElement);
            return;
        }
        
        // 按日期排序 Sort by date
        monthEvents.sort((a, b) => a.date - b.date);
        
        monthEvents.forEach(event => {
            createEventElement(event);
        });
    }
    
    // 创建事件元素 Create event element
    function createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-item');
        
        const eventDate = document.createElement('div');
        eventDate.classList.add('event-date');
        
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = event.date.getDate();
        
        const monthElement = document.createElement('div');
        monthElement.classList.add('month');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        monthElement.textContent = monthNames[event.date.getMonth()];
        
        eventDate.appendChild(dayElement);
        eventDate.appendChild(monthElement);
        
        const eventDetails = document.createElement('div');
        eventDetails.classList.add('event-details');
        
        const eventTitle = document.createElement('h4');
        eventTitle.textContent = event.name;
        
        const eventTitleEn = document.createElement('h4');
        eventTitleEn.classList.add('en');
        eventTitleEn.textContent = event.nameEn;
        
        const eventDescription = document.createElement('p');
        eventDescription.textContent = event.description;
        
        const eventType = document.createElement('span');
        eventType.classList.add('event-type');
        eventType.textContent = event.type;
        
        eventDetails.appendChild(eventTitle);
        eventDetails.appendChild(eventTitleEn);
        eventDetails.appendChild(eventDescription);
        eventDetails.appendChild(eventType);
        
        eventElement.appendChild(eventDate);
        eventElement.appendChild(eventDetails);
        
        // 添加点击事件跳转到竞赛详情页 Add click event to navigate to competition details
        eventElement.addEventListener('click', () => {
            window.location.href = event.url;
        });
        
        eventList.appendChild(eventElement);
    }
    
    // 上个月按钮点击事件 Previous month button click event
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    // 下个月按钮点击事件 Next month button click event
    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // 初始渲染日历 Initial calendar render
    renderCalendar();
}

/**
 * 初始化竞赛筛选功能
 * Initialize Competition Filtering
 */
function initCompetitionFilters() {
    const searchInput = document.querySelector('.search-box input');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const sortBySelect = document.getElementById('sortBy');
    const competitionCards = document.querySelectorAll('.competition-card');
    
    // 搜索功能 Search functionality
    searchInput.addEventListener('input', filterCompetitions);
    
    // 类别筛选 Category filter
    categoryFilter.addEventListener('change', filterCompetitions);
    
    // 状态筛选 Status filter
    statusFilter.addEventListener('change', filterCompetitions);
    
    // 排序功能 Sort functionality
    sortBySelect.addEventListener('change', filterCompetitions);
    
    // 筛选竞赛 Filter competitions
    function filterCompetitions() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const status = statusFilter.value;
        const sortBy = sortBySelect.value;
        
        // 筛选和排序竞赛卡片 Filter and sort competition cards
        const filteredCards = Array.from(competitionCards).filter(card => {
            // 搜索词筛选 Search term filtering
            const cardContent = card.textContent.toLowerCase();
            const matchesSearch = cardContent.includes(searchTerm);
            
            // 类别筛选 Category filtering
            const matchesCategory = category === 'all' || card.id.includes(category);
            
            // 状态筛选 Status filtering
            const statusElement = card.querySelector('.competition-status');
            const cardStatus = statusElement ? statusElement.classList[1] : '';
            const matchesStatus = status === 'all' || cardStatus === status;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        // 排序竞赛卡片 Sort competition cards
        filteredCards.sort((a, b) => {
            if (sortBy === 'date') {
                // 按日期排序 Sort by date
                const dateA = a.querySelector('.info-item:first-child span').textContent;
                const dateB = b.querySelector('.info-item:first-child span').textContent;
                return dateA.localeCompare(dateB);
            } else if (sortBy === 'name') {
                // 按名称排序 Sort by name
                const nameA = a.querySelector('h3').textContent;
                const nameB = b.querySelector('h3').textContent;
                return nameA.localeCompare(nameB);
            } else {
                // 默认按热度排序（这里简单实现，实际可能需要后端数据） Default sort by popularity
                return 0;
            }
        });
        
        // 隐藏所有卡片 Hide all cards
        competitionCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // 显示筛选后的卡片 Show filtered cards
        filteredCards.forEach(card => {
            card.style.display = '';
        });
        
        // 更新结果数量 Update result count
        updateResultCount(filteredCards.length);
    }
    
    // 更新结果数量 Update result count
    function updateResultCount(count) {
        const competitionsListTitle = document.querySelector('.competitions-list h2');
        if (count === competitionCards.length) {
            competitionsListTitle.textContent = '热门竞赛 Popular Competitions';
        } else {
            competitionsListTitle.textContent = `找到 ${count} 个竞赛 ${count} Competitions Found`;
        }
    }
}

/**
 * 初始化分页功能
 * Initialize Pagination
 */
function initPagination() {
    console.log('开始初始化分页功能...');
    
    // 显示指定页面的竞赛卡片
    function showPage(pageNumber) {
        console.log('显示第' + pageNumber + '页');
        // 隐藏所有页面
        const allPages = document.querySelectorAll('.competition-cards.page-1, .competition-cards.page-2, .competition-cards.page-3');
        console.log('找到页面数量:', allPages.length);
        allPages.forEach(page => {
            page.style.display = 'none';
        });
        
        // 显示选中的页面
        const targetPage = document.querySelector(`.competition-cards.page-${pageNumber}`);
        console.log('目标页面:', targetPage);
        if (targetPage) {
            targetPage.style.display = 'grid';
        } else {
            // 如果找不到指定页面，显示第一页
            const firstPage = document.querySelector('.competition-cards.page-1');
            if (firstPage) {
                firstPage.style.display = 'grid';
            }
        }
        
        // 滚动到竞赛列表顶部
        const competitionsList = document.querySelector('.competitions-list');
        if (competitionsList) {
            window.scrollTo({ top: competitionsList.offsetTop - 100, behavior: 'smooth' });
        }
    }
    
    // 初始显示第一页
    showPage(1);
    
    // 获取分页按钮
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    console.log('找到分页按钮数量:', paginationButtons.length);
    
    // 为每个分页按钮添加点击事件
    paginationButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('分页按钮被点击:', this.getAttribute('data-page'));
            
            // 移除所有按钮的活动状态
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            let pageToShow = 1;
            
            // 为当前按钮添加活动状态
            if (!this.classList.contains('next')) {
                this.classList.add('active');
                pageToShow = parseInt(this.getAttribute('data-page'));
            } else {
                // 如果点击的是"下一页"按钮，激活下一个数字按钮
                const activeButton = document.querySelector('.pagination-btn.active');
                const nextButton = activeButton.nextElementSibling;
                if (nextButton && !nextButton.classList.contains('next')) {
                    nextButton.classList.add('active');
                    pageToShow = parseInt(nextButton.getAttribute('data-page'));
                } else {
                    // 如果已经是最后一页，回到第一页
                    paginationButtons[0].classList.add('active');
                    pageToShow = 1;
                }
            }
            
            // 显示对应页面的竞赛卡片
            showPage(pageToShow);
        });
    });
    
    console.log('分页功能初始化完成');
}

// 竞赛页面搜索功能 - 简化版本
console.log('=== 竞赛页面搜索功能开始加载 ===');

// 使用全局变量，避免重复定义
const competitionsDB = window.competitionsData || [];

// 全局变量
let searchInput = null;
let searchSuggestions = null;
let testButton = null;

// 页面加载完成后初始化
function initSearch() {
    console.log('开始初始化搜索功能...');
    
    // 获取DOM元素
    searchInput = document.getElementById('searchInput');
    searchSuggestions = document.getElementById('searchSuggestions');
    testButton = document.getElementById('testSearch');
    
    console.log('DOM元素检查:', {
        searchInput: !!searchInput,
        searchSuggestions: !!searchSuggestions,
        testButton: !!testButton
    });
    
    if (!searchInput || !searchSuggestions) {
        console.error('错误：必要的DOM元素未找到');
        return;
    }
    
    // 绑定事件
    bindEvents();
    
    console.log('搜索功能初始化完成');
}

// 绑定事件
function bindEvents() {
    // 搜索输入事件
    searchInput.addEventListener('input', handleSearchInput);
    
    // 搜索框焦点事件
    searchInput.addEventListener('focus', handleSearchFocus);
    searchInput.addEventListener('blur', handleSearchBlur);
    
    // 测试按钮事件
    if (testButton) {
        testButton.addEventListener('click', handleTestButton);
    }
    
    // 点击外部隐藏搜索建议
    document.addEventListener('click', handleClickOutside);
    
    console.log('事件绑定完成');
}

// 处理搜索输入
function handleSearchInput(event) {
    const query = event.target.value.trim();
    console.log('搜索输入:', query);
    
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    
    const suggestions = getSearchSuggestions(query);
    console.log('找到建议:', suggestions.length);
    displaySuggestions(suggestions);
}

// 处理搜索框焦点
function handleSearchFocus() {
    console.log('搜索框获得焦点');
    showSuggestions();
}

// 处理搜索框失去焦点
function handleSearchBlur() {
    console.log('搜索框失去焦点');
    setTimeout(hideSuggestions, 200);
}

// 处理测试按钮
function handleTestButton() {
    console.log('测试按钮被点击');
    const testSuggestions = [
        {
            id: 'test1',
            name: '测试竞赛1',
            nameEn: 'Test Competition 1',
            category: 'math'
        },
        {
            id: 'test2',
            name: '测试竞赛2',
            nameEn: 'Test Competition 2',
            category: 'physics'
        }
    ];
    displaySuggestions(testSuggestions);
}

// 处理点击外部
function handleClickOutside(event) {
    if (!event.target.closest('.search-box')) {
        hideSuggestions();
    }
}

// 获取搜索建议
function getSearchSuggestions(query) {
    const lowerQuery = query.toLowerCase();
    const suggestions = [];
    
    competitionsDB.forEach(competition => {
        const searchText = `${competition.name} ${competition.nameEn} ${competition.category} ${competition.tags.join(' ')} ${competition.description}`.toLowerCase();
        
        if (searchText.includes(lowerQuery)) {
            suggestions.push({
                ...competition,
                relevance: calculateRelevance(lowerQuery, competition)
            });
        }
    });
    
    // 按相关性排序
    suggestions.sort((a, b) => b.relevance - a.relevance);
    return suggestions.slice(0, 8);
}

// 计算相关性
function calculateRelevance(query, competition) {
    let relevance = 0;
    
    if (competition.name.toLowerCase().includes(query)) relevance += 10;
    if (competition.nameEn.toLowerCase().includes(query)) relevance += 10;
    if (competition.category.toLowerCase().includes(query)) relevance += 5;
    
    competition.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) relevance += 3;
    });
    
    if (competition.description.toLowerCase().includes(query)) relevance += 1;
    
    return relevance;
}

// 显示搜索建议
function displaySuggestions(suggestions) {
    if (!searchSuggestions) {
        console.log('搜索建议容器不存在');
        return;
    }
    
    if (suggestions.length === 0) {
        console.log('没有找到建议');
        hideSuggestions();
        return;
    }
    
    console.log('显示建议:', suggestions.length, '个');
    
    const html = suggestions.map(competition => `
        <div class="search-suggestion-item" onclick="selectSuggestion('${competition.id}')" style="padding: 12px 20px; cursor: pointer; border-bottom: 1px solid #eee; color: #333; background: white; transition: background 0.2s;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 1.2rem;">${getCategoryIcon(competition.category)}</div>
                <div style="flex: 1;">
                    <div><strong>${competition.name}</strong></div>
                    <div style="font-size: 0.9rem; color: #666;">${competition.nameEn}</div>
                </div>
                <div style="font-size: 0.8rem; color: #666; background: #f0f0f0; padding: 2px 8px; border-radius: 10px;">${competition.category}</div>
            </div>
        </div>
    `).join('');
    
    searchSuggestions.innerHTML = html;
    searchSuggestions.style.display = 'block';
    
    // 添加悬停效果
    const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#f8f9fa';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
    });
    
    console.log('搜索建议已显示');
}

// 获取类别图标
function getCategoryIcon(category) {
    const icons = {
        'math': '🧮',
        'physics': '🔬',
        'chemistry': '🧪',
        'biology': '🧬',
        'programming': '💻',
        'economics': '📊',
        'humanities': '✍️',
        'innovation': '💡'
    };
    return icons[category] || '🏆';
}

// 显示搜索建议
function showSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.style.display = 'block';
        console.log('显示搜索建议');
    }
}

// 隐藏搜索建议
function hideSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
        console.log('隐藏搜索建议');
    }
}

// 全局函数 - 选择搜索建议
window.selectSuggestion = function(competitionId) {
    console.log('选择建议:', competitionId);
    
    // 隐藏建议
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
    
    // 清空搜索框
    if (searchInput) {
        searchInput.value = '';
    }
    
    // 显示选择结果
    alert(`你选择了: ${competitionId}`);
    
    // 尝试滚动到对应的竞赛卡片
    const competitionCard = document.getElementById(competitionId);
    if (competitionCard) {
        competitionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        competitionCard.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            competitionCard.style.animation = '';
        }, 600);
    }
};

// 等待页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded 触发');
        setTimeout(initSearch, 100);
    });
} else {
    console.log('页面已加载，直接初始化');
    setTimeout(initSearch, 100);
}

// 备用初始化方法
window.addEventListener('load', function() {
    console.log('window.load 触发');
    if (!searchInput || !searchSuggestions) {
        setTimeout(initSearch, 200);
    }
});

console.log('=== 竞赛页面搜索功能加载完成 ===');