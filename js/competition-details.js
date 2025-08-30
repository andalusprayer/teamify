/**
 * 竞赛详情页面JavaScript功能
 * Competition Details Page JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言切换 Initialize Language Toggle
    initLanguageToggle();
    
    // 加载竞赛详情 Load Competition Details
    loadCompetitionDetails();
});

/**
 * 初始化语言切换功能
 * Initialize Language Toggle Functionality
 */
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    let isEnglish = false;
    
    langToggle.addEventListener('click', function() {
        isEnglish = !isEnglish;
        if (isEnglish) {
            langToggle.textContent = '中文 | EN';
            document.body.classList.add('english');
        } else {
            langToggle.textContent = 'EN | 中文';
            document.body.classList.remove('english');
        }
    });
}

/**
 * 加载竞赛详情
 * Load Competition Details
 */
function loadCompetitionDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const competitionId = urlParams.get('id');
    
    if (!competitionId) {
        showError('未找到竞赛信息');
        return;
    }
    
    // 获取竞赛数据 Get competition data
    const competition = getCompetitionData(competitionId);
    
    if (!competition) {
        showError('竞赛信息不存在');
        return;
    }
    
    // 渲染竞赛详情 Render competition details
    renderCompetitionDetails(competition);
}

/**
 * 获取竞赛数据
 * Get Competition Data
 */
