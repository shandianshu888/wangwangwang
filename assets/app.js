document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Button Toggle
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 2. Navigation Dropdown Builder for "旺仔推荐"
  const navBase = location.pathname.includes('/articles/') ? '../' : './';
  
  const navMap = {
    '旺仔好物': 'goodies.html',
    '旺仔推荐': 'goodies.html',
    '百宝狗窝': 'toolbox.html',
    '急救锦囊': 'help.html',
    '排雷哨所': 'pitfall.html',
    '快乐源泉': 'fun.html',
    '🍎 狗子共享果号': 'articles/shadowrocket-download-official.html',
    'apple免费账号': 'articles/shadowrocket-download-official.html'
  };

  document.querySelectorAll('.site-nav a').forEach(link => {
    const label = link.textContent.trim();
    if (navMap[label]) {
      link.href = navBase + navMap[label];
    }
  });

  // Wrap '旺仔推荐' / '旺仔好物' in .nav-dropdown container if not already wrapped
  document.querySelectorAll('.site-nav a').forEach(link => {
    const text = link.textContent.trim();
    const href = link.getAttribute('href') || '';
    
    if (
      (text.includes('旺仔推荐') || text.includes('旺仔好物') || href.includes('goodies.html')) &&
      !link.closest('.nav-dropdown')
    ) {
      link.textContent = '旺仔推荐 ▾';
      link.href = navBase + 'goodies.html';
      link.classList.add('nav-dropdown-toggle');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'nav-dropdown';
      
      const menu = document.createElement('div');
      menu.className = 'nav-dropdown-menu';
      menu.innerHTML = `
        <a href="${navBase}value.html">⚖️ 旺仔性价比</a>
        <a href="${navBase}compare.html">📊 旺仔对比</a>
      `;
      
      link.parentNode.insertBefore(wrapper, link);
      wrapper.append(link, menu);
    }
  });

  // 3. Clipboard Copy for Coupons
  document.querySelectorAll('.coupon-copy').forEach(button => {
    button.addEventListener('click', async () => {
      const original = button.textContent;
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = '已复制 📋';
        button.classList.add('copied');
      } catch (error) {
        button.textContent = '请手动复制';
      }
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('copied');
      }, 2400);
    });
  });

  // 4. Back to Top Button
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Article TOC Active Tracker
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length > 0) {
    const headings = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    window.addEventListener('scroll', () => {
      let current = '';
      headings.forEach(heading => {
        const top = heading.getBoundingClientRect().top;
        if (top <= 120) current = '#' + heading.id;
      });
      tocLinks.forEach(a => {
        if (a.getAttribute('href') === current) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    });
  }

  // 6. Initialize Left-Gutter Knowledge Dog Companion (左侧安全轨知识宠物)
  initRoamingDogBuddy();

  // 7. Initialize Background Dog Snowflakes Falling Effect (狗狗雪花漫天飘落)
  initDogSnowflakes();

  // 8. Initialize Hero Mascot Easter Eggs (吉祥物彩蛋互动)
  initMascotEasterEggs();

  // 9. Initialize Right-Bottom TG Channel Dog Companion (右下角回到狗窝之上 TG 频道狗狗)
  initTgDogCompanion();

  // 10. Initialize Article Filter and Search System for articles.html
  initArticleFilterSystem();
});

