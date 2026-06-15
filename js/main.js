/**
 * 学成在线 - 交互脚本
 */
document.addEventListener('DOMContentLoaded', function () {

  var HEADER_OFFSET = 60;

  // ========== 主题切换 ==========
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  var currentTheme = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ========== 搜索功能 ==========
  var searchInput = document.querySelector('.search input');
  var searchBtn = document.querySelector('.search button');

  function doSearch() {
    var keyword = searchInput.value.trim();
    if (keyword) {
      alert('搜索功能开发中，您搜索的关键词：' + keyword);
    }
  }

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { doSearch(); }
  });

  // ========== 锚点平滑滚动（侧边栏 + 导航） ==========
  var anchorLinks = document.querySelectorAll('.sidebar-nav li a, .nav .dropdown a');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // 课程卡片 hover 提示
  var courseCardLinks = document.querySelectorAll('.box .content ul:not(.tool-list) li a');
  courseCardLinks.forEach(function (link) {
    link.setAttribute('title', '点击跳转播放');
  });

  // ========== 滚动时高亮侧边栏当前项 ==========
  var sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
  var sectionIds = [];
  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionIds.push(href.substring(1));
    }
  });

  function updateActiveLink() {
    var scrollY = window.pageYOffset + HEADER_OFFSET + 40;
    var current = sectionIds[0];

    for (var i = sectionIds.length - 1; i >= 0; i--) {
      var el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollY) {
        current = sectionIds[i];
        break;
      }
    }

    sidebarLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ========== Header 滚动收缩 ==========
  var header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('compact');
    } else {
      header.classList.remove('compact');
    }
  }, { passive: true });

  // ========== 课程链接：新窗口打开 + B站静音 ==========
  var courseLinks = document.querySelectorAll('.box .content ul li a');
  courseLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    // 跳过工具卡片的 javascript:void(0) 和锚点占位
    if (!href || href.startsWith('javascript:') || href === '#') return;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    if (href.indexOf('bilibili.com') !== -1) {
      link.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + 'muted=1');
    }
  });

  // ========== 软件工具卡片：点击弹出居中弹框 ==========
  var toolItems = document.querySelectorAll('.tool-item');
  var overlay = document.getElementById('toolModalOverlay');
  var modalName = document.getElementById('toolModalName');
  var modalIntro = document.getElementById('toolModalIntro');
  var modalReq = document.getElementById('toolModalReq');
  var modalVer = document.getElementById('toolModalVer');
  var modalSite = document.getElementById('toolModalSite');
  var modalDl = document.getElementById('toolModalDl');
  var modalClose = document.getElementById('toolModalClose');

  function openToolModal(item) {
    var name = item.getAttribute('data-name');
    var intro = item.getAttribute('data-intro');
    var req = item.getAttribute('data-req');
    var ver = item.getAttribute('data-ver');
    var site = item.getAttribute('data-site');
    var dl = item.getAttribute('data-dl');

    modalName.textContent = name;
    modalIntro.textContent = intro;
    modalReq.textContent = req;
    modalVer.textContent = ver;
    modalSite.textContent = site;
    modalSite.setAttribute('href', site);
    modalDl.setAttribute('href', dl);
    modalDl.setAttribute('download', '');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeToolModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toolItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openToolModal(item);
    });
  });

  modalClose.addEventListener('click', closeToolModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeToolModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeToolModal();
    }
  });

  // ========== 返回顶部按钮 ==========
  var backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.innerHTML = '&#8593;';
  backBtn.setAttribute('aria-label', '返回顶部');
  backBtn.setAttribute('title', '跳转到顶部');
  document.body.appendChild(backBtn);

  function toggleBackBtn() {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackBtn, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== 课程收藏功能 ==========
  var STORAGE_KEY = 'favorites';
  var favoritesList = document.getElementById('favoritesList');

  // 课程ID到名称和锚点的映射
  var courseNames = {
    'html-basic': 'HTML 基础教程',
    'html-advanced': 'HTML5 新特性',
    'css-basic': 'CSS 基础教程',
    'css-advanced': 'CSS3 新特性',
    'javascript-basic': 'JavaScript 入门到进阶',
    'java-basic': 'Java 面向对象编程基础',
    'java-advanced': 'Java 进阶教程',
    'python-basic': 'Python 基础入门',
    'python-data': 'Python 数据分析',
    'python-crawler': 'Python 爬虫',
    'mysql-basic': 'MySQL 快速入门',
    'mysql-advanced': 'MySQL 进阶教程',
    'redis-cache': 'Redis 缓存策略实战',
    'redis-lock': 'Redis 分布式锁应用',
    'vue-basic': 'Vue 基础教程',
    'vue-advanced': 'Vue3 项目实战',
    'pytorch-basic': 'PyTorch 深度学习入门',
    'pytorch-advanced': 'PyTorch 图像分类实战',
    'git-basic': 'Git 版本控制基础',
    'git-advanced': 'Git 分支管理与协作',
    'linux-basic': 'Linux 常用命令实战',
    'linux-shell': 'Shell 脚本编程入门',
    'bootstrap-basic': 'Bootstrap 5 响应式布局',
    'bootstrap-advanced': 'Bootstrap 组件实战',
    'agent-dify': '基于dify的Agent开发',
    'agent-andrew': '吴恩达讲Agent'
  };

  // 课程ID到锚点的映射
  var courseAnchors = {
    'html-basic': 'html',
    'html-advanced': 'html',
    'css-basic': 'css',
    'css-advanced': 'css',
    'javascript-basic': 'javascript',
    'java-basic': 'java',
    'java-advanced': 'java',
    'python-basic': 'python',
    'python-data': 'python',
    'python-crawler': 'python',
    'mysql-basic': 'mysql',
    'mysql-advanced': 'mysql',
    'redis-cache': 'redis',
    'redis-lock': 'redis',
    'vue-basic': 'vue',
    'vue-advanced': 'vue',
    'pytorch-basic': 'pytorch',
    'pytorch-advanced': 'pytorch',
    'git-basic': 'git',
    'git-advanced': 'git',
    'linux-basic': 'linux',
    'linux-shell': 'linux',
    'bootstrap-basic': 'bootstrap',
    'bootstrap-advanced': 'bootstrap',
    'agent-dify': 'agent',
    'agent-andrew': 'agent'
  };

  var HEADER_OFFSET = 60;

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }

  // 更新收藏课程栏
  function updateFavoritesBar() {
    var favorites = getFavorites();
    favoritesList.innerHTML = '';
    if (favorites.length === 0) {
      var emptyTip = document.createElement('li');
      emptyTip.className = 'empty-tip';
      emptyTip.textContent = '暂无收藏，点击课程卡片上的爱心即可收藏';
      favoritesList.appendChild(emptyTip);
    } else {
      favorites.forEach(function(courseId) {
        var tag = document.createElement('li');
        tag.className = 'fav-tag';
        var a = document.createElement('a');
        a.textContent = courseNames[courseId] || courseId;
        a.href = '#' + (courseAnchors[courseId] || '');
        a.addEventListener('click', function(e) {
          e.preventDefault();
          var targetId = courseAnchors[courseId];
          var target = document.getElementById(targetId);
          if (target) {
            var top = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
        tag.appendChild(a);
        // 添加删除按钮
        var removeBtn = document.createElement('button');
        removeBtn.className = 'fav-remove';
        removeBtn.textContent = '×';
        removeBtn.title = '取消收藏';
        removeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          removeFavorite(courseId);
        });
        tag.appendChild(removeBtn);
        tag.setAttribute('data-course-id', courseId);
        favoritesList.appendChild(tag);
      });
    }
  }

  // 飞行动画
  function flyToBar(btn, courseId) {
    var btnRect = btn.getBoundingClientRect();
    var barRect = favoritesList.getBoundingClientRect();

    // 创建飞行粒子
    var particle = document.createElement('div');
    particle.className = 'fly-particle';
    particle.textContent = '❤';
    particle.style.left = btnRect.left + btnRect.width / 2 - 12 + 'px';
    particle.style.top = btnRect.top + btnRect.height / 2 - 12 + 'px';
    document.body.appendChild(particle);

    // 计算目标位置
    var targetX = barRect.left + barRect.width / 2;
    var targetY = barRect.top + barRect.height / 2;

    // 使用 GSAP 动画
    gsap.to(particle, {
      x: targetX - btnRect.left - 12,
      y: targetY - btnRect.top - 12,
      scale: 0.5,
      opacity: 0.5,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: function() {
        particle.remove();
        // 更新收藏栏
        updateFavoritesBar();
      }
    });
  }

  // 显示提示
  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'fav-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.remove();
    }, 1000);
  }

  // 从收藏栏取消收藏
  function removeFavorite(courseId) {
    var favorites = getFavorites();
    var index = favorites.indexOf(courseId);
    if (index !== -1) {
      favorites.splice(index, 1);
      saveFavorites(favorites);
      // 更新课程卡片上的爱心状态
      var card = document.querySelector('[data-course-id="' + courseId + '"] .favorite-btn');
      if (card) {
        card.classList.remove('active');
        card.textContent = '♡';
      }
      // 移除标签动画
      var tag = favoritesList.querySelector('[data-course-id="' + courseId + '"]');
      if (tag) {
        tag.style.animation = 'favTagOut 0.3s ease forwards';
        setTimeout(function() {
          updateFavoritesBar();
        }, 300);
      } else {
        updateFavoritesBar();
      }
      showToast('取消收藏成功');
    }
  }

  function toggleFavorite(courseId, btn) {
    var favorites = getFavorites();
    var index = favorites.indexOf(courseId);
    if (index === -1) {
      // 添加收藏
      favorites.push(courseId);
      btn.classList.add('active');
      btn.textContent = '❤';
      saveFavorites(favorites);
      // 播放飞行动画
      flyToBar(btn, courseId);
      showToast('收藏成功');
    } else {
      // 取消收藏
      favorites.splice(index, 1);
      btn.classList.remove('active');
      btn.textContent = '♡';
      saveFavorites(favorites);
      // 移除标签动画
      var tag = favoritesList.querySelector('[data-course-id="' + courseId + '"]');
      if (tag) {
        tag.style.animation = 'favTagOut 0.3s ease forwards';
        setTimeout(function() {
          updateFavoritesBar();
        }, 300);
      } else {
        updateFavoritesBar();
      }
      showToast('取消收藏成功');
    }
  }

  function initFavorites() {
    var favorites = getFavorites();
    var buttons = document.querySelectorAll('.favorite-btn');
    buttons.forEach(function(btn) {
      var li = btn.closest('[data-course-id]');
      if (!li) return;
      var courseId = li.getAttribute('data-course-id');
      if (favorites.indexOf(courseId) !== -1) {
        btn.classList.add('active');
        btn.textContent = '❤';
      }
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(courseId, btn);
      });
    });
    // 初始化收藏栏
    updateFavoritesBar();
  }

  initFavorites();

});