function getCompetitionData(competitionId) {
    const competitions = {
        'amc': {
            name: 'AMC数学竞赛 (AMC 10/12)',
            nameEn: 'AMC Mathematical Competition',
            description: 'AMC数学竞赛是美国数学协会主办的高中数学竞赛，分为AMC 10（10年级及以下）和AMC 12（12年级及以下），是进入美国数学奥林匹克的重要途径。',
            descriptionEn: 'The AMC Mathematical Competition is a high school math competition hosted by the Mathematical Association of America, divided into AMC 10 (10th grade and below) and AMC 12 (12th grade and below), and is an important pathway to the US Mathematical Olympiad.',
            image: 'images/amc-math.svg',
            date: '每年2月',
            dateEn: 'Annually in February',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '金奖、银奖、铜奖及荣誉证书',
            prizeEn: 'Gold, Silver, Bronze Medals and Honor Certificates',
            features: [
                { icon: 'fas fa-calculator', title: '数学思维', titleEn: 'Mathematical Thinking', desc: '培养逻辑思维和问题解决能力', descEn: 'Develop logical thinking and problem-solving skills' },
                { icon: 'fas fa-trophy', title: '国际认可', titleEn: 'International Recognition', desc: '全球顶尖大学高度认可', descEn: 'Highly recognized by top universities worldwide' },
                { icon: 'fas fa-users', title: '团队合作', titleEn: 'Team Collaboration', desc: '为后续团队竞赛奠定基础', descEn: 'Lay foundation for future team competitions' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '300,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '50+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '95%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'euclid': {
            name: 'Euclid数学竞赛',
            nameEn: 'Euclid Mathematics Competition',
            description: '由滑铁卢大学主办的加拿大欧几里得数学竞赛，难度高，全球认可度强，是申请加拿大顶尖大学的重要加分项。',
            descriptionEn: 'Hosted by the University of Waterloo, the Euclid Mathematics Competition is a high-difficulty competition with strong global recognition and is an important addition for applying to top Canadian universities.',
            image: 'images/euclid-math.svg',
            date: '每年4月',
            dateEn: 'Annually in April',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '证书、奖牌及滑铁卢大学优先录取资格',
            prizeEn: 'Certificates, Medals and Priority Admission to University of Waterloo',
            features: [
                { icon: 'fas fa-shapes', title: '几何思维', titleEn: 'Geometric Thinking', desc: '深入理解欧几里得几何原理', descEn: 'Deep understanding of Euclidean geometry principles' },
                { icon: 'fas fa-university', title: '大学认可', titleEn: 'University Recognition', desc: '加拿大顶尖大学高度认可', descEn: 'Highly recognized by top Canadian universities' },
                { icon: 'fas fa-globe', title: '国际视野', titleEn: 'International Perspective', desc: '与全球数学精英同台竞技', descEn: 'Compete with global mathematical elites' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '25,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '30+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '90%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'hmmt': {
            name: 'HMMT数学竞赛',
            nameEn: 'Harvard-MIT Mathematics Tournament',
            description: '世界顶尖数学竞赛之一，由哈佛大学和麻省理工学院联合主办，适合数学能力强的学生，是展示数学才华的顶级平台。',
            descriptionEn: 'One of the world\'s top mathematics competitions, jointly hosted by Harvard University and MIT, suitable for students with strong mathematical abilities, and is a top platform for showcasing mathematical talents.',
            image: 'images/hmmt-math.svg',
            date: '每年11月',
            dateEn: 'Annually in November',
            location: '美国剑桥',
            locationEn: 'Cambridge, USA',
            teamSize: '个人/团队',
            teamSizeEn: 'Individual/Team',
            prize: '奖牌、证书及哈佛MIT优先录取考虑',
            prizeEn: 'Medals, Certificates and Priority Consideration for Harvard/MIT Admission',
            features: [
                { icon: 'fas fa-crown', title: '顶尖赛事', titleEn: 'Top Tournament', desc: '世界最具声望的数学竞赛', descEn: 'World\'s most prestigious mathematics competition' },
                { icon: 'fas fa-graduation-cap', title: '名校认可', titleEn: 'Elite Recognition', desc: '哈佛MIT等顶尖大学高度认可', descEn: 'Highly recognized by Harvard, MIT and other elite universities' },
                { icon: 'fas fa-star', title: '精英汇聚', titleEn: 'Elite Gathering', desc: '与全球数学天才同台竞技', descEn: 'Compete with global mathematical geniuses' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '1,000+', label: '精英参赛者', labelEn: 'Elite Participants' },
                { number: '25+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '85%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'nec': {
            name: 'NEC全美经济挑战赛',
            nameEn: 'National Economics Challenge',
            description: '美国最具影响力的经济学竞赛之一，由美联储主办，测试学生的经济学知识、分析能力和团队合作精神。',
            descriptionEn: 'One of the most influential economics competitions in the US, hosted by the Federal Reserve, testing students\' economics knowledge, analytical abilities, and teamwork.',
            image: 'images/nec-economics.svg',
            date: '每年4月',
            dateEn: 'Annually in April',
            location: '美国',
            locationEn: 'USA',
            teamSize: '4人团队',
            teamSizeEn: '4-person Team',
            prize: '奖杯、证书及美联储实习机会',
            prizeEn: 'Trophies, Certificates and Federal Reserve Internship Opportunities',
            features: [
                { icon: 'fas fa-chart-line', title: '经济分析', titleEn: 'Economic Analysis', desc: '深入理解经济理论和实践', descEn: 'Deep understanding of economic theory and practice' },
                { icon: 'fas fa-landmark', title: '官方认可', titleEn: 'Official Recognition', desc: '美联储官方主办竞赛', descEn: 'Officially hosted by the Federal Reserve' },
                { icon: 'fas fa-handshake', title: '团队合作', titleEn: 'Team Collaboration', desc: '培养团队协作和沟通能力', descEn: 'Develop teamwork and communication skills' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '15,000+', label: '参赛学生', labelEn: 'Student Participants' },
                { number: '3,000+', label: '参赛团队', labelEn: 'Participating Teams' },
                { number: '80%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'physics-bowl': {
            name: '物理碗竞赛 Physics Bowl',
            nameEn: 'Physics Bowl Competition',
            description: '美国物理教师协会主办的全球性物理竞赛，测试学生的物理知识、实验技能和问题解决能力，是全球最具影响力的高中生物理竞赛之一。',
            descriptionEn: 'A global physics competition hosted by the American Association of Physics Teachers, testing students\' physics knowledge, experimental skills, and problem-solving abilities. It is one of the most influential high school physics competitions worldwide.',
            image: 'images/physics-bowl.svg',
            date: '每年3月',
            dateEn: 'Annually in March',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '奖牌、证书及国际认可',
            prizeEn: 'Medals, Certificates and International Recognition',
            features: [
                { icon: 'fas fa-atom', title: '物理思维', titleEn: 'Physics Thinking', desc: '培养物理直觉和科学思维', descEn: 'Develop physics intuition and scientific thinking' },
                { icon: 'fas fa-globe', title: '全球排名', titleEn: 'Global Ranking', desc: '全球统一排名，含金量高', descEn: 'Global unified ranking with high value' },
                { icon: 'fas fa-flask', title: '实验技能', titleEn: 'Experimental Skills', desc: '理论与实践相结合', descEn: 'Combination of theory and practice' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '20,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '40+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '88%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'usaco': {
            name: 'USACO编程竞赛',
            nameEn: 'USACO Programming Competition',
            description: '美国计算机奥林匹克竞赛，分为铜、银、金、铂金四个级别，是进入美国信息学奥林匹克的重要途径，全球顶尖大学高度认可。',
            descriptionEn: 'The US Computing Olympiad, divided into Bronze, Silver, Gold, and Platinum levels. It is an important pathway to the US Informatics Olympiad and highly recognized by top universities worldwide.',
            image: 'images/usaco-coding.svg',
            date: '全年开放',
            dateEn: 'Year-round Open',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '级别证书及晋级资格',
            prizeEn: 'Level Certificates and Advancement Qualifications',
            features: [
                { icon: 'fas fa-code', title: '编程技能', titleEn: 'Programming Skills', desc: '提升算法设计和编程能力', descEn: 'Improve algorithm design and programming skills' },
                { icon: 'fas fa-laptop-code', title: '在线平台', titleEn: 'Online Platform', desc: '全年开放，随时参与', descEn: 'Year-round open, participate anytime' },
                { icon: 'fas fa-trophy', title: '分级挑战', titleEn: 'Tiered Challenge', desc: '循序渐进，挑战自我', descEn: 'Step by step, challenge yourself' }
            ],
            timeline: [
                { date: '全年开放', dateEn: 'Year-round Open', event: '随时报名', eventEn: 'Register Anytime' },
                { date: '每月比赛', dateEn: 'Monthly Contest', event: '定期比赛', eventEn: 'Regular Contests' },
                { date: '即时评分', dateEn: 'Instant Scoring', event: '立即出分', eventEn: 'Immediate Results' },
                { date: '自动晋级', dateEn: 'Auto Promotion', event: '达到标准自动晋级', eventEn: 'Auto-promotion upon meeting standards' }
            ],
            stats: [
                { number: '50,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '60+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '92%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'science-olympiad': {
            name: '科学奥林匹克 Science Olympiad',
            nameEn: 'Science Olympiad Competition',
            description: '美国最具影响力的综合性科学竞赛，涵盖物理、化学、生物、地球科学等多个学科，培养学生的科学素养和团队合作能力。',
            descriptionEn: 'The most influential comprehensive science competition in the US, covering physics, chemistry, biology, earth science, and other disciplines, cultivating students\' scientific literacy and teamwork abilities.',
            image: 'images/science-olympiad.svg',
            date: '每年5月',
            dateEn: 'Annually in May',
            location: '美国及全球',
            locationEn: 'USA and Global',
            teamSize: '15人团队',
            teamSizeEn: '15-person Team',
            prize: '奖杯、奖牌及奖学金',
            prizeEn: 'Trophies, Medals and Scholarships',
            features: [
                { icon: 'fas fa-microscope', title: '多学科', titleEn: 'Multi-disciplinary', desc: '涵盖多个科学领域', descEn: 'Covering multiple scientific fields' },
                { icon: 'fas fa-users', title: '团队合作', titleEn: 'Team Collaboration', desc: '培养团队协作精神', descEn: 'Develop team collaboration spirit' },
                { icon: 'fas fa-lightbulb', title: '创新思维', titleEn: 'Innovative Thinking', desc: '激发科学创新思维', descEn: 'Stimulate scientific innovative thinking' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '团队报名', eventEn: 'Team Registration' },
                { date: '准备阶段', dateEn: 'Preparation Phase', event: '项目准备', eventEn: 'Project Preparation' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '7,500+', label: '参赛团队', labelEn: 'Participating Teams' },
                { number: '15,000+', label: '参赛学生', labelEn: 'Student Participants' },
                { number: '75%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'chemistry-olympiad': {
            name: '化学奥林匹克 Chemistry Olympiad',
            nameEn: 'Chemistry Olympiad Competition',
            description: '国际化学奥林匹克竞赛的选拔赛，测试学生的化学理论知识和实验技能，是展示化学才能的重要平台。',
            descriptionEn: 'A selection competition for the International Chemistry Olympiad, testing students\' chemistry theory knowledge and experimental skills. It is an important platform for showcasing chemistry talents.',
            image: 'images/chemistry-olympiad.svg',
            date: '每年4月',
            dateEn: 'Annually in April',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '奖牌、证书及国际参赛资格',
            prizeEn: 'Medals, Certificates and International Competition Qualifications',
            features: [
                { icon: 'fas fa-flask-vial', title: '化学理论', titleEn: 'Chemical Theory', desc: '深入理解化学原理', descEn: 'Deep understanding of chemical principles' },
                { icon: 'fas fa-vial', title: '实验技能', titleEn: 'Experimental Skills', desc: '培养实验操作能力', descEn: 'Develop experimental operation skills' },
                { icon: 'fas fa-globe', title: '国际视野', titleEn: 'International Perspective', desc: '与全球化学精英交流', descEn: 'Exchange with global chemistry elites' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '初赛阶段', dateEn: 'Preliminary Phase', event: '初赛选拔', eventEn: 'Preliminary Selection' },
                { date: '决赛阶段', dateEn: 'Final Phase', event: '决赛比赛', eventEn: 'Final Competition' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '30,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '35+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '85%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'bpho': {
            name: 'BPhO英国物理奥林匹克',
            nameEn: 'British Physics Olympiad',
            description: '由牛津大学等机构主办的英国物理奥林匹克竞赛，学术性强，适合申请英美理工科的学生，是展示物理才能的重要平台。',
            descriptionEn: 'Hosted by institutions including Oxford University, the British Physics Olympiad is academically rigorous and suitable for students applying to science and engineering programs in the UK and US.',
            image: 'images/bpho-physics.svg',
            date: '每年11月',
            dateEn: 'Annually in November',
            location: '英国及全球',
            locationEn: 'UK and Global',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '证书、奖牌及牛津剑桥优先考虑',
            prizeEn: 'Certificates, Medals and Priority Consideration for Oxford/Cambridge',
            features: [
                { icon: 'fas fa-university', title: '学术严谨', titleEn: 'Academic Rigor', desc: '牛津剑桥等名校认可', descEn: 'Recognized by Oxford, Cambridge and other elite universities' },
                { icon: 'fas fa-atom', title: '物理深度', titleEn: 'Physics Depth', desc: '深入理解物理概念', descEn: 'Deep understanding of physics concepts' },
                { icon: 'fas fa-graduation-cap', title: '升学优势', titleEn: 'Admission Advantage', desc: '英美顶尖大学加分项', descEn: 'Plus factor for top UK/US universities' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '8,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '25+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '82%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'ukcho': {
            name: 'UKChO英国化学奥林匹克',
            nameEn: 'UK Chemistry Olympiad',
            description: '英国皇家化学学会主办的化学奥林匹克竞赛，学术性强，注重化学理论和实验技能，是申请英国顶尖大学的重要加分项。',
            descriptionEn: 'Hosted by the Royal Society of Chemistry, the UK Chemistry Olympiad emphasizes chemical theory and experimental skills, and is an important addition for applying to top UK universities.',
            image: 'images/ukcho-chemistry.svg',
            date: '每年1月',
            dateEn: 'Annually in January',
            location: '英国及全球',
            locationEn: 'UK and Global',
            teamSize: '个人参赛',
            teamSizeEn: 'Individual',
            prize: '证书、奖牌及皇家化学学会认可',
            prizeEn: 'Certificates, Medals and Royal Society of Chemistry Recognition',
            features: [
                { icon: 'fas fa-crown', title: '皇家认可', titleEn: 'Royal Recognition', desc: '英国皇家化学学会主办', descEn: 'Hosted by the Royal Society of Chemistry' },
                { icon: 'fas fa-flask', title: '实验导向', titleEn: 'Experiment-oriented', desc: '理论与实践并重', descEn: 'Equal emphasis on theory and practice' },
                { icon: 'fas fa-university', title: '名校认可', titleEn: 'University Recognition', desc: '英国顶尖大学高度认可', descEn: 'Highly recognized by top UK universities' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '报名开始', eventEn: 'Registration Opens' },
                { date: '报名截止', dateEn: 'Registration Deadline', event: '报名截止', eventEn: 'Registration Deadline' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '正式比赛', eventEn: 'Competition Day' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '12,000+', label: '全球参赛者', labelEn: 'Global Participants' },
                { number: '30+', label: '参与国家', labelEn: 'Participating Countries' },
                { number: '78%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'wharton': {
            name: '沃顿商赛 Wharton Global High School Investment Competition',
            nameEn: 'Wharton Global High School Investment Competition',
            description: '由宾大沃顿商学院主办的高中投资竞赛，专注投资与商业分析，是展示商业才能和金融分析能力的重要平台。',
            descriptionEn: 'Hosted by the Wharton School at the University of Pennsylvania, this high school investment competition focuses on investment and business analysis, and is an important platform for showcasing business talents and financial analysis skills.',
            image: 'images/wharton-business.svg',
            date: '每年1-5月',
            dateEn: 'Annually January-May',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '4-7人团队',
            teamSizeEn: '4-7 person Team',
            prize: '奖杯、证书及沃顿商学院认可',
            prizeEn: 'Trophies, Certificates and Wharton School Recognition',
            features: [
                { icon: 'fas fa-chart-line', title: '投资分析', titleEn: 'Investment Analysis', desc: '学习投资策略和风险管理', descEn: 'Learn investment strategies and risk management' },
                { icon: 'fas fa-university', title: '名校背景', titleEn: 'Elite Background', desc: '宾大沃顿商学院主办', descEn: 'Hosted by the Wharton School at UPenn' },
                { icon: 'fas fa-handshake', title: '商业思维', titleEn: 'Business Mindset', desc: '培养商业直觉和决策能力', descEn: 'Develop business intuition and decision-making skills' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '团队报名', eventEn: 'Team Registration' },
                { date: '准备阶段', dateEn: 'Preparation Phase', event: '投资策略制定', eventEn: 'Investment Strategy Development' },
                { date: '比赛阶段', dateEn: 'Competition Phase', event: '投资组合管理', eventEn: 'Portfolio Management' },
                { date: '结果公布', dateEn: 'Results Phase', event: '成绩公布', eventEn: 'Results Announcement' }
            ],
            stats: [
                { number: '5,000+', label: '参赛团队', labelEn: 'Participating Teams' },
                { number: '25,000+', label: '参赛学生', labelEn: 'Student Participants' },
                { number: '70%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'yau-awards': {
            name: '丘成桐中学科学奖 Yau Science Awards',
            nameEn: 'Yau Science Awards',
            description: '涵盖数学、物理、化学、生物、计算机、经济等六大学科，以研究论文形式参赛，是展示科研能力的重要平台。',
            descriptionEn: 'Covering six major disciplines including mathematics, physics, chemistry, biology, computer science, and economics, participants submit research papers, making it an important platform for showcasing research capabilities.',
            image: 'images/yau-science.svg',
            date: '每年6-12月',
            dateEn: 'Annually June-December',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '个人/团队',
            teamSizeEn: 'Individual/Team',
            prize: '奖杯、证书及科研基金',
            prizeEn: 'Trophies, Certificates and Research Funding',
            features: [
                { icon: 'fas fa-microscope', title: '跨学科', titleEn: 'Cross-disciplinary', desc: '涵盖六大学科领域', descEn: 'Covering six major disciplines' },
                { icon: 'fas fa-file-alt', title: '研究导向', titleEn: 'Research-oriented', desc: '以研究论文形式参赛', descEn: 'Participate in research paper format' },
                { icon: 'fas fa-star', title: '学术价值', titleEn: 'Academic Value', desc: '具有重要学术价值', descEn: 'Has important academic value' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '项目报名', eventEn: 'Project Registration' },
                { date: '研究阶段', dateEn: 'Research Phase', event: '论文撰写', eventEn: 'Paper Writing' },
                { date: '提交阶段', dateEn: 'Submission Phase', event: '论文提交', eventEn: 'Paper Submission' },
                { date: '评审阶段', dateEn: 'Review Phase', event: '专家评审', eventEn: 'Expert Review' }
            ],
            stats: [
                { number: '2,000+', label: '参赛项目', labelEn: 'Participating Projects' },
                { number: '3,000+', label: '参赛学生', labelEn: 'Student Participants' },
                { number: '65%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        },
        'igem': {
            name: 'iGEM国际基因工程机器大赛',
            nameEn: 'International Genetically Engineered Machine Competition',
            description: '跨学科竞赛，涉及生物、编程、统计等，学生需要设计、构建和测试生物系统，是展示创新能力和团队合作的重要平台。',
            descriptionEn: 'A cross-disciplinary competition involving biology, programming, and statistics, where students design, build, and test biological systems, making it an important platform for showcasing innovation and teamwork.',
            image: 'images/igem-biology.svg',
            date: '每年3-11月',
            dateEn: 'Annually March-November',
            location: '全球参与',
            locationEn: 'Global Participation',
            teamSize: '6-15人团队',
            teamSizeEn: '6-15 person Team',
            prize: '奖杯、证书及国际认可',
            prizeEn: 'Trophies, Certificates and International Recognition',
            features: [
                { icon: 'fas fa-dna', title: '基因工程', titleEn: 'Genetic Engineering', desc: '前沿生物技术应用', descEn: 'Frontier biotechnology applications' },
                { icon: 'fas fa-laptop-code', title: '跨学科', titleEn: 'Cross-disciplinary', desc: '生物、编程、统计结合', descEn: 'Combination of biology, programming, and statistics' },
                { icon: 'fas fa-lightbulb', title: '创新设计', titleEn: 'Innovative Design', desc: '设计构建生物系统', descEn: 'Design and build biological systems' }
            ],
            timeline: [
                { date: '报名阶段', dateEn: 'Registration Phase', event: '团队报名', eventEn: 'Team Registration' },
                { date: '设计阶段', dateEn: 'Design Phase', event: '项目设计', eventEn: 'Project Design' },
                { date: '构建阶段', dateEn: 'Construction Phase', event: '系统构建', eventEn: 'System Construction' },
                { date: '测试阶段', dateEn: 'Testing Phase', event: '功能测试', eventEn: 'Function Testing' }
            ],
            stats: [
                { number: '400+', label: '参赛团队', labelEn: 'Participating Teams' },
                { number: '6,000+', label: '参赛学生', labelEn: 'Student Participants' },
                { number: '72%', label: '获奖率', labelEn: 'Award Rate' }
            ]
        }
    };
    
    return competitions[competitionId];
}

/**
 * 渲染竞赛详情
 * Render Competition Details
 */
function renderCompetitionDetails(competition) {
    const content = document.getElementById('competitionContent');
    
    content.innerHTML = `
        <!-- 英雄区域 -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1>${competition.name}</h1>
                    <h1 class="en">${competition.nameEn}</h1>
                    <p>${competition.description}</p>
                    <p class="en">${competition.descriptionEn}</p>
                    <div class="hero-buttons">
                        <a href="find-teammates.html?competition=${competition.name.toLowerCase().split(' ')[0]}" class="btn btn-primary">立即报名 Register Now</a>
                        <a href="find-teammates.html?competition=${competition.name.toLowerCase().split(' ')[0]}" class="btn btn-outline">寻找队友 Find Teammates</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- 竞赛信息卡片 -->
        <section class="competition-info-section">
            <div class="container">
                <div class="info-grid">
                    <div class="info-card">
                        <h3><i class="far fa-calendar-alt"></i> 比赛日期 Competition Date</h3>
                        <h3 class="en">Competition Date</h3>
                        <p>${competition.date}</p>
                        <p class="en">${competition.dateEn}</p>
                    </div>
                    <div class="info-card">
                        <h3><i class="fas fa-map-marker-alt"></i> 比赛地点 Location</h3>
                        <h3 class="en">Location</h3>
                        <p>${competition.location}</p>
                        <p class="en">${competition.locationEn}</p>
                    </div>
                    <div class="info-card">
                        <h3><i class="fas fa-users"></i> 参赛形式 Team Size</h3>
                        <h3 class="en">Team Size</h3>
                        <p>${competition.teamSize}</p>
                        <p class="en">${competition.teamSizeEn}</p>
                    </div>
                    <div class="info-card">
                        <h3><i class="fas fa-trophy"></i> 奖项设置 Prizes</h3>
                        <h3 class="en">Prizes</h3>
                        <p>${competition.prize}</p>
                        <p class="en">${competition.prizeEn}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 详细内容 -->
        <section class="detailed-content">
            <div class="container">
                <div class="content-section">
                    <h2>竞赛特色 Competition Features</h2>
                    <h2 class="en">Competition Features</h2>
                    
                    <div class="features-grid">
                        ${competition.features.map(feature => `
                            <div class="feature-item">
                                <i class="${feature.icon}"></i>
                                <h4>${feature.title}</h4>
                                <h4 class="en">${feature.titleEn}</h4>
                                <p>${feature.desc}</p>
                                <p class="en">${feature.descEn}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="content-section">
                    <h2>比赛流程 Competition Timeline</h2>
                    <h2 class="en">Competition Timeline</h2>
                    
                    <div class="timeline">
                        ${competition.timeline.map(item => `
                            <div class="timeline-item">
                                <h4>${item.date}</h4>
                                <h4 class="en">${item.dateEn}</h4>
                                <p>${item.event}</p>
                                <p class="en">${item.eventEn}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- 统计数字 -->
        <section class="stats-section">
            <div class="container">
                <div class="stats-grid">
                    ${competition.stats.map(stat => `
                        <div class="stat-item">
                            <span class="stat-number">${stat.number}</span>
                            <div class="stat-label">${stat.label}</div>
                            <div class="stat-label en">${stat.labelEn}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- 行动号召 -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>准备好挑战自我了吗？</h2>
                    <h2 class="en">Ready to Challenge Yourself?</h2>
                    <p>加入这场激动人心的竞赛，展示你的才华，结识志同道合的队友，开启你的国际竞赛之旅！</p>
                    <p class="en">Join this exciting competition, showcase your talents, meet like-minded teammates, and start your international competition journey!</p>
                    <div class="cta-buttons">
                        <a href="find-teammates.html?competition=${competition.name.toLowerCase().split(' ')[0]}" class="btn btn-cta-primary">立即报名 Register Now</a>
                        <a href="find-teammates.html?competition=${competition.name.toLowerCase().split(' ')[0]}" class="btn btn-cta-outline">寻找队友 Find Teammates</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * 显示错误信息
 * Show Error Message
 */
function showError(message) {
    const content = document.getElementById('competitionContent');
    content.innerHTML = `
        <div class="container" style="text-align: center; padding: 100px 20px; color: white;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px;">😕</h1>
            <h2 style="font-size: 2rem; margin-bottom: 20px;">${message}</h2>
            <p style="font-size: 1.2rem; margin-bottom: 30px;">请检查链接或返回竞赛列表页面</p>
            <a href="competitions.html" class="btn btn-primary" style="text-decoration: none;">返回竞赛列表 Back to Competitions</a>
        </div>
    `;
}