// Article Live Filter & Search Implementation
function initArticleFilterSystem() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const searchInput = document.querySelector('#article-search');
  const articleCards = document.querySelectorAll('.article-list-grid .list-card');
  const emptyState = document.querySelector('.empty-state');
  const loadMoreBtn = document.querySelector('#load-more');

  if (filterButtons.length === 0 || articleCards.length === 0) return;

  let currentCategory = 'all';
  let currentSearch = '';

  // Parse URL query parameter ?category=xxx
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    currentCategory = catParam;
    filterButtons.forEach(btn => {
      if (btn.dataset.category === catParam) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applyFilter() {
    let visibleCount = 0;
    articleCards.forEach(card => {
      const cat = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchesCat = (currentCategory === 'all') || (cat === currentCategory);
      const matchesSearch = !currentSearch || text.includes(currentSearch);

      if (matchesCat && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;

      const newUrl = new URL(window.location);
      if (currentCategory === 'all') {
        newUrl.searchParams.delete('category');
      } else {
        newUrl.searchParams.set('category', currentCategory);
      }
      window.history.pushState({}, '', newUrl);

      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilter();
    });

    const searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentSearch = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }
  }

  applyFilter();
}


// Left Gutter Knowledge Dog Implementation
function initRoamingDogBuddy() {
  if (document.querySelector('.dog-buddy')) return;

  const buddy = document.createElement('div');
  buddy.className = 'dog-buddy';
  buddy.style.position = 'fixed';
  buddy.style.left = '12px';
  buddy.style.bottom = '16px';
  buddy.style.top = 'auto';
  buddy.style.right = 'auto';
  buddy.style.zIndex = '35';
  buddy.style.transition = 'left 1.8s ease-in-out, bottom 1.8s ease-in-out';
  buddy.style.pointerEvents = 'auto';

  const knowledgeTips = [
    {
      title: '🛡️ 排雷原则',
      text: '选机场先看退款政策与日志规则！不要冲动年付，先月付小范围试用更排雷。',
      link: 'pitfall.html',
      linkText: '去排雷哨所 ↗'
    },
    {
      title: '🚑 急救锦囊',
      text: 'VPN 连上了却打不开网页？很有可能是系统代理或 DNS 问题，去急救锦囊查排错！',
      link: 'help.html',
      linkText: '查看急救锦囊 ↗'
    },
    {
      title: '🛠️ 客户端推荐',
      text: 'Windows 和 Mac 推荐 Clash Party，iPhone 用小火箭，去百宝狗窝获取下载与教程！',
      link: 'toolbox.html',
      linkText: '去百宝狗窝 ↗'
    },
    {
      title: '🔍 流量倍率陷阱',
      text: '节点写着“倍率 5x”意味着看 1GB 视频会扣 5GB 流量！选节点前一定要看倍率。',
      link: 'goodies.html',
      linkText: '去旺仔推荐看详情 ↗'
    },
    {
      title: '🍿 晚高峰卡顿处理',
      text: '晚上 8~10 点是海底光缆流量高峰，卡顿可以尝试切换低倍率备用节点！',
      link: 'compare.html',
      linkText: '查看机场对比 ↗'
    },
    {
      title: '💥 优惠码与功德',
      text: '去【快乐源泉】可以敲赛博电子狗头木鱼积功德，还能领 9 大机场的优惠码！',
      link: 'fun.html',
      linkText: '去快乐源泉 ↗'
    }
  ];

  let tipIndex = 0;

  buddy.innerHTML = `
    <div class="dog-bubble" id="dog-bubble" aria-live="polite">
      <div class="dog-knowledge">
        <strong id="dog-tip-title">💡 旺仔小贴士</strong>
        <span id="dog-tip-text">点击我或等我踱步，为你送上本站冲浪知识点！</span>
        <a id="dog-tip-link" href="goodies.html" style="font-size:0.76rem;font-weight:950;color:var(--pink);text-decoration:underline">去旺仔推荐 ↗</a>
      </div>
    </div>
    <button type="button" class="dog-buddy-button" aria-label="抚摸旺仔宠物">
      <svg class="walking-dog-svg" viewBox="0 0 100 80" style="width:85px;height:68px;overflow:visible">
        <ellipse class="svg-shadow" cx="50" cy="74" rx="34" ry="4"/>
        <path class="svg-tail" d="M 22 42 Q 10 28, 14 16 Q 22 8, 26 24" fill="none" stroke="#b96f42" stroke-width="6" stroke-linecap="round"/>
        <g class="svg-leg-back">
          <rect class="svg-leg" x="28" y="48" width="8" height="18" rx="4" fill="#e7a866" stroke="#171514" stroke-width="2.5"/>
          <ellipse class="svg-paw" cx="32" cy="66" rx="5" ry="2.5" fill="#ffe0ac" stroke="#171514" stroke-width="1.8"/>
        </g>
        <g class="svg-leg-front">
          <rect class="svg-leg" x="64" y="48" width="8" height="18" rx="4" fill="#e7a866" stroke="#171514" stroke-width="2.5"/>
          <ellipse class="svg-paw" cx="68" cy="66" rx="5" ry="2.5" fill="#ffe0ac" stroke="#171514" stroke-width="1.8"/>
        </g>
        <rect class="svg-body" x="22" y="30" width="56" height="30" rx="15" fill="#e7a866" stroke="#171514" stroke-width="2.8"/>
        <path class="svg-cream" d="M 32 42 Q 50 48, 68 42 Q 58 56, 40 56 Z" fill="#ffe0ac" stroke="#171514" stroke-width="1.8"/>
        <g class="svg-head">
          <path class="svg-ear" d="M 52 18 L 46 2 L 60 12 Z" fill="#c77a49" stroke="#171514" stroke-width="2.2" stroke-linejoin="round"/>
          <path class="svg-ear" d="M 72 16 L 78 0 L 84 14 Z" fill="#c77a49" stroke="#171514" stroke-width="2.2" stroke-linejoin="round"/>
          <circle class="svg-face" cx="66" cy="26" r="17" fill="#e7a866" stroke="#171514" stroke-width="2.8"/>
          <ellipse class="svg-muzzle" cx="72" cy="31" rx="8.5" ry="6.5" fill="#ffe0ac" stroke="#171514" stroke-width="1.8"/>
          <circle cx="56" cy="30" r="3.2" fill="#ff6f91" opacity="0.65"/>
          <circle cx="76" cy="30" r="3.2" fill="#ff6f91" opacity="0.65"/>
          <circle class="svg-eye" cx="60" cy="22" r="2.6" fill="#171514"/>
          <circle cx="61" cy="21" r="0.9" fill="#ffffff"/>
          <circle class="svg-eye" cx="72" cy="22" r="2.6" fill="#171514"/>
          <circle cx="73" cy="21" r="0.9" fill="#ffffff"/>
          <polygon class="svg-nose" points="74,28.5 78,28.5 76,31.5" fill="#171514"/>
          <path class="svg-smile" d="M 73 32.5 Q 76 35.5, 79 32.5" fill="none" stroke="#171514" stroke-width="1.8" stroke-linecap="round"/>
        </g>
        <rect class="svg-collar" x="52" y="38" width="22" height="4.5" rx="2.2" fill="#ff6f91" stroke="#171514" stroke-width="1.8"/>
        <circle class="svg-bell" cx="63" cy="43" r="2.8" fill="#ffd84d" stroke="#171514" stroke-width="1.5"/>
      </svg>
      <span class="buddy-label">🐾 知识小狗</span>
      <span class="buddy-count" id="pet-count">0</span>
    </button>
  `;

  document.body.appendChild(buddy);

  const titleEl = buddy.querySelector('#dog-tip-title');
  const textEl = buddy.querySelector('#dog-tip-text');
  const linkEl = buddy.querySelector('#dog-tip-link');
  const countEl = buddy.querySelector('#pet-count');
  const btn = buddy.querySelector('.dog-buddy-button');

  const navBase = location.pathname.includes('/articles/') ? '../' : './';

  let pettedCount = parseInt(localStorage.getItem('wang_pet_count') || '0', 10);
  countEl.textContent = pettedCount;

  function showTip(idx) {
    const tip = knowledgeTips[idx % knowledgeTips.length];
    titleEl.textContent = tip.title;
    textEl.textContent = tip.text;
    linkEl.href = navBase + tip.link;
    linkEl.textContent = tip.linkText;

    buddy.classList.add('is-talking');
    setTimeout(() => {
      buddy.classList.remove('is-talking');
    }, 5500);
  }

  function getSafeLeftBounds() {
    const wrap = document.querySelector('.wrap') || document.querySelector('main');
    if (!wrap) return { minX: 10, maxX: 60 };

    const rect = wrap.getBoundingClientRect();
    const maxSafeX = Math.max(10, rect.left - 105);
    return {
      minX: 10,
      maxX: Math.min(90, maxSafeX)
    };
  }

  let currentLeft = 12;
  let currentBottom = 16;

  function roamLeftGutter() {
    const bounds = getSafeLeftBounds();
    const targetLeft = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
    const targetBottom = Math.random() * 45 + 10;

    if (targetLeft < currentLeft) {
      buddy.classList.add('facing-left');
    } else {
      buddy.classList.remove('facing-left');
    }

    buddy.classList.add('is-walking');
    currentLeft = targetLeft;
    currentBottom = targetBottom;
    buddy.style.left = currentLeft + 'px';
    buddy.style.bottom = currentBottom + 'px';

    setTimeout(() => {
      buddy.classList.remove('is-walking');
      if (Math.random() < 0.5) {
        tipIndex++;
        showTip(tipIndex);
      }
    }, 1800);
  }

  setInterval(roamLeftGutter, 6000);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    pettedCount++;
    localStorage.setItem('wang_pet_count', pettedCount);
    countEl.textContent = pettedCount;

    buddy.classList.add('is-petted');
    setTimeout(() => buddy.classList.remove('is-petted'), 700);

    tipIndex++;
    showTip(tipIndex);
  });
}

// Background Dog Snowflakes Falling System (狗狗雪花漫天飘落特效)
function initDogSnowflakes() {
  if (document.querySelector('.dog-snow-container')) return;

  const container = document.createElement('div');
  container.className = 'dog-snow-container';
  document.body.prepend(container);

  const icons = ['🐶', '🐕', '🐩', '🦴', '🐾', '🐶', '⚡️', '✨'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const flake = document.createElement('div');
    flake.className = 'dog-snowflake';
    flake.textContent = icons[Math.floor(Math.random() * icons.length)];

    const size = Math.floor(Math.random() * 12) + 16;
    const left = Math.random() * 96;
    const fallDuration = Math.random() * 6 + 7;
    const swayDuration = Math.random() * 2 + 2;
    const delay = Math.random() * 8;

    flake.style.fontSize = `${size}px`;
    flake.style.left = `${left}vw`;
    flake.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    flake.style.animationDelay = `${delay}s, 0s`;

    // Interactive Click Boop!
    flake.addEventListener('click', (e) => {
      e.stopPropagation();
      const pops = ['💥汪！', '🦴肉骨头！', '✨好运+1', '💖爱心', '⚡️极速！'];
      flake.textContent = pops[Math.floor(Math.random() * pops.length)];
      flake.style.color = '#ff6f91';
      flake.style.fontWeight = '950';

      setTimeout(() => {
        flake.textContent = icons[Math.floor(Math.random() * icons.length)];
        flake.style.color = '';
        flake.style.fontWeight = '';
      }, 1200);
    });

    container.appendChild(flake);
  }
}

// Hero Mascot Easter Eggs (吉祥物互动彩蛋)
function initMascotEasterEggs() {
  const mascot = document.querySelector('.mascot-stage');
  const speech = document.querySelector('.speech');
  if (mascot && speech) {
    const quotes = [
      "别戳我鼻子，会长 Bug 的！👃",
      "汪！多走旺路，少走弯路！🐾",
      "网速加持中... 今天排雷大吉！✨",
      "别看了，快去领优惠码！🎟️",
      "本旺在此，卡顿退散！⚡️"
    ];
    mascot.addEventListener('click', () => {
      speech.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      speech.style.background = '#fff0a8';
      speech.style.transform = 'scale(1.1) rotate(-3deg)';
      setTimeout(() => {
        speech.style.background = '';
        speech.style.transform = '';
      }, 1500);
    });
  }
}

// Right-Bottom TG Channel Dog Companion (右下角宣传 TG 频道的搞怪狗狗)
function initTgDogCompanion() {
  if (document.querySelector('.tg-dog-widget')) return;

  const widget = document.createElement('a');
  widget.className = 'tg-dog-widget';
  widget.href = 'https://t.me/shandianshuvpn';
  widget.target = '_blank';
  widget.rel = 'noopener';
  widget.setAttribute('aria-label', '关注旺仔TG电报频道 t.me/shandianshuvpn');

  const quotes = [
    '✈️ 狗子叫你进电报群领粮！',
    '🚨 跑路预警 + 隐藏7折暗号！',
    '⚡️ 闪电鼠与 16 厂牌情报站！',
    '🎁 狗爪一挥！跟旺仔飞速上车！'
  ];

  widget.innerHTML = `
    <div class="tg-dog-bubble" role="tooltip">${quotes[0]}</div>
    <div class="tg-dog-body">
      <span class="tg-dog-avatar">🐕‍🦺</span>
      <span class="tg-dog-badge">✈️ 旺仔TG频道</span>
    </div>
  `;

  document.body.appendChild(widget);

  const bubble = widget.querySelector('.tg-dog-bubble');
  let index = 0;
  setInterval(() => {
    index = (index + 1) % quotes.length;
    if (bubble) {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(6px)';
      setTimeout(() => {
        bubble.textContent = quotes[index];
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0)';
      }, 200);
    }
  }, 4500);
}

